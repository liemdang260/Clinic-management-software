const {decryptAccessToken} = require('./authentication.methods')
exports.isAuth = async(req,res,next)=>{
    let access_token = req.headers.access_token
    if(!access_token){
        return res.status(401).send('Khong tim thay access token!')
    }
    let verify = await decryptAccessToken(access_token)
    if(!verify){
        res.status(401).send('Ban khong co quyen truy cap vao tinh nang nay!')
    }
    let payload = verify.payload
    req.userInfo = payload
    return next()
}