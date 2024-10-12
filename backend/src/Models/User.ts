import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username:{
        type:String
    },
    password:{
       type:String
    },
    firstname: {
        type:String
    },
    lastname: {
        type:String
    },
    phone: {
        type:String
    },
    email: {
        type:String
    },
    status: {
        type:String
    },
    profileImg: {
        type:String
    },
    type: {
        type:String
    },
    agencyName: {
        type:String
    },
    state: {
        type:String
    },
    city: {
        type:String
    },
    street: {
        type:String
    },
    streetNum: {
        type:String
    },
    mb: {
        type:String
    },
    description: {
        type:String
    },
    comments:{
        type:Array
    }
})

export default mongoose.model("User",User,'users');