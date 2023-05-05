import express from "express";
import asyncHandler from 'express-async-handler'
import User from '../Models/UserModel.js'


const userRouter=express.Router()

//login
userRouter.post("/login",asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})

    if (user && (await user.matchPassword(password))){
       res.json({
        ...body
       }) 
    }else{
        res.status(401)
        throw new Error("Invalid Emailor Password")
    }
}))

//REGISTER
userRouter.post("/",
asyncHandler(async(req,res)=>{
    const {name,email,password,phone}=req.body
    const userExit=await User.findOne({email})

    if (userExit){
        res.status(400)
        throw new Error("User already exists!!!") 
    }
    const user=await User.create(
        {name,email,password,phone}
    )

    if (user) {
        res.status(201).json({
           _id:user._id,
           name:user.name,
           email:user.email,
           password:user.password,
           phone:user.phone,
           isAdmin:user.isAdmin,
           createdAt:user.createdAt 
        })
    } else {
        res.status(400)
        throw new Error
    }
}))
// Get all users API route
userRouter.get('/allUsers',asyncHandler(async (req, res) => {
    try {
    const users = await User.find();
    res.json(users);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    }));

//select one user
userRouter.get('/profile/:userId'
,asyncHandler(async(req,res)=>{
    const userId = req.params.userId;
    const user=await User.findById(userId)
    if (user){
        res.json({
           _id:user._id,
           name:user.name,
           email:user.email,
           phone:user.phone,
           isAdmin:user.isAdmin,
           createdAt:user.createdAt
        })
    } else{
        res.status(404)
        throw new Error("User not found")
    }
}))

//update a user
userRouter.put('/profile/:userId',asyncHandler(async(req,res)=>{
    const userId = req.params.userId;
    const user=await User.findById(userId)
    if (user) {
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        if (req.body.password) {
            user.password=req.body.password
        }
        user.phone=req.body.phone || user.phone

    const updateUser=await user.save()
    res.json({
        _id:updateUser._id,
        name:updateUser.name,
        email:updateUser.email,
        phone:updateUser.phone,
        isAdmin:updateUser.isAdmin,
    })
    }else{
        res.status(404)
        throw new Error("User not found") 
    }
}))

//delete user
userRouter.delete('/:id',asyncHandler(async(req,res)=>{
    const user=User.findByIdAndDelete(req.params.id)
    if(!user){
        res.status(404).json({error:'user not found'})
    }
    res.status(204)
}))
export default userRouter