const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../modals/userModal");

const isVerifiedUser = async (req, res, next) => {
    try{
        // Check for token in cookies first, then in Authorization header
        let accessToken = req.cookies.accessToken;

        if (!accessToken) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                accessToken = authHeader.substring(7); // Remove 'Bearer ' prefix
            }
        }

        if(!accessToken){
            const error = createHttpError(401,"Please provide token!");
            return next(error);
        }
        const decodedToken = jwt.verify(accessToken, config.accessTokenSecret);
        const user = await User.findById(decodedToken.userId);
        if(!user){
            const error = createHttpError(401,"User not exist");
            return next(error);
        }
        req.user = user;
        next();

    }
    catch (error){
        const err = createHttpError (401,"invalid token!");
        return next(err);
    }
}

module.exports = { isVerifiedUser };
