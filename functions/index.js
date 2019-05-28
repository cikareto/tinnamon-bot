const functions = require('firebase-functions');
const request = require('request-promise');

const Constants = require('./constants');

exports.TinnamonBot = functions.https.onRequest((req, res) => {
    if(req.body.events[0].message.type !== 'text') {
        return;
    }
    reply(req.body);
});

const reply = bodyResponse => {
    return request({
        method: `POST`,
        uri: `${Constants.LINE_MESSAGING_API}/reply`,
        headers: Constants.LINE_HEADER,
        body: JSON.stringify({
            replyToken: bodyResponse.events[0].replyToken,
            messages: [
                {
                    type: `text`,
                    text: bodyResponse.events[0].message.text
                }
            ]
        })
    });
};
