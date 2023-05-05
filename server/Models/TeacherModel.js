import mongoose from "mongoose";

const teaherSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
    },
    dob:{
        type:Date,
    },
    degree:{
        type:String,
        require:true,
    }


})