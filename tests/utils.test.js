import { describe, it, expect } from "vitest";
import { isValidEmail, isShopOpen, validateOrders } from "../src/utils.js";

// ---------------------------------------------------------------------------
// isValidEmail
// ---------------------------------------------------------------------------

describe("isValidEmail", () => {
  it("returns true for a valid email", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("returns true for an email with subdomain", () => {
    expect(isValidEmail("user@mail.example.co.uk")).toBe(true);
  });

  it("returns false when @ is missing", () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });

  it("returns false when domain is missing", () => {
    expect(isValidEmail("user@")).toBe(false);
  });

  it("returns false when TLD is missing", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("returns false when there are spaces", () => {
    expect(isValidEmail("user @example.com")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// isShopOpen
// ---------------------------------------------------------------------------

describe("isShopOpen", () => {
  // Helper: build a Date for a given day/hour (local time)
  const makeDate = (dayOfWeek, hour) => {
    // Find next occurrence of dayOfWeek from a fixed reference point
    const date = new Date(2024, 0, 1); // Monday 1 Jan 2024
    const diff = (dayOfWeek - date.getDay() + 7) % 7;
    date.setDate(date.getDate() + diff);
    date.setHours(hour, 0, 0, 0);
    return date;
  };

  it("returns true on a weekday during open hours", () => {
    expect(isShopOpen(makeDate(3, 10))).toBe(true); // Wednesday 10:00
  });

  it("returns true at opening time (09:00)", () => {
    expect(isShopOpen(makeDate(2, 9))).toBe(true); // Tuesday 09:00
  });

  it("returns true on Saturday during open hours", () => {
    expect(isShopOpen(makeDate(6, 14))).toBe(true); // Saturday 14:00
  });

  it("returns false before opening time", () => {
    expect(isShopOpen(makeDate(1, 8))).toBe(false); // Monday 08:00
  });

  it("returns false at or after closing time (18:00)", () => {
    expect(isShopOpen(makeDate(4, 18))).toBe(false); // Thursday 18:00
  });

  it("returns false on Sunday", () => {
    expect(isShopOpen(makeDate(0, 12))).toBe(false); // Sunday 12:00
  });
});

// ---------------------------------------------------------------------------
// validateOrders
// ---------------------------------------------------------------------------

describe("validateOrders", () => {
  it("returns valid for a correct list of orders", () => {
    const orders = [
      { item: "burger", quantity: 2 },
      { item: "fries", quantity: 1 },
    ];
    expect(validateOrders(orders).valid).toBe(true);
  });

  it("returns invalid when orders is not an array", () => {
    const result = validateOrders("burger");
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  it("returns invalid for an empty array", () => {
    expect(validateOrders([]).valid).toBe(false);
  });

  it("returns invalid when there are more than 20 orders", () => {
    const orders = Array.from({ length: 21 }, (_, i) => ({
      item: `item${i}`,
      quantity: 1,
    }));
    const result = validateOrders(orders);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/20/);
  });

  it("returns invalid when an order has an empty item name", () => {
    const result = validateOrders([{ item: "", quantity: 1 }]);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/item/);
  });

  it("returns invalid when quantity is zero", () => {
    const result = validateOrders([{ item: "pizza", quantity: 0 }]);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/quantity/);
  });

  it("returns invalid when quantity is negative", () => {
    const result = validateOrders([{ item: "pizza", quantity: -3 }]);
    expect(result.valid).toBe(false);
  });

  it("returns invalid when quantity is a float", () => {
    const result = validateOrders([{ item: "pizza", quantity: 1.5 }]);
    expect(result.valid).toBe(false);
  });

  it("returns invalid when a single order quantity exceeds 50", () => {
    const result = validateOrders([{ item: "pizza", quantity: 51 }]);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/50/);
  });

  it("collects multiple errors across different orders", () => {
    const orders = [
      { item: "", quantity: -1 },
      { item: "burger", quantity: 100 },
    ];
    const result = validateOrders(orders);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});
