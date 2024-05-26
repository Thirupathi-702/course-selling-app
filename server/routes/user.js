const express=require("express")
const jwt=require("jsonwebtoken")
const {authenticateJwt,secretKey} =require("../middleware/auth")
const {Users , Admins , Courses}=require("../db")
const router=express.Router();
router.post('/signup',async(req,res)=>{
    const {username,password}=req.body
    const existingUser=await Users.findOne({username});
    if(existingUser){
        res.status(403).json({message:"user alreadt exists"})
    }
    else{
        const newUser=new Users({username,password})
        newUser.save();
    const token=jwt.sign({username,role:"user"},secretKey,{expiresIn:'1h'})
    res.json({message:"User Created Successfully",token})
}
})
 
router.post('/login',async(req,res)=>{
    const {username,password}=req.headers
    const user=await Users.findOne({username,password});
    if(user){
        const token=jwt.sign({username,role:"user"},secretKey,{expiresIn:'1h'})
        res.json({message:"user Logged in successfuly",token})
    }
    else{
        res.status(403).json({message:"user authentication failed"})
    }
})

router.get('/courses',authenticateJwt,async(req,res)=>{
    const courses=await Courses.find({published:true});
    res.json({courses})
})

router.post('/courses/:courseId',authenticateJwt,async(req,res)=>{
    const course=await Courses.findById(req.params.courseId);
    if(course){
        const user=await Users.findOne({username:req.user.username});
        if(user){
            user.purchasedCourses.push(course);
            await user.save()
            res.json({message:"course purchased successfully"})
            }
        else{
            res.json({message:"user not found"})
        }
    }
    else{
        res.status(404).json({message:"course not found or not available"})
    }

})

router.get('/purchasedCourses',authenticateJwt,async(req,res)=>{
   const user=await Users.findOne({username:req.user.username}).populate('purchasedCourses')
   if(user){
    res.json({purchasedCourses:user.purchasedCourses|| []})
   }
   else{
    res.status(404).json({message:"user not found"})
   }
});

module.exports=router