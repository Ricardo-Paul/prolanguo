import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";

export interface WritinRow{
  readonly userId: string;
  readonly vocabularyId: string;
  readonly level: number;
  readonly lastWritenAt: Date | null;
  readonly disabled: boolean;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly firstSyncedAt: Date | null;
  readonly lastSyncedAt: Date | null;
}

export type WritingRowForUpsert = DeepPartial<WritinRow>;