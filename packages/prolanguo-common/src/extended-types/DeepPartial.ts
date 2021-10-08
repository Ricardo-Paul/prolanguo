
//recursively called to allow inner props to be optional
export type DeepPartial <T> = { 
  [P in keyof T]?: 
  T[P] extends (infer U)[]?
  DeepPartial<U>[] : 
  T[P] extends ReadonlyArray<infer V> ? 
  ReadonlyArray<DeepPartial<V>> :
  DeepPartial<T[P]> 
};