import {
    autorun,
    reaction,
    when,
    Lambda,
    IAutorunOptions,
    IReactionOptions,
    IReactionPublic,
    IWhenOptions
} from "mobx"

export class Observer{
    private currentId: number = 0;
    private unsubscribeMap: Map<number, ()=>void> = new Map;
    
    public autorun(effect: (r: IReactionPublic) => any, opts?: IAutorunOptions): () => void{
        const currentId = this.nextId();
        const disposer = autorun(effect, opts);

        // set the disposer function in the unsubscribe map
        this.unsubscribeMap.set(currentId, disposer);
        return (): void => this.unsubscribe(currentId);
    };

    public reaction<T>(
        expression: (r: IReactionPublic) => T,
        effect: (arg: T, prev: T | undefined, r: IReactionPublic) => void,
        opts?: IReactionOptions<any, any>
    ): () => void{
        const currentId = this.nextId();
        const disposer = reaction(expression, effect, opts);

        // set the disposer function in the unsubscribe map
        this.unsubscribeMap.set(currentId, disposer);
        return () => this.unsubscribe(currentId);
    }

    public when(
        predicate: () => boolean,
        effect: () => Lambda,
        opts?: IWhenOptions
    ): () => void{
        const currentId = this.nextId();
        const disposer = when(predicate, effect, opts);

        // set the disposer function in the unsubscribe map
        this.unsubscribeMap.set(currentId, disposer);
        return () => this.unsubscribe(currentId)
    }

    private unsubscribe(id: number){
        const unsubscribe = this.unsubscribeMap.get(id);
        if(unsubscribe !== undefined){
            unsubscribe();
        }
        this.unsubscribeMap.delete(id);
    };

    public unsubscribeAll(){
        for(const id of this.unsubscribeMap.keys()){
            this.unsubscribe(id);
        };
    };

    private nextId(){
        return this.currentId++
    }
}