require("../src/db/mongoose")

const Task = require("../src/models/task");

// Task.findOneAndRemove({_id:"61ebfed54e3777a45a3bccc4"}).then((res) =>{
//     console.log(res)
//     return Task.countDocuments({completed: false})
// }).then((result) =>{
//     console.log(result)
// })

const updatedListTasks = async(id) =>{
    const tasks = await  Task.findOneAndDelete(id)
    const totalTasks = await  Task.countDocuments({completed: false})
    return totalTasks;
}

updatedListTasks('61ebff316170e69219a43caa').then((res) =>{
    console.log(res)
}).catch((e) =>{
    console.log(e)
})