import { Model, NOW, Sequelize, ModelAttributes, DataTypes } from "sequelize";

const OWNER_TABLE = "owners";

const OwnerSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "first_name",
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "middle_name",
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "last_name",
  },
  secondLastName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "second_last_name",
  },
  personId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    field: "person_id"
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
    defaultValue: NOW,
  },
};

class Owner extends Model {
  static associate(models: Sequelize["models"]) {
    this.hasMany(models.Apartment, {
      foreignKey: "ownerId",
      as: "apartments"
    })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: OWNER_TABLE,
      modelName: "Owner",
      timestamps: false,
    };
  }
}

export { OWNER_TABLE, Owner, OwnerSchema };
