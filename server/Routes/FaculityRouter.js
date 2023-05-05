import express from 'express'
import asyncHandler from 'express-async-handler'
import Statuscode from 'http-status-codes'
import Faculity from '../Models/FaculityModel.js'

const faculitySchema=express.Router()

faculitySchema.post('/create',asyncHandler(async(req,res)=>{
    const faculity=await Faculity.create(req.body)
    res.status(201).json({faculity})
}))

faculitySchema.get('/',asyncHandler(async(req,res)=>{
    const faculity=await Faculity.find().populate('department')
    res.status(Statuscode.OK).json({faculity,count:faculity.length});
}))

faculitySchema.get('/:id',asyncHandler(async(req,res)=>{
    const faculity=await Faculity.findById(req.params.id).populate('department');
    if(!faculity){
        res.status(Statuscode.NOT_FOUND).json(`Not faculity with id ${id}`)
    }
    res.status(Statuscode.OK).json(faculity)
}))

faculitySchema.put('/:id',asyncHandler(async(req,res)=>{
    const faculity=await Faculity.findById(req.params.id).populate('department');
    if (!faculity) {
        res.status(Statuscode.NOT_FOUND).json(`No faculity with id ${id}`)
    }else{
        faculity.name=req.body.name || faculity.name
        const updatefaculity=await faculity.save();
        res.status(Statuscode.OK).json(updatefaculity)

    }
}))

faculitySchema.delete('/:id',asyncHandler(async(req,res)=>{
    const faculity=await Faculity.findByIdAndRemove(req.params.id).populate('department')
    if (faculity) {
        res.status(Statuscode.OK).send()
    } else {
        res.status(Statuscode.NOT_FOUND).json(`Not found faculity with id: ${req.params.id} `)
    }
}))

export default faculitySchema;