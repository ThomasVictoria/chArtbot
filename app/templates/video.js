module.exports = {
	videoMessage: function(senderID){
		return {
			recipient: {
				id: senderID,
			},
			message: {
				attachment: {
					type: 'video',
					payload: {
						url: 'http://techslides.com/demos/sample-videos/small.mp4'
					}
				}
			}
		}
	}
}