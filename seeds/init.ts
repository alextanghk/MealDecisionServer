import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("locations").del();

    // Inserts seed entries
    await knex("locations").insert([
        { zh_name: '九龍城', en_name: 'Kowloon city'},
        { zh_name: '九龍塘', en_name: 'Kowloon Tong'},
        { zh_name: '九龍灣', en_name: 'Kowloon Bay'},
        { zh_name: '上水', en_name: 'Sheung Shui'},
        { zh_name: '上環', en_name: 'Sheung Wan'},
        { zh_name: '土瓜灣', en_name: 'To Kwa Wan'},
        { zh_name: '大水坑', en_name: 'Tai Shui Hang'},
        { zh_name: '大角咀', en_name: 'Tai Kok Tsui'},
        { zh_name: '大埔', en_name: 'Tai Po'},
        { zh_name: '大圍', en_name: 'Tai Wai'},
        { zh_name: '大窩口', en_name: 'Tai Wo Hau'},
        { zh_name: '大嶼山', en_name: 'Lantao Island'},
        { zh_name: '中環', en_name: 'Central'},
        { zh_name: '元朗', en_name: 'Yuen Long'},
        { zh_name: '友愛', en_name: 'Yau Oi'},
        { zh_name: '天水圍', en_name: 'Tin Shui Wai'},
        { zh_name: '天后', en_name: 'Tin Hau'},
        { zh_name: '太子', en_name: 'Prince Edward'},
        { zh_name: '太古', en_name: 'Tai Koo'},
        { zh_name: '太和', en_name: 'Tai Wo'},
        { zh_name: '屯門', en_name: 'Tuen Mun'},
        { zh_name: '屯門中心', en_name: 'Tuen Mun Centre'},
        { zh_name: '火炭', en_name: 'Fo Tan'},
        { zh_name: '牛頭角', en_name: 'Ngau Tau Kok'},
        { zh_name: '北角', en_name: 'North Point'},
        { zh_name: '坪洲', en_name: 'Peng Chau'},
        { zh_name: '石門', en_name: 'Shek Mun'},
        { zh_name: '石硤尾', en_name: 'Shek Kip Mei'},
        { zh_name: '石塘咀', en_name: 'Shek Tong Tsui'},
        { zh_name: '兆康', en_name: 'Siu Hong'},
        { zh_name: '尖沙咀', en_name: 'Tsim Sha Tsui'},
        { zh_name: '西貢', en_name: 'Sai Kung'},
        { zh_name: '西營盤', en_name: 'Sai Ying Pun'},
        { zh_name: '西灣河', en_name: 'Sai Wan Ho'},
        { zh_name: '佐敦', en_name: 'Jordan'},
        { zh_name: '何文田', en_name: 'Ho Man Tin'},
        { zh_name: '利東', en_name: 'Lei Tung'},
        { zh_name: '坑口', en_name: 'Hang Hau'},
        { zh_name: '杏花村', en_name: 'Heng Fa Chuen'},
        { zh_name: '沙田', en_name: 'Sha Tin'},
        { zh_name: '秀茂坪', en_name: 'Sau Mau Ping'},
        { zh_name: '良景', en_name: 'Leung King'},
        { zh_name: '旺角', en_name: 'Mong Kok'},
        { zh_name: '東涌', en_name: 'Tung Chung'},
        { zh_name: '油麻地', en_name: 'Yau Ma Tei'},
        { zh_name: '油塘', en_name: 'Yau Tong'},
        { zh_name: '金鐘', en_name: 'Admiralty'},
        { zh_name: '長沙灣', en_name: 'Cheung Sha Wan'},
        { zh_name: '長洲', en_name: 'Cheung Chau'},
        { zh_name: '青衣', en_name: 'Tsing Yi'},
        { zh_name: '炮台山', en_name: 'Fortress Hill'},
        { zh_name: '紅磡', en_name: 'Hung Hom'},
        { zh_name: '美孚', en_name: 'Mei Foo'},
        { zh_name: '朗屏', en_name: 'Long Ping'},
        { zh_name: '柴灣', en_name: 'Chai Wan'},
        { zh_name: '海怡', en_name: 'South Horizons'},
        { zh_name: '粉嶺', en_name: 'Fanling'},
        { zh_name: '荃灣', en_name: 'Tsuen Wan'},
        { zh_name: '荔枝角', en_name: 'Lai Chi Kok'},
        { zh_name: '荔景', en_name: 'Lai King'},
        { zh_name: '馬鞍山', en_name: 'Ma On Shan'},
        { zh_name: '堅尼地城', en_name: 'Kennedy Town'},
        { zh_name: '將軍澳', en_name: 'Tseung Kwan O'},
        { zh_name: '康城', en_name: 'LOHAS Park'},
        { zh_name: '彩虹', en_name: 'Choi Hung'},
        { zh_name: '深水埗', en_name: 'Sham Shui Po'},
        { zh_name: '第一城', en_name: 'City One Shatin'},
        { zh_name: '黃大仙', en_name: 'Wong Tai Sin'},
        { zh_name: '黃竹坑', en_name: 'Wong Chuk Hang'},
        { zh_name: '黃埔', en_name: 'Whampoa'},
        { zh_name: '新蒲崗', en_name: 'San Po Kong'},
        { zh_name: '筲箕灣', en_name: 'Shau Kei Wan'},
        { zh_name: '葵芳', en_name: 'Kwai Fong'},
        { zh_name: '葵涌', en_name: 'Kwai Chung'},
        { zh_name: '葵興', en_name: 'Kwai Hing'},
        { zh_name: '慈雲山', en_name: 'Tsz Wan Shan'},
        { zh_name: '銅鑼灣', en_name: 'Causeway Bay'},
        { zh_name: '樂富', en_name: 'Lok Fu'},
        { zh_name: '調景嶺', en_name: 'Tiu Keng Leng'},
        { zh_name: '錦上路', en_name: 'Kam Sheung Road'},
        { zh_name: '鴨脷洲', en_name: 'Ap Lei Chau'},
        { zh_name: '薄扶林', en_name: 'Pok Fu Lam'},
        { zh_name: '藍田', en_name: 'Lam Tin'},
        { zh_name: '鯉魚門', en_name: 'Lei Yue Mun'},
        { zh_name: '寶琳', en_name: 'Po Lam'},
        { zh_name: '鰂魚涌', en_name: 'Quarry Bay'},
        { zh_name: '灣仔', en_name: 'Wan Chai'},
        { zh_name: '觀塘', en_name: 'Kwun Tong'},
        { zh_name: '鑽石山', en_name: 'Diamond Hill'},
        { zh_name: '禾輋', en_name: 'Wo Che'},
        { zh_name: '烏溪沙', en_name: 'Wu Kai Sha'},
        { zh_name: '深井', en_name: 'Sham Tseng'}
    ]);
    await knex("price_ranges").insert([
        { content: '~$50' },
        { content: '$51-$100' },
        { content: '$101-$200' },
        { content: '$201-$300' },
        { content: '$301-$400' },
        { content: '$401-$500' }
    ]);
};
