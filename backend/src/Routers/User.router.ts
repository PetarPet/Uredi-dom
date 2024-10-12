import * as express from 'express';
import { userController } from '../Controllers/User.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req,res) => new userController().login(req,res)
)

userRouter.route('/getUserByUsername').post(
    (req,res) => new userController().getUSerByUsername(req,res)
)

userRouter.route('/getUserByEmail').post(
    (req,res) => new userController().getUSerByEmail(req,res)
)

userRouter.route('/changePassword').post(
    (req,res) => new userController().changePassword(req,res)
)

userRouter.route('/getImg').post(
    (req, res) => new userController().getImg(req, res)
)

userRouter.route('/addComment').post(
    (req, res) => new userController().addComment(req, res)
)

export default userRouter;