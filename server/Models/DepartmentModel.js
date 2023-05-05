import mongoose from "mongoose";

const departmentSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    numberOfFac:{
        type:String,
        require:true,
    }
},
{
    timestamps:true,
}) 

const Department=mongoose.model('Department',departmentSchema);

export default Department