import { observable, computed, action } from "mobx";
import { UserExtraDataItem } from "@prolanguo/prolanguo-common/types";
import { UserExtraDataName } from "@prolanguo/prolanguo-common/enums";
import { GlobalTheme } from "@prolanguo/prolanguo-common/interfaces";
import { ThemeSettings } from "@prolanguo/prolanguo-common/interfaces";


export class ObservableUser {
    @observable
    public extraData: readonly UserExtraDataItem[];

    public get themeSettings(): undefined | ThemeSettings{
        const data = this.extraData.find(
            (data): data is GlobalTheme =>
              data.dataName === UserExtraDataName.GLOBAL_THEME
          );
        return data ? data.dataValue : undefined;
    }

    public constructor(
        extraData: readonly any[]
    ){
        this.extraData = extraData;
    }
}