import Content from "./blogs-content";
import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/data/page-seo";

export const metadata = pageMetadata("/blogs");

export default function Page() {
  return <><PageSchema route="/blogs" /><Content /></>;
}
