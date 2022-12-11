import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

export const DataBaseConfig = new Sequelize(
  `${process.env.DATABASE_NAME}`,
  `${process.env.DATABASE_NAME}`,
  process.env.DATABASE_PASS,
  {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    port: 5432,
  }
);
