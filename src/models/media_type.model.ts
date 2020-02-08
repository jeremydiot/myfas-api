import { Model, DataTypes, Deferrable, Sequelize } from "sequelize";
import { database } from "../config/database";


export interface Media_typeInterface {
  label: string;
}

export class Media_type extends Model {
  public id!: number;
  public label!: string;
}

Media_type.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    label: {
      type:  DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: database,
    tableName: "medias_types",
    freezeTableName: true
  }
);