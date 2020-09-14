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
                        id: 1,
                        displayName: 'Than khai thác hầm lò',
                        name: 'coalMiningPit',
                        unit: 'Nghìn tấn'
                    },
                    {
                        id: 2,
                        displayName: 'Than khai thác lộ thiên',
                        name: 'openPitCoalMining',
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
                        id: 4,
                        displayName: 'Dầu thô',
                        name: 'crudeOil',
                        unit: 'Nghìn tấn'
                    },
                    {
                        id: 5,
                        displayName: 'Khí đồng hành',
                        name: 'companionGas',
                        unit: 'Nghìn tấn'
                    },
                    {
                        id: 6,
                        displayName: 'Khí không đồng hành',
                        name: 'gasDoesNotAccompany',
                        unit: 'Tr.m3'
                    },
                    {
                        id: 7,
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

export let energyConsumption = [
    {
        id: 1,
        name: 'Khai khoáng',
        displayName: 'Than antraxit',
        unit: 'Nghìn tấn',
    },
    {
        id: 2,
        name: 'anthraciteCoal',
        displayName: 'Than bitum',
        unit: 'Nghìn tấn',
    },
    {
        id: 3,
        name: 'fuel',
        displayName: 'Dầu hỏa',
        unit: 'Nghìn tấn',
    },
    {
        id: 4,
        name: 'oilDO',
        displayName: 'Dầu DO',
        unit: 'Nghìn tấn',
    },
    {
        id: 5,
        name: 'oilFO',
        displayName: 'Dầu FO',
        unit: 'Nghìn tấn',
    },
    {
        id: 6,
        name: 'LPG',
        displayName: 'LPG',
        unit: 'Nghìn tấn',
    },
    {
        id: 7,
        name: 'biogas',
        displayName: 'Khí sinh học',
        unit: 'Nghìn tấn',
    },
    {
        id: 8,
        name: 'biomassGas',
        displayName: 'Khí sinh khối',
        unit: 'Nghìn tấn',
    },
];
