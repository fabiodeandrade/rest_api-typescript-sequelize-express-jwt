import { Request, Response } from "express";
import { UserModel } from "../database/models/UserModel";
import jwt from "jsonwebtoken";

class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const secret = process.env.SECRET || "IkUjYhNbMn%$3@";
      const token = jwt.sign(
        {
          email: email,
        },
        secret
      );

      const data = await UserModel.findOne({
        where: { email: email, password: password },
      });

      if (data) {
        return res.status(200).json({ msg: "Usuario logado", token });
      } else {
        return res
          .status(400)
          .json({ msg: "Dados inválidos, por favor tente novamente" });
      }
    } catch (e) {
      console.log("Algo deu errado", e);
    }
  }
}

export default new LoginController();
