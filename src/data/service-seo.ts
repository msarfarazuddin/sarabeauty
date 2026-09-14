import source from "./service-seo.json";
import pages from "./page-seo.json";
import type { BlogFaq } from "./site";
import type { ServiceLinkMap } from "../components/service-linked-text";

type ServiceSeo = {
  metaTitle: string;
  metaDescription: string;
  faqTitle: string;
  faqs: BlogFaq[];
  structuredData: Record<string, unknown>;
  extraIntro: string[];
  links: ServiceLinkMap;
};

export const serviceSeo: Record<string, ServiceSeo> = {
  ...source,
  "postnatal-massage": pages["/services/postnatal-massage"],
};
