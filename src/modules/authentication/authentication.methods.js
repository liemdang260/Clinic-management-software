const md5 = require('md5')
const jwt = require('jsonwebtoken')

const enCryptPassword = (pass) => {
    return md5(pass)
}

const generateAccessToken = async (payload) => {
    const privateKey = process.env.PRIVATEKEY
    const tokenLife = process.env.TOKENLIFE
    try {
        return await jwt.sign(
            {
                payload
            },
            privateKey,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife
            });
    } catch (error) {
        console.log(`Loi tao accesstoken: ${error}`)
        throw Error
    }

}

const decryptAccessToken = async (token) => {
    const privateKey = process.env.PRIVATEKEY
    const tokenLife = process.env.TOKENLIFE
    try {
        return await jwt.verify(
            token,
            privateKey,
            {
                ignoreExpiration: true
            }
        )
    } catch (error) {
        console.log('loi giai ma access token!')
    }
}

module.exports = {
    enCryptPassword,
    generateAccessToken,
    decryptAccessToken
}