require("../src/db/mongoose")
const User = require("../src/models/user");

// User.findByIdAndUpdate("61e2c3fe0839ff4efe8e1022",{age: 24}).then((user)=>{
// console.log(user)
//     return User.countDocuments({age: 25})
//
// }).then((result) =>{
//     console.log(result)
// }).catch((e) =>{
//     console.log(e)
// })
//
const updateAgeCount = async(id, age) =>{
    const user = await User.findByIdAndUpdate(id,{age} )
    const count = await User.countDocuments({age})
    return count;
}

updateAgeCount('61e2c3fe0839ff4efe8e1022', 71).then((res) => {
    console.log(res)
}).catch((e) =>{
    console.log(e)
})