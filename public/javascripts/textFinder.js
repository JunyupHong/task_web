const $rightIcon = $('i.fas.fa-angle-right');
const $leftIcon = $('i.fas.fa-angle-left');
const $leftZone = $('.left-zone');
const $rightNavigation = $('.right-zone .navigation');

$leftIcon.on('click', function () {
    $leftZone.css('width', '0');
    $leftIcon.css('display', 'none');
    $rightIcon.css('display', 'block');

    setTimeout(function () {
        $rightNavigation.css('border-top-left-radius', '8px')
    }, 300);
});

$rightIcon.on('click', function () {
    $leftZone.css('width', '300');
    $leftIcon.css('display', 'block');
    $rightIcon.css('display', 'none');
    setTimeout(function () {
        $rightNavigation.css('border-top-left-radius', '0')
    }, 20);

});


const selectedFilter = {};
const $search = $('input');


const $checkBox = $('.option-bar-box.check-box');
$checkBox.on('click', function () {
    if ($(this).attr('state') === 'click') {
        $(this).attr('state', 'noClick');
        $(this).css({'background': 'white', 'border-color': '#666666'});
        delete selectedFilter[`check-filter-${$(this).attr('id')}`];
    }
    else {
        $(this).attr('state', 'click');
        $(this).css({'background': '#6200EE', 'border-color': '#6200EE'});
        selectedFilter[`check-filter-${$(this).attr('id')}`] = $(this).attr('id');
    }
    changeTextStyle($search.val());
});


const $radioButton = $('.option-bar-box.radio-button');
$radioButton.on('click', function () {
    $radioButton.attr('state', 'noClick');
    $radioButton.css('border-color', '#666666');
    $radioButton.find('.radio-button-circle').css('background', 'white');


    $(this).attr('state', 'click');
    $(this).css('border-color', '#6200EE');
    $(this).find('.radio-button-circle').css('background', '#6200EE');
    selectedFilter['radio-filter'] = $(this).attr('id');
    changeTextStyle($search.val());
});


$search.on('keyup', function () {
    changeTextStyle($search.val());
});


// console.log($htmlText[20]);
// const a = $('.text').text();
// console.log(a[20]);

// console.log('html', $('.text').html(`<h1>${$('.text').html()}</h1>`));

const $text = $('.text');

const originText = ` What is Lorem Ipsum?
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                Why do we use it?
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                Where does it come from?
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                                Where can I get some?
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`;

const changeTextStyle = function (changeText) {
    $text.html(originText);
    let str;
    const style = [];
    (function fillStyle() {
        if (selectedFilter['check-filter-underline'] === 'underline')
            style.push('u');
        if (selectedFilter['check-filter-bold'] === 'bold')
            style.push('strong');
        if (selectedFilter['check-filter-italic'] === 'italic')
            style.push('i');
        if (selectedFilter['check-filter-background'] === 'background') {
            style['background'] = 'span style="background-color:yellow"';
        }
    })();

    if (selectedFilter['radio-filter'] === 'letter') {
        const selectText = new RegExp(changeText, 'g');
        str = $text.html().replace(selectText, `<${style[0]}><${style[1]}><${style[2]}><${style['background']}>${changeText}</span></${style[2]}></${style[1]}></${style[0]}>`);
    }
    else if (selectedFilter['radio-filter'] === 'word') {
        const selectText = new RegExp(`(\\w*${changeText}\\w*)`, 'g');
        if($search.val() !== '') {
            str = $text.html().replace(selectText, `<${style[0]}><${style[1]}><${style[2]}><${style['background']}>$1</span></${style[2]}></${style[1]}></${style[0]}>`);
        }
    }
    else if (selectedFilter['radio-filter'] === 'sentence') {
        const selectText = new RegExp(`([^?.!]*${changeText}[^?.!]*[?.!])`, 'g');
        if($search.val() !== '') {
            str = $text.html().replace(selectText, `<${style[0]}><${style[1]}><${style[2]}><${style['background']}>$1</span></${style[2]}></${style[1]}></${style[0]}>`);
        }
    }

    $text.html(str);


};

