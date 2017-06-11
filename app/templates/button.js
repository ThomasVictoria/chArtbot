var button = {
	eventType: function(senderId, text){
		return {
			recipient: {
				id: senderId
			},
			message: {
				attachment: {
					type: 'template',
					payload: {
						template_type: 'button',
						text: text,
						buttons:[
							{
								type: 'postback',
								title: 'Évènements en cours',
								payload: 'current'
							},
							{
								type: 'postback',
								title: 'Évènements à venir',
								payload: 'futur'
							},
							{
								type: 'postback',
								title: 'Une vidéo :)',
								payload: 'video'
							}
						]
					}
				}
			}
		}
	},
	knowMore: function(senderId, object, text){
		return {
			recipient: {
				id: senderId
			},
			message: {
				attachment: {
					type: 'template',
					payload: {
						template_type: 'button',
						text: text,
						buttons:[
							button.linkButton(object.article_url, "Page de l'exposition"),
							button.linkButton(object.acces, "Lieux"),
							button.linkButton(object.horaires, "Horaires et tarifs")
						]
					}
				}
			}
		}
	},
	postbackButton: function(payload, text){
		return {
			title: text,
			type: 'postback',
			payload: payload
		}
	},
	linkButton: function(url, title){
		return {
			title: title,
			type: 'web_url',
			url: url
		}
	},
	askContinue: function(senderId, text){
		return {
			recipient: {
				id: senderId
			},
			message: {
				attachment: {
					type: 'template',
					payload: {
						template_type: 'button',
						text: text,
						buttons:[
							button.postbackButton('continue','Non'),
							button.postbackButton('stop', 'Oui, merci :)' )
						]
					}
				}
			}
		}
	},
	readMoreLink: function(senderId, url, title, text) {
		return {
			recipient: {
				id: senderId
			},
			message: {
				attachment: {
					type: 'template',
					payload: {
						template_type: 'button',
						text: text,
						buttons:[
							button.linkButton(url, title),
						]
					}
				}
			}
		}
	}
}

module.exports = button