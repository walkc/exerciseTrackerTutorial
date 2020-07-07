const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//set up server
const app = express();
const port = process.env.PORT || 6000;

//allow us to parse json
app.use(cors());
app.use(express.json());


//connect to mongo
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("mongoDB database connecitn established succesfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//starts the server
app.listen(port,()=>{
    console.log('Server is running on port: ${port}');
});