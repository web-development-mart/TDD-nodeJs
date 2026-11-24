/**
 * Checks whether an email address is well-formatted.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  throw new Error('Not implemented');
}

/**
 * Checks whether the shop is currently open.
 * The shop is open Monday–Saturday, 09:00–18:00.
 * @param {Date} date
 * @returns {boolean}
 */
export function isShopOpen(date) {
  throw new Error('Not implemented');
}

/**
 * Validates an array of orders.
 * Rules:
 *   - Must be a non-empty array
 *   - No more than 20 orders at once
 *   - Each order must have a non-empty string `item`
 *   - Each order must have a `quantity` that is a positive integer
 *   - No single order quantity may exceed 50
 *
 * @param {Array<{ item: string, quantity: number }>} orders
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateOrders(orders) {
  throw new Error('Not implemented');
}
