// create a url shortner
// redirect user to original url
// return clicks for the short url
const express = require("express");
const { connectToMongoDB } = require("./connect");


const URL = require("./models/url");
const path = require('path');
const cookieParser = require('cookie-parser');
const { checkForAuthentication,restrictTo
} = require('./middleware/auth')
const app = express();
const PORT = 8001;

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user')

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("Mongodb connected")
);

app.set("view engine", "ejs") // to tell which type of view  engine we are using
app.set("views", path.resolve("./views")); // to tell where are our v
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// app.get('/test', async (req, res) => {
//     const allUrl = await URL.find({});
//     return res.end(`
//    <html>
//    <head></head>
//    <body>
//     ${allUrl.status(200).map(url => `<li> ${url.shortId}-${url.redirectURL}-${url.visitHistory.length}</li>`).join('')}
//    </body>
//    </html>
//     `)
// });

// or 
// app.get('/test', async (req, res) => {
//     const allUrl = await URL.find({});
//     return res.render("home", {
//         urls: allUrl,
//     });
// });



app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/" , staticRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry?.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));


