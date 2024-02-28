const mongoose = require('mongoose');

// Define the schema for the review
const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    created_at: { type: Date, default: Date.now }
    
});

// Define the User model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
