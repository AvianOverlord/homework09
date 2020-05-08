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

app.get("/api/notes",function(req,res){
    let allNotes = fs.readFileSync("./db/db.json");
    allNotes = JSON.parse(allNotes);
    console.log(allNotes);
    res.json(allNotes);
});

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/api/notes",function(req,res){
    const newJson = JSON.stringify(req);   
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  

