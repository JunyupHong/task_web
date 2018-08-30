'use strict';

$.put = function (url, data, callback, type) {

  if ($.isFunction(data)) {
    type = type || callback;
    callback = data;
    data = {};
  }

  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: type
  });
};

$.delete = function (url, data, callback, type) {

  if ($.isFunction(data)) {
    type = type || callback;
    callback = data;
    data = {};
  }

  return $.ajax({
    url: url,
    type: 'DELETE',
    success: callback,
    data: data,
    contentType: type
  });
};

var redisAPI = {

  createUser: function createUser(val) {
    return $.post('/api/user', val);
  },
  getUser: function getUser(name) {
    return $.get('/api/user/' + name);
  },
  getUsers: function getUsers() {
    return $.get('/api/users');
  },
  updateUser: function updateUser(val) {
    return $.put('/api/user', val);
  },
  deleteUser: function deleteUser(name) {
    return $.delete('/api/user/' + name);
  }

};

// async function test() {
//   console.log(await redisAPI.createUser({name:'hong', age: '24', hobby:'취미', food: '음식'}));
//   console.log(await redisAPI.getUser('hong'));
//   console.log(await redisAPI.getUsers());
//
//   console.log(await redisAPI.deleteUser('hong'));
//   console.log(await redisAPI.updateUser({name:'hong', age:24, hobby:'취미'}));
// }
//
// test();