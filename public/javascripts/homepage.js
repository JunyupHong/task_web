const cardDatas = [
    {
        name: '아주대학교 홈페이지',
        id: 'ajouuniv',
        tag: ['AjouUniv', '2018', 'june', 'hover', 'asfdfsad'],
        explain: '1111111',
        image: '/images/ajou.univ.homepage.png'
    },
    {
        name: 'instagram',
        id: 'instagram',
        tag: ['instagram', '2018', 'june', 'input', 'position', 'fixed', 'scroll', 'icon', 'fontawesome', 'hover'],
        explain: '2222222',
        image: '/images/instagram.png'
    },
    {
        name: 'firebase',
        id: 'firebase',
        tag: ['firebase', 'adsfasdf sdaf sadf asd fsad fsa sa dfsdf sadf sdaf sad fsdaf sadf sd'],
        explain: '333333',
        image: '/images/firebase.png'
    },
    {
        name: 'kakaotalk',
        id: 'kakaotalk',
        tag: ['kakaotalk'],
        explain: '333333',
        image: '/images/kakaotalk_login.png'
    },
    {
        name: 'calculator',
        id: 'calculator',
        tag: ['calculator'],
        explain: '4444444',
        image: '/images/calculator.png'
    },
    {
        name: 'json filter',
        id: 'jsonfilter',
        tag: ['json filter'],
        explain: '4444444',
        image: '/images/jsonfilter.png'
    },
    {
        name: 'text finder',
        id: 'textfinder',
        tag: ['text finder'],
        explain: '4444444',
        image: '/images/textfinder.png'
    },
    {
        name: 'fractal',
        id: 'fractal',
        tag: ['fractal'],
        explain: '4444444',
        image: '/images/fractal.png'
    },
];

console.log(cardDatas[0].tag[1].indexOf('1'));

const $root = $('.card-zone');
const template = `
        <div class="card">
          <div class="card-content">
            <div class="card-image"></div>
            <div class="card-text-zone">
              <div class="card-name"></div>
              <div class="card-tag-zone"></div>
              <div class="card-explain"></div>
            </div>
          </div>
        </div>`;


const Element = function (data) {
    this.data = data;
    const $template = $(template);
    this.$template = $template;
    let isVisible = true;
    this.isVisible = isVisible;

    (function appendTemplate() {
        $root.append($template);
    })();

    (function setElement() {
        // url
        $($template).attr('id', `${data.id}`);
        // image
        $template.find('.card-image').attr('style', `background-image : url("${data.image}")`);
        // name
        $template.find('.card-name').text(`${data.name}`);
        // tag
        for (let i = 0; i < data.tag.length; i++) {
            $template.find('.card-tag-zone').append(`<div class = 'card-tag'>${data.tag[i]}</div>`);
        }
        // explain
        $template.find('.card-explain').text(`${data.explain}`);
    })();



    this.setVisible = (b) => {
        isVisible = b;
        if (isVisible) {
            $template.css('display', 'flex');
        }
        else {
            $template.css('display', 'none');
        }
    };

    return this;
};


const elements = [];
for (let i = 0; i < cardDatas.length; i++) {
    elements.push(new Element(cardDatas[i]));
}


const $totalNumber = $('#totalNumber');
const $selectedNumber = $('#selectedNumber');
const setTotalNumber = function () {
    $totalNumber.text(cardDatas.length);
};
setTotalNumber();

// const setSelectedNumber = function () {
//     let count = 0;
//     for(let i = 0; i < elements.length; i++) {
//         if(elements[i].isVisible) {
//             count++;
//         }
//     }
//     $selectedNumber.text(count);
// };
//
//
// setSelectedNumber();


const $input = $('input');
$input.on('keyup', () => {
    let word = $input.val().toLowerCase();

    if (word !== '') {
        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < elements[i].data.tag.length; j++) {
                if(word === elements[i].data.tag[j].toLowerCase()) {
                    elements[i].setVisible(true);
                    break;
                }
                elements[i].setVisible(false);

            }
        }
    }
    else {
        for(let i = 0; i < elements.length; i++) {
            elements[i].setVisible(true);
        }
    }
});


const $tag = $('.card-tag');
$tag.on('click', function () {
    const tag = $(this).text();
    $input.val(`${tag}`);
});



const card = $('.card');
card.on('click', function () {
    console.log($(this));
    window.location = `/${$(this).attr('id')}`;

});








// const $input = $('input');
// const $cardZone = $('.card-zone');
//
//
//
//
// const appendTemplateData = () => {
//     for (let i = 0; i < cardDatas.length; i++) {
//         $cardZone.append(`
//         <div class="card" id="${cardDatas[i].id}">
//           <div class="card-content">
//             <div class="card-image" style="background-image: url(${cardDatas[i].image})"></div>
//             <div class="card-text-zone">
//               <div class="card-name">${cardDatas[i].name}</div>
//               <div class="card-tag-zone"></div>
//               <div class="card-explain">${cardDatas[i].explain}</div>
//             </div>
//           </div>
//         </div>`
//         );
//     }
//
// };
// appendTemplateData();
//
//
// const appendTag = () => {
//     for (let i = 0; i < cardDatas.length; i++) {
//         const $selectedCard = $(`#${cardDatas[i].id}`);
//         const $tagZone = $selectedCard.find('.card-tag-zone');
//
//         for (let j = 0; j < cardDatas[i].tag.length; j++) {
//             $tagZone.append(`<div class="card-tag">#${cardDatas[i].tag[j]}</div>`);
//         }
//     }
//
//
// };
// appendTag();
//
//
// // count
// const setTotalCount = () => {
//     $('#totalNumber').text(cardDatas.length);
// };
// setTotalCount();
//
//
// const setSelectedCount = () => {
//     $('#selectedNumber').text($('.card-zone').find('.card').length);
// };
//
// setSelectedCount();
//
//
// $input.on('keyup', () => {
//     $cardZone.empty();
//     if ($input.val() === '') {
//         appendTemplateData();
//     }
//     else {
//         const selectText = new RegExp(`(\\w*${$input.val()}\\w*)`, 'g');
//         for (let i = 0; i < cardDatas.length; i++) {
//             for (let j = 0; j < cardDatas[i].tag.length; j++) {
//                 if (selectText.exec(cardDatas[i].tag[j])) {
//                     $cardZone.append(`
//                     <div class="card" id="${cardDatas[i].id}">
//                       <div class="card-content">
//                         <div class="card-image" style="background-image: url(${cardDatas[i].image})"></div>
//                         <div class="card-text-zone">
//                           <div class="card-name">${cardDatas[i].name}</div>
//                           <div class="card-tag-zone"></div>
//                           <div class="card-explain">${cardDatas[i].explain}</div>
//                         </div>
//                       </div>
//                     </div>`);
//                     break;
//                 }
//             }
//         }
//     }
//     appendTag();
//     setSelectedCount();
//
// });
//
//
// const $card = $('.card-content');
//
// $card.on('click', function() {
//     const $cardContent = $(this);
//     window.location = `/${$cardContent.parent().attr('id')}`;
// });
//
// const $tag = $('.card-tag');
// $tag.on('click', () => {
//     console.log($tag.text());
// });
