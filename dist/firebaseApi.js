'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

var store = firebase.firestore();

var settings = { timestampsInSnapshots: true };
store.settings(settings);
// authChange , 할때 listener가 필요하다
// 따라서 public 이외에 내부에 필요한 객체 혹은 자료가 있다

var FirebaseDB = {
  createUser: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: new Date().getTime(),
                signAt: new Date().getTime()
              };
              _context.next = 3;
              return store.collection('users').doc(user.uid).set(data);

            case 3:
              return _context.abrupt('return', _context.sent);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function createUser(_x) {
      return _ref.apply(this, arguments);
    }

    return createUser;
  }(),
  signUser: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
      var data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                signAt: new Date().getTime()
              };
              _context2.next = 3;
              return store.collection('users').doc(user.uid).update(data);

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    function signUser(_x2) {
      return _ref2.apply(this, arguments);
    }

    return signUser;
  }(),
  readUser: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(uid) {
      var refUser, doc;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // 데이터가 어디에 있다 라고 위치 설정만 하는것
              refUser = store.collection('users').doc(uid);
              // query, 여러 주소를 한번에 조회할 때
              // 실제로 get을 수행할때 데이터를 조회한다.

              _context3.next = 3;
              return refUser.get();

            case 3:
              doc = _context3.sent;

              if (!doc.exists) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt('return', doc.data());

            case 8:
              return _context3.abrupt('return', null);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    function readUser(_x3) {
      return _ref3.apply(this, arguments);
    }

    return readUser;
  }()

};

var FirebaseApi = new function () {
  var _this = this;

  var listener = null;

  function setOnAuthStateChanged(callback) {
    listener = callback;
  }

  auth.onAuthStateChange(function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user) {
      var u;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!_.isNil(user)) {
                _context4.next = 3;
                break;
              }

              if (!_.isNil(listener)) listener(null);
              return _context4.abrupt('return');

            case 3:
              console.log(user);

              _context4.next = 6;
              return FirebaseDB.readUser(user.uid);

            case 6:
              u = _context4.sent;

              if (!_.isNil(u)) {
                _context4.next = 15;
                break;
              }

              _context4.next = 10;
              return FirebaseDB.createUser(user);

            case 10:
              _context4.next = 12;
              return FirebaseDB.readUser(user.uid);

            case 12:
              u = _context4.sent;
              _context4.next = 20;
              break;

            case 15:
              _context4.next = 17;
              return FirebaseDB.signUser(user);

            case 17:
              _context4.next = 19;
              return FirebaseDB.readUser(user.uid);

            case 19:
              u = _context4.sent;

            case 20:

              if (!_.isNil(listener)) listener(u);

            case 21:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());

  return {
    signIn: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return auth.signInWithPopup(provider);

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this);
      }));

      function signIn() {
        return _ref5.apply(this, arguments);
      }

      return signIn;
    }(),
    signOut: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return auth.signOut();

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this);
      }));

      function signOut() {
        return _ref6.apply(this, arguments);
      }

      return signOut;
    }(),
    setOnAuthStateChanged: setOnAuthStateChanged
  };
}();