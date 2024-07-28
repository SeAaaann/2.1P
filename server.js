const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/subscribe', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    const data = {
        from: 'binyang sun <binyangsun@gmail.com>',
        to: email,
        subject: 'Welcome',
        text: 'Thanks for subscribe Deakin Newspaper.'
      };
       
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });

    console.log(`Received subscription request: ${firstname} ${lastname}, ${email}`);

    res.send('Subscription successful!');
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const api_key = '18fefcd7825b0eb7839400019cb93a88-0f1db83d-dde286c1';
const domain = 'sandbox9835fe7628dc4832877dfff9e909c908.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
