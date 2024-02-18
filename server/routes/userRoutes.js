const express = require('express');
const { registerUser, loginUser, getUser, updateUser } = require('../controllers/userController');
//const user=require('../modols/userModel')
const router = express.Router()

router.post('/register-user', registerUser)

router.post('/login-user', loginUser)

router.get('/get-user', getUser)
router.post('/update-user', updateUser)

module.exports = router;