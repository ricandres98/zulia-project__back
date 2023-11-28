import { DataTypes, NOW, QueryInterface } from "sequelize";
import { TRANSACTION_TABLE } from "../models/transaction.model";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn(TRANSACTION_TABLE, "reference", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn(TRANSACTION_TABLE, "reference", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    });
  },
};
