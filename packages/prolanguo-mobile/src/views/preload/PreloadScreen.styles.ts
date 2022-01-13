import { Layout, ResponsiveStyleSheet, ScaleByBreakpoints, ScaleByFactor } from "../../utils/responsive";
import { ViewStyle, TextStyle } from "react-native";

export interface PreloadScreenStyles{
    screen: ViewStyle,
    message: TextStyle
}

export class PreloadScreenResponsiveStyles extends ResponsiveStyleSheet<PreloadScreenStyles>{
    public baseStyles(scaleByFactor: ScaleByFactor): PreloadScreenStyles {
        return{
            screen: {
                flex: 1,
                paddingHorizontal: scaleByFactor(16),
                justifyContent: 'center',
                alignItems: 'center',
            },
            message: {
                paddingTop: scaleByFactor(10),
                textAlign: 'center',
                fontSize: scaleByFactor(13),
                color: '#fff'
            }
        }
    };

    public lightStyles(): Partial<PreloadScreenStyles> {
        return {}
    };

    public darkStyles(): Partial<PreloadScreenStyles> {
        return {}
    }
};

export const preloadScreenResponsiveStyles = new PreloadScreenResponsiveStyles();