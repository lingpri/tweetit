var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);


//listen to a user stream to see
//if somone follows you on twiter
//and the bot posts back a reply to them
//thanking them for following you.
var stream = T.stream('user');

stream.on('follow',followed);

function followed(eventMsg) {
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@'+screenName+' Thank you for following me.Do you like unicorns?');
}


function tweetIt(txt) {

	var tweet = {
		status: txt
	};

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err,data,response){

		if(err){
			console.log("something went wrong..");
		}
		else {
			console.log("Hey it worked from a stream bot....");
		}
		
	}

}


