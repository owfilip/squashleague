/* Main app file */
(function() {
	var app = angular.module('squashLiga', []);
	//console.log('app started');

	function H(serving, currentScore) {
		return {
			isServing: serving,
			score: currentScore
		}
	}

	function Player() {
		return {
			name: '',
			score: 0,
			serving: {left: false, right: false},
			//history: [],
			addPoint: function( point) {
				this.score += point;
				//this.history.push(new H(this.serving, this.score));
			},

			isServing: function(left, right) {
				this.serving.left = left;
				this.serving.right = right;
				
				// if (this.history.length === 0) {
				// 	this.history.push(new H(this.serving, 0));
				// }

				// this.history[this.history.length - 1].isServing.left = left;
				// this.history[this.history.length - 1].isServing.right = right;
			}


		}
	}

	function RoundDetails() {
		return {
			season: '',
			roundNumber: 0,
			date: '',
			groupName: ''
		}
	}

	app.factory('servingHistory', function() {
		return {
			serves: [],
			nextServe: function() {
				this.serves.push({
					//player1Left: player1.serving.left,
					//player1Right: player1.serving.right,
					player1Left: false,
					player1Right, false,
					player1Score: 0,
					player1Left: false,
					player1Right, false,
					player2Score: 0,
				})
			},

			player1IsServingLeft: function() {
				this.serves[this.serves.length - 1].player1Left = true;
			},

			player1IsServingRight: function() {
				this.serves[this.serves.length - 1].player1Right = true;
			},

			player2IsServingLeft: function() {
				this.serves[this.serves.length - 1].player2Left = true;
			},

			player2IsServingRight: function() {
				this.serves[this.serves.length - 1].player2Right = true;
			},

			player1Won: function(score) {
				this.serves[this.serves.length - 1].player1Score = score;
				this.serves[this.serves.length - 1].player2Score = '&nbsp;';				
			},

			player2Won: function(score) {
				this.serves[this.serves.length - 1].player1Score = '&nbsp;';
				this.serves[this.serves.length - 1].player2Score = score;				
			}
		}
	});

	app.factory('game', ['servingHistory', function(servingHistory) {
		console.log('game module loaded');
		var round = {};

		var player1 = new Player();
		player1.name = 'Ryszard Kowalski-Nowakowski';
		player1.serving = {left: false, right: false};

		var player2 = new Player();
		player2.name = 'Daria Klimczyk-Podgórska';
		player2.serving = {left: false, right: false};

		return {
			season: '',
			groupName: '',
			roundNumber: 0,
			date: '',
			player1: player1,
			player2: player2,
			sets: [],
			serves: servingHistory,
			currentSet: 0,
			currentServe: 0,
			
			initialize: function() {
				this.player1.isServing(false, false);
				this.player2.isServing(false, false);
				this.player1.addPoint(0);
				this.player2.addPoint(0);
				//this.serves.push({player1: this.player1, player2: this.player2});
				this.sets.push([]);
				this.date = '12 Sierpień 2014';
				this.roundNumber = 8;
				this.groupName = 'H';
				this.season = 'Lato 2014';

			},

			player1IsServing: function(left, right) {
				this.player1.isServing(left, right);
				this.player2.isServing(false, false);
				if (left === true) {
					servingHistory.player1IsServingLeft();
				}
				if (right === true) {
					servingHistory.player1IsServingRight();
				}

				//servingHistory.
				//this.serves[this.currentServe] = {player1: player1, player2: player2};
				this.sets[this.currentSet] = this.serves;
			},

			player2IsServing: function(left, right) {
				this.player1.isServing(false, false);
				this.player2.isServing(left, right);
				this.serves[this.currentServe] = {player1: player1, player2: player2};
				this.sets[this.currentSet] = this.serves;
			},

			addPointPlayer1: function() {
				this.player1.addPoint(1);
				this.player2.addPoint(0);
				this.serves[this.currentServe] = {player1: player1, player2: player2};
				this.sets[this.currentSet] = this.serves;
				this.nextServe();
				this.player1IsServing(true, false);
			},

			addPointPlayer2: function() {
				this.player1.addPoint(0);
				this.player2.addPoint(1);
				this.serves[this.currentServe] = {player1: player1, player2: player2};
				this.sets[this.currentSet] = this.serves;
				this.nextServe();
				this.player2IsServing(false, true);
			},

			nextServe: function() {
				this.serves.push({player1: player1, player2: player2});
				this.sets[this.currentSet] = this.serves;
			}

		}
	}]);

	app.controller('RoundController', ['game', function(game) {
		var round = game;
		console.log('controller started');

		var setDetails = [];
		var serveDetails = {};

		round.initialize();

		round.player2IsServing(true, false);
		round.addPointPlayer1();
		round.player1IsServing(false, true);
		round.addPointPlayer1();
		round.player1IsServing(true, false);
		round.addPointPlayer2();
		round.player2IsServing(false, true);


		// initial
		// serveDetails.player1 = {
		// 	score: 0,
		// 	isServing: true
		// }

		// serveDetails.player2 = {
		// 	score: 0,
		// 	isServing: false
		// }


		//setDetails.push(serveDetails);
		//round.sets[round.currentSet] = setDetails;

		// gem1
		// serveDetails = {};
		// serveDetails.player1 = {
		// 	score: 1,
		// 	isServing: true
		// }

		// serveDetails.player2 = {
		// 	score: 0,
		// 	isServing: false
		// }
		// //serveDetails.serve = 1;

		// setDetails.push(serveDetails);
		// round.sets[round.currentSet] = setDetails;

		// // gem 2
		// serveDetails = {};
		// serveDetails.player1 = {
		// 	score: 2,
		// 	isServing: true
		// }

		// serveDetails.player2 = {
		// 	score: 0,
		// 	isServing: false
		// }
		// //serveDetails.serve = 2;

		// setDetails.push(serveDetails);
		// round.sets[round.currentSet] = setDetails;

		// // gem 3
		// serveDetails = {};
		// serveDetails.player1 = {
		// 	score: 2,
		// 	isServing: false
		// }

		// serveDetails.player2 = {
		// 	score: 1,
		// 	isServing: true
		// }
		// setDetails.push(serveDetails);
		// round.sets[round.currentSet] = setDetails;

		// // gem 4
		// serveDetails = {};
		// serveDetails.player1 = {
		// 	score: 2,
		// 	isServing: false
		// }

		// serveDetails.player2 = {
		// 	score: 2,
		// 	isServing: true
		// }
		// setDetails.push(serveDetails);
		// round.sets[round.currentSet] = setDetails;

		// // gem 5
		// serveDetails = {};
		// serveDetails.player1 = {
		// 	score: 2,
		// 	isServing: false
		// }

		// serveDetails.player2 = {
		// 	score: 3,
		// 	isServing: true
		// }
		// setDetails.push(serveDetails);
		// round.sets[round.currentSet] = setDetails;

		// round.player1.score = countScore(round.sets[round.currentSet], 'player1');
		// round.player2.score = countScore(round.sets[round.currentSet], 'player2');

		// function countScore(setDetails, player) {
		// 	var score = 0;
			
		// 	for(var serveIndex = 0; serveIndex < setDetails.length; serveIndex++) {
		// 		var serveScore = setDetails[serveIndex][player].score;

		// 		if (serveScore > score) {
		// 			score = serveScore;
		// 		}
		// 	}

		// 	return score;
		// }

		return round;
	}]);



})();



