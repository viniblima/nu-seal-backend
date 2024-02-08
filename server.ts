import express, { Application } from "express";
import cors from "cors";

import dotenv from "dotenv";
import { Pool } from "pg";

import routes from "./api/routes";
import dbInit from "./db/init";

const app: Application = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
const isProduction = process.env.NODE_ENV === "production";

dotenv.config(); //Reads .env file and makes it accessible via process.env
const pool = new Pool({
  connectionString: isProduction
    ? process.env.HEROKU_POSTGRESQL_CRIMSON_URL
    : process.env.DATABASE_URL,
  // ssl: isProduction,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

app.use(express.json());

const connectToDB = async () => {
  try {
    await pool.connect();

    dbInit();
  } catch (err) {
    console.log(err);
  }
};

connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
  console.log(new Date());
});

//app.use("/upload", validateJwt, express.static("upload"));

app.use("/api/v1", routes);
