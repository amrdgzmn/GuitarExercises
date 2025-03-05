const { Router } = require('express');

const router = Router();

router.get(`/`, (req, res) => {
    res.redirect('/guitar');
})

router.get('/guitar', (req, res) => {
    res.render("mainpage", {
        cssfilename: "main.css",
        title: "Guitar Exercises Mini-Website",
    });
})

module.exports = router;