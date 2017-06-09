const request = require('request'),
      cheerio = require('cheerio');

const item = require('./item');

module.exports = {
	scrap_route: function(options, domain){
		request.get(options, (error, response, body) => {
			var $ = cheerio.load(body);
			var items = $('ul.liste_enfants li a').scrape({
				link: 'href',
			})

			items.forEach((element) => {
				item.scrape(element, domain)
			})
		})
	}
}