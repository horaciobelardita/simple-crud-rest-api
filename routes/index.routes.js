import { Router } from "express";

const indexRoutes = Router();

indexRoutes.get("/", (request, response) => {
  return response.json({ message: "Welcome to the API" });
});

export default indexRoutes;
