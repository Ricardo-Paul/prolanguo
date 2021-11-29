import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";

export interface CategoryRow {
  readonly userId: string;
  readonly vocabularyId: string;
  readonly categoryName: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstSyncedAt: Date | null;
  readonly lastSyncedAt: Date | null;
}

export type CategoryRowForUpsert = DeepPartial<CategoryRow>;