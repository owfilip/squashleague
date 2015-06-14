// controllers
angular.module('controllers', []).controller('roundController', function($scope, roundService) {
	var round = this;

	roundService.initialize();

	round.roundDetails = {};
	round.roundDetails = roundService.getRoundDetails();

	round.player1points = roundService.player1.points;
	round.player2points = 0;

	$scope.addPoint = function(event) {
		var player = event.target.attributes.data.value;
		console.log(player);
		switch (player) {
			case "player1":
				roundService.player1AddPoint();	
				break;
			case "player2":
				round.player2points++;
		}
		
	}

	return round;
});