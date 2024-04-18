const express = require("express");
const reviewsRouter = express.Router();

const {
  getReviewsByItemId,
  getCommentsForReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../db/reviews");

// Route to get single review by ID along with comments
reviewsRouter.get("/:itemId", async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    const reviews = await getReviewsByItemId(itemId);

    for (let review of reviews) {
      const comments = await getCommentsForReview(review.reviewid);
      review.comments = comments;
    }
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

// Route to create a review
reviewsRouter.post("/item/:itemId", async (req, res, next) => {
  try {
    const { userId, rating, reviewText } = req.body;
    const itemId = req.params.itemId;
    const review = await createReview({ userId, itemId, rating, reviewText });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

// Route to update a review
reviewsRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const { rating, reviewText } = req.body;
    const reviewId = req.params.reviewId;
    const updatedReview = await updateReview(reviewId, rating, reviewText);
    res.send(updatedReview);
  } catch (error) {
    next(error);
  }
});

// Route to delete a review
reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    await deleteReview(reviewId);
    res.send("Review deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;
