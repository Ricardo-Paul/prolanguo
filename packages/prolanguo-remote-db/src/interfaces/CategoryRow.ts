import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";

export interface CategoryRow {
  readonly userId: string;
  readonly vocabularyId: string;
  readonly categoryName: string;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly firstSyncedAt: Date | null;
  readonly lastSyncedAt: Date | null;
}

export type CategoryRowForUpsert = DeepPartial<CategoryRow>;