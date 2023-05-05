import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const courseSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    credit:{
        type:Number,
        require:true,
    },
    vh:{
        type:Number,
        require:true,
    },
    faculity:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Faculity',
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
    }
},
{
    timestamps:true,
}

)
module.exports=mongoose.model('Course',courseSchema) 