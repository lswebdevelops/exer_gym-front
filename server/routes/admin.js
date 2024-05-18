const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

/**
 *
 * Check login
 */
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

/**
 * get /
 * admin - Login Page
 */
router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin Page",
      description: "Simple website for checking out your exercises.",
    };
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Post /
 * admin - Check login
 */
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    // debugging
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);  // Add this line to check password validity

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /
 * Admin Dashboard
 */
router.get("/dashboard", authMiddleware, async (req, res) => {
  const locals = {
    title: "Dashboard Page",
    description: "Simple website for checking out your exercises.",
  };

  try {
    const data = await Post.find({ user: req.userId }).sort({ createdAt: -1 }); // Fetch posts for the logged-in user
    res.render("admin/dashboard", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin Create new exercise
 */
router.get("/add-exercise", authMiddleware, async (req, res) => {
  const locals = {
    title: "Add Exercise Page",
    description: "Simple website for checking out your exercises.",
  };

  res.render("admin/add-exercise", {
    locals,
    layout: adminLayout,
  });
});

/**
 * POST /
 * Admin Create new exercise
 */
router.post("/add-exercise", authMiddleware, async (req, res) => {
  try {
    const newExercise = new Post({
      title: req.body.title,
      exercise1: req.body.exercise1,
      exercise2: req.body.exercise2,
      exercise3: req.body.exercise3,
      exercise4: req.body.exercise4,
      exercise5: req.body.exercise5,
      exercise6: req.body.exercise6,
      exercise7: req.body.exercise7,
      exercise8: req.body.exercise8,
      exercise9: req.body.exercise9,
      user: req.userId // Associate exercise with the logged-in user
    });

    await newExercise.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * Post /
 * admin - Register
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use." });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin edit exercise
 */
router.get("/edit-exercise/:id", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Edit Exercise Page",
      description: "Simple website for checking out your exercises.",
    };

    const data = await Post.findOne({ _id: req.params.id, user: req.userId }); // Ensure the user owns the exercise

    if (!data) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.render("admin/edit-exercise", {
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * PUT /
 * Admin edit exercise
 */
router.put("/edit-exercise/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // Ensure the user owns the exercise
      {
        title: req.body.title,
        updatedAt: Date.now(),
        exercise1: req.body.exercise1,
        exercise2: req.body.exercise2,
        exercise3: req.body.exercise3,
        exercise4: req.body.exercise4,
        exercise5: req.body.exercise5,
        exercise6: req.body.exercise6,
        exercise7: req.body.exercise7,
        exercise8: req.body.exercise8,
        exercise9: req.body.exercise9,
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.redirect(`/edit-exercise/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
});

/**
 * DELETE /
 * admin - DELETE exercise
 */
router.delete("/delete-exercise/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.userId }); // Ensure the user owns the exercise

    if (!post) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * admin logout
 */
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin");
});

module.exports = router;
