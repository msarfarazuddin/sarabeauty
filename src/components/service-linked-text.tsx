import Link from "next/link";
import { Fragment } from "react";

export type ServiceTextLink = { start: number; end: number; href: string };
export type ServiceLinkMap = Record<string, ServiceTextLink[]>;

export function ServiceLinkedText({ text, links = [] }: { text: string; links?: ServiceTextLink[] }) {
  return <>{links.map((link, index) => {
    const before = text.slice(index ? links[index - 1].end : 0, link.start);
    return <Fragment key={`${link.start}-${link.href}`}>
      {before}<Link href={link.href} data-service-link="" className="underline decoration-current/40 underline-offset-4 hover:decoration-current">{text.slice(link.start, link.end)}</Link>
    </Fragment>;
  })}{text.slice(links.length ? links[links.length - 1].end : 0)}</>;
}
