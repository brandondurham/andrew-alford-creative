// Components
import { Letters } from "@/components/Letters";
import { SiteFrame } from "@/components/SiteFrame";
import { Footer } from "@/components/Footer";
import { SiteMasthead } from "@/components/SiteMasthead";
import { ThemeBackground } from "@/components/ThemeBackground";
import { Main } from "@/components/Main";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SiteFrame className="min-h-screen">
      <ThemeBackground className="fixed inset-0" />
      <Letters className="pointer-events-auto" />
      <SiteMasthead className="sticky top-0" />
      <Main className="grow">{children}</Main>
      <Footer className="fixed inset-0 top-auto" />
    </SiteFrame>
  );
}
