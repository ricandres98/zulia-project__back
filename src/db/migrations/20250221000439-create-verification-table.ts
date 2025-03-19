import { DataTypes, NOW, QueryInterface } from "sequelize";
import { VERIFICATION_TABLE } from "../models/verification.model";

module.exports = {
  async up (queryInterface: QueryInterface) {
    
    await queryInterface.createTable(VERIFICATION_TABLE, {
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
    });
     
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable(VERIFICATION_TABLE);
  }
};
