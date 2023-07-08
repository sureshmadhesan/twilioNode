const Router = require("express").Router;
const { tokenGenerator, voiceResponse } = require("./handler");
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN);

const router = new Router();

router.get("/token", (req, res) => {
  res.send(tokenGenerator());
});

router.get('/callLogs', (req, res) => {
        client.calls.list({ limit: 10 })
            .then(calls => res.send(calls));
    })

router.post("/voice", (req, res) => {
  res.set("Content-Type", "text/xml");
  res.send(voiceResponse(req.body));
});

module.exports = router;
