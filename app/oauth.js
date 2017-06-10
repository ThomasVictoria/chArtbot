const variable = require ('../variable')

module.exports = {
  webhook: function (req, res) {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === variable.FaceBookVerifyToken) {
	    console.log("Validating webhook");
	    res.status(200).send(req.query['hub.challenge']);
  	} else {
	    console.error("Failed validation. Make sure the validation tokens match.");
	    res.sendStatus(403);          
  	}
  },
};