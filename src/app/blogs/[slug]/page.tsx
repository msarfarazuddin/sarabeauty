
import { BookingLink } from "@/components/booking-link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogImage } from "@/data/blog-image";
import { CalendarDays } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { notFound } from "next/navigation";
import { getBlogContent } from "@/data/blog-content";
import { allPosts } from "@/data/site";

type BlogPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const title = post.metaTitle?.trim() || post.seo?.title?.trim() || post.title;
  const description = post.metaDescription?.trim() || post.seo?.description?.trim() || post.excerpt;
  const canonical = `https://sarabeauty.ae/blogs/${post.slug}/`;
  const keywords = Array.from(new Set([
    post.focusKeyword,
    post.seo?.focusKeyword,
    ...(post.keywords ?? []),
    ...(post.seo?.keywords ?? []),
  ].map((keyword) => keyword?.trim()).filter((keyword): keyword is string => Boolean(keyword))));
  const image = new URL(getBlogImage(post.image, post.slug), "https://sarabeauty.ae").href;
  const isoDate = (value?: string) => {
    if (!value) return undefined;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
  };

  return {
    title: { absolute: title },
    description,
    keywords: keywords.length ? keywords : undefined,
    authors: post.author ? [{ name: post.author }] : undefined,
    category: post.category,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: "Sara Beauty",
      images: [{ url: image, alt: post.title }],
      publishedTime: isoDate(post.publishedAt),
      modifiedTime: isoDate(post.modifiedAt),
      authors: post.author ? [post.author] : undefined,
      section: post.category,
      tags: post.tags?.length ? post.tags : keywords,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: post.title }],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = allPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const { sections, faqs } = getBlogContent(post);
  const url = `https://sarabeauty.ae/blogs/${post.slug}/`;
  const date = (value?: string) => {
    const parsed = value ? new Date(value) : undefined;
    return parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : undefined;
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${url}#article`,
        headline: post.title, description: post.metaDescription || post.excerpt,
        mainEntityOfPage: url, url,
        image: new URL(getBlogImage(post.image, post.slug), "https://sarabeauty.ae").href,
        datePublished: date(post.publishedAt), dateModified: date(post.modifiedAt || post.publishedAt),
        author: { "@type": !post.author || /sara beauty/i.test(post.author) ? "Organization" : "Person", name: post.author || "Sara Beauty" },
        publisher: { "@type": "Organization", name: "Sara Beauty", url: "https://sarabeauty.ae/" },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://sarabeauty.ae/" },
          { "@type": "ListItem", position: 2, name: "Blogs", item: "https://sarabeauty.ae/blogs/" },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="w-full overflow-hidden bg-white -mt-[110px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="relative overflow-hidden bg-[#eee7bd] pb-28 pt-[205px] sm:pb-32 sm:pt-[225px] lg:pb-36 lg:pt-[255px]">
        <div className="relative z-10 mx-auto w-full max-w-[1080px] px-5 text-center sm:px-8 lg:px-10">
          <h1 className="text-[32px] leading-[1.08] text-[#395E4C] sm:text-[42px] lg:text-[51px]" style={{ fontFamily: "var(--font-display), serif" }}>{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[12px] text-[#395E4C]"><CalendarDays className="h-3.5 w-3.5" /><time>{post.publishedAt}</time><span aria-hidden="true">•</span><span>{post.category}</span><span aria-hidden="true">?</span><span className="capitalize">By {post.author || "Sara Beauty"}</span></div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[68px] sm:h-[82px] lg:h-[96px]"><svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true"><path d="M0 28C210 28 350 36 515 56C680 76 810 87 985 75C1138 65 1260 46 1440 50V140H0V28Z" fill="white" /></svg></div>
      </section>

      <article className="mx-auto w-full max-w-[1000px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:pb-28">
        <div className="relative mx-auto aspect-[1.35/1] w-full max-w-[620px] overflow-hidden rounded-[14px] shadow-[0_8px_24px_rgba(57,94,76,0.14)]"><Image src={getBlogImage(post.image, post.slug)} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 620px" className="object-contain" /></div>
        <div className="mx-auto mt-10 max-w-[1000px] text-[#272727] sm:mt-12">
          {post.contentHtml ? (
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            <>
              {sections.map((section, sectionIndex) => <section key={sectionIndex} className="mb-8 last:mb-0 sm:mb-10">{section.heading ? <h2 className="text-[28px] font-semibold leading-[1.12] text-[#242424] sm:text-[33px]">{section.heading}</h2> : null}{section.subheading ? <h3 className="mt-2 text-[21px] font-semibold leading-tight text-[#363636] sm:text-[24px]">{section.subheading}</h3> : null}<div className="mt-3 space-y-3 whitespace-pre-line text-[15px] leading-[1.62] text-[#4d4d4d] sm:text-[16px]">{(section.paragraphs ?? []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.bullets ? <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] leading-[1.5] text-[#4d4d4d] sm:text-[16px]">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</section>)}
              {faqs?.length ? <section className="mt-11 border-t border-[#395E4C]/15 pt-9 sm:mt-14"><h2 className="text-[29px] font-semibold leading-[1.12] text-[#242424] sm:text-[34px]">Frequently Asked Questions</h2><div className="mt-6 space-y-7">{faqs.map((faq) => <div key={faq.question}><h3 className="text-[20px] font-semibold leading-tight text-[#303030] sm:text-[23px]">{faq.question}</h3>{faq.answer ? <p className="mt-2 whitespace-pre-line text-[15px] leading-[1.62] text-[#4d4d4d] sm:text-[16px]">{faq.answer}</p> : null}</div>)}</div></section> : null}
            </>
          )}
          <BookingLink target="_blank" rel="noopener noreferrer" className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#395E4C] px-6 py-3 text-[14px] font-bold text-white transition hover:bg-[#395E4C]"><WhatsAppIcon className="h-4 w-4" /> Book an appointment</BookingLink>
        </div>
      </article>
    </main>
  );
}

export function generateStaticParams() {
  return allPosts.map(item => ({ slug: item.slug }));
}
