import { Sequelize } from "sequelize";
import { Receipt, ReceiptSchema } from "./receipt.model";
import { Owner, OwnerSchema } from "./owner.model";
import { User, UserSchema } from "./user.model";

function setupModels(sequelize: Sequelize) {
    Receipt.init(ReceiptSchema, Receipt.config(sequelize));
    Owner.init(OwnerSchema, Owner.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
}

export default setupModels;