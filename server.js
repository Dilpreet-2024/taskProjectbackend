require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const addbooksRoute = require("./routes/addbooksRoute");


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const createError = require('./middleware/error');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;


app.use(cors());


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});


const upload = multer({ storage: storage });

// Routes

app.use("/api/books", addbooksRoute);

// Endpoint for uploading images
app.post("/api/upload", upload.single('productname'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/uploads/${req.file.filename}`
  });
});

// Serve static images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});




// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
