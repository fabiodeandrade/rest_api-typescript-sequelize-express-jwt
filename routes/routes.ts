import express from "express";
import LoginController from "../controllers/LoginController";
import UsersController from "../controllers/UsersController";
import { CheckAuth } from "../middlewares/Auth";

export const router = express.Router();

//Public routes
router.post("/login", LoginController.login);

//Private routes
router.get("/usuarios", CheckAuth, UsersController.findAll);
router.post("/usuarios",CheckAuth, UsersController.createUser);
router.get("/usuarios/:id", CheckAuth, UsersController.findOne);
router.put("/editarusuario/:id",CheckAuth, UsersController.updateUser);
router.delete("/delete/:id",CheckAuth, UsersController.deleteUser);

