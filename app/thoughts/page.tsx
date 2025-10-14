"use client"

import { useRouter } from "next/navigation";

// Components
import { Article } from "@/components/Article";

// Context
import { useDragging } from "@/context/DraggingContext";

// Utils
import { classes } from "@/utils";

// Content
import { articles } from "@/content/thoughts";

export default function Thoughts() {
  const { isDragging } = useDragging();
  const router = useRouter();

  return (
    <section
      className={classes(
        "bg-gray-100",
        "shadow-xl/30 rounded-lg fixed bottom-[1vw] top-[1vw] left-[50vw] right-[1vw] z-100 overflow-auto",
        "animate-fade-in",
        isDragging ? "pointer-events-none" : "pointer-events-auto"
      )}
    >
      <nav className="uppercase flex justify-between sticky top-0 z-100 bg-white/96 px-[1vw] text-[0.9rem] font-[600] h-[52px] items-center text-black/70">
        <div className="basis-[25%]">
          <button
            className="flex items-center gap-2 cursor-pointer uppercase"
            onClick={() => router.back()}
          >
            <svg
              fill="none"
              height="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        <div className="basis-[50%] text-center">Thoughts</div>
        <div className="basis-[25%] text-right" />
      </nav>
      <div className="flex flex-col gap-12">
        {articles.map(({ id, ...article }, index) => (
          <Article {...article} id={id} key={id} />
        ))}
      </div>
    </section>
  );
}
