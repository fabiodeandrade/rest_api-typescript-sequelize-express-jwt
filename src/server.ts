import { router } from "./../routes/routes";
import { DataBaseConfig } from "./../database/DataBaseConfig";
import express from "express";

import * as dotenv from "dotenv";

dotenv.config();

export const server = express();
server.use(express.json());
server.use(router);

server.get("/", (req, res) => {
  return res.send("Seja bem vindo(a)");
});

server.listen(process.env.DEV_PORT, async () => {
  console.log(`Server running at ${process.env.DEV_PORT}`);
  try {
    await DataBaseConfig.sync();
    console.log("Connected in database");
  } catch (e) {
    console.log("Something wrong in:", e);
  }
});
