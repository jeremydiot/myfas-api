import { Model, DataTypes, Deferrable, Sequelize } from "sequelize";
import { database } from "../config/database";
import { Personality } from "./personalities.model";
import { Media } from "./media.model";

export interface ActorInterface {
  media_id: number;
  personality_id: number;
}

export class Actor extends Model {
  public media_id!: number;
  public personality_id!: number;
}

Actor.init(
  {
    media_id: {
      type: new DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Media,
        key: "id",
        deferrable: new Deferrable.INITIALLY_IMMEDIATE
      }
    },
    personality_id: {
      type: new DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Personality,
        key: "id",
        deferrable: new Deferrable.INITIALLY_IMMEDIATE
      }
    }
  },
  {
    sequelize: database,
    tableName: "actors",
    freezeTableName: true
  }
);

Actor.belongsTo(Media, { foreignKey: "media_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });
Actor.belongsTo(Personality, { foreignKey: "personality_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });