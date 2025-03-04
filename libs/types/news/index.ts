export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticleObj[];
};

export interface NewsArticleObj {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {id: string, name: string};
  title: string;
  url: string;
  urlToImage: string;
};