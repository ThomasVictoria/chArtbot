const button = require('./button')

const list = module.exports = {
	parseObject: function(object) {
		return {
			title: object.title,
			image_url: object.image_link,
			subtitle: object.dates.charAt(0).toUpperCase() + object.dates.slice(1) + " à " + object.address,
			buttons: [
				button.postbackButton('readMore'+object._id, 'En savoir plus'),
				button.linkButton(object.acces, 'Accès'),
				button.linkButton(object.horaires, 'Horaires et tarifs'),
			]
		}
	},
	makeList: function(senderID, objects) {
		var result = [];
		objects.forEach(function(object){
			result.push(list.parseObject(object))
		})
		return { 
			recipient: {
				id: senderID,
			},
			message: {
				attachment: {
					type: 'template',
					payload: {
						template_type: 'generic',
						elements: result
					}
				}
			}
		}
	}
}

module.exports = list