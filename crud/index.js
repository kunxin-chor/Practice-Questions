// SETUP BEGINS
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const axios = require("axios");

let app = express();
app.set("view engine", "hbs"); // tell express to use hbs as the view engine
app.use(express.static("public")); // tell express where to find static files (css, json,  geojson, image files, js)

wax.on(hbs.handlebars); // for template inheritance
wax.setLayoutPath("./views/layouts"); // tell wax-on where to find the layout file

// !! Enable forms processing
app.use(
  express.urlencoded({
    extended: false
  })
);

const baseURL = "https://ckx-movies-api.herokuapp.com";
// SETUP END

// SETUP THE ROUTES
app.get("/movies", async (req, res) => {
  let response = await axios.get(baseURL + "/movies");

  res.render("display-movies.hbs", {
    all_movies: response.data
  });
});


app.get("/movies/create", (req, res) => {
  res.render("add-movies.hbs");
});

app.post('/movies/create', async (req,res)=>{
    let title=req.body.title
    let plot=req.body.plot
    let newMovie={
        'title':title,
        'plot':plot
    }
    await axios.post(baseURL + '/movie/create', newMovie);
  res.redirect("/movies")
})



// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
})