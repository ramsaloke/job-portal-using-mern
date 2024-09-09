class ErrorHandler extends Error{
    constructor(message, statuscode){
        super(message);
        this.statuscode = statuscode
    }
}

export const errorMiddleware = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal server error";
    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message , 400)
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message , 400)
    }

    if(err.name === "JsonwebTokenError"){
        const message = `Json web token is invalid please try again`;
        err = new ErrorHandler(message , 400)
    }

    if(err.name === "TokenExpiredErrorr"){
        const message = `Json webToken is expired, login again`;
        err = new ErrorHandler(message , 400)
    }

    return res.status(err.statuscode).json({
        success: false,
        message: err.message,
    
    })

}

export default ErrorHandler