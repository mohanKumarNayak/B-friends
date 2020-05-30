const mongoose = require('mongoose')

const setUpDb = () => {
    mongoose.connect('mongodb+srv://user:mohan619@get-in-film-j7ept.mongodb.net/fun-friends?retryWrites=true&w=majority')
        .then(()=>{
            console.log('connected to database')
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports = setUpDb