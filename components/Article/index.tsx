"use client";

// Components
import { ArticleBanner } from "@/components/ArticleBanner";

// Utils
import { classes } from "@/utils";

// Styles
import styles from "./index.module.css";

// Types
import { ArticleProps } from "./types";

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
      ? "font-champion-heviweight -tracking-[0.03em] leading-[0.86]"
      : numWordsInTitle <= 8 && longestWordInTitle <= 10
        ? "font-champion-middleweight -tracking-[0.03em] leading-[0.85]"
        : "font-champion-bantamweight -tracking-[0.008em] leading-[0.92]";

  return (
    <article
      className={classes(
        "flex flex-col font-ringside-regular font-medium [font-size:clamp(1rem,1.7vw,26px)] leading-[1.35] text-pretty bg-gray-100",
        className
      )}
    >
      <header className="relative z-10 flex flex-col gap-[0.75vw] text-center py-[6vh] px-[1vw] bg-inherit">
        <div className="text-[0.9em] font-black leading-[0.75]">
          #{articleID.toString().padStart(3, "0")}
        </div>
        <h1
          className={classes(
            "relative uppercase z-11 text-[9.25vw] -translate-x-[0.012em] text-balance flex flex-col",
            titleFace
          )}
        >
          <span className="translate-y-[0.04em] text-background">{title}</span>
        </h1>
        <div className="mt-[0.5vw] leading-[1.1] text-[0.6em] font-bold uppercase tracking-wide flex gap-3 justify-center">
          <span>Written by {authors.join(", ")}</span>
          <span className="opacity-40">{date}</span>
        </div>
      </header>
      <ArticleBanner articleID={articleID} date={date} title={title} />
      <div
        className={classes(
          styles.articleContent,
          "px-[1vw] pb-[6vh] text-[0.8em] font-semibold leading-[1.2] text-justify hyphens-auto"
        )}
      >
        {content}
      </div>
    </article>
  );
}
