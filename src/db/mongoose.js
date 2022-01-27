const mongoose = require('mongoose');
const validator= require('validator');

const connectionURL = "mongodb+srv://VinayKumar:vinaykumar@cluster0.lqvyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const databaseName = "task-manager-api";
let db = "";
mongoose.connect(connectionURL,{
    useNewUrlParser: true,
}, (error, client) =>{
    if(error){
        console.log(error)
    }
})



// const TaskData = new Tasks({
//     description:"         Programe stabbbbbbbbbbr frrted",
//     completed: false,
// })
//
// TaskData.save().then((tasks) =>{
//     console.log(tasks)
// }) .catch((e) =>{
//     console.log(e)
// })
// const userData = new User({
//     name:"Vinayku dd   mar",
//     age:25,
//     email:"vinay@gmail.com",
//     password:"vinay@5",
// })
//
// userData.save().then((user) =>{
//     console.log(user)
// }).catch((e) =>{
//     console.log(e)
// })

