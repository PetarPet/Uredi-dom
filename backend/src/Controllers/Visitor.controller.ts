import * as express from 'express';
import User from '../Models/User';

export class visitorController {
    
    getAllAgencies = (req:express.Request,res:express.Response) =>{
        User.find({'type':'agencija','status':'aktivan'},(err,agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        })
    }
}