'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var redisUIManager = new (_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var inputZoneManager, users, $searchButton, $addButton, showAllCards, Element;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Element = function Element(user) {
            user.template = '<div class="card">\n                        <div class="photo-content"><i class="fas fa-user-circle"></i></div>\n                        <div class="profile-content">\n                          <div class="name">' + user.name + '</div>\n                          <div class="text">' + user.age + '</div>\n                          <div class="text">' + user.hobby + '</div>\n                          <div class="text">' + user.food + '</div>\n                        </div>\n                      </div>';

            user.$ele = $(user.template);

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

          // 얘를 초기화하는 함수로 묶어야하나??

          _context.t0 = _;
          _context.next = 9;
          return redisAPI.getUsers();

        case 9:
          _context.t1 = _context.sent;

          _context.t2 = function (user) {
            users[user.name] = user;
            Element(user);
            console.log(user);
          };

          _context.t0.forEach.call(_context.t0, _context.t1, _context.t2);

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

            console.log(Object.keys(users).indexOf(json.name));
            if (Object.keys(users).indexOf(json.name) !== -1) return;

            redisAPI.createUser(json);
            users[json.name] = json;
            Element(json);

            _.forEach(inputs, function (input) {
              $(input).val('');
            });
          });

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
})))();