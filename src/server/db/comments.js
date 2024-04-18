const db = require("./client");

const createComment = async ({ userId, reviewId, commentText }) => {
  try {
    const {
      rows: [comment],
    } = await db.query(
      `
        INSERT INTO comments(userId, reviewId, commentText)
        VALUES($1,$2,$3)
        RETURNING *
        `,
      [userId, reviewId, commentText]
    );
    return comment;
  } catch (error) {
    throw error;
  }
};

const getCommentsByReviewId = async (reviewId) => {
  try {
    const query = `
    SELECT *
    FROM comments
    WHERE reviewId = $1;
    `;
    const { rows } = await db.query(query, [reviewId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const updateComment = async (commentId, commentText) => {
  try {
    const query = `
    UPDATE comments
    SET commentText = $1
    WHERE id = $2
    RETURNING *;
    `;
    const values = [commentText, commentId];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const query = `
    DELETE FROM comments
    WHERE id =$1;
    `;
    await db.query(query, [commentId]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createComment,
  getCommentsByReviewId,
  updateComment,
  deleteComment,
};
