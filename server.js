const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const { handleSignin } = require("./controllers/signin");
const { handleProfile } = require("./controllers/profile");
const { handleImage, handleImageUrl } = require("./controllers/image");
const { handleRegister } = require("./controllers/register");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "wawa",
    password: "",
    database: "facedetect",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("server is working");
});

app.post("/signin", (req, res) => handleSignin(req, res, bcrypt, db));

app.post("/register", (req, res) => handleRegister(req, res, bcrypt, db));

app.get("/profile/:id", (req, res) => handleProfile(req, res));

app.post("/imageurl", (req, res) => handleImageUrl(req, res));

app.put("/image", (req, res) => handleImage(req, res, db));

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
