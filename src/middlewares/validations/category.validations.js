export const createCategoryValidation = [
  // TODO: completar las validaciones para crear una categoria
  body("name")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre de es obligatorio")
    .isLength({ min: 13, max: 100 })
    .withMessage("El nombrer no puede exceder los 100 caracteres"),
  body("description")
    .isString()
    .withMessage("La descripcion debe ser una cadena de texto")
    .isLength({ max: 500 })
    .withMessage("La descripcion no puede exceder los 500 caracteres"),
];
