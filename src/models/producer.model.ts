import {Model, DataTypes, Deferrable} from "sequelize";
import {database} from "../config/database";
import {Personality} from "./personalities.model";
import {Media} from "./media.model";

export interface ProducerInterface{
  media_id: number;
  personality_id: number;
}

export class Producer extends Model {
  public media_id!: number;
  public personality_id!: number;
}

Producer.init(
  {
    media_id: {
        type: new DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
          model:Media,
          key: "id",
          deferrable: new Deferrable.INITIALLY_IMMEDIATE
        }
    },
    personality_id: {
        type: new DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
          model:Personality,
          key: "id",
          deferrable: new Deferrable.INITIALLY_IMMEDIATE
        }
    }
  },
  {
    sequelize: database,
    tableName: "producers",
    freezeTableName:true
  }
);

Producer.belongsTo(Media,{foreignKey:"media_id", targetKey:"id",onDelete:'CASCADE',constraints:true});
Producer.belongsTo(Personality,{foreignKey:"personality_id", targetKey:"id",onDelete:'CASCADE',constraints:true});