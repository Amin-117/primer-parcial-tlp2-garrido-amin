import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categories.controller.js";
import { createCategoryValidation } from "../middlewares/validations/category.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validator.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const categoryRoutes = Router();

categoryRoutes.use(authMiddleware);

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes

// * crear una categoria (usuario autenticado que sea admin)
categoryRoutes.post(
  "/categories",
  createCategoryValidation,
  validator,
  createCategory
);

// * obtener todas las categorias (usuario autenticado)
categoryRoutes.get("/categories", getAllCategories);

// * eliminar una categoria por id (usuario autenticado que sea admin)
categoryRoutes.delete(
  "/categories/:id",
  adminMiddleware,
  validator,
  deleteCategory
);
