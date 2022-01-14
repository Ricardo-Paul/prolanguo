import { Container } from "../Container";

type Constructor<T> = new(...args: any[]) => T

// TODO: add type annotation to constructor
export function extendContainer(constructor: Constructor<Container>){
    return class extends constructor{
        public constructor(...args: []){
            super(...args);
        };

        public componentDidMount(){
            if(typeof super.componentDidMount !== "undefined"){
                super.componentDidMount();
            }
            console.log("component mounted");
            // this.observer.reaction(
                // access the theme from the rootStore
            // )
        }

        public componentWillUnmount(){
            
        }
    }
}