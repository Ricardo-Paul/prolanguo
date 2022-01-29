import { ResponsiveStyleSheet, ScaleByFactor } from "../../utils/responsive";
import { TextStyle, ViewStyle } from "react-native";

export interface WelcomeScreenStyles {
  screen: ViewStyle,
  welcome_text: TextStyle,
  yes_btn: ViewStyle,
  yest_btn_text: TextStyle,
  no_btn: TextStyle,
  no_btn_text: TextStyle,
  logo_container: ViewStyle,
  welcome_text_container: ViewStyle,
  buttons_container: ViewStyle
}
class WelcomeScreenResponsiveStyles extends ResponsiveStyleSheet<WelcomeScreenStyles> {
  public baseStyles(scaleByFacor: ScaleByFactor): WelcomeScreenStyles {
    return {
      screen: {
        flex: 1,
        position: "relative",
        // backgroundColor: "red"
      },
      welcome_text_container: {
        marginTop: scaleByFacor(30),
        alignSelf: "center",
        position: "absolute",
        top: "30%",
      },
      welcome_text: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: scaleByFacor(18)
      },
      buttons_container: {
        position: "absolute",
        width: "100%",
        bottom: scaleByFacor(20),
      },
      yes_btn: {
        backgroundColor: "#3BDEDA",
      },
      yest_btn_text: {
        color: "#000"
      },
      no_btn: {
        marginTop: scaleByFacor(10),
      },
      no_btn_text: {
        color: "#fff"
      },
      logo_container: {
        marginTop: scaleByFacor(20),
        alignSelf: "center",
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