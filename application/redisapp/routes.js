/**
 * route.js defines the routes for this node package
 */
// Imports
const { getCount } = require('./controller');

// Routes
function itemRoutes(fastify, options, done) {
  fastify.get('/count/:name', {
    schema: {
      params: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        },
        required: ['name']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            count: {type: 'string'}
          }
        }
      }
    },
    handler: getCount
  });
  done();
}

module.exports = itemRoutes;
