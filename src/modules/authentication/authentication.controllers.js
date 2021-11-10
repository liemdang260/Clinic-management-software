const { enCryptPassword, generateAccessToken } = require('./authentication.methods')
const { sequelize, ACCOUNT, EMPLOYEE } = require('../../models')
exports.handleLogin = async (req, res) => {
    let username = req.body.username;
    let password = enCryptPassword(req.body.password);

    try {
        const account = await ACCOUNT.findAll({
            where: {
                USERNAME: username,
            },
            include: [EMPLOYEE]
        })
        if (!account || account.length == 0)
            return res.status(404).send('Khong tim thay user!')
        if (password.localeCompare(account[0].PASSWORD) != 0)
            return res.status(401).send('Mat khau khong dung!')
        let access_token
        try {
            access_token = await generateAccessToken({
                employee_id: account[0].EMPLOYEE_ID,
                employee_name: account[0].EMPLOYEE.EMPLOYEE_NAME,
                username: account[0].USERNAME,
                is_active: account[0].ISACTIVE,
                role: account[0].ROLE,
            })
            if (!access_token) throw Error
        } catch (error) {
            console.log('Loi tao access token')
            throw Error
        }

        const data = {
            access_token: access_token
        }
        return res.json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Loi server!')
    }
}