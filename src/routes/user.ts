
import express, { Request, Response, NextFunction } from "express";
import { isAuth } from "../middlewares/auth";
import { User } from "../repo/User/User";
import { UserService } from "../service/UserService";
const router = express.Router();

const userService = new UserService() 

router.get("/login", async (req: Request, res: Response) => {


  /**
   * @openapi
   * /user/login:
   *  get:
   *    tags:
   *        - Login
   *    description: Allows to login user with username and password
   *    requestBody:
   *        required: true
   *        content:
   *           application/json: 
   *              schema:
   *                 $ref: '#/components/schemas/User'
   */

  const response =  await userService.login(req.body)
  res.send({
    response : response ?? null,
  })
});

router.get("/logout/:username",isAuth,  (req: Request, res: Response) => {

  /**
 * @openapi
 * /user/logout/:{username}:
 *   get:
 *     tags:
 *        - Logout
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to return.
 *         schema:
 *           type: integer
 *           format: int64
 *           minimum: 1 
 *     responses:
 *       200:
 *         description: Returns a confirmation message.
 */         

  const response =  userService.logout(req.body.username, res.locals.token)
  res.send({
    response
  })
});


router.get("/", async (req: Request, res: Response) => {
    /**
 * @openapi
 * /user/logout/:{username}:
 *   get:
 *     tags:
 *        - Get all users
 *     responses:
 *       200:
 *         description: Returns all users.
 */         


  const response = await userService.read()
  res.send({
    response : response ?? null,
  })
});

router.get("/:username", async (req: Request, res: Response) => {

    /**
 * @openapi
 * /user/logout/:{username}:
 *   get:
 *     tags:
 *        - Get a user by username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns a confirmation message.
 */ 
  const {username} = req.params
  const response = await userService.read(username)
  res.send({
    response : response ?? null,
  })
});


router.post("/", async (req: Request, res: Response) => {

  /**
 * @openapi
 * /user:
 *   post:
 *     tags:
 *        - Create a user
 *     application/json: 
 *        schema:
 *         $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Returns a confirmation message.
 */ 


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


  /**
 * @openapi
 * /user:
 *   put:
 *     tags:
 *        - Update a user
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     application/json: 
 *        schema:
 *         $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Returns a confirmation message.
 */ 

  const {id} = req.params
  
  const response = await userService.update(parseInt(id), req.body)

  res.send({
    response : response ?? null,
  })
});

router.delete("/:id", isAuth, async (req: Request, res: Response) => {


  /**
 * @openapi
 * /user:
 *   delete:
 *     tags:
 *        - Delete a user
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     application/json: 
 *        schema:
 *         $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Returns a confirmation message.
 */ 
  const {id} = req.params
  
  const response = await userService.delete(parseInt(id))

  res.send({
    response : response ?? null,
  })
});

  /**
   * @openapi
   * components:
   *  schemas:
   *    User:
   *      properties:
   *        id:
   *          type: integer
   *        username:
   *          type: string
   *        email:
   *          type: string
   *        password:
   *          type: string
   *        tokens:
   *          type: string[]
   *  securitySchemes:
   *    bearerAuth:          
   *    type: http
   *    scheme: bearer
   *    bearerFormat: JWT   
   *  security:
   *    - bearerAuth: []   
   */

module.exports = router;


