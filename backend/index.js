require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  return res.send("Hi");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
