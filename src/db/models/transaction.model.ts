import { Model, DataTypes, Sequelize, NOW, ModelAttributes } from "sequelize";
import { PERIOD_TABLE } from "./period.model";

const TRANSACTION_TABLE = "transactions";

const TransactionSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: NOW,
    field: "created_at",
  },
  periodId: {
    field: "period_id",
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: PERIOD_TABLE,
      key: "id"
    },
    onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
  },
};

class Transaction extends Model {
	static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Period, {as: "period"});
  }

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			modelName: 'Transaction',
			tableName: TRANSACTION_TABLE,
			timestamps: false
		}
	}
}

export { Transaction, TransactionSchema, TRANSACTION_TABLE };
