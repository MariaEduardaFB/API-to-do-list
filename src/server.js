const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { connectToMongoDB } = require('./database');

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

connectToMongoDB()
  .then(() => {
    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });


  