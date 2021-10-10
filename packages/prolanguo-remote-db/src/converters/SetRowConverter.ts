import {SetRow} from "../interfaces/SetRow";
import { Set } from "@prolanguo/prolanguo-common/interfaces";
import { SetExtraDataItem } from "@prolanguo/prolanguo-common/types";

export class SetRowConverter{
  public convertToSet(setRow: SetRow, extraData: SetExtraDataItem[]): Set{
    return {
      userId: setRow.userId,
      setId: setRow.setId,
      setName: setRow.setName,
      setStatus: setRow.setStatus,
      learningLanguageCode: setRow.learningLanguageCode,
      translatedLanguageCode: setRow.translatedLanguageCode,
      createdAt: setRow.createdAt,
      updatedAt: setRow.updatedAt,
      updatedStatusAt: setRow.updatedStatusAt,
      firstSyncedAt: setRow.firstSyncedAt,
      lastSyncedAt: setRow.lastSyncedAt,
      extraData
    }
  }
};