// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

config = {
    // ### Development **(default)**
    development: {
      url: 'http://localhost:9000',
      database: {
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          user: 'r3dm',
          password: '',
          database: 'shpe',
          charset: 'utf8'
        },
        debug: true
      },
      server: {
        host: '127.0.0.1',
        port: '9000'
      },
      paths: {
        contentPath: path.join(__dirname, '/content/')
      }
    },

    // ### Production
    // When running Ghost in the wild, use the production environment
    production: {
      url: 'http://my-ghost-blog.com',//TODO: Figure out what needs to go here
      mail: {},
      database: {
        client: 'pg',
        connection: {
          host: 'ec2-54-204-42-135.compute-1.amazonaws.com',
          user: 'zbgsjpsefdupqc',
          port: 5432,
          password: 'kMrFTE7_Re77L_9IcWW4EARnsp',
          database: 'd9ekp9lr3mq9pb'
        },
        debug: false
      },
      server: {
        host: '0.0.0.0',
        port: process.env.PORT || 9000
      }
    },
    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'postgres',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

// Export config
module.exports = config;
