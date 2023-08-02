const { Router } = require('express');
const User = require("../models/user");
const router = Router();

router.get('/signup', (req, res) => {
    res.render("signup");
})
    .post('/signup', async (req, res)=>{
        const { name, email, password } = req.body;
        try {
            await User.create({
                name,
                email,
                password,
            });
            res.render('home');
        } catch (error) {
            res.render('signup', {error:"Already have an account"});            
        }
    })
router.get('/login', (req, res) => {
    res.render("login");
})
    .post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const token = await User.matchPasswordAndGenerateToken(email, password);

            console.log(token);
            res.cookie("token", token).redirect('/');
        } catch (error) {
            res.render("login", {
                error: "incorrect email or password",
            });

        }
    });
router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/');
});

module.exports = router;