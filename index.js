const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/VsmartCard');
// Use body-parser middleware
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define routes
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});