
import Image from "next/image";
import { getBlogImage } from "@/data/blog-image";
import Link from "next/link";
import cardData from "@/data/card-data.json";
const featuredPosts = cardData.posts;

const latestPosts = [...featuredPosts]
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  )
  .slice(0, 4);

export function BlogShowcase() {
  return (
    <section className="bg-[var(--color-brand)] pt-12 sm:pt-14 lg:pt-16">
      {/* TOP HEADING SECTION */}
      <div className="mx-auto w-full max-w-[1110px] px-5 sm:px-6">
        <div className="flex flex-col gap-7 pb-10 md:flex-row md:items-center md:justify-between lg:pb-12">
          <h2
            className="
              max-w-[430px]
              text-[2.7rem]
              leading-[1.02]
              text-white
              sm:text-[3.1rem]
              lg:text-[3.35rem]
            "
            style={{
              fontFamily: '"Gallary", var(--font-display), serif',
            }}
          >
            Beauty Insights &amp;
            <br />
            Wellness Tips
          </h2>

          <Link
            href="/blogs"
            className="
              inline-flex
              w-fit
              min-w-[145px]
              items-center
              justify-center
              rounded-full
              bg-[#efe3ab]
              px-7
              py-[10px]
              text-[14px]
              font-semibold
              text-black
              transition-all
              duration-300
              hover:bg-white
            "
          >
            Explore More
          </Link>
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {latestPosts.map((post) => (
          <article
            key={post.slug}
            className="
              relative
              flex
              h-full
              flex-col
              bg-white
              text-black
            "
          >
            {/* IMAGE */}
            <Link
              href={`/blogs/${post.slug}`}
              className="relative block"
            >
              <div
                className="
                  relative
                  h-[280px]
                  w-full
                  overflow-hidden
                  sm:h-[290px]
                  lg:h-[285px]
                "
              >
                <Image
                  src={getBlogImage(post.image, post.slug)}
                  alt={post.title}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1280px) 50vw,
                    25vw
                  "
                  className="
                    object-contain
                  "
                />
              </div>
            </Link>

            {/* CONTENT AREA */}
            <div
              className="
                relative
                z-[2]
                flex
                flex-1
                flex-col
                bg-white
                px-6
                pb-8
                pt-8
                shadow-[-17px_-16px_24px_-30px_rgba(0,0,0,0.32)]
                lg:px-6
                lg:pb-9
              "
            >
              {/* TITLE */}
              <Link
                href={`/blogs/${post.slug}`}
                className="block"
              >
                <h3
                  className="
                    text-[19px]
                    font-semibold
                    leading-[1.22]
                    tracking-[-0.03em]
                    text-black
                    transition-opacity
                    duration-300
                    hover:opacity-70
                    lg:text-[20px]
                  "
                >
                  {post.title}
                </h3>
              </Link>

<p className="mt-3 text-[13px] capitalize text-[#395E4C]">By {post.author || "Sara Beauty"}</p>
              {/* DESCRIPTION */}
              <p
                className="
                  mt-7
                  line-clamp-3
                  text-[15px]
                  leading-[1.55]
                  text-[#343434]
                  lg:text-[15.5px]
                "
              >
                {post.excerpt}
              </p>

              {/* CATEGORY TAG */}
              <div className="mt-auto pt-6">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="
                    inline-flex
                    max-w-full
                    items-center
                    justify-center
                    rounded-full
                    border-[1.5px]
                    border-[#777777]
                    px-3
                    py-[6px]
                    text-[12px]
                    font-semibold
                    leading-none
                    text-black
                    transition-all
                    duration-300
                    hover:border-[var(--color-brand)]
                    hover:text-[var(--color-brand)]
                  "
                >
                  {post.category}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
