import { Model, NOW, Sequelize, DataTypes, ModelAttributes } from 'sequelize';

const USER_TABLE = 'users';

const UserSchema: ModelAttributes = {
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
        allowNull: false
    }
};

class User extends Model {
    static associate() {}

    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

export { User, USER_TABLE, UserSchema };
