import { DataTypes, NOW, QueryInterface } from "sequelize";
import { TRANSACTION_TABLE } from "../models/transaction.model";


module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn(TRANSACTION_TABLE, "description", {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn(TRANSACTION_TABLE, "description");
  }
};
