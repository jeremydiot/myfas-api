import { Model, DataTypes, Sequelize, Deferrable } from "sequelize";
import { database } from "../config/database";
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
      }
    },
    toId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references:{
        model:Node,
        key: "id",
      }
    }
  },
  {
    tableName: "links",
    sequelize: database
  }
);

Link.belongsTo(Node,{foreignKey:"fromId", targetKey:"id",as:"PreviousLinks"});
Link.belongsTo(Node,{foreignKey:"toId", targetKey:"id",as:"nextLinks"});

Link.sync({ force: true }).then(() => console.log("Link table created"));