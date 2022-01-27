import { ViewStyle } from "react-native";
import { defaultHorizontalMarginByBreakPoints, ResponsiveStyleSheet, ScaleByBreakPoints, ScaleByFactor } from "../../utils/responsive";

export interface SubmitButtonStyles{
    button_touchable: ViewStyle
}

class SubmitButtonResponsiveStyles extends ResponsiveStyleSheet<SubmitButtonStyles>{
    public baseStyles(
        scaleByFacor: ScaleByFactor,
        scaleByBreakPoints: ScaleByBreakPoints
        ): SubmitButtonStyles {
        return {
            button_touchable: {
                flex: 1,
                alignItems:"center",
                paddingHorizontal: scaleByFacor(10),
                paddingVertical: scaleByFacor(12),
                justifyContent: "center",
                borderRadius: scaleByFacor(4),
                marginHorizontal: scaleByBreakPoints(
                    defaultHorizontalMarginByBreakPoints
                ),
                backgroundColor: "#00c7fe",
            }
        }
    }

    public lightStyles(): Partial<SubmitButtonStyles> {
        return {}
    }

    public darkStyles(): Partial<SubmitButtonStyles> {
        return {}
    }
}

export const submitButtonResponsiveStyles = new SubmitButtonResponsiveStyles();

