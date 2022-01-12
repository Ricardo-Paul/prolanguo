import { observer } from "mobx-react";
import { ContainerProps } from "./Container";
import * as React from "react";
import { assertExists } from "@prolanguo/prolanguo-common/assert";
import { ServiceRegistry } from "./ServiceRegistry";

// @observer
export class Provider extends React.Component {
    public render(): React.ReactElement<any> {
        const child = assertExists(
            React.Children.only(this.props.children),
            "Provider requires one child"
        );
        
        if(React.isValidElement<any>(child)){
            const containerProps: ContainerProps<any> = {
                componentId: child.props.componentId,
                screenType: child.props.screenType,
                theme: child.props.theme,
                styles: child.props.styles,
                passedProps: child.props.passedProps,
                ...ServiceRegistry.services
            };

            return React.cloneElement(child, containerProps)
        } else {
            throw new Error('Provider must have a valid child element')
        }
    }
}