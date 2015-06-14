// services
angular.module('services', []).factory('roundService', function() {
	

	var api = {};

	api.player1 = {};
	//api.player1

	api.initialize = function() {
		api.player1.points = 0;
	}

	api.getRoundDetails = function() {
		var round = {};

		round.groupName = 'H';

		return round;
	}

	api.player1AddPoint = function() {
		api.player1.points++;
	}

	return api;
});