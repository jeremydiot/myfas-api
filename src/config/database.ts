import { Sequelize } from "sequelize";
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

export default Database.sequelize;
// Object.freeze(database);
// export database;