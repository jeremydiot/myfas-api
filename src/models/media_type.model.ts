import { Model, DataTypes, Deferrable, Sequelize } from "sequelize";
import { database } from "../config/database";


export interface MediaTypeInterface {
  label: string;
}

export class MediaType extends Model {
  public id!: number;
  public label!: string;
}

MediaType.init(
  {
    id: {
      type: new DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    label: {
      type: new DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: database,
    tableName: "media_types",
    freezeTableName: true
  }
);