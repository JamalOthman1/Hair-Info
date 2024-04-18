const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

const volleyball = require("volleyball");
apiRouter.use(volleyball);

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");
console.log('auth', auth)
  if (!auth) {
    next();
  } else if (auth.startsWith("Bearer ")) {
    // TODO - Get JUST the token out of 'auth'
    const token = auth.substring(7);
    console.log('token', token)
    try {
      const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'
      req.user = parsedToken;
      next();
    } catch (error) {
      next({
        name: "Unauthorized Error",
        message: "Invalid or expired token",
      });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with 'Bearer'`,
    });
  }
});

const usersRouter = require("./users");
const itemsRouter = require("./items");
const reviewsRouter = require("./reviews");
const commentsRouter = require("./comments");
apiRouter.use("/users", usersRouter);
apiRouter.use("/items", itemsRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

module.exports = apiRouter;
