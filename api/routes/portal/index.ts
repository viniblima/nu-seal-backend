import { Router } from "express";
import uploadRouter from "./upload.routes";
import sealRouter from "./seal.routes";

const portalRouter = Router();

portalRouter.use("/upload", uploadRouter);
portalRouter.use("/seal", sealRouter);

export default portalRouter;
