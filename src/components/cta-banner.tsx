
import { BookingLink } from "@/components/booking-link";

import Image from "next/image";

export function CtaBanner() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="appointment-container mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-0">
        <div className="appointment-banner relative">
          <div
            className="appointment-card relative overflow-hidden rounded-[28px] bg-[#395E4C] shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          >
            <div className="appointment-content relative min-h-[320px] px-5 py-7 sm:px-10 sm:py-10 lg:h-[440px] lg:min-h-[410px] lg:px-[36px]">
              <div className="appointment-layout relative z-10 flex min-h-[350px] flex-col justify-between lg:h-full lg:min-h-[440px]">
              <div className="appointment-heading max-w-[55%] pt-4 text-[#efe3ab] sm:max-w-[320px] sm:text-[var(--color-brand)] lg:pt-5">
                <h2
                  className="text-[clamp(1.85rem,9vw,2.3rem)] leading-[1.05] font-bold sm:text-[4rem] sm:leading-[0.84] lg:text-[4.45rem]"
                  style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
                >
                  Transform
                  <br />
                  Renew
                  <br />
                  Glow.
                </h2>
              </div>

                <div className="appointment-booking relative z-30 mt-8 mr-auto pb-2 text-left text-white sm:ml-auto sm:mr-0 sm:text-right lg:mr-[470px] lg:pb-22">
                <p className="max-w-[175px] text-[26px] leading-[1.1] sm:max-w-none sm:text-[2.6rem] lg:text-[35px]">
                  Schedule Your
                  <br />
                  Appointment Today!
                </p>
                <BookingLink
                  className="mt-5 inline-flex h-[40px] min-w-[130px] items-center justify-center rounded-full bg-[#efe3ab] px-8 text-[1.05rem] font-semibold text-black transition hover:bg-white"
                >
                  Book Now
                </BookingLink>
                </div>
              </div>
            </div>
          </div>

          <div className="appointment-therapist pointer-events-none absolute top-4 right-0 z-20 h-[210px] w-[42%] sm:top-auto sm:bottom-0 sm:right-[30px] sm:h-[340px] sm:w-[255px] lg:-top-[82px] lg:h-[522px] lg:w-[368px]">
            <Image
              src="/assets/lady.png"
              alt="Sara Beauty therapist"
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 255px, 368px"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
