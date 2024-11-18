const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes')
const postRoutes = require('./Routes/postRoutes')
const path = require('path');
const Post = require('./models/post');
const errorHandler = require('./middleware/errorHandling');
const logger = require('./middleware/logger');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();

mongoose.connect('mongodb://localhost:27017/facelink')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Could not connect to MongoDB', err)
    );

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static('public'));
app.use(logger)
app.use(rateLimiter)
app.use(errorHandler)


app.use('/', userRoutes);
app.use('/', postRoutes)

app.get('/', async (req, res) => {
    try {
        // Hent posts fra databasen. Populate bliver brugt til at udskifte 'userId'
        // fra Post dokumentet med 'username' fra det relateret user dokument,
        // så vi kan vise brugernavnet i stedet for brugerID.
        const posts = await Post.find().populate('userId', 'username').sort({ timestamp: -1 });
        res.render('index', { posts });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server fejl');
    }
});
app.listen(4000, () => console.log('Server running on http://localhost:4000'));

