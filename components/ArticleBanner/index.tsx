// Utils
import { classes } from "@/utils";

// Types
import { ArticleBannerProps } from "./types";

export function ArticleBanner({ articleID, className, date, title }: ArticleBannerProps) {
  return (
    <div
      aria-hidden
      className={classes("bg-background/96 gap-2 h-[52px] -mt-[52px] flex items-center text-[0.9rem] font-medium p-[1vw] sticky top-0 z-9 justify-center text-white", className)}
    >
      <span className="opacity-60 shrink-0">
        {articleID.toString().padStart(3, "0")}
      </span>
      <span className="truncate grow">{title}</span>
      <span className="opacity-60 shrink-0">{date}</span>
    </div>
  );
}
