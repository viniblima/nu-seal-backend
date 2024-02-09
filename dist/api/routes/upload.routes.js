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
const uploadRouter = (0, express_1.Router)();
const controllers_1 = require("../controllers");
const index_1 = require("../middlewares/index");
// const URL: string = path.basename("upload");
uploadRouter.post("/", index_1.validateJwt, (0, multer_1.default)(index_1.getMulterConfig).array("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        const files = req.files;
        const listResults = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            var indexBase = index;
            if (req.body.sourceIndex) {
                indexBase += req.body.sourceIndex;
            }
            const result = yield controllers_1.photoController.create("", element.filename, indexBase);
            listResults.push(result);
        }
        return res.status(200).send({ result: listResults, files: req.files });
        // try {
        //   const token = req.headers.authorization!.replace("Bearer ", "");
        //   jwt.verify(token, process.env.JWT_KEY!, async (err: any, user: any) => {
        //     if (err) {
        //       res.status(403).send({ message: err.message });
        //       return;
        //     }
        //     const files: any = req.files;
        //     const listResults = [];
        //     for (let index = 0; index < files.length; index++) {
        //       const element: any = files[index];
        //       var indexBase = index;
        //       if (req.body.sourceIndex) {
        //         indexBase += req.body.sourceIndex;
        //       }
        //       const result = await photoController.create(
        //         "",
        //         element.filename,
        //         indexBase
        //       );
        //       listResults.push(result);
        //     }
        //     return res.status(200).send({ result: listResults, files: req.files });
        //   });
    }
    else {
        return res.status(409).send({
            response: `Não é um tipo de arquivo válido`,
        });
    }
}));
uploadRouter.get("/:id", index_1.validateJwt, express_1.default.static("upload"));
exports.default = uploadRouter;
