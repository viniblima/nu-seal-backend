"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMulterConfig = exports.storage = exports.fileFilter = void 0;
//Importaremos para realizar o Upload
const multer_1 = __importDefault(require("multer"));
//Ajudará no caminho para guardar nossa imagem
const path_1 = __importDefault(require("path"));
//Criara nossa pasta para armazenar nossos arquivos caso não exista
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
const URL = path_1.default.basename("upload");
const fileFilter = (req, file, cb) => {
    // if (!req.body.referenceId) {
    //   cb(null, false);
    // }
    const type = mime_1.default.extension(file.mimetype);
    const conditions = ["pdf"];
    if (conditions.includes(`${type}`)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.fileFilter = fileFilter;
const storage = () => multer_1.default.diskStorage({
    //Criar o destino do arquivo
    destination: (req, file, cb) => {
        if (!fs_1.default.existsSync(URL)) {
            fs_1.default.mkdirSync(URL);
        }
        cb(null, URL);
    },
    //Renomeia o arquivo
    filename: (req, file, cb) => {
        // file = new File();
        const type = mime_1.default.extension(file.mimetype);
        cb(null, `${new Date().getTime()}.${type}`);
        // cb(null, `teste.${type}`);
    },
});
exports.storage = storage;
exports.getMulterConfig = {
    storage: (0, exports.storage)(),
    fileFilter: exports.fileFilter,
    dest: URL,
};
exports.default = { getMulterConfig: exports.getMulterConfig };
