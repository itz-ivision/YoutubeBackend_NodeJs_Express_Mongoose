import jwt from 'jsonwebtoken';
import { asyncHandlerUsingPromise } from '../utils/asyncHandler.js';
import { ApiErrorHandler } from '../utils/ApiErrorHandler.js';
import { User } from '../models/user.models.js';


export const verifyJWT = asyncHandlerUsingPromise(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token) {
            throw new ApiErrorHandler(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )

        if(!user) {
            throw new ApiErrorHandler(401, "Invalid Access Token");
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiErrorHandler(401, error?.message || "Invalid access token")
    }
})