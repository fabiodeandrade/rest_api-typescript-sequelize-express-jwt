import { Request, Response } from "express";
import { Model } from "sequelize";
import { UserModel } from "../database/models/UserModel";

let cache: Model<any, any>[][] = [];
let cacheTime = 0;

class UsersController {
  async findAll(req: Request, res: Response) {
    let now = new Date().getTime();

    try {
      if (cache.length > 0 && cacheTime + 5000 > now) {
        return res.status(200).json(cache);
      } else {
        const users = await UserModel.findAll();
        console.log("Getting from BD")

        cacheTime = new Date().getTime();
        cache.push(users);

        return res.status(200).json(users);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await UserModel.findOne({
        where: {
          id: id,
        },
      });
      return res.status(200).json(data);
    } catch (e) {
      console.log("Algo deu errado", e);
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await UserModel.create({
        name,
        email,
        password,
      });

      return res.status(200).json({ msg: "Usuário criado com sucesso" });
    } catch (e) {
      console.log(e);
      return res.status(401).json({ msg: "Algo deu errado, tenta novamente" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await UserModel.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ msg: "Usuario deletado" });
    } catch (e) {
      console.log(e);
      return res.status(401).json({ msg: "Algo deu errado, tenta novamente" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const data = await UserModel.update(req.body, {
        where: {
          id: id,
        },
      });
      return res.status(200).json({ msg: "Usuario editado com sucesso" });
    } catch (e) {
      console.log(e);
      return res.status(401).json({ msg: "Algo deu errado, tenta novamente" });
    }
  }
}

export default new UsersController();
