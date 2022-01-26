import * as _ from "lodash";
import { StyleSheet } from "react-native";
import { memoize } from "lodash-decorators";

export type ScaleByFactor = (value: number, factor?: number) => number;
export type ScaleByBreakPoints = (value: readonly [number, number, number, number]) => number;

interface Layout{
  width: number,
  height: number
}

export abstract class ResponsiveStyleSheet<T>{
  private defaultFactor = 0.1;

  public abstract baseStyles(
    scaleByFacor: ScaleByFactor
  ): T;

  public abstract lightStyles(): Partial<T>;
  public abstract darkStyles(): Partial<T>;

  public compile(layout: Layout){
    return this.memoizedCompile(layout.width)
  };

  // caching function output
  @memoize((...args: []) => JSON.stringify(args))
  private memoizedCompile(width: number){
    const scaleByFacor = (value: number, factor?: number) => {
      return this.scaleByFactor(
        value,
        typeof factor !== "undefined"? factor : this.defaultFactor,
        width
      )
    };

    return StyleSheet.create(
      _.merge(
        {},
        this.baseStyles(scaleByFacor),
        this.lightStyles(), // do this based on the theme
        this.darkStyles(),
      )
    );
  }

  protected scaleByFactor(value: number, factor: number, width: number): number{
    console.log("received width :", width)
    const baseWidth = 350;
    return Math.round(value + ((width / baseWidth) * value - value) * factor );
  }
}