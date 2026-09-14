export type Duration = 60 | 90;

export const packageServiceLinks: Record<string, string> = {
  "Post Lymphatic Massage Package": "/services/post-lymphatic-massage",
  "Brazilian Lymphatic Massage Package": "/services/brazilian-lymphatic-slimming-massage",
  "Brazilian Maderotherapy Package": "/services/brazilian-maderotherapy",
  "Relaxing Massage Package": "/services/relaxing-massage",
  "Deep Tissue Massage Package": "/services/deep-tissue-massage",
  "Aromatherapy Massage Package": "/services/aromatherapy-massage",
  "Maderotherapy Package": "/services/maderotherapy",
  "Combination Massage Package": "/services/combination-massage",
  "Sport's Massage Package": "/services/sports-massage",
  "Thai Massage (without oil) Package": "/services/thai-massage-without-oil",
  "Face Maderotherapy Package": "/services/face-maderotherapy",
};

export type PackageItem = {
  title: string;
  description: string;
  image: string;
  price: number;
};

export const packages60: PackageItem[] = [
  {
    "title": "Post Lymphatic Massage Package",
    "description": "Lymphatic massage helps to remove excess fluid and allows it to move back into the lymphatic passages where it will be flushed from the body.",
    "image": "/assets/post-lymphatic-package_0848b4eb_ed7c09de.webp",
    "price": 2299
  },
  {
    "title": "Brazilian Lymphatic Massage Package",
    "description": "Boosts blood circulation, detoxes the skin and supports improved lymphatic drainage and overall wellbeing.",
    "image": "/assets/brazilian-lymphatic-package_6a565047_6ddd9693.webp",
    "price": 2299
  },
  {
    "title": "Brazilian Maderotherapy Package",
    "description": "Helps reduce the appearance of fat cells while supporting lymphatic drainage, circulation and body contouring.",
    "image": "/assets/brazilian-maderotherapy-package_a615ff01_f32e7adf.webp",
    "price": 2299
  },
  {
    "title": "Maderotherapy Package",
    "description": "Maderotherapy supports microcirculation and blood flow while helping improve the appearance of cellulite.",
    "image": "/assets/maderotherapy-package_7168a6cb_6efa67ab.webp",
    "price": 2299
  },
  {
    "title": "Face Maderotherapy Package",
    "description": "Firming and toning effects. Supports blood and lymphatic circulation of the face, helping improve the appearance of the skin.",
    "image": "/assets/face-maderotherapy-package_899cea61_eaac307d.webp",
    "price": 2299
  }
];

export const packages90: PackageItem[] = [
  {
    title: "Post Lymphatic Massage Package",
    description:
      "Lymphatic massage helps to remove excess fluid and allows it to move back into the lymphatic passages where it will be flushed from the body.",
    image:
      "/assets/post-lymphatic-package_0848b4eb_ed7c09de.webp",
    price: 2799,
  },
  {
    title: "Brazilian Lymphatic Massage Package",
    description:
      "Boosts blood circulation, detoxes the skin and supports improved lymphatic drainage and overall wellbeing.",
    image:
      "/assets/brazilian-lymphatic-package_6a565047_6ddd9693.webp",
    price: 2799,
  },
  {
    title: "Brazilian Maderotherapy Package",
    description:
      "Helps reduce the appearance of fat cells while supporting lymphatic drainage, circulation and body contouring.",
    image:
      "/assets/brazilian-maderotherapy-package_a615ff01_f32e7adf.webp",
    price: 2799,
  },
  {
    title: "Relaxing Massage Package",
    description:
      "Improved circulation, reduced muscle tension, eases muscle pain and supports relaxation and better sleep.",
    image:
      "/assets/relaxing-package_6da7240f_56537024.webp",
    price: 2299,
  },
  {
    title: "Deep Tissue Massage Package",
    description:
      "Deep tissue massage helps reduce stress and tension while working on deeper areas of muscle stiffness.",
    image:
      "/assets/deep-tissue-massage_1d8df029_5125d682.jpg",
    price: 2299,
  },
  {
    title: "Aromatherapy Massage Package",
    description:
      "A relaxing massage experience designed to support stress reduction, relaxation and relief from muscle tension.",
    image:
      "/assets/aromatherapy-package_ee674f5e_c6ad97a8.webp",
    price: 2299,
  },
  {
    title: "Maderotherapy Package",
    description:
      "Maderotherapy supports microcirculation and blood flow while helping improve the appearance of cellulite.",
    image:
      "/assets/maderotherapy-package_7168a6cb_6efa67ab.webp",
    price: 2799,
  },
  {
    title: "Combination Massage Package",
    description:
      "A combination treatment designed to support circulation, muscle relaxation, mobility and overall wellness.",
    image:
      "/assets/combination-massage_4162948e_12c882b5.jpg",
    price: 2299,
  },
  {
    title: "Sport's Massage Package",
    description:
      "Designed to help reduce muscular tension, support circulation and improve recovery after physical activity.",
    image:
      "/assets/sports-package_ba238771_aa369b9e.jpg",
    price: 2299,
  },
  {
    title: "Thai Massage (without oil) Package",
    description:
      "May help improve flexibility, reduce tension and support relaxation through traditional Thai massage techniques.",
    image:
      "/assets/thai-package_75094538_ee51fd60.jpg",
    price: 2299,
  },
];
