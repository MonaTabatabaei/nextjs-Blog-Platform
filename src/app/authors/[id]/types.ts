export type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: string }>;
};
