const artoo = require('artoo-js'),
	request = require('request'),
    cheerio = require('cheerio'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    encoding    = require('encoding');

var db_url = 'mongodb://localhost:27017/chartbot'

module.exports = {
	scrape: function(element, root, type){
		var options = {
			method: "GET",
			url: root+element.link
		}

		request(options, (error, response, body) => {
			var $ = cheerio.load(body);
			var that = this
			var title = $('header div.centrer').scrape({
				title: {
					sel: 'h1',
					method: 'text',
				},
				dates: function(){
					return that.clean_string($(this).find('h2').text())
				}
			})
			if (type == "current"){
				var image = $('#logo_une .image').scrape({
					image_link: function(){
						path = $(this).find('a').attr('href')
						return root+path
					}
				})
			} else {
				var image = $('section.le_logo a').scrape({
					image_link: function(){
						path = $(this).find('img').attr('src')
						return root+path
					}
				})
			}		
			var header = $('.chapeau p').scrape({
				header: 'text'
			})

			var info = $('section.colonnes_texte .col_annexe div.contenu_h3').scrape({
				address: function(){
					if (typeof $(this).find('p strong').html() == "string") {
						return $(this).find('p strong').html().split("<br class=\"manualbr\">").join(" ").split("&#xE9;").join("é")
					}
				},
				horaires: function(){
					return root+$(this).find('p a:last-child').attr('href')
				},
				acces: function(){
					return root+$(this).find('p a:first-child').attr('href')
				}
			})

			that.save(Object.assign(header[0], image[0], title[0], info[0]), type)
		})
	},
	clean_string: function(string){
		return string.replace(/(?:\r\n|\r|\n)/g, ' ').replace( /  +/g, ' ' ).replace('Hashtag', '');
	},
	save: function(object, type){
		MongoClient.connect(db_url, function(err, db) {
			assert.equal(null, err);
			console.log("Connected successfully to server");
			console.log("Saving "+type+" events");
			
			db.collection(type).drop()
			db.collection(type).insert(object)
			db.close();
		});
	}
}