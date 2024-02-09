//Importaremos para realizar o Upload
import multer from "multer";

//Ajudará no caminho para guardar nossa imagem
import path from "path";

//Criara nossa pasta para armazenar nossos arquivos caso não exista
import fs from "fs";
import mime from "mime";
import { Request } from "express";

const URL: string = path.basename("upload");

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // if (!req.body.referenceId) {
  //   cb(null, false);
  // }
  const type = mime.extension(file.mimetype);
  const conditions = ["pdf"];
  if (conditions.includes(`${type}`)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const storage = () =>
  multer.diskStorage({
    //Criar o destino do arquivo
    destination: (req, file, cb) => {
      if (!fs.existsSync(URL)) {
        fs.mkdirSync(URL);
      }
      cb(null, URL);
    },
    //Renomeia o arquivo
    filename: (req, file, cb) => {
      // file = new File();
      const type = mime.extension(file.mimetype);

      cb(null, `${new Date().getTime()}.${type}`);
      // cb(null, `teste.${type}`);
    },
  });

export const getMulterConfig: multer.Options = {
  storage: storage(),
  fileFilter: fileFilter,
  dest: URL,
};
export default { getMulterConfig };
