const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { addAbortListener } = require("connect-mongo");

/**
 * get /
 * home
 */

router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Exer-Gym",
      description: "Simple website for checking out your exercises.",
    };

    let perPage = 1;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;

    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});




/**
 * get /
 * post-exercise: id
 * 
 * 
 */

router.get("/post-exercise/:id", async (req, res) => {
  try {
    const locals = {
      title: "Exer-Gym",
      description: "Simple website for checking out your exercises.",
    };

   let slug = req.params.id;
   const data = await Post.findById( {_id: slug });
   res.render('post-exercise', { locals, data})

   
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
