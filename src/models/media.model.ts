import { Model, DataTypes, Deferrable, TIME } from "sequelize";
import { MediaType } from "./media_type.model"
import { database } from "../config/database";

export interface MediaInterface {
  title: string;
  release_date: Date;
  synopsis: String;
  number_seasons: number;
  number_episode: number;
  running_time: string;
  image: string;
  media_type_id: number;
}

export class Media extends Model {
  public id!: number;
  public title!: string;
  public release_date!: Date;
  public synopsis!: String;
  public number_seasons!: number;
  public number_episode!: number;
  public running_time!: string;
  public image!: string;
  public media_type_id!: number;
}

Media.init(
  {
    id: {
      type: new DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: new DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: new DataTypes.DATEONLY,
      allowNull: false
    },
    synopsis: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    number_seasons: {
      type: new DataTypes.INTEGER.UNSIGNED
    },
    number_episode: {
      type: new DataTypes.INTEGER.UNSIGNED
    },
    running_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    image: {
      type: new DataTypes.STRING,
      allowNull: false,
    },
    media_type_id: {
      type: new DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: MediaType,
        key: "id",
        deferrable: new Deferrable.INITIALLY_IMMEDIATE
      }
    }
  },
  {
    sequelize: database,
    tableName: "medias",
    freezeTableName: true
  }
);

Media.belongsTo(MediaType, { foreignKey: "media_type_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });
