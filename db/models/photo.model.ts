import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config";
import * as uuid from "uuid";

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
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
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
