//get(), getJSON() 은 언제 불러올지 모른다...(순서가 뒤죽박죽)

// const a = ['heo', 'hong', 'gong', 'lee'];
//
// for(let j = 0; j <3 ; j++) {
//     for (let i = 0; i < 4; i++) {
//         $.getJSON(`/data/${a[i]}.json`, function (json) {
//             console.log(json);
//         });
//
//     }
// }



/**
 * without promise
 */

//
// const selected = [];
// const jsonArr = [];
//
// const $person = $('.person');
// const $button = $('.button');
// const $textZone = $('.text-zone');
// const $resultZone = $('.result-zone');
//
// let count = 0;
// let func;
//
// const getJson = function (url) {
//     $.getJSON(url, function (json) {
//         if(count < selected.length){
//             console.log('push','next', json);
//             pushJson(json, 'getJson');
//         }
//         else {
//             console.log('push', json);
//             pushJson(json);
//
//         }
//     });
//     count++;
// };
//
// const pushJson = function (json, next) {
//     jsonArr.push(json);
//     if(next ==='getJson') {
//         getJson(`/data/${selected[count]}.json`);
//     }
//     else if(next === undefined){
//         appendJson();
//     }
// };
//
//
//
//
// const appendJson = () => {
//     $resultZone.empty();
//
//     for(let i = 0; i< jsonArr.length; i++) {
//         $resultZone.append(`<div class="result">{name: "${jsonArr[i].name}", age: ${jsonArr[i].age}}</div>`);
//     }
//
// };
//
//
// $person.on('click', function() {
//     $(this).toggleClass("background");
// });
//
// $button.on('click', function () {
//     selected.length = 0;
//     jsonArr.length = 0;
//     count = 0;
//
//
//     const a = $textZone.find('.background');
//     for(let i = 0; i< a.length; i++) {
//         selected.push(a[i].id);
//     }
//
//     if(selected.length >0) {
//         getJson(`/data/${selected[count]}.json`);
//     }
//
//
// });




/**
 *  promise 사용
 **/

// const selected = [];
// const jsonArr = [];
//
//
// const $person = $('.person');
// const $button = $('.button');
// const $textZone = $('.text-zone');
// const $resultZone = $('.result-zone');
//
//
//
//
// const getJson = (url) => {
//     return new Promise((resolve, reject) => {
//         try {
//             $.getJSON(url, function (json) {
//                 resolve(json);
//             });
//         }catch(e) {
//             reject(e);
//         }
//     } );
// };
//
// const appendJson = () => {
//     $resultZone.empty();
//     for(let i = 0; i< jsonArr.length; i++) {
//         $resultZone.append(`<div class="result">{name: "${jsonArr[i].name}", age: ${jsonArr[i].age}}</div>`);
//     }
//
// };
//
// $person.on('click', function() {
//     $(this).toggleClass("background");
// });
//
// $button.on('click', async function () {
//     selected.length = 0;
//
//     const a = $textZone.find('.background');
//     for(let i = 0; i< a.length; i++) {
//         selected.push(a[i].id);
//     }
//
//     try {
//         jsonArr.length = 0;
//         for (let i = 0; i < selected.length; i++) {
//             const success = await getJson(`/data/${selected[i]}.json`);
//             jsonArr.push(success);
//         }
//     }
//     catch(e){console.log('error');}
//
//     appendJson();
// });
//


/**
 *  Promise.all() 사용
 */

const selected = [];
const promises = [];
let json;


const $person = $('.person');
const $button = $('.button');
const $textZone = $('.text-zone');
const $resultZone = $('.result-zone');




const getJson = (url) => {
    return new Promise((resolve, reject) => {
        try {
            $.getJSON(url, function (json) {
                resolve(json);
            });
        }catch(e) {
            reject(e);
        }
    } );
};
const appendJson = () => {
    $resultZone.empty();
    for(let i = 0; i< json.length; i++) {
        $resultZone.append(`<div class="result">{name: "${json[i].name}", age: ${json[i].age}}</div>`);
    }
};

$person.on('click', function() {
    $(this).toggleClass("background");
});

$button.on('click', async function () {
    selected.length = 0;

    const a = $textZone.find('.background');
    for(let i = 0; i< a.length; i++) {
        selected.push(a[i].id);
    }
    //
    // promises.length = 0;
    // for (let i = 0; i < selected.length; i++) {
    //     promises.push(getJson(`/data/${selected[i]}.json`));
    // }
    // json = await Promise.all(promises);

    json = await Promise.all(_.map(selected,
        (s) => getJson(`/data/${s}.json`)));




    appendJson();
});

