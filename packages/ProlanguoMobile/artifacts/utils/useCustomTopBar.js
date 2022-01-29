"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomTopBar = void 0;
const _ = require("lodash");
const CustomViews_1 = require("../constants/CustomViews");
function useCustomTopBar(options) {
    return _.merge({
        title: {
            component: {
                name: CustomViews_1.CustomViews.TOP_BAR,
                alignment: 'fill',
                passProps: {
                    get passProps() {
                        return {
                            screenName: options.screenName,
                            styles: options.styles
                        };
                    }
                }
            }
        }
        // hide back button
    });
}
exports.useCustomTopBar = useCustomTopBar;
