const express = require("express")
const hbs = require("hbs");
const fs = require("fs");


var port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + "/views/partials")
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
})

hbs.registerHelper("upperIt", (msg) => {
    return msg.toUpperCase()
})


var app = express();

app.set("view engine", "hbs")

app.use((req, res, next) => {


    var log = `Date: ${new Date().toString()} Method: ${req.method} Url: ${req.url}`;
    fs.appendFile("server.log", log + "\n", (error) => {

        if (error) {
            console.log(error);
        }
    })


    next();

});

/*app.use((req, res, next)=>{

    res.render("maintenance")

});*/
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {

    res.render("home",
        {
            welcomeMsg: "Welcome to my website",
            title:"home page"
        })
});

app.get("/about", (req, res) => {
    res.render("about", {
        welcomeMsg: "Welcome to my about web page",
        title:"about"
    })
})


app.get("/portfolio", (req, res) => {
    res.render("about", {
        welcomeMsg: "Welcome to my portfolio web page",
        title: "portfolio"
    })
})



app.listen(port, () => {
    console.log(`Starting connecting to server with port ${port}...`)
});