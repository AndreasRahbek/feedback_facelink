const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes')
const postRoutes = require('./Routes/postRoutes')

const app = express();

mongoose.connect('mongodb://localhost:27017/facelink')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Could not connect to MongoDB', err)
    );

app.use(express.json());

app.use('/', userRoutes);
app.use('/', postRoutes)
app.listen(4000, () => console.log('Server running on http://localhost:4000'));

