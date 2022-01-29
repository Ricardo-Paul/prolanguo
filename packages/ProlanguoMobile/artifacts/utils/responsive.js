"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHorizontalMarginByBreakPoints = exports.ResponsiveStyleSheet = void 0;
const _ = require("lodash");
const react_native_1 = require("react-native");
const lodash_decorators_1 = require("lodash-decorators");
class ResponsiveStyleSheet {
    constructor() {
        this.defaultFactor = 0.1;
    }
    compile(layout) {
        return this.memoizedCompile(layout.width);
    }
    ;
    // caching function output
    memoizedCompile(width) {
        const scaleByFacor = (value, factor) => {
            return this.scaleByFactor(value, typeof factor !== "undefined" ? factor : this.defaultFactor, width);
        };
        const scaleByBreakPoints = (values) => {
            return this.scaleBybreakPoints(values, width);
        };
        return react_native_1.StyleSheet.create(_.merge({}, this.baseStyles(scaleByFacor, scaleByBreakPoints), this.lightStyles(), // do this based on the theme
        this.darkStyles()));
    }
    scaleByFactor(value, factor, width) {
        console.log("received width :", width);
        const baseWidth = 350;
        return Math.round(value + ((width / baseWidth) * value - value) * factor);
    }
    scaleBybreakPoints(values, width) {
        if (width < 576) { //portrait phones
            return values[0];
        }
        else if (width < 768) { //phones in landscape mode
            return values[1];
        }
        else if (width < 992) { // tablets in portrait mode
            return values[2];
        }
        else { //landscape tablets and desktop
            return values[3];
        }
    }
}
__decorate([
    (0, lodash_decorators_1.memoize)((...args) => JSON.stringify(args))
], ResponsiveStyleSheet.prototype, "memoizedCompile", null);
exports.ResponsiveStyleSheet = ResponsiveStyleSheet;
// apply a fix horizontal margin based on the device width
exports.defaultHorizontalMarginByBreakPoints = [16, 56, 106, 196];
