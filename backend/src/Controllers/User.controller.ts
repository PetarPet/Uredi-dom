import * as express from 'express';
import User from '../Models/User';
import path from 'path';

export class userController {

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ 'username': username, 'password': password}, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }

    getUSerByUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({ 'username': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }

    getUSerByEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email;

        User.findOne({ 'email': email }, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.updateOne({ 'username': username }, { $set: { password: password } }, (err) => {
            if (err) console.log(err);
            else res.json({ 'message': 'changed' });
        })
    }

    getImg = (req: express.Request, res: express.Response) => {

        let imgPath = path.join(__dirname, '../../uploadsProfileImages') + '/' + req.body.imageName;
        res.sendFile(imgPath);
    }

    addComment = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let commentText = req.body.myComment.commentText;
        let jobID = parseInt(req.body.myComment.jobID);
        let grade = parseInt(req.body.myComment.grade);
        let client = req.body.myComment.client;

        User.collection.updateOne({ 'username': username },
            { $push: { comments: { 'commentText': commentText,'jobID': jobID, 'grade':grade,'client':client} } }, (err) => {
                if(err) console.log(err);
                else res.json({'message':'comment added'});
            })
    }

}

