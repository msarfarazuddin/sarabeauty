import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const displayFont = localFont({
  src: "../../public/assets/Gallery-Regular_18bc1a12_31b5ba53.ttf",
  variable: "--font-display",
});

const bodyFont = localFont({
  src: "../../public/assets/Gilroy-Regular_3da02449_17bda5ae.ttf",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sarabeauty.ae"),
  icons: { icon: { url: "/favicon.jpg", type: "image/jpeg" } },
  title: "Sara Beauty",
  description:
    "Professional home spa massage and spa services for women in Abu Dhabi. Explore treatments and packages with Sara Beauty.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-page)]">
        <SiteHeader />

        <div className="flex-1 pt-[120px] sm:pt-[128px] lg:pt-[108px]">
          {children}
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
