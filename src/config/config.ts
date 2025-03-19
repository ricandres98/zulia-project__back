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
    dbURI: process.env.POSTGRES_URI,
    hashingRounds: process.env.HASHING_ROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
};

export { config };