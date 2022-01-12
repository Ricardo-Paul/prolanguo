import { action, computed, observable } from "mobx"

export class ObservableScreenLayout{

    @observable
    width: number;

    @observable
    height: number;

    @action
    public update(width: number, height: number){
        this.width = width;
        this.height = height
    }

    @computed
    public get isPortrait():boolean {
        return this.height >= this.width;
    };

    @computed
    public get isLandscape():boolean {
        return this.height < this.width;
    }

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }
}