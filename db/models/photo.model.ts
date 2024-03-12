import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config";
import * as uuid from "uuid";
import { PhotoType } from "../enum";

class Photo extends Model {
  public id: string;
}

Photo.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sealId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(PhotoType)),
      allowNull: false,
      defaultValue: PhotoType.file,
    },
    // index: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // image: {
    //   type: DataTypes.BLOB("long"),
    //   allowNull: false,
    // },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "photo",
    hooks: {
      beforeValidate: async (photo: Photo) => {
        photo.id = uuid.v4();
      },
    },
  }
);

export default Photo;
