import { Photo } from "../../db/models";
import fs from "fs";
import path from "path";

const URL: string = path.basename("upload");

export const create = async (
    userId: string,
    fileName: string,
    index: number
) => {
    try {
        const photo = await Photo.create({
            referenceId: userId,
            fileName: fileName,
            index: index,
        });
        return { success: true, photo };
    } catch (e) {
        return { success: false, error: e };
    }
};

export const updatePhotoIndex = async (photoId: string, index: number) => {
    try {
        const photo = await Photo.update(
            {
                index: index,
            },
            {
                where: {
                    id: photoId,
                },
            }
        );
        return { success: true, photo };
    } catch (e) {
        return { success: false, error: e };
    }
};

export const deletePhoto = async (photoId: string) => {
    try {
        const photo = await Photo.findOne({
            where: {
                id: photoId,
            },
        });

        fs.unlink(`${URL}/${photo?.dataValues.fileName}`, (err) => {
            if (err) {
                return { success: false, error: err };
            }
        });

        await Photo.destroy({
            where: {
                id: photoId,
            },
        });

        return { success: true, photo };
    } catch (e) {
        return { success: false, error: e };
    }
};
