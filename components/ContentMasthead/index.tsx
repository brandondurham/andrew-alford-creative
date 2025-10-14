import { useRouter } from "next/navigation";

// Utils
import { classes } from "@/utils";

export function ContentMasthead({ children, className }: { children?: React.ReactNode, className?: string }) {
  const router = useRouter();

  return (
    <nav className={classes("shrink-0 uppercase flex justify-between sticky top-0 z-100 bg-white/96 px-[1vw] text-[0.9rem] font-semibold h-[52px] items-center text-black/70", className)}>
      <div className="basis-[20%]">
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
      <div className="basis-[50%] text-center">{children}</div>
      <div className="basis-[20%] text-right" />
    </nav>
  );
}
