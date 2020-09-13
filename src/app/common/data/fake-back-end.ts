export const usersData = [
    {
      email: 'ppldhsp@gmail.com',
      password: '123456',
      uid: '0001',
      name: 'test',
      accessToken: 'TEST-TOKEN',
    },
    {
      email: 'test@gmail.com',
      password: '123456',
      uid: '0001',
      name: 'test',
      accessToken: 'TEST-TOKEN',
    },
  ];

export let listMiningIndustry = [
    {
        id: 1,
        name: 'Doanh nghiệp phát triển nông thôn',
        foundedYear: '2010',
        province: 'Hà Nội',
        district: 'Hoàn kiếm',
        town: '-',
        xCoordinate: 'ABBS#@#@DSSA!D',
        yCoordinate: 'ABBS#@#@DSSA!D',
        productionValue: 50000,
        employees: 300,
    },
    {
        id: 2,
        name: 'Doanh nghiệp khai thác khoáng sản',
        foundedYear: '2009',
        province: 'Tây Ninh',
        district: 'Gia Lâm',
        town: '-',
        xCoordinate: 'ESFBS#@#@DSSA!D',
        yCoordinate: 'EEWS#@#@DSSA!D',
        productionValue: 30000,
        employees: 100,
    },
    {
        id: 3,
        name: 'Doanh nghiệp lâm ngư Hải Hoàng',
        foundedYear: '2009',
        province: 'Bắc Ninh',
        district: 'Bắc cạn',
        town: '-',
        xCoordinate: 'AAAGBS#@#@DSSA!D',
        yCoordinate: 'EEEW#@#@DSSA!D',
        productionValue: 1000,
        employees: 3222,
    },
    {
        id: 4,
        name: 'Doanh nghiệp phát triển khí tự nhiên',
        foundedYear: '2015',
        province: 'Tây Ninh',
        district: 'Hàng Lâm',
        town: '-',
        xCoordinate: 'KSSES#@#@DSSA!D',
        yCoordinate: 'SĐW#@#@DSSA!D',
        productionValue: 19999,
        employees: 3222,
    },
    {
        id: 5,
        name: 'Doanh nghiệp khai khoáng',
        foundedYear: '2018',
        province: 'Bắc Ninh',
        district: 'Thiên Phú',
        town: '-',
        xCoordinate: 'EEWWWA#@#@DSSA!D',
        yCoordinate: 'ABBBSSE@#@DSSA!D',
        productionValue: 23370,
        employees: 13462,
    }
];

export let listFields = [
    {
        id: 1,
        name: 'Khai khoáng',
        listBranches: [
            {
                id: 1,
                displayName: 'Sản phẩm khai thác và chế biến',
                name: 'exploitingAndProcessingProducts',
                listProduct: [
                    {
                        displayName: 'Than khai thác hầm lò',
                        name: 'coalMiningPit',
                        unit: 'Nghìn tấn'
                    },
                    {
                        displayName: 'Than khai thác hầm lò',
                        name: 'openPitCoalMining',
                        unit: 'Nghìn tấn'
                    },
                    {
                        displayName: 'Khác (nếu có)',
                        name: 'other',
                        unit: 'Nghìn tấn'
                    },
                ]
            },
            {
                id: 2,
                displayName: 'Sản phẩm khai thác và chế biến',
                name: 'declareTheOutputOfOilOndGasExploitedAndProcessedProducts',
                listProduct: [
                    {
                        displayName: 'Dầu thô',
                        name: 'crudeOil',
                        unit: 'Nghìn tấn'
                    },
                    {
                        displayName: 'Khí đồng hành',
                        name: 'companionGas',
                        unit: 'Nghìn tấn'
                    },
                    {
                        displayName: 'Khí không đồng hành',
                        name: 'gasDoesNotAccompany',
                        unit: 'Tr.m3'
                    },
                    {
                        displayName: 'Khí không thành phẩm',
                        name: 'finishedGas',
                        unit: 'Tr.m3'
                    },
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Chế biến, chế tạo',
    }
];

