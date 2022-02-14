export interface Resolver<T> {
    resolve(data: any, stripUnknown: boolean): T;
    resolveArray(data: any, stripUnknown: boolean): ReadonlyArray<T>;
  }