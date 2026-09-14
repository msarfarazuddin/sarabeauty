"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import allServices from "@/data/service-card-data.json";

const serviceColumns = [
  [
    "Post Lymphatic Massage",
    "Deep Tissue Massage",
    "Sports Massage",
    "Combination Massage",
    "Prenatal Massage",
    "Face Massage",
    "Himalaya Signature Massage",
  ],
  [
    "Brazilian Lymphatic Massage",
    "Maderotherapy",
    "Aromatherapy Massage",
    "Foot Reflexology",
    "Hot Stone",
    "Postnatal Massage",
    "Manicures and pedicures exfoliate",
  ],
  [
    "Brazilian Maderotherapy",
    "Relaxing Massage",
    "Face Maderotherapy",
    "Thai Massage (without oil)",
    "Full Body Scrub",
    "Dry Cupping Therapy",
    "Ayurvedic Massage",
  ],
];

function serviceHref(label: string) {
  const match = allServices.find((service) => service.name === label);
  return match ? `/services/${match.slug}` : "/services";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const dialog = mobileDialogRef.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      desktop.removeEventListener("change", onResize);
    };
  }, [mobileOpen]);
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openServicesMenu = () => {
    if (servicesCloseTimeoutRef.current) {
      clearTimeout(servicesCloseTimeoutRef.current);
      servicesCloseTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const closeServicesMenu = () => {
    if (servicesCloseTimeoutRef.current) {
      clearTimeout(servicesCloseTimeoutRef.current);
    }
    servicesCloseTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimeoutRef.current = null;
    }, 120);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-0 pt-0 sm:px-0 sm:pt-0 lg:px-0">
      <div className="pointer-events-auto mx-auto max-w-[1200px]">
        <div className="relative h-[86px] bg-[#395E4C] px-[15%] text-white lg:rounded-[0_0_26px_26px] lg:bg-[var(--color-brand)] lg:h-[90px] lg:px-[70px] lg:pb-0 lg:pt-0">
          <div className="grid h-full grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
            <div className="hidden h-[70px] items-end gap-8 pb-5  lg:flex xl:gap-14">
              <Link href="/" className={`site-nav-link flex h-full items-end ${isActive("/") ? "opacity-100" : ""}`}>
                Home
              </Link>
              <Link
                href="/about-us"
                className={`site-nav-link flex h-full items-end ${isActive("/about-us") ? "opacity-100" : ""}`}
              >
                About
              </Link>
              <div
                className="relative flex h-full items-end"
                onMouseEnter={openServicesMenu}
                onMouseLeave={closeServicesMenu}
                onFocus={openServicesMenu}
              >
                <Link
                  href="/services"
                  className={`site-nav-link flex h-full items-end ${
                    isActive("/services") ? "opacity-100" : ""
                  }`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  className="ml-2 flex h-[19px] items-center justify-center text-current"
                  aria-label="Toggle services menu"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((value) => !value)}
                >
                  <span
                    className={`block h-0 w-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-current transition ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <Link
              href="/"
              className="relative z-20 block h-[76px] w-[100px] lg:mx-auto lg:rounded-[0_0_20px_20px] lg:bg-[var(--color-brand)] lg:-mb-[58px] lg:h-[162px] lg:w-[170px] lg:pb-4"
              aria-label="Sara Beauty home"
            >
              <Image
                src="/assets/logowthite.png"
                alt="Sara Beauty"
                sizes="(min-width: 1024px) 170px, 100px"
                fill
                className="object-contain lg:px-7 lg:pb-4 lg:pt-3"
              />
            </Link>

            <div className="hidden h-[70px] items-end justify-end gap-8 pb-5 lg:flex xl:gap-14">
              <Link
                href="/packages"
                className={`site-nav-link flex h-full items-end ${isActive("/packages") ? "opacity-100" : ""}`}
              >
                Packages
              </Link>
              <Link
                href="/blogs"
                className={`site-nav-link flex h-full items-end ${isActive("/blogs") ? "opacity-100" : ""}`}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className={`site-nav-link flex h-full items-end ${isActive("/contact") ? "opacity-100" : ""}`}
              >
                Contact us
              </Link>
            </div>

            <button
              type="button"
              className="justify-self-end rounded-md p-3 text-white lg:hidden"
              aria-label="Toggle menu"
              aria-controls="mobile-navigation"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span className="block h-[3px] w-6 rounded-full bg-current" />
              <span className="mt-1 block h-[3px] w-6 rounded-full bg-current" />
              <span className="mt-1 block h-[3px] w-6 rounded-full bg-current" />
            </button>
          </div>

          <div
            className={`absolute left-1/2 top-[110px] z-100 hidden transition lg:block ${
              servicesOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            style={{ transform: "translateX(-50%)" }}
            onMouseEnter={openServicesMenu}
            onMouseLeave={closeServicesMenu}
          >
            <div className="h-[360px] w-[1200px] overflow-hidden rounded-[22px] bg-[var(--color-menu)] text-[var(--color-menu-text)] shadow-[0_18px_38px_rgba(57,94,76,0.14)]">
              <div className="grid h-full grid-cols-[250px_1fr]">
                <div className="relative overflow-hidden bg-[var(--color-brand)] p-7 text-white">
                  <Image
                    src="/assets/sara-menu-illustration_e5a5d658_da0db38d.png"
                    alt=""
                    fill
                    className="object-cover opacity-28"
                  />
                  <div className="relative z-10 flex h-full flex-col justify-end">
                    <p className="max-w-[168px] font-[family:var(--font-display)] text-[32px] leading-[1.02]">
                      Pamper Your Body. Refresh Your Soul.
                    </p>
                  </div>
                </div>
                <div className="grid h-full grid-cols-3 gap-x-14 px-10 py-8">
                  {serviceColumns.map((column, index) => (
                    <div key={index} className="space-y-5">
                      {column.map((service) => (
                        <Link
                          key={service}
                          href={serviceHref(service)}
                          className="block text-[17px] leading-[1.14] font-medium transition hover:text-[var(--color-brand)]"
                          onClick={() => setServicesOpen(false)}
                        >
                          {service}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <dialog
            ref={mobileDialogRef}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mobile-menu-panel fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-[min(88vw,360px)] max-w-none overflow-y-auto overscroll-contain border-0 bg-[var(--color-menu)] p-0 text-[var(--color-menu-text)] shadow-2xl backdrop:bg-black/45 backdrop:backdrop-blur-sm"
            onClose={() => setMobileOpen(false)}
            onClick={(event) => {
              if (event.target === event.currentTarget && event.clientX < event.currentTarget.getBoundingClientRect().left) setMobileOpen(false);
            }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-[#395E4C] px-6 py-4 text-white">
              <Image src="/assets/logowthite.png" alt="Sara Beauty" width={86} height={68} className="h-[68px] w-[86px] object-contain" />
              <button type="button" autoFocus aria-label="Close menu" onClick={() => setMobileOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-3xl hover:bg-white/10"><span aria-hidden="true">×</span></button>
            </div>
            <div className="p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <nav aria-label="Mobile" className="space-y-1">
                <Link href="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
                <Link
                  href="/about-us"
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  About
                </Link>
                <div className="mobile-nav-link flex items-center justify-between">
                  <Link href="/services" onClick={() => setMobileOpen(false)}>
                    Services
                  </Link>
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center"
                    aria-label="Toggle services menu"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((value) => !value)}
                  >
                    <span
                    className={`inline-block h-0 w-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-current transition ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                    />
                  </button>
                </div>
                <div hidden={!servicesOpen} className="my-3">
                  <div className="grid gap-1 rounded-[20px] bg-white/55 p-3">
                    {allServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="rounded-xl px-3 py-3 text-sm leading-relaxed hover:bg-white/70"
                        onClick={() => {
                          setMobileOpen(false);
                          setServicesOpen(false);
                        }}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  href="/packages"
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  Packages
                </Link>
                <Link
                  href="/blogs"
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  Blogs
                </Link>
                <Link
                  href="/contact"
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact us
                </Link>
              </nav>
            </div>
          </dialog>
        </div>
      </div>
    </header>
  );
}
