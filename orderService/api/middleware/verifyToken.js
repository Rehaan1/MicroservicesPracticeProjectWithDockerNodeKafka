const jwt = require('jsonwebtoken')

function auth(req,res,next)
{
    const token = req.header('auth-token')
    if(!token)
    {
        return res.status(200).json({
            status: 401,
            message: 'access denied'
        })
    }

    try
    {
        const verified = jwt.verify(token,  process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }
    catch(err)
    {
        return res.status(200).json({
            status: 400,
            message: 'invalid token'
        })
    }
}

module.exports = auth