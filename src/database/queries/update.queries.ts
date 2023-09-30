/*
  NOTE:
  These query builders return query objects that can be used with the
  'pg' postgres driver.
*/

/**
 *
 * @param table : string (eg: "users")
 * @param updates : object (eg: { name: "John", age: 12})
 * @param criteria : string (eg: "id = '1234'") (Do not include WHERE)
 * @returns object{ text: string, values: [] }
 */
export function buildUpdateQuery(
  table: string,
  updates: { [key: string]: any },
  criteria: string
) {
  const setClauses = Object.keys(updates)
    .map((v, i) => `${v}=$${i + 1}`)
    .join(",");

  let queryText = `UPDATE ${table} SET ${setClauses} WHERE ${criteria}`;

  return { text: queryText, values: Object.values(updates) };
}
