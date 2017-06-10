

module.exports =  {
  receive: function (req, res) {
	  var data = req.body;

	  if (data.object == 'page') {

	    data.entry.forEach(function(pageEntry) {
	      var pageID = pageEntry.id;
	      var timeOfEvent = pageEntry.time;

	      pageEntry.messaging.forEach(function(messagingEvent) {
	        if (messagingEvent.optin) {
	          receivedAuthentication(messagingEvent);
	        } else if (messagingEvent.message) {
	          handler.receivedMessage(messagingEvent);
	        } else if (messagingEvent.delivery) {
	          receivedDeliveryConfirmation(messagingEvent);
	        } else if (messagingEvent.postback) {
	          receivedPostback(messagingEvent);
	        } else if (messagingEvent.read) {
	          receivedMessageRead(messagingEvent);
	        } else if (messagingEvent.account_linking) {
	          receivedAccountLink(messagingEvent);
	        } else {
	          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
	        }
	      });
	    });

	    res.sendStatus(200);
	  }
  }
}