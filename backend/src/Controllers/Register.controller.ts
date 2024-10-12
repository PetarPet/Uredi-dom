import * as express from 'express';
import User from '../Models/User';
import { uploadProfileImages } from '../server';

export class registerController {

    addClient = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let phone = req.body.phone;
        let type = req.body.type;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;

        let user = new User({
            'username': username,
            'password': password,
            'email': email,
            'phone': phone,
            'type': type,
            'firstname': firstname,
            'lastname': lastname,
            'status': 'novi'
        })

        user.save().then((succ => {
            res.status(200).json({ 'message': 'added' });
        })).catch(err => {
            res.status(400).json({ 'message': 'not added' });
        })
    }

    addClientWithImage = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        uploadProfileImages(req, res, err => {
            console.log(req.file?.filename);
            if (err) console.log(err);
            else {
                let user = new User({
                    'username': req.body.username,
                    'password': req.body.password,
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,
                    'phone': req.body.phone,
                    'email': req.body.email,
                    'type': req.body.type,
                    'status': 'novi',
                    'profileImg': req.file?.filename
                });

                user.save().then(u => {
                    res.status(200).json({ 'message': 'added' });
                }).catch(err1 => {
                    res.status(400).json({ 'message': 'not added' });
                })
            }

        })
    }

    addAgency = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let phone = req.body.phone;
        let type = req.body.type;
        let agencyName = req.body.agencyName;
        let state = req.body.state;
        let city = req.body.city;
        let street = req.body.street;
        let streetNum = req.body.streetNum;
        let mb = req.body.mb;
        let description = req.body.description;

        let user = new User({
            'username': username,
            'password': password,
            'email': email,
            'phone': phone,
            'type': type,
            'agencyName': agencyName,
            'state': state,
            'city': city,
            'street': street,
            'streetNum': streetNum,
            'mb': mb,
            'description': description,
            'status': 'novi'
        })

        user.save().then((succ => {
            res.status(200).json({ 'message': 'added' });
        })).catch(err => {
            res.status(400).json({ 'message': 'not added' });
        })
    }

    addAgencyWithImage = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        uploadProfileImages(req, res, err => {
            console.log(req.file?.filename);
            if (err) console.log(err);
            else {
                let user = new User({
                    'username': req.body.username,
                    'password': req.body.password,
                    'phone': req.body.phone,
                    'email': req.body.email,
                    'agencyName': req.body.agencyName,
                    'state': req.body.state,
                    'city': req.body.city,
                    'street': req.body.street,
                    'streetNum': req.body.streetNum,
                    'mb': req.body.mb,
                    'description': req.body.description,
                    'type': req.body.type,
                    'status': 'novi',
                    'profileImg': req.file?.filename
                });

                user.save().then(u => {
                    res.status(200).json({ 'message': 'added' });
                }).catch(err1 => {
                    res.status(400).json({ 'message': 'not added' });
                })
            }

        })
    }
}