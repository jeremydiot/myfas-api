import { Model, DataTypes, Deferrable, Sequelize } from "sequelize";
import { database } from "../config/database";
import { User } from "./user.model";
import { Media } from "./media.model";

export interface User_mediaInterface {
  user_id: number;
  media_id: number;
  viewing_date: string;
}

export class User_media extends Model {
  public user_id!: number;
  public media_id!: number;
  public viewing_date!: string;
}

User_media.init(
  {
    //@ts-ignore
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
        //@ts-ignore
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    //@ts-ignore
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
    viewing_date: {
      type: DataTypes.DATE
    },
  },
  {
    sequelize: database,
    tableName: "users_medias",
    freezeTableName: true,
    timestamps: false,
  }
);

User_media.belongsTo(User, { foreignKey: "user_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });
User_media.belongsTo(Media, { foreignKey: "media_id", targetKey: "id", onDelete: 'CASCADE', constraints: true });

