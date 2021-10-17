// password pYiGhIcKLjKBB1fh
// conncection mongodb+srv://feggie:<password>@cluster0-lbsd8.mongodb.net/test?retryWrites=true&w=majority

const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const Recipe = require('./models/recipe');

const app = express();

mongoose.connect('mongodb+srv://feggie:pYiGhIcKLjKBB1fh@cluster0-lbsd8.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('successfully connected to MongoDB Atlas!')
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.log(error)
  })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyparser.json())

app.post('/api/recipes', (req, res, next) => {
  const {
    title,
    ingredients,
    instructions,
    difficulty,
    time
  } = req.body;
  const recipe = new Recipe({
    title: title,
    ingredients: ingredients,
    instructions: instructions,
    difficulty: difficulty,
    time: time,
  });
  recipe.save().then(() => {
    res.status(201).json({
      message: 'Post saved successfully'
    });
  }).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
});

app.get('/api/recipes/:id', (req, res, next) => {

  Recipe.findOne({
    _id: req.params.id
  }).then(
    (recipe) => {
      res.status(200).json(recipe);
    }
  ).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
});

app.put('/api/recipes/:id', (req, res, next) => {
  const {
    title,
    ingredients,
    instructions,
    difficulty,
    time
  } = req.body;
  const recipe = new Recipe({
    _id: req.params.id,
    title: title,
    ingredients: ingredients,
    instructions: instructions,
    difficulty: difficulty,
    time: time,
  });
  Recipe.update({
    _id: req.params.id
  }, recipe).then(() => {
    res.status(201).json({
      message: 'Post saved successfully'
    });
  }).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
});

app.delete('/api/recipes/:id', (req, res, next) => {
  Recipe.deleteOne({
    _id: req.params.id
  }).then(() => {
    res.status(200).json({
      message: 'Deleted'
    });

  }).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
});

app.use('/api/recipes', (req, res, next) => {
  Recipe.find().then((recipes) => {
    res.status(200).json(recipes);
  }).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
});

module.exports = app;