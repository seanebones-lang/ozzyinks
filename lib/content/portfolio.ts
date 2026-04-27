import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/portfolio-data";
import { fetchPortfolioItems } from "@/lib/sanity/fetch";

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const remote = await fetchPortfolioItems();
  if (remote && remote.length > 0) return remote;
  return PORTFOLIO_ITEMS;
}
