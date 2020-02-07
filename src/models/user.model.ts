import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import * as bcrypt from "bcrypt";

export interface UserInterface {
  email: string;
  password: string;
  salt: string;
  last_connection: String;
}

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public salt!: string;
  public last_connection!: String;


}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      set(pswd){
        //@ts-ignore
        this.setDataValue('password', hash(value));
      }
    },
    salt:{
      type: DataTypes.STRING,
      allowNull: false
    },
    last_connection:{
      type: DataTypes.DATE,
      
    }
  },
  {
    sequelize: database,
    tableName: "users",
    freezeTableName: true,
    timestamps: false
  }
);

