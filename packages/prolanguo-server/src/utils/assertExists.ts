
export function assertExists<T>(value: T, message?: string): NonNullable<T>{
  if(value !== null && typeof value !== undefined){
    return value as NonNullable<T>
  } else {
    throw Error(
      message? message : "Assert value exits but is actually null/undefined"
    );
  }
};