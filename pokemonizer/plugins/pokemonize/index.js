const gm = require('gm');
const Request = require('request');

const POKEMON = require('path').resolve(`${__dirname}/../../lib/pokemon.png`);

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/pokemonize',
    handler: function(request, reply) {
      let url = request.query.url;

      gm(Request(url))
        .composite(POKEMON)
        .stream(function(err, stdout, stderr) {
          reply(stdout);
        });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'pokemonize',
  version: '1'
};
