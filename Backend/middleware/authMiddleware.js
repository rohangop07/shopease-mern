import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try{
        //get token from request headers
        const token = req.headers.authorization;
    

    //check if token exists
    if (!token){
        return res.status(401).json({
            success : false,
            message : " No token provided",
        });
    }
        //verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //save user info in request 
        req.user = decoded;

        //move to next middleware/controller
        next();


    } catch (error){
 return res.status(401).json({
    success : false,
    message : "invalid token",
 });
    }
    };
