import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config";
import * as uuid from "uuid";

class Seal extends Model {
  public id: string;
}

Seal.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    numSeal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "seal",
    hooks: {
      beforeValidate: async (element: Seal) => {
        element.id = uuid.v4();
      },
    },
  }
);

export default Seal;
