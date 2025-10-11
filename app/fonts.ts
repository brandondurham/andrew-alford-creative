import localFont from "next/font/local";

// Local font definitions
export const ringsideRegular = localFont({
  src: [
    {
      path: "../assets/fonts/RingsideRegular-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/RingsideRegular-BookItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/RingsideRegular-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/RingsideRegular-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },

    {
      path: "../assets/fonts/RingsideRegular-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/RingsideRegular-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-ringside-regular",
  display: "swap",
});

export const crimsonCurse = localFont({
  src: "../assets/fonts/Crimson-Curse.woff2",
  variable: "--font-crimson-curse",
  display: "swap",
});

export const decimal = localFont({
  src: "../assets/fonts/Decimal-Book-Pro.woff2",
  variable: "--font-decimal",
  display: "swap",
});

export const gory = localFont({
  src: "../assets/fonts/XXIIGoryBastard-Regular.woff2",
  variable: "--font-gory",
  display: "swap",
});

export const championBantamweight = localFont({
  src: "../assets/fonts/Champion-Bantamweight.woff2",
  variable: "--font-champion-bantamweight",
  display: "swap",
});

export const championFeatherweight = localFont({
  src: "../assets/fonts/Champion-Featherweight.woff2",
  variable: "--font-champion-featherweight",
  display: "swap",
});

export const championLiteweight = localFont({
  src: "../assets/fonts/Champion-Liteweight.woff2",
  variable: "--font-champion-liteweight",
  display: "swap",
});

export const championWelterweight = localFont({
  src: "../assets/fonts/Champion-Welterweight.woff2",
  variable: "--font-champion-welterweight",
  display: "swap",
});

export const championMiddleweight = localFont({
  src: "../assets/fonts/Champion-Middleweight.woff2",
  variable: "--font-champion-middleweight",
  display: "swap",
});

export const championHeviweight = localFont({
  src: "../assets/fonts/Champion-Heviweight.woff2",
  variable: "--font-champion-heviweight",
  display: "swap",
});

export const plainBlack = localFont({
  src: "../assets/fonts/Plain_Black.woff",
  variable: "--font-plain-black",
  display: "swap",
});
