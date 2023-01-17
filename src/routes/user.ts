
import express, { Request, Response, NextFunction } from "express";
import { isAuth } from "../middlewares/auth";
import { User } from "../repo/User/User";
import { UserService } from "../service/UserService";
const router = express.Router();

const userService = new UserService() 

router.get("/login",  (req: Request, res: Response) => {
  const response =  userService.login(req.body)
  res.send({
    response : response ?? null,
  })
});

router.get("/logout/:username",isAuth,  (req: Request, res: Response) => {

  const response =  userService.logout(req.body.username, res.locals.token)
  res.send({
    response
  })
});


router.get("/", async (req: Request, res: Response) => {
  const response = await userService.read()
  res.send({
    response : response ?? null,
  })
});

router.get("/:username", async (req: Request, res: Response) => {
  const {username} = req.params
  const response = await userService.read(username)
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

    const response = await userService.create(userPayload)


    res.send({
      response : response ?? null,
    })
});

router.put("/:id",isAuth, async (req: Request, res: Response) => {
  const {id} = req.params
  
  const response = await userService.update(parseInt(id), req.body)

  res.send({
    response : response ?? null,
  })
});

router.delete("/:id", isAuth, async (req: Request, res: Response) => {
  const {id} = req.params
  
  const response = await userService.delete(parseInt(id))

  res.send({
    response : response ?? null,
  })
});


module.exports = router;