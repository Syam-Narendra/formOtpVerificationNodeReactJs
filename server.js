const express = require('express');
const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

const accountSid = 'ACdb952fdd6a8b53a1c39b007b10f71d46';
const authToken = '8d25fd50a101778ad860b6bc3b77ac38';
const client = require('twilio')(accountSid, authToken);

let otpNumber;
app.get('/', (req, res) => {
    res.send(JSON.stringify("hello world"))
})

app.get('/send-otp', async(req, res) => {
    try{
        const generatedOtp = Math.floor(Math.random() * 100000);
        otpNumber = generatedOtp
        const bodyParams = {body: 'Your One Time Password is '+ generatedOtp, from: '+12566459736', to: '+919494909811'}
        const message = await client.messages.create(bodyParams)
        res.send(message)
    }catch(err){
        res.send(JSON.stringify(err.status));
    }

});

app.get('/verify-otp',(req, res) => {
    
});

app.listen(4000,() => {
    console.log("listening on port 4000")
})





















