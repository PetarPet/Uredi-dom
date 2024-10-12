import mongoose from "mongoose";

const Schema = mongoose.Schema;

let MyObject = new Schema({
     idO:{
          type:Number
     },
    owner: { 
        type: String 
    },
    type:{
     type:String
    },
    area:{ 
        type: String 
    },
    rooms: {
         type: String 
    },
    state: {
         type: String 
    },
    city: { 
        type: String 
    },
    street: {
         type: String 
    },
    streetNum: {
         type: String 
    },
    sketch: {
         type: Array 
    },
    jobs:{
     type:Array
    }
})

export default mongoose.model("MyObject",MyObject,"objects")