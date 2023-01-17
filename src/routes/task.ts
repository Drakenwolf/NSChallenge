
import express, { Request, Response } from "express";
import { isAuth } from "../middlewares/auth";
import { UserService } from "../service/UserService";
import { Task } from "../repo/Task/Task";
const router = express.Router();

const userService = new UserService()
router.get("/", async (req: Request, res: Response) => {

  const response = await userService.readTask()
  res.send({
    response : response ?? null,
  })
});

router.get("/:id", async (req: Request, res: Response) => {
  const {id} = req.params
  const response = await userService.readTask(parseInt(id))
  res.send({
    response : response ?? null,
  })
});


router.post("/:username",isAuth, async (req: Request, res: Response) => {
    const {username} = req.params

    const {title, status, description} = req.body;
    const taskPayload = new Task()
    taskPayload.title = title;
    taskPayload.status = status;
    taskPayload.description = description;


    const response = await userService.createTask(username, taskPayload)


    res.send({
      response : response ?? null,
    })
});

router.put("/:id",isAuth, async (req: Request, res: Response) => {
  const {id} = req.params
  
  const response = await userService.updateTask(parseInt(id), req.body)

  res.send({
    response : response ?? null,
  })
});

router.delete("/:id",isAuth, async (req: Request, res: Response) => {
  const {id} = req.params
  
  const response = await userService.deleteTask(parseInt(id))

  res.send({
    response : response ?? null,
  })
});

module.exports = router;