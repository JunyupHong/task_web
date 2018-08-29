
const redisUIManager = new async function () {
  const inputZoneManager = new function () {
    const $button = $('.button');

    $button.on('click', function () {
      showAllCards();

      const $this = $(this);
      const id = $this.attr('id');

      const $inputContents = $('.input-content');
      _.forEach($inputContents, content => {
        $(content).addClass('display-none');
      });

      const $inputContent = $(`.input-content.${id}`);
      $($inputContent).removeClass('display-none');

    });


  };

  const users = {};

  const $searchButton = $('.search > .click-button');
  const $addButton = $('.add > .click-button');


  // 얘를 초기화하는 함수로 묶어야하나??
  _.forEach(await redisAPI.getUsers(), user => {
    users[user.name] = user;
    Element(user);
    console.log(user);
  });

  function showAllCards() {
    _.forEach(users, user => {
      user.setVisible();
    })
  }

  function Element(user) {
    user.template = `<div class="card">
                        <div class="photo-content"><i class="fas fa-user-circle"></i></div>
                        <div class="profile-content">
                          <div class="name">${user.name}</div>
                          <div class="text">${user.age}</div>
                          <div class="text">${user.hobby}</div>
                          <div class="text">${user.food}</div>
                        </div>
                      </div>`;

    user.$ele = $(user.template);

    user.setVisible = () => {
      user.$ele.attr('visible', 'true');
    };
    user.setInvisible = () => {
      user.$ele.attr('visible', 'false');
    };
    (user.append = () => {
      $('.main-content').append(user.$ele);
    })();


  }


  $searchButton.on('click', function () {
    const $this = $(this);
    const input = $this.parent().find('input').val();
    // 입력값이 없으면
    if (input === '') {
      _.forEach(users, user => {
        user.setVisible();
      });
      return;
    }

    // 입력값이 있으면
    _.forEach(users, user => {
      if (user.name === input) {
        user.setVisible();
      }
      else
        user.setInvisible();
    });
  });


  $addButton.on('click', function () {
    const $this = $(this);
    const inputs = $this.parent().find('input');
    const json = {};



    for(let i = 0; i<inputs.length; i++) {
      const key = $(inputs[i]).attr('key');
      json[key] = $(inputs[i]).val();
    }

    console.log(Object.keys(users).indexOf(json.name));
    if(Object.keys(users).indexOf(json.name) !== -1) return;

    redisAPI.createUser(json);
    users[json.name] = json;
    Element(json);

    _.forEach(inputs, input => {
      $(input).val('');
    })
  });


};