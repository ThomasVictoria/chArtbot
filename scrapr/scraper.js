const artoo   = require('artoo-js'),
	  cheerio = require('cheerio');
	
var route = require('./function/route'),
	db	  = require('./function/item');

const domain = 'http://www.lesartsdecoratifs.fr/'

var scraper = {
	init: function(){
		artoo.bootstrap(cheerio);

		var current_event = {
			method: "GET",
			url: domain+'?page=expo-actu'
		}

		var futur_event = {
			method: "GET",
			url: domain+'?page=expo-avenir'
		}

		db.clean()
		route.scrap_route(current_event, domain, "current")
		route.scrap_route(futur_event, domain, "futur")
	}
}
module.exports = scraper