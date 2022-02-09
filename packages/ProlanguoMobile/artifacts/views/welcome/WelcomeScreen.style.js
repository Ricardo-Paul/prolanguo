"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeScreenResponsiveStyles = void 0;
const responsive_1 = require("../../utils/responsive");
class WelcomeScreenResponsiveStyles extends responsive_1.ResponsiveStyleSheet {
    baseStyles(scaleByFacor) {
        return {
            screen: {
                flex: 1,
                position: "relative",
                backgroundColor: "#001d55"
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
        };
    }
    ;
    lightStyles() {
        return {};
    }
    darkStyles() {
        return {};
    }
}
exports.welcomeScreenResponsiveStyles = new WelcomeScreenResponsiveStyles();
