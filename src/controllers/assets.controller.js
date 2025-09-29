import { AssetModel } from "../models/mongoose/asset.model";

export const createAsset = async (req, res) => {
  const {
    inventoryNumber,
    description,
    brand,
    model,
    tatus,
    acquisitionDate,
    acquisitionValue,
    responsible,
    category,
  } = req.body;
  try {
    // TODO: crear asset (usuario autenticado)
    const newAsset = await createAsset.create({
      inventoryNumber,
      description,
      brand,
      model,
      tatus,
      acquisitionDate,
      acquisitionValue,
      responsible,
      category,
    });
    return res.status(201).json({ msg: "Asset creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
    const assets = await AssetModel.find({ deletedAt: null }).populate(
      "responsible"
    );
    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    const userId = req.user._id;
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)

    const Asset = await AssetModel.find({
      responsible: userId,
      deletedAt: null,
    })

      .populate("author", "username email")
      .populate("article", "title");
    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  const { id } = req.params;
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)

    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const deletedAsset = await AssetModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
