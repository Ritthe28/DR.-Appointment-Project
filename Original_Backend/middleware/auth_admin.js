import JWT from "jsonwebtoken"


///////////////// admin Authwentication middleware 

const authadmin = async(req,res,nest)=>{
    console.log("hello world ")
         try {
            const {atoken}=  req.headers;
            if (!atoken){
                return res.json({success : false , message :"Not Autjorized login again"})
            }
            const token_decode = JWT.verify(atoken,process.env.JWT_SECRET) 
            if(token_decode!==process.env.ADMIN_EMAIL  +process.env.ADMIN_PASSWORD){
                return res.json({success : false , message :"Not Autjorized login again"})
            }

              nest()

         }catch (error){
            res.json ({success:false , message:error.message})
         }
}
export default authadmin