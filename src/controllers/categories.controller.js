import { CategoryModel } from "../models/sequelize/category.model";
import { AssetModel } from "../models/mongoose/asset.model";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    // TODO: crear category (solo admin)

    const newCategory = await CategoryModel.create({
      name,
      description,
    });

    return res
      .status(201)
      .json({ msg: "Categoría creada correctamente", newCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  const { id } = req.params;
  try {
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    const categories = await CategoryModel.find({ deletedAt: null }).populate(
      "Assets"
    );
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // TODO: eliminar category (solo admin) y actualizar assets que referencian

    const deletedCategory = await CategoryModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );

    await AssetModel.updateMany(
      { category: id, deletedAt: null },
      { deletedAt: new Date() }
    );

    return res.status(204).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
