import UserModel from "../models/user.model.js"
export const adminAuth=async(req,res,next)=>{
     try {
       const  userId = req.userId

       const user = await UserModel.findById(userId)

       if(user.role !== 'Admin'){
            return res.status(400).json({
                message : "Permission denial For User",
                error : true,
                success : false
            })
       }

       next()

    } catch (error) {
        return res.status(500).json({
            message : "Permission denial",
            error : true,
            success : false
        })
    }
}