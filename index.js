const express = require('express')
const app = express()
const router = require('./config/router')
const setUpDb = require('./config/database')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 3055

app.use(cors())
app.use(express.json())
setUpDb()
app.use('/',router)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build/'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port,()=>{
    console.log('listening on port no',port)
})

