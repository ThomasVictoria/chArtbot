const 	MongoClient = require('mongodb').MongoClient,
		mongodb = require('mongodb')
		assert = require('assert');

var db_url = 'mongodb://heroku_qnfm1m4b:7d1q75ors5fgpu206an1eudli8@ds121212.mlab.com:21212/heroku_qnfm1m4b'

const mongo = module.exports = {
	getCollection: function(type, callback){
		MongoClient.connect(db_url, function(err, db) {
			db.collection('event').find({ type: type }).toArray(callback)
		})
	},
	getEvent: function(id, callback){
		var o_id = new mongodb.ObjectId(id);
		MongoClient.connect(db_url, function(err, db) {
			db.collection('event').find({ _id: o_id }).toArray(callback)
		})
	},
	findUser: function(senderID, callback){
		MongoClient.connect(db_url, function(err, db) {
			db.collection('user').find({ senderID: senderID }).toArray(callback)
		})
	},
	sessionUser: function(result, senderID){
		console.log(result)
		if (result.length == 0){
			MongoClient.connect(db_url, function(err, db) {
				assert.equal(null, err);
				console.log("Openning session for user "+senderID);
				
				db.collection('user').insert({senderID: senderID, openSession: true})
				db.close();
			});
			return false	
		} else {
			if(result[0].openSession){
				return true	
			} else {
				MongoClient.connect(db_url, function(err, db) {
					db.collection('user').update({ senderID: senderID },{$set: {openSession: true}})
				})
				return false
			}
		}
	},
}

module.exports = mongo