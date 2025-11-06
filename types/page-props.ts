export type SearchParams = Record<string, string | string[] | undefined>;

export interface PageProps<P extends Record<string, string> = {}> {
  params: P;
  searchParams?: SearchParams;
}
