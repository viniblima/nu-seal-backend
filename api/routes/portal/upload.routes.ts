import express, { Router, Request, Response } from "express";
import multer from "multer";
import { fileController } from "../../controllers";
import { validateJwt } from "../../middlewares/index";

const uploadRouter = Router();

uploadRouter.post(
  "/seal",
  multer().any(),
  async (req: Request, res: Response) => {
    console.log(req.files);
    const result = await fileController.createSeal(req.files);

    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send({ error: result.error });
    }
  }
);

uploadRouter.get("/seal", async (req: Request, res: Response) => {
  const result = await fileController.getSeal();

  if (result.success) {
    return res.status(200).send(result);
  } else {
    return res.status(400).send({ error: result.error });
  }
});

uploadRouter.post(
  "/:id",
  // validateJwt,
  // multer(getMulterConfig).array("file"),
  multer().any(),
  async (req: Request, res: Response) => {
    const result = await fileController.create(req.files!, req.params.id);

    return res.status(200).send(result);
  }
);

uploadRouter.get("/:id", validateJwt, express.static("upload"));

uploadRouter.delete(
  "/:id",
  validateJwt,
  async (req: Request, res: Response) => {
    const result: any = await fileController.removeFile(req.params.id);

    return res.status(200).send(result);
  }
);

export default uploadRouter;
