import { Model, DataTypes, Deferrable } from "sequelize";
import { database } from "../config/database";
import { Media } from "./media.model";
import { Source } from "./source.model";

export interface Media_sourceInterface {
  media_id: number;
  source_id: number;
  last_update: string;
}

export class Media_source extends Model {
  public media_id!: number;
  public source_id!: number;
  public last_update!: string;
}

Media_source.init(
  {
    media_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Media,
        key: "id",
        //@ts-ignore
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    source_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Source,
        key: "id",
        //@ts-ignore
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    last_update:{
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: database,
    tableName: "medias_sources",
    freezeTableName: true
  }
);

Media_source.belongsTo(Media, { foreignKey: "media_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });
Media_source.belongsTo(Source, { foreignKey: "source_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });