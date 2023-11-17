import { Model, NOW, DataTypes, ModelAttributes, Sequelize } from "sequelize";
import { OWNER_TABLE } from "./owner.model";

const APARTMENT_TABLE = "apartments";

const ApartmentSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  apartmentNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    field: "apartment_number",
  },
  aliquot: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: NOW,
    field: "created_at",
    allowNull: false,
  },
  ownerId:{
    type: DataTypes.INTEGER,
    field: "owner_id",
    allowNull: true,
    references: {
      model: OWNER_TABLE,
      key: "id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  debt: {
    type: DataTypes.FLOAT,
  },
};

class Apartment extends Model {
  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Owner, { as: "owner"});
    this.hasMany(models.Receipt, {
      as: "receipts",
      foreignKey: "apartmentId"
    });
    this.hasOne(models.User, {
      as: "credentials",
      foreignKey: "apartmentId"
    });
    this.belongsToMany(models.Email, {
      as: "sendReceiptsTo",
      through: models.ApartmentEmail,
      foreignKey: "apartmentId",
      otherKey: "emailId"
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: APARTMENT_TABLE,
      modelName: "Apartment",
      timestamps: false,
    };
  }
}

export { ApartmentSchema, Apartment, APARTMENT_TABLE };
