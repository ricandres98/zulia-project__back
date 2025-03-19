import { Model, NOW, Sequelize, ModelAttributes, DataTypes } from "sequelize";

const VERIFICATION_TABLE = "verifications";

const VerificationSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
    defaultValue: NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
    defaultValue: NOW,
  },
};

class Verification extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: VERIFICATION_TABLE,
      modelName: "Verification",
      timestamps: true,
    };
  }
}

export { VERIFICATION_TABLE, Verification, VerificationSchema };