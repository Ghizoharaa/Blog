const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// blog routes
app.use(blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: 'Error' });
});