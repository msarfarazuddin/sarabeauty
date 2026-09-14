import { pageSeo } from "@/data/page-seo";

export function PageSchema({ route }: { route: keyof typeof pageSeo }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSeo[route].structuredData).replace(/</g, "\\u003c") }} />;
}
