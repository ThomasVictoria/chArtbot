module.exports = {
	textMessage: function(senderId, messageText){
		return {
			recipient: {
				id: senderId
			},
			message: {
				text: messageText,
			}
		}
	}
}