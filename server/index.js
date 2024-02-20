const express=require('express')
const connectDB = require('./config/connect');
const errorHandler = require('./middleware/errorMiddleware');
// require dotenv lib to use .env variables
require('dotenv').config();

// require colors lib to make the terminal interactive
require('colors')


const cors = require('cors');



const app=express()

// use cors middleware to allow cross site requests
//app.use(cors())
app.use(cors(
    {
        origin:[''],
        methods:["POST","GET"],
        credentials:true

    }
))


// connect to the database
connectDB()
//convert data to json
app.use(express.json())

//midddleware for encoding 
app.use(express.urlencoded({extended:false}))

//console.log('i mhere')

app.use('/api/data/', require('./routes/userRoutes'))
app.use('/api/posts/', require('./routes/postRoutes'))
app.use('/api/category/', require('./routes/categoryRoutes'))
app.use('/api/product/', require('./routes/productRoutes'))
app.use(errorHandler)



app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT.blue}`))
