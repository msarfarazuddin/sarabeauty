import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, House, Leaf, Heart, Sparkles, CalendarDays, Flower2 } from "lucide-react";
import { BookingLink } from "@/components/booking-link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ServiceFaqs } from "@/components/service-faqs";
import type { LocationContent } from "@/data/location-content";
import styles from "./location-template.module.css";
import { ContextualLinks } from "@/components/contextual-links";
import { TreatmentCarousel } from "@/components/treatment-carousel";

const benefitIcons = [House, Leaf, Heart];
const differenceIcons = [House, Sparkles, Flower2, CalendarDays];

export function LocationTemplate({ content, name }: { content: LocationContent; name: string }) {
  const hubPhrase = ["massage and spa treatments", "massage and spa services", "massage and wellness treatments"].find(phrase => [content.intro, ...content.whyParagraphs].some(text => text.includes(phrase))) || "massage and spa treatments";
  const hubInIntro = content.intro.includes(hubPhrase);
  const hubParagraph = hubInIntro ? -1 : content.whyParagraphs.findIndex(p => p.includes(hubPhrase));
  const whySplit = Math.max(1, Math.floor((content.whyParagraphs.length - 1) / 2));
  const whyParagraphs = content.whyParagraphs.map((p, i) => <p key={p}><ContextualLinks text={p} links={i === hubParagraph ? [[hubPhrase, "/services"]] : []} /></p>);
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroVisual}>
          <Image src={content.heroImage} alt="Abu Dhabi waterfront panorama" fill priority sizes="100vw" className={`${styles.heroImage} ${content.heroImageRaised ? styles.heroImageRaised : ""}`} />
          <div className={styles.heroFade} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className={styles.intro}><ContextualLinks text={content.intro} links={hubInIntro ? [[hubPhrase, "/services"]] : []} /></p>
          <BookingLink service={`Home spa in ${name}`} className={styles.outlineButton}><WhatsAppIcon className="h-4 w-4" /> Book Now</BookingLink>
        </div>
      </section>
      <section className={styles.why}>
        <div className={styles.container}>
          <div className={styles.whyIntro}>
            <div><p className={styles.eyebrow}>{content.whyEyebrow || "Why choose Sara Beauty"}</p><h2>{content.whyTitle}</h2><span className={styles.goldLine} /><div className={`${styles.paragraphs} ${styles.whyLead}`}>{whyParagraphs.slice(0, whySplit)}</div></div>
            <div className={styles.paragraphs}>{whyParagraphs.slice(whySplit)}</div>
          </div>
          <div className={styles.benefits}>
            {content.benefits.map((benefit, i) => { const Icon = benefitIcons[i % benefitIcons.length]; return <article key={benefit.title}><Icon size={32} strokeWidth={1.3} aria-hidden="true" /><h3>{benefit.title}</h3><p>{benefit.description}</p></article>; })}
          </div>
        </div>
      </section>
      <section className={styles.treatments}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>{!content.metaTitle && <p className={styles.eyebrow}>Time for yourself</p>}<h2>{content.treatmentsTitle}</h2>{content.treatmentsIntro && <p>{content.treatmentsIntro}</p>}</div>
          <TreatmentCarousel label={content.treatmentsTitle}>
            {content.treatments.map((treatment, index) => <Link href={`/services/${treatment.slug}`} className={styles.treatmentCard} key={`${treatment.slug}-${index}`}>
              <div className={styles.treatmentImage}><Image src={treatment.image} alt={treatment.name} fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" /><span className={styles.cardArrow}><ArrowUpRight size={20} aria-hidden="true" /></span></div>
              <div className={styles.treatmentText}><h3>{treatment.name}</h3><p>{treatment.description}</p><span className={styles.discover}>Explore treatment <ArrowUpRight size={14} aria-hidden="true" /></span></div>
            </Link>)}
          </TreatmentCarousel>
          <Link href="/services" className={styles.outlineButton}>View All Treatments <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className={styles.difference}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>{!content.metaTitle && <p className={styles.eyebrow}>Care in every detail</p>}<h2>{content.differenceTitle}</h2><p>{content.differenceIntro}</p></div>
          <div className={styles.differenceGrid}>{content.differences.map((item, i) => { const Icon = differenceIcons[i % differenceIcons.length]; return <article key={item.title}><span className={styles.iconCircle}><Icon size={27} strokeWidth={1.4} aria-hidden="true" /></span><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div>
          <BookingLink service={`Home spa in ${name}`} className={styles.creamButton}><WhatsAppIcon className="h-4 w-4" /> Book Now</BookingLink>
        </div>
      </section>
      <section className={styles.bookingSection}>
        <div className={styles.container}><div className={styles.bookingCard}>
          <div className={styles.bookingCopy}><p className={styles.eyebrow}>Your moment of calm</p><h2>{content.bookingTitle}</h2><p>{content.bookingDescription}</p><BookingLink service={`Home spa in ${name}`} className={styles.creamButton}><WhatsAppIcon className="h-4 w-4" /> Book Now</BookingLink></div>
          <div className={styles.bookingIllustration}><Image src="/assets/sara-menu-illustration_e5a5d658_da0db38d.png" alt="" fill sizes="(max-width: 640px) 180px, 220px" /></div>
        </div></div>
      </section>
      <ServiceFaqs faqs={content.faqs} title={content.faqTitle} />
    </main>
  );
}
