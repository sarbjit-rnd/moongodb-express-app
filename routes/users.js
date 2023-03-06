const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
require("dotenv").config();
/*
These routes allow you to perform the following operations:
GET all users at /users
GET a single user by ID at /users/:id
CREATE a new user at /users
UPDATE a user by ID at /users/:id
DELETE a user by ID at /users/:id
*/
// Login user
router.post('/login', async (req, res) => {
  console.log('req', req);
    try {
        console.log('req', req);
      const user = await User.findOne({email:req.body.email, password:req.body.password});
      console.log('user ', user);
      const token = jwt.sign({ _id: user._id, email:user.email }, process.env.JWT_SECRET);
      console.log('user 112', user);
      console.log('token', token);
      res.send({ user, token });
    
    } catch (error) {
    
      res.status(400).send({error});
    }
  });

// GET all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    console.log('user', user);
    console.log('JWT_SECRET', process.env.JWT_SECRET);
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// UPDATE a user by ID
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
