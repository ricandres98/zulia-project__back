import { DataTypes, QueryInterface } from "sequelize";
import { OWNER_TABLE } from "../models/owner.model";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn(OWNER_TABLE, "person_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: "person_id"
    });
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn(OWNER_TABLE, "person_id");
  }
};
