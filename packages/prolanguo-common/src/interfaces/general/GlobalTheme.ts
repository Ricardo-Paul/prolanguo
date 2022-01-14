import { UserExtraDataName } from "../../enums";
import { ThemeSettings } from "./ThemeSettings";


export interface GlobalTheme {
    dataName: UserExtraDataName.GLOBAL_THEME,
    dataValue: ThemeSettings,
    createdAt: Date,
    updatedAt: Date, 
    firstSyncedAt: null | Date,
    lastSyncedAt: null | Date,
}