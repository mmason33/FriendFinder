var friends 		= require('../data/friends.js');
var path 			= require('path');



var totalDifference = 0;

module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});


	app.post('/api/friends', function(req, res){
        // console.log(friends);
        // console.log('----------------------------------------');
        // console.log(req.body)
        // console.log('----------------------------------------');
        // console.log([friends].length);
		var greatMatch = {
			name: "",
			image: "",
			matchDifference: 1000
		};
		var usrData 	= req.body;
		var usrName 	= usrData.name;
		var usrImage 	= usrData.image;
		var usrScores 	= usrData.scores;

		var totalDifference = 0;

		for(var i = 0; i < friends.length-1; i++){
			// console.log(friends[i].name);
			totalDifference = 0;

			for(var j = 0; j < 10; j++){
				totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friends[i].scores[j]));
                
                // if (j === 9) console.log(totalDifference);
				if (totalDifference <= greatMatch.matchDifference){

					greatMatch.name = friends[i].name;
					greatMatch.photo = friends[i].photo;
					greatMatch.matchDifference = totalDifference;
				}
			}
		}
        console.log('----------------------------------------');
        console.log(usrData);
        console.log('----------------------------------------');
		friends.push(usrData);
 
		res.json(greatMatch);
	});
};
