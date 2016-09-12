exports.register = function (server, options, next) {

  server.ext('onPostStart', (server, next) => {

    console.log(`pokemonizer running at: ${server.info.uri}`);
    next();
  });

  next();
};

exports.register.attributes = {
  name: 'announce-server-ready',
  version: '1'
};
