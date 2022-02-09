import * as uuid from 'uuid';

export function generateEmail(): string{
  return  uuid.v4() + "@prolanguo.com"
}