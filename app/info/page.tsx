"use client";

import Image from "next/image";

// Components
import { ContentMasthead } from "@/components/ContentMasthead";
import { Content } from "@/components/Content";

// Utils
import { classes } from "@/utils";

// Styles
import styles from "@/components/Article/index.module.css";

export default function Info() {
  return (
    <Content className="bg-gray-100 [font-size:clamp(1.2rem,2vw,25px)]">
      <ContentMasthead>Info</ContentMasthead>
      <article
        className={classes(
          styles.articleContent,
          "flex flex-col font-ringside-regular font-medium leading-[1.35] text-pretty grow",
          "font-semibold text-justify hyphens-auto",
          // "pb-[6vh] lg:pb-[6vh]",
        )}
      >
        <figure className="sticky top-[52px] [aspect-ratio:1067/1048] overflow-hidden -ml-[2vw] w-[calc(100%+4vw)] -mt-[2vw] lg:-ml-[1vw] lg:w-[calc(100%+2vw)] lg:-mt-[1vw] mb-[2vw] lg:mb-[1vw]">
          <Image src="/headshot.jpg" alt="Info" width={1067} height={1048} />
          <figcaption className="font-champion-liteweight font-normal flex flex-col items-center justify-center absolute inset-0 text-[48vw] lg:text-[24vw] uppercase leading-[0.9] pt-[0.08em] text-[#e60d27] mix-blend-multiply">
            <span className="text-[1.1em]">Fuck</span> <span>beige</span>
          </figcaption>
        </figure>
        <div className="bg-gray-200 relative z-10 p-[2vw] lg:p-[1vw] pb-[15vh]">
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
    </Content>
  );
}
