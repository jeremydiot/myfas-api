import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import * as bcrypt from "bcrypt";

export interface UserInterface {
  email: string;
  password: string;
  last_connection: String;
}

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public last_connection!: String;
  public salt!: String;

  checkPassword(pswd: string): boolean {
    return bcrypt.compareSync(pswd, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: bcrypt.genSaltSync(10)
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(pswd) {
        //@ts-ignore
        this.setDataValue('password', bcrypt.hashSync(pswd, bcrypt.genSaltSync(10), null));
      }
    },
    last_connection: {
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
