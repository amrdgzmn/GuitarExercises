const { Router } = require('express');

const router = Router();

router.get(`/guitar`, (req, res) => {
    res.render("mainpage", {
        cssfilename: "main.css",
        title: "Guitar Exercises Mini-Website",
    });
})

module.exports = router;