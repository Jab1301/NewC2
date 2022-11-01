let express = require('express');
let app = express();

app.use(express.json());

let Datastore = require('nedb');
let db = new Datastore('cow.db')
db.loadDatabase();

let allMessages = [];


app.use("/", express.static("public"))




//POST route for message
app.post("/message", (req,res) => {
    console.log(req.body);
    //allMessages.push(req.body.msg);

    //message data into the data base

    db.insert(allMessages, (err, newDocs) => {
        console.log('new doc inserted')
        if(err) {
            res.send({task: "tasked failed"});
        } else{
            res.send({status : "ok"});
        }
        
    })
    //console.log(allMessages);
 
})

//track "type anaything" files in public
app.get("/messages", (req,res) => {

    db.find({}, (err,docs) => {
        //console.log(docs);
        if (err) {
            res.send({task: "tasked failed"});
        }else{
            app.get("/cows", (req,res) => {
                let obj = {data : allMessages};
               res.json(obj);
            })
        }
    })
    res.json({
        "msgs" : allMessages
    })
})
//where the app is running
let port = process.env.PORT || 8000;
app.listen(8000, () => {
    console.log("app is running at local host:8000");
})
//add route to get all coffee track information
//app.get("/cows", (req,res) => {
    //let obj = {data : allMessages};
   //res.json(obj);
//})
