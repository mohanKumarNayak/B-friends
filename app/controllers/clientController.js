const Client = require('../models/client')

module.exports.create = (req,res) => {
    const {user} = req
    const body = req.body
    Client.findOneAndUpdate({
        user : user._id
    },body,{new:true,runValidators:true})
        .then((client)=>{
            res.json(client)

        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.account = (req,res)=>{
    const {user}=req
    Client.findOne({
        user:user._id
    })
    .then((client)=>{
        res.json(client)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.addMessage = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Client.findOneAndUpdate({                                        
        user:id
    },{$push : {messages : {name : body.name , box : body.box,relation : body.relation,
    oneWord : body.oneWord,
    firstMeet : body.firstMeet,
    fight : body.fight,
    good : body.good,
    bad : body.bad,
    betray : body.betray}}},{new:true,runValidators:true})
    .then((client)=>{
        res.json(client)
    })
    .catch((err)=>{
        res.json(err)
    })

}

module.exports.getClientById = (req,res) => {
    const id = req.params.id
    Client.findOne({
        user:id
    })
    .then((client)=>{
        res.json(client)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.getAllClients = (req,res) => {
    Client.find()
        .then((client)=>{
            res.json(client)
        })
        .catch((err)=>{
            res.json(err)
        })
}
