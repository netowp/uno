var app = angular.module('uno', []);

app.run(function() {})

app.controller('deckController', function($scope) {

	$scope.cards = []
	$scope.players = []

	$scope.pile = []
	$scope.deck = []

	var colors = ['yellow', 'green', 'blue', 'red']
	var values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	colors.forEach(function(color) {
		values.forEach(function(value) {
			$scope.cards.push({
				color: color,
				value: value
			})
		})
	})

	var people = ['neto', 'eri', 'aline', 'gustavo'];

	// initialize players array
	people.forEach(function(person) {
		$scope.players.push({
			name: person,
			cards: []
		})
	})

	function distribute() {
		for (var i = 1; i <= 7; i++) {
			$scope.players.forEach(function(player) {
				player.cards.push($scope.cards.shift())
			})
		}
	}

	function moveCardsToDeck() {
		$scope.cards.forEach(function(card, index, array) {
			$scope.deck.push(array.splice(index, 1)[0])
		})
	}

	distribute();
	moveCardsToDeck();
})

app.directive('unoCard', function() {
	return {
		template: `
			<div class="card {{color}}">{{value}}</div>
		`,
		restrict: 'E',
		scope: {
			color: '@',
			value: '@'
		}
	}
})

app.directive('handDeck', function() {
	return {
		template: `
			<h1>{{player.name}}</h1>
			<uno-card ng-repeat="card in player.cards" ng-click="playCard($index)" value="{{card.value}}" color="{{card.color}}"></uno-card>
		`,
		restrict: 'E',
		scope: true,
		link: function(scope) {
			scope.playCard = function($index) {
				console.log("there we go")
				scope.pile.push(scope.player.cards.splice($index, 1)[0])
			}
		}
	}
})