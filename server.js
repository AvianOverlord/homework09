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
    res.json(getJSON);
});

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/api/notes",function(req,res){
    let allNotes = getJSON();
    let newID = determineID(allNotes);
    let newNote = {title: req.body.title, text: req.body.text, id: newID};
    allNotes.push(newNote);
    allNotes = JSON.stringify(allNotes);
    fs.writeFileSync("./db/db.json",allNotes);
    res.sendFile(path.join(__dirname,"notes.html"));
});

app.delete("/api/notes/:id",function(req,res)
{
    let allNotes = getJSON();
    let newNotes = [];
    let id = req.params.id;

    allNotes.forEach(targetNote => {
        if(targetNote.id !== id)
        {
            newNotes.push(targetNote);
        }
    });
    newNotes = JSON.stringify(newNotes);
    fs.writeFileSync("./db/db.json",newNotes);
    res.sendFile(path.join(__dirname,"notes.html"));    
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  
function getJSON()
{
    let allNotes = fs.readFileSync("./db/db.json");
    allNotes = JSON.parse(allNotes);
    return allNotes;
}

function determineID(notes)
{
    let currentCount = 0;
    notes.forEach(targetNote => {
        if(targetNote.id == currentCount)
        {
            currentCount++;
        }
    });
    return currentCount;
}
