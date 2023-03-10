const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization header missing or invalid' });
    return;
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log(' auth token ',token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded ',decoded);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(' auth error ',error);
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }

};

module.exports = auth;
