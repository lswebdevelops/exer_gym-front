const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { addAbortListener } = require("connect-mongo");

/**
 * get /
 * home
 */

router.get("", async (req, res) => {
  const locals = {
    title: "Exer-Gym",
    description: "Simple website for checking out your exercises.",
  };
  
  try {
    const data = await Post.find();
    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});


/**
 * get /about
 * about
 */


router.get("/about", (req, res) => {
  const locals = {
    title: "About Page",
    description: "Simple website for checking out your exercises.",
  };

  res.render("about", { locals });
});

module.exports = router;
