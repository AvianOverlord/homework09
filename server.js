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
    res.json(processJSON);
});

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/api/notes",function(req,res){
    let allNotes = processJSON();
    let newID = determineID(allNotes);
    let newNote = {title: req.body.title, text: req.body.text, id: newID};
    allNotes.push(newNote);
    allNotes = JSON.stringify(allNotes);
    fs.writeFileSync("./db/db.json",allNotes);
    res.end();
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  
function processJSON()
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
