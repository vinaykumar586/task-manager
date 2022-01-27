//CRUD Create, Read, Update, Delete

const {MongoClient,ObjectId} = require('mongodb');
const mongoose = require('mongoose')
// const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb+srv://VinayKumar:vinaykumar@cluster0.lqvyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const databaseName = 'task-manager'

const id = new ObjectId()
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error,client)=> {
    if(error){
        return console.log("Unable to connect database", error)
    } else {
        console.log("success")
    }
    const db = client.db(databaseName)
   // db.collection('users').deleteMany({
   //     age:40,
   // }).then((data) => {
   //     console.log(data)
   // }).catch((e) =>{
   //     console.log(e)
   // })

    db.collection('tasks').deleteMany({
        completed: false,
    }).then((data) => {
        console.log(data)
    }).catch((e) => {
        console.log(e)
    })
})



