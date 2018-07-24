const cardDatas = [
    {
        name: '아주대학교 홈페이지',
        id: 'ajouuniv',
        tag: ['AjouUniv', '2018', 'june', 'hover', 'asfdfsad'],
        explain: '1111111',
        url: '/images/ajou.univ.homepage.png'
    },
    {
        name: 'instagram',
        id: 'instagram',
        tag: ['instagram', '2018', 'june', 'input', 'position', 'fixed', 'scroll', 'icon', 'fontawesome', 'hover'],
        explain: '2222222',
        url: '/images/instagram.png'
    },
    {
        name: 'firebase',
        id: 'firebase',
        tag: ['firebase', 'adsfasdf sdaf sadf asd fsad fsa sa dfsdf sadf sdaf sad fsdaf sadf sd'],
        explain: '333333',
        url: '/images/firebase.png'
    },
    {
        name: 'kakaotalk',
        id: 'kakaotalk',
        tag: ['kakaotalk'],
        explain: '333333',
        url: '/images/kakaotalk_login.png'
    },
    {
        name: 'calculator',
        id: 'calculator',
        tag: ['calculator'],
        explain: '4444444',
        url: '/images/calculator.png'
    },
    {
        name: 'json filter',
        id: 'jsonfilter',
        tag: ['json filter'],
        explain: '4444444',
        url: '/images/jsonfilter.png'
    },
    {
        name: 'text finder',
        id: 'textfinder',
        tag: ['text finder'],
        explain: '4444444',
        url: '/images/textfinder.png'
    },
    {
        name: 'fractal',
        id: 'fractal',
        tag: ['fractal'],
        explain: '4444444',
        url: '/images/fractal.png'
    },
];

const selectedCardDatas = [];

const $input = $('input');
const $cardZone = $('.card-zone');




const appendTemplateData = function () {
    for (let i = 0; i < cardDatas.length; i++) {
        $cardZone.append(`
        <div class="card" id="${cardDatas[i].id}">
          <div class="card-content">
            <div class="card-image" style="background-image: url(${cardDatas[i].url})"></div>
            <div class="card-text-zone">
              <div class="card-name">${cardDatas[i].name}</div>
              <div class="card-tag-zone"></div>
              <div class="card-explain">${cardDatas[i].explain}</div>
            </div>
          </div>
        </div>`
        );
    }

};
appendTemplateData();


const appendTag = function () {
    for (let i = 0; i < cardDatas.length; i++) {
        const $selectedCard = $(`#${cardDatas[i].id}`);
        const $tagZone = $selectedCard.find('.card-tag-zone');

        for (let j = 0; j < cardDatas[i].tag.length; j++) {
            $tagZone.append(`<div class="card-tag">#${cardDatas[i].tag[j]}</div>`);
        }
    }


};
appendTag();


// count
const setTotalCount = function () {
    $('#totalNumber').text(cardDatas.length);
};
setTotalCount();


const setSelectedCount = function () {
    $('#selectedNumber').text($('.card-zone').find('.card').length);
};

setSelectedCount();


$input.on('keyup', function () {
    $cardZone.empty();
    if ($input.val() === '') {
        appendTemplateData();
    }
    else {
        const selectText = new RegExp(`(\\w*${$input.val()}\\w*)`, 'g');
        for (let i = 0; i < cardDatas.length; i++) {
            for (let j = 0; j < cardDatas[i].tag.length; j++) {
                if (selectText.exec(cardDatas[i].tag[j])) {
                    $cardZone.append(`
                    <div class="card" id="${cardDatas[i].id}">
                      <div class="card-content">
                        <div class="card-image" style="background-image: url(${cardDatas[i].url})"></div>
                        <div class="card-text-zone">
                          <div class="card-name">${cardDatas[i].name}</div>
                          <div class="card-tag-zone"></div>
                          <div class="card-explain">${cardDatas[i].explain}</div>
                        </div>
                      </div>
                    </div>`);
                    break;
                }
            }
        }
    }
    appendTag();
    setSelectedCount();

});


const $card = $('.card-content');

$card.on('click', function () {
    const $cardContent = $(this);
    window.location = `/${$cardContent.parent().attr('id')}`;
});