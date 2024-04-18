const express = require("express");
const commentsRouter = express.Router();

const {
  createComment,
  getCommentsByReviewId,
  updateComment,
  deleteComment,
} = require("../db/comments");

// Route to create comment
commentsRouter.post("/", async (req, res, next) => {
  try {
    const { userId, reviewId, commentText } = req.body;
    const comment = await createComment({ userId, reviewId, commentText });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Route to get comments by review ID
commentsRouter.get("/review/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const comments = await getCommentsByReviewId(reviewId);
    if (!comments || comments.length === 0) {
      res.status(404).send("Comments not found for specified review");
    } else {
      res.send(comments);
    }
  } catch (error) {
    next(error);
  }
});

commentsRouter.post("/review/:reviewId", async (req, res, next) => {
  try {
    const { userId, commentText } = req.body;
    const reviewId = req.params.reviewId;
    const comment = await createComment({ userId, reviewId, commentText });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Route to update a comment
commentsRouter.put("/commentId", async (req, res, next) => {
  try {
    const { commentText } = req.body;
    const commentId = req.params.commentId;
    const updatedComment = await updateComment(commentId, commentText);
    res.send(updatedComment);
  } catch (error) {
    next(error);
  }
});

// route to delete a comment
commentsRouter.delete("/:commentId", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    await deleteComment(commentId);
    res.send("Comment deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
