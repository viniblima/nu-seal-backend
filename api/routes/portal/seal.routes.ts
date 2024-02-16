import { Router, Request, Response } from "express";
import { sealController } from "../../controllers";

const sealRouter = Router();

sealRouter.get("/count", async (req: Request, res: Response) => {
  const result = await sealController.count();

  if (result.success) {
    return res.status(200).send(result);
  } else {
    return res.status(400).send({ error: result.error });
  }
});

sealRouter.get("/:id", async (req: Request, res: Response) => {
  const result = await sealController.detail(req.params.id);

  if (result.success) {
    return res.status(200).send(result);
  } else {
    return res.status(400).send({ error: result.error });
  }
});

export default sealRouter;
