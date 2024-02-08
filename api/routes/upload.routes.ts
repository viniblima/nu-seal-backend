import express, { Router, Request, Response } from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
const uploadRouter = Router();
import { photoController } from "../controllers";
import { getMulterConfig, validateJwt } from "../middlewares/index";

// const URL: string = path.basename("upload");

uploadRouter.post(
    "/",
    validateJwt,
    multer(getMulterConfig).array("file"),
    async (req: Request, res: Response) => {
        if (req.files) {
            // try {
            const token = req.headers.authorization!.replace("Bearer ", "");

            jwt.verify(token, process.env.JWT_KEY!, async (err: any, user: any) => {
                if (err) {
                    res.status(403).send({ message: err.message });
                    return;
                }
                const files: any = req.files;
                const listResults = [];
                for (let index = 0; index < files.length; index++) {
                    const element: any = files[index];

                    var indexBase = index;

                    if (req.body.sourceIndex) {
                        indexBase += req.body.sourceIndex;
                    }
                    const result = await photoController.create(
                        req.body.referenceId,
                        element.filename,
                        indexBase
                    );
                    listResults.push(result);
                }
                return res.status(200).send({ result: listResults, files: req.files });
            });
        } else {
            return res.status(409).send({
                response: `Não é um tipo de arquivo válido`,
            });
        }
    }
);

uploadRouter.get("/:id", validateJwt, express.static("upload"));

export default uploadRouter;