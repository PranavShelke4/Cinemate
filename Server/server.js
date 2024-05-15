const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config({ path: "./config.env" });
require("./db/conn");

// Read json file
app.use(express.json());

// cookie-parser middleware
app.use(cookieParser());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Link
app.use(require("./routes/userRoutes"));
app.use(require("./routes/postRoutes"));

app.get("/contact", (req, res) => {
  res.send("This is Contact page");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
