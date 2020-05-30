const User = require('../models/user')
const Client = require('../models/client')

module.exports.create = (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user)=>{
            if(user.role == 'client'){
                const client = new Client()
                client.user = user._id 
                client.email = user.email
                client.save()
                    .then((client)=>{
                        res.json({
                            username : user.username,
                            email : user.email,
                            role:user.role,
                            notie:'welcome to the website'
                        })
                    })
            }
            else if(user.role == 'admin'){
                const admin = new  Admin()
                admin.user = user._id
                admin.email = user.email
               admin.save()
                .then((admin)=>{
                    res.json({
                        username : user.username,
                        email : user.email,
                        role:user.role,
                        notie:'welcome to the website'
                    })
                })
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.login = (req,res) => {
    const body = req.body
    User.findByCredentials(body.email,body.password)
        .then((user)=>{
            user.generateToken()
                .then((token)=>{
                    res.json({
                        'token' : token
                    })
                })
                .catch((err)=>{
                    res.json(err)
                })
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.account = (req,res) => {
    const {user} = req
    User.findOne({
        _id : user._id
    })
        .then((user)=>{
            res.json({
                _id : user._id,
                username : user.username,
                email : user.email,
                role : user.role
            })
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.logout = (req,res) => {
    const {user,token} = req
    User.findByIdAndUpdate(user._id,{$pull : {tokens : {token : token}}})
        .then(()=>{
            res.json({notice:'successfully logged out'})
        })
        .catch((err)=>{
            res.json(err)
        })
}