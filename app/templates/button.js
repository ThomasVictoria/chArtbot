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
							}
						]
					}
				}
			}
		}
	}
}