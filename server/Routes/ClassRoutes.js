import express from "express";
import asyncHandler from 'express-async-handler'
import Class from "../Models/ClassModel.js";
const classeRouter=express.Router()

//create a class
classeRouter.post('/create',asyncHandler(async(req,res)=>{
    const {name}=req.body
    // const existClass=Class.findOne({name})
    // console.log(existClass)
    // if(existClass){
    //     res.status(400)
    //     throw new Error("Class already exist")
    // }

    const classes=await Class.create({
        name
    })
    if (classes) {
        res.json(classes)
    } else {
       res.status(400)
       throw new Error 
    }
}))
//get all classes
classeRouter.get('/',asyncHandler(async(req,res)=>{
    try {
        const classes= await Class.find()
        res.json(classes)
    } catch (error) {
        console.log(error)
    }
    
})) 

//get single class
classeRouter.get('/:id',asyncHandler(async(req,res)=>{
    const classes=await Class.findById(req.params.id)
    if(classes){
        res.json(classes)
    }else{
        res.status(404)
        throw new Error('Class not found')
    }
}))

//update a class
classeRouter.put('/update/:id',asyncHandler(async(req,res)=>{
    const classes=await Class.findById(req.params.id)
    if (classes) {
        classes.name=req.body.name || classes.name
        const updateClass=await classes.save()
        res.json(updateClass)
    } else {
        res.status(404)
        throw new Error('Class not found')
    }
}))

export default classeRouter