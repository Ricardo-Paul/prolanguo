"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadScreenResponsiveStyles = exports.PreloadScreenResponsiveStyles = void 0;
const responsive_1 = require("../../utils/responsive");
class PreloadScreenResponsiveStyles extends responsive_1.ResponsiveStyleSheet {
    baseStyles(scaleByFactor) {
        return {
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
        };
    }
    ;
    lightStyles() {
        return {};
    }
    ;
    darkStyles() {
        return {};
    }
}
exports.PreloadScreenResponsiveStyles = PreloadScreenResponsiveStyles;
;
exports.preloadScreenResponsiveStyles = new PreloadScreenResponsiveStyles();
