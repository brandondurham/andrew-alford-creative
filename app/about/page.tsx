// Utils
import { classes, shuffle } from "@/utils";

// Styles
import styles from "@/components/Article/index.module.css";

// Consts
import { COLORS } from "@/app/_components/Letters/consts";

export default function About() {
  const backgroundColor = shuffle(COLORS)[0].var;
  return (
    <section
      className="animate-fade-in flex flex-col gap-[1.11em] text-white min-h-screen mix-blend-difference"
      style={{ backgroundColor }}
    >
      <header className="min-h-[18vh] sticky top-0 z-3 max-w-content-width">
        <hgroup
          className="flex p-6"
          style={{ backgroundColor: backgroundColor || undefined }}
        >
          <h1 className="title font-normal">About Andrew Alford Creative</h1>
        </hgroup>
      </header>
      <article
        className={classes(
          styles.articleContent,
          "mix-blend-overlay max-w-content-width p-6"
        )}
      >
        <p>
          <span className="drop-cap mix-blend-difference">
            N
          </span>
          o one ever looked at a sunset and said, “I wish it was more beige.”
          That’s Andrew Alford’s core philosophy of design. For more than
          twenty-five years, Andrew has focused his talents on creating truly
          memorable projects that have an unwavering sense of individuality,
          wit, and soul. Andrew has designed luxury homes, iconic independent
          hotels, unforgettable food and beverage experiences, product
          collections, and ambitious scalable hospitality brands. As Chief
          Creative Officer for Graduate Hotels, Andrew was there from day one,
          concepting the brand’s visual DNA and leading the in-house design team
          on more than thirty-five properties.
        </p>
        <p>
          Andrew Alford Creative now offers small and large scale brand
          development, interior design services, freelance creative direction,
          and licensed product collaborations.
        </p>
      </article>
    </section>
  );
}
