"use client";

import Image from "next/image";
import { getBlogImage } from "@/data/blog-image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import cardData from "@/data/card-data.json";
const allPosts = cardData.posts;

export default function BlogsPage() {
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filteredPosts = allPosts.filter((post) => {
    const text = `${post.title} ${post.excerpt} ${post.category} ${post.author}`.toLowerCase();
    return searchTerms.every((term) => text.includes(term));
  });
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full overflow-hidden bg-white -mt-[34px] sm:-mt-[42px] md:-mt-[110px]">
      <section className="blogs-hero relative min-h-[390px] overflow-hidden bg-[#eee7bd] pb-[110px] pt-[235px] sm:min-h-[420px] sm:pb-[125px] sm:pt-[250px] lg:min-h-[455px] lg:pb-[140px] lg:pt-[220px]">
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 text-center sm:px-8 lg:px-10">
          <h1
            className="text-[46px] leading-none text-[#395E4C] sm:text-[56px] lg:text-[64px]"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Blogs
          </h1>
          <form
            role="search"
            aria-label="Search blogs"
            onSubmit={(event) => event.preventDefault()}
            className="mx-auto mt-7 flex max-w-[560px] items-center gap-3 rounded-full border border-[#395E4C]/25 bg-white px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#395E4C]"
          >
            <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-[#395E4C]" />
            <label htmlFor="blog-search" className="sr-only">Search blogs</label>
            <input
              id="blog-search"
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search blogs..."
              className="min-w-0 flex-1 bg-transparent py-1 text-base text-[#395E4C] outline-none placeholder:text-[#395E4C]/60"
            />
          </form>
        </div>

        <div className="blogs-hero-curve pointer-events-none absolute inset-x-0 bottom-[-1px] h-[90px] sm:h-[105px] lg:h-[120px]">
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M0 28C210 28 350 36 515 56C680 76 810 87 985 75C1138 65 1260 46 1440 50V140H0V28Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="bg-white px-5 pb-24 pt-12 sm:px-8 sm:pt-14 lg:px-10 lg:pb-28 lg:pt-16">
        <p role="status" className="mx-auto mb-6 max-w-[1160px] text-center text-sm text-[#395E4C]">
          {searchTerms.length > 0
            ? `${filteredPosts.length} blog${filteredPosts.length === 1 ? "" : "s"} found`
            : ""}
        </p>
        {filteredPosts.length === 0 && (
          <div className="mx-auto max-w-[560px] py-10 text-center text-[#395E4C]">
            <h2 className="text-2xl font-semibold">No blogs found</h2>
            <p className="mt-3">Try a different keyword or clear your search to see all blogs.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
              className="mt-5 rounded-full bg-[#395E4C] px-6 py-3 font-semibold text-white"
            >
              Clear search
            </button>
          </div>
        )}
        <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <article
              key={post.slug}
              className="flex min-h-[530px] flex-col overflow-hidden rounded-[20px] border border-[#395E4C]/70 bg-white shadow-[0_8px_22px_rgba(57,94,76,0.12)]"
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="relative block aspect-[1.23/1] w-full overflow-hidden bg-[#f5f0da]"
              >
                <Image
                  src={getBlogImage(post.image, post.slug)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 370px"
                  className="object-contain"
                />

                <span className="absolute right-5 top-5 max-w-[78%] rounded-full bg-[#f7efc7] px-4 py-2 text-[11px] font-bold uppercase leading-none text-black shadow-sm">
                  {post.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
                <Link href={`/blogs/${post.slug}`} className="block">
                  <h2 className="text-[24px] font-semibold leading-[1.12] text-[#395E4C] transition hover:text-[#395E4C]">
                    {post.title}
                  </h2>
                </Link>

<p className="mt-3 text-[13px] capitalize text-[#395E4C]">By {post.author || "Sara Beauty"}</p>
                <p className="mt-4 line-clamp-3 text-[16px] leading-[1.55] text-[#1f1f1f]">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="mt-auto pt-5 text-[13px] font-bold uppercase tracking-[0.01em] text-[#395E4C] transition hover:text-black"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 ? (
          <nav
            className="mt-14 flex flex-wrap items-center justify-center gap-2 sm:mt-16"
            aria-label="Blog pagination"
          >
            <button
              type="button"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#395E4C]/25 text-[#395E4C] transition hover:border-[#395E4C] hover:bg-[#395E4C] hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => changePage(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`h-10 min-w-10 rounded-full px-3 text-[14px] font-bold transition ${
                  currentPage === page
                    ? "bg-[#395E4C] text-white shadow-[0_5px_12px_rgba(57,94,76,0.25)]"
                    : "text-[#395E4C] hover:bg-[#eee7bd]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#395E4C]/25 text-[#395E4C] transition hover:border-[#395E4C] hover:bg-[#395E4C] hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </nav>
        ) : null}
      </section>
    </main>
  );
}
