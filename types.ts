export interface NewsItemSummary {
  id: string,
  title: string,
  img: string,
}

export interface NewsItem extends NewsItemSummary {
  url: string,
  content: string,
}
