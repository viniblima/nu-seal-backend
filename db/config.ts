import { Sequelize } from "sequelize";
import pg from "pg";

const sequelizeConnection = new Sequelize(
    process.env.DATABASE_URL ??
    "postgres://user_admin_church_backend:bewrhuioogri12378tgyeoub@postgres:5432/database_name_church_backend",
    {
        dialectModule: pg,
    }
);

export default sequelizeConnection;
