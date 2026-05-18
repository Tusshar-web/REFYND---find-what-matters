const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './utils/.env')})
const express = require('express');
const app = express();
const mySql = require('mysql2');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./utils/db');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Register the routes
app.use('/', userRouter);
const itemRouter = require('./routes/itemRouter');
app.use('/', itemRouter);
//image
app.use('/uploads', express.static('uploads'))
db.connect(err=> {
    if(err) {
        return console.log('Error while connecting to the DB ', err)
    }
    console.log('Connected successfully to the DB')
})

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})