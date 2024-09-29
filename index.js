import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const ApiURL = "https://v2.jokeapi.dev/joke/";

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(ApiURL + "Any?type=single");
    let joke = result.data.joke;

    res.render("index.ejs", {
      joke: joke,
    });
  } catch (error) {
    console.log("Something is wrong with homepage");
    res.render("index.ejs", {
      joke: null,
      setup: null,
      delivery: null,
    });
  }
});

app.get("/get-joke", async (req, res) => {
  try {
    const category = req.query.category;
    const result = await axios.get(ApiURL + category);

    let joke = "";
    let setup = "";
    let delivery = "";

    if (result.data.type === "twopart") {
      setup = result.data.setup;
      delivery = result.data.delivery;
    } else {
      joke = result.data.joke;
    }

    res.render("index.ejs", {
      joke: joke,
      setup: setup,
      delivery: delivery,
    });
  } catch (error) {
    console.log("Something is wrong in get joke ");
    res.render("index.ejs", {
      joke: null,
      setup: null,
      delivery: null,
    });
  }
});

app.listen(port, () => {
  console.log(`The server is running on port: ${port}.`);
});
