import { Router } from "express";
import uploadRouter from "./upload.routes";

const portalRouter = Router();

portalRouter.use("/upload", uploadRouter);

export default portalRouter;
