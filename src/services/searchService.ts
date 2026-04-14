import { MOCK_SEARCH_ITEMS, type SearchItem } from "@/fixtures/search";

export type { SearchItem };

export function searchAll(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return MOCK_SEARCH_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q)
  );
}