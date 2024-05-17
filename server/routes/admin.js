const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminLayout = '../views/layouts/admin'

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
    res.render("admin/index", { locals , layout: adminLayout });
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
      
        const { username , password } = req.body;
        console.log(req.body);

        res.redirect('/admin')
        // res.render('admin/index', { locals, layout: adminLayout})
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
      
        const { username , password } = req.body;
      
        const hasedPassword = await bcrypt.hash(password, 10)

        try {
            const user = await User.create({ username , password: hasedPassword })
            res.status(201).json( {message: "user createad", user })
        } catch (error) {
            if(error.code === 11000) {
                res.status(409).json({ message: "User already in use."})
            }
            res.status(500).json({ message: "Internal server error"})
        }


    } catch (error) {
      console.log(error);
    }
  });

  

module.exports = router;
