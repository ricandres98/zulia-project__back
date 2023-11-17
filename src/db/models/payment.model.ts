import { DataTypes, Model, ModelAttributes, Sequelize } from "sequelize";
import { APARTMENT_TABLE } from "./apartment.model";
import { TRANSACTION_TABLE } from "./transaction.model";

const PAYMENT_TABLE = "payments";

const PaymentSchema: ModelAttributes = {
	id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
	apartmentId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: "apartment_id",
		references: {
			model: APARTMENT_TABLE,
			key: "id"
		},
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	},
	transactionId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: "transaction_id",
		references: {
			model: TRANSACTION_TABLE,
			key: "id"
		},
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	}
};

class Payment extends Model {
	static associate(models: Sequelize["models"]) {
		this.belongsTo(models.Transaction, { as: "transactionInfo" });
		this.belongsTo(models.Apartment, { as: "apartment" });
	}

  static config(sequelize: Sequelize) {
    return {
      sequelize,
			modelName: "Payment",
			tableName: PAYMENT_TABLE,
			timestamps: false,
    };
  }
}

export { Payment, PAYMENT_TABLE, PaymentSchema };
