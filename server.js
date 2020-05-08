const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));

let allNotes = [];
fs.readFile(path.join(__dirname, "db/db.json"), "utf-8", function(err, data){
    if(err) return console.log(err)
    allNotes = JSON.parse(data);
});

app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"notes.html"));
});

app.get("/api/notes",function(req,res){
    res.json(allNotes);
});

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/api/notes",function(req,res){
    let newID = determineID(allNotes);
    let newNote = {title: req.body.title, text: req.body.text, id: newID};
    allNotes.push(newNote);
    let allNotesString = JSON.stringify(allNotes);
    fs.writeFileSync("./db/db.json",allNotesString);
    res.sendFile(path.join(__dirname,"notes.html"));
});

app.delete("/api/notes/:id",function(req,res)
{
    let updatedNotes = [];
    allNotes.forEach( note => {
        if( note.id !== parseInt(req.params.id) ){
            updatedNotes.push(note)
        }
    });
    allNotes = updatedNotes;
    fs.writeFileSync("./db/db.json",JSON.stringify(allNotes));
    res.json({ok: true});
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  
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
