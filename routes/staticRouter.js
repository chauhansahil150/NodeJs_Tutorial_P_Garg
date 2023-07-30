const express = require("express");
const router = express.Router();
const {restrictTo} = require('../middleware/auth')
const URL = require("../models/url");


router.get('/',restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    // if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({ createdBy:req.user._id });
    res.render("home", {
        urls:allUrls,
    });
})
router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    // if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({ });
    res.render("home", {
        urls: allUrls,
    });
})


router.get('/signup', (req, res) => {
    return res.render("signup");
})
router.get('/login', (req, res) => {
    return res.render("login");
})
router.get('/logout', (req, res) => {
    return res.render("login");
})


module.exports = router;
