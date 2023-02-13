const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
// const options = {
//   origin: "http://localhost:3000",
//   useSuccessStatus: 200,
// };
app.use(cors());
// const useRoutes = require("./routes/user");
// app.use("/api/v1/auth", useRoutes);

// routes
readdirSync("./routes").map(r =>
  app.use("/api/v1/auth", require("./routes/" + r))
);

// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected successfully!🥰"))
  .catch(err => console.log("Error connecting to Database!🙄", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
