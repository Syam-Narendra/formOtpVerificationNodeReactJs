const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
const accountSid = 'ACdb952fdd6a8b53a1c39b007b10f71d46';
const authToken = '{}';
const client = require('twilio')(accountSid, authToken);

let otpNumber;
app.get('/', (req, res) => {
    res.send(JSON.stringify("hello world"))
})

app.post('/send-otp', async(req, res) => {
    try{
        const {number} = req.body
        const generatedOtp = Math.floor(Math.random() * 100000);
        otpNumber = generatedOtp
        console.log(generatedOtp)
        const bodyParams = {body: 'Your One Time Password is '+ generatedOtp, from: '+12566459736', to: '+91'+number}
        const message = await client.messages.create(bodyParams)
        
        res.send(message)
    }catch(err){
        res.send(JSON.stringify(err.status));
    }

});

app.post('/verify-otp',(req, res) => {
    const {userOtp} = req.body;
    console.log(userOtp);
    res.send(userOtp==otpNumber);
    
});

app.listen(4000,() => {
    console.log("listening on port 4000")
})





















