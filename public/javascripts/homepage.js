
const cardsData = [
    {
        name: '아주대학교 홈페이지',
        tag: ['ajouUniv'],
        explain: '1111111',
        url: '/images/ajou.univ.homepage.png'
    },
    {
        name: 'instagram',
        tag: ['instagram', '3'],
        explain: '2222222',
        url: '/images/instagram.png'
    },
    {
        name: 'firebase',
        tag: ['firebase'],
        explain: '333333',
        url: '/images/firebase.png'
    },
    {
        name: 'kakaotalk',
        tag: ['kakaotalk'],
        explain: '333333',
        url: '/images/kakaotalk_login.png'
    },
    {
        name: 'calculator',
        tag: ['5', '6', '7'],
        explain: '4444444',
        url: '/images/calculator.png'
    },
    {
        name: 'json filter',
        tag: ['5', '6', '7'],
        explain: '4444444',
        url: '/images/jsonfilter.png'
    },
    {
        name: 'text finder',
        tag: ['5', '6', '7'],
        explain: '4444444',
        url: '/images/textfinder.png'
    },
    {
        name: 'fractal',
        tag: ['5', '6', '7'],
        explain: '4444444',
        url: '/images/fractal.png'
    },
];







const $input = $('input');

const appendTemplateData = function () {
    const $cardZone = $('.card-zone');
    console.log($input.val());
    for(let i = 0; i < cardsData.length; i++) {
        const a = $cardZone.append(`<div class="card">
          <div class="card-content">
            <div class="card-image"></div>
            <div class="card-text-zone">
              <div class="card-name">${cardsData[i].name}</div>
              <div class="card-tag-zone"></div>
              <div class="card-explain">${cardsData[i].explain}</div>
            </div>
          </div>
        </div>`
        );
    }

};
appendTemplateData();


const appendImage = function() {
    const $cardImageZone = $('.card-image');
    console.log($cardImageZone);
    for(let i = 0; i < cardsData.length; i++) {
        let image = $($cardImageZone[i]);
        image.css('background-image', `url(${cardsData[i].url})`);
    }
};
appendImage();

$input.on('keyup', function () {

});






// count
const setTotalCount = function() {
    $('#totalNumber').text(cardsData.length);
};
setTotalCount();


const setSelectedCount = function () {
    $('#selectedNumber').text($('.card-zone').find('.card').length);
};

setSelectedCount();

