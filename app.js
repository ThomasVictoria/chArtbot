const cron = require('node-cron');

const scrapr = require('./scrapr/scraper')

cron.schedule('* 59 23 * *', function(){
  console.log('Running Cron task');
  scrapr.init()
});