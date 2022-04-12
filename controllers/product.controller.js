import Product from "../models/Product.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra";
const index = async (request, response, next) => {
  try {
    const products = await Product.find();
    return response.json(products);
  } catch (error) {
    return next(error);
  }
};
const store = async (request, response, next) => {
  const { name, description, price } = request.body;
  if (!name) {
    response.status(400);
    return next(new Error("Name is required"));
  }
  try {
    const product = new Product({ name, description, price });

    if (request.files?.image) {
      const { secure_url, public_id } = await uploadImage(
        request.files.image.tempFilePath
      );
      product.image = { url: secure_url, public_id };
      await fs.unlink(request.files.image.tempFilePath);
    }
    await product.save();
    return response.status(201).json(product);
  } catch (error) {
    return next(error);
  }
};
const destroy = async (request, response, next) => {
  const { id } = request.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return response.status(404).json({ message: "Product not found" });
    }
    if (deletedProduct?.image?.public_id) {
      await deleteImage(deletedProduct.image.public_id);
    }
    return response.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};
const update = async (request, response, next) => {
  const { id } = request.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      response.status(404);
      return next(new Error("product not found"));
    }
    Object.entries(request.body).forEach(([key, value]) => {
      product[key] = value;
    });
    if (request.files?.image) {
      if (product?.image?.public_id) {
        await deleteImage(product?.image?.public_id);
      }
      const { secure_url, public_id } = await uploadImage(
        request.files.image.tempFilePath
      );
      product.image = { url: secure_url, public_id };
      await fs.unlink(request.files.image.tempFilePath);
    }
    const updatedProduct = await product.save();
    return response.json(updatedProduct);
  } catch (error) {
    return next(error);
  }
};

const show = async (request, response, next) => {
  const { id } = request.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return response.status(404).json({ message: "product not found" });
    }

    return response.json(product);
  } catch (error) {
    return next(error);
  }
};

export default { index, store, destroy, update, show };
