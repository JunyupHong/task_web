
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

const redisAPI = {


  createUser: val => $.post('/api/user', val),
  getUser: name => $.get(`/api/user/${name}`),
  getUsers: () => $.get('/api/users'),
  updateUser: val => $.put('/api/user', val),
  deleteUser: name => $.delete(`/api/user/${name}`),


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