import express, { Router, Request, Response } from "express";
import multer from "multer";
import { fileController } from "../../controllers";
import { validateJwt } from "../../middlewares/index";

const uploadRouter = Router();

uploadRouter.post(
  "/",
  // validateJwt,
  // multer(getMulterConfig).array("file"),
  multer().any(),
  async (req: Request, res: Response) => {
    const result = await fileController.create(req.files!);

    return res.status(200).send(result);
  }
);

uploadRouter.get("/:id", validateJwt, express.static("upload"));

export default uploadRouter;
