
/**
 * Dynamic mapper function to help transform data into required format -
 * decouples the transformation logic from the function.
 * @param items data to be transformed
 * @param mapper function to transform data
 * @returns generic array of transformed data
 */
export function transformData<T, Z>(
  items: T[],
  mapper: (item: T) => Z
): Z[] {
  return items?.map?.(mapper);
};