import { Model, DataTypes, Deferrable, TIME } from "sequelize";
import { Media_type } from "./media_type.model"
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
    //@ts-ignore
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    //@ts-ignore
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    //@ts-ignore
    release_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    //@ts-ignore
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    //@ts-ignore
    number_seasons: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    //@ts-ignore
    number_episode: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    //@ts-ignore
    running_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    //@ts-ignore
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //@ts-ignore
    media_type_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Media_type,
        key: "id",
        //@ts-ignore
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  },
  {
    sequelize: database,
    tableName: "medias",
    freezeTableName: true
  }
);

Media.belongsTo(Media_type, { foreignKey: "media_type_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });
