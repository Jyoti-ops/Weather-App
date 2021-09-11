const { response } = require("express");
const express=require("express");
const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
const https=require("https");
app.get("/", function (req,res) {
    res.sendFile(__dirname+"/index.html");
    


})
app.post("/",function (req,res) {
   
    
    const query=req.body.cityName;
    const appid="d732f4b968dbc31fffd8ae6cd9caf83e"
    
    const unit="metric";
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appid+"&units="+unit,function (response) {
    console.log(response.statusCode);

response.on("data",function(data) {
  const weatherdata=JSON.parse(data);

const temp= weatherdata.main.temp;
const weatherdiscription=weatherdata.weather[0].description;
const ic=weatherdata.weather[0].icon;
console.log(temp);
res.write("<p>The weather is currently "+weatherdiscription+"</p>");


res.write("<h3>the temp in "+query+" is "+temp+"degree celcius.</h3>");
res.write("<img src=http://openweathermap.org/img/wn/"+ic+"@2x.png></img>");
res.send();
})
})
})

app.listen(3000,function () {
    console.log("server started");
    
})