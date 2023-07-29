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
    sessionId = uuidv4(); // creates random unique id
    setUser(sessionId, user); 
    res.cookie('uid', sessionId); // setting cookie with name 'uid'
    return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn,
}