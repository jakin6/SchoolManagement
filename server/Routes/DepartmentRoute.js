import express from 'express'
import asyncHandler from 'express-async-handler'
import Statuscode from 'http-status-codes'
import Department from '../Models/DepartmentModel.js'

const departmentSchema=express.Router()

departmentSchema.post('/create',asyncHandler(async(req,res)=>{
    const department=await Department.create(req.body)
    res.status(201).json({department})
}))

departmentSchema.get('/',asyncHandler(async(req,res)=>{
    const department=await Department.find()
    res.status(Statuscode.OK).json({department,count:department.length});
}))

departmentSchema.get('/:id',asyncHandler(async(req,res)=>{
    const department=await Department.findById(req.params.id);
    if(!department){
        res.status(Statuscode.NOT_FOUND).json(`Not department with id ${id}`)
    }
    res.status(Statuscode.OK).json(department)
}))

departmentSchema.put('/:id',asyncHandler(async(req,res)=>{
    const department=await Department.findById(req.params.id);
    if (!department) {
        res.status(Statuscode.NOT_FOUND).json(`No department with id ${id}`)
    }else{
        department.name=req.body.name || department.name
        const updateDepartment=await department.save();
        res.status(Statuscode.OK).json(updateDepartment)

    }
}))

departmentSchema.delete('/:id',asyncHandler(async(req,res)=>{
    const department=await Department.findByIdAndRemove(req.params.id)
    if (department) {
        res.status(Statuscode.OK).send()
    } else {
        res.status(Statuscode.NOT_FOUND).json(`Not found department with id: ${id} `)
    }
}))

export default departmentSchema;