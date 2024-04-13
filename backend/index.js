const express = require('express')
const dotenv = require('dotenv')
const userRoutes  = require('./routes/userRoutes')
const  accountRoutes  = require('./routes/accountRoutes')
const cors = require('cors')
const connectDB = require('./db/db')
const errHandler = require('./middleware/errorMiddleware')

dotenv.config()
connectDB()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.json({
        msg : 'welcome to our server'
    })
})

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/account', accountRoutes)

app.use(errHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`sever is running at PORT ${PORT}`);
})