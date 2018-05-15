// dependencies
var path = require('path');
var friends = require('../app/data/friends');

module.exports = function(app) {

	// API GET request - display friends
	app.get('/api/friends', function(req, res){
		res.json(friends);
    });
    
    // API POST request - add to friends
	app.post('/api/friends', function(req, res){
		// Capture the user input object
        var newUser = req.body;
        var userName = newUser.name;
		var userImage = newUser.image;
        var userScores = newUser.scores;

        //Object to hold the best match
		var userBFF = {
			name: "",
			photo: "",
			difference: 1000
		};

        // Loop through friends in array
		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			var testDifference = 0;

			// Loop through scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){

				// Calculate difference between all scores and total them
				testDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// update BFF if difference is lower than previous differences
				if (testDifference <= userBFF.difference){
					userBFF.name = friends[i].name;
					userBFF.photo = friends[i].photo;
					userBFF.difference = testDifference;
				};
			};
		};

        // add new friend to list
		friends.push(newUser);

        // display best friend
        res.json(userBFF);
    });
};