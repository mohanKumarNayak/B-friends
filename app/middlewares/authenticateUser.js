const User = require('../models/user')

const authenticationUser = (req,res,next) => {
    const token = req.header('x-auth')
    User.findByToken(token)
        .then((user)=>{
            if(user){
                req.user=user
                req.token = token
                next()
            }
            else{
                res.json({'notice':'token not found'})
            }
        })
        .catch((err)=>{
            res.status('401').send(err)
        })
}

module.exports = {
    authenticationUser
}