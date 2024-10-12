import * as express from 'express';
import MyObject from '../Models/MyObject';
import { ObjectId } from 'mongodb';

export class objectController {

    getAllObjectsForUser = (req: express.Request, res: express.Response) => {
        let owner = req.body.username;

        MyObject.find({ 'owner': owner }, (err, objects) => {
            if (err) console.log(err);
            else res.json(objects);
        })
    }

    getAllObjects = (req: express.Request, res: express.Response) => {
    
        MyObject.find({ }, (err, objects) => {
            if (err) console.log(err);
            else res.json(objects);
        })
    }

    getAllRequestsForAgency = (req:express.Request,res:express.Response) =>{
        let agency = req.body.agency;

        MyObject.find({jobs:{$elemMatch:{agency:agency,status:'zahtev'}}},(err,obj)=>{
            if(err) console.log(err);
            else res.json(obj);
        })
    }

    getAllActiveForAgency = (req:express.Request,res:express.Response) =>{
        let agency = req.body.agency;

        MyObject.find({jobs:{$elemMatch:{agency:agency,status:'aktivan'}}},(err,obj)=>{
            if(err) console.log(err);
            else res.json(obj);
        })
    }

    addNewObject = (req: express.Request, res: express.Response) => {
        let idO:number = parseInt(req.body.idO);

        MyObject.insertMany({
            'idO':idO,
            'owner': req.body.owner,
            'type': req.body.type,
            'area': req.body.area,
            'rooms': req.body.rooms,
            'state': req.body.state,
            'city': req.body.city,
            'street': req.body.street,
            'streetNum': req.body.streetNum,
            'sketch': req.body.sketch
        },(err)=>{
            if(err) console.log(err);
            else res.json({'message':'added'});
        })

        console.log("Prosao sam insert");
    }

    deleteObject = (req: express.Request, res: express.Response) => {
        let idO = parseInt(req.body.idO);

        MyObject.deleteOne({ 'idO': idO }, (err) => {
            if (err) console.log(err);
            else res.json({ 'message': 'deleted' });
        })
    }

    changeObject = (req: express.Request, res: express.Response) => {
        let my = req.body.my;
        let _id = new ObjectId(my._id);

        MyObject.collection.updateOne({ '_id': _id }, {
            $set: {
                owner: my.owner,
                area: my.area,
                rooms: my.rooms,
                type: my.type,
                state: my.state,
                city: my.city,
                street: my.street,
                streetNum: my.streetNum
            }
        }, (err) => {
            if (err) console.log(err);
            else res.json({ 'message': 'updated' });
        })
    }

    addJob = (req: express.Request, res: express.Response) => {
        let idO = parseInt(req.body.idO);
        let jobID = parseInt(req.body.jobID)
        let dateFrom = req.body.dateFrom;
        let dateTo = req.body.dateTo;
        let agency = req.body.agency;


        console.log("jobID:"+jobID);
        MyObject.collection.updateOne({ 'idO': idO },
            {
                $push: {
                    jobs:
                        { 'jobID': jobID, 'datumOD': dateFrom, 'datumDO': dateTo, 'status': 'zahtev', 'agency': agency,'odgovorAgencije':'Nije odgovorila','ponuda':"" }
                }
            }, (err) => {
                if (err) console.log(err);
                else res.json({ 'message': 'job added' });
            })
    }

    acceptJobByClient = (req:express.Request,res:express.Response) => {
        let idO = parseInt(req.body.idO);
        let jobID = parseInt(req.body.jobID);

        MyObject.collection.updateOne(
                        {'idO':idO},
                        {$set:{'jobs.$[element].status':'aktivan'}},
                        {arrayFilters:[{'element.jobID':{$eq:jobID}}]},(err)=>{
                            if(err) console.log(err);
                            else res.json({'message':'activated'});
                        })
    }

    rejectJobByClient = (req:express.Request, res:express.Response) =>{
        let idO = parseInt(req.body.idO);
        let jobID = parseInt(req.body.jobID);

        MyObject.collection.updateOne(
            {'idO':idO},
            {$pull:{jobs:{jobID:jobID}}},(err)=>{
                if(err) console.log(err);
                else res.json({'message':'deleted'});
            }
        )
    }

    rejectJobByAgency = (req:express.Request, res:express.Response) =>{
        let idO = parseInt(req.body.idO);
        let jobID = parseInt(req.body.jobID);

        MyObject.collection.updateOne(
                        {'idO':idO},
                        {$set:{'jobs.$[element].odgovorAgencije':'Odbila'}},
                        {arrayFilters:[{'element.jobID':{$eq:jobID}}]},(err)=>{
                            if(err) console.log(err);
                            else res.json({'message':'rejected'});
                        })
    }

    sendOffer = (req:express.Request, res:express.Response) =>{
        let idO = parseInt(req.body.idO);
        let jobID = parseInt(req.body.jobID);
        let offer = String(req.body.offer);

        MyObject.collection.updateOne(
                        {'idO':idO},
                        {$set:{'jobs.$[element].odgovorAgencije':'Prihvatila','jobs.$[element].ponuda':offer}},
                        {arrayFilters:[{'element.jobID':{$eq:jobID}}]},(err)=>{
                            if(err) console.log(err);
                            else res.json({'message':'offer sent'});
                        })
    }

    pay = (req:express.Request,res:express.Response) => {
        let idO = parseInt(req.body.idO);
        let jobID = parseInt(req.body.jobID);

        MyObject.collection.updateOne(
                        {'idO':idO},
                        {$set:{'jobs.$[element].status':'zavrsen'}},
                        {arrayFilters:[{'element.jobID':{$eq:jobID}}]},(err)=>{
                            if(err) console.log(err);
                            else res.json({'message':'paid'});
                        })
    }

    setStatusForRoom = (req:express.Request,res:express.Response) => {
        let idO = parseInt(req.body.idO);
        let name=req.body.name;
        let status = req.body.status;

        MyObject.collection.updateOne(
                        {'idO':idO},
                        {$set:{'sketch.$[element].status':status}},
                        {arrayFilters:[{'element.name':{$eq:name}}]},(err)=>{
                            if(err) console.log(err);
                            else res.json({'message':'status changed'});
                        })
    }
}