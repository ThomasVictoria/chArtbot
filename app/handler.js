const request  = require('request'),
	  text	   = require('./templates/text'),
	  list	   = require('./templates/list'),
	  mongo	   = require('./templates/mongo'),
	  button   = require('./templates/button'),
	  video    = require('./templates/video'),
	  variable = require('../variable');

var handler = {
	receive: function (req, res) {
		var data = req.body;
		if (data.object == 'page') {
		
		data.entry.forEach((pageEntry) => {
			pageEntry.messaging.forEach((event) => {
				console.log(event)

				var senderID = event.sender.id;
			    var recipientID = event.recipient.id;
			    var timeOfMessage = event.timestamp;
			    var message = event.message;

			    if(event.postback){
			    	if (event.postback.payload == 'current' || event.postback.payload == 'futur') {
						mongo.getCollection(event.postback.payload, (err, result) => {
							event_list = list.makeList(senderID, result)
							console.log(event_list.message.attachment.payload.elements[0].buttons)
							handler.send(event_list)
						})
					}
			    } else if (event.message) {
			    	if(event.message.text == 'video'){
						handler.send(video.videoMessage(senderID))
			    	}
					console.log(event.message)
			    }
			});
		});

		res.sendStatus(200);
		}
	},
	send: function(json){
		console.log(json)
		request({
			uri: 'https://graph.facebook.com/v2.9/me/messages?access_token='+variable.FaceBookAccessToken,
			method: 'POST',
			json: json,
		}, handler.callback)
	},
	callback: function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var recipientId = body.recipient_id;
			var messageId = body.message_id;

			if (messageId) {
			  console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
			}
		} else {
			// console.log("Error: "+response.statusCode+", "+error+", "+body)
			console.log(body)
		}
	}
}
module.exports = handler