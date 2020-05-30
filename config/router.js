const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/userController')
const {authenticationUser} = require('../app/middlewares/authenticateUser')
const clientController = require('../app/controllers/clientController')

router.post('/users/register',userController.create)
router.post('/users/login',userController.login)
router.get('/users/account',authenticationUser,userController.account)
router.delete('/users/logout/',authenticationUser,userController.logout)

router.post('/client',authenticationUser,clientController.create)
router.get('/client',authenticationUser,clientController.account)
router.post('/client/addMessage/:id',clientController.addMessage)

router.get('/client/:id',clientController.getClientById)

router.get('/admin/client',clientController.getAllClients)


module.exports = router