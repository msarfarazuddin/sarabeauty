import Content from "./packages-content";
import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/data/page-seo";

export const metadata = pageMetadata("/packages");

export default function Page() {
  return <><PageSchema route="/packages" /><Content /></>;
}
