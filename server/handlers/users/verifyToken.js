const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const verifyToken = (req, res, next) =>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({
            status: 401,
            message: "Access denied. No token provided."
        })
    }
    jwt.verify(token, JWT_SECRET, (error, user) => {
        if(error){
            return res.status(403).json({
                status: 403,
                message: "Invalid or expired token."
            })
        }
        req.user = user
        next()
    })
}

module.exports = verifyToken