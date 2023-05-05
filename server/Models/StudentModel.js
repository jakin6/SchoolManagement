import mongoose from "mongoose";

const studentSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
    },
    dob:{
        type:Date,
    },
    age:{
        type:Number,
        require:true,
    },
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        require:true,
        
    }

})
const Student=mongoose.model('Student',studentSchema)

export default Student