const mongoose = require("mongoose");
const express = require("express");
const LoginVerification = require("./utils/loginVerification");
const insertCredentials = require("./utils/Admin/insertCredentials.js")
const removeCredentials = require("./utils/Admin/removeCredentials.js")
const rouletteHistoryQuery = require("./utils/rouletteHistoryQuery");
const dozenCounter = require("./utils/dataProcessing/dozenCounter");
const columnCounter = require("./utils/dataProcessing/columnCounter");
const brotherNumberCounter = require("./utils/dataProcessing/brotherNumberCounter");
const repCounter = require('./utils/dataProcessing/repCounter');
const deviceCheck = require('./utils/deviceManagement/deviceCheck.js')
const cors = require("cors");
require('dotenv').config();
const jwt = require('jsonwebtoken');

mongoose.connect("mongodb+srv://rouletteDatabase:quevoa05@cluster0.tttmthz.mongodb.net/?retryWrites=true&w=majority");

const port = process.env.PORT || 8000

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization"
  );
  next();
});

app.post("/login", async (req, res) => {
  const adminUsername = 'adminVegasRoulett';
  const adminPassword = 'admin1296##';
  const fingerprint = req.headers['user-agent'] + req.ip;
  if(req.body.username == adminUsername && req.body.password == adminPassword){
    const adminToken = jwt.sign('admin',process.env.ACESS_TOKEN_SECRET);
    res.json(adminToken);
  }
  else {
    const result = await LoginVerification(req.body,fingerprint);
     if (result === true) {
       const acessToken = jwt.sign('user',process.env.ACESS_TOKEN_SECRET);
       res.json(acessToken);
     } else if (result === false ) {
      res.sendStatus(401);
    }
  }
});

app.post("/deviceCheck", async (req,res)=>{
  const fingerprint = req.headers['user-agent'] + req.ip;
  const result = await deviceCheck(req.body.username, fingerprint);
  if(result === true) {
    res.json({"device": true})
  }
  else if(result === false){
    res.json({"device": false})
  }
})

app.get("/user", async(req, res) => {
  console.log(req.socket.remoteAddress);
  res.send(req.socket.remoteAddress)
})

app.post("/admin/account/insert",async (req, res) => {
  console.log(req.body)
  const result = await insertCredentials(req.body) 
  result === true?res.send('credentials insert with sucess'):res.send('erro, please verify your credentials')
})

app.post("/admin/account/delete", async(req,res) => {
  const result = await removeCredentials(req.body) 
  result === true?res.send('credentials removed with sucess'):res.send('erro, credentials do not exist')
})

app.get("/rouletteHistory", async (_, res) => {
  const rouletteHistory = await rouletteHistoryQuery();
    if (rouletteHistory === null){
      res.send('server erro, please contact the suport for information');
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

app.post("/authenticate", authenticateToken, (req, res)=>{
  if(req.user === 'admin') return res.json({'privilege' : 'admin'});
  if(req.user === 'user') return res.json({'privilege' : 'user'});
})


function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) =>{
    if(err) return res.sendStatus(403)
    req.user = user;
    next()
  })
}

app.listen(port, () => {
  console.log("we are listening");
});
