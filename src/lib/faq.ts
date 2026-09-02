export interface FaqItem {
  question: string;
  answer: string;
  /** True when the underlying business policy hasn't been confirmed yet — do not invent specifics. */
  pending?: boolean;
}

export const FAQS: FaqItem[] = [
  {
    question: "What's included in each package?",
    answer:
      "Every package includes a book plus a set of extras — stickers, a pen, a bookmark, a pin badge or a keychain depending on the tier. Full contents for each bundle are listed on its product page and in your cart before checkout.",
  },
  {
    question: "What genres are available?",
    answer:
      "Romance, Thriller, Horror, Adventure, Fantasy, Science Fiction and Children's. You'll choose your preferred genre when you order, or as part of Build A Book.",
  },
  {
    question: "How does Build A Book work?",
    answer:
      "Choose a genre, then pick a bookmark and a sticker for your bundle. Your selections update a live summary as you go, and the whole custom package is £19.99.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders currently ship within 2–3 working days. We'll share courier and tracking details once that part of our shipping setup is finalised.",
  },
  {
    question: "Can I send this as a gift?",
    answer:
      "Yes — every order can be marked as a gift, with the option to add a personal message and request a gift receipt.",
  },
  {
    question: "Can I include a gift message?",
    answer: "Yes. At checkout you can add a short gift message that arrives with the order.",
  },
  {
    question: "Can I request a gift receipt?",
    answer: "Yes — choose the gift receipt option in your cart to leave prices off the packing slip.",
  },
  {
    question: "What happens if I receive a duplicate book?",
    answer:
      "We're finalising our duplicate-book policy — details will appear here shortly. In the meantime, contact us at chapterandbloom@outlook.com if this happens to you and we'll sort it out directly.",
    pending: true,
  },
  {
    question: "What's your returns policy?",
    answer: "Our returns policy is being finalised and will be published on our Returns & Refunds page once confirmed.",
    pending: true,
  },
  {
    question: "What's your refund policy?",
    answer: "Our refund policy is being finalised and will be published here once confirmed. Contact us in the meantime and we'll help directly.",
    pending: true,
  },
  {
    question: "How do I contact Chapter & Bloom?",
    answer: "Email us any time at chapterandbloom@outlook.com, or use the form on our Contact page.",
  },
];
