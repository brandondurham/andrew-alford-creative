"use client"

// Components
import { Article } from "@/components/Article";
import { ContentMasthead } from "@/components/ContentMasthead";
import { Content } from "@/components/Content";

// Content
import { articles } from "@/content/thoughts";

export default function Thoughts() {
  return (
    <Content>
      <ContentMasthead>Thoughts</ContentMasthead>
      <div className="flex flex-col gap-12">
        {articles.map(({ id, ...article }, index) => (
          <Article {...article} id={id} key={id} />
        ))}
      </div>
    </Content>
  );
}
