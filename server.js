const express = require('express');
const articleRouter = require('./routes/articles');
const Article = require('./models/article.model');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 5000;

// Set View Templating
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URL).then(()=> {
    console.log("connected to the DataBase Successfully...");
}).catch((err) => {
    console.log(err);
});

app.use(express.urlencoded({ extended: false }));
app.use('/articles',articleRouter);

// Basic Routing 
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ date: 'desc' });
  res.render('articles/index', { articles: articles });
});

// Specifying special port for server listening..
app.listen(port, () =>{
    console.log(`Server is up and running on port: ${port}`);
});