const express=require('express')
const router=express.Router()
const controller= require('../controllers/signup')

router.post('/register',controller.signup);

module.exports=router;