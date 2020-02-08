import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export interface PersonalityInterface {
  name: string;
}

export class Personality extends Model {
  public id!: number;
  public name!: string;
}

Personality.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: database,
    tableName: "personalities",
    freezeTableName: true
  }
);
