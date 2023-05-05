//passeword:irijakin$234
import express from 'express'
import dotenv  from 'dotenv'
import connectDatabase from './config/Mongodb.js'
import {notFound,errorHandler} from './Middleware/Error.js'
import userRouter from './Routes/UserRoutes.js'
import studentRoute from './Routes/StudentRoutes.js'
import classRoute from './Routes/ClassRoutes.js'
import departmentRoute from './Routes/DepartmentRoute.js' 
import faculityRoute from './Routes/FaculityRouter.js'
dotenv.config()

connectDatabase()

const app = express()
app.use(express.json())



app.use('/api/users',userRouter)
app.use('/api/students',studentRoute)
app.use('/api/class',classRoute)
app.use('/api/departments',departmentRoute)
app.use('/api/faculity',faculityRoute)
app.get('/',(req,res)=>{
    res.send('hello world')
})

const Port=process.env.PORT || 6000

app.use(notFound)
app.use(errorHandler)

app.listen(Port,()=>{
    console.log(`Server listen on  ${Port}`)
})