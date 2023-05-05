import mongoose from "mongoose";
import express from "express";
import asyncHandler from "express-async-handler";
import Student from "../Models/StudentModel.js";
import StatusCode from 'http-status-codes'
const studentRoute=express.Router()

//Create Student
studentRoute.post('/create' ,asyncHandler(async(req , res)=>{
    // req.body.classId=req.classes.classId
    const {firstName,lastName,gender,dob,age,classId}=req.body
   const student =await Student.create(
    req.body
   )
   if(student){
    res.status(201).json({
        _id:student._id,
        firstName:student.firstName,
        lastName:student.lastName,
        gender:student.gender,
        dob:student.dob,
        age:student.age,
        classId:student.classId,
    })
   }
// res.status(StatusCode.CREATED).json({student})
}))


//Get all student
studentRoute.get('/',asyncHandler(async(req,res)=>{
    try {
        const students=await Student.find().populate('classId');
        res.json({students,count:students.length})
    } catch (error) {
        console.log(error)
    }
}))

//Get Single Student
studentRoute.get('/:id' ,asyncHandler(async(req , res)=>{
    const student=await Student.findById(req.params.id).populate('classId');
    if (student) {
        res.json(student)
    }else{
        res.status(404)
        throw new Error('Student not found')
    }
}))

//Update a Student
studentRoute.put('/:id' ,asyncHandler(async(req , res)=>{
    const student=await Student.findById(req.params.id)
    if (student) {
        student.firstName=req.body.firstName || student.firstName
        student.lastName=req.body.lastName || student.lastName
        student.gender=req.body.gender || student.gender
        student.dob=req.body.dob || student.dob
        student.age=req.body.age || student.age
        student.classId=req.body.classId || student.classId

        const updateStudent=await student.save()
        res.json(updateStudent)
    }else{
        res.status(404)
        throw new Error('Student not found')
    }
}))

studentRoute.delete('/:id',asyncHandler(async(req,res)=>{
    const student=Student.findByIdAndRemove(req.params.id).populate('classId')
    if (student) {
        res.status(204)
    }else{
        res.status(404).json({error:'Student not found'})
    }
    
}))


export default studentRoute