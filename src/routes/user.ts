
import express, { Request, Response, NextFunction } from "express";
import { isAuth } from "../middlewares/auth";
import { UserModel } from "../model/User";
import { User } from "../repo/User/User";
import { login } from "../service/loginService";
import { logout } from "../service/logOutService";

const router = express.Router();

const userModel = new UserModel() 

router.get("/login", async (req: Request, res: Response) => {
  const response = await login(req.body)
  res.send({
    response : response ?? null,
  })
});

router.get("/logout/:username",isAuth, async (req: Request, res: Response) => {

  const response = await logout(req, res)
  res.send({
    response
  })
});


router.get("/", async (req: Request, res: Response) => {
  const response = await userModel.find()
  res.send({
    response : response ?? null,
  })
});

router.get("/:username", async (req: Request, res: Response) => {
  const {username} = req.params
  const response = await userModel.findOneByName(username)
  res.send({
    response : response ?? null,
  })
});


router.post("/", async (req: Request, res: Response) => {
    const {password, username, email} = req.body;
    const userPayload = new User()
    userPayload.password = password;
    userPayload.username = username;
    userPayload.email = email;

    const response = await userModel.create(userPayload)


    res.send({
      response : response ?? null,
    })
});

router.put("/:id",isAuth, async (req: Request, res: Response) => {
  const {id} = req.params
  
  const response = await userModel.update(parseInt(id), req.body)

  res.send({
    response : response ?? null,
  })
});

router.delete("/:id", isAuth, async (req: Request, res: Response) => {
  const {id} = req.params
  
  const response = await userModel.delete(parseInt(id))

  res.send({
    response : response ?? null,
  })
});


module.exports = router;