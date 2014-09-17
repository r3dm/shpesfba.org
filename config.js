// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

var connection;

if (process.env.DB_TYPE === 'sqlite3') {
  connection = {
    filename: 'content/data/r3dm.sqlite'
  };
} else {
  connection = {
    host: '127.0.0.1',
    user: 'r3dm',
    password: '',
    database: 'shpe',
    charset: 'utf8'
  };
}

config = {
    // ### Development **(default)**
    development: {
      url: 'http://localhost:9000',
      database: {
        client: process.env.DB_TYPE,
        connection: connection,
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
      url: 'http://shpedev.herokuapp.com',
      mail: {},
      database: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        debug: false,
        filestorage: false
      },
      server: {
        host: '0.0.0.0',
        port: process.env.PORT
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
