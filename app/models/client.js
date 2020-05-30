const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId
    },
    email : {
        type : String
    },
    fullname : {
        type : String
    },
    mobile : {
        type : String,
        maxlength : 12
    },
    gender : {
        type : String,
        enum : ['male','female','others']
    },
    address : {
        type : String
    },
    status : {
        type : String,
        enum : ['single','committed','married']
    },
    profile : {
        type : String,
        enum : ['added','empty'],
        default : 'empty'
    },
    messages:[
        {
            name:{
                type:String,    
            },
            relation:{
                type:String,
            },
            oneWord:{
                type:String,
            },
            firstMeet:{
                type:String
            },
            fight:{
                type:String
            },
            good:{
                type:String,
            },
            bad:{
                type:String
            },
            betray:{
                type:String
            },
            box:{
                type:String
            }
        }
    ]
})

const Client = mongoose.model('Client',clientSchema)

module.exports = Client