require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require('method-override')
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require('express-session');
const connectDB = require("./server/config/db");

const app = express();
const PORT = process.env.PORT || 5000; // Corrected the PORT assignment

// Connect to the database
connectDB();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
     // cookie expiration date
     cookie: { maxAge: 3600000}
}));

// Templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

// Routes
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
