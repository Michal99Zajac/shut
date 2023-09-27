import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'

/**
 * Retrieve a nested property value from an object by dot-separated path.
 *
 * @param {any} obj The object from which to extract the property.
 * @param {string} path Dot-separated path to the desired property.
 * @returns {any} Value of the property, or undefined if not found.
 */
function getNestedProperty(obj: any, path: string): any {
  const parts = path.split('.')
  for (let part of parts) {
    if (obj && typeof obj === 'object' && part in obj) {
      obj = obj[part]
    } else {
      return undefined
    }
  }
  return obj
}

/**
 * Assigns a 'depth' value to each item in the items array based on its parent relationship.
 *
 * @template T Generic type for items in the items array.
 * @param {T[]} items Array of items to process.
 * @param {string} [parentIdField='parentId'] Field name representing parent relationship.
 * @returns {(T & { depth: number })[]} Array of items with additional 'depth' property.
 *
 * @example
 * const items = [
 *   { id: 1, parentId: null },
 *   { id: 2, parentId: 1 },
 *   { id: 3, parentId: 2 }
 * ];
 * const result = assignDepth(items);
 * console.log(result);
 * // Outputs:
 * // [
 * //   { id: 1, parentId: null, depth: 0 },
 * //   { id: 2, parentId: 1, depth: 1 },
 * //   { id: 3, parentId: 2, depth: 2 }
 * // ]
 */
export const assignDepth = <T = any>(
  items: T[],
  parentIdField: string = 'parentId',
): (T & { depth: number })[] => {
  const processed: Record<string | number, number> = {}
  const localItems = cloneDeep(items)

  const getDepth = (itemId: string | number): number => {
    if (processed[itemId]) return processed[itemId]

    const item = find<Record<string | number, any>>(localItems, { id: itemId })

    if (!item) return 0

    const property = getNestedProperty(item, parentIdField)

    if (typeof property === 'undefined' || property === null) {
      processed[itemId] = 0
      return 0
    }

    processed[itemId] = getDepth(property) + 1
    return processed[itemId]
  }

  localItems.forEach((item: any) => {
    item.depth = getDepth(item.id)
  })

  return localItems as (T & { depth: number })[]
}

export default assignDepth
