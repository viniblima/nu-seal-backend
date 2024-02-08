import { Router } from "express";
import portalRouter from "./portal";

const router = Router();

router.use("/portal", portalRouter);

export default router;
