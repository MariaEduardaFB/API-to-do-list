const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { connectToMongoDB } = require('./database');
const authRoutes = require('../middleware/auth')
const signupRoutes = require('../routes/signUp')
const signinRoutes = require('../routes/signIn')
const taskRoutes = require('../routes/task')

const app = express()

const porta = process.env.PORT || 3000;
const server = app.listen(porta, () => console.log(`Listening on ${porta} port`));
process.on('SIGINT', () => {
    server.close();
    console.log('Finished App');
});


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/signup', signupRoutes)
app.use('/signin', signinRoutes)
app.use('/auth', authRoutes)
app.use('/api', taskRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));


  