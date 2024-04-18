const express = require("express");
const usersRouter = express.Router();

const { createUser, getUser, getUserByEmail, getReviewsByUserId, getCommentsByUserId } = require("../db");

const jwt = require("jsonwebtoken");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "MissingCredentialsError",
        message: "Please supply both an email and password",
      });
    }
    try {
      const user = await getUser({ email, password });
      if (!user) {
        return res.status(401).json({
          error: "AuthenticationError",
          message: "Invalid email or password",
        });
      }
  
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
  
      res.send({
        message: "Login successful!",
        token,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

usersRouter.post("/register", async (req, res, next) => {
    const { name, email, password } = req.body;
  
    try {
      // Validate user inputs (e.g., email format, password strength)
      if (!email || !password) {
        return next({
          name: "MissingCredentialsError",
          message: "Please supply both an email and password",
        });
      }
  
      // Check if user already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return next({
          name: "UserExistsError",
          message: "A user with that email already exists",
        });
      }
  
      // Create new user
      const user = await createUser({
        name,
        email,
        password,
      });
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      next(err);
    }
  });

usersRouter.put('/account', async (req, res, next) => {
    const { email, hairtype, hairtexture, haircolor, hairlength, hairgoals } = req.body;
  
    try {
      // Assuming `getUser` retrieves a user's account based on their email
      const account = await getUser({ email });
  
      // Update the user's hair profile data
      account.hairtype = hairtype;
      account.hairtexture = hairtexture;
      account.haircolor = haircolor;
      account.hairlength = hairlength;
      account.hairgoals = hairgoals;
  
      // Save the updated user account
      await account.save();
  
      res.status(200).json({ message: 'Hair profile updated successfully' });
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  });

  usersRouter.get('/reviews', async (req,res,next) => {
    try {
      const userId = req.user.id;
      const reviews = await getReviewsByUserId(userId)
      res.json(reviews);
    } catch (error) {
      next(error)
    }
  })

  usersRouter.get('/comments', async (req,res,next) => {
    try {
      const userId = req.user.id;
      const comments = await getCommentsByUserId(userId)
      res.json(comments)
    }catch(error) {
      next(error)
    }
  })

module.exports = usersRouter;
