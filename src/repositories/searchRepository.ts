import { MOCK_SEARCH_ITEMS, type SearchItem } from "@/fixtures/search";

export async function getSearchItems(): Promise<SearchItem[]> {
  // Bytt ut med fetch() når ekte API er klart:
  // const res = await fetch("https://pcs-api.com/search");
  // return res.json();
  return MOCK_SEARCH_ITEMS;
}