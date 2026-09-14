import type { BlogFaq, BlogPost, BlogSection } from "./site";

const faqHeading = /\bfaqs?\b|frequently asked questions/i;
const cleanQuestion = (text: string) => text.replace(/^\s*(?:Q\s*[:.]\s*|\d+[.)]\s*)/i, "").trim();
const questionKey = (text: string) => cleanQuestion(text).toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/** Unify WordPress FAQ lists, Q/A paragraphs and question headings. */
export function getBlogContent(post: BlogPost) {
  const faqs: BlogFaq[] = [];
  const seen = new Set<string>();
  const addFaq = (question: string, answer: string) => {
    const key = questionKey(question);
    if (!key) return;
    if (seen.has(key)) {
      const existing = faqs.find(faq => questionKey(faq.question) === key);
      if (existing && !existing.answer) existing.answer = answer.trim();
      return;
    }
    seen.add(key);
    faqs.push({ question: cleanQuestion(question), answer: answer.trim() });
  };
  for (const faq of post.faqs ?? []) addFaq(faq.question, faq.answer);

  const sections: BlogSection[] = [];
  let inFaq = false;
  for (const section of post.body ?? []) {
    const headingIsFaq = faqHeading.test(section.heading ?? "");
    const subheadingIsFaq = faqHeading.test(section.subheading ?? "");
    const startsFaq = headingIsFaq || subheadingIsFaq;
    // Some exports contain numbered FAQ headings with no answers at all.
    // Keep these questions in the FAQ design without inventing missing copy.
    if (/^\s*\d+[.)]\s+.+\?\s*$/.test(section.heading ?? "") &&
        (!section.subheading || /\?\s*$/.test(section.subheading))) {
      const answer = [...(section.paragraphs ?? []), ...(section.bullets ?? []).map(text => `• ${text}`)].join("\n\n");
      addFaq(section.heading!, section.subheading ? "" : answer);
      if (section.subheading) addFaq(section.subheading, answer);
      continue;
    }
    const question = headingIsFaq ? section.subheading : section.heading;
    const knownQuestion = question && seen.has(questionKey(question));
    const isQuestion = question && /\?\s*$/.test(question);
    if (startsFaq) inFaq = true;
    else if (section.heading && !isQuestion && !knownQuestion) inFaq = false;

    if ((inFaq && isQuestion) || knownQuestion) {
      addFaq(question!, [...(section.paragraphs ?? []), ...(section.bullets ?? []).map(text => `• ${text}`)].join("\n\n"));
      continue;
    }

    if (startsFaq || inFaq) {
      const remaining: BlogSection = { ...section };
      if (headingIsFaq) delete remaining.heading;
      if (subheadingIsFaq) delete remaining.subheading;
      const extract = (text: string) => {
        const match = text.match(/^\s*(?:Q\s*:\s*)?(.+?\?)\s*(?:A\s*:\s*)?([\s\S]+)$/i);
        if (!match) return true;
        addFaq(match[1], match[2]);
        return false;
      };
      remaining.paragraphs = (section.paragraphs ?? []).filter(extract);
      remaining.bullets = (section.bullets ?? []).filter(extract);
      if (remaining.paragraphs.length || remaining.bullets.length) sections.push(remaining);
      continue;
    }
    sections.push(section);
  }
  return { sections, faqs };
}
