import { ViewStyle, TextStyle, StyleSheet} from "react-native";
import * as _ from "lodash";

interface TopBarStyles{
    topBarContainer: ViewStyle
}
export const baseStyles: TopBarStyles = {
    topBarContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
}

export const lightStyles = StyleSheet.create(
    _.merge(
        {},
        baseStyles,
        {}
    )
)

export const darkStyles = StyleSheet.create(
    _.merge(
        {},
        baseStyles,
        {}
    )
)