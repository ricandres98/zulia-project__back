import { Model, DataTypes, Sequelize, ModelAttributes, NOW } from "sequelize";
import { APARTMENT_TABLE } from "./apartment.model";
import { PERIOD_TABLE } from "./period.model";

const RECEIPT_TABLE = "receipts";

const ReceiptSchema: ModelAttributes = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: NOW,
    allowNull: false,
    field: "created_at",
  },
  periodId: {
    type: DataTypes.INTEGER,
    field: "period_id",
    allowNull: false,
    references: {
      model: PERIOD_TABLE,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  apartmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "apartment_id",
    references: {
      model: APARTMENT_TABLE,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
};

class Receipt extends Model {
  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Period, {as: "period"});
    this.belongsTo(models.Apartment, { as: "apartment" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: RECEIPT_TABLE,
      modelName: "Receipt",
      timestamps: false,
    };
  }
}

export { Receipt, RECEIPT_TABLE, ReceiptSchema };
