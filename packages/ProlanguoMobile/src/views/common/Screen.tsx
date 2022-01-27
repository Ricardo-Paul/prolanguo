import React from "react";
import { ViewProps, View } from "react-native";

export class Screen extends React.Component<ViewProps> {
   render(): React.ReactNode {
       return(
           <View {...this.props}>
               {this.props.children}
           </View>
       )
   }
}