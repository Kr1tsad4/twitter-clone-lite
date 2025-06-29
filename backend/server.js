require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");

connectDB();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
