import express from "express";

const app = express();
app.use(express.json());

// TODO: Add a GET / route that returns the text "Hello, World!"

// TODO: Add a GET /someData route that returns this object as JSON:
// { userName: "John", age: 32, email: "john@example.com" }

export default app;
