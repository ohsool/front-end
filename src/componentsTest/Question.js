export const question =  
    [{
        id: 1,
        question_id: 1,
        questionNum: "Q1",
        question: `좋아하는 맥주의\n 바디감은 무엇인가요?`,
        answer: [{LightBody: "LightBody"}, {MediumBody: "MediumBody"}, {FullBody: "FullBody"}]
    },
    {
        id: 2,
        question_id: "LightBody",
        questionNum: "",
        question: "탄산이 있는\n 맥주를 좋아하시나요?",
        answer: [{crispy : "YES"}, {Bitter: "NO"}]
    },
    {
        id: 3,
        question_id: "crispy",
        questionNum: "",
        question: "청량감이 있는\n 맥주를 좋아하시나요?",
        answer: [{"Lager" : "YES"}, {"Pilsner": "NO"}]
    },
    {
        id: 4,
        question_id: "FullBody",
        questionNum: "",
        question: "진한맛의 맥주를\n 좋아하시나요?",
        answer: [{"Bock" : "YES"}, {"Stout": "NO"}]
    },
    {
        id: 5,
        question_id: "MediumBody",
        questionNum: "",
        question: "쌉쌀한맛의 맥주를\n 좋아하시나요?",
        answer: [{Bitter : "Bitter"},{Strong: "Strong"} ]
    },
    {
        id: 6,
        question_id: "Bitter",
        questionNum: "",
        question: "과일맛 맥주와\n 고소한맛 맥주 중\n 어느쪽을 더 좋아하시나요?",
        answer: [{Fruity : "Fruity"},{"Dunkel" : "Nutty"}]
    },
    {
        id: 7,
        question_id: "Fruity",
        questionNum: "",
        question: "쓴맛의 맥주와\n 부드러운 맥주 중\n 어느 쪽으로 더좋아하시나요?",
        answer: [{Hoppy : "Hoppy"}, {"Weizen": "Soft"}]
    },
    {
        id: 8,
        question_id: "Hoppy",
        questionNum: "",
        question: "쓴맛의 맥주를\n 좋아하시나요?",
        answer: [{"Pale Ale" : "YES"}, {"IPA": "NO"}]
    },
    {
        id: 9,
        question_id: "Strong",
        questionNum: "",
        question: "진한맛의 맥주를\n 좋아하시나요?",
        answer: [{"Bock" : "YES"}, {"Stout": "NO"}]
    }
]