import { hashPassword, comparePassword } from "../helpers/bcrypt.helper";
import { UserModel } from "../models/mongoose/user.model";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
    // TODO: crear usuario con password hasheada y profile embebido

    const existingUser = await UserModel.find({
      $or: [{ username }, { email }],
    });

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "El Usuario o Email ya etsan en uso" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      profile,
    });

    await newUser.save();

    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
  const { email, password } = req.body;
  try {
    const userLog = await UserModel.findOne({ email }).select("+password");

    if (!userLog) {
      return res.status(404).json("Usuario no encontrado");
    }

    const contraseñaCorrecta = await comparePassword(
      password,
      userLog.password
    );

    if (!contraseñaCorrecta) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = signToken({ id: userLog._id, role: userLog.role });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.JWT_SECRET,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Logueado Correctamente" });
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    res.status(200).json({
      message: "Perfil del usuario autenticado",
      user: req.user,
    });
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
