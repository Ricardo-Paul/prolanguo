export function assertExists<V>(value: V, message?: string): NonNullable<V>{
  if(value !== null && typeof value !== 'undefined'){
    return value as NonNullable<V>
  } else {
    throw new Error(
      message || `(utils )Assertion failed, value is in fact null/undefined`
    )
  }
};