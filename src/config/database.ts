import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

export const database = new Sequelize({
  host: "postgres",
  port: 5432,
  username: process.env.DB_ROOT_LOGIN,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "postgres"
});