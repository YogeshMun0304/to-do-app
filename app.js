const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
var items=[];
app.use(express.static("public"));
mongoose.connect("mongodb+srv://yogesh:Yogesh@12mundra@cluster0.ekfngnu.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },() =>{
    console.log("connected");
})
const todoSchema = new mongoose.Schema({
    name: String

});
const todo = new mongoose.model("todo",todoSchema);
const item1 = new todo({
    name: "welcome"
})
const item2 = new todo({
    name: "hit"
})
const item3 = new todo({
    name: "delete"
})
const defaultItems = [item1,item2,item3];
todo.insertMany(defaultItems,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("succesfully saved");
    }
})



app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday:"long",
        day :"numeric",
        month: "long"
    };
    var day= today.toLocaleDateString("en-US",options);
    res.render("list",{kindofday:day,nli:items});
})
app.post("/",function(req,res){
   var item = req.body.newitem;
   items.push(item);
    res.redirect("/");
})
app.listen(3000, function () {
    console.log("server started");
})