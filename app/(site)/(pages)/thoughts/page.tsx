"use client"

// Components
import { Article } from "@/components/Article";

// Content
import { articles } from "@/content/thoughts";

export default function Thoughts() {
  return (
    <div className="flex flex-col shrink-0 pb-[4vh]">
      {articles.map(({ id, ...article }) => (
        <Article {...article} id={id} key={id} />
      ))}
    </div>
  );
}
