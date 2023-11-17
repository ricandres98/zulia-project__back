import { DataTypes, NOW, QueryInterface } from "sequelize";
import { OWNER_TABLE }  from "../models/owner.model";
import { APARTMENT_TABLE } from "../models/apartment.model";
import { PERIOD_TABLE } from "../models/period.model";
import { RECEIPT_TABLE } from "../models/receipt.model";
import { USER_TABLE } from "../models/user.model";
import { TRANSACTION_TABLE } from "../models/transaction.model";
import { PAYMENT_TABLE } from "../models/payment.model";
import { EMAIL_TABLE } from "../models/email.model";
import { APARTMENT_EMAIL_TABLE } from "../models/apartment-email.model";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable(OWNER_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name",
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "middle_name",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      secondLastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "second_last_name",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: NOW,
      },
    });
    await queryInterface.createTable(APARTMENT_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      apartmentNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: "apartment_number",
      },
      aliquot: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
        field: "created_at",
        allowNull: false,
      },
      ownerId:{
        type: DataTypes.INTEGER,
        field: "owner_id",
        allowNull: true,
        references: {
          model: OWNER_TABLE,
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      debt: {
        type: DataTypes.FLOAT,
      },
    });
    await queryInterface.createTable(PERIOD_TABLE, {
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
        field: 'created_at',
        defaultValue: NOW,
        allowNull: false,
      }
    });
    await queryInterface.createTable(RECEIPT_TABLE, {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
        allowNull: false,
        field: "created_at",
      },
      periodId: {
        type: DataTypes.INTEGER,
        field: "period_id",
        allowNull: false,
        references: {
          model: PERIOD_TABLE,
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      apartmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "apartment_id",
        references: {
          model: APARTMENT_TABLE,
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
    await queryInterface.createTable(USER_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
        onUpdate: "CASCADE"
      }
    });
    await queryInterface.createTable(TRANSACTION_TABLE, {
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
    });
    await queryInterface.createTable(PAYMENT_TABLE, {
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
    });
    await queryInterface.createTable(EMAIL_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: NOW,
      }
    });
    await queryInterface.createTable(APARTMENT_EMAIL_TABLE, {
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
    });
  },

  async down (queryInterface: QueryInterface) {
    queryInterface.dropTable(APARTMENT_EMAIL_TABLE);
    queryInterface.dropTable(EMAIL_TABLE);
    queryInterface.dropTable(PAYMENT_TABLE);
    queryInterface.dropTable(TRANSACTION_TABLE);
    queryInterface.dropTable(USER_TABLE);
    queryInterface.dropTable(RECEIPT_TABLE);
    queryInterface.dropTable(PERIOD_TABLE);
    queryInterface.dropTable(APARTMENT_TABLE);
    queryInterface.dropTable(OWNER_TABLE);
  }
};

