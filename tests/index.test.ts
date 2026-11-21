import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app, { resetCars } from "../src/index.js";

beforeEach(() => {
  resetCars();
});

// --- GET /cars ---

describe("GET /cars", () => {
  it("returns all cars", async () => {
    const response = await request(app).get("/cars");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});

// --- GET /cars/:id ---

describe("GET /cars/:id", () => {
  it("returns a car by id", async () => {
    const response = await request(app).get("/cars/1");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: 1, make: "Toyota", model: "Corolla" });
  });

  it("returns 404 when the car does not exist", async () => {
    const response = await request(app).get("/cars/999");

    expect(response.status).toBe(404);
  });
});

// --- POST /cars ---

describe("POST /cars", () => {
  it("creates a new car and returns 201", async () => {
    const response = await request(app)
      .post("/cars")
      .send({ make: "Ford", model: "Mustang", year: 2022 });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ make: "Ford", model: "Mustang", year: 2022 });
    expect(response.body.id).toBeDefined();
  });

  it("the new car appears in GET /cars", async () => {
    await request(app).post("/cars").send({ make: "Ford", model: "Mustang", year: 2022 });

    const response = await request(app).get("/cars");

    expect(response.body).toHaveLength(3);
  });
});

// --- PUT /cars/:id ---

describe("PUT /cars/:id", () => {
  it("updates an existing car", async () => {
    const response = await request(app).put("/cars/1").send({ year: 2024 });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: 1, make: "Toyota", year: 2024 });
  });

  it("returns 404 when the car does not exist", async () => {
    const response = await request(app).put("/cars/999").send({ year: 2024 });

    expect(response.status).toBe(404);
  });
});

// --- DELETE /cars/:id ---

describe("DELETE /cars/:id", () => {
  it("deletes a car and returns 204", async () => {
    const response = await request(app).delete("/cars/1");

    expect(response.status).toBe(204);
  });

  it("the deleted car no longer appears in GET /cars", async () => {
    await request(app).delete("/cars/1");

    const response = await request(app).get("/cars");

    expect(response.body).toHaveLength(1);
  });

  it("returns 404 when the car does not exist", async () => {
    const response = await request(app).delete("/cars/999");

    expect(response.status).toBe(404);
  });
});
