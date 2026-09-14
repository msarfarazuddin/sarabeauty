import { NextResponse } from "next/server";
import { fallbackReviews, type ReviewItem, type ReviewsPayload } from "@/data/reviews";

export const revalidate = 3600;

type GoogleLegacyFindPlaceResponse = {
  candidates?: Array<{
    place_id?: string;
  }>;
  status?: string;
};

type GoogleLegacyPlaceDetailsResponse = {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: Array<{
      rating?: number;
      relative_time_description?: string;
      time?: number;
      text?: string;
      author_name?: string;
    }>;
  };
  status?: string;
};

const PLACE_SEARCH_QUERY =
  process.env.GOOGLE_PLACE_QUERY ??
  "Sara Beauty Home Massage & Spa Service Abu Dhabi";

function avatarColorFromName(name: string) {
  const palette = ["#cc1f69", "#395E4C", "#aa49d0", "#1e8ad2", "#a8897a", "#395E4C"];
  const hash = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

function formatPublishedLabel(label?: string, isoDate?: string) {
  if (label && label.trim()) {
    return label.trim();
  }

  if (!isoDate) {
    return "Google review";
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "Google review";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

async function resolvePlaceId(apiKey: string) {
  if (process.env.GOOGLE_PLACE_ID) {
    return process.env.GOOGLE_PLACE_ID;
  }

  const params = new URLSearchParams({
    input: PLACE_SEARCH_QUERY,
    inputtype: "textquery",
    fields: "place_id",
    key: apiKey,
  });

  const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${params.toString()}`, {
    next: { revalidate },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Google find place failed: ${response.status}`);
  }

  const data = (await response.json()) as GoogleLegacyFindPlaceResponse;
  const placeId = data.candidates?.[0]?.place_id;

  if (!placeId) {
    throw new Error("No Google place ID found for configured query.");
  }

  return placeId;
}

async function fetchGoogleReviews(apiKey: string): Promise<ReviewsPayload> {
  const placeId = await resolvePlaceId(apiKey);
  const params = new URLSearchParams({
    place_id: placeId,
    fields: "rating,user_ratings_total,reviews",
    reviews_sort: "newest",
    key: apiKey,
  });

  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`, {
    next: { revalidate },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Google place details failed: ${response.status}`);
  }

  const data = (await response.json()) as GoogleLegacyPlaceDetailsResponse;
  const reviews: ReviewItem[] =
    data.result?.reviews?.filter((review) =>
      // Keep customer quotes intact; omit reviews describing home visits.
      !/\b(?:home[- ]service|at[- ]home|(?:my|our|your) (?:home|house|location|doorstep)|mobile (?:spa|massage)|home visits?)\b/i.test(review.text ?? "")
    ).map((review) => {
      const authorName = review.author_name?.trim() || "Google User";
      return {
        authorName,
        authorInitial: authorName.charAt(0).toUpperCase(),
        avatarColor: avatarColorFromName(authorName),
        publishedAtLabel: formatPublishedLabel(
          review.relative_time_description,
          review.time ? new Date(review.time * 1000).toISOString() : undefined
        ),
        rating: Math.max(1, Math.min(5, review.rating ?? 5)),
        text: review.text?.trim() || "Shared a Google review.",
      };
    }) ?? [];

  return {
    averageRating: data.result?.rating ?? fallbackReviews.averageRating,
    totalReviews: data.result?.user_ratings_total ?? fallbackReviews.totalReviews,
    sourceLabel: "Google",
    reviews: reviews.length > 0 ? reviews : fallbackReviews.reviews,
  };
}

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      ...fallbackReviews,
      isFallback: true,

    });
  }

  try {
    const payload = await fetchGoogleReviews(apiKey);
    return NextResponse.json({
      ...payload,
      isFallback: false,
    });
  } catch {
    return NextResponse.json({
      ...fallbackReviews,
      isFallback: true,

    });
  }
}
