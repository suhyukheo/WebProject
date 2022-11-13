const express = require('express');
const app = express();
const path = require('path')


app.use("/src",express.static(path.resolve(__dirname,"frontend","src")))

app.get('/', function(req,res) { 
  res.sendFile(path.resolve("frontend",'index.html'))
});
app.get('*',function(req,res) { 
  res.sendFile(path.resolve("frontend",'404.html'))
});
app.listen(8080, function() {
  console.log('listening on 8080')
})