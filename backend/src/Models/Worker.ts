import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Worker = new Schema({
    workerID:{
        type:Number
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    speciality:{
        type:String
    },
    agency:{
        type:String
    },
    reserved:{
        type:Array
    }
})

export default mongoose.model("Worker",Worker,'workers');