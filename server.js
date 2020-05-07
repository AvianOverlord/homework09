const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*",function(res,req){
    res.sendFile(path.join(__dirname,"/index.js"));
});

app.get("/notes",function(res,req){
    res.sendFile(path.join(__dirname,"/notes.html"));
});

/*app.get("/api/notes",function(res,req){
    res.json(path.join(__dirname,"/db/db.json"));
});

app.post("/api/notes",function(res,req){

});*/

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  

