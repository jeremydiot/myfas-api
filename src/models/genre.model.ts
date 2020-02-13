import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export interface GenreInterface {
  label: string;
}

export class Genre extends Model {
  public id!: number;
  public label!: string;
}

Genre.init(
  {
    //@ts-ignore
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    //@ts-ignore
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: database,
    tableName: "genres",
    freezeTableName: true
  }
);
