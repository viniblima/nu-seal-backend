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
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const sealRouter = (0, express_1.Router)();
sealRouter.get("/count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield controllers_1.sealController.count();
    if (result.success) {
        return res.status(200).send(result);
    }
    else {
        return res.status(400).send({ error: result.error });
    }
}));
sealRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield controllers_1.sealController.detail(req.params.id);
    if (result.success) {
        return res.status(200).send(result);
    }
    else {
        return res.status(400).send({ error: result.error });
    }
}));
exports.default = sealRouter;
