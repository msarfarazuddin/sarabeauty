import type { BlogFaq } from "@/data/site";

import suppliedPages from "./location-pages.json";

type Feature = { title: string; description: string };
export type LocationContent = {
  metaTitle?: string; metaDescription?: string; focusKeyword?: string; canonical?: string;
  structuredData?: Record<string, unknown>; whyEyebrow?: string;
  eyebrow: string; title: string; intro: string; heroImage: string; heroImageRaised?: boolean;
  whyTitle: string; whyParagraphs: string[]; benefits: Feature[];
  treatmentsTitle: string; treatmentsIntro: string;
  treatments: { name: string; slug: string; image: string; description: string }[];
  differenceTitle: string; differenceIntro: string; differences: Feature[];
  bookingTitle: string; bookingDescription: string; faqTitle: string; faqs: BlogFaq[];
};

// Add supplied content one location at a time. Omitted fields use shared defaults.
export const locationOverrides: Record<string, Partial<LocationContent>> = {
  ...suppliedPages,
};

export function getLocationContent(location: { slug: string; name: string }): LocationContent {
  const name = location.name;
  return {
    eyebrow: `Your Wellness Destination in ${name}`,
    title: `Professional Home Spa Services in ${name}`,
    intro: `Sara Beauty provides massage and spa treatments in ${name}, Abu Dhabi. Explore relaxing, deep tissue, sports and aromatherapy massage, along with selected body treatments. Choose a little time for yourself, and let us help you plan your session.`,
    heroImage: "/assets/sara-live-area-hero_0af55359.png",
    whyTitle: `Massage & Spa Services in ${name}`,
    whyParagraphs: [
      `Finding time for yourself can be difficult with a busy schedule. Sara Beauty brings a calm, comfortable home spa experience to women in ${name}, with treatments you can choose around your preferences.`,
      "Whether you want to unwind after a long day or explore a body treatment, our team can help you choose your service and arrange an appointment. Settle into your own space and enjoy time dedicated at our home spa.",
    ],
    benefits: [
      { title: "Your own peaceful space", description: "Enjoy your treatment in the privacy and familiar comfort of Sara Beauty’s home spa." },
      { title: "A treatment that suits you", description: "Choose from relaxing, deep tissue, sports, aromatherapy and selected body treatments." },
      { title: "Personal attention", description: "Share your preferences with your therapist so you feel comfortable throughout your session." },
    ],
    treatmentsTitle: "Our Signature Treatments",
    treatmentsIntro: "A moment to unwind. A treatment chosen for you. Explore a few of our favourites.",
    treatments: [
      { name: "Combination Massage", slug: "combination-massage", image: "/assets/cm.jpg", description: "A thoughtful blend of massage techniques for your session." },
      { name: "Foot Reflexology", slug: "foot-reflexology", image: "/assets/fm-1.jpg", description: "Give tired feet a little extra care and attention." },
      { name: "Thai Massage", slug: "thai-massage-without-oil", image: "/assets/thai.jpg", description: "Explore a traditional massage experience without oil." },
    ],
    differenceTitle: "What Makes Sara Beauty Different?",
    differenceIntro: "From choosing your treatment to arranging your appointment, we keep Sara Beauty’s home spa experience personal, comfortable and simple.",
    differences: [
      { title: "Home-spa privacy", description: "Make space for yourself without leaving the comfort of home." },
      { title: "Personalised treatments", description: "Choose your service and share what you need from your session." },
      { title: "Female therapists", description: "Enjoy attentive care from our team of female therapists." },
      { title: "Easy booking", description: "Speak to our team to find an available time that works for you." },
    ],
    bookingTitle: `Book Your ${name} Spa Experience`,
    bookingDescription: `Make room for a little calm. Contact Sara Beauty to choose Sara Beauty’s home spa massage or spa treatment in ${name}, confirm availability and arrange a time that suits you.`,
    faqTitle: `Your ${name} Spa Questions, Answered`,
    faqs: [
      { question: `Does Sara Beauty offer home spa services for women in ${name}?`, answer: `Yes, Sara Beauty offers home spa massage and spa treatments for women in ${name}, Abu Dhabi. Contact our team to confirm availability for your visit to our home spa.` },
      { question: `Which massage treatments can I book in ${name}?`, answer: "Explore relaxing, deep tissue, sports, combination and aromatherapy massage, along with foot reflexology and selected body treatments. Our team can confirm the available options when you book." },
      { question: "How do I choose a treatment?", answer: "Tell our team about your preferences, preferred session length and any concerns before booking. We can explain the available treatments and help you choose your session." },
      { question: `How much does a massage in ${name} cost?`, answer: "Prices depend on the treatment and session duration. Browse our services and packages for prices, or ask our team to confirm the total before booking." },
      { question: "How do I arrange my appointment?", answer: "Tap Book Now to contact us on WhatsApp. Share your preferred treatment and appointment time, and our team will confirm availability and booking details." },
    ],
    ...locationOverrides[location.slug],
  };
}
