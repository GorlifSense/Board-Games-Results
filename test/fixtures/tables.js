'use strict';

const chance = require('chance')();


class Player {
  constructor() {
    this.fullname = chance.first();
    this.city = {
      name: chance.pickone([
        'Gizah',
        'Babylon',
        'Ephesos',
        'Olympia',
        'Halicarnassus',
        'Rhodes',
        'Alexandria'
      ]),
      side: chance.pickone(['A', 'B'])
    };
    this.situation = {
      'military': {
        'score': chance.integer()
      },
      'gold': {
        'coins': chance.integer(),
        'score': chance.integer()
      },
      'wonder': {
        'score': chance.integer()
      },
      'culture': {
        'score': chance.integer()
      },
      'trade': {
        'score': chance.integer()
      },
      'guild': {
        'score': chance.integer()
      },
      'science': {
        'cog': chance.integer(),
        'tablet': chance.integer(),
        'compass': chance.integer(),
        'score': chance.integer()
      }
    };
  }
}

/**
 * Generate array with random players
 * @param  {number} count - integer of players on the table
 * @return {array}        - Players
 */
function generatePlayers(count) {
  const players = [];
  const TIMES = 1;

  while (count) {
    // Prepare array of Players around the table
    players.push(new Player());
    count -= TIMES;
  }
  return players;
}

/**
 * Expose table fixture
 * @return {object} - Table generated with players
 */
module.exports = function tableFixture() {
  return {
    description: chance.paragraph(),
    game: {
      title: '7 Wonders',
      players: generatePlayers(chance.integer({min: 3, max: 7}))
    }
  };
};
