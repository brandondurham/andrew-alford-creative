"use client";

import Image from "next/image";

// Utils
import { classes } from "@/utils";

// Styles
import styles from "@/components/Article/index.module.css";

export default function Info() {
  return (
    <article
      className={classes(
        styles.articleContent,
        "flex flex-col grow",
        "pb-[6vh]"
      )}
    >
      <figure className="max-w-full relative [aspect-ratio:1140/990] overflow-hidden">
        <Image
          alt="Info"
          className="w-full"
          height={990}
          src="/headshot.jpg"
          width={1140}
        />
        <figcaption className="font-champion-welterweight font-normal flex flex-col items-center justify-center absolute inset-0 text-[48vw] lg:text-[20vw] uppercase leading-[0.95] pt-[0.08em] text-[#e60d27] mix-blend-multiply">
          <span className="text-[1.06em]">F$@!</span> <span>beige</span>
        </figcaption>
      </figure>
      <div className="relative z-10 p-[4vw] lg:p-[2vw]">
        <p>
          No one ever looked at a sunset and said, &ldquo;I wish it was more
          beige.&rdquo; That&rsquo;s Andrew Alford&rsquo;s core philosophy of
          design. For more than twenty-five years, Andrew has focused his
          talents on creating truly memorable projects that have an unwavering
          sense of individuality, wit, and soul. Andrew has designed luxury
          homes, iconic independent hotels, unforgettable food and beverage
          experiences, product collections, and ambitious scalable hospitality
          brands. As Chief Creative Officer for Graduate Hotels, Andrew was
          there from day one, concepting the brand&rsquo;s visual DNA and
          leading the in-house design team on more than thirty-five
          properties.
        </p>
        <p>
          Andrew Alford Creative now offers small and large scale brand
          development, interior design services, freelance creative direction,
          and licensed product collaborations.
        </p>
      </div>
    </article>
  );
}
