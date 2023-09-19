const express = require('express');
const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send(JSON.stringify("hello world"))
})

app.listen(4000,() => {
    console.log("listening on port 4000")
})