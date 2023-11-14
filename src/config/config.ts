import dotenv from 'dotenv';

dotenv.config();

// interface ConfigType {
//     env: string
//     port: string
//     dbName: string
//     dbUser: string
//     dbPassword: string
//     dbPort: string
// }

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    dbName: process.env.POSTGRES_DB,
    dbUser: process.env.POSTGRES_USER,
    dbHost: process.env.POSTGRES_HOST,
    dbPassword: process.env.POSTGRES_PASSWORD,
    dbPort: process.env.POSTGRES_PORT,
};

export { config };