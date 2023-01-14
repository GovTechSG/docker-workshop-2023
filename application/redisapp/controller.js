/**
 * controller.js defines functions that are called for executing the logic
 */
// Imports
const { createClient } = require('redis');

// Setup Redis
let redisHost = "127.0.0.1"
let redisPort = "6379"

if (process.env.REDIS_HOST) {
  redisHost = process.env.REDIS_HOST
}
if (process.env.REDIS_PORT) {
  redisPort = process.env.REDIS_PORT
}

const client = createClient({
  url: `redis://${redisHost}:${redisPort}`
});


// Controller
const getCount = async (request, reply) => {
  const { name } = request.params

  try {
    await client.connect()
  } catch(e) {
    console.log('trouble connecting, retry connection')
    await client.disconnect()
    await client.connect()
  }
  
  let count = await client.get(name)
  if (!count) {
    count = 0
  }
  count ++
  await client.set(name, count)
  await client.disconnect()

  // Build response
  const response = {
    message: `hello ${name}`,
    count: count
  }

  return reply.code(200).send(response);
};

module.exports = {
  getCount
};
