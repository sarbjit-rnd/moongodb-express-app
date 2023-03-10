const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/VsmartCard');
// Use body-parser middleware
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://127.0.0.1:5173'
}));
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