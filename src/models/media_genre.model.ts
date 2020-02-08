import { Model, DataTypes, Deferrable, Sequelize } from "sequelize";
import { database } from "../config/database";
import { Media } from "./media.model";
import { Genre } from "./genre.model";

export interface Media_genreInterface {
  media_id: number;
  genre_id: number;
}

export class Media_genre extends Model {
  public media_id!: number;
  public genre_id!: number;
}

Media_genre.init(
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
    genre_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Genre,
        key: "id",
        //@ts-ignore
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  },
  {
    sequelize: database,
    tableName: "medias_genres",
    freezeTableName: true
  }
);

Media_genre.belongsTo(Media, { foreignKey: "media_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });
Media_genre.belongsTo(Genre, { foreignKey: "genre_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });