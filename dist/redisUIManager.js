'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var redisUIManager = new (_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var inputZoneManager, users, $searchButton, $addButton, $deleteButton, $editButton, showAllCards, Element;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          Element = function Element(user) {
            user.template = '<div class="card">\n                        <div class="photo-content"><i class="fas fa-user-circle"></i></div>\n                        <div class="profile-content">\n                          <div class="name">' + user.name + '</div>\n                          <div class="text">' + user.age + '</div>\n                          <div class="text">' + user.hobby + '</div>\n                          <div class="text">' + user.food + '</div>\n                        </div>\n                      </div>';

            user.$ele = $(user.template);

            user.update = function (val) {
              var texts = user.$ele.find('.text');
              $(texts[0]).text('' + val.age);
              $(texts[1]).text('' + val.hobby);
              $(texts[2]).text('' + val.food);
            };

            user.setVisible = function () {
              user.$ele.attr('visible', 'true');
            };
            user.setInvisible = function () {
              user.$ele.attr('visible', 'false');
            };
            (user.append = function () {
              $('.main-content').append(user.$ele);
            })();
          };

          showAllCards = function showAllCards() {
            _.forEach(users, function (user) {
              user.setVisible();
            });
          };

          inputZoneManager = new function () {
            var $button = $('.button');

            $button.on('click', function () {
              showAllCards();

              var $this = $(this);
              var id = $this.attr('id');

              var $inputContents = $('.input-content');
              _.forEach($inputContents, function (content) {
                $(content).addClass('display-none');
              });

              var $inputContent = $('.input-content.' + id);
              $($inputContent).removeClass('display-none');
            });
          }();
          users = {};
          $searchButton = $('.search > .click-button');
          $addButton = $('.add > .click-button');
          $deleteButton = $('.delete > .click-button');
          $editButton = $('.edit > .click-button');

          // 얘를 초기화하는 함수로 묶어야하나??

          _context2.t0 = _;
          _context2.next = 11;
          return redisAPI.getUsers();

        case 11:
          _context2.t1 = _context2.sent;

          _context2.t2 = function (user) {
            users[user.name] = user;
            Element(user);
            console.log(user);
          };

          _context2.t0.forEach.call(_context2.t0, _context2.t1, _context2.t2);

          $searchButton.on('click', function () {
            var $this = $(this);
            var input = $this.parent().find('input').val();
            // 입력값이 없으면
            if (input === '') {
              _.forEach(users, function (user) {
                user.setVisible();
              });
              return;
            }

            // 입력값이 있으면
            _.forEach(users, function (user) {
              if (user.name === input) {
                user.setVisible();
              } else user.setInvisible();
            });
          });

          $addButton.on('click', function () {
            var $this = $(this);
            var inputs = $this.parent().find('input');

            var json = {};

            for (var i = 0; i < inputs.length; i++) {
              var key = $(inputs[i]).attr('key');
              json[key] = $(inputs[i]).val();
            }
            if (json.name === '') {
              alert('enter name');
              return;
            }

            if (Object.keys(users).indexOf(json.name) !== -1) return;

            // db에 post
            redisAPI.createUser(json);

            // users에 추가, 그리기
            users[json.name] = json;
            Element(json);

            _.forEach(inputs, function (input) {
              $(input).val('');
            });
          });

          $deleteButton.on('click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var $this, input, returnVal;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    $this = $(this);
                    input = $this.parent().find('input').val();

                    if (!(input === '')) {
                      _context.next = 5;
                      break;
                    }

                    alert('enter name');
                    return _context.abrupt('return');

                  case 5:
                    _context.prev = 5;
                    _context.next = 8;
                    return redisAPI.deleteUser(input);

                  case 8:
                    returnVal = _context.sent;


                    if (returnVal.success === true) {
                      // 여기서는 안보이게하고 뺴준다... 이게 맞는가?
                      users[input].setInvisible();
                      delete users[input];
                    }
                    _context.next = 15;
                    break;

                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context['catch'](5);

                    console.log(_context.t0);

                  case 15:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this, [[5, 12]]);
          })));

          $editButton.on('click', function () {
            var $this = $(this);
            var inputs = $this.parent().find('input');

            var json = {};
            for (var i = 0; i < inputs.length; i++) {
              var key = $(inputs[i]).attr('key');
              json[key] = $(inputs[i]).val();
            }

            // 없으면 리턴
            if (Object.keys(users).indexOf(json.name) === -1) return;

            // 있으면
            // db에 put
            redisAPI.updateUser(json);

            // users에 update
            // users[json.name] = json;
            // console.log(users);
            // console.log('nnname', users[json.name]);
            // users[json.name].update();
            // console.log('2');


            _.forEach(users, function (user) {
              if (user.name === json.name) user.update(json);
            });
          });

        case 18:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
})))();