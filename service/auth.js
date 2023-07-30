// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secretKey = "sahil@123"
function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secretKey);
}
function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
   
}

module.exports = {
    setUser,
    getUser,
};