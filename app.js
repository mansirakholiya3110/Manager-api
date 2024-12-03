const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const dbURL = process.env.MONGO_URI;

app.use('/api', routes);

app.listen(port,()=>{
    mongoose.connect(dbURL)
    .then(()=>console.log(`db connection...!!!!`))
    .catch((err)=>console.log(err))
    console.log(`server start..http://localhost:${port}`);
})