const jwt=require('jsonwebtoken')
const secretKey="SECRET"
const generateJwt=(user)=>{
    const payload={username:user.username}
    return jwt.sign(payload,secretKey,{expiresIn:'1h'})
}

const authenticateJwt=(req,res,next)=>{
    const authHeader=req.headers.authorization;

   console.log(authHeader)
    if (authHeader){
        const token=authHeader.split(' ')[1];
        jwt.verify(token,secretKey,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            req.user=user;
            next();
        })
    }
    else{
        res.sendStatus(401);
    }

}
module.exports={
    authenticateJwt,

    secretKey
}

