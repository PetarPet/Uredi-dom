import * as express from 'express';
import { adminController } from '../Controllers/Admin.controller';

const adminRouter = express.Router();

adminRouter.route('/getNewRequests').get(
    (req,res)=> new adminController().getNewRequests(req,res)
)

adminRouter.route('/getAllWorkersForAgency').post(
    (req,res)=> new adminController().getAllWorkersForAgency(req,res)
)

adminRouter.route('/getAllWorkersInSystem').get(
    (req,res)=> new adminController().getAllWorkersInSystem(req,res)
)

adminRouter.route('/addWorker').post(
    (req,res)=> new adminController().addWorker(req,res)
)

adminRouter.route('/deleteWorker').post(
    (req,res)=> new adminController().deleteWorker(req,res)
)

adminRouter.route('/editWorker').post(
    (req,res)=> new adminController().editWorker(req,res)
)

adminRouter.route('/reserveWorker').post(
    (req,res) => new adminController().reserveWorker(req,res)
)

adminRouter.route('/acceptRequest').post(
    (req,res)=> new adminController().acceptRequest(req,res)
)

adminRouter.route('/rejectRequest').post(
    (req,res)=> new adminController().rejectRequest(req,res)
)

adminRouter.route('/getAllUsers').get(
    (req,res)=> new adminController().getAllUsers(req,res)
)


adminRouter.route('/deleteUser').post(
    (req,res)=> new adminController().deleteUser(req,res)
)


adminRouter.route('/editClient').post(
    (req,res)=> new adminController().editClient(req,res)
)

adminRouter.route('/editAgency').post(
    (req,res)=> new adminController().editAgency(req,res)
)

export default adminRouter;