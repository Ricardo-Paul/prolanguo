import { DefinitionStatus } from "@prolanguo/prolanguo-common/enums"


export interface DefinitionRow{
  readonly userId: string;
  readonly vocabularyId: string;
  readonly definitionId: string,
  readonly meaning: string;
  readonly source: string;
  readonly wordClasses: string; //coming from the db we expect wordclasses to be a json string
  readonly definitionStatus: DefinitionStatus; //should be either one of these strings
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly updatedStatusAt: null | Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
  readonly extraData: readonly any[]
}