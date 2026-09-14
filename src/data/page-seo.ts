import type { Metadata } from "next";
import source from "./page-seo.json";
import { socialMetadata } from "../lib/social-metadata";
import type { ContextLink } from "../components/contextual-links";

export const pageSeo = source;
export function pageMetadata(route: keyof typeof source): Metadata {
  const page = source[route];
  return {
    ...socialMetadata(page.metaTitle, page.metaDescription, route === "/" ? "/" : `${route}/`),
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: `https://sarabeauty.ae${route === "/" ? "/" : `${route}/`}` },
  };
}

export const homeServiceLinks: ContextLink[] = [
  ["Deep Tissue Massage", "/services/deep-tissue-massage"],
  ["Relaxing Massage", "/services/relaxing-massage"],
  ["Sports Massage", "/services/sports-massage"],
  ["Aromatherapy", "/services/aromatherapy-massage"],
  ["Lymphatic Drainage Massage", "/services/post-lymphatic-massage"],
  ["Maderotherapy", "/services/maderotherapy"],
  ["Prenatal Massage", "/services/prenatal-massage"],
  ["Thai Massage", "/services/thai-massage-without-oil"],
];
export const homeFaqLinks: Record<number, ContextLink[]> = {
  3: [["Deep Tissue Massage", "/services/deep-tissue-massage"]],
  4: [["Deep Tissue", "/services/deep-tissue-massage"], ["Relaxing", "/services/relaxing-massage"], ["Sports", "/services/sports-massage"], ["Aromatherapy", "/services/aromatherapy-massage"]],
};
export const servicesIntro = "Explore Sara Beauty’s spa and massage treatments in Abu Dhabi, from Deep Tissue and Sports Massage to Relaxing, Aromatherapy, Lymphatic Drainage, Prenatal, Thai and Hot Stone Massage.";
export const servicesIntroLinks: ContextLink[] = [
  ["Deep Tissue", "/services/deep-tissue-massage"], ["Sports Massage", "/services/sports-massage"],
  ["Relaxing", "/services/relaxing-massage"], ["Aromatherapy", "/services/aromatherapy-massage"],
  ["Lymphatic Drainage", "/services/post-lymphatic-massage"], ["Prenatal", "/services/prenatal-massage"],
  ["Thai", "/services/thai-massage-without-oil"], ["Hot Stone Massage", "/services/hot-stone"],
];
export const chooseMassage = "Choose Deep Tissue Massage for muscle tension, Relaxing Massage or Aromatherapy Massage for stress relief, and Sports Massage for recovery. Lymphatic Drainage Massage offers a gentle wellness-focused treatment, while Prenatal Massage and Postnatal Massage are tailored to different stages of motherhood.";
export const chooseMassageLinks: ContextLink[] = [
  ...homeServiceLinks.filter(([name]) => !["Aromatherapy", "Maderotherapy", "Thai Massage"].includes(name)),
  ["Aromatherapy Massage", "/services/aromatherapy-massage"], ["Postnatal Massage", "/services/postnatal-massage"],
];
export const servicesFaqLinks: Record<number, ContextLink[]> = {
  1: [["Deep Tissue", "/services/deep-tissue-massage"], ["Relaxing", "/services/relaxing-massage"], ["Aromatherapy Massage", "/services/aromatherapy-massage"]],
  2: [["Deep Tissue Massage", "/services/deep-tissue-massage"]],
  3: [["Relaxing Massage", "/services/relaxing-massage"], ["Aromatherapy Massage", "/services/aromatherapy-massage"]],
  4: [["Prenatal", "/services/prenatal-massage"], ["Postnatal Massage", "/services/postnatal-massage"]],
};
