const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId
    },
    email : {
        type : String
    }
})

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin