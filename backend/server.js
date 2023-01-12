const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
// const options = {
//   origin: "http://localhost:3000",
//   useSuccessStatus: 200,
// };
app.use(cors());
// const useRoutes = require("./routes/user");
// app.use("/api/v1/auth", useRoutes);

readdirSync("./routes").map(r =>
  app.use("/api/v1/auth", require("./routes/" + r))
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
