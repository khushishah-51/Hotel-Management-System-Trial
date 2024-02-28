const express = require('express');
const router = express.Router();
const Review = require('../model/user');

// Handle adding a review
router.post('/userfeed', async (req, res) => {
  try {
    // Extract review details from the request body
    const { name, review, rating } = req.body;

    // Create a new review object
    const newReview = new Review({
      name,
      review,
      rating
    });

    // Save the review to the database
    await newReview.save();
    // Fetch all reviews from the database
    const allReviews = await Review.find();

    // Render the EJS file with the reviews data
    res.render('reviews', { reviews: allReviews });    

  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Error adding review' });
  }
});

module.exports = router;
