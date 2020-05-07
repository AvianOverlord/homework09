const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"notes.html"));
});

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
});

/*app.get("/api/notes",function(req,res){
    console.log(path.join(__dirname,"db/db.json"));
    res.json(path.join(__dirname,"db/db.json"));
});

app.post("/api/notes",function(req,res){

});*/

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  

