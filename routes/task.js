const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.userId})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message:'Error fetching tasks'})
    }
})

router.post('/tasks', async (req, res) => {
    const { title } = req.body

    try {
        const newTask = new Task({
            title,
            userId:req.userId
        })

        await newTask.save()
        res.status(200).json({newTask})
    } catch (error) {
        res.status(500).json({message:'Error creating task'})
        console.log(error)
    }
})

router.put('/tasks/:taskId', async (req, res) => {
    const { title } = req.body

    try {
        const updatedTask = await Task.findOneAndUpdate(
            {_id: req.params.taskId, userId: req.userId},
            {title},
            {new:true}
        )

        if(!updatedTask){
            return res.status(404).json({message:'task not found'})
        }

        res.status(200).json({updatedTask})
    } catch (error) {
        res.status(500).json({message: 'Error updating task'})
    }
})

router.delete('/tasks/:taskId', async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete(
            {_id: req.params.taskId, 
            userId: req.userId},
        )

        if(!deletedTask){
            return res.status(404).json({message:'task not found'})
        }
        res.status(200).json({message: 'Task deleted successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error deleting task'})
    }
})

module.exports = router;