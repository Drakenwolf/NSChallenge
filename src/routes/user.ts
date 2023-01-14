
import express, { Request, Response } from "express";
import { UserModel } from "../model/User";
import { User } from "../repo/User/User";
const router = express.Router();

const userModel = new UserModel() 

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

router.put("/:id", async (req: Request, res: Response) => {
  const {id} = req.params
  
  const response = await userModel.update(parseInt(id), req.body)

  res.send({
    response : response ?? null,
  })
});

router.delete("/:username", async (req: Request, res: Response) => {
  const {username} = req.params
  
  const response = await userModel.delete(username)

  res.send({
    response : response ?? null,
  })
});

module.exports = router;