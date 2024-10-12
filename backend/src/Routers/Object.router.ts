import * as express from 'express';
import { objectController } from '../Controllers/Object.controller';

const objectRouter = express.Router();

objectRouter.route('/getAllObjectsForUser').post(
    (req,res)=> new objectController().getAllObjectsForUser(req,res)
)

objectRouter.route('/getAllObjects').get(
    (req,res)=> new objectController().getAllObjects(req,res)
)

objectRouter.route('/getAllRequestsForAgency').post(
    (req,res)=> new objectController().getAllRequestsForAgency(req,res)
)

objectRouter.route('/getAllActiveForAgency').post(
    (req,res)=> new objectController().getAllActiveForAgency(req,res)
)

objectRouter.route('/addNewObject').post(
    (req,res)=> new objectController().addNewObject(req,res)
)

objectRouter.route('/deleteObject').post(
    (req,res)=> new objectController().deleteObject(req,res)
)

objectRouter.route('/changeObject').post(
    (req,res)=>new objectController().changeObject(req,res)
)

objectRouter.route('/addJob').post(
    (req,res)=>new objectController().addJob(req,res)
)

objectRouter.route('/acceptJobByClient').post(
    (req,res)=>new objectController().acceptJobByClient(req,res)
)

objectRouter.route('/rejectJobByClient').post(
    (req,res)=>new objectController().rejectJobByClient(req,res)
)

objectRouter.route('/rejectJobByAgency').post(
    (req,res)=>new objectController().rejectJobByAgency(req,res)
)

objectRouter.route('/sendOffer').post(
    (req,res)=>new objectController().sendOffer(req,res)
)
objectRouter.route('/pay').post(
    (req,res)=>new objectController().pay(req,res)
)

objectRouter.route('/setStatusForRoom').post(
    (req,res)=>new objectController().setStatusForRoom(req,res)
)

export default objectRouter;