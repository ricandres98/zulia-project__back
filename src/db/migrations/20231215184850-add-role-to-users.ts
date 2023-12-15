import { DataTypes, QueryInterface } from "sequelize";
import { USER_TABLE } from "../models/user.model";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn(USER_TABLE, "role", {
      type: DataTypes.STRING,
      allowNull:false,
    });
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn(USER_TABLE, "role");
  }
};
