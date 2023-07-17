const express=require('express')
const router=express.Router()
const controller= require('../controllers/submission')
const auth=require('../middleware/auth')

router.post('/submission',auth.authenticate,controller.submission);
router.get('/submission/:id',auth.authenticate,controller.submissionId);

module.exports=router;
