"use client";

import Image from "next/image";

// Components
import { ThemeBackground } from "@/components/ThemeBackground";

// Utils
import { classes } from "@/utils";

// Styles
import styles from "./index.module.css";

// Types
import { ArticleProps } from "./types";

export function Article({ articleNumber = 0, className }: ArticleProps) {
  return (
    <article
      className={classes(
        "relative flex flex-col",
        styles.article,
        className
      )}
    >
      <ThemeBackground className="absolute inset-0 z-[-1]" />
      <figure className="pl-[50vw]">
        <Image
          alt="Article 1"
          className="w-full"
          height={798}
          src="/toucan-bw.jpg"
          width={1200}
        />
      </figure>
      <header className="flex flex-col justify-end pl-[50vw] min-h-[18vh] my-[4.5vh] px-[1vw]">
        <hgroup className="font-champion-bantamweight text-[7vw] leading-[0.91] text-pretty uppercase">
          <h1 className={classes(styles.articleHeading, "text-balance")}>
            <span className="inline-block text-[#00000060]">
              Article #{articleNumber.toString().padStart(3, "0")}
            </span>
            <span className="inline-block">
              Designer vs. Artist: Crushing Control vs Feelings of Freedom
            </span>
          </h1>
        </hgroup>
        <div className="uppercase text-foreground text-[0.9rem] font-[600] tracking-wide opacity-80">
          <span className="flex gap-2">
            <span>Written by Andrew Alford</span> <span>•</span>{" "}
            <span>October 9, 2025</span>
          </span>
        </div>
      </header>
      <div className={classes(styles.articleContent, "pl-[50vw] px-[1vw]")}>
        <p>
          When I was three years old, my mom wrote in my baby book “Andy is
          going to be an artist when he grows up.” Since the early days of
          Covid, her observation has been front and center in my brain. Her
          words sparked the question in my head, “What am I, an artist or a
          designer?” When thinking about the latter, I realized there’s a
          certain amount of pressure that comes with the label “designer.” In
          magazines, social media, and business development, my experience has
          been that a designer is expected to manifest an image of a perfect
          life. Beautiful home. Beautiful clothes. Beautiful exotic travel. A
          beautiful flawless façade. I put pressure on myself to live up to that
          trope for nearly two decades, until the forced stillness of Covid gave
          me the opportunity to realize and accept that at I always wanted the
          life of an artist, not a designer.
        </p>
        <p>
          What does that mean to me? I’m still a hospitality designer and there
          are few things that bring me as much joy as my career, but pivoting to
          the label of artist truly liberated me. I’ve always approached my
          hotel projects as elaborate experiential sculptures that touch the
          hearts and souls of every guest who walks through the doors. Interior
          design is functional art to me, and as such, the title of artist
          supersedes the title of designer. That mental pivot gave me the
          freedom to explore other creative ventures and it relieved the
          internalized pressure of presenting myself as an eccentric
          perfectionist living an interiors magazine life.{" "}
        </p>
        <p>
          An artist has zero boundaries or preconceived notions of image, and as
          the band Fischerspooner used to have on their tour tees, “Artists have
          more fun.” Truer words have never been spoken. After liberating myself
          from the designer label, I found my interiors brain grow in expansive
          new ways and my day-to-day life felt freer and more satisfying. I now
          say that I earn my living as a designer, but my soul lives as an
          artist. My love language shifted from facade to freedom.{" "}
        </p>
        <p>
          When approaching my painting style, I intentionally sought to increase
          my sense of liberation by lowering my chances of self-perceived
          failure. The goal was letting go of control, not creating something
          with the intent of sales or commercial success. The absence of that
          pressure allows me to get into a state of mental flow where my brain
          can wander to new places inspired by the forms developing in front of
          me. Unlike an interiors project where precision is paramount, I was
          able to develop a style where there are almost no ways to make errors.
          Imperfection is a feature, not a flaw. That freedom allows me to get
          into a meditative state where I feel as if inspiration comes from the
          ether. That place of beautiful limbo results in hospitality design
          ideas no one has ever seen, which has always been the cornerstone and
          guiding light of my career.
        </p>
        <p>
          Making these paintings are an exercise in mindfulness to me, but the
          chaotic abstraction represents a more concrete reality of my life. I’m
          a parent to the most incredible thirteen-year-old daughter who I love
          on a scale that brings both transcendent joy and unfathomable fear.
          Jewel tone neon rainbows and terrifying black holes. I’m sure any
          parent can understand that contrast of emotions. These paintings are
          an exploration of those often-overwhelming feelings and the
          realization that ultimately, we can’t control our children’s
          destinies. Rather than using paint brushes, I use ice and water to
          create the forms. The technique is about accepting that as a parent, I
          can do my best to fill her life with beautiful colors and ideas, but
          ultimately the water is going to flow where it wants to flow, and the
          colors will blend in unpredictable ways. To me, that’s the epitome of
          raising a child. We can do our best to provide them with the best
          ingredients, but ultimately, we can’t control what they make with
          them.
        </p>
        <p>
          I can confidently and unequivocally say that this process of
          acceptance, self-realization, and exploration has helped me grow as a
          designer and reinforced my belief that art heals all. A creative
          healer is the artist, designer, and father I want to be and the
          imaginative being my mom saw from the start.
        </p>
        <p className="note">
          Side note: A couple of paragraphs ago I said that selling art wasn’t
          the primary goal of creating these paintings, but hey, I’m human.
          Contact me me for pricing and availability if your home or project
          needs an antidote for beige.
        </p>
      </div>
    </article>
  );
}
