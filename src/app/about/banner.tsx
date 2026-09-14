import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative -mt-[120px] min-h-[860px] overflow-hidden bg-[#395E4C] sm:-mt-[128px] lg:-mt-[108px]">
      {/* Background Image */}
      <Image
        src="/assets/saraAB-3.png"
        alt="Luxury home spa massage and spa services in Abu Dhabi"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Bottom green gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#395E4C]/90" />

      {/* Subtle tint */}
      <div className="absolute inset-0 bg-[#395E4C]/5" />

      {/* 
        Extra top padding added because banner now starts
        behind the fixed header
      */}
      <div className="relative z-10 mx-auto flex min-h-[860px] w-full max-w-[1440px] items-center px-5 pb-20 pt-[220px] sm:px-8 sm:pt-[230px] lg:px-12 lg:pt-[150px] xl:px-16">
        <div className="w-full max-w-[600px]">
          {/* Card */}
          <div className="relative rounded-[26px] bg-white px-7 pb-6 pt-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)] sm:px-10 sm:pb-6 sm:pt-6 lg:px-6">
            {/* About label */}
            <div className="absolute left-7 top-0 -translate-y-1/2 sm:left-10 lg:left-12">
              <span className="inline-flex items-center rounded-[10px] bg-[#e7ddae] px-5 py-2 text-[15px] font-medium text-black">
                About US
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-[42px] leading-[0.95] font-bold text-[#395E4C] sm:text-[52px] lg:text-[58px]"
              style={{
                fontFamily: "var(--font-display), serif",
              }}
            >
              Luxury &amp; Professional
            </h1>

            <h3
              className="mt-3 max-w-[620px] text-[34px] font-normal leading-[1.05] text-black sm:text-[40px] lg:text-[30px]"
              style={{
                fontFamily: "var(--font-body), sans-serif",
              }}
            >
              home spa massage &amp; Spa Services in Abu Dhabi
            </h3>

            {/* Body */}
            <div
              className="mt-8 space-y-5 text-[14px] leading-[1.55] text-[#5d5d5d] sm:text-[14px]"
              style={{
                fontFamily: "var(--font-body), sans-serif",
              }}
            >
              <p>
                Relax from your hectic day with a spa treatment designed
                specifically for you. Our therapists have completed extensive
                training and are all licensed professionals homespa in Abu
                Dhabi. For women and couples in Abu Dhabi, UAE, Sara Beauty
                &amp; Slimming home spa offers the most natural, individualized
                wellness and spa experiences right in the comfort of Sara Beauty’s home spa,
                specializing in slimming and anti-cellulite treatment.
              </p>

              <p>
                From relaxing aromatherapy sessions to intense deep-tissue
                massages, we design one-of-a-kind spa journeys for every
                customer. We&apos;re only using natural, chemical-free oils to
                get the best results and leave your skin hydrated. Our
                experienced therapists are licensed professionals who deliver
                oily massages as part of our home spa service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
