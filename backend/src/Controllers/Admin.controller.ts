import * as express from 'express';
import User from '../Models/User';
import { uploadProfileImages } from '../server';
import Worker from '../Models/Worker';

export class adminController {

    getNewRequests = (req: express.Request, res: express.Response) => {

        User.find({ 'status': 'novi' }, (err, u) => {
            if (err) console.log(err);
            else res.json(u);
        })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {

        User.find({ 'type': { $in: ['klijent', 'agencija'] } }, (err, u) => {
            if (err) console.log(err);
            else res.json(u);
        })
    }

    getAllWorkersForAgency = (req: express.Request, res: express.Response) => {
        let agency = req.body.agency;

        Worker.find({ 'agency': agency }, (err, u) => {
            if (err) console.log(err);
            else res.json(u);
        })
    }

    getAllWorkersInSystem = (req: express.Request, res: express.Response) => {
        Worker.find({}, (err, u) => {
            if (err) console.log(err);
            else res.json(u);
        })
    }

    addWorker = (req: express.Request, res: express.Response) => {

        let worker = new Worker({
            'workerID': parseInt(req.body.workerID),
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'email': req.body.email,
            'phone': req.body.phone,
            'speciality': req.body.speciality,
            'agency': req.body.agency,
        })

        worker.save().then(succ => {
            res.status(200).json({ 'message': 'added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'not added' });
        })
    }

    deleteWorker = (req: express.Request, res: express.Response) => {
        let workerID = parseInt(req.body.workerID);

        Worker.deleteOne({ 'workerID': workerID }, (err) => {
            if (err) console.log(err);
            else res.json({ 'message': 'deleted' })
        })
    }

    
    reserveWorker = (req: express.Request, res: express.Response) => {
        let workerID = parseInt(req.body.workerID);
        let dateFrom = req.body.dateFrom;
        let dateTo = req.body.dateTo;
        let jobID = parseInt(req.body.jobID);

        Worker.collection.updateOne({'workerID':workerID},
              {$push:{reserved:{'datumOD':dateFrom,'datumDO':dateTo,'jobID':jobID}}},(err)=>{
                if(err) console.log(err);
                else res.json({'message':'added'})
              })
    }

    editWorker = (req: express.Request, res: express.Response) => {

        let workerID = parseInt(req.body.workerID);
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let phone = req.body.phone;
        let speciality = req.body.speciality;
        let agency = req.body.agency;

        Worker.collection.updateOne({ 'workerID': workerID },
            { $set: { firstname: firstname, lastname: lastname, email: email, phone: phone, speciality: speciality, agency: agency } },
            (err) => {
                if(err) console.log(err);
                else res.json({'message':'edited'});
            })
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.collection.updateOne({ 'username': username }, { $set: { status: 'aktivan' } }, (err) => {
            if (err) console.log(err);
            else res.json({ 'message': 'accepted' });
        })
    }

    rejectRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.collection.updateOne({ 'username': username }, { $set: { status: 'odbijen' } }, (err) => {
            if (err) console.log(err);
            else res.json({ 'message': 'rejected' });
        })
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.collection.deleteOne({ 'username': username }, (err) => {
            if (err) console.log(err);
            else res.json({ 'message': 'deleted' });
        })
    }

    editClient = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let email = req.body.email;
        let phone = req.body.phone;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;

        User.collection.updateOne({ 'username': username }, { $set: { email: email, phone: phone, firstname: firstname, lastname: lastname } }, (err) => {
            if (err) console.log(err);
            else res.json({ 'message': 'edited' });
        })
    }

    editAgency = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let agencyName = req.body.agencyName;
        let state = req.body.state;
        let city = req.body.city;
        let street = req.body.street;
        let streetNum = req.body.streetNum;
        let email = req.body.email;
        let phone = req.body.phone;
        let mb = req.body.mb;
        let description = req.body.description;

        User.collection.updateOne({ 'username': username },
            { $set: { agencyName: agencyName, state: state, city: city, street: street, streetNum: streetNum, email: email, phone: phone, mb: mb, description: description } }, (err) => {
                if (err) console.log(err);
                else res.json({ 'message': 'edited' });
            })
    }
}

