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
  const $deleteButton = $('.delete > .click-button');
  const $editButton = $('.edit > .click-button');


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

    user.update = (val) => {
      const texts = user.$ele.find('.text');
      $(texts[0]).text(`${val.age}`);
      $(texts[1]).text(`${val.hobby}`);
      $(texts[2]).text(`${val.food}`);

    };

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

    for (let i = 0; i < inputs.length; i++) {
      const key = $(inputs[i]).attr('key');
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

    _.forEach(inputs, input => {
      $(input).val('');
    })
  });

  $deleteButton.on('click', async function () {
    const $this = $(this);
    let input = $this.parent().find('input').val();
    if (input === '') {
      alert('enter name');
      return;
    }


    try {
      // delete
      const returnVal = await redisAPI.deleteUser(input);

      if (returnVal.success === true) {
        // 여기서는 안보이게하고 뺴준다... 이게 맞는가?
        users[input].setInvisible();
        delete users[input];
      }
    } catch (e) {
      console.log(e);
    }

  });

  $editButton.on('click', function () {
    const $this = $(this);
    const inputs = $this.parent().find('input');

    const json = {};
    for (let i = 0; i < inputs.length; i++) {
      const key = $(inputs[i]).attr('key');
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


    _.forEach(users, user => {
      if(user.name === json.name) user.update(json);
    })

  });

};