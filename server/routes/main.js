const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const authMiddleware = require('../../middleware/authMiddleware'); // Assuming authMiddleware is placed in a middleware directory


 

/**
 * get /
 * home
 */
router.get("/home", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Exer-Gym",
      description: "Simple website for checking out your exercises.",
    };

    const user = await User.findById(req.userId);
    const totalExercises = await Post.countDocuments();
    const currentExerciseIndex = user.currentExerciseIndex % totalExercises;

    const data = await Post.find().sort({ createdAt: 1 }).skip(currentExerciseIndex).limit(1).exec();
    const nextExerciseIndex = (currentExerciseIndex + 1) % totalExercises;

    res.render("index", {
      locals,
      data,
      nextExerciseIndex
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * get /
 * post-exercise: id
 */
router.get("/post-exercise/:id", async (req, res) => {
  try {
    const locals = {
      title: "Exer-Gym",
      description: "Simple website for checking out your exercises.",
    };

    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    res.render('post-exercise', { locals, data });
  } catch (error) {
    console.log(error);
  }
});

/**
 * get /Gym Initial Page non - authentification
 * 
 */
router.get("/", (req, res) => {
  const locals = {
    title: "Initial Page",
    description: "Simple website for checking out your exercises.",
  };

  res.render("exer_gym", { locals });
});

/**
 * post /done
 * mark current exercise as done
 */
router.post("/done", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.currentExerciseIndex = req.body.nextExerciseIndex;
    await user.save();
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
