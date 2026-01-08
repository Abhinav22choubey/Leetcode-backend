const redis = require("redis");
const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_KEY,
    socket: {
        host: 'redis-13812.crce179.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 13812
    }
});
async function redisC() {
 redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect();
}
module.exports = {redisC,redisClient};
