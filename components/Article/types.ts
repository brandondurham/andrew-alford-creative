export interface Article {
  articleID: number;
  authors: string[];
  content: React.ReactNode;
  date: string;
  id: string;
  title: string;
}

export interface ArticleProps extends Article {
  className?: string;
}
