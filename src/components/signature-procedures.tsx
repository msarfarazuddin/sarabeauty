"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import allServices from "@/data/service-card-data.json";

type Procedure = {
  name: string;
  href: string;
  image: string;
  alt: string;
  description: string;
};

const procedureMedia: Record<string, Omit<Procedure, "name" | "href" | "description">> = {
  "Post Lymphatic Massage": {
    image: "/assets/po.jpg",
    alt: "Post lymphatic massage treatment",
  },
  "Deep Tissue Massage": {
    image: "/assets/one.jpg",
    alt: "Deep tissue massage therapy",
  },
  "Sports Massage": {
    image: "/assets/sports.jpg",
    alt: "Sports massage treatment",
  },
  "Combination Massage": {
    image: "/assets/cm.jpg",
    alt: "Combination massage service",
  },
  "Prenatal Massage": {
    image: "/assets/pm.jpg",
    alt: "Prenatal massage session",
  },
  "Face Massage": {
    image: "/assets/fm-2.jpg",
    alt: "Face massage service",
  },
  "Himalaya Signature Massage": {
    image: "/assets/hm.jpg",
    alt: "Signature massage treatment",
  },
  "Brazilian Lymphatic Massage": {
    image: "/assets/bz.jpg",
    alt: "Brazilian lymphatic massage service",
  },
  Maderotherapy: {
    image: "/assets/m.jpg",
    alt: "Maderotherapy body sculpting session",
  },
  "Aromatherapy Massage": {
    image: "/assets/ar.jpg",
    alt: "Aromatherapy massage session",
  },
  "Foot Reflexology": {
    image: "/assets/fm-1.jpg",
    alt: "Foot reflexology treatment",
  },
  "Hot Stone": {
    image: "/assets/stone.jpg",
    alt: "Hot stone massage treatment",
  },
  "Postnatal Massage": {
    image: "/assets/pm-1.jpg",
    alt: "Postnatal massage session",
  },
  "Manicures and pedicures exfoliate": {
    image: "/assets/mdpd.jpg",
    alt: "Manicure and pedicure service",
  },
  "Brazilian Maderotherapy": {
    image: "/assets/Brazilian.jpg",
    alt: "Brazilian maderotherapy treatment",
  },
  "Relaxing Massage": {
    image: "/assets/rm.jpg",
    alt: "Relaxing massage session",
  },
  "Face Maderotherapy": {
    image: "/assets/fm.jpg",
    alt: "Face maderotherapy service",
  },
  "Thai Massage (without oil)": {
    image: "/assets/thai.jpg",
    alt: "Thai massage session",
  },
  "Full Body Scrub": {
    image: "/assets/fb.jpg",
    alt: "Full body scrub treatment",
  },
  "Dry Cupping Therapy": {
    image: "/assets/cub.jpg",
    alt: "Dry cupping therapy treatment",
  },
  "Ayurvedic Massage": {
    image: "/assets/ayurvedic-massage-abu-dhabi_9f28c635_35893cd3.jpg",
    alt: "Ayurvedic massage therapy",
  },
};

const fallbackProcedureImage = {
  image: "/assets/sara-home-spa-experience_e37f3cee_452fac89.jpg",
  alt: "Sara Beauty home spa experience",
};

const procedures: Procedure[] = allServices.map((service) => ({
  name: service.name,
  href: `/services/${service.slug}`,
  description: service.description,
  ...(procedureMedia[service.name] ?? fallbackProcedureImage),
}));

export function SignatureProcedures() {
  const [activeProcedure, setActiveProcedure] = useState(procedures[0]);

  return (
    <section className="mx-auto w-full bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-[1040px] pb-8 lg:pb-10">
          <h2
            className="max-w-[760px] text-[2.2rem] font-bold leading-[0.94] text-[var(--color-brand)] sm:text-[3rem] lg:text-[3.35rem]"
            style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
          >
            Massage Services in Abu Dhabi
          </h2>
          <div className="mt-5 max-w-[980px] space-y-4">
            <p
              className="text-[1.02rem] leading-[1.75] text-[var(--color-muted)] sm:text-[1.12rem] lg:text-[1.18rem]"
              style={{ fontFamily: '"Gallary", var(--font-body), sans-serif' }}
            >
              At Sara Beauty &amp; Slimming Home Spa, we offer professional massage services in
              Abu Dhabi for relaxation, muscle relief, recovery, and overall wellbeing.
            </p>
            <p className="text-[1.02rem] leading-[1.75] text-[var(--color-muted)] sm:text-[1.12rem] lg:text-[1.18rem]">
              Explore our massage services to find the treatment that best suits your needs,
              then book your preferred session.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-[410px_minmax(0,1fr)] lg:items-start">
          <div className="overflow-hidden bg-[#f6edc9] shadow-[-22px_22px_44px_rgba(57,94,76,0.16)]">
            <div className="bg-[var(--color-brand)] px-7 py-8 text-white sm:px-8">
              <h3
                className="text-[2.25rem] leading-[0.94] sm:text-[2.95rem]"
                style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
              >
                Our Signature Procedures
              </h3>
            </div>
          <div className="signature-procedures-scroll max-h-[376px] overflow-y-auto [direction:rtl]">
            <div className="[direction:ltr]">
              {procedures.map((procedure) => {
                const isActive = procedure.name === activeProcedure.name;

                return (
                  <button
                    key={procedure.name}
                    type="button"
                    onClick={() => setActiveProcedure(procedure)}
                    className={`flex min-h-[76px] w-full items-center px-9 text-left text-[1.02rem] transition sm:text-[1.1rem] ${
                      isActive
                        ? "bg-[#f6edc9] text-[var(--color-brand)]"
                        : "bg-[#f6edc9] text-[var(--color-ink)] hover:bg-[#fbf4dc]"
                    }`}
                  >
                    {procedure.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:pt-[150px]">
          <div className="relative">
            <div className="relative h-[300px] w-full overflow-hidden rounded-[0_28px_28px_0] sm:h-[360px] lg:h-[305px]">
              <Image
                src={activeProcedure.image}
                alt={activeProcedure.alt}
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="relative z-10 mx-auto -mt-10 w-[calc(100%-2rem)]  px-0 pb-3 pt-0 sm:w-[calc(100%-3rem)] lg:mx-0 lg:ml-14 lg:w-[calc(100%-6rem)]">
            <div className="inline-block bg-[var(--color-brand)] px-5 py-4 text-[#f5eccb] sm:px-6">
              <h3
                className="text-[1.55rem] leading-none sm:text-[1.9rem] font-bold"
                style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
              >
                {activeProcedure.name}
              </h3>
            </div>
            <p className="mt-5 max-w-[620px] text-[0.98rem] leading-[1.55] text-[var(--color-ink)] sm:text-[1.02rem] sm:leading-[1.65]">
              {activeProcedure.description}
            </p>
            <Link
              href={activeProcedure.href}
              className="mt-4 inline-flex rounded-full border border-[#7d766a] px-6 py-2.5 text-[0.95rem] text-[#706657] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            >
              Visit {activeProcedure.name}
            </Link>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
