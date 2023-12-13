import { Model, Sequelize, DataTypes, ModelAttributes } from "sequelize";
import { APARTMENT_TABLE } from "./apartment.model";

const USER_TABLE = "users";

const UserSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apartmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "apartment_id",
    references: {
      model: APARTMENT_TABLE,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
};

class User extends Model {
  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Apartment, { as: "apartment" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

export { User, USER_TABLE, UserSchema };
