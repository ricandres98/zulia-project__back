import { Sequelize } from "sequelize";
import { Receipt, ReceiptSchema } from "./receipt.model";
import { Owner, OwnerSchema } from "./owner.model";
import { User, UserSchema } from "./user.model";
import { Apartment, ApartmentSchema } from "./apartment.model";
import { Transaction, TransactionSchema } from "./transaction.model";
import { Period, PeriodSchema } from "./period.model";
import { Payment, PaymentSchema } from "./payment.model";
import { Email, EmailSchema } from "./email.model";
import { ApartmentEmail, ApartmentEmailSchema } from "./apartment-email.model";
import { Verification, VerificationSchema} from "./verification.model";

function setupModels(sequelize: Sequelize) {
  Owner.init(OwnerSchema, Owner.config(sequelize));
  Apartment.init(ApartmentSchema, Apartment.config(sequelize));
  Period.init(PeriodSchema, Period.config(sequelize));
  Receipt.init(ReceiptSchema, Receipt.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Transaction.init(TransactionSchema, Transaction.config(sequelize));
  Payment.init(PaymentSchema, Payment.config(sequelize));
  Email.init(EmailSchema, Email.config(sequelize));
  ApartmentEmail.init(ApartmentEmailSchema, ApartmentEmail.config(sequelize));
  Verification.init(VerificationSchema, Verification.config(sequelize));

  Owner.associate(sequelize.models);
  Apartment.associate(sequelize.models);
  User.associate(sequelize.models);
  Receipt.associate(sequelize.models);
  Period.associate(sequelize.models);
  Transaction.associate(sequelize.models);
  Payment.associate(sequelize.models);
}

export default setupModels;