import express from "express";

const app = express();
app.use(express.json());

type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
};

let cars: Car[] = [
  { id: 1, make: "Toyota", model: "Corolla", year: 2020 },
  { id: 2, make: "Honda", model: "Civic", year: 2019 },
];

let nextId = 3;

export function resetCars(): void {
  cars = [
    { id: 1, make: "Toyota", model: "Corolla", year: 2020 },
    { id: 2, make: "Honda", model: "Civic", year: 2019 },
  ];
  nextId = 3;
}

// TODO: GET /cars — return all cars as JSON

// TODO: GET /cars/:id — return one car by id, 404 if not found

// TODO: POST /cars — create a new car from req.body, return 201 with the created car

// TODO: PUT /cars/:id — update a car by id, return updated car, 404 if not found

// TODO: DELETE /cars/:id — delete a car by id, return 204, 404 if not found

export default app;
