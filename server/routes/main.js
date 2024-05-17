const express = require('express')
const router = express.Router();
const Post = require('../models/Post');
const { addAbortListener } = require('connect-mongo');


/**
 * get /
 * home
 */

router.get("", (req, res) => {
  const locals = {
    title: "Exer-Gym",
    description: "Simple website for checking out your exercises."
  }
   res.render('index', { locals });
  });

// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "B",
//       exercise1: "Triceps Corda + Rosca direta W",
//       exercise2: "Triceps Testa W + Rosca scott halter unilateral",
//       exercise3: "Trípeps francês unilateral + Rosca martelo polia",
//       exercise4: "Tríceps puxador + rosca inversa",
//       exercise5: "Adb. infra na prancha"    
//     }
//   ])
// }
// insertPostData() 





router.get("/about", (req, res) => {
  const locals = {
    title: "About Page",
    description: "Simple website for checking out your exercises."
  }

   res.render('about', {locals});
  });
  



module.exports = router;