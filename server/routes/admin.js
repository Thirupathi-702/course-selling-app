const express=require("express")
const jwt=require("jsonwebtoken")
const {authenticateJwt,secretKey}=require("../middleware/auth")
const {Users , Courses ,Admins}=require("../db")

const router=express.Router();

router.post('/signup',async (req,res)=>{
    const{username,password}=req.body
    var exist=await Admins.findOne({username});
    if (exist){
        res.status(403).json({message:"admin already exist"})
    }
    else{
    const obj={username:username,password:password}
    const newAdmin=new Admins(obj);
    await newAdmin.save(); 
    const token=jwt.sign({username,role:"admin"},secretKey,{expiresIn:'1h'})
    res.json({message:"signup success",token})
    } 
})
router.post('/signin', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admins.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, secretKey, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });



router.get("/me", authenticateJwt, async (req, res) => {
    const admin = await Admins.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
});
router.get('/course/:courseid',authenticateJwt,async(req,res)=>{
    const courseid=req.params.courseid
    const course=await Courses.findById(req.params.courseid)
    
    res.json({course:course})
})
router.post("/courses",authenticateJwt,async(req,res)=>{
    const course=new Courses(req.body);
    await course.save();
    res.json({message:"Course created successfully",courseId:course.id});
})

router.put("/courses/:courseId",authenticateJwt,async(req,res)=>{

    const course=await Courses.findByIdAndUpdate(req.params.courseId,req.body,{new:true});

    if(course){
        
        res.json({message:"Course updated Successfully"})

    }
    else{
        res.status(404).json({message:"Course not fonud"})
    }
});

router.get("/courses",authenticateJwt,async(req,res)=>{
    // res.send(Courses)
    const courses=await Courses.find({})
    res.json({courses:courses})
})

module.exports=router