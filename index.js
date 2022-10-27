//Express is used for server creation
const express = require('express');
const mongoose = require('mongoose');
const jwt=require("jsonwebtoken")

const app = express(); 
const routes=require("./Router/routes")
app.use(express.json());
/*
app.use(function(req,res,next){

    console.log("----------------------------------------------------------");
    console.log(req.headers.authorization);
    console.log("----------------------------------------------------------");

    if(
        req.headers && 
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0]==="JWT")
    {
        jwt.verify(req.headers.authorization.split(" ")[1],"qwertyuiop",(err,decode) =>{
            if(err){    req.user = undefined; }
            req.user = decode;
            next();
        })
    }
    else{
        req.user = undefined;
        next();
    }
})

*/

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'qwertyuiop', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });
  
//const routes=require("./Router/routes")

app.use('/welcome', (req, res) => {
    res.send("<h2>Welcome To </h2><h1>   Blue Yoner 2022</h1><h2> Training Module.</h2>");
  });


  var PORT = 8082;
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

// Add Router for CURD Operation
app.use("/user",routes)

// connecting to a databse with mongoose library (mongoose.connect())
const uri = "mongodb+srv://jontysingla:Beatsaudio123@cluster0.q30uesj.mongodb.net/node_jwt?retryWrites=true&w=majority"

//app.use("/user",routes)
mongoose.connect(
    uri,{
        useNewUrlParser:true
    }).then( () => {
        console.log("Database Connected");

    }).catch(
        (err)=>{
            console.log(err);
        }
    )

    
