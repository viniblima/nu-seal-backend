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
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.count = void 0;
const models_1 = require("../../db/models");
const count = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield models_1.Seal.findAndCountAll();
        const seal = yield models_1.Seal.create({
            numSeal: count.count + 1,
            isValid: false,
        });
        return { success: true, seal };
    }
    catch (e) {
        return { success: false, error: e };
    }
});
exports.count = count;
const detail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seal = yield models_1.Seal.findOne({
            where: {
                id: id,
            },
        });
        if (!seal) {
            return { success: false, error: "Seal not found" };
        }
        return { success: true, seal };
    }
    catch (e) {
        return { success: false, error: e };
    }
});
exports.detail = detail;
