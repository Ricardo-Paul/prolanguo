import React from "react";
import { Services } from "./interfaces/Services";
import { Options } from "react-native-navigation";

enum Theme{

}

export interface ContainerPassedProps{
    readonly theme: Theme,
    readonly screenType: undefined | 'full' | 'modal',
    readonly styles: {
        readonly light: Options,
        readonly dark: Options
    }
};

export interface ContainerProps<T extends object = {}> extends ContainerPassedProps, Services {
    componentId: string,
    passedProps: T
}

export abstract class Container<T extends object = {}> extends React.Component<ContainerProps<T>> {

}