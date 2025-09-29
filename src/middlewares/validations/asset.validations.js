export const createAssetValidation = [
  // TODO: completar las validaciones para crear un recurso
  body("inventoryNumber")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre de es obligatorio"),
  body("description")
    .isString()
    .withMessage("La descripcion debe ser una cadena de texto")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripcion no puede exceder los 500 caracteres"),
  body("brand")
    .isString()
    .withMessage("La brand debe ser una cadena de texto")
    .isLength({ min: 2, max: 100 })
    .withMessage("La brand no puede exceder los 100 caracteres"),
  body("model")
    .isString()
    .withMessage("El model debe ser una cadena de texto")
    .isLength({ min: 2, max: 100 })
    .withMessage("El model no puede exceder los 100 caracteres"),
  body("status")
    .optional()
    .isIn("good", "regular", "bad", "out_of_service")
    .withMessage("El status debe ser valido"),
  body("acquisitionDate")
    .isISO8601()
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .withMessage("La fecha de debe ser válida"),
  body("acquisitionValue")
    .isIn()
    .withMessage("Tiene que ser un numero")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isLength({ min: 0 })
    .trim()
    .escape(),
];
