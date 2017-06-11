const cron = require('node-cron');

module.exports = {
	init: function(){
		console.log('Cron task scheduled')
		cron.schedule('40 * * * *', function(){
		  console.log('Running Cron task');
		  scrapr.init()
		});
	}
}