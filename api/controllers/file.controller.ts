import { Photo, Seal } from "../../db/models";
import path from "path";
import fs from "fs";
import mime from "mime";

import signpdf from "@signpdf/signpdf";
import { P12Signer } from "@signpdf/signer-p12";
import { plainAddPlaceholder } from "@signpdf/placeholder-plain";
import { PhotoType } from "../../db/enum";

const URL: string = path.basename("upload");

export const removeFile = async (id: string) => {
  try {
    fs.unlink(`${URL}/${id}`, (err) => {
      if (err) {
        return { success: false, error: err };
      }
    });
    fs.unlink(`${URL}/${id.replace(".pdf", "-signed.pdf")}`, (err) => {
      if (err) {
        return { success: false, error: err };
      }
    });
    return { success: true, msg: "Ok" };
  } catch (error) {
    return { success: false, error: error };
  }
};
export const create = async (files: any, idSeal: string) => {
  try {
    const listFiles = [];
    const dir = fs.existsSync(URL);

    console.log(dir);
    if (!fs.existsSync(URL)) {
      fs.mkdirSync(URL);
    }

    // const sealQuantity = await Seal.findAndCountAll();

    // for (let index = 0; index < files.length; index++) {
    var objResult: any = {};
    const file: any = files[0];
    const type = mime.extension(file.mimetype);
    const fileName: string = `${new Date().getTime()}.${type}`;
    const target_path = "./upload/" + fileName;

    fs.writeFileSync(target_path, file.buffer);

    const seal = await Seal.findOne({
      where: {
        id: idSeal,
      },
    });

    objResult.original = {
      fileName: fileName,
    };

    await Photo.create({
      referenceId: "",
      sealId: seal!.id,
      fileName: fileName,
    });

    const signer = new P12Signer(fs.readFileSync("./certs/cert.p12"), {
      passphrase: process.env.CERT_PASSWORD,
    });
    const pdfBuffer = fs.readFileSync(`./upload/${fileName}`);

    const pdfWithPlaceholder = plainAddPlaceholder({
      // pdfBuffer: file.buffer,
      pdfBuffer,
      reason: "The user is declaring consent.",
      contactInfo: "nuseal@email.com",
      name: "Teste",
      location: "Rua teste, 1234",
    });

    const signedPdf = await signpdf.sign(pdfWithPlaceholder, signer);

    const target_path_signed =
      "./upload/" + fileName.replace(".pdf", "-signed.pdf");

    fs.writeFileSync(target_path_signed, signedPdf);

    objResult.signed = {
      fileName: fileName.replace(".pdf", "-signed.pdf"),
    };

    await Photo.create({
      referenceId: "",
      sealId: seal!.id,
      fileName: fileName.replace(".pdf", "-signed.pdf"),
    });

    await Seal.update(
      {
        isValid: true,
      },
      {
        where: {
          id: idSeal,
        },
      }
    );

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
  } catch (e) {
    return { success: false, error: e };
  }
};

export const createSeal = async (files: any) => {
  try {
    const photoSeal = await Photo.findOne({
      where: {
        type: PhotoType.imgSeal,
      },
    });

    if (photoSeal) {
      fs.unlink(`${URL}/${photoSeal.dataValues.fileName}`, (err) => {
        if (err) {
          return { success: false, error: err };
        }
      });

      await Photo.destroy({
        where: {
          type: PhotoType.imgSeal,
        },
      });
    }
    const file: any = files[0];
    const type = mime.extension(file.mimetype);
    const fileName: string = `${new Date().getTime()}.${type}`;
    const target_path = "./upload/" + fileName;

    fs.writeFileSync(target_path, file.buffer);

    const result = await Photo.create({
      referenceId: "",
      sealId: "",
      fileName: fileName,
      type: PhotoType.imgSeal,
    });

    return { success: true, result };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getSeal = async () => {
  try {
    const photoSeal = await Photo.findOne({
      where: {
        type: PhotoType.imgSeal,
      },
    });
    return { success: true, result: photoSeal };
  } catch (error) {
    return { success: false, error: error };
  }
};
