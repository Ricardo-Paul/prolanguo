interface Constructor{

}

// TODO: add type annotation to constructor
export function extendContainer(constructor: any){
    return class extends constructor{
        public constructor(...args: []){
            super(...args);
        };

        public componentDidMount(){

        }

        public componentWillUnmount(){

        }
    }
}