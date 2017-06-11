const bodyParser = require('body-parser'),
	  express = require('express'),
	  https = require('https');

const scrapr = require('./scrapr/scraper'),
	  verify = require('./app/verify'),
	  cron   = require('./app/cron'),
	  oauth   = require('./app/oauth'),
	  handler   = require('./app/handler'),
	  app = express();

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: verify.verifyRequestSignature }));
app.use(express.static('public'));

// webhooks 
app.get('/webhook', oauth.webhook);
app.post('/webhook', handler.receive);

// test route
app.get('/test',function (req, res) {
  res.send('Hello World!');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

cron.init()

module.exports = app;