import { Sequelize } from "sequelize";
import pg from "pg";

const sequelizeConnection = new Sequelize(
  process.env.DATABASE_URL ??
    "postgres://user_admin_nu_seal:bewrhuioogri12378tgyeoub@postgres:5432/database_name_nu_seal",
  {
    dialectModule: pg,
  }
);

export default sequelizeConnection;
