const bodyParser = require('body-parser'),
	  express = require('express'),
	  https = require('https');

const scrapr = require('./scrapr/scraper'),
	  verify = require('./function/verify'),
	  cron   = require('./function/cron'),
	  app = express();

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: verify.verifyRequestSignature }));
app.use(express.static('public'));

// test route
app.get('/test',function (req, res) {
  res.send('Hello World!');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

cron.init()

module.exports = app;