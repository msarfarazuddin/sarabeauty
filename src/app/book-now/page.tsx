
import { BookingLink } from "@/components/booking-link";
import { socialMetadata } from "@/lib/social-metadata";
export default function BookNowPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-10">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
        Book Now
      </p>
      <h1 className="mt-4 font-[family:var(--font-display)] text-5xl text-[var(--color-ink)]">
        Book your Sara Beauty session
      </h1>
      <p className="mt-6 text-lg leading-relaxed">Contact our team to confirm your treatment, price and preferred appointment time.</p>
      <BookingLink target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-[#395E4C] px-6 py-3 font-semibold text-white">Book on WhatsApp</BookingLink>
      <Link href="/services" className="ml-6 underline underline-offset-4">Explore services</Link>
    </main>
  );
}
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  ...socialMetadata("Book a Massage in Abu Dhabi | Sara Beauty", "Contact Sara Beauty to book Sara Beauty’s home spa massage or spa treatment in Abu Dhabi. Ask about availability, treatments and package prices.", "/book-now/"),
  title: "Book a Massage in Abu Dhabi | Sara Beauty",
  description: "Contact Sara Beauty to book Sara Beauty’s home spa massage or spa treatment in Abu Dhabi. Ask about availability, treatments and package prices.",
  alternates: { canonical: "https://sarabeauty.ae/book-now/" },
};
