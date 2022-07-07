const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5000;
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let dbString = process.env.DB_STRING;
