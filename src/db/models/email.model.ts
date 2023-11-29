import { Model, NOW, DataTypes, ModelAttributes, Sequelize } from "sequelize";

const EMAIL_TABLE = "emails";

const EmailSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
    allowNull: false,
    defaultValue: NOW,
  },
};

class Email extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      modelName: "Email",
      tableName: EMAIL_TABLE,
      timestamps: false,
    };
  }
}

export { Email, EMAIL_TABLE, EmailSchema };
