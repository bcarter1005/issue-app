const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes/route');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//set static files
app.use(express.static(path.join(__dirname, 'ang-src/dist/angualr')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname)));

//routes
app.use('/', route);


//connect to mongodb
mongoose.connect('mongodb://Bryant:lions0nly@ds133632.mlab.com:33632/issue', { useNewUrlParser: true });

//on connection
mongoose.connection.on('connected',() => {
    console.log('Connected to DB');
});

//on error
mongoose.connection.on('error' ,(err) => {
    if(err)
    {
        console.log('Error In DB connection')
    }
})

// Port
const Prt = process.env.Port || 3000;

app.listen(Prt, () => { console.log('Server is All the Way Up...' + Prt);});