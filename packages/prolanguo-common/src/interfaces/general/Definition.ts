import { DefinitionStatus } from "../../enums/DefinitionStatus";
import { WordClass } from "../../enums/WordClass";

export interface Definition{
  readonly definitionId: string,
  readonly meaning: string,
  readonly source: string,
  readonly wordClasses: WordClass,
  readonly definitionStatus: DefinitionStatus,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly updatedStatusAt: null | Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}