const cron = require('node-cron'),
	  scrapr = require('../scrapr/scraper');

module.exports = {
	init: function(){
		console.log('Cron task scheduled')
		cron.schedule('59 * * * *', function(){
		  console.log('Running Cron task');
		  scrapr.init()
		});
	}
}