import  jwt  from 'jsonwebtoken'

const JWT_SECRET = `${process.env.JWT_SECRET}`;


const tokenSign = async (user) => {

    const sign = await jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );
    

    return sign
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch(e) {
        return null
    }
}

export {tokenSign, verifyToken}