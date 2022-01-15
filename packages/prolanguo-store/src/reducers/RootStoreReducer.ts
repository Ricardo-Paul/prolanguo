import { InferableAction } from "@prolanguo/prolanguo-action";
import { ObservableRootStore } from "@prolanguo/prolanguo-observable";
import { Reducer } from "./reducer";
import { ThemeStoreReducer } from "./ThemeStoreReducer";

export class RootStoreReduer extends Reducer{
    private reducers: readonly Reducer[];

    public constructor(rootStore: ObservableRootStore){
        super();
        this.reducers = [
            new ThemeStoreReducer(rootStore.themeStore)
        ]
    };

    public perform(action: InferableAction): void {
        this.reducers.forEach(
            (reducer): void => {
                reducer.perform(action);
        });
    }
}