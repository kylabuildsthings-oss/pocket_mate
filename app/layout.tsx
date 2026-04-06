import { Metadata } from "next";
import { Providers } from "./providers";
import { ConditionalNavBars } from "@/components/ConditionalNavBars";
import Auth from "@/components/Auth";
import "@rainbow-me/rainbowkit/styles.css";
import { Manrope, Space_Grotesk } from "next/font/google";

const fontPmBody = Manrope({
  subsets: ["latin"],
  variable: "--font-pm-body",
  display: "swap",
});

const fontPmHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-pm-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PocketMate",
  description: "Learn. Trade. Build. — DeFi for students.",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${fontPmBody.variable} ${fontPmHeading.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <Providers>
          <Auth />
          <ConditionalNavBars />
          {children}
        </Providers>
      </body>
    </html>
  );
}
