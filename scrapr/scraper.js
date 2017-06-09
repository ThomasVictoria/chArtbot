const artoo   = require('artoo-js'),
	  cheerio = require('cheerio');
	
var route = require('./function/route');

const domain = 'http://www.lesartsdecoratifs.fr/'

module.exports = {
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

		route.scrap_route(current_event, domain, "current")
		route.scrap_route(futur_event, domain, "futur")
	}
}