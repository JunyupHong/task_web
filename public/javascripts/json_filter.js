(function () {


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


    const filters = ['ALL', 'ALL', 'ALL'];

    $('select').on('change', function () {
        const changedFilter = $(this).find('option:selected').text();
        const index = $(this).attr('index') * 1;
        filters[index] = changedFilter;
        console.log(filters);
        filterInfo();
    });

    const mergeInfos = function (arr) {
        const mergedInfo = [];
        for (var i = 0; i < arr.length; i++)
            for (var j = 0; j < arr[i].items.length; j++)
                mergedInfo.push(arr[i].items);
        console.log('marge', arr);
        return mergedInfo;
    };


    let selectedInfo;
    const setSelectedInfo = function (arr) {
        selectedInfo = [];
        for (var i = 0; i < arr.length; i++)
            selectedInfo.push(arr[i]);
    };

    const filterInfo = function () {
        if (filters[0] === 'ALL') {
            setSelectedInfo(mergeInfos(info));
        } else if (filters[0] === info[0].gender) {
            setSelectedInfo(info[0].items);
        } else if (filters[0] === info[1].gender) {
            setSelectedInfo(info[1].items);
        }

        if(filters[1] === 'ALL') {
            setSelectedInfo(mergeInfos(selectedInfo));
        } else if (filters[1] === selectedInfo[0].year + '') {
            setSelectedInfo(selectedInfo[0].items);
        } else if (filters[1] === selectedInfo[1].year + '') {
            setSelectedInfo(selectedInfo[1].items);
        } else if (filters[1] === selectedInfo[2].year + '') {
            setSelectedInfo(selectedInfo[2].items);
        } else if (filters[1] === selectedInfo[3].year + '') {
            setSelectedInfo(selectedInfo[3].items);
        }


        if(filters[2] === 'ALL') {
            console.log('problem' , selectedInfo);
            //setSelectedInfo(mergeInfos(selectedInfo));
        } else if (filters[2] === selectedInfo[0].age + '') {
            setSelectedInfo(selectedInfo[0].items);
        } else if (filters[2] === selectedInfo[1].age + '') {
            setSelectedInfo(selectedInfo[1].items);
        } else if (filters[2] === selectedInfo[2].age + '') {
            setSelectedInfo(selectedInfo[2].items);
        }

        console.log('items', selectedInfo);

        getName(selectedInfo);

    };

    let names = [];

    const getName = function (arr) {
        names = [];
        for(var i = 0; i < arr.length ; i++)
        {
            names.push(arr[i].name);
        }
        console.log(names);
    };

    const append = function () {
        $('.filter-result-zone').append(`
        <div class="name-zone">공현식</div>
        <div class="name-zone">이수정</div>
        <div class="name-zone">허재종</div>
        <div class="name-zone">홍주원</div>
        <div class="name-zone">홍준엽</div>
        `);
    };


})();

