/**
 * app.js defines the actual application
 */
// Imports
const fastify = require('fastify');
const routes = require('./routes');

// Registration
let app;

function build(opts = {}) {
  app = fastify(opts);
  app.register(routes);
  return app;
}

if (require.main === module) {
  // called directly i.e. "node app"
  build({
    logger: {
      level: 'debug'
    }
  });
  app.listen(3000, '0.0.0.0', (err) => {
    if (err) console.error(err);
    app.log.info('server listening on 3000');
  });
}

module.exports = {
  app,
  build
};
