const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
const dirpath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../template/views");
const partialpath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialpath);

app.use(express.static(dirpath));
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Afroz Quraishi",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "Reach out to me",
        title: "Help",
        name: "Afroz Quraishi",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Afroz Quraishi",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please provide the address!",
        });
    }
    const address = req.query.address;
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }

        forecast(longitude, latitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            res.send({
                forecast: forecastdata,
                location,
                address,
            });
        });
    });
});

app.get("/product", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please enter any search title",
        });
    }
    res.send({
        product: [],
    });
});
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Afroz Quraishi",
        errorMsg: "Help page Not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Afroz Quraishi",
        errorMsg: "Page Not Found",
    });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
