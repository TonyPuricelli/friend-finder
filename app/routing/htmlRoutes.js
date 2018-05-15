var path = require('path');

// Export HTML routes
module.exports = function(app) {
	// Survey page
	app.get('/survey', function(req, res) {
		res.sendFile(path.join(__dirname, '../app/public/survey.html'));
	});

	// Home page -- default
	app.use(function(req, res){
		res.sendFile(path.join(__dirname + '../app/public/home.html'));
	});
};