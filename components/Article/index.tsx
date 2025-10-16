"use client";

// Components
import { ArticleBanner } from "@/components/ArticleBanner";

// Utils
import { classes } from "@/utils";

// Types
import { ArticleProps } from "./types";

// Styles
import styles from "./index.module.css";

export function Article({
  articleID = 0,
  authors = [],
  className,
  content,
  date,
  title
}: ArticleProps) {
  const words = title.split(" ");
  const numWordsInTitle = words.length;
  const longestWordInTitle = words.reduce((longest, current) => current.length > longest ? current.length : longest, 0);

  const titleFace =
    numWordsInTitle <= 3 && longestWordInTitle <= 6
      ? "font-champion-heviweight -tracking-[0.03em] leading-[0.86] text-[18vw] lg:text-[9.25vw]"
      : numWordsInTitle <= 8 && longestWordInTitle <= 10
      ? "font-champion-middleweight -tracking-[0.03em] leading-[0.9] text-[18vw] lg:text-[9.25vw]"
      : "font-champion-bantamweight -tracking-[0.008em] leading-[0.92] text-[20vw] lg:text-[10vw]";

  return (
    <article className={classes("flex flex-col text-pretty", styles.articleContent, className)}>
      <header className="font-normal relative z-10 flex flex-col gap-[0.75vw] text-center pt-[6vh] pb-[3vh] px-[1vw] bg-gray-100">
        <div className="text-[0.9em] font-black leading-[0.75]">
          #{articleID.toString().padStart(3, "0")}
        </div>
        <h1
          className={classes(
            "relative uppercase z-11 -translate-x-[0.012em] text-balance flex flex-col",
            "text-background",
            titleFace
          )}
        >
          <span className="translate-y-[0.04em]">{title}</span>
        </h1>
        <div className="leading-[1.1] text-[0.6em] font-bold uppercase tracking-wide flex gap-3 justify-center">
          <span>Written by {authors.join(", ")}</span>
          <span className="opacity-40">{date}</span>
        </div>
      </header>
      <ArticleBanner articleID={articleID} date={date} title={title} />
      <div className="px-[4vw] lg:px-[2vw] pb-[6vh]">
        {content}
      </div>
    </article>
  );
}
