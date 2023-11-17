import { Model, NOW, DataTypes, ModelAttributes, Sequelize } from "sequelize";
import { EMAIL_TABLE } from "./email.model";
import { APARTMENT_TABLE } from "./apartment.model";

const APARTMENT_EMAIL_TABLE = "apartments_emails";

const ApartmentEmailSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
		primaryKey: true, 
		allowNull: false,
		autoIncrement: true
  },
	emailId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: "email_id",
		references: {
			model: EMAIL_TABLE,
			key: "id"
		},
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
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
	createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: NOW,
  }
};

class ApartmentEmail extends Model {
	static associate() {}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			modelName: "ApartmentEmail",
			tableName: APARTMENT_EMAIL_TABLE,
			timestamps: false,
		}
	}
}

export { ApartmentEmail, APARTMENT_EMAIL_TABLE, ApartmentEmailSchema };