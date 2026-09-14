import Image from "next/image";
import { ContextualLinks } from "@/components/contextual-links";

const reasons: {
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    title: "We Possess Intuition",
    description:
      "Allow us to provide you with the relaxing spa experience you deserve. What we provide is more than simply a service; it's an experience.",
    icon: "/assets/Possess.png",
  },
  {
    title: "We Aim for Perfection",
    description:
      "Whether it's our customer service, our treatments, or the products we offer, we always aim for perfection.",
    icon: "/assets/Perfection.png",
  },
  {
    title: "Always Reliable",
    description:
      "Every time you book, you'll receive the same excellent service. Our prices are always fair, and the quality of our spa services is unmatched.",
    icon: "/assets/Reliable.png",
  },
  {
    title: "We Pay Attention",
    description:
      "The services offered at Sara Beauty & Slimming home spa are in direct response to the needs of customers like yourself. We listen to your preferences to tailor your spa time to your exact needs.",
    icon: "/assets/Attention.png",
  },
  {
    title: "We Make a Difference",
    description:
      "As a whole company, we recognize the importance of giving back to the communities we serve and do so whenever possible.",
    icon: "/assets/Difference.png",
  },
  {
    title: "You Can Count on Us",
    description:
      "Let us help you include massage and spa services into your routine, so you can enjoy the range of health benefits they offer.",
    icon: "/assets/Count.png",
  },
];

export function AboutWhyChooseSection() {
  return (
    <section className="bg-[#395E4C] px-5 pb-24 pt-16 text-white sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-22 xl:px-16">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="text-center">
          <h2
            className="text-[42px] font-bold leading-none text-[#eee3b7] sm:text-[50px] lg:text-[60px]"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Why Choose Us?
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-[21px] leading-[1.35] text-white sm:text-[24px]">
            Take the Best Experience of Luxury Massage in Abu Dhabi from
            <br className="hidden sm:block" /> Our Expert Professionals
          </p>
        </div>

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-6">
          {reasons.map(({ title, description, icon }) => (
            <article
              key={title}
              className="group mx-auto w-full max-w-[365px] rounded-[28px] p-8 transition-colors duration-300 hover:bg-[#395E4C] sm:p-9"
            >
              <div className="relative mb-8 h-16 w-20 transition duration-300 group-hover:scale-105">
                <Image
                  src={icon}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain object-left"
                />
              </div>
              <h3 className="text-[20px] font-bold leading-tight text-white">
                {title}
              </h3>
              <p className="mt-5 text-[16px] leading-[1.55] text-white">
                <ContextualLinks text={description} links={[["massage and spa services", "/services"]]} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
