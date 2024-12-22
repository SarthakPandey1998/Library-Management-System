const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const mongoClient = require("mongodb").MongoClient;

const constr="mongodb://127.0.0.1:27017";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.resolve(__dirname, "../public/uploads"))
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({storage:storage});

const app = express();
app.use(cors({
    origin:"*",
    method:["get","post"]
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.post("/student",upload.fields([{name:"photo",maxCount:1},{name:"video",maxCount:1}]),(req,res,next)=>{
    mongoClient.connect(constr).then((clientObj)=>{
        var database = clientObj.db("lms");
        const data ={
            name:req.body.name,
            class:req.body.class,
            photo:req.files.photo?`uploads/${req.files.photo[0].filename}`:null,
            video:req.files.video?`uploads/${req.files.video[0].filename}`:null,
        }
        database.collection("students").insertOne(data)
        .then(()=>{
            console.log("Student data submitted");
            res.status(200).send("Data successfully uploaded");
            res.end();
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send("Error submitting data");
            res.end();
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send("Error connecting with database")
        
    })
});

app.post("/book",(req,res,next)=>{
    mongoClient.connect(constr).then((clientObj)=>{
        var database = clientObj.db("lms");

        const data = {
            name: req.body.name,
            author: req.body.author,
            publication: req.body.publication,
            year: req.body.year,
        }
        database.collection("book").insertOne(data).then(()=>{
            console.log("Book data submitted");
            res.end();
        })
    })
})

app.get("/student",(req,res,next)=>{
    mongoClient.connect(constr).then((clientObj)=>{
        var database = clientObj.db("lms");
        database.collection("students").find({}).toArray().then((documents)=>{
            res.send(documents);
            res.end();
        })
    })
})

app.get("/book",(req,res,next)=>{
    mongoClient.connect(constr).then((clientObj)=>{
        var database = clientObj.db("lms");
        database.collection("book").find({}).toArray().then((documents)=>{
            res.send(documents);
            res.end();
        })
    })
})





app.listen(5000);
console.log(`Server started http://127.0.0.1:5000`);
