import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/index.js";

describe("GET /", () => {
  it("returns Hello World as text", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, World!");
  });
});

describe("GET /someData", () => {
  it("returns the user data object", async () => {
    const response = await request(app).get("/someData");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      userName: "John",
      age: 32,
      email: "john@example.com",
    });
  });
});
