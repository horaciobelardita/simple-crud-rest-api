import express from "express";
import morgan from "morgan";
import productRoutes from "./routes/products.routes.js";
import indexRoutes from "./routes/index.routes.js";
import handleErrors from "./middleware/handleErrors.js";
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", indexRoutes);
app.use("/api/products", productRoutes);

app.use(handleErrors);

export default app;
