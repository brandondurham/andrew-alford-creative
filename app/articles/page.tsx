// Components
import { Article } from "@/components/Article";

// Content
import { content } from "@/app/articles/content";

export default function Home() {
  return (
    <section className="animate-fade-in flex flex-col gap-[1.11em]">
      {content.map(({ articleNumber, id }) => (
        <Article articleNumber={articleNumber} key={id} id={id} />
      ))}
    </section>
  );
}
