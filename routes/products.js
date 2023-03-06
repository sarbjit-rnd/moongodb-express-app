const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require('../middleware/auth');
// GET all products

/*
These routes allow you to perform the following operations:

GET all products at /products
GET a single product by ID at /products/:id
CREATE a new product at /products
UPDATE a product by ID at /products/:id
DELETE a product by ID at /products/:id

*/
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// CREATE a new product
router.post('/',auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// UPDATE a product by ID
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'price'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    updates.forEach((update) => product[update] = req.body[update]);
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
