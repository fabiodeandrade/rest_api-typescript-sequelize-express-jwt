import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const CheckAuth = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers["authorization"];
  const token = authToken && authToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Usuario não autorizado" });
  }

  try {
    const secret = process.env.SECRET || "IkUjYhNbMn%$3@";
    jwt.verify(token, secret);
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ msg: "Usuario não autorizado" });
  }
};
