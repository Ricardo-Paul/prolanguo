import React from "react";
import { Services } from "./interfaces/Services";
import { Options } from "react-native-navigation";
import { Observer } from "@prolanguo/prolanguo-observable";
import { Theme } from "@prolanguo/prolanguo-common/enums";

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

// 
export abstract class Container<T extends object = {}> extends React.Component<ContainerProps<T>> {
    public observer = new Observer();
    public onThemeChanged(__: Theme): void{}
}