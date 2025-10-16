import { GoogleAnalytics } from '@next/third-parties/google';

// Components
import { Letters } from "@/components/Letters";
import { SiteFrame } from "@/components/SiteFrame";
import { Footer } from "@/components/Footer";
import { SiteMasthead } from "@/components/SiteMasthead";
import { ThemeBackground } from "@/components/ThemeBackground";
import { Main } from "@/components/Main";

// Context
import { Providers } from "./providers";

// Utils
import { classes } from "@/utils";

// Styles
import "./globals.css";
import * as Fonts from './fonts'

export const metadata = {
  title: {
    template: "%s → Andrew Alford Creative",
    default: "Andrew Alford Creative",
  },
  description:
    "Andrew Alford Creative offers small and large scale brand development, interior design services, freelance creative direction, and licensed product collaborations.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontData = Object.keys(Fonts).map((font) => Fonts[font].variable);

  return (
    <html lang="en">
      <body className={classes(fontData.join(" "), "antialiased")}>
        <Providers>
          <SiteFrame className="min-h-screen">
            <ThemeBackground className="fixed inset-0" />
            <Letters className="pointer-events-auto" />
            <SiteMasthead className="sticky top-0" />
            <Main className="grow">{children}</Main>
            <Footer className="fixed inset-0 top-auto" />
          </SiteFrame>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-LDZ8DYQ8P0" />
    </html>
  );
}
