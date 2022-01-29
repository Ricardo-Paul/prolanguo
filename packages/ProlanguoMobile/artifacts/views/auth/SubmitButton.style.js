"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitButtonResponsiveStyles = void 0;
const responsive_1 = require("../../utils/responsive");
class SubmitButtonResponsiveStyles extends responsive_1.ResponsiveStyleSheet {
    baseStyles(scaleByFacor, scaleByBreakPoints) {
        return {
            button_touchable: {
                flex: 1,
                alignItems: "center",
                paddingHorizontal: scaleByFacor(10),
                paddingVertical: scaleByFacor(12),
                justifyContent: "center",
                borderRadius: scaleByFacor(4),
                marginHorizontal: scaleByBreakPoints(responsive_1.defaultHorizontalMarginByBreakPoints),
                backgroundColor: "#255584",
            }
        };
    }
    lightStyles() {
        return {};
    }
    darkStyles() {
        return {};
    }
}
exports.submitButtonResponsiveStyles = new SubmitButtonResponsiveStyles();
