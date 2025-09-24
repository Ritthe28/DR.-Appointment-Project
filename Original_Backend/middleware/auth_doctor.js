import JWT from "jsonwebtoken"


///////////////// Doctor Authwentication middleware 

const authdoctor = async(req,res,nest)=>{
    console.log (req.body)

    try {
            const {dtoken}=  req.headers;
            // console.log(token);
            
            if (!dtoken){
                return res.json({success : false , message :"Not Autjorized login again"})
            }
            const token_decode = JWT.verify(dtoken,process.env.JWT_SECRET) 
            req.body.docid = token_decode.id
           console.log(req.body.userid);
            

              nest()

         }catch (error){
            res.json ({success:false , message:error.message})
         }
}
export default authdoctor;