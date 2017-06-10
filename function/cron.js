const cron = require('node-cron');

module.exports = {
	init: function(){
		console.log('Cron task planned')
		cron.schedule('59 23 * * *', function(){
		  console.log('Running Cron task');
		  scrapr.init()
		});
	}
}