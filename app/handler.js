const request  = require('request'),
	  text	   = require('./templates/text'),
	  list	   = require('./templates/list'),
	  mongo	   = require('./function/mongo'),
	  button   = require('./templates/button'),
	  video    = require('./templates/video'),
	  variable = require('../variable'),
	  fs 	   = require('fs'),
	  wording  = JSON.parse(fs.readFileSync(__dirname+'/templates/wording.json', 'utf8'));

var handler = {
	receive: function (req, res) {
		var data = req.body;
		if (data.object == 'page') {
		console.log(data)
		data.entry.forEach((pageEntry) => {
			pageEntry.messaging.forEach((event) => {
				// console.log(event)

				var senderID = event.sender.id;
			    var recipientID = event.recipient.id;
			    var timeOfMessage = event.timestamp;
			    var message = event.message;

			    // On button click event
			    if(event.postback){
			    	// Detect what kind of event to show
			    	if (event.postback.payload == 'current' || event.postback.payload == 'futur') {
						mongo.getCollection(event.postback.payload, (err, result) => {
							event_list = list.makeList(senderID, result)
							handler.send(event_list)
						})
					// Detect if user wants to know more about an event
					} else if (event.postback.payload.indexOf("readMore") !== -1){
						var id = event.postback.payload.substr(8, event.postback.payload.length)
						mongo.getEvent(id, (err, result) => {
							if(result[0].header.length <= 640) {
								handler.send(text.textMessage(senderID, result[0].header))
							} else {
								handler.send(text.textMessage(senderID, result[0].header.substr(0, 635) + "..."))
							}
							new Promise(function(success, error){
								handler.send(button.knowMore(senderID, result[0], wording.action.knowMore))
								success()
							}).then(function (){
								handler.send(button.askContinue(senderID, wording.action.askContinue))
							}).catch(function(){
								handler.send(text.textMessage(senderID, wording.error.promise))
							})
							
							
						})
					// Detect if user wants to see a video
					} else if (event.postback.payload == "video") {
						new Promise(function(success, error){
							handler.send(video.videoMessage(senderID))
							success()
						}).then(function (){
							handler.send(text.textMessage(senderID, wording.action.done))
							handler.send(button.eventType(senderID, wording.button.session.true))							
						}).catch(function(){
							handler.send(text.textMessage(senderID, wording.error.promise))
						})
					// Detect get started button
					} else if (event.postback.payload == 'start') {
						mongo.findUser(senderID, function(err, result) {
							// Check first event
		    				handler.send(button.eventType(senderID, wording.start.session.false))
			    		})
					} else if (event.postback.payload == 'stop') {
						handler.send(text.textMessage(senderID, wording.action.stop))
					} else if (event.postback.payload == ('continue')){
	    				handler.send(button.eventType(senderID, wording.button.session.true))
					}
				// On message Event
			    } else if (event.message) {
			    	mongo.findUser(senderID, function(err, result) {
			    		// Check if first interaction, if so create session
		    			if(mongo.sessionUser(result, senderID) == true){
		    				handler.send(button.eventType(senderID, wording.start.session.true))
		    			} else {
							handler.send(button.eventType(senderID, wording.start.session.false))		    			}
		    		})
			    }
			});
		});

		res.sendStatus(200);
		}
	},
	userTracking: function(){

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
			  // console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
			}
		} else {
			// console.log("Error: "+response.statusCode+", "+error+", "+body)
			// console.log(body)
		}
	}
}
module.exports = handler