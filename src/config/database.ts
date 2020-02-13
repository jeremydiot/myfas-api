import { Sequelize, DataTypes, QueryInterface } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

export const database = new Sequelize({
          host: process.env.DB_HOST,
          port: parseInt(<string>process.env.DB_PORT,10),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          dialect: "postgres"
        });


// PG 		      SEQUELIZE 	FROMAT

// TIME 		    TIME 		    00:00:00
// TIMESTAMPTZ 	DATE		    2016-06-22 19:10:25-07
// DATE 		    DATEONLY 	  01/01/2001

