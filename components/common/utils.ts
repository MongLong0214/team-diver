export const convertPrompt = (prompt: string[]): string[] => {
    const promptDict: { [key: string]: string } = {
        "니트 / 스웨터": "knit",
        "후드": "hoodie",
        "스웻셔츠": "sweatshirt",
        "긴소매 티셔츠": "long sleeves",
        "반소매 티셔츠": "short sleeves",
        "셔츠": "shirts",
        "블라우스": "blouse",
        "피케이 티셔츠": "pique",
        "민소매 티셔츠": "sleeveless shirts",
        "블레이저": "blazer",
        "카디건": "cardigan",
        "트레이닝 자켓": "training jacket",
        "블루종": "blouson jacket",
        "코치 자켓": "coach jacket",
        "코트": "coat",
        "패딩": "padding jacket",
        "청바지": "jean",
        "코튼 팬츠": "cotton pants",
        "숏팬츠": "short pants",
        "슬렉스": "trousers",
        "조거팬츠": "jogger pants",
        "레깅스": "leggings",
        "미니 원피스": "short dress",
        "롱 원피스": "long dress",
        "미디 원피스": "med-length dress",
        "롱 스커트": "short skirt",
        "숏 스커트": "long skirt",
        "미디 스커트": "mid-length skirt"
    };
    return prompt.map((word) => promptDict[word] || word);
};

