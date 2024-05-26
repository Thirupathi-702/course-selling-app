
const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Courses'}]
});

const adminSchema=new mongoose.Schema({
    username:String,
    password:String
})

const courseSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    published:Boolean
});

const Users=mongoose.model('Users',UserSchema);
const Admins=mongoose.model('Admins',adminSchema)
const Courses=mongoose.model("Courses",courseSchema)


module.exports={
    Users,Admins,Courses
}