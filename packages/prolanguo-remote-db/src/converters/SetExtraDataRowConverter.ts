import { SetExtraDataName } from "@prolanguo/prolanguo-common/enums";
import { SetExtraDataItem } from "@prolanguo/prolanguo-common/types";

interface SetExtraDataRow{
  dataName: SetExtraDataName,
  dataValue: string,
  createdAt: Date,
  updatedAt: Date,
  firstSyncedAt: Date,
  lastSyncedAt: Date
}


export class SetExtraDataRowConverter {
  // Parse dataValue for each extra data row
  public converToSetExtraDataItem(setRows: SetExtraDataRow[]): SetExtraDataItem[]{
    return setRows.map((setRow) => {
      return {
        ...setRow,
        dataValue: JSON.parse(setRow.dataValue)
      }
    })
  }
}