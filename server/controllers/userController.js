const User = require('../models/userModel')
const AsyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = AsyncHandler(async (req, res) => {
    const {   name, email,phone, password, gender,about_me } = req.body;
    // check if user already exists
    const checkUser = await User.findOne({ email })
    if (checkUser) {
        res.status(400);
        throw new Error('User already exists!');
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = await User.create(
            {
                name,
                email,
                phone,
                password: hashedPassword,
                gender,
                about_me
                
            }
        )

        res.send(createdUser)

 
    }

})

const getUser = AsyncHandler(async (req, res) => {
  
    const {_id}=req.query
   // console.log(category)
    const userData = await User.findOne({_id});
    console.log(userData)
    res.send(userData);
})


const updateUser = AsyncHandler(async (req, res) => {
    const { name, email,phone, gender,about_me,image,_id  } = req.body;
    // check if user already exists
    //console.log(gender)
    const findUser = await User.findOne({ _id:_id })
    if (!findUser) {
        res.status(400);
        throw new Error('User not found!');
    } 
    else 
    {
        findUser.name = name
        findUser.email = email;
        findUser.phone = phone;
        findUser.email = email;
        findUser.gender = gender;
        findUser.about_me = about_me;
        findUser.image = image;

        await findUser.save()
    }
        
    res.send(findUser)

 
})

const loginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error('Please enter the fields')
    }
    const findUser = await User.findOne({ email })
    if (!findUser) {
        res.status(404);
        throw new Error('User not found')
    }
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
        res.status(200);
        res.send(findUser)
    } else {
        res.status(401);
        throw new Error('Invalid Credentials')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser
}