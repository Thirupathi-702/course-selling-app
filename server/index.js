const express=require("express")
const cors=require('cors');
const bodyParser=require("body-parser")
const mongoose=require('mongoose');
const adminRouter=require("./routes/admin")
const userRouter=require("./routes/user")
const app=express()


app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
  

app.use('/admin',adminRouter)
app.use('/users',userRouter)
app.get("/",(req,res)=>res.json({msg:"hello world"}));

//mongo connect

mongoose.connect('mongodb://localhost:27017',{dbName:"courses"})


function started(){
    console.log("server running on 3000 port")
}
app.listen(3000,started)