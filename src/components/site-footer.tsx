"use client";

import { BookingLink } from "@/components/booking-link";

import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export default function SiteFooter() {
  return (
    <footer className="relative bg-[#f9f5e0] text-[#5E5B57]">
      <p className="mx-auto max-w-[1180px] px-6 pt-8 text-center text-sm leading-6">
        All treatments take place at Sara Beauty’s private home spa in Abu Dhabi. Clients visit us for their appointments; we do not offer home visits.
      </p>
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-7 px-6 py-8 md:grid-cols-[220px_1fr_1fr] md:gap-10 md:px-10 lg:gap-16 lg:py-10">
        {/* Logo + Back to top */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4 md:mb-6">
            <Image
              src="/assets/color logo.png"
              width={184}
              height={258}
              sizes="(max-width: 768px) 96px, 150px"
              alt="Sara Beauty & Slimming"
              className="h-auto w-[96px] object-contain md:w-[150px]"
            />
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 md:h-[112px] md:w-[112px] md:border-[3px] border-[#395E4C] text-[#395E4C] transition hover:bg-[#395E4C] hover:text-white"
          >
            <ChevronUp className="h-7 w-7 md:h-[54px] md:w-[54px]" strokeWidth={1.8} />
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 text-[20px] md:text-[22px] font-semibold text-black">
            Quick Links
          </h3>

          <div className="space-y-2 text-[16px] leading-relaxed md:text-[17px]">
            <Link href="/" className="block transition hover:text-[#395E4C]">
              Home
            </Link>

            <Link
              href="/about-us"
              className="block transition hover:text-[#395E4C]"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="block transition hover:text-[#395E4C]"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-4 space-y-1 text-[17px] font-semibold text-black">
            <a href="tel:+971544297974" className="block">
              +971 544 297 974
            </a>
          </div>

          <div className="mt-4 space-y-2 text-[16px] leading-relaxed md:text-[17px]">
            <a
              href="mailto:info@sarabeauty.ae"
              className="block transition hover:text-[#395E4C]"
            >
              info@sarabeauty.ae
            </a>

            <p>
              Khalid bin Waleed Street PO Box 36493
              <br />
              Abu Dhabi - U.A.E
            </p>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-3 text-[20px] md:text-[22px] font-semibold text-black">Services</h3>

          <div className="space-y-2 text-[16px] leading-relaxed md:text-[17px]">
            <Link
              href="/services/deep-tissue-massage"
              className="block transition hover:text-[#395E4C]"
            >
              Services Deep Tissue Massage
            </Link>

            <Link
              href="/services/brazilian-lymphatic-slimming-massage"
              className="block transition hover:text-[#395E4C]"
            >
              Brazilian Lymphatic Massage
            </Link>

            <Link
              href="/services/post-lymphatic-massage"
              className="block transition hover:text-[#395E4C]"
            >
              Post Lymphatic Massage
            </Link>

            <Link
              href="/services/maderotherapy"
              className="block transition hover:text-[#395E4C]"
            >
              Maderotherapy
            </Link>

            <Link
              href="/services/relaxing-massage"
              className="block transition hover:text-[#395E4C]"
            >
              Relaxing Massage
            </Link>
          </div>

          <h3 className="mb-2 mt-4 text-[20px] md:text-[22px] font-semibold text-black">
            Follow Us
          </h3>

          <span className="text-[17px]">
            Instagram
          </span>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <BookingLink phone="971544297974"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#395E4C] text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition hover:scale-105 md:right-6 md:h-[76px] md:w-[76px]"
      >
        <WhatsAppIcon size={42} />
      </BookingLink>

      {/* Bottom Bar */}
      <div className="bg-[#395E4C] text-white">
        <div className="mx-auto flex max-w-[1470px] flex-col items-center justify-between gap-1 px-6 py-3 text-center text-[14px] md:flex-row md:text-[16px]">
          <p>© Copyright 2026 by Sara Beauty</p>
          <p>Powered by Express Marketing</p>
        </div>
      </div>
    </footer>
  );
}
