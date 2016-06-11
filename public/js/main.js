(function(){
	document.addEventListener('DOMContentLoaded', function(){
		var getE = function(query, parent){
			var selector = query.charAt(0);
			var name = query.slice(1);
			var element = parent || document;
			if(selector == '#'){
				return document.getElementById(name);
			} else if(selector == '.'){
				return element.getElementsByClassName(name);
			} else {
				return element.getElementsByTagName(query);
			}
		};
		var playerForm = getE('.player-none')[0];
		var addPlayer = getE('#add-player');
		addPlayer.addEventListener('click', function(){
			var players = getE('.player');
			var newPlayer = playerForm.cloneNode(true);
			var removeButton = document.createElement('button');

			newPlayer.className = 'player';

			removeButton.className = "remove-player btn btn-danger";
			removeButton.innerHTML = "-";
			removeButton.addEventListener('click', function(){
				newPlayer.style.animationName = 'playerFade';
				newPlayer.style.animationDuration = '.5s';
				var x = setTimeout(function(){
					players[0].parentNode.removeChild(newPlayer);
				}, 500);
			});
			newPlayer.appendChild(removeButton);

			var controls = getE('.controls')[0];
			players[0].parentNode.insertBefore(newPlayer, controls);
		});
	});
})();