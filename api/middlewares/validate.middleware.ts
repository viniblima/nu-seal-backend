import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
  return;
  if (!req.headers.authorization) {
    res.status(403).send({
      message: "No auth was sended",
    });
  }

  const token = req.headers.authorization!.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_KEY!, (err, user) => {
    if (err) {
      res.status(403).send({ message: err.message });
      return;
    }
    req.body.user = user;
    next();
  });
};

export const validateFields = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result: any = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      next();
    }
  };
};
