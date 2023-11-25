const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { logRequest } = require('./middleware/middle')
const cors = require("cors");
const { userSignUp, userLogin, getUserInfo } = require('./manager/manager')

const mongoose = require('mongoose');
app.use(cors());

const dbURI = 'mongodb://127.0.0.1:27017/Users';
app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });


app.post('/signup', (req, res) => {
  userSignUp(req, res);
})

app.post('/login', (req, res) => {
  userLogin(req, res);
})

app.get('/verify', (req, res) => {
  getUserInfo(req, res);
})

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
