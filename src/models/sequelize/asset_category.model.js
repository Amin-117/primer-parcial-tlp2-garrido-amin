import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model";
import { CategoryModel } from "./category.model";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA

AssetCategoryModel.belongsToMany(CategoryModel, {
  through: AssetCategoryModel,
  foreignKey: "assets_id",
  otherKey: "category_id",
  as: "Asset",
});

CategoryModel.belongsToMany(AssetModel, {
  through: AssetCategoryModel,
  foreignKey: "category_id",
  otherKey: "assets_id",
  as: "categories",
});
