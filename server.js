const mongoose = require("mongoose");
const express = require("express");
const LoginVerification = require("./utils/loginVerification");
const rouletteDataUpdate = require("./utils/rouletteDataUpdate");
const rouletteHistoryQuery = require("./utils/rouletteHistoryQuery");
const dozenCounter = require("./utils/dataProcessing/dozenCounter");
const columnCounter = require("./utils/dataProcessing/columnCounter");
const brotherNumberCounter = require("./utils/dataProcessing/brotherNumberCounter");
const repCounter = require('./utils/dataProcessing/repCounter');
const cors = require("cors");
require('dotenv').config();

mongoose.connect("mongodb+srv://rouletteDatabase:quevoa05@cluster0.tttmthz.mongodb.net/?retryWrites=true&w=majority");
// Iniciando o Scraping e update do banco de dados
// e reiniciando conforme necessário
async function restart() {
  try {
    rouletteDataUpdate();
  } catch (err) {
    console.log(err + "server restarting");
    restart();
  }
}
restart();

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/login", async (req, res) => {
  const result = await LoginVerification(req.body);
  if (result === null) {
    res.send("notfound");
  } else if (result !== null) {
    res.send("found");
  }
  console.log("verification made");
});

app.get("/rouletteHistory", async (req, res) => {
  const rouletteHistory = await rouletteHistoryQuery();
  if (rouletteHistory === null) {
    res.send("ServerError, wait a minute or contact the support");
  } else {
    const rouletteDozenCounter = dozenCounter(rouletteHistory);
    const rouletteColumnCounter = columnCounter(rouletteHistory);
    const rouletteBrotherCounter = brotherNumberCounter(rouletteHistory);
    const rouletteRepCounter = repCounter(rouletteHistory);

    res.json({
      rouletteHistory,
      rouletteDozenCounter,
      rouletteColumnCounter,
      rouletteBrotherCounter,
      rouletteRepCounter
    });
  }
});

app.listen(8000, () => {
  console.log("we are listening");
});
