var redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
const _ = require('lodash');

const redisDB = {
  createUser: (key, value) => {
    return new Promise((resolve, reject) => {
      client.get(key, (val, err)=> {
        if(_.isNil(val)) {
          client.hmset(key, value, (err) => {
            if (_.isNil(err)) resolve(value);
            else reject(err);
          });
        }
        else {
          reject();
        }
      });

    });
  },

  getUser: (key) => {
    return new Promise((resolve, reject) => {
      client.hgetall(key, function (err, value) {
        console.log(key, value);
        if(_.isNil(err)) resolve(value);
        else reject(err);
      });
    //   client.get(key, function (err, value) {
    //     const d = {};
    //     try {
    //       d[key] = JSON.parse(value);
    //     } catch (e) {
    //       d[key] = value;
    //     }
    //     if (_.isNil(err)) resolve(d);
    //     else reject();
    //   });
    });
  },

  getUsers: function() {
    return new Promise((resolve, reject) => {
      client.keys('*', async (err, keys) => {
        if (_.isNil(err)) {
          resolve(await Promise.all(_.map(keys, key => this.getUser(key))));
        }
        else reject(err);
      });
    });
  },
  updateUser: () => {
  },
  deleteUser: () => {
  },
};

// async function test() {
//   console.log('a');
//   await redisDB.createUser('hongjunyup', {name: 'hongjunyup', age: 24});
//   console.log('aa');
//   console.log(await redisDB.getUser('hongjunyup'));
//   console.log('aaa');
//   console.log(await redisDB.getUsers(redisDB.getUser));
//   console.log('aaaa');
// }
//
// test();

async function test() {
  console.log(await redisDB.createUser('zxc',{name: 'hongjunyup', age: 24}));
}
test();

module.exports = redisDB;