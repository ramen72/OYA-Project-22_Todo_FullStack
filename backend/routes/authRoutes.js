const express = require("express");

const router = express.Router();

router.post("/registration", (req, res) => {
  console.log("I am registration");
});

router.post("/login", (req, res) => {
  console.log("I am login");
});

module.exports = router;
