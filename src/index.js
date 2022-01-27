const  express = require("express")
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter =  require('../src/routers/user')
const taskRouter = require('../src/routers/task')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 3000;

const app = express();

// app.use((req,res,next) =>{
//   if(req.method === 'GET'){
//       res.send("GET request method disabled")
//   } else {
//       next()
//   }
// })
//For mantaince disable apis
// app.use((req,res,next) =>{
//     if(req.method ==='POST'||req.method ==='PATCH'){
//         res.status(503).send(" request method disabled")
//     }else {
//         next()
//     }
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//
//without middleware new request --> run route handler
//
//with middle ware new request --> something --> run route handler
const myFunction = async () =>{
    const token = jwt.sign({'_id':'abc123'}, "this is my course",{'expiresIn': '7 days'})
    console.log(token)
    const data = jwt.verify(token, 'this is my course')
    console.log(data)
    // const password = "Vinay@586";
    // const hashPassword = await bcrypt.hash(password,8)
    // console.log(password);
    // console.log(hashPassword)
    // const isMatch =await bcrypt.compare(password, hashPassword)
    // console.log(isMatch)
}

myFunction()
app.listen(port, (req, res)=>{
    console.log("serever started" + port)
})