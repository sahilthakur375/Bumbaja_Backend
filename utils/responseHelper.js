export const sendSuccessMessage =(res,req,code , message , data={})=>{
    res.status(code).json({
        status: true,
        code: code,
        message:req.t(message),
        data: data,
    })    
}
export const senderrorMessage =(res,req,code , message )=>{
    res.status(code).json({
        status: false,
        code: code,
        error:req.t(message),
    })    
}
