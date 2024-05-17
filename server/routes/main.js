const express = require('express')
const router = express.Router();



router.get("", (req, res) => {
  const locals = {
    title: "Exer-Gym",
    description: "Simple website for checking out your exercises."
  }
   res.render('index', { locals });
  });




router.get("/about", (req, res) => {
   res.render('about');
  });


module.exports = router;