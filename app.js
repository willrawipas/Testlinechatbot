/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Reply using AIML, parsing data with AIMLParser

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const AIMLParser = require('aimlparser');

const app = express();
const port = process.env.PORT || 4000;
const aimlParser = new AIMLParser({ name:'Bot' });

aimlParser.load(['./test-aiml2.xml']);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken;
    let msg = req.body.events[0].message.text;
    aimlParser.getResult(msg, (answer, wildCardArray, input) => {
        reply(reply_token, answer);
    });
    res.sendStatus(200);
});

app.listen(port);

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {KwAHd1YyNEYini7ev0Gd7uVlxeNwnkrhd8U+6P880JEmB9rUR0kuVYED5dgHyoneZksJtd233rHMIr+8xQ48W1Rr4F27qVUKTZamiDNt7trnax4Dn4wj2gHxABulmePDcMxl/waRoqjom9mQX5N7lAdB04t89/1O/w1cDnyilFU=}'
    };

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    });

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
    

app.get('/', (req, res) => {
  res.send('Hello from Node.js RESTful API');
});
}