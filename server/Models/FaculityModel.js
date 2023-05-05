import mongoose from "mongoose";

const faculitySchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department'
    }
})
const Faculity=mongoose.model('Faculity',faculitySchema)
export default Faculity