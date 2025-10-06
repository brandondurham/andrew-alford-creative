// Utils
import { shuffle } from "@/utils";

// Consts
import { COLORS } from "@/app/_components/Letters/consts";

export default function About() {
  const backgroundColor = shuffle(COLORS)[0];
  return (
    <section
      className="animate-fade-in flex flex-col gap-[1.11em] p-6 min-h-screen"
      style={{ backgroundColor }}
    >
      <header className="mix-blend-overlay font-normal">
        <h1>About Andrew Alford Creative</h1>
      </header>
    </section>
  );
}
