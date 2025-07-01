const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user-route");
const authRouter = require("./routes/auth-route");
const tweetRouter = require("./routes/tweet-route");

const errorHandler = require("./middleware/error-handler");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/twitter-clone-lite/user", userRouter);
app.use("/api/v1/twitter-clone-lite/login", authRouter);
app.use("/api/v1/twitter-clone-lite/tweet", tweetRouter);

app.use(errorHandler);

module.exports = app;
