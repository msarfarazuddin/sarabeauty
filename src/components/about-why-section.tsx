
import Image from "next/image";
import Link from "next/link";

const reasons = [
  {
    title: "Experienced\nSpecialists",
    icon: "/assets/Experienced.png",
  },
  {
    title: "Years of\nExperience",
    icon: "/assets/Years.png",
  },
  {
    title: "Organic, Skin-Friendly\nProducts",
    icon: "/assets/Organic.png",
  },
  {
    title: "Hygiene &\nComfort First",
    icon: "/assets/Hygiene.png",
  },
  {
    title: "Satisfied\nClients",
    icon: "/assets/Satisfied.png",
  },
];

export function AboutWhySection() {
  return (
    <section
      className="relative overflow-hidden bg-[#395E4C] bg-cover bg-center bg-no-repeat py-12 text-white sm:py-14 lg:py-16"
      style={{ backgroundImage: "url('/assets/pattern.webp')" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(57,94,76,0.72)_0%,rgba(57,94,76,0.48)_45%,rgba(57,94,76,0.3)_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1180px] gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_410px] lg:items-center lg:px-8">
        <div className="max-w-[610px] pt-2  lg:mx-auto lg:pt-10">
          <h2
            className="text-[2.6rem] font-bold leading-[0.95] text-white sm:text-[3.4rem]"
            style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
          >
            <Link href="/about-us">About Us</Link>
          </h2>
          <div className="mx-auto mt-5 max-w-[560px] space-y-4 text-[1rem] leading-[1.65] text-white sm:text-[1.08rem]">
            <p>
              Sara Beauty is a private home spa for women in Abu Dhabi, offering professional massage and body wellness treatments in a comfortable
              and peaceful setting. Our experienced female therapists provide personalised
              sessions inside the Sara Beauty spa, with a focus on privacy, hygiene and
              individual comfort.
            </p>
            <p>
              Our services include <Link href="/services/deep-tissue-massage" className="underline underline-offset-4">deep tissue massage</Link>, <Link href="/services/relaxing-massage" className="underline underline-offset-4">relaxing massage</Link>, <Link href="/services/sports-massage" className="underline underline-offset-4">sports massage</Link>,{" "}
              <Link href="/services/aromatherapy-massage" className="underline underline-offset-4">aromatherapy</Link>, <Link href="/services/post-lymphatic-massage" className="underline underline-offset-4">lymphatic drainage massage</Link>, <Link href="/services/maderotherapy" className="underline underline-offset-4">maderotherapy</Link> and other treatments
              tailored to your preferred pressure and wellness needs. With transparent
              pricing and easy WhatsApp booking, Sara Beauty provides women with a private
              and convenient spa experience in Abu Dhabi.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[410px] rounded-t-[210px] bg-white px-6 pb-8 pt-10 text-[var(--color-ink)] sm:px-8 sm:pb-10 sm:pt-14">
          <h3
            className="mx-auto max-w-[260px] text-center text-[2.3rem] leading-[0.88] font-semibold text-[var(--color-brand)] sm:max-w-[290px] sm:text-[2.95rem]"
            style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
          >
            <span className="block whitespace-nowrap md:inline md:whitespace-normal">Why Choose</span>{" "}
            <span className="block whitespace-nowrap md:inline md:whitespace-normal">Sara Beauty</span>
          </h3>
          <div className="mt-8 space-y-6">
            {reasons.map((reason) => (
              <div key={reason.title} className="mx-auto grid max-w-[270px] grid-cols-[72px_1fr] items-center justify-center gap-4 sm:max-w-[290px] sm:grid-cols-[82px_1fr]">
                <div className="flex h-[72px] w-[72px] items-center justify-center sm:h-[82px] sm:w-[82px]">
                  <div className="relative h-[50px] w-[50px] sm:h-[58px] sm:w-[58px]">
                    <Image
                      src={reason.icon}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="max-w-[180px] whitespace-pre-line text-left text-[1.05rem] leading-[1.15] text-[var(--color-ink)] sm:max-w-[190px] sm:text-[1.14rem]">
                  {reason.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
