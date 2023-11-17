import { Sequelize } from "sequelize";
import { config } from "../config/config";
import setupModels from "../db/models";

const USER = config.dbUser && encodeURIComponent(config.dbUser);
const PASSWORD = config.dbPassword && encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: config.env === "development"
})

setupModels(sequelize);

export { sequelize };