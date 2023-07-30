const { getUser} = require('../service/auth');
async function restrictToLoggedInUserOnly(req, res, next) {
    // console.log(req);
    const userId = req.headers['authorization'];
    if (!userId) return res.redirect('/login');
    const token = userId.split("Bearer ")[1] // gives value in Autherization header
     // const value = "bearer 4643643483948hjhjjh"
    // value.split("bearer ")[1]
    // ans:   4643643483948hjhjjh

    const user = getUser(token);

    if (!user) return res.redirect('/login');

    req.user = user;
    next();
}
async function checkAuth(req, res, next) {
        console.log(req.headers);

    const userId = req.headers["authorization"];
    const token = userId.split("Bearer ")[1] // gives value in Autherization header

    const user = getUser(token);
    req.user = user;
    next();
}
module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}