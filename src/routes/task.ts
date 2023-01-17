
import express, { Request, Response } from "express";
import { isAuth } from "../middlewares/auth";
import { UserService } from "../service/UserService";
import { Task } from "../repo/Task/Task";
const router = express.Router();

const userService = new UserService()
router.get("/", async (req: Request, res: Response) => {

        /**
 * @openapi
 * /task:
 *   get:
 *     tags:
 *        - get all tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns all tasks.
 */

  const response = await userService.readTask()
  res.send({
    response : response ?? null,
  })
});

router.get("/:id",isAuth,  async (req: Request, res: Response) => {
      /**
 * @openapi
 * /task:
 *   get:
 *     tags:
 *        - get a task
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns a task from a given user id.
 */
  const {id} = req.params
  const response = await userService.readTask(parseInt(id))
  res.send({
    response : response ?? null,
  })
});


router.post("/:username",isAuth, async (req: Request, res: Response) => {
        /**
 * @openapi
 * /task:
 *   post:
 *     tags:
 *        - create a task
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     application/json: 
 *        schema:
 *          title:
 *          type: string
 *        status:
 *          type: string
 *          enum: [in progress, done, pending]
 *        description:
 *          type: string
 *        user:
 *          type: integer
 *     responses:
 *       200:
 *         description: Returns a confirmation message.
 */
  
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
    /**
 * @openapi
 * /task:
 *   put:
 *     tags:
 *        - update a task
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     application/json: 
 *        schema:
 *          title:
 *          type: string
 *        status:
 *          type: string
 *          enum: [in progress, done, pending]
 *        description:
 *          type: string
 *        user:
 *          type: integer
 *     responses:
 *       200:
 *         description: Returns a confirmation message.
 */ 

  const {id} = req.params
  
  const response = await userService.updateTask(parseInt(id), req.body)

  res.send({
    response : response ?? null,
  })
});

router.delete("/:id",isAuth, async (req: Request, res: Response) => {


  /**
 * @openapi
 * /task:
 *   delete:
 *     tags:
 *        - Delete a task
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns a confirmation message.
 */ 
  const {id} = req.params
  
  const response = await userService.deleteTask(parseInt(id))

  res.send({
    response : response ?? null,
  })
});

  /**
   * @openapi
   * components:
   *  schemas:
   *    Task:
   *      properties:
   *        id:
   *          type: integer
   *        title:
   *          type: string
   *        status:
   *          type: string
   *          enum: [in progress, done, pending]
   *        description:
   *          type: string
   *        user:
   *          type: integer
   *  securitySchemes:
   *    bearerAuth:          
   *    type: http
   *    scheme: bearer
   *    bearerFormat: JWT   
   *  security:
   *    - bearerAuth: []   
   */

module.exports = router;