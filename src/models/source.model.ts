import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export interface SourceInterface {
  name: string;
  login: string;
  password: string;
  url: string;
}

export class Source extends Model {
  public id!: number;
  public name!: string;
  public login!: string;
  public password!: string;
  public url!: string;
}

Source.init(
  {
    //@ts-ignore
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    //@ts-ignore
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    //@ts-ignore
    login: {
      type: DataTypes.STRING,
    },
    //@ts-ignore
    password: {
      type: DataTypes.STRING,
    },
    //@ts-ignore
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: database,
    tableName: "sources",
    freezeTableName: true
  }
);