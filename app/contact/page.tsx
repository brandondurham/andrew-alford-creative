// Utils
import { shuffle } from "@/utils";

// Consts
import { COLORS } from "@/components/Letters/consts";

export default function Contact() {
  const backgroundColor = shuffle(COLORS)[0].var;
  return (
    <section
      className="animate-fade-in flex flex-col gap-[1.11em] p-6 min-h-screen"
      style={{ backgroundColor }}
    >
      <header className="mix-blend-overlay font-normal">
        <h1>Contact</h1>
      </header>
    </section>
  );
}
