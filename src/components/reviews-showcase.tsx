"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fallbackReviews, type ReviewsPayload } from "@/data/reviews";

function Stars({ count = 5, size = "h-8 w-8" }: { count?: number; size?: string }) {
  return (
    <div className="flex items-center gap-0 text-[#f7b500]">
      {Array.from({ length: count }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" className={`${size} fill-current`}>
          <path d="m10 1.6 2.58 5.22 5.76.84-4.17 4.06.98 5.74L10 14.75 4.85 17.46l.98-5.74L1.66 7.66l5.76-.84L10 1.6Z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <span className="text-[2.2rem] leading-none font-semibold tracking-[-0.04em]">
      <span className="text-[#4285f4]">G</span>
      <span className="text-[#ea4335]">o</span>
      <span className="text-[#fbbc05]">o</span>
      <span className="text-[#4285f4]">g</span>
      <span className="text-[#34a853]">l</span>
      <span className="text-[#ea4335]">e</span>
    </span>
  );
}

export function ReviewsShowcase() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [reviewsData, setReviewsData] = useState<ReviewsPayload>(fallbackReviews);

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        const response = await fetch("/api/google-reviews/");
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ReviewsPayload;
        if (isMounted && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviewsData(data);
        }
      } catch {
        // Fallback reviews stay visible when Google API is not configured.
      }
    };

    void loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollCards = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction === "right" ? 380 : -380,
      behavior: "smooth",
    });
  };

  const toggleReview = (key: string) => {
    setExpandedReviews((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20 lg:pb-10">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="pl-0 text-left sm:pl-[18%]">
          <h2
            className="text-[2.7rem] leading-[0.9] font-bold text-[var(--color-brand)] sm:text-[3.8rem]"
            style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
          >
            Loved by those
          </h2>
          <p className="mt-1 text-[2.2rem] leading-[0.93] text-black sm:text-[3.75rem]">
            who glow with us
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
          <div className="text-center lg:pl-1">
            <p className="text-[24px] font-semibold uppercase leading-none text-black">EXCELLENT</p>
            <div className="mt-3 flex justify-center">
              <Stars />
            </div>
            <p className="mt-2 text-[0.95rem] text-black sm:text-[1.05rem]">
              Based on <span className="font-semibold">{reviewsData.totalReviews} reviews</span>
            </p>
            <div className="mt-2 flex justify-center">
              <GoogleMark />
            </div>
          </div>

          <div className="relative min-w-0">
            <button
              type="button"
              onClick={() => scrollCards("left")}
              className="absolute left-0 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8d8d8] bg-white text-[#6a6a6a] shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white active:border-[var(--color-brand)] active:bg-[var(--color-brand)] active:text-white lg:flex"
              aria-label="Previous reviews"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.4]">
                <path d="M15 5 8 12l7 7" />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {reviewsData.reviews.map((review) => {
                const reviewKey = `${review.authorName}-${review.publishedAtLabel}`;
                const isExpanded = Boolean(expandedReviews[reviewKey]);
                const shouldCollapse = review.text.length > 95;

                return (
                  <article
                    key={reviewKey}
                    className={`flex w-full min-w-full snap-start flex-col overflow-hidden rounded-[18px] border border-[#d7d7d7] bg-white p-5 shadow-none md:min-w-[calc((100%-1rem)/2)] md:basis-[calc((100%-1rem)/2)] xl:min-w-[calc((100%-2rem)/3)] xl:basis-[calc((100%-2rem)/3)] ${
                      isExpanded ? "xl:h-auto" : "xl:h-[236px]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-0">
                      <div className="flex items-start gap-0">
                        <div
                          className="mr-[7px] flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full text-[1.35rem] font-semibold text-white"
                          style={{ backgroundColor: review.avatarColor }}
                        >
                          {review.authorInitial}
                        </div>
                        <div>
                          <p className="text-[0.98rem] font-semibold leading-none text-black sm:text-[1.02rem]">
                            {review.authorName}
                          </p>
                          <p className="mt-1 text-[0.85rem] text-[#666666] sm:text-[0.92rem]">
                            {review.publishedAtLabel}
                          </p>
                        </div>
                      </div>
                      <div className="relative h-[22px] w-[62px] shrink-0">
                        <Image
                          src="/assets/icon.svg"
                          alt="Google"
                          fill
                          className="object-contain object-right"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <Stars count={review.rating} size="h-[18px] w-[18px]" />
                      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-[#4f7df3]">
                        <path d="M10 1.5 12.3 4l3.4-.26.93 3.28 3.1 1.42-1.53 3.06 1.53 3.06-3.1 1.42-.93 3.28-3.4-.26L10 21.5 7.7 19l-3.4.26-.93-3.28-3.1-1.42 1.53-3.06L.27 8.44l3.1-1.42.93-3.28L7.7 4 10 1.5Z" />
                      </svg>
                    </div>

                    <p
                      className={`mt-3 text-[0.98rem] leading-[1.38] text-black sm:text-[1.02rem] ${
                        shouldCollapse && !isExpanded ? "line-clamp-3" : ""
                      }`}
                    >
                      {review.text}
                    </p>

                    <div className="mt-auto pt-3">
                      {shouldCollapse ? (
                        <button
                          type="button"
                          onClick={() => toggleReview(reviewKey)}
                          className="text-[0.95rem] text-[#666666] transition hover:text-[var(--color-brand)]"
                        >
                          {isExpanded ? "Hide" : "Read more"}
                        </button>
                      ) : (
                        <div className="h-[24px]" />
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollCards("right")}
              className="absolute right-0 top-1/2 z-10 hidden h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#dbdbdb] bg-white text-[#6a6a6a] shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white active:border-[var(--color-brand)] active:bg-[var(--color-brand)] active:text-white lg:flex"
              aria-label="Next reviews"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.4]">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>

            <p className="mt-4 pr-1 text-right text-[0.98rem] text-black sm:text-[1rem]">
              Showing our latest reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
