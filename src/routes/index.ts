import { Router, Request, Response } from "express";
import user from "./user";

const routes = Router();

routes.use("/demo", (req: Request, res: Response) => {
  console.log("demo the router is connect!")
  return res.status(200).send("demo the router is connect!");
})
routes.use("/user",user);

export default routes;