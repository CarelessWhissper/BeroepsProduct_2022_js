//creating the http server

const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');


//log request with morgan


app.use(morgan('tiny'));

//MongoDB connection

connectDB();


//parse request to body-parser

app.use(bodyparser.urlencoded({extended:true}))

// set view engine for the application

app.set("view engine","ejs");

// app.set("views",path.resolve(__dirname,"views/{name}}"))

//load the assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));


//load the routers

app.use('/',require('./server/routes/router'));




app.listen(PORT,()=>{console.log(`server is running on http://localhost:${PORT}`)});

