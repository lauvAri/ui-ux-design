const majors = [
    //资源与安全工程学院
    {
        value: '城市地下空间工程',
        label: '城市地下空间工程',
        school: '资源与安全工程学院',
        
    },
    {
        value: '采矿工程',
        label: '采矿工程',
        school: '资源与安全工程学院',
    },
    {
        value: '安全工程',
        label: '安全工程',
        school: '资源与安全工程学院',
    },
    //资源加工与生物工程学院
    {
        value: '无机非金属材料工程',
        label: '无机非金属材料工程',
        school: '资源加工与生物工程学院',
    },
    {
        value: '矿物加工工程',
        label: '物联矿物加工工程网工程',
        school: '资源加工与生物工程学院',
    },
    {
        value: '生物工程',
        label: '生物工程',
        school: '资源加工与生物工程学院',
    },
    {
        value: '生物技术',
        label: '生物技术',
        school: '资源加工与生物工程学院',
    },
    //冶金与环境学院
    {
        value: '冶金工程',
        label: '冶金工程',
        school: '冶金与环境学院',
    },
    {
        value: '新能源材料与器件',
        label: '新能源材料与器件',
        school: '冶金与环境学院',
    },
    {
        value: '环境工程',
        label: '环境工程',
        school: '冶金与环境学院',
    },
    //信息科学与工程学院
    {
        value: '测控技术与仪器',
        label: '测控技术与仪器',
        school: '信息科学与工程学院',
    },
    {
        value: '电气工程及其自动化',
        label: '电气工程及其自动化',
        school: '信息科学与工程学院',
    },
    {
        value: '电子信息工程',
        label: '电子信息工程',
        school: '信息科学与工程学院',
    },
    {
        value: '通信工程',
        label: '通信工程',
        school: '信息科学与工程学院',
    },
    {
        value: '自动化',
        label: '自动化',
        school: '信息科学与工程学院',
    },
    {
        value: '计算机科学与技术',
        label: '计算机科学与技术',
        school: '信息科学与工程学院',
    },
    {
        value: '信息安全',
        label: '信息安全',
        school: '信息科学与工程学院',
    },
    {
        value: '物联网工程',
        label: '物联网工程',
        school: '信息科学与工程学院',
    },
    {
        value: '智能科学与技术',
        label: '智能科学与技术',
        school: '信息科学与工程学院',
    },
    //物理与电子学院
    {
        value: '应用物理学',
        label: '应用物理学',
        school: '物理与电子学院',
    },
    {
        value: '电子信息科学与技术',
        label: '电子信息科学与技术',
        school: '物理与电子学院',
    },
    {
        value: '光电信息科学与工程',
        label: '光电信息科学与工程',
        school: '物理与电子学院',
    },
    //能源科学与工程学院
    {
        value: '能源与动力工程',
        label: '能源与动力工程',
        school: '能源科学与工程学院',
    },
    {
        value: '新能源科学与工程',
        label: '新能源科学与工程',
        school: '能源科学与工程学院',
    },
    {
        value: '建筑环境与能源应用工程',
        label: '建筑环境与能源应用工程',
        school: '能源科学与工程学院',
    },
    //材料科学与工程学院
    {
        value: '材料科学与工程',
        label: '材料科学与工程',
        school: '材料科学与工程学院',
    },
    //粉末冶金研究院
    {
        value: '材料化学',
        label: '材料化学',
        school: '粉末冶金研究院',
    },
    {
        value: '粉体材料科学与工程',
        label: '粉体材料科学与工程',
        school: '粉末冶金研究院',
    },
    {
        value: '高分子材料与工程',
        label: '高分子材料与工程',
        school: '粉末冶金研究院',
    },
    //航空航天学院
    {
        value: '航空航天工程',
        label: '航空航天工程',
        school: '航空航天学院',
    },
    {
        value: '探测制导与控制技术',
        label: '探测制导与控制技术',
        school: '航空航天学院',
    },
    //交通运输工程学院
    {
        value: '交通运输',
        label: '交通运输',
        school: '交通运输工程学院',
    },
    {
        value: '交通设备与控制工程',
        label: '交通设备与控制工程',
        school: '交通运输工程学院',
    },
    {
        value: '物流工程',
        label: '物流工程',
        school: '交通运输工程学院',
    },
    //机电工程学院
    {
        value: '机械设计制造及其自动化',
        label: '机械设计制造及其自动化',
        school: '机电工程学院',
    },
    {
        value: '车辆工程',
        label: '车辆工程',
        school: '机电工程学院',
    },
    {
        value: '微电子科学与工程',
        label: '微电子科学与工程',
        school: '机电工程学院',
    },
    //化学化工学院
    {
        value: '化学工程与工艺',
        label: '化学工程与工艺',
        school: '化学化工学院',
    },
    {
        value: '应用化学',
        label: '应用化学',
        school: '化学化工学院',
    },
    {
        value: '制药工程',
        label: '制药工程',
        school: '化学化工学院',
    },
    //土木工程学院
    {
        value: '土木工程',
        label: '土木工程',
        school: '土木工程学院',
    },
    {
        value: '工程管理',
        label: '工程管理',
        school: '土木工程学院',
    },
    {
        value: '消防工程',
        label: '消防工程',
        school: '土木工程学院',
    },
    {
        value: '铁道工程',
        label: '铁道工程',
        school: '土木工程学院',
    },

    //软件学院
    {
        value: '软件工程',
        label: '软件工程',
        school: '软件学院',
    },
    //数学与统计学院
    {
        value: '数学与应用数学',
        label: '数学与应用数学',
        school: '数学与统计学院',
    },
    {
        value: '信息与计算科学',
        label: '信息与计算科学',
        school: '数学与统计学院',
    },
    {
        value: '统计学',
        label: '统计学',
        school: '数学与统计学院',
    },
    //地球科学与信息物理学院
    {
        value: '地理信息科学',
        label: '地理信息科学',
        school: '地球科学与信息物理学院',
    },
    {
        value: '信息工程',
        label: '信息工程',
        school: '地球科学与信息物理学院',
    },
    {
        value: '测绘工程',
        label: '地质测绘工程学',
        school: '地球科学与信息物理学院',
    },
    {
        value: '遥感科学与技术',
        label: '遥感科学与技术',
        school: '地球科学与信息物理学院',
    },
    {
        value: '地质工程',
        label: '地质工程',
        school: '地球科学与信息物理学院',
    },
    {
        value: '资源勘查工程',
        label: '资源勘查工程',
        school: '地球科学与信息物理学院',
    },
    {
        value: '地球信息科学与技术',
        label: '地球信息科学与技术',
        school: '地球科学与信息物理学院',
    },
    {
        value: '生物医学工程',
        label: '生物医学工程',
        school: '地球科学与信息物理学院',
    },
    //文学院
    {
        value: '汉语言文学',
        label: '汉语言文学',
        school: '文学院',
    },
    {
        value: '广播电视学',
        label: '广播电视学',
        school: '文学院',
    },
    {
        value: '数字出版',
        label: '数字出版',
        school: '文学院',
    },
    //外国语学院
    {
        value: '英语',
        label: '英语',
        school: '外国语学院',
    },
    {
        value: '法语',
        label: '法语',
        school: '外国语学院',
    },
    {
        value: '西班牙语',
        label: '西班牙语',
        school: '外国语学院',
    },
    {
        value: '日语',
        label: '日语',
        school: '外国语学院',
    },
    //商学院
    {
        value: '工商管理',
        label: '工商管理',
        school: '商学院',
    },
    {
        value: '市场营销',
        label: '市场营销',
        school: '商学院',
    },
    {
        value: '会计学',
        label: '会计学',
        school: '商学院',
    },
    {
        value: '财务管理',
        label: '财务管理',
        school: '商学院',
    },
    {
        value: '金融学',
        label: '金融学',
        school: '商学院',
    },
    {
        value: '国际经济与贸易',
        label: '国际经济与贸易',
        school: '商学院',
    },
    {
        value: '信息管理与信息系统',
        label: '信息管理与信息系统',
        school: '商学院',
    },
    {
        value: '电子商务',
        label: '电子商务',
        school: '商学院',
    },
    //马克思主义学院
    {
        value: '思想政治教育',
        label: '思想政治教育',
        school: '马克思主义学院',
    },
    //建筑与艺术学院
    {
        value: '建筑学',
        label: '建筑学',
        school: '建筑与艺术学院',
    },
    {
        value: '城乡规划',
        label: '城乡规划',
        school: '建筑与艺术学院',
    },
    {
        value: '工业设计',
        label: '工业设计',
        school: '建筑与艺术学院',
    },
    {
        value: '音乐表演',
        label: '音乐表演',
        school: '建筑与艺术学院',
    },
    {
        value: '视觉传达设计',
        label: '视觉传达设计',
        school: '建筑与艺术学院',
    },
    {
        value: '环境设计',
        label: '环境设计',
        school: '建筑与艺术学院',
    },
    {
        value: '产品设计',
        label: '产品设计',
        school: '建筑与艺术学院',
    },
    {
        value: '舞蹈表演',
        label: '舞蹈表演',
        school: '建筑与艺术学院',
    },
    //体育教研部
    {
        value: '运动训练',
        label: '运动训练',
        school: '体育教研部',
    },
    //公共管理学院
    {
        value: '行政管理',
        label: '行政管理',
        school: '公共管理学院',
    },
    {
        value: '社会学',
        label: '社会学',
        school: '公共管理学院',
    },
    {
        value: '劳动与社会保障',
        label: '劳动与社会保障',
        school: '公共管理学院',
    },
    //法学院
    {
        value: '法学',
        label: '法学',
        school: '法学院',
    },
    //湘雅医学院
    {
        value: '临床医学<5>',
        label: '临床医学<5>',
        school: '湘雅医学院',
    },
    {
        value: '临床医学<8>',
        label: '临床医学<8>',
        school: '湘雅医学院',
    },
    {
        value: '麻醉学',
        label: '麻醉学',
        school: '湘雅医学院',
    },
    {
        value: '精神医学',
        label: '精神医学',
        school: '湘雅医学院',
    },
    {
        value: '生物信息学',
        label: '生物信息学',
        school: '湘雅医学院',
    },
    {
        value: '医学检验技术',
        label: '医学检验技术',
        school: '湘雅医学院',
    },
    //基础医学院
    {
        value: '法医学',
        label: '法医学',
        school: '基础医学院',
    },
    //口腔医学院
    {
        value: '口腔医学',
        label: '口腔医学',
        school: '口腔医学院',
    },
    //公共卫生学院
    {
        value: '预防医学',
        label: '预防医学',
        school: '公共卫生学院',
    },
    //生物科学学院
    {
        value: '生物科学',
        label: '生物科学',
        school: '生物科学学院',
    },
    //药学院
    {
        value: '药学',
        label: '药学',
        school: '药学院',
    },
    //护理学院
    {
        value: '护理学',
        label: '护理学',
        school: '护理学院',
    },
]

export default majors;
