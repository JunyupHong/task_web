(function() {

    const info = [
        {
            gender: '남',
            items: [
                {
                    year: 2010,
                    items: [
                        {
                            age: '28',
                            items: [
                                {name: '허재종'}
                            ]
                        }
                    ]
                },
                {
                    year: 2014,
                    items: [
                        {
                            age: '24',
                            items: [
                                {name: '홍준엽'}
                            ]
                        }
                    ]
                },
                {
                    year: 2015,
                    items: [
                        {
                            age: '24',
                            items: [
                                {name: '공현식'}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            gender: '여',
            items: [
                {
                    year: 2016,
                    items: [
                        {
                            age: '22',
                            items: [
                                {name: '이수정'},
                                {name: '홍주원'}
                            ]
                        }
                    ]
                }
            ]
        }

    ];

    const infoClone = JSON.parse(JSON.stringify(info));
    const $select = $('select');
    const filter = ['ALL', 'ALL', 'ALL'];
    let filteredInfo = [];
    let names = [];
    const $filterResultZone = $('.filter-result-zone');


    const mergeInfo = function(arr) {
        const margedInfo = [];
        for(var i = 0; i < arr.length; i++) {
            for(var j = 0; j< arr[i].items.length; j++) {
                margedInfo.push(arr[i].items[j]);
            }
        }
        return margedInfo;
    };

    const setFilteredInfo = function(arr) {
        const temp = [];
        for(var i = 0; i < arr.length; i ++)
            temp.push(arr[i]);
        filteredInfo = [];
        filteredInfo = JSON.parse(JSON.stringify(temp));
    };


    const obtainNames = function(arr) {
        names = [];
        for(var i = 0; i < arr.length; i++) {
            names.push(arr[i].name);
        }
        console.log(names);
    };


    const showScreen = function () {
        for(var i = 0; i < names.length; i++) {
            $filterResultZone.append(`
                <div class="name-zone">${names[i]}</div>
            `);
        }
    };


    $select.on('change', function () {
        const index = $(this).attr('index') * 1;
        filter[index] = $(this).find('option:selected').text() + '';

        console.log(filter);


        if(filter[0] === 'ALL') {
            setFilteredInfo(mergeInfo(infoClone));
        } else if(filter[0] === infoClone[0].gender) {
            setFilteredInfo(infoClone[0].items);
        } else if(filter[0] === infoClone[1].gender) {
            setFilteredInfo(infoClone[1].items);
        }

        console.log('filter1', filteredInfo);

        if(filter[1] === 'ALL') {
            setFilteredInfo(mergeInfo(filteredInfo));
        } else {
            let change = false;
            for(var i = 0; i < filteredInfo.length; i++) {
                if(filter[1] === filteredInfo[i].year + '') {
                    setFilteredInfo(filteredInfo[i].items);
                    change = true;
                }
            }
            if(!change) {
                filteredInfo = [];
            }
        }
         console.log('filter2', filteredInfo);

        if(filter[2] === 'ALL') {
            setFilteredInfo(mergeInfo(filteredInfo));
        } else {
            let change = false;
            for(var i = 0; i < filteredInfo.length; i++) {
                if(filter[2] === filteredInfo[i].age + '') {
                    setFilteredInfo(filteredInfo[i].items);
                    change = true;
                }
            }
            if(!change) {
                filteredInfo = [];
            }
        }
        console.log('filter3', filteredInfo);

        obtainNames(filteredInfo);

        $filterResultZone.empty();
        showScreen();

    });




})();


