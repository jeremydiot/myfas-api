import { Model, DataTypes, Deferrable } from "sequelize";
import { database } from "../config/database";
import { Personality } from "./personalities.model";
import { Media } from "./media.model";

export interface ProducerInterface {
  media_id: number;
  personality_id: number;
}

export class Producer extends Model {
  public media_id!: number;
  public personality_id!: number;
}

Producer.init(
  {
    //@ts-ignore
    media_id: {
      type:  DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Media,
        key: "id",
        //@ts-ignore
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    //@ts-ignore
    personality_id: {
      type:  DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Personality,
        key: "id",
        //@ts-ignore
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  },
  {
    sequelize: database,
    tableName: "producers",
    freezeTableName: true
  }
);

Producer.belongsTo(Media, { foreignKey: "media_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });
Producer.belongsTo(Personality, { foreignKey: "personality_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });