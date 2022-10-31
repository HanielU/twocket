import type { Record as PR } from "pocketbase";

export type PocketRecord<Props = Record<string, unknown>> = PR & {
  [K in keyof Props]: Props[K];
};

export type PocketCollection<Item extends PocketRecord> = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Item[];
};
