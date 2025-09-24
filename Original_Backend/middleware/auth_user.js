import JWT from "jsonwebtoken"


///////////////// admin Authwentication middleware 

const authuser = async(req,res,nest)=>{
    console.log (req.body)

    try {
            const {token}=  req.headers;
            // console.log(token);
            
            if (!token){
                return res.json({success : false , message :"Not Autjorized login again"})
            }
            const token_decode = JWT.verify(token,process.env.JWT_SECRET) 
            req.body.userid = token_decode.id
           console.log(req.body.userid);
            

              nest()

         }catch (error){
            res.json ({success:false , message:error.message})
         }
}
export default authuser