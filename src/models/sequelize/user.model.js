import { DataTypes } from "sequelize";
import { ProfileModel } from "./profile.model";

export const UserModel = sequelize.define("User", {
  username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: {
    type: DataTypes.ENUM("secretary", "administrator"),
    allowNull: false,
    defaultValue: "secretary",
  },
});

UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  as: "profile",
});

ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});
