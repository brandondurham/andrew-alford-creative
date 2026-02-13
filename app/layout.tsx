import { GoogleAnalytics } from '@next/third-parties/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';

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
        <AntdRegistry>
          <Providers>
            {children}
          </Providers>
        </AntdRegistry>
      </body>
      <GoogleAnalytics gaId="G-LDZ8DYQ8P0" />
    </html>
  );
}
