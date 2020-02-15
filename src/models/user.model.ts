import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import * as bcrypt from "bcrypt";

export interface UserInterface {
  email: string;
  password: string;
}

export class User extends Model {
  public id!: number;
  public email!: string;
  public uuid!: string;
  public password!: string;
  public last_connection!: string;
  public salt!: string;

  async checkPassword(pswd: string) {

    const hash:string = bcrypt.hashSync(pswd, this.salt);

    return await database.query("EXECUTE FUNCTION check_password("+hash+")");
  }
}

User.init(
  {
    //@ts-ignore
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    //@ts-ignore
    uuid:{
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },
    //@ts-ignore
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    //@ts-ignore
    salt:{
      type: DataTypes.STRING,
      allowNull: false
    },
    //@ts-ignore
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(pswd) {

        const salt: string = bcrypt.genSaltSync(10);

        //@ts-ignore
        this.setDataValue('salt',salt);

        //@ts-ignore
        this.setDataValue('password', bcrypt.hashSync(pswd, salt));
      }
    },
    //@ts-ignore
    last_connection: {
      type: DataTypes.DATE,
    }
  },
  {
    sequelize: database,
    tableName: "users",
    freezeTableName: true,
    timestamps: false
  }
);
