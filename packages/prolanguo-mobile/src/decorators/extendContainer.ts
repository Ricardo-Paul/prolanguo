import { Theme } from "@prolanguo/prolanguo-common/enums";
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

            const { theme } = this.props.rootStore.themeStore;
            console.log("Container mounted");
            console.log("Mounted Screen Container extended by extendContainer :", constructor.name);
            console.log("current theme pulled from rootStore(global state)", theme);
            // onThemeChanged is defined in all screenContainers, to get autocompletion it is declared in 
            // the Container base abstract class.
            this.observer.reaction(
                (): Theme => theme,
                (theme): void => {
                    this.onThemeChanged(theme);
                }
            )
        }

        public componentWillUnmount(){
            
        }
    }
}