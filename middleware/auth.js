const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({message:"The token wasn't forneced, auth denied"})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.userId; 
        next()
    }catch(error){
        res.status(401).json({message:'Invalid token'})
    }
}

module.exports = auth
