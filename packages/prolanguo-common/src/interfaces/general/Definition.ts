import { DefinitionStatus } from "../../enums/DefinitionStatus";
import { WordClasses } from "../../enums/WordClasses";

export interface Definition{
  readonly definitionId: string,
  readonly meaning: string,
  readonly source: string,
  // readonly wordClasses: readonly WordClasses[],
  readonly definitionStatus: DefinitionStatus,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly updatedStatusAt: null | Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
  // readonly extraData: readonly any[]
}