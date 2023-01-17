
import express, { Request, Response } from "express";
import { isAuth } from "../middlewares/auth";
import { TaskModel } from "../model/Task";
import { UserModel } from "../model/User";
import { Task } from "../repo/Task/Task";
const router = express.Router();

const taskModel = new TaskModel() 
const userModel = new UserModel() 

router.get("/", async (req: Request, res: Response) => {

  const response = await taskModel.find()
  res.send({
    response : response ?? null,
  })
});

router.get("/:id", async (req: Request, res: Response) => {
  const {id} = req.params
  const response = await taskModel.findOneByName(parseInt(id))
  res.send({
    response : response ?? null,
  })
});


router.post("/:username",isAuth, async (req: Request, res: Response) => {
    const {username} = req.params
    const user = await userModel.findOneByName(username)

    const {title, status, description} = req.body;
    const taskPayload = new Task()
    taskPayload.title = title;
    taskPayload.status = status;
    taskPayload.description = description;
    taskPayload.user = user.id;

    const response = await taskModel.create(taskPayload)


    res.send({
      response : response ?? null,
    })
});

router.put("/:id",isAuth, async (req: Request, res: Response) => {
  const {id} = req.params
  
  const response = await taskModel.update(parseInt(id), req.body)

  res.send({
    response : response ?? null,
  })
});

router.delete("/:id",isAuth, async (req: Request, res: Response) => {
  const {id} = req.params
  
  const response = await taskModel.delete(parseInt(id))

  res.send({
    response : response ?? null,
  })
});

module.exports = router;