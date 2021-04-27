/**
 * @public add numbers
 * @param args - numbers
 * @returns number
 */
export function add(...args: any[]) {
  let result = 0;
  for (const item of args) {
    result += Number(item) || 0;
  }
  return result;
}
