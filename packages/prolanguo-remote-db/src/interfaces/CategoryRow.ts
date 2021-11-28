import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";

export interface CategoryRow {
  userId: string;
  vocabularyId: string;
  categoryName: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  firstSyncedAt: Date | null;
  lastSyncedAt: Date | null;
}

export type CategoryRowForUpsert = DeepPartial<CategoryRow>;