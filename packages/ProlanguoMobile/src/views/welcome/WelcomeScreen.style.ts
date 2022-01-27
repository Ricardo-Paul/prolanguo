import { ResponsiveStyleSheet, ScaleByFactor } from "../../utils/responsive";
import { TextStyle, ViewStyle } from "react-native";

export interface WelcomeScreenStyles {
  screen: ViewStyle,
  welcome_text: TextStyle,
}
class WelcomeScreenResponsiveStyles extends ResponsiveStyleSheet<WelcomeScreenStyles> {
  public baseStyles(scaleByFacor: ScaleByFactor): WelcomeScreenStyles {
    return {
      screen: {
        flex: 1
      },
      welcome_text: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: scaleByFacor(18)
      }
    }
  };

  public lightStyles(): Partial<WelcomeScreenStyles> {
      return {}
  }

  public darkStyles(): Partial<WelcomeScreenStyles> {
      return {}
  }
}

export const welcomeScreenResponsiveStyles = new WelcomeScreenResponsiveStyles();