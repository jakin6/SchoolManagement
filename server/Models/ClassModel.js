import mongoose from "mongoose";

const classSchema= mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
},
{
    timestamps:true,
})

const Class=mongoose.model('Class',classSchema)

export default Class