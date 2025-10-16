import { headers } from 'next/headers';

// Components
import { Content } from '@/components/Content';
import { ContentMasthead } from '@/components/ContentMasthead';

// Consts
const PAGES = {
  "/select-projects": "Select Projects",
  "/thoughts": "Thoughts",
  "/info": "Info",
  "/clients": "Client Portal",
  "/contact": "Contact",
}; 

export default async function Layout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  return (
    <Content>
      <ContentMasthead>{PAGES[pathname as keyof typeof PAGES]}</ContentMasthead>
      {children}
    </Content>
  );
}
