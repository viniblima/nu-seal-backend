import express, { Router, Request, Response } from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
const uploadRouter = Router();
import { fileController, photoController } from "../../controllers";
import { getMulterConfig, validateJwt } from "../../middlewares/index";
import bodyParser from "body-parser";

// const URL: string = path.basename("upload");
// uploadRouter.use(bodyParser.json());
// uploadRouter.use(bodyParser.urlencoded({ extended: true }));
uploadRouter.post(
  "/",
  // validateJwt,
  // multer(getMulterConfig).array("file"),
  multer().any(),
  async (req: Request, res: Response) => {
    console.log(req.files);
    const result = await fileController.create(req.files!);

    return res.status(200).send(result);
  }
);

uploadRouter.get("/:id", validateJwt, express.static("upload"));

export default uploadRouter;
