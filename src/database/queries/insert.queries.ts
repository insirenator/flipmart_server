/*
  NOTE:
  These query builders return query objects that can be used with the
  'pg' postgres driver.
*/

/**
 *
 * @param table : string (eg: "users")
 * @param insert : object (eg: { name: "John", age: 12})
 * @returns object{ text: string, values: [] }
 */
export function buildInsertQuery(table: string, insert: object) {
  const fields = Object.keys(insert).join(",");
  const placeholders = Object.keys(insert)
    .map((_, i) => `$${i + 1}`)
    .join(", ");

  let queryText = `INSERT INTO ${table}(${fields}) VALUES (${placeholders});`;

  return { text: queryText, values: Object.values(insert) };
}
