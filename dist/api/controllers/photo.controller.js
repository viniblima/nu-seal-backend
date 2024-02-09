"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhoto = exports.updatePhotoIndex = exports.create = void 0;
const models_1 = require("../../db/models");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const URL = path_1.default.basename("upload");
const create = (userId, fileName, index) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photo = yield models_1.Photo.create({
            referenceId: userId,
            fileName: fileName,
            index: index,
        });
        return { success: true, photo };
    }
    catch (e) {
        return { success: false, error: e };
    }
});
exports.create = create;
const updatePhotoIndex = (photoId, index) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photo = yield models_1.Photo.update({
            index: index,
        }, {
            where: {
                id: photoId,
            },
        });
        return { success: true, photo };
    }
    catch (e) {
        return { success: false, error: e };
    }
});
exports.updatePhotoIndex = updatePhotoIndex;
const deletePhoto = (photoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photo = yield models_1.Photo.findOne({
            where: {
                id: photoId,
            },
        });
        fs_1.default.unlink(`${URL}/${photo === null || photo === void 0 ? void 0 : photo.dataValues.fileName}`, (err) => {
            if (err) {
                return { success: false, error: err };
            }
        });
        yield models_1.Photo.destroy({
            where: {
                id: photoId,
            },
        });
        return { success: true, photo };
    }
    catch (e) {
        return { success: false, error: e };
    }
});
exports.deletePhoto = deletePhoto;
