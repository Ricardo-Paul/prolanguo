import { memoize } from "lodash-decorators";
import { StyleSheet } from "react-native";
import * as _ from "lodash";

enum Theme {
  LIGHT = "LIGHT",
  DARK = "DARK"
}

export type ScaleByFactor = (value: number, factor?: number) => number;
export type ScaleByBreakpoints = (
  values: readonly [number, number, number, number]
) => number
export interface Layout {
  width: number,
  height: number
}

export abstract class ResponsiveStyleSheet<T, o = {}>{
  private defaultFactor = 0.1;

  public abstract baseStyles(
    scaleByFactor: ScaleByFactor,
    scaleByBreakPoints: ScaleByBreakpoints,
    layout: Layout,
    options?: o
  ): T

  // light and dark styles are derived from base styles
  public abstract lightStyles(
    scaleByFactor: ScaleByFactor,
    scaleByBreakPoints: ScaleByBreakpoints,
    layout: Layout,
    options?: o
  ): Partial<T>

  public abstract darkStyles(
    scaleByFactor: ScaleByFactor,
    scaleByBreakPoints: ScaleByBreakpoints,
    layout: Layout,
    options?: o
  ): Partial<T>

  public compile(layout: Layout, theme: Theme, options?: o): T{
    return this.memoizedCompile(layout.width, layout.height, theme, options);
  }

  // compute and merge styles for screens
  @memoize((...args: any[]): string => JSON.stringify(args))
  protected memoizedCompile(
    width: number,
    height: number,
    theme: Theme,
    options?: o
  ): T {

    const scaleByFactor = (value: number, factor?: number): number => {
      return this.scaleByFactor(
        value,
        typeof factor !== "undefined" ? factor : this.defaultFactor,
        width
      )
    };

    const scaleByBreakPoints = (
      values: readonly [number, number, number, number]
    ) => {
      return this.scaleByBreakPoints(values, width)
    };

    return StyleSheet.create(
      _.merge(
        {},
        this.baseStyles(
          scaleByFactor,
          scaleByBreakPoints,
          { width, height },
          options
        ),
        theme === Theme.LIGHT
          ? this.lightStyles(
            scaleByFactor,
            scaleByBreakPoints,
            { width, height },
            options
          )
          : this.darkStyles(
            scaleByFactor,
            scaleByBreakPoints,
            { width, height },
            options
          )
      )
    )
  }

  // implementation of scaleByFactor
  protected scaleByFactor(
    value: number,
    factor: number,
    width: number
  ): number {
    const basedWidth = 350;
    return Math.round(value + ((width / basedWidth) * value - value) * factor)
  }

  // implementation of scaleByBreakpoints
  protected scaleByBreakPoints(
    values: readonly [number, number, number, number],
    width: number
  ): number {
    // portrait phones
    if (width < 576) {
      return values[0];
      // landscape phones
    } else if (width < 768) {
      return values[1]
      // Portrait tablets
    } else if (width < 992) {
      return values[2]
      // Landscape tables and desktops
    } else {
      return values[3]
    }
  }
}

export const defaultHorizontalMarginBreakpoints: readonly [
  number, number, number, number
] = [16, 56, 106, 196]