const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser} = require('../service/auth');

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
}
async function handleUserLogIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.render('login', {
        LogInError: "invalid user name or password",
    })
    const token = setUser(user);
   
    return res.json({ token });
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn,
}