const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config.env' });
require('./db/conn');

//read json file
app.use(express.json());

// cookie-parser middleware
app.use(cookieParser()); 

app.use(cors({
  origin: 'http://localhost:3000',  // This should match the URL of your frontend application
  credentials: true  // This allows session cookies from your frontend to pass through
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rout Link
app.use(require('./routes/userRoutes'));

app.get("/contect", (req, res) => {
  res.send("This is Contect page");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));