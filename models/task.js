const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const Task = mongoose.model('Task', userSchema)

module.exports = Task