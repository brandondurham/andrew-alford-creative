import { Button } from "antd";

export const metadata = {
  title: "Email Signature",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="text-[17px] leading-[1.3] font-ringside-regular font-medium h-screen flex flex-col [&_a]:text-blue-700 [&_a]:underline">
      <article className="grow flex overflow-hidden">
        {children}
      </article>
    </section>
  );
}
