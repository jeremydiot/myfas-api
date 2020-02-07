import { Sequelize, DataTypes } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

// export const database 

class Database{
  static sequelize: Sequelize;
  constructor(){
    if(! Database.sequelize){
      Database.sequelize = new Sequelize({
        host: "postgres",
        port: 5432,
        username: process.env.DB_ROOT_LOGIN,
        password: process.env.DB_ROOT_PASSWORD,
        database: process.env.DB_NAME,
        dialect: "postgres"
      });
    }
  }
}

new Database();

export const database =  Database.sequelize;

// PG 		      SEQUELIZE 	FROMAT

// DATE 		    DATEONLY 	  01/01/2001
// TIME 		    TIME 		    00:00:00
// TIMESTAMPTZ 	DATE		    2016-06-22 19:10:25-07