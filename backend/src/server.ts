import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import multer from 'multer';
import userRouter from './Routers/User.router';
import registerRouter from './Routers/Register.router';
import visitorRouter from './Routers/Visitor.router';
import objectRouter from './Routers/Object.router';
import adminRouter from './Routers/Admin.router';
const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/piaprojekat');
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Db connection ok");
})

const router = express.Router();

const userUpload = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploadsProfileImages')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})});

export var uploadProfileImages = userUpload.single('profileImg');

app.use(express.json({ limit: '10MB' }));
app.use('/',router);
router.use('/user',userRouter);
router.use('/register',registerRouter);
router.use('/visitor',visitorRouter);
router.use('/object',objectRouter);
router.use('/admin',adminRouter);

app.listen(4000, () => console.log(`Express server running on port 4000`));