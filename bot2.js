//Auto generates the image
//and post it to twitter

var Twit = require('twit');
var config = require('./config');
var fs = require('fs');

var T = new Twit(config);
var exec = require('child_process').exec;

console.log('Running generating image...');

//On a Windows Machine
//generate the image
//var cmd = 'processing-java --sketch=C:\\priya\\js\\node\\blue --run';
var cmd = 'processing-java --sketch=<filename> --run';
exec(cmd,processing);

var params = {
	encoding: 'base64'
};


//Uplaod the image to the twitter account
//
function processing(){
	var filename = 'blue/output1.png';
	var b64 = fs.readFileSync(filename,params);
	console.log('finished..');

	T.post('media/upload',{media_data:b64},uploaded);
    
     //when image is uploaded
     //post it as a tweet.
     function uploaded(err,data,response){
     	var id = data.media_id_string;
     	 var tweet = {
     	 	status: '#unicorns live from node.js',
     	 	media_ids: [id]
     	 };
     	 T.post('statuses/update', tweet, tweeted);
     }


      //call back function to read the response after the 
      //tweet
     function tweeted(err,data,response){

		if(err){
			console.log("something went wrong..");
		}
		else {
			console.log("Hey it worked from a stream bot....");
		}
		
	}

}


