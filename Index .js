const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")
const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://draj56227:XK2aW7D1D7Ezb1W4@cluster0.4c37imz.mongodb.net/IMGPROJECT?retryWrites=true&w=majority" , 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const tempelatePath=path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/createjoin",(req,res)=>{
    res.render("createjoin")
})

app.get("/end",(req,res)=>{
    res.render("end")
})

app.get("/game",(req,res)=>{
    res.render("game")
})

app.get("/highscores",(req,res)=>{
    res.render("highscores")
})


app.post("/signup",async(req,res)=>{

const data={
    name:req.body.name,
    password:req.body.password,
    email:req.body.email
}

await collection.insertMany([data])  

res.render("login")

})

app.post("/login",async(req,res)=>{

    try{
        const check=await collection.findOne({name:req.body.name})  
        if(check.password===req.body.password && check.email===req.body.email){
            res.render("createjoin")
        }

        else{
            res.send("Wrong Name or Password")
        }
    
    }
    catch{}
    
})

app.listen(8000,()=>{
    console.log("port connected");
})
