
import express, { Request, Response } from "express";
import { UserRepository } from "../repo/User";
import { User } from "../repo/User/User";
const router = express.Router();



router.get("/", async (req: Request, res: Response) => {
  const users = await UserRepository.find()
  console.log("test")
  res.send({
    users: users ?? null,
  })
});


router.post("/", async (req: Request, res: Response) => {
    const {user} = req.body;
    
});

module.exports = router;