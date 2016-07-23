'use strict';

// TODO TURN ON ESLINT by removing disabled:
/* eslint-disable */
document.addEventListener('DOMContentLoaded', function () {
	var getE = function (query, parent) {
		var selector = query.charAt(0);
		var name = query.slice(1);
		var element = parent || document;
		if (selector == '#') {
			return document.getElementById(name);
		} else if (selector == '.') {
			return element.getElementsByClassName(name);
		} else {
			return element.getElementsByTagName(query);
		}
	};
	var playerForm = getE('.player-none')[0];
	var addPlayer = getE('#add-player');
	var submitButton = getE('#confirm-table');
	var playerNumber = 1;
	// Player add function
	addPlayer.addEventListener('click', function () {
		if (playerNumber < 7) {
			playerNumber++;
			var players = getE('.player');
			var newPlayer = playerForm.cloneNode(true);
			var removeButton = document.createElement('button');

			newPlayer.className = 'player';

			removeButton.className = "remove-player btn btn-danger";
			removeButton.innerHTML = "-";
			removeButton.addEventListener('click', function () {
				newPlayer.style.animationName = 'playerFade';
				newPlayer.style.animationDuration = '.5s';
				var x = setTimeout(function () {
					playerNumber--;
					players[0].parentNode.removeChild(newPlayer);
				}, 500);
			});
			newPlayer.appendChild(removeButton);

			var controls = getE('.controls')[0];
			players[0].parentNode.insertBefore(newPlayer, controls);
		}

	});

	// Form submit function
	function collectForm() {
		var players = getE('.player');
		var object = Object.create(null);
		var error = null;
		var errorElement = getE('#error');
		object.name = getE('#js-table-name').value;
		object.game = {};

		function collect(nodeCollection, object) {
			Array.prototype.forEach.call(nodeCollection, function (node) {
				if (node.name && node.value && node.value != "" && node.name !=
					"name") {
					object[node.name] = node.value;
				} else if (node.value == "") {
					if (!error) {
						error = "Fill all required fields first."
					}
					node.className += " invalid";
					if (node.className.indexOf('nodeInvalidRemoveFunction') < 0) {
						node.className += " nodeInvalidRemoveFunction";
						node.addEventListener('click', function () {
							this.className = this.className.replace(/\s?invalid/, "");
							errorElement.className = '';
						});
					}
				}
			});
		}

		// Description
		var description = document.getElementsByTagName('textarea')[0];
		object.description = description.value;

		// Players and city
		object.game.players = [];
		Array.prototype.forEach.call(players, function (player, index) {

			var currentPlayer = {};
			var name = player.getElementsByClassName('player-name')[0];

			currentPlayer.name = name.value;

			var cityObject = player.getElementsByTagName('select')[0];
			var cityObject = cityObject.value.match(/(\w+)\((\w)\)/);

			currentPlayer.city = {
				'name': cityObject[1],
				'side': cityObject[2]
			};


			var inputs = player.getElementsByTagName('input');

			currentPlayer.situation = {};
			collect(inputs, currentPlayer.situation);

			object.game.players.push(currentPlayer);
		});
		if (!error) {
			//console.log(object);

			// NOTE: in version v0.0.1 simple HTML POST will do fine
			$.post('/tables', object);
			window.location.href = '/tables'; /* We can do just that after callback and popup alert about table creation*/
		} else {
			errorElement.className = "active";
			errorElement.innerHTML = error;
		}
	}
	// Remove placeholders to values
	var input = getE('input');
	if(input.length>0){
		Array.prototype.forEach.call(input,function(item, index){
			item.__initialPlaceholder = item.placeholder || item.value;
			if(!item.__initialPlaceholder) return;
			item.addEventListener('focus', function(){
				if(this.value === this.__initialPlaceholder){
					this.value = '';
				}
			});
			item.addEventListener('focusout', function(){
				if(this.value === ''){
					this.value = this.__initialPlaceholder;
				}
			});
		});
	}
	submitButton.addEventListener('click', collectForm);
});
