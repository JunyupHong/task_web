//
// $.put = function(){
//   // todo
// }

const redisAPI = {

    createUser: val => $.post('/api/user', val),
    getUser: name => $.get(`/api/user/${name}`),
    getUsers: () => $.get('/api/users'),

    // deleteUser: val => $.post('/api/user', val),
    // updateUser: val => $.post('/api/user', val),

};



// async function test() {
//   console.log(await redisAPI.createUser({name:'hong', age: '24', hobby:'취미', food: '음식'}));
//
//
//   console.log(await redisAPI.getUser('hong'));
//
//
//   console.log(await redisAPI.getUsers());
// }
//
// test();