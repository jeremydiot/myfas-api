import { Model, DataTypes, Sequelize, Deferrable } from "sequelize";
import database from "../config/database";
import { Node } from "./node.model";

export interface LinkInterface {
    name: string;
    fromId: number;
    toId: number;
}

export class Link extends Model {
  public id!: number;
  public name!: string;
  public fromId!: number;
  public toId!: number;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Link.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    fromId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references:{
        model:Node,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE()
      }
    },
    toId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references:{
        model:Node,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE()
      }
    }
  },
  {
    sequelize: database,
    tableName: "links",
    freezeTableName:true
  }
);

Link.belongsTo(Node,{foreignKey:"fromId", targetKey:"id",as:"PreviousLinks",onDelete:'CASCADE',constraints:true});
Link.belongsTo(Node,{foreignKey:"toId", targetKey:"id",as:"nextLinks"});