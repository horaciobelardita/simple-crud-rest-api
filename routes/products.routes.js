import { Router } from "express";
import fileUpload from "express-fileupload";

import productController from "../controllers/product.controller.js";
const productRoutes = Router();

productRoutes
  .route("/")
  .get(productController.index)
  .post(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads/",
    }),
    productController.store
  );
productRoutes
  .route("/:id")
  .delete(productController.destroy)
  .get(productController.show)
  .put(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads/",
    }),
    productController.update
  );

export default productRoutes;
