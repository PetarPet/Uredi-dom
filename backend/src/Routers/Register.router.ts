import * as express from 'express';
import { registerController } from '../Controllers/Register.controller';

const registerRouter = express.Router();

registerRouter.route('/addClient').post(
    (req,res)=> new registerController().addClient(req,res)
)

registerRouter.route('/addClientWithImage').post(
    (req,res)=> new registerController().addClientWithImage(req,res)
)

registerRouter.route('/addAgency').post(
    (req,res)=> new registerController().addAgency(req,res)
)

registerRouter.route('/addAgencyWithImage').post(
    (req,res)=> new registerController().addAgencyWithImage(req,res)
)

export default registerRouter;