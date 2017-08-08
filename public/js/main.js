'use strict';
// NOTE this will be @deprecated after Angular 2 based SPA released

// TODO Fix ESLint warnings
// https://trello.com/c/ex9mE2WS/57-fix-eslint-issues-in-main-js
document.addEventListener('DOMContentLoaded', () => {
  const getE = function (query, parent) {
    const selector = query.charAt(0);
    const name = query.slice(1);
    const element = parent || document;

    if (selector === '#') {
      return document.getElementById(name);
    } else if (selector === '.') {
      return element.getElementsByClassName(name);
    }
    return element.getElementsByTagName(query);

  };
  const playerForm = getE('.player-none')[0];
  const addPlayer = getE('#add-player');
  const submitButton = getE('#confirm-table');
  let playerNumber = 1;
  // Player add function

  addPlayer.addEventListener('click', () => {
    if (playerNumber < 7) {
      playerNumber++;
      const players = getE('.player');
      const newPlayer = playerForm.cloneNode(true);
      const removeButton = document.createElement('button');

      newPlayer.className = 'player';

      removeButton.className = 'remove-player btn btn-danger';
      removeButton.innerHTML = '-';
      removeButton.addEventListener('click', () => {
        newPlayer.style.animationName = 'playerFade';
        newPlayer.style.animationDuration = '.5s';
        const x = setTimeout(() => {
          playerNumber--;
          players[0].parentNode.removeChild(newPlayer);
        }, 500);
      });
      newPlayer.appendChild(removeButton);

      const controls = getE('.controls')[0];

      players[0].parentNode.insertBefore(newPlayer, controls);
    }

  });

  // Form submit function
  function collectForm() {
    const players = getE('.player');
    const object = Object.create(null);
    let error = null;
    const errorElement = getE('#error');

    object.name = getE('#js-table-name').value;
    object.game = {};

    function collect(nodeCollection, object) {
      Array.prototype.forEach.call(nodeCollection, (node) => {
        if (node.name && node.value && node.value !== '' && node.name !==
          'name') {
          object[node.name] = node.value;
        } else if (node.value === '') {
          if (!error) {
            error = 'Fill all required fields first.';
          }
          node.className += ' invalid';
          if (node.className.indexOf('nodeInvalidRemoveFunction') < 0) {
            node.className += ' nodeInvalidRemoveFunction';
            node.addEventListener('click', function () {
              this.className = this.className.replace(/\s?invalid/, '');
              errorElement.className = '';
            });
          }
        }
      });
    }

    // Description
    const description = document.getElementsByTagName('textarea')[0];

    object.description = description.value;

    // Players and city
    object.game.players = [];
    Array.prototype.forEach.call(players, (player, index) => {

      const currentPlayer = {};
      const name = player.getElementsByClassName('player-name')[0];

      currentPlayer.name = name.value;

      let cityObject = player.getElementsByTagName('select')[0];

      cityObject = cityObject.value.match(/(\w+)\((\w)\)/);

      currentPlayer.city = {
        'name': cityObject[1],
        'side': cityObject[2]
      };


      const inputs = player.getElementsByTagName('input');

      currentPlayer.situation = {};
      collect(inputs, currentPlayer.situation);

      object.game.players.push(currentPlayer);
    });
    if (!error) {
      // NOTE: in version v0.0.1 simple HTML POST will do fine
      $.post('/tables', object);
      window.location.href = '/tables'; /* We can do just that after callback and popup alert about table creation*/
    } else {
      errorElement.className = 'active';
      errorElement.innerHTML = error;
    }
  }
  // Remove placeholders to values
  const input = getE('input');

  if (input.length > 0) {
    Array.prototype.forEach.call(input, (item, index) => {
      item.__initialPlaceholder = item.placeholder || item.value;
      if (!item.__initialPlaceholder) {
        return;
      }
      item.addEventListener('focus', function () {
        if (this.value === this.__initialPlaceholder) {
          this.value = '';
        }
      });
      item.addEventListener('focusout', function () {
        if (this.value === '') {
          this.value = this.__initialPlaceholder;
        }
      });
    });
  }
  submitButton.addEventListener('click', collectForm);
});
