const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post("/tasks",async (req, res) =>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
        console.log(tasks)
    } catch (e) {
        res.status(400).send(e)
    }

})
router.get('/tasks',async(req, res) =>{
    try{
        const tasks =  await Task.find({})
        res.status(201).send(tasks)
    } catch (e){
        res.status(400).send(e)
    }
})
router.get('/tasks/:id', async (req, res) =>{
    const _id = req.params.id;
    try {
        const task = await Task.findById({_id})
        if(!task){
            return res.status(400).send()
        }
        res.status(201).send(task)
    } catch (e){
        res.status(400).send()
    }

})
router.patch("/tasks/:id", async (req, res) =>{
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isAllowed = updates.every((update) => allowedUpdates.includes(update))

    if(!isAllowed){
        return res.status(400).send({error:"Invalid updates"})
    }

    try {
        const task = await Task.findById(_id)
        updates.forEach((update) =>{
            task[update]=req.body[update]
        })
        await task.save()
        // const task = await Task.findByIdAndUpdate(_id, req.body, {runValidators: true, new: true})
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/tasks/:id', async (req, res) =>{
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(id)
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;