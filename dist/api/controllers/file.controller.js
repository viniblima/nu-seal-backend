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
exports.getSeal = exports.createSeal = exports.create = exports.removeFile = void 0;
const models_1 = require("../../db/models");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
const signpdf_1 = __importDefault(require("@signpdf/signpdf"));
const signer_p12_1 = require("@signpdf/signer-p12");
const placeholder_plain_1 = require("@signpdf/placeholder-plain");
const enum_1 = require("../../db/enum");
const URL = path_1.default.basename("upload");
const removeFile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fs_1.default.unlink(`${URL}/${id}`, (err) => {
            if (err) {
                return { success: false, error: err };
            }
        });
        fs_1.default.unlink(`${URL}/${id.replace(".pdf", "-signed.pdf")}`, (err) => {
            if (err) {
                return { success: false, error: err };
            }
        });
        return { success: true, msg: "Ok" };
    }
    catch (error) {
        return { success: false, error: error };
    }
});
exports.removeFile = removeFile;
const create = (files, idSeal) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listFiles = [];
        const dir = fs_1.default.existsSync(URL);
        console.log(dir);
        if (!fs_1.default.existsSync(URL)) {
            fs_1.default.mkdirSync(URL);
        }
        // const sealQuantity = await Seal.findAndCountAll();
        // for (let index = 0; index < files.length; index++) {
        var objResult = {};
        const file = files[0];
        const type = mime_1.default.extension(file.mimetype);
        const fileName = `${new Date().getTime()}.${type}`;
        const target_path = "./upload/" + fileName;
        fs_1.default.writeFileSync(target_path, file.buffer);
        const seal = yield models_1.Seal.findOne({
            where: {
                id: idSeal,
            },
        });
        objResult.original = {
            fileName: fileName,
        };
        yield models_1.Photo.create({
            referenceId: "",
            sealId: seal.id,
            fileName: fileName,
        });
        const signer = new signer_p12_1.P12Signer(fs_1.default.readFileSync("./certs/cert.p12"), {
            passphrase: process.env.CERT_PASSWORD,
        });
        const pdfBuffer = fs_1.default.readFileSync(`./upload/${fileName}`);
        const pdfWithPlaceholder = (0, placeholder_plain_1.plainAddPlaceholder)({
            // pdfBuffer: file.buffer,
            pdfBuffer,
            reason: "The user is declaring consent.",
            contactInfo: "nuseal@email.com",
            name: "Teste",
            location: "Rua teste, 1234",
        });
        const signedPdf = yield signpdf_1.default.sign(pdfWithPlaceholder, signer);
        const target_path_signed = "./upload/" + fileName.replace(".pdf", "-signed.pdf");
        fs_1.default.writeFileSync(target_path_signed, signedPdf);
        objResult.signed = {
            fileName: fileName.replace(".pdf", "-signed.pdf"),
        };
        yield models_1.Photo.create({
            referenceId: "",
            sealId: seal.id,
            fileName: fileName.replace(".pdf", "-signed.pdf"),
        });
        yield models_1.Seal.update({
            isValid: true,
        }, {
            where: {
                id: idSeal,
            },
        });
        // listFiles.push(objResult);
        //   fs.rename(fileName, target_path, function (err) {
        // if (err) throw err;
        // fs.unlink(fileName, function () {
        //   if (err) throw err;
        //   // res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        // });
        //   });
        // }
        return { success: true, result: objResult };
    }
    catch (e) {
        return { success: false, error: e };
    }
});
exports.create = create;
const createSeal = (files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photoSeal = yield models_1.Photo.findOne({
            where: {
                type: enum_1.PhotoType.imgSeal,
            },
        });
        console.log(photoSeal);
        if (photoSeal) {
            console.log("chegou aqui 1");
            fs_1.default.unlink(`${URL}/${photoSeal.dataValues.fileName}`, (err) => {
                if (err) {
                    console.log("chegou aqui 2");
                    return { success: false, error: err };
                }
            });
            yield models_1.Photo.destroy({
                where: {
                    type: enum_1.PhotoType.imgSeal,
                },
            });
        }
        console.log("chegou aqui 3");
        const file = files[0];
        const type = mime_1.default.extension(file.mimetype);
        const fileName = `${new Date().getTime()}.${type}`;
        const target_path = "./upload/" + fileName;
        fs_1.default.writeFileSync(target_path, file.buffer);
        const result = yield models_1.Photo.create({
            referenceId: "",
            sealId: "",
            fileName: fileName,
            type: enum_1.PhotoType.imgSeal,
        });
        return { success: true, result };
    }
    catch (error) {
        console.log("chegou aqui 4");
        return { success: false, error: error };
    }
});
exports.createSeal = createSeal;
const getSeal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photoSeal = yield models_1.Photo.findOne({
            where: {
                type: enum_1.PhotoType.imgSeal,
            },
        });
        return { success: true, result: photoSeal };
    }
    catch (error) {
        return { success: false, error: error };
    }
});
exports.getSeal = getSeal;
