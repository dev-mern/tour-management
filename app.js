const express = require('express')
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const tourRouter = require('./routers/tourRoutes');

// middlewares 
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Tour Management Server!')
})


app.use("/api/v1",tourRouter)

module.exports = app;