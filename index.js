const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//middleware
const {checkForAuthenticationCookie } = require('./middlewares/auth');
//routes
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

mongoose.connect('mongodb://127.0.0.1:27017/blog-app')
    .then(() => console.log("mongodb connected"));
// console.log(path);
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());


app.use(checkForAuthenticationCookie("token"));


app.get('/', (req, res) => {
    res.render('home', {
        user:req.user,
    });
})

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.listen(port, () => console.log("server started at port :", port));