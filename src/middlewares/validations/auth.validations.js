export const registerValidation = [
  // TODO: completar las validaciones para el registro
  body("username")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .withMessage("El email debe ser válido")
    .isString()
    .withMessage("El email debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .custom(validateEmailUnique)
    .normalizeEmail()
    .escape()
    .trim(),
  body("password")
    .isString()
    .withMessage("La contraseña debe ser una cadena de texto")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .trim()
    .escape(),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'"),
  body("profile.first_name")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .trim()
    .escape(),
  body("profile.last_name")
    .isString()
    .withMessage("El apellido debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .trim()
    .escape(),
  body("profile.biography")
    .optional()
    .isString()
    .withMessage("La biografía debe ser una cadena de texto")
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracteres"),
];

export const loginValidation = [
  // TODO: completar las validaciones para el login
  body("email").isEmail().withMessage("El email no es válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];
