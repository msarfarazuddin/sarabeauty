import { ServiceLinkedText, type ServiceTextLink } from "./service-linked-text";

export type ContextLink = readonly [anchor: string, href: string];

export function ContextualLinks({ text, links }: { text: string; links: readonly ContextLink[] }) {
  const ranges: ServiceTextLink[] = [];
  for (const [anchor, href] of links) {
    const start = text.indexOf(anchor);
    if (start < 0) continue;
    const end = start + anchor.length;
    if (ranges.some(range => start < range.end && end > range.start)) continue;
    ranges.push({ start, end, href });
  }
  ranges.sort((a, b) => a.start - b.start);
  return <ServiceLinkedText text={text} links={ranges} />;
}
