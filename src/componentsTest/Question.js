export const question =  
    [{
        id: 1,
        question_id: 1,
        questionNum: "Q1",
        question: `좋아하는 맥주의\n *바디감은 무엇인가요?`,
        explain: `바디감은 입안에 머금은 맥주의 느낌을 뜻해요`,
        answer: [{LightBody: "가벼운 바디감"}, {MediumBody: "적당한 바디감"}, {FullBody: "무거운 바디감"}]
    },
    {
        id: 2,
        question_id: "LightBody",
        questionNum: "",
        question: "탄산이 있는\n 맥주를 좋아하시나요?",
        explain: "탄산음료같은 찐한 탄산을 좋아한다면 YES!",
        answer: [{crispy : "네"}, {Bitter: "아니요"}]
    },
    {
        id: 3,
        question_id: "crispy",
        questionNum: "",
        question: "청량감이 있는\n 맥주를 좋아하시나요?",
        explain: "",
        answer: [{"Lager" : "네"}, {"Pilsner": "아니요"}]
    },
    {
        id: 4,
        question_id: "FullBody",
        questionNum: "",
        question: "진한맛의 맥주를\n 좋아하시나요?",
        explain: "",
        answer: [{"Bock" : "네"}, {"Stout": "아니요"}]
    },
    {
        id: 5,
        question_id: "MediumBody",
        questionNum: "",
        question: "쌉쌀한맛의 맥주를\n 좋아하시나요?",
        explain: "",
        answer: [{Bitter : "네"},{Strong: "아니요"} ]
    },
    {
        id: 6,
        question_id: "Bitter",
        questionNum: "",
        question: "과일맛 맥주와\n 고소한맛 맥주 중\n 어느쪽을 더 좋아하시나요?",
        explain: "과일맛 맥주는 블랑, 고소한맛 맥주는 코젤 다크가 대표적이에요",
        answer: [{Fruity : "과일맛"},{"Dunkel" : "고소한맛"}]
    },
    {
        id: 7,
        question_id: "Fruity",
        questionNum: "",
        question: "쓴맛 맥주와\n 부드러운맛 맥주 중\n 어느 쪽으로 더 좋아하시나요?",
        explain: "",
        answer: [{Hoppy : "쓴맛"}, {"Weizen": "부드러운맛"}]
    },
    {
        id: 8,
        question_id: "Hoppy",
        questionNum: "",
        question: "쓴맛의 맥주를\n 좋아하시나요?",
        explain: "인생의 쓴맛을 쓴맛 맥주로 해소한다면 YES!!",
        answer: [{"Pale Ale" : "네"}, {"IPA": "아니요"}]
    },
    {
        id: 9,
        question_id: "Strong",
        questionNum: "",
        question: "진한맛의 맥주를\n 좋아하시나요?",
        explain: "아메리카노를 연하게 마신다면 NO!!",
        answer: [{"Bock" : "네"}, {"Stout": "아니요"}]
    }
]