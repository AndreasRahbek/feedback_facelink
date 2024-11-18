// Error handler middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error. All fields are required'});
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    if (err.name === 'MongoError') {
        return res.status(500).json({ message: 'Database error. Try again later.' });
    }

    return res.status(500).json({ message: 'Something went wrong. Try again later.' });
}

module.exports = errorHandler