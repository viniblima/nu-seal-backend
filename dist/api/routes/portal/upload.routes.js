"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../../controllers");
const index_1 = require("../../middlewares/index");
const uploadRouter = (0, express_1.Router)();
uploadRouter.post("/seal", (0, multer_1.default)().any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.files);
    const result = yield controllers_1.fileController.createSeal(req.files);
    if (result.success) {
        return res.status(200).send(result);
    }
    else {
        return res.status(400).send({ error: result.error });
    }
}));
uploadRouter.get("/seal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield controllers_1.fileController.getSeal();
    if (result.success) {
        return res.status(200).send(result);
    }
    else {
        return res.status(400).send({ error: result.error });
    }
}));
uploadRouter.post("/:id", 
// validateJwt,
// multer(getMulterConfig).array("file"),
(0, multer_1.default)().any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield controllers_1.fileController.create(req.files, req.params.id);
    return res.status(200).send(result);
}));
uploadRouter.get("/:id", index_1.validateJwt, express_1.default.static("upload"));
uploadRouter.delete("/:id", index_1.validateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield controllers_1.fileController.removeFile(req.params.id);
    return res.status(200).send(result);
}));
exports.default = uploadRouter;
