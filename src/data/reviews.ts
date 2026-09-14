export type ReviewItem = {
  authorName: string;
  authorInitial: string;
  avatarColor: string;
  publishedAtLabel: string;
  rating: number;
  text: string;
};

export type ReviewsPayload = {
  averageRating: number;
  totalReviews: number;
  sourceLabel: string;
  reviews: ReviewItem[];
};

export const fallbackReviews: ReviewsPayload = {
  averageRating: 5,
  totalReviews: 26,
  sourceLabel: "Google",
  reviews: [
    {
      authorName: "Leandri Kapp",
      authorInitial: "L",
      avatarColor: "#cc1f69",
      publishedAtLabel: "26 July 2025",
      rating: 5,
      text: "I had a wonderful prenatal massage. Thank you for a very relaxing experience.",
    },
    {
      authorName: "M S (MS)",
      authorInitial: "M",
      avatarColor: "#cc1f69",
      publishedAtLabel: "23 July 2025",
      rating: 5,
      text: "Very professional therapist. Thanks for your great massage technique service. Thank you.",
    },
    {
      authorName: "Widiay Ningsih",
      authorInitial: "W",
      avatarColor: "#cc1f69",
      publishedAtLabel: "26 July 2025",
      rating: 5,
      text: "It was excellent experienced with Ms Talitha, I loved her sequences, she is kind, polite, and highly recommended.",
    },
    {
      authorName: "Fatima Alameri",
      authorInitial: "F",
      avatarColor: "#aa49d0",
      publishedAtLabel: "3 September 2024",
      rating: 5,
      text: "Mony does the massage in a professional way. I recommend you to try her because I am sure you will never regret it.",
    },
  ],
};
