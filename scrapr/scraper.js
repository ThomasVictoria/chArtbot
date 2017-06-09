const artoo = require('artoo-js'),
	request = require('request')
    cheerio = require('cheerio');

const domain = 'http://www.lesartsdecoratifs.fr/'

var item = require("./function/item")
var result = {}
artoo.bootstrap(cheerio);

var options = {
	method: "GET",
	url: domain+'?page=expo-actu'
}

request.get(options, (error, response, body) => {
	var $ = cheerio.load(body);
	var items = $('ul.liste_enfants li a').scrape({
		link: 'href',
	})

	items.forEach((element) => {
		console.log(item.scrape(element, domain))
	})
})