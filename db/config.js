const dotenv = require("dotenv");

dotenv.config()

const USER = process.env.POSTGRES_USER && encodeURIComponent(process.env.POSTGRES_USER);
const PASSWORD = process.env.POSTGRES_PASSWORD && encodeURIComponent(process.env.POSTGRES_PASSWORD);
const URI = `postgres://${USER}:${PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

module.exports = {
    development: {
        url: URI,
        dialect: "postgres"
    },
    production: {
        url: process.env.DB_URI,
        dialect: "postgres"
    }
}