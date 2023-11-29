import { Sequelize, Model, NOW, ModelAttributes, DataTypes} from "sequelize";

const PERIOD_TABLE = "periods";

const PeriodSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: NOW,
    allowNull: false,
  },
};

class Period extends Model {
  static associate(models: Sequelize["models"]) {
    this.hasMany(models.Transaction, {
      as: "commonExpenses",
      foreignKey: "periodId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PERIOD_TABLE,
      modelName: "Period",
      timestamps: false,
    };
  }
}

export { PERIOD_TABLE, Period, PeriodSchema };