const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({ name = "first last", email, password, hairtype, hairtexture, haircolor, hairlength, hairgoals }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        INSERT INTO users(name, email, password, hairtype, hairtexture, haircolor, hairlength, hairgoals)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
      [name, email, hashedPassword, hairtype, hairtexture, haircolor, hairlength, hairgoals]
    );
    return user; // Return the inserted user data
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const getReviewsByUserId = async (userId) => {
  try {
    const {rows: reviews} = await db.query(
      `
      SELECT * FROM reviews
      WHERE userId = $1
      `,
      [userId]
    );
    return reviews;
  } catch (error) {
    throw error;
  }
}

const getCommentsByUserId = async (userId) => {
  try {
    const {rows: comments} = await db.query(
      `
      SELECT * FROM comments
      WHERE userId = $1
      `,
      [userId]
    );
    return comments;
  } catch (error) {
    throw error
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getCommentsByUserId,
  getReviewsByUserId,
};