// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require("cors")

const signUpRoute=require('./routes/signup');
const loginRoute=require('./routes/login');
const submissionRoute=require('./routes/submission');
const submissionRouteId=require('./routes/submission');

// Initialize Express app
const app = express();

// Enable CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});
// Set up middleware
app.use(bodyParser.json());

// Create a user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a user model
const User = mongoose.model('User', userSchema);

// User registration
app.use(signUpRoute);

// User login
app.use(loginRoute);

// Submission endpoint
app.use(submissionRoute);
  
  // Get submission by ID endpoint
app.use(submissionRouteId);

// Start the server
mongoose.connect('mongodb+srv://alokabhigyan65:Abhi1997$$@sharpenerproject.msds32f.mongodb.net/')
.then(result=>{
    app.listen(3000)
    console.log("Connected to MongoDB")
})
.catch(err=>{
    console.log(err)
})
