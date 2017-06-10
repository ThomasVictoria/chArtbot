module.exports =  {
  receive: function (req, res) {
	  var data = req.body;
	  if (data.object == 'page') {

	    data.entry.forEach(function(pageEntry) {
	      var pageID = pageEntry.id;
	      var timeOfEvent = pageEntry.time;

	      pageEntry.messaging.forEach(function(messagingEvent) {
	      	console.log(messagingEvent)
	      });
	    });

	    res.sendStatus(200);
	  }
  }
}