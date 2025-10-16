// Components
import { Content } from '@/components/Content';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Content>
      {children}
    </Content>
  );
}
