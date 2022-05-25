import { handleHttpError } from "../utils/handleError.js"
import { verifyToken } from "../utils/handleJwt.js";

const authMiddleware = async (req,res,next) => {
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "ERROR_NOT_TOKEN", 401)
            return
        }

        const token = req.headers.authorization.replace("Bearer ", "");


        const dataToken = await verifyToken(token);

        if(!dataToken._id){
            handleHttpError(res, "ERROR_TOKEN_ID", 401)
            return
        }

        next();
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_NOT_SESSION", 401)
    }
}

export {authMiddleware}