module.exports = {
	eventType: function(senderId){
		return {
			recipient: {
				id: senderId
			},
			message: {
				attachment: {
					type: 'template',
					payload: {
						template_type: 'button',
						text: 'Sur quel type d\'évenement voulez vous vous renseigner?',
						buttons:[
							{
								type: 'postback',
								title: 'Les évènements en cours',
								payload: 'current'
							},
							{
								type: 'postback',
								title: 'Les évènements à venir',
								payload: 'futur'
							},
							{
								type: 'postback',
								title: 'Les évènements à venir',
								payload: 'video'
							}
						]
					}
				}
			}
		}
	},
	readMore: function(id){
		return {
			title: 'En savoir plus',
			type: 'postback',
			payload: 'readMore'+id
		}
	},
	linkButton: function(url, title){
		return {
			title: title,
			type: 'web_url',
			url: url
		}
	}
}