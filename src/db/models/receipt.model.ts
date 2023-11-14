import { Model, DataTypes, Sequelize, ModelAttributes, NOW} from "sequelize";

const RECEIPT_TABLE = 'receipts';

const ReceiptSchema: ModelAttributes = {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    billedMonth: {
        type: DataTypes.STRING,
        allowNull: false, 
        field: 'billed_month',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
        allowNull: false,
        field: 'created_at'
    },
    apartmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'apartment_id'
        // references
    }
}

class Receipt extends Model {
    static associate () {}

    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: RECEIPT_TABLE,
            modelName: 'Receipt',
            timestamps: false
        }
    }
}

export { Receipt, RECEIPT_TABLE, ReceiptSchema}