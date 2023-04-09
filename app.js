const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
//express app
const app = express();

//Connect to mongodb
const uri = 'mongodb+srv://Ghizlane:test123@nodetuts.qcyyspp.mongodb.net/cluster0?retryWrites=true&w=majority';

async function connect() {
    try{
        await mongoose.connect(uri);
        console.log('Connected to mongodb');
    }
    catch(error){
        console.log(error);
    }
}
connect();
// register view engine
app.set('view engine', 'ejs');

//Listen for request
app.listen(3000);
app.use(morgan('dev'));

// mongoose and mongo sandbox routes



app.get('/', (req, res) => {
const blogs = [
    { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit..'},
    { title: 'Mario finds eggs', snippet: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. ' },
    { title: 'How to defeat bowser', snippet: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. ' }
    ];

    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})

app.use((req, res) => {
    res.status(404).render('404', { title: 'Error' });
});