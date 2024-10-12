import * as express from 'express';
import { visitorController } from '../Controllers/Visitor.controller';

const visitorRouter = express.Router();

visitorRouter.route('/getAllAgencies').get(
    (req,res)=> new visitorController().getAllAgencies(req,res)
)

export default visitorRouter;