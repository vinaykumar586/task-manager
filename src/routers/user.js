const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
router.post("/users", async(req, res) =>{
    console.log(req.body)
    try {
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
        console.log(user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
    res.send("testing")
})
router.post("/users/login", async(req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user)
        const token = await user.generateAuthToken()
         user.message = "login successful";
        res.send({user, token,message: "login success full happened"})
    } catch (e){
        res.status(400).send(e)
    }
})
router.get('/users/me' , auth, (req, res) =>{
    res.send(req.user)
})
router.get("/users", auth, async (req,res) =>{
    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e){
        res.status(400).send(e)
    }
})
router.patch("/users/:id", async (req, res) =>{
    const _id = req.params.id;
    const updates =  Object.keys(req.body)
    const allowedUpdates = ['name','age','email', 'password'];
    const isAllowed = updates.every((update) =>
        allowedUpdates.includes(update)
    )
    if(!isAllowed) {
        return res.status(400).send({error:"invalidupdates"})
    }
    try {
        const user = await User.findById(_id);
        updates.forEach((update) =>{
            user[update]=req.body[update]
        })
        await user.save()
        console.log(user)
        // const user = await User.findByIdAndUpdate(_id, req.body,{runValidators: true, new: true})
        if(!user){
            return res.status(400).send()
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get("/users/:id", async (req,res) =>{
    const _id = req.params.id;
    try{
        const user = await User.findById({_id})
        if(!user){
            return res.status(400).send()
        }
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
})
router.delete("/users/:id", async(req,res) =>{
    const id = req.params.id;
    try {
        const  user = await User.findByIdAndDelete(id)
        if(!user){
            return  res.status(400).send()
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;