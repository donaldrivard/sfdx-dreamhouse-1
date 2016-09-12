let manifest = {
  'connections': [{
    'port': process.env.PORT || 3000,
    'routes': {
      'cors': {
        'credentials': true,
        'additionalHeaders': ['x-origin', 'x-heroku-sudo', 'x-heroku-sudo-user', 'if-modified-since', 'x-heroku-sudo-reason']
      },
      'state': {
        'parse': false,
        'failAction': 'ignore'
      }
    }
  }],

  'registrations': [
    {
      'plugin': './announce-server-ready'
    },
    {
      'plugin': './pokemonize'
    }
  ]
};

module.exports = manifest;
