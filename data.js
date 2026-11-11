// G-TELP VOCA Day별 단어 데이터베이스
// 수록 범위: 기초단어(82단어) + Day 01 ~ Day 05 (각 50단어) = 총 332단어 완벽 탑재

const INITIAL_WORDS_DATA = [
  {
    id: "basic-01",
    day: "기초단어",
    no: "01",
    word: "prevent",
    phonetic: "[privént]",
    partOfSpeech: "동사",
    meaning: "막다, 방지하다",
    relatedForms: "prevention (명) 예방, 방지",
    paraphrase: ["stop", "avoid", "block"],
    exampleEn: "prevent a disaster",
    exampleKo: "재해를 방지하다",
    memo: ""
  },
  {
    id: "basic-02",
    day: "기초단어",
    no: "02",
    word: "publish",
    phonetic: "[pʌ́bliʃ]",
    partOfSpeech: "동사",
    meaning: "출판(발행)하다",
    relatedForms: "publisher (명) 출판사",
    paraphrase: ["issue", "release"],
    exampleEn: "publish a book",
    exampleKo: "책을 출판하다",
    memo: ""
  },
  {
    id: "basic-03",
    day: "기초단어",
    no: "03",
    word: "feature",
    phonetic: "[fíːtʃər]",
    partOfSpeech: "명사/동사",
    meaning: "특징 / 특별히 포함하다",
    relatedForms: "-",
    paraphrase: ["characteristic", "attribute"],
    exampleEn: "a key feature",
    exampleKo: "주요 특징",
    memo: "be featured in a magazine (잡지에 특집으로 실리다)"
  },
  {
    id: "basic-04",
    day: "기초단어",
    no: "04",
    word: "purpose",
    phonetic: "[pə́ːrpəs]",
    partOfSpeech: "명사",
    meaning: "목적",
    relatedForms: "-",
    paraphrase: ["aim", "goal", "objective"],
    exampleEn: "a main purpose",
    exampleKo: "주요 목적",
    memo: ""
  },
  {
    id: "basic-05",
    day: "기초단어",
    no: "05",
    word: "encourage",
    phonetic: "[inkə́ːridʒ]",
    partOfSpeech: "동사",
    meaning: "격려하다, 장려하다",
    relatedForms: "encouragement (명) 격려",
    paraphrase: ["inspire", "motivate", "promote"],
    exampleEn: "be encouraged to attend",
    exampleKo: "참석하도록 장려되다",
    memo: ""
  },
  {
    id: "basic-06",
    day: "기초단어",
    no: "06",
    word: "degree",
    phonetic: "[digríː]",
    partOfSpeech: "명사",
    meaning: "학위 / (온도·각도의) 도",
    relatedForms: "-",
    paraphrase: ["qualification", "level"],
    exampleEn: "a master's degree",
    exampleKo: "석사 학위",
    memo: ""
  },
  {
    id: "basic-07",
    day: "기초단어",
    no: "07",
    word: "private",
    phonetic: "[práivit]",
    partOfSpeech: "형용사",
    meaning: "개인의, 사적인 / 사립의",
    relatedForms: "privately (부) 사적으로",
    paraphrase: ["personal", "individual"],
    exampleEn: "a private lesson",
    exampleKo: "개인 교습",
    memo: ""
  },
  {
    id: "basic-08",
    day: "기초단어",
    no: "08",
    word: "concern",
    phonetic: "[kənsə́ːrn]",
    partOfSpeech: "명사/동사",
    meaning: "걱정, 우려; 관심사 / 우려하다",
    relatedForms: "concerned (형) 우려하는, 관련된",
    paraphrase: ["worry", "anxiety", "interest"],
    exampleEn: "express concern",
    exampleKo: "우려를 표하다",
    memo: "a major concern (주요 관심사)"
  },
  {
    id: "basic-09",
    day: "기초단어",
    no: "09",
    word: "increase",
    phonetic: "[inkríːs]",
    partOfSpeech: "동사/명사",
    meaning: "증가하다, 증가시키다 / 증가",
    relatedForms: "increasingly (부) 점점 더",
    paraphrase: ["grow", "rise", "expand"],
    exampleEn: "increase sales",
    exampleKo: "매출을 늘리다",
    memo: ""
  },
  {
    id: "basic-10",
    day: "기초단어",
    no: "10",
    word: "quite",
    phonetic: "[kwait]",
    partOfSpeech: "부사",
    meaning: "꽤, 상당히",
    relatedForms: "-",
    paraphrase: ["fairly", "pretty", "rather"],
    exampleEn: "quite interesting",
    exampleKo: "꽤 흥미로운",
    memo: "수기 메모: quiet(조용한)과 형태 혼동 주의"
  },
  {
    id: "basic-11",
    day: "기초단어",
    no: "11",
    word: "useful",
    phonetic: "[júːsfəl]",
    partOfSpeech: "형용사",
    meaning: "도움이 되는, 유용한",
    relatedForms: "-",
    paraphrase: ["helpful", "beneficial", "handy"],
    exampleEn: "useful tips for managing stress",
    exampleKo: "스트레스 관리에 유용한 팁",
    memo: ""
  },
  {
    id: "basic-12",
    day: "기초단어",
    no: "12",
    word: "directly",
    phonetic: "[diréktli]",
    partOfSpeech: "부사",
    meaning: "직접",
    relatedForms: "direct (형) 직접적인, direction (명) 방향, 지시",
    paraphrase: ["straight", "personally"],
    exampleEn: "sell goods directly",
    exampleKo: "제품을 직접 판매하다",
    memo: "수기 메모: direction(방향, 지시), director(임원, 감독) 연계"
  },
  {
    id: "basic-13",
    day: "기초단어",
    no: "13",
    word: "environmental",
    phonetic: "[invàiərənméntl]",
    partOfSpeech: "형용사",
    meaning: "환경의",
    relatedForms: "environment (명) 환경",
    paraphrase: ["ecological"],
    exampleEn: "environmental pollution",
    exampleKo: "환경 오염",
    memo: ""
  },
  {
    id: "basic-14",
    day: "기초단어",
    no: "14",
    word: "former",
    phonetic: "[fɔ́ːrmər]",
    partOfSpeech: "형용사",
    meaning: "(이)전의",
    relatedForms: "-",
    paraphrase: ["previous", "past", "prior"],
    exampleEn: "the former president",
    exampleKo: "전 대통령",
    memo: "수기 메모: farmer(농부)와 발음/형태 혼동 주의"
  },
  {
    id: "basic-15",
    day: "기초단어",
    no: "15",
    word: "participate",
    phonetic: "[pɑːrtísəpèit]",
    partOfSpeech: "동사",
    meaning: "(in) 참여[참가]하다",
    relatedForms: "participation (명) 참가, 참여",
    paraphrase: ["take part in", "join"],
    exampleEn: "participate in sports",
    exampleKo: "운동 경기에 참가하다",
    memo: ""
  },
  {
    id: "basic-16",
    day: "기초단어",
    no: "16",
    word: "describe",
    phonetic: "[diskráib]",
    partOfSpeech: "동사",
    meaning: "묘사하다",
    relatedForms: "description (명) 묘사, 서술",
    paraphrase: ["depict", "portray", "explain"],
    exampleEn: "describe a situation",
    exampleKo: "상황을 묘사하다",
    memo: ""
  },
  {
    id: "basic-17",
    day: "기초단어",
    no: "17",
    word: "necessary",
    phonetic: "[nésəsèri]",
    partOfSpeech: "형용사",
    meaning: "필요한",
    relatedForms: "necessarily (부) 필연적으로, 반드시",
    paraphrase: ["essential", "required", "needed"],
    exampleEn: "a necessary condition",
    exampleKo: "필요조건",
    memo: ""
  },
  {
    id: "basic-18",
    day: "기초단어",
    no: "18",
    word: "access",
    phonetic: "[ǽkses]",
    partOfSpeech: "명사/동사",
    meaning: "접근, 이용 권한 / 접근하다, 이용하다",
    relatedForms: "accessible (형) 접근하기 쉬운",
    paraphrase: ["entry", "admission", "approach"],
    exampleEn: "have access to documents",
    exampleKo: "문서에 접근할 수 있다",
    memo: "easier access to the item (그 품목을 더 쉽게 이용)"
  },
  {
    id: "basic-19",
    day: "기초단어",
    no: "19",
    word: "reach",
    phonetic: "[riːtʃ]",
    partOfSpeech: "동사",
    meaning: "도달하다, 이르다",
    relatedForms: "-",
    paraphrase: ["arrive at", "attain"],
    exampleEn: "reach a destination",
    exampleKo: "목적지에 이르다",
    memo: ""
  },
  {
    id: "basic-20",
    day: "기초단어",
    no: "20",
    word: "ordinary",
    phonetic: "[ɔ́ːrdənèri]",
    partOfSpeech: "형용사",
    meaning: "보통의",
    relatedForms: "extraordinary (형) 비범한, 놀라운",
    paraphrase: ["normal", "common", "usual"],
    exampleEn: "ordinary citizens",
    exampleKo: "일반 시민",
    memo: ""
  },
  {
    id: "basic-21",
    day: "기초단어",
    no: "21",
    word: "professor",
    phonetic: "[prəfésər]",
    partOfSpeech: "명사",
    meaning: "교수",
    relatedForms: "profession (명) 직업",
    paraphrase: ["lecturer", "academic"],
    exampleEn: "an associate professor",
    exampleKo: "부교수",
    memo: "수기 메모: associate(연상의, 준, 부) 연계"
  },
  {
    id: "basic-22",
    day: "기초단어",
    no: "22",
    word: "destroy",
    phonetic: "[distrɔ́i]",
    partOfSpeech: "동사",
    meaning: "파괴하다",
    relatedForms: "destruction (명) 파괴",
    paraphrase: ["ruin", "demolish", "damage"],
    exampleEn: "destroy a structure",
    exampleKo: "건물을 파괴하다",
    memo: "수기 메모: 반의어 construct(건설하다, 구성하다) 연계"
  },
  {
    id: "basic-23",
    day: "기초단어",
    no: "23",
    word: "compare",
    phonetic: "[kəmpέər]",
    partOfSpeech: "동사",
    meaning: "비교하다",
    relatedForms: "comparison (명) 비교",
    paraphrase: ["contrast", "match"],
    exampleEn: "compare A with B",
    exampleKo: "A와 B를 비교하다",
    memo: ""
  },
  {
    id: "basic-24",
    day: "기초단어",
    no: "24",
    word: "expect",
    phonetic: "[ikspékt]",
    partOfSpeech: "동사",
    meaning: "기대하다, 예상하다",
    relatedForms: "expectation (명) 기대, 예상",
    paraphrase: ["anticipate", "await", "look forward to"],
    exampleEn: "expect a change",
    exampleKo: "변화를 기대하다",
    memo: ""
  },
  {
    id: "basic-25",
    day: "기초단어",
    no: "25",
    word: "efficient",
    phonetic: "[ifíʃənt]",
    partOfSpeech: "형용사",
    meaning: "효율적인",
    relatedForms: "efficiency (명) 효율, 능률",
    paraphrase: ["effective", "productive"],
    exampleEn: "efficient operation",
    exampleKo: "효율적인 운영",
    memo: ""
  },
  {
    id: "basic-26",
    day: "기초단어",
    no: "26",
    word: "whole",
    phonetic: "[houl]",
    partOfSpeech: "형용사",
    meaning: "전체의",
    relatedForms: "-",
    paraphrase: ["entire", "complete", "total"],
    exampleEn: "the whole family",
    exampleKo: "온 가족",
    memo: ""
  },
  {
    id: "basic-27",
    day: "기초단어",
    no: "27",
    word: "protect",
    phonetic: "[prətékt]",
    partOfSpeech: "동사",
    meaning: "보호하다",
    relatedForms: "protection (명) 보호",
    paraphrase: ["guard", "defend", "preserve"],
    exampleEn: "protect one's privacy",
    exampleKo: "사생활을 보호하다",
    memo: ""
  },
  {
    id: "basic-28",
    day: "기초단어",
    no: "28",
    word: "experiment",
    phonetic: "[ikspérəmənt]",
    partOfSpeech: "명사/동사",
    meaning: "실험 / 실험하다",
    relatedForms: "experimental (형) 실험의",
    paraphrase: ["trial", "test"],
    exampleEn: "a scientific experiment",
    exampleKo: "과학 실험",
    memo: ""
  },
  {
    id: "basic-29",
    day: "기초단어",
    no: "29",
    word: "serve",
    phonetic: "[səːrv]",
    partOfSpeech: "동사",
    meaning: "(음식을) 제공하다 / (as)~의 역할을 하다",
    relatedForms: "service (명) 서비스, 봉사",
    paraphrase: ["provide", "function as", "work as"],
    exampleEn: "serve dinner",
    exampleKo: "저녁식사를 제공하다",
    memo: ""
  },
  {
    id: "basic-30",
    day: "기초단어",
    no: "30",
    word: "ancient",
    phonetic: "[éinʃənt]",
    partOfSpeech: "형용사",
    meaning: "고대의; 아주 오래된",
    relatedForms: "-",
    paraphrase: ["antique", "historic", "old"],
    exampleEn: "an ancient structure",
    exampleKo: "고대 건축물",
    memo: ""
  },
  {
    id: "basic-31",
    day: "기초단어",
    no: "31",
    word: "bold",
    phonetic: "[bould]",
    partOfSpeech: "형용사",
    meaning: "대담한, 과감한",
    relatedForms: "boldly (부) 대담하게",
    paraphrase: ["brave", "daring", "courageous"],
    exampleEn: "a bold move",
    exampleKo: "대담한 조치",
    memo: ""
  },
  {
    id: "basic-32",
    day: "기초단어",
    no: "32",
    word: "available",
    phonetic: "[əvéiləbl]",
    partOfSpeech: "형용사",
    meaning: "이용 가능한; 시간이 있는",
    relatedForms: "availability (명) 유효성, 이용 가능성",
    paraphrase: ["accessible", "obtainable"],
    exampleEn: "available resources",
    exampleKo: "이용 가능한 자원",
    memo: ""
  },
  {
    id: "basic-33",
    day: "기초단어",
    no: "33",
    word: "public",
    phonetic: "[pʌ́blik]",
    partOfSpeech: "형용사/명사",
    meaning: "대중의, 공공의 / 대중",
    relatedForms: "publicly (부) 공개적으로",
    paraphrase: ["civic", "community"],
    exampleEn: "public transportation",
    exampleKo: "대중교통",
    memo: ""
  },
  {
    id: "basic-34",
    day: "기초단어",
    no: "34",
    word: "usually",
    phonetic: "[júːʒuəli]",
    partOfSpeech: "부사",
    meaning: "보통, 대개",
    relatedForms: "usual (형) 보통의, 평소의",
    paraphrase: ["normally", "generally", "commonly"],
    exampleEn: "usually sleep at 12 p.m.",
    exampleKo: "보통 밤 12시에 자다",
    memo: ""
  },
  {
    id: "basic-35",
    day: "기초단어",
    no: "35",
    word: "gain",
    phonetic: "[gein]",
    partOfSpeech: "동사/명사",
    meaning: "얻다 / 이익; 증가",
    relatedForms: "-",
    paraphrase: ["obtain", "acquire", "win"],
    exampleEn: "gain popularity",
    exampleKo: "인기를 얻다",
    memo: ""
  },
  {
    id: "basic-36",
    day: "기초단어",
    no: "36",
    word: "spread",
    phonetic: "[spred]",
    partOfSpeech: "동사",
    meaning: "퍼지다, 퍼뜨리다",
    relatedForms: "-",
    paraphrase: ["circulate", "distribute", "extend"],
    exampleEn: "spread rumors",
    exampleKo: "루머를 퍼뜨리다",
    memo: ""
  },
  {
    id: "basic-37",
    day: "기초단어",
    no: "37",
    word: "competition",
    phonetic: "[kὰmpətíʃən]",
    partOfSpeech: "명사",
    meaning: "경쟁; 대회",
    relatedForms: "compete (동) 경쟁하다, competitive (형) 경쟁력 있는",
    paraphrase: ["contest", "rivalry"],
    exampleEn: "stiff competition",
    exampleKo: "치열한 경쟁",
    memo: "a national competition (전국 대회)"
  },
  {
    id: "basic-38",
    day: "기초단어",
    no: "38",
    word: "treat",
    phonetic: "[triːt]",
    partOfSpeech: "동사/명사",
    meaning: "대하다; 치료하다 / 선물, 대접",
    relatedForms: "treatment (명) 대우; 치료",
    paraphrase: ["deal with", "handle", "cure"],
    exampleEn: "treat a patient",
    exampleKo: "환자를 치료하다",
    memo: "be treated with respect (정중한 대우를 받다)"
  },
  {
    id: "basic-39",
    day: "기초단어",
    no: "39",
    word: "giant",
    phonetic: "[dʒáiənt]",
    partOfSpeech: "형용사",
    meaning: "거대한",
    relatedForms: "-",
    paraphrase: ["huge", "enormous", "massive"],
    exampleEn: "a giant tree",
    exampleKo: "거대한 나무",
    memo: ""
  },
  {
    id: "basic-40",
    day: "기초단어",
    no: "40",
    word: "contain",
    phonetic: "[kəntéin]",
    partOfSpeech: "동사",
    meaning: "포함하다, 들어 있다",
    relatedForms: "container (명) 용기, 그릇",
    paraphrase: ["include", "hold", "involve"],
    exampleEn: "contain dangerous substances",
    exampleKo: "위험물이 들어 있다",
    memo: ""
  },
  {
    id: "basic-41",
    day: "기초단어",
    no: "41",
    word: "firm",
    phonetic: "[fəːrm]",
    partOfSpeech: "명사/형용사",
    meaning: "회사 / 단단한, 확고한",
    relatedForms: "firmly (부) 확고하게",
    paraphrase: ["company", "solid", "hard"],
    exampleEn: "a law firm",
    exampleKo: "법률 사무소",
    memo: ""
  },
  {
    id: "basic-42",
    day: "기초단어",
    no: "42",
    word: "allow",
    phonetic: "[əláu]",
    partOfSpeech: "동사",
    meaning: "허락하다, 허용하다",
    relatedForms: "allowance (명) 용돈; 허용량",
    paraphrase: ["permit", "let", "enable"],
    exampleEn: "allow eating",
    exampleKo: "취식을 허용하다",
    memo: ""
  },
  {
    id: "basic-43",
    day: "기초단어",
    no: "43",
    word: "provide",
    phonetic: "[prəváid]",
    partOfSpeech: "동사",
    meaning: "제공하다",
    relatedForms: "provision (명) 공급, 제공",
    paraphrase: ["supply", "furnish", "offer"],
    exampleEn: "provide repair services",
    exampleKo: "수리 서비스를 제공하다",
    memo: ""
  },
  {
    id: "basic-44",
    day: "기초단어",
    no: "44",
    word: "satisfied",
    phonetic: "[sǽtəsfàid]",
    partOfSpeech: "형용사",
    meaning: "만족한",
    relatedForms: "satisfy (동) 만족시키다, satisfaction (명) 만족",
    paraphrase: ["content", "pleased"],
    exampleEn: "be satisfied with the result",
    exampleKo: "결과에 만족하다",
    memo: ""
  },
  {
    id: "basic-45",
    day: "기초단어",
    no: "45",
    word: "favorite",
    phonetic: "[féivərit]",
    partOfSpeech: "형용사",
    meaning: "가장 좋아하는",
    relatedForms: "favor (명) 호의, 부탁",
    paraphrase: ["preferred", "beloved"],
    exampleEn: "favorite food",
    exampleKo: "가장 좋아하는 음식",
    memo: ""
  },
  {
    id: "basic-46",
    day: "기초단어",
    no: "46",
    word: "certain",
    phonetic: "[sə́ːrtn]",
    partOfSpeech: "형용사",
    meaning: "확신하는; 어떤, 특정한",
    relatedForms: "certainly (부) 틀림없이",
    paraphrase: ["sure", "confident", "specific"],
    exampleEn: "in certain circumstances",
    exampleKo: "특정 상황에서",
    memo: ""
  },
  {
    id: "basic-47",
    day: "기초단어",
    no: "47",
    word: "recommend",
    phonetic: "[rèkəménd]",
    partOfSpeech: "동사",
    meaning: "권하다, 추천하다",
    relatedForms: "recommendation (명) 추천, 권고",
    paraphrase: ["suggest", "advise", "propose"],
    exampleEn: "strongly recommend",
    exampleKo: "강력히 권하다",
    memo: ""
  },
  {
    id: "basic-48",
    day: "기초단어",
    no: "48",
    word: "mention",
    phonetic: "[ménʃən]",
    partOfSpeech: "동사",
    meaning: "언급하다",
    relatedForms: "-",
    paraphrase: ["state", "refer to", "note"],
    exampleEn: "mention one's name",
    exampleKo: "이름을 언급하다",
    memo: ""
  },
  {
    id: "basic-49",
    day: "기초단어",
    no: "49",
    word: "influence",
    phonetic: "[ínfluəns]",
    partOfSpeech: "명사/동사",
    meaning: "영향(력) / 영향을 미치다",
    relatedForms: "influential (형) 영향력 있는",
    paraphrase: ["impact", "effect", "affect"],
    exampleEn: "the influence of the media",
    exampleKo: "미디어의 영향력",
    memo: "influence people's behaviors (사람들의 행동에 영향을 미치다)"
  },
  {
    id: "basic-50",
    day: "기초단어",
    no: "50",
    word: "recently",
    phonetic: "[ríːsntli]",
    partOfSpeech: "부사",
    meaning: "최근에",
    relatedForms: "recent (형) 최근의",
    paraphrase: ["lately"],
    exampleEn: "a recently opened restaurant",
    exampleKo: "최근에 개업한 식당",
    memo: ""
  },
  {
    id: "basic-51",
    day: "기초단어",
    no: "51",
    word: "population",
    phonetic: "[pὰpjuléiʃən]",
    partOfSpeech: "명사",
    meaning: "인구",
    relatedForms: "populate (동) 살다, 거주하다",
    paraphrase: ["inhabitants", "residents"],
    exampleEn: "population growth",
    exampleKo: "인구 증가",
    memo: ""
  },
  {
    id: "basic-52",
    day: "기초단어",
    no: "52",
    word: "claim",
    phonetic: "[kleim]",
    partOfSpeech: "동사/명사",
    meaning: "주장하다, 요구하다 / 주장",
    relatedForms: "-",
    paraphrase: ["assert", "demand", "insist"],
    exampleEn: "claim a reward",
    exampleKo: "보상을 요구하다",
    memo: ""
  },
  {
    id: "basic-53",
    day: "기초단어",
    no: "53",
    word: "examine",
    phonetic: "[igzǽmin]",
    partOfSpeech: "동사",
    meaning: "조사하다, 검사하다",
    relatedForms: "examination (명) 시험; 검사, 조사",
    paraphrase: ["inspect", "investigate", "check"],
    exampleEn: "examine the crime scene",
    exampleKo: "범죄 현장을 조사하다",
    memo: ""
  },
  {
    id: "basic-54",
    day: "기초단어",
    no: "54",
    word: "relate",
    phonetic: "[riléit]",
    partOfSpeech: "동사",
    meaning: "관련되다, 관련시키다",
    relatedForms: "relation (명) 관계, relative (형) 상대적인",
    paraphrase: ["connect", "link", "associate"],
    exampleEn: "be closely related to health",
    exampleKo: "건강과 밀접한 관련이 있다",
    memo: ""
  },
  {
    id: "basic-55",
    day: "기초단어",
    no: "55",
    word: "launch",
    phonetic: "[lɔːntʃ]",
    partOfSpeech: "동사",
    meaning: "시작하다; 출시하다",
    relatedForms: "-",
    paraphrase: ["start", "initiate", "introduce"],
    exampleEn: "launch a product",
    exampleKo: "제품을 출시하다",
    memo: ""
  },
  {
    id: "basic-56",
    day: "기초단어",
    no: "56",
    word: "abroad",
    phonetic: "[əbrɔ́ːd]",
    partOfSpeech: "부사",
    meaning: "해외로",
    relatedForms: "-",
    paraphrase: ["overseas"],
    exampleEn: "travel abroad",
    exampleKo: "해외여행을 하다",
    memo: ""
  },
  {
    id: "basic-57",
    day: "기초단어",
    no: "57",
    word: "behavior",
    phonetic: "[bihéivjər]",
    partOfSpeech: "명사",
    meaning: "행동",
    relatedForms: "behave (동) 행동하다",
    paraphrase: ["conduct", "action"],
    exampleEn: "violent behavior",
    exampleKo: "폭력적인 행동",
    memo: ""
  },
  {
    id: "basic-58",
    day: "기초단어",
    no: "58",
    word: "complete",
    phonetic: "[kəmplíːt]",
    partOfSpeech: "형용사/동사",
    meaning: "완전한, 완벽한 / 완료하다",
    relatedForms: "completely (부) 완전히",
    paraphrase: ["finish", "conclude", "total"],
    exampleEn: "complete a task",
    exampleKo: "임무를 완수하다",
    memo: "complete control (완전한 통제)"
  },
  {
    id: "basic-59",
    day: "기초단어",
    no: "59",
    word: "involve",
    phonetic: "[invɑ́lv]",
    partOfSpeech: "동사",
    meaning: "수반하다; 관여하다",
    relatedForms: "involvement (명) 관여, 개입",
    paraphrase: ["include", "entail", "engage"],
    exampleEn: "get involved in politics",
    exampleKo: "정치에 관여하다",
    memo: ""
  },
  {
    id: "basic-60",
    day: "기초단어",
    no: "60",
    word: "separate",
    phonetic: "[sépərèit]",
    partOfSpeech: "형용사/동사",
    meaning: "분리된 / 분리하다",
    relatedForms: "separation (명) 분리",
    paraphrase: ["divide", "split", "isolate"],
    exampleEn: "be separated from the family",
    exampleKo: "가족과 헤어지다",
    memo: ""
  },
  {
    id: "basic-61",
    day: "기초단어",
    no: "61",
    word: "invite",
    phonetic: "[inváit]",
    partOfSpeech: "동사",
    meaning: "초대하다",
    relatedForms: "invitation (명) 초대, 초대장",
    paraphrase: ["ask", "welcome"],
    exampleEn: "invite A to B",
    exampleKo: "A를 B에 초대하다",
    memo: ""
  },
  {
    id: "basic-62",
    day: "기초단어",
    no: "62",
    word: "waste",
    phonetic: "[weist]",
    partOfSpeech: "명사/동사",
    meaning: "낭비; 쓰레기 / 낭비하다",
    relatedForms: "wasteful (형) 낭비하는",
    paraphrase: ["squander", "rubbish", "garbage"],
    exampleEn: "a waste of time",
    exampleKo: "시간 낭비",
    memo: "dump nuclear waste (핵폐기물을 버리다)"
  },
  {
    id: "basic-63",
    day: "기초단어",
    no: "63",
    word: "common",
    phonetic: "[kάmən]",
    partOfSpeech: "형용사",
    meaning: "흔한; 공통의, 공동의",
    relatedForms: "commonly (부) 흔히",
    paraphrase: ["shared", "frequent", "mutual"],
    exampleEn: "a common mistake",
    exampleKo: "흔한 실수",
    memo: "a common goal (공동의 목표)"
  },
  {
    id: "basic-64",
    day: "기초단어",
    no: "64",
    word: "scene",
    phonetic: "[siːn]",
    partOfSpeech: "명사",
    meaning: "장면; (업)계",
    relatedForms: "scenery (명) 풍경",
    paraphrase: ["sight", "field", "world"],
    exampleEn: "the music scene",
    exampleKo: "음악계",
    memo: ""
  },
  {
    id: "basic-65",
    day: "기초단어",
    no: "65",
    word: "eventually",
    phonetic: "[ivéntʃuəli]",
    partOfSpeech: "부사",
    meaning: "결국, 마침내",
    relatedForms: "eventual (형) 궁극적인, 최후의",
    paraphrase: ["finally", "ultimately", "in the end"],
    exampleEn: "eventually become a CEO",
    exampleKo: "마침내 최고 경영자가 되다",
    memo: ""
  },
  {
    id: "basic-66",
    day: "기초단어",
    no: "66",
    word: "suggest",
    phonetic: "[səgdʒést]",
    partOfSpeech: "동사",
    meaning: "제안하다",
    relatedForms: "suggestion (명) 제안",
    paraphrase: ["propose", "recommend"],
    exampleEn: "suggest postponing the meeting",
    exampleKo: "회의를 연기하는 것을 제안하다",
    memo: ""
  },
  {
    id: "basic-67",
    day: "기초단어",
    no: "67",
    word: "present",
    phonetic: "[préznt] / [prizént]",
    partOfSpeech: "형용사/동사",
    meaning: "현재의 / 수여하다",
    relatedForms: "presentation (명) 발표",
    paraphrase: ["current", "award", "give"],
    exampleEn: "the present day",
    exampleKo: "오늘날",
    memo: "present an award (상을 수여하다)"
  },
  {
    id: "basic-68",
    day: "기초단어",
    no: "68",
    word: "huge",
    phonetic: "[hjuːdʒ]",
    partOfSpeech: "형용사",
    meaning: "엄청난, 거대한",
    relatedForms: "-",
    paraphrase: ["enormous", "massive", "immense"],
    exampleEn: "a huge crowd",
    exampleKo: "엄청난 군중",
    memo: ""
  },
  {
    id: "basic-69",
    day: "기초단어",
    no: "69",
    word: "subject",
    phonetic: "[sʌ́bdʒikt]",
    partOfSpeech: "명사",
    meaning: "주제, 화제; 과목",
    relatedForms: "-",
    paraphrase: ["topic", "theme", "discipline"],
    exampleEn: "change the subject",
    exampleKo: "화제를 바꾸다",
    memo: ""
  },
  {
    id: "basic-70",
    day: "기초단어",
    no: "70",
    word: "practice",
    phonetic: "[prǽktis]",
    partOfSpeech: "명사/동사",
    meaning: "연습 / 연습하다, 실행하다",
    relatedForms: "practical (형) 실용적인",
    paraphrase: ["exercise", "training", "rehearsal"],
    exampleEn: "basketball practice",
    exampleKo: "농구 연습",
    memo: ""
  },
  {
    id: "basic-71",
    day: "기초단어",
    no: "71",
    word: "modern",
    phonetic: "[mάdərn]",
    partOfSpeech: "형용사",
    meaning: "현대의",
    relatedForms: "modernize (동) 현대화하다",
    paraphrase: ["contemporary", "current"],
    exampleEn: "modern society",
    exampleKo: "현대 사회",
    memo: ""
  },
  {
    id: "basic-72",
    day: "기초단어",
    no: "72",
    word: "regular",
    phonetic: "[régjulər]",
    partOfSpeech: "형용사",
    meaning: "정기적인; 규칙적인",
    relatedForms: "regularly (부) 정기적으로",
    paraphrase: ["routine", "periodic", "steady"],
    exampleEn: "regular checks",
    exampleKo: "정기적인 점검",
    memo: ""
  },
  {
    id: "basic-73",
    day: "기초단어",
    no: "73",
    word: "figure",
    phonetic: "[fígjər]",
    partOfSpeech: "명사",
    meaning: "수치; 인물",
    relatedForms: "-",
    paraphrase: ["number", "person", "personality"],
    exampleEn: "a public figure",
    exampleKo: "공인",
    memo: ""
  },
  {
    id: "basic-74",
    day: "기초단어",
    no: "74",
    word: "probably",
    phonetic: "[prάbəbli]",
    partOfSpeech: "부사",
    meaning: "아마도",
    relatedForms: "probable (형) 개연성 있는",
    paraphrase: ["likely", "perhaps"],
    exampleEn: "probably true",
    exampleKo: "아마도 사실인",
    memo: ""
  },
  {
    id: "basic-75",
    day: "기초단어",
    no: "75",
    word: "statue",
    phonetic: "[stǽtʃuː]",
    partOfSpeech: "명사",
    meaning: "(조각)상",
    relatedForms: "-",
    paraphrase: ["sculpture", "monument"],
    exampleEn: "the Statue of Liberty",
    exampleKo: "자유의 여신상",
    memo: ""
  },
  {
    id: "basic-76",
    day: "기초단어",
    no: "76",
    word: "forward",
    phonetic: "[fɔ́ːrwərd]",
    partOfSpeech: "부사",
    meaning: "앞으로",
    relatedForms: "-",
    paraphrase: ["ahead", "onward"],
    exampleEn: "step forward",
    exampleKo: "앞으로 나아가다",
    memo: ""
  },
  {
    id: "basic-77",
    day: "기초단어",
    no: "77",
    word: "straight",
    phonetic: "[streit]",
    partOfSpeech: "부사/형용사",
    meaning: "똑바로; 연속으로 / 곧은, 직선의",
    relatedForms: "-",
    paraphrase: ["directly", "continuously"],
    exampleEn: "for two hours straight",
    exampleKo: "2시간 연속으로",
    memo: ""
  },
  {
    id: "basic-78",
    day: "기초단어",
    no: "78",
    word: "similar",
    phonetic: "[símələr]",
    partOfSpeech: "형용사",
    meaning: "비슷한",
    relatedForms: "similarity (명) 유사점",
    paraphrase: ["alike", "comparable", "resembling"],
    exampleEn: "look similar",
    exampleKo: "비슷하게 생기다",
    memo: ""
  },
  {
    id: "basic-79",
    day: "기초단어",
    no: "79",
    word: "deliver",
    phonetic: "[dilívər]",
    partOfSpeech: "동사",
    meaning: "배달하다",
    relatedForms: "delivery (명) 배달",
    paraphrase: ["carry", "transport", "send"],
    exampleEn: "deliver pizza",
    exampleKo: "피자를 배달하다",
    memo: ""
  },
  {
    id: "basic-80",
    day: "기초단어",
    no: "80",
    word: "weapon",
    phonetic: "[wépən]",
    partOfSpeech: "명사",
    meaning: "무기",
    relatedForms: "-",
    paraphrase: ["arms", "armament"],
    exampleEn: "nuclear weapons",
    exampleKo: "핵무기",
    memo: ""
  },
  {
    id: "basic-81",
    day: "기초단어",
    no: "81",
    word: "object",
    phonetic: "[άbdʒikt]",
    partOfSpeech: "명사",
    meaning: "물체; 목적",
    relatedForms: "objection (명) 이의, 반대",
    paraphrase: ["thing", "item", "purpose"],
    exampleEn: "a solid object",
    exampleKo: "단단한 물체",
    memo: ""
  },
  {
    id: "basic-82",
    day: "기초단어",
    no: "82",
    word: "remain",
    phonetic: "[riméin]",
    partOfSpeech: "동사",
    meaning: "계속[여전히] ~이다",
    relatedForms: "remainder (명) 나머지",
    paraphrase: ["stay", "continue to be"],
    exampleEn: "remain a mystery",
    exampleKo: "여전히 수수께끼이다",
    memo: ""
  },
  {
    id: "d01-01",
    day: "Day 01",
    no: "01",
    word: "ensure",
    phonetic: "[inʃúər]",
    partOfSpeech: "동사",
    meaning: "보장하다, 확실하게 하다",
    relatedForms: "-",
    paraphrase: ["guarantee", "make sure"],
    exampleEn: "ensure satisfactory results",
    exampleKo: "만족할 만한 결과를 보장하다",
    memo: "",
    options: [
      { word: "ensure", def: "보장하다, 확실하게 하다" },
      { word: "assure", def: "확신시키다, 장담하다" },
      { word: "insure", def: "보험에 들다" },
      { word: "endure", def: "견디다, 참다" }
    ]
  },
  {
    id: "d01-02",
    day: "Day 01",
    no: "02",
    word: "aware",
    phonetic: "[əwέər]",
    partOfSpeech: "형용사",
    meaning: "알고 있는, 의식하고 있는",
    relatedForms: "awareness (명) 의식, 인식",
    paraphrase: ["conscious"],
    exampleEn: "fully aware of the risk",
    exampleKo: "위험을 충분히 알고 있는",
    memo: "",
    options: [
      { word: "aware", def: "알고 있는, 의식하고 있는" },
      { word: "beware", def: "조심하다, 경계하다" },
      { word: "award", def: "수여하다; 상" },
      { word: "reward", def: "보상하다; 보상" }
    ]
  },
  {
    id: "d01-03",
    day: "Day 01",
    no: "03",
    word: "element",
    phonetic: "[éləmənt]",
    partOfSpeech: "명사",
    meaning: "요인, 요소",
    relatedForms: "-",
    paraphrase: ["factor", "aspect", "component"],
    exampleEn: "a key element in the relationship",
    exampleKo: "관계의 핵심 요소",
    memo: "",
    options: [
      { word: "element", def: "요인, 요소" },
      { word: "elevator", def: "엘리베이터, 승강기" },
      { word: "eliminate", def: "제거하다, 없애다" },
      { word: "elegant", def: "우아한, 품격 있는" }
    ]
  },
  {
    id: "d01-04",
    day: "Day 01",
    no: "04",
    word: "work",
    phonetic: "[wəːrk]",
    partOfSpeech: "동사/명사",
    meaning: "일하다, 근무하다 / 작동하다 / 일, 작업 / 작품, 저작물",
    relatedForms: "-",
    paraphrase: ["serve", "be employed", "function", "operate", "task", "job", "piece", "creation"],
    exampleEn: "prefer to work remotely",
    exampleKo: "원격으로 일하는 것을 선호하다",
    memo: "지텔프 동의어: Julie began to work as a nurse. -> (a) serve",
    options: [
      { word: "work", def: "일하다; 작동하다; 작품" },
      { word: "walk", def: "걷다, 산책하다" },
      { word: "wake", def: "깨어나다, 일어나다" },
      { word: "word", def: "단어, 말" }
    ]
  },
  {
    id: "d01-05",
    day: "Day 01",
    no: "05",
    word: "initial",
    phonetic: "[iníʃəl]",
    partOfSpeech: "형용사",
    meaning: "처음의, 초기의",
    relatedForms: "initially (부) 처음에, 초기에",
    paraphrase: ["first", "early"],
    exampleEn: "The initial response was encouraging.",
    exampleKo: "초기 반응은 고무적이었다.",
    memo: "",
    options: [
      { word: "initial", def: "처음의, 초기의" },
      { word: "initiative", def: "계획, 주도권" },
      { word: "imitate", def: "모방하다, 흉내내다" },
      { word: "intimate", def: "친밀한" }
    ]
  },
  {
    id: "d01-06",
    day: "Day 01",
    no: "06",
    word: "legal",
    phonetic: "[líːgəl]",
    partOfSpeech: "형용사",
    meaning: "법(률)의 / 합법적인",
    relatedForms: "illegal (형) 불법의",
    paraphrase: ["lawful", "legitimate"],
    exampleEn: "avoid legal problems",
    exampleKo: "법적인 문제를 피하다",
    memo: "",
    options: [
      { word: "legal", def: "법률의; 합법적인" },
      { word: "illegal", def: "불법적인" },
      { word: "lethal", def: "치명적인" },
      { word: "loyal", def: "충실한, 충성스러운" }
    ]
  },
  {
    id: "d01-07",
    day: "Day 01",
    no: "07",
    word: "remove",
    phonetic: "[rimúːv]",
    partOfSpeech: "동사",
    meaning: "제거하다, 없애다",
    relatedForms: "removal (명) 제거",
    paraphrase: ["eliminate", "get rid of"],
    exampleEn: "remove weeds regularly",
    exampleKo: "잡초를 주기적으로 제거하다",
    memo: "",
    options: [
      { word: "remove", def: "제거하다, 없애다" },
      { word: "remote", def: "원격의, 외딴" },
      { word: "remind", def: "상기시키다" },
      { word: "remain", def: "남아있다, 머무르다" }
    ]
  },
  {
    id: "d01-08",
    day: "Day 01",
    no: "08",
    word: "maintain",
    phonetic: "[meintéin]",
    partOfSpeech: "동사",
    meaning: "유지하다, 유지관리하다",
    relatedForms: "maintenance (명) 유지 보수, 관리",
    paraphrase: ["keep", "uphold", "continue", "sustain"],
    exampleEn: "maintain high standards",
    exampleKo: "높은 기준을 유지하다",
    memo: "",
    options: [
      { word: "maintain", def: "유지하다, 유지관리하다" },
      { word: "contain", def: "포함하다, 담고 있다" },
      { word: "obtain", def: "얻다, 획득하다" },
      { word: "retain", def: "보유하다, 간직하다" }
    ]
  },
  {
    id: "d01-09",
    day: "Day 01",
    no: "09",
    word: "assure",
    phonetic: "[əʃúər]",
    partOfSpeech: "동사",
    meaning: "확신시키다, 장담하다",
    relatedForms: "assurance (명) 확신, 보장",
    paraphrase: ["convince", "promise", "persuade"],
    exampleEn: "The restaurant assured customers that it will not raise the prices.",
    exampleKo: "그 식당은 가격을 올리지 않을 것이라고 고객들에게 확신을 주었다.",
    memo: "지텔프 동의어: The mechanics assured me that the repair would be finished by Monday. -> (b) promised",
    options: [
      { word: "assure", def: "확신시키다, 장담하다" },
      { word: "ensure", def: "보장하다, 확실히 하다" },
      { word: "assume", def: "추정하다, 떠맡다" },
      { word: "assist", def: "돕다, 조력하다" }
    ]
  },
  {
    id: "d01-10",
    day: "Day 01",
    no: "10",
    word: "knowledge",
    phonetic: "[nάlidʒ]",
    partOfSpeech: "명사",
    meaning: "지식",
    relatedForms: "knowledgeable (형) 박식한",
    paraphrase: ["expertise"],
    exampleEn: "have extensive knowledge about history",
    exampleKo: "역사에 대해 광범위한 지식을 가지고 있다",
    memo: ""
  },
  {
    id: "d01-11",
    day: "Day 01",
    no: "11",
    word: "part",
    phonetic: "[pɑːrt]",
    partOfSpeech: "명사",
    meaning: "부분, 일부 / 부품",
    relatedForms: "-",
    paraphrase: ["piece", "sector", "component", "element"],
    exampleEn: "a key part of success",
    exampleKo: "성공의 중요한 부분",
    memo: ""
  },
  {
    id: "d01-12",
    day: "Day 01",
    no: "12",
    word: "secure",
    phonetic: "[sikjúər]",
    partOfSpeech: "형용사/동사",
    meaning: "안정적인, 안전한 / 얻다, 확보하다",
    relatedForms: "securely (부) 안전하게, security (명) 보안, 경비",
    paraphrase: ["safe", "stable", "obtain", "gain", "acquire", "win"],
    exampleEn: "secure a contract",
    exampleKo: "계약을 따내다",
    memo: "지텔프 동의어: Jack is looking for a secure job. -> (a) stable"
  },
  {
    id: "d01-13",
    day: "Day 01",
    no: "13",
    word: "benefit",
    phonetic: "[bénəfit]",
    partOfSpeech: "명사/동사",
    meaning: "이점, 이득 / 이득을 얻다, 이득을 주다",
    relatedForms: "beneficial (형) 이로운, 유익한",
    paraphrase: ["advantage"],
    exampleEn: "benefit from supporting the event",
    exampleKo: "행사를 후원함으로써 이익을 얻다",
    memo: ""
  },
  {
    id: "d01-14",
    day: "Day 01",
    no: "14",
    word: "aspect",
    phonetic: "[ǽspekt]",
    partOfSpeech: "명사",
    meaning: "측면, 면",
    relatedForms: "-",
    paraphrase: ["feature", "factor", "element"],
    exampleEn: "the most important aspect of education",
    exampleKo: "교육의 가장 중요한 측면",
    memo: ""
  },
  {
    id: "d01-15",
    day: "Day 01",
    no: "15",
    word: "ability",
    phonetic: "[əbíliti]",
    partOfSpeech: "명사",
    meaning: "능력",
    relatedForms: "-",
    paraphrase: ["capability"],
    exampleEn: "ability to survive in the desert areas",
    exampleKo: "사막 지역에서 살아남는 능력",
    memo: ""
  },
  {
    id: "d01-16",
    day: "Day 01",
    no: "16",
    word: "function",
    phonetic: "[fʌ́ŋkʃən]",
    partOfSpeech: "동사/명사",
    meaning: "작동하다, 기능을 하다 / 기능, 작용",
    relatedForms: "functional (형) 기능적인, 작동되는",
    paraphrase: ["operate", "run", "perform", "serve"],
    exampleEn: "perform important functions",
    exampleKo: "중요한 기능을 수행하다",
    memo: ""
  },
  {
    id: "d01-17",
    day: "Day 01",
    no: "17",
    word: "seek",
    phonetic: "[siːk]",
    partOfSpeech: "동사",
    meaning: "구하다, 찾다",
    relatedForms: "-",
    paraphrase: ["pursue", "look for"],
    exampleEn: "seek shelter inside a cave",
    exampleKo: "동굴 안에서 피신처를 찾다",
    memo: ""
  },
  {
    id: "d01-18",
    day: "Day 01",
    no: "18",
    word: "surface",
    phonetic: "[sə́ːrfis]",
    partOfSpeech: "명사",
    meaning: "표면",
    relatedForms: "-",
    paraphrase: ["face", "exterior", "covering"],
    exampleEn: "float on the surface of the water",
    exampleKo: "물의 표면에 뜨다",
    memo: "지텔프 동의어: The surface of the coin was very clean. -> (b) face"
  },
  {
    id: "d01-19",
    day: "Day 01",
    no: "19",
    word: "resource",
    phonetic: "[ríːsɔːrs]",
    partOfSpeech: "명사",
    meaning: "자원, 자료",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "rich in natural resources",
    exampleKo: "천연자원이 풍부한",
    memo: "수기 메모: source; 원천, 근원"
  },
  {
    id: "d01-20",
    day: "Day 01",
    no: "20",
    word: "address",
    phonetic: "[ədrés] / [ǽdres]",
    partOfSpeech: "동사/명사",
    meaning: "(문제 등) 다루다, 대처하다, 해결하다 / 주소 / 연설, 강연",
    relatedForms: "-",
    paraphrase: ["tackle", "settle", "resolve", "speech", "talk"],
    exampleEn: "address the problem promptly",
    exampleKo: "문제를 신속히 해결하다",
    memo: "지텔프 동의어: Our service team will address the issue promptly. -> (a) resolve"
  },
  {
    id: "d01-21",
    day: "Day 01",
    no: "21",
    word: "affect",
    phonetic: "[əfékt]",
    partOfSpeech: "동사",
    meaning: "영향을 미치다",
    relatedForms: "affection (명) 애정",
    paraphrase: ["influence", "impact"],
    exampleEn: "be affected by climate change",
    exampleKo: "기후 변화에 의해 영향을 받다",
    memo: "수기 메모: effect 영향, 결과, 가져오다"
  },
  {
    id: "d01-22",
    day: "Day 01",
    no: "22",
    word: "previous",
    phonetic: "[príːviəs]",
    partOfSpeech: "형용사",
    meaning: "이전의, 예전의",
    relatedForms: "previously (부) 이전에",
    paraphrase: ["prior", "earlier"],
    exampleEn: "in accord with previous research",
    exampleKo: "이전의 연구와 일치하는",
    memo: ""
  },
  {
    id: "d01-23",
    day: "Day 01",
    no: "23",
    word: "reveal",
    phonetic: "[rivíːl]",
    partOfSpeech: "동사",
    meaning: "밝히다, 드러내다",
    relatedForms: "-",
    paraphrase: ["unveil", "disclose"],
    exampleEn: "reveal the truth",
    exampleKo: "진실을 밝히다",
    memo: ""
  },
  {
    id: "d01-24",
    day: "Day 01",
    no: "24",
    word: "suffer",
    phonetic: "[sʌ́fər]",
    partOfSpeech: "동사",
    meaning: "(고통, 어려움 등을) 겪다",
    relatedForms: "-",
    paraphrase: ["undergo"],
    exampleEn: "suffer from a disease",
    exampleKo: "질병으로 고통받다",
    memo: ""
  },
  {
    id: "d01-25",
    day: "Day 01",
    no: "25",
    word: "theory",
    phonetic: "[θíːəri]",
    partOfSpeech: "명사",
    meaning: "이론, 학설",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "the theory of evolution",
    exampleKo: "진화론",
    memo: ""
  },
  {
    id: "d01-26",
    day: "Day 01",
    no: "26",
    word: "indicate",
    phonetic: "[índikèit]",
    partOfSpeech: "동사",
    meaning: "(조사, 연구 등) 보여주다, 나타내다",
    relatedForms: "indication (명) 조짐, 징후",
    paraphrase: ["suggest", "show", "reveal", "signify"],
    exampleEn: "Research indicates that sunshine can help you sleep better.",
    exampleKo: "연구는 햇빛이 잠을 더 잘 자도록 도와줄 수 있다는 것을 보여주고 있다.",
    memo: "지텔프 동의어: Polls indicate that over 60% of the residents are against the policy. -> (b) suggest"
  },
  {
    id: "d01-27",
    day: "Day 01",
    no: "27",
    word: "appropriate",
    phonetic: "[əpróupriət]",
    partOfSpeech: "형용사",
    meaning: "적절한, 적합한",
    relatedForms: "appropriately (부) 적절하게",
    paraphrase: ["suitable", "right", "relevant", "proper"],
    exampleEn: "choose appropriate tools",
    exampleKo: "적합한 도구를 고르다",
    memo: ""
  },
  {
    id: "d01-28",
    day: "Day 01",
    no: "28",
    word: "circumstance",
    phonetic: "[sə́ːrkəmstæ̀ns]",
    partOfSpeech: "명사",
    meaning: "상황, 사정, 환경",
    relatedForms: "-",
    paraphrase: ["situation", "condition"],
    exampleEn: "despite difficult circumstances",
    exampleKo: "어려운 상황에도 불구하고",
    memo: ""
  },
  {
    id: "d01-29",
    day: "Day 01",
    no: "29",
    word: "attitude",
    phonetic: "[ǽtitjùːd]",
    partOfSpeech: "명사",
    meaning: "태도, 사고방식",
    relatedForms: "-",
    paraphrase: ["stance", "view", "thinking"],
    exampleEn: "positive attitude toward everything",
    exampleKo: "매사에 긍정적인 태도",
    memo: ""
  },
  {
    id: "d01-30",
    day: "Day 01",
    no: "30",
    word: "economic",
    phonetic: "[ìːkənɑ́mik]",
    partOfSpeech: "형용사",
    meaning: "경제의, 경제학의",
    relatedForms: "economical (형) 절약하는, economics (명) 경제학",
    paraphrase: [],
    exampleEn: "steady economic growth",
    exampleKo: "꾸준한 경제 성장",
    memo: ""
  },
  {
    id: "d01-31",
    day: "Day 01",
    no: "31",
    word: "provision",
    phonetic: "[prəvíʒən]",
    partOfSpeech: "명사",
    meaning: "공급, 제공 / 조항, 규정",
    relatedForms: "provide (동) 제공하다",
    paraphrase: ["supply"],
    exampleEn: "the provision of solar energy to rural areas",
    exampleKo: "농촌 지역에 대한 태양 에너지의 공급",
    memo: ""
  },
  {
    id: "d01-32",
    day: "Day 01",
    no: "32",
    word: "region",
    phonetic: "[ríːdʒən]",
    partOfSpeech: "명사",
    meaning: "지역, 지방",
    relatedForms: "regional (형) 지역의, 지방의",
    paraphrase: ["area", "zone"],
    exampleEn: "Camels are found in desert regions.",
    exampleKo: "낙타는 사막 지역에서 발견된다.",
    memo: ""
  },
  {
    id: "d01-33",
    day: "Day 01",
    no: "33",
    word: "income",
    phonetic: "[ínkʌm]",
    partOfSpeech: "명사",
    meaning: "수입, 소득",
    relatedForms: "-",
    paraphrase: ["salary", "earnings", "revenue"],
    exampleEn: "earn additional income",
    exampleKo: "추가적인 수입을 벌다",
    memo: ""
  },
  {
    id: "d01-34",
    day: "Day 01",
    no: "34",
    word: "solid",
    phonetic: "[sάlid]",
    partOfSpeech: "형용사",
    meaning: "단단한, 견고한, 굳건한",
    relatedForms: "-",
    paraphrase: ["firm", "concrete", "strong", "sturdy"],
    exampleEn: "need a solid foundation",
    exampleKo: "단단한 기반을 필요로 하다",
    memo: "지텔프 동의어: This table has solid construction. -> (a) sturdy"
  },
  {
    id: "d01-35",
    day: "Day 01",
    no: "35",
    word: "specific",
    phonetic: "[spisífik]",
    partOfSpeech: "형용사",
    meaning: "구체적인, 특정한",
    relatedForms: "specifically (부) 특히, 구체적으로",
    paraphrase: ["particular", "special"],
    exampleEn: "meet customers' specific needs",
    exampleKo: "고객의 구체적인 요구를 충족시키다",
    memo: ""
  },
  {
    id: "d01-36",
    day: "Day 01",
    no: "36",
    word: "range",
    phonetic: "[reindʒ]",
    partOfSpeech: "명사/동사",
    meaning: "범위, 폭 / ~에서 ~의 범위에 이르다",
    relatedForms: "-",
    paraphrase: ["scope"],
    exampleEn: "within the normal range",
    exampleKo: "정상 범위에 있는",
    memo: "숙어: a range of 다양한(= an array of)"
  },
  {
    id: "d01-37",
    day: "Day 01",
    no: "37",
    word: "professional",
    phonetic: "[prəféʃənl]",
    partOfSpeech: "형용사/명사",
    meaning: "전문가의, 전문가다운, 프로의 / 전문가, 전문직 종사자",
    relatedForms: "professionally (부) 프로답게, 프로처럼, profession (명) 직업",
    paraphrase: ["experienced", "skilled"],
    exampleEn: "a former professional figure skater",
    exampleKo: "전직 프로 피겨 스케이팅 선수",
    memo: ""
  },
  {
    id: "d01-38",
    day: "Day 01",
    no: "38",
    word: "scheme",
    phonetic: "[skiːm]",
    partOfSpeech: "명사",
    meaning: "계획 / 계략, 책략",
    relatedForms: "-",
    paraphrase: ["plan", "plot"],
    exampleEn: "a new scheme to develop local infrastructure",
    exampleKo: "지역 기반 시설을 개발하기 위한 새로운 계획",
    memo: "수기 메모: 사회기반시설"
  },
  {
    id: "d01-39",
    day: "Day 01",
    no: "39",
    word: "authority",
    phonetic: "[əθɔ́ːrəti]",
    partOfSpeech: "명사",
    meaning: "권한, 권위, 권위자 / 권한을 가진 사람, 당국",
    relatedForms: "-",
    paraphrase: ["authorities"],
    exampleEn: "challenge governmental authority",
    exampleKo: "정부의 권위에 도전하다",
    memo: ""
  },
  {
    id: "d01-40",
    day: "Day 01",
    no: "40",
    word: "state",
    phonetic: "[steit]",
    partOfSpeech: "동사/명사",
    meaning: "말하다, 진술하다 / 상태 / (행정구역) 주",
    relatedForms: "statement (명) 발언, 성명",
    paraphrase: ["say", "report", "condition"],
    exampleEn: "The researcher stated that the study was a success.",
    exampleKo: "그 연구자는 연구가 성공적이었다고 말했다.",
    memo: ""
  },
  {
    id: "d01-41",
    day: "Day 01",
    no: "41",
    word: "acquire",
    phonetic: "[əkwáiər]",
    partOfSpeech: "동사",
    meaning: "습득하다 / 인수하다, 획득하다",
    relatedForms: "-",
    paraphrase: ["learn", "attain", "land", "gain", "obtain", "secure"],
    exampleEn: "acquire the ability to read at the age of seven",
    exampleKo: "일곱 살에 읽을 수 있는 능력을 습득하다",
    memo: ""
  },
  {
    id: "d01-42",
    day: "Day 01",
    no: "42",
    word: "appoint",
    phonetic: "[əpɔ́int]",
    partOfSpeech: "동사",
    meaning: "임명하다, 지명하다",
    relatedForms: "-",
    paraphrase: ["name", "assign"],
    exampleEn: "be appointed as chairman",
    exampleKo: "의장으로 임명되다",
    memo: "지텔프 동의어: Serena Williams was appointed UNICEF's Goodwill Ambassador. -> (b) named"
  },
  {
    id: "d01-43",
    day: "Day 01",
    no: "43",
    word: "adopt",
    phonetic: "[ədάpt]",
    partOfSpeech: "동사",
    meaning: "채택하다, 택하다 / 입양하다",
    relatedForms: "adoption (명) 채택; 입양",
    paraphrase: ["choose", "select", "pick"],
    exampleEn: "adopt a new policy",
    exampleKo: "새로운 정책을 채택하다",
    memo: ""
  },
  {
    id: "d01-44",
    day: "Day 01",
    no: "44",
    word: "investigate",
    phonetic: "[invéstəgèit]",
    partOfSpeech: "동사",
    meaning: "조사하다, 수사하다",
    relatedForms: "investigation (명) 조사, 수사, investigator (명) 수사관",
    paraphrase: ["examine", "inspect"],
    exampleEn: "investigate the cause of the accident",
    exampleKo: "사고의 원인을 조사하다",
    memo: ""
  },
  {
    id: "d01-45",
    day: "Day 01",
    no: "45",
    word: "capable",
    phonetic: "[kéipəbl]",
    partOfSpeech: "형용사",
    meaning: "~할 능력이 있는",
    relatedForms: "capability (명) 능력",
    paraphrase: ["able"],
    exampleEn: "capable of learning new skills fast",
    exampleKo: "새로운 기술을 빨리 배울 수 있는",
    memo: ""
  },
  {
    id: "d01-46",
    day: "Day 01",
    no: "46",
    word: "declare",
    phonetic: "[diklέər]",
    partOfSpeech: "동사",
    meaning: "선포하다, 선언하다",
    relatedForms: "declaration (명) 선언, 선포",
    paraphrase: ["announce"],
    exampleEn: "declare bankruptcy",
    exampleKo: "파산을 선언하다",
    memo: ""
  },
  {
    id: "d01-47",
    day: "Day 01",
    no: "47",
    word: "crucial",
    phonetic: "[krúːʃəl]",
    partOfSpeech: "형용사",
    meaning: "중대한, 매우 중요한",
    relatedForms: "-",
    paraphrase: ["vital", "important", "essential", "critical"],
    exampleEn: "a crucial aspect of life",
    exampleKo: "인생의 중요한 측면",
    memo: ""
  },
  {
    id: "d01-48",
    day: "Day 01",
    no: "48",
    word: "aim",
    phonetic: "[eim]",
    partOfSpeech: "명사/동사",
    meaning: "목표, 목적 / ~을 목표로 하다",
    relatedForms: "-",
    paraphrase: ["objective", "goal", "target", "strive"],
    exampleEn: "the aim of this study",
    exampleKo: "이 연구의 목적",
    memo: ""
  },
  {
    id: "d01-49",
    day: "Day 01",
    no: "49",
    word: "additional",
    phonetic: "[ədíʃənl]",
    partOfSpeech: "형용사",
    meaning: "추가의",
    relatedForms: "add (동) 추가하다, addition (명) 추가, 추가된 것",
    paraphrase: ["more", "further", "extra"],
    exampleEn: "incur additional expenses",
    exampleKo: "추가 비용이 들다",
    memo: "수기 메모: 초래하다, 발생시키다"
  },
  {
    id: "d01-50",
    day: "Day 01",
    no: "50",
    word: "conflict",
    phonetic: "[kάnflikt]",
    partOfSpeech: "명사",
    meaning: "갈등, 대립",
    relatedForms: "conflicting (형) 모순된, 상반된",
    paraphrase: ["opposition", "dispute"],
    exampleEn: "in conflict with some politicians",
    exampleKo: "일부 정치인들과 대립하는",
    memo: ""
  },
  {
    id: "d02-01",
    day: "Day 02",
    no: "01",
    word: "apparent",
    phonetic: "[əpέrənt]",
    partOfSpeech: "형용사",
    meaning: "분명한, 명백한",
    relatedForms: "apparently (부) 명백히, 겉보기에는",
    paraphrase: ["obvious", "clear", "evident"],
    exampleEn: "for no apparent reason",
    exampleKo: "뚜렷한 이유 없이",
    memo: "",
    options: [
      { word: "apparent", def: "분명한, 명백한" },
      { word: "appeal", def: "호소하다, 매력" },
      { word: "appear", def: "나타나다, ~인 것 같다" },
      { word: "applaud", def: "박수갈채를 보내다" }
    ]
  },
  {
    id: "d02-02",
    day: "Day 02",
    no: "02",
    word: "credit",
    phonetic: "[krédit]",
    partOfSpeech: "동사/명사",
    meaning: "공로를 인정하다 / 칭찬, 인정 / 신용",
    relatedForms: "-",
    paraphrase: ["praise", "honor", "recognition"],
    exampleEn: "Haley is credited with[for] boosting the team's confidence.",
    exampleKo: "헤일리는 팀의 자신감을 높여준 공로를 인정받고 있다.",
    memo: "숙어: be credited to (~의 덕분이다 = be attributed to)",
    options: [
      { word: "credit", def: "공로를 인정하다; 신용" },
      { word: "critic", def: "비평가, 평론가" },
      { word: "create", def: "창조하다, 만들다" },
      { word: "credible", def: "믿을 수 있는" }
    ]
  },
  {
    id: "d02-03",
    day: "Day 02",
    no: "03",
    word: "run",
    phonetic: "[rʌn]",
    partOfSpeech: "동사",
    meaning: "운영하다 / (대중교통 등) 운행하다 / (기계 등) 작동하다",
    relatedForms: "-",
    paraphrase: ["manage", "operate", "work", "function"],
    exampleEn: "run an enterprise",
    exampleKo: "기업을 경영하다",
    memo: "지텔프 동의어: Recently, Josh started to run a café. -> (b) manage | 숙어: run out of (~이 다 떨어지다, ~을 다 써버리다)",
    options: [
      { word: "run", def: "운영하다; 작동하다; 달리다" },
      { word: "race", def: "경주하다; 인종" },
      { word: "ruin", def: "망치다, 파멸" },
      { word: "rush", def: "서두르다, 돌진하다" }
    ]
  },
  {
    id: "d02-04",
    day: "Day 02",
    no: "04",
    word: "define",
    phonetic: "[difáin]",
    partOfSpeech: "동사",
    meaning: "규정하다, 정의하다",
    relatedForms: "definition (명) 규정, 정의",
    paraphrase: ["determine", "establish"],
    exampleEn: "clearly define his career goals",
    exampleKo: "그의 직업 목표를 명확히 정의하다",
    memo: "",
    options: [
      { word: "define", def: "규명하다, 정의하다" },
      { word: "decline", def: "거절하다, 감소하다" },
      { word: "defend", def: "방어하다, 변호하다" },
      { word: "defeat", def: "패배시키다, 패배" }
    ]
  },
  {
    id: "d02-05",
    day: "Day 02",
    no: "05",
    word: "essential",
    phonetic: "[isénʃəl]",
    partOfSpeech: "형용사",
    meaning: "필수적인",
    relatedForms: "essence (명) 본질, 진수, essentially (부) 근본적으로, 본질적으로(= basically)",
    paraphrase: ["vital", "important", "crucial", "critical", "key", "integral"],
    exampleEn: "A wide range of good bacteria is essential to our well-being.",
    exampleKo: "다양한 종류의 좋은 박테리아는 우리의 건강에 필수적이다.",
    memo: "",
    options: [
      { word: "essential", def: "필수적인, 극히 중요한" },
      { word: "efficient", def: "효율적인, 유능한" },
      { word: "effective", def: "효과적인, 유효한" },
      { word: "effortless", def: "노력이 들지 않는" }
    ]
  },
  {
    id: "d02-06",
    day: "Day 02",
    no: "06",
    word: "focus",
    phonetic: "[fóukəs]",
    partOfSpeech: "동사/명사",
    meaning: "집중하다, 초점을 맞추다 / 집중, 중점",
    relatedForms: "-",
    paraphrase: ["concentrate", "center", "attention"],
    exampleEn: "focus on details",
    exampleKo: "세부사항에 집중하다",
    memo: "",
    options: [
      { word: "focus", def: "집중하다; 초점" },
      { word: "force", def: "강요하다; 힘" },
      { word: "found", def: "설립하다" },
      { word: "follow", def: "따르다, 따라가다" }
    ]
  },
  {
    id: "d02-07",
    day: "Day 02",
    no: "07",
    word: "consequence",
    phonetic: "[kάnsəkwèns]",
    partOfSpeech: "명사",
    meaning: "결과",
    relatedForms: "consequently (부) 그 결과, 결과적으로",
    paraphrase: ["result", "outcome", "effect"],
    exampleEn: "accept the consequences",
    exampleKo: "결과를 받아들이다",
    memo: "",
    options: [
      { word: "consequence", def: "결과, 영향" },
      { word: "sequence", def: "연속, 순서" },
      { word: "frequency", def: "빈도, 주파수" },
      { word: "convenience", def: "편의, 편리" }
    ]
  },
  {
    id: "d02-08",
    day: "Day 02",
    no: "08",
    word: "assess",
    phonetic: "[əsés]",
    partOfSpeech: "동사",
    meaning: "평가하다, 판단하다 / 산정하다",
    relatedForms: "assessment (명) 평가, 판단",
    paraphrase: ["rate", "estimate", "evaluate"],
    exampleEn: "assess the effectiveness of the training program",
    exampleKo: "교육 프로그램의 효과를 평가하다",
    memo: "",
    options: [
      { word: "assess", def: "평가하다, 판단하다" },
      { word: "access", def: "접근하다; 접근" },
      { word: "assert", def: "주장하다, 단언하다" },
      { word: "assist", def: "돕다, 조력하다" }
    ]
  },
  {
    id: "d02-09",
    day: "Day 02",
    no: "09",
    word: "principle",
    phonetic: "[prínsəpl]",
    partOfSpeech: "명사",
    meaning: "원칙, 원리",
    relatedForms: "-",
    paraphrase: ["concept", "rule", "standards"],
    exampleEn: "understand the general principle",
    exampleKo: "전반적인 원칙을 이해하다",
    memo: "",
    options: [
      { word: "principle", def: "원칙, 원리" },
      { word: "principal", def: "주요한; 교장" },
      { word: "prince", def: "왕자" },
      { word: "priority", def: "우선순위, 우선권" }
    ]
  },
  {
    id: "d02-10",
    day: "Day 02",
    no: "10",
    word: "individual",
    phonetic: "[ìndəvídʒuəl]",
    partOfSpeech: "명사/형용사",
    meaning: "개인, 한 사람 / 개인의, 개별의",
    relatedForms: "individually (부) 개별적으로, 따로",
    paraphrase: ["person", "unique", "separate"],
    exampleEn: "meet customers' individual needs",
    exampleKo: "고객의 개별 요구를 충족시키다",
    memo: ""
  },
  {
    id: "d02-11",
    day: "Day 02",
    no: "11",
    word: "identify",
    phonetic: "[aidéntəfài]",
    partOfSpeech: "동사",
    meaning: "확인하다, 식별하다 / 밝혀내다, 알아내다",
    relatedForms: "-",
    paraphrase: ["recognize", "distinguish", "determine", "discover"],
    exampleEn: "identify and arrest the suspects",
    exampleKo: "용의자들을 확인하여 체포하다",
    memo: "지텔프 동의어: We could identify her as an FBI agent. -> (a) recognize"
  },
  {
    id: "d02-12",
    day: "Day 02",
    no: "12",
    word: "situation",
    phonetic: "[sìtʃuéiʃən]",
    partOfSpeech: "명사",
    meaning: "상황, 환경",
    relatedForms: "situate (동) 두다, 위치시키다",
    paraphrase: ["state", "conditions", "circumstances"],
    exampleEn: "deal with difficult situations",
    exampleKo: "어려운 상황에 대처하다",
    memo: ""
  },
  {
    id: "d02-13",
    day: "Day 02",
    no: "13",
    word: "aid",
    phonetic: "[eid]",
    partOfSpeech: "명사/동사",
    meaning: "도움, 원조 / 돕다, 보조하다",
    relatedForms: "-",
    paraphrase: ["help", "support", "assistance", "backing"],
    exampleEn: "aid in the remodeling project",
    exampleKo: "리모델링 사업을 돕다",
    memo: ""
  },
  {
    id: "d02-14",
    day: "Day 02",
    no: "14",
    word: "achieve",
    phonetic: "[ətʃíːv]",
    partOfSpeech: "동사",
    meaning: "달성하다, 성취하다",
    relatedForms: "achievement (명) 달성, 성취",
    paraphrase: ["accomplish", "attain", "reach", "fulfil"],
    exampleEn: "achieve an objective",
    exampleKo: "목적을 달성하다",
    memo: ""
  },
  {
    id: "d02-15",
    day: "Day 02",
    no: "15",
    word: "conclusion",
    phonetic: "[kənklúːʒən]",
    partOfSpeech: "명사",
    meaning: "결론 / 마지막 단계, 결말",
    relatedForms: "conclude (동) 결론을 내리다 (= finalize)",
    paraphrase: ["decision", "agreement"],
    exampleEn: "reach a conclusion",
    exampleKo: "결론에 도달하다",
    memo: "표현: reach a conclusion (= come to a conclusion)"
  },
  {
    id: "d02-16",
    day: "Day 02",
    no: "16",
    word: "method",
    phonetic: "[méθəd]",
    partOfSpeech: "명사",
    meaning: "방법, 방식",
    relatedForms: "-",
    paraphrase: ["means", "manner", "way"],
    exampleEn: "apply a new method",
    exampleKo: "새로운 방법을 적용하다",
    memo: ""
  },
  {
    id: "d02-17",
    day: "Day 02",
    no: "17",
    word: "considerable",
    phonetic: "[kənsídərəbl]",
    partOfSpeech: "형용사",
    meaning: "상당한",
    relatedForms: "considerate (형) 사려 깊은, considerably (부) 상당히, 꽤",
    paraphrase: ["substantial", "abundant", "great"],
    exampleEn: "a considerable amount of information",
    exampleKo: "상당한 양의 정보",
    memo: "혼동 주의: considerate (사려 깊은) vs considerable (상당한)"
  },
  {
    id: "d02-18",
    day: "Day 02",
    no: "18",
    word: "concentrate",
    phonetic: "[kάnsəntrèit]",
    partOfSpeech: "동사",
    meaning: "집중하다",
    relatedForms: "concentration (명) 집중; 밀집",
    paraphrase: ["focus", "pay attention"],
    exampleEn: "concentrate only on important issues",
    exampleKo: "중요한 문제에만 집중하다",
    memo: ""
  },
  {
    id: "d02-19",
    day: "Day 02",
    no: "19",
    word: "personality",
    phonetic: "[pə̀ːrsənǽləti]",
    partOfSpeech: "명사",
    meaning: "성격, 인격, 개성",
    relatedForms: "-",
    paraphrase: ["character", "trait"],
    exampleEn: "have a warm personality",
    exampleKo: "따뜻한 성격을 가지고 있다",
    memo: ""
  },
  {
    id: "d02-20",
    day: "Day 02",
    no: "20",
    word: "reply",
    phonetic: "[riplái]",
    partOfSpeech: "동사/명사",
    meaning: "답하다, 대답하다 / 답장, 대답",
    relatedForms: "-",
    paraphrase: ["answer", "respond", "response"],
    exampleEn: "receive a prompt reply",
    exampleKo: "빠른 대답을 받다",
    memo: ""
  },
  {
    id: "d02-21",
    day: "Day 02",
    no: "21",
    word: "domestic",
    phonetic: "[dəméstik]",
    partOfSpeech: "형용사",
    meaning: "국내의 / 가정의",
    relatedForms: "domestically (부) 국내에서, 가정적으로",
    paraphrase: ["household"],
    exampleEn: "boarding procedures for domestic flights",
    exampleKo: "국내선 탑승 절차",
    memo: ""
  },
  {
    id: "d02-22",
    day: "Day 02",
    no: "22",
    word: "cover",
    phonetic: "[kʌ́vər]",
    partOfSpeech: "동사/명사",
    meaning: "덮다, 가리다 / 다루다 / 비용을 치르다[부담하다] / 덮개 / 속임수, 위장",
    relatedForms: "-",
    paraphrase: ["hide", "conceal", "deal with", "pay"],
    exampleEn: "cover travel expenses",
    exampleKo: "출장 비용을 치르다",
    memo: "지텔프 동의어: The company will gladly cover all your lodging expenses. -> (b) pay"
  },
  {
    id: "d02-23",
    day: "Day 02",
    no: "23",
    word: "appearance",
    phonetic: "[əpí(ː)ərəns]",
    partOfSpeech: "명사",
    meaning: "외모, 외관 / 출연, 등장",
    relatedForms: "appear (동) 나타나다, 등장하다(= debut); ~처럼 보이다(= seem)",
    paraphrase: ["look", "emergence", "advent"],
    exampleEn: "The product has an attractive appearance.",
    exampleKo: "그 제품은 매력적인 외관을 가지고 있다.",
    memo: ""
  },
  {
    id: "d02-24",
    day: "Day 02",
    no: "24",
    word: "estimate",
    phonetic: "[éstəmət] / [éstəmèit]",
    partOfSpeech: "명사/동사",
    meaning: "견적서 / 추산, 추정 / 어림잡다, 추산하다",
    relatedForms: "estimation (명) 평가; 추정",
    paraphrase: ["assessment", "assess", "guess"],
    exampleEn: "an estimate of the repair cost",
    exampleKo: "수리비의 견적",
    memo: ""
  },
  {
    id: "d02-25",
    day: "Day 02",
    no: "25",
    word: "publicize",
    phonetic: "[pʌ́blisàiz]",
    partOfSpeech: "동사",
    meaning: "선전하다, 알리다",
    relatedForms: "publicity (명) (언론의) 관심, 평판; 홍보",
    paraphrase: ["promote", "advertise"],
    exampleEn: "publicize her new book on her blog",
    exampleKo: "그녀의 신간을 블로그에 알리다",
    memo: ""
  },
  {
    id: "d02-26",
    day: "Day 02",
    no: "26",
    word: "component",
    phonetic: "[kəmpóunənt]",
    partOfSpeech: "명사",
    meaning: "부품, 요소",
    relatedForms: "-",
    paraphrase: ["part", "piece"],
    exampleEn: "replace old components",
    exampleKo: "오래된 부품을 교체하다",
    memo: ""
  },
  {
    id: "d02-27",
    day: "Day 02",
    no: "27",
    word: "generate",
    phonetic: "[dʒénərèit]",
    partOfSpeech: "동사",
    meaning: "창출하다, 발생시키다",
    relatedForms: "generation (명) 세대; 생성",
    paraphrase: ["create"],
    exampleEn: "generate a lot of revenue",
    exampleKo: "많은 수익을 창출하다",
    memo: ""
  },
  {
    id: "d02-28",
    day: "Day 02",
    no: "28",
    word: "draw",
    phonetic: "[drɔː]",
    partOfSpeech: "동사/명사",
    meaning: "(관심 등) 끌다 / 그리다 / 추첨, 제비뽑기 / 무승부",
    relatedForms: "-",
    paraphrase: ["attract", "raffle"],
    exampleEn: "draw attention to environmental problems",
    exampleKo: "환경 문제로 관심을 끌다",
    memo: "지텔프 동의어: The novel continues to draw people's interest. -> (a) attract"
  },
  {
    id: "d02-29",
    day: "Day 02",
    no: "29",
    word: "estate",
    phonetic: "[istéit]",
    partOfSpeech: "명사",
    meaning: "재산, 사유지",
    relatedForms: "-",
    paraphrase: ["property", "asset", "fortune"],
    exampleEn: "donate his entire estate",
    exampleKo: "그의 전 재산을 기부하다",
    memo: "표현: real estate (부동산)"
  },
  {
    id: "d02-30",
    day: "Day 02",
    no: "30",
    word: "approach",
    phonetic: "[əpróutʃ]",
    partOfSpeech: "명사/동사",
    meaning: "접근법 / 다가감, 접근 / 다가가다, 접근하다",
    relatedForms: "-",
    paraphrase: ["way", "means", "near"],
    exampleEn: "a new approach to the study of grammar",
    exampleKo: "문법 연구에 대한 새로운 접근법",
    memo: ""
  },
  {
    id: "d02-31",
    day: "Day 02",
    no: "31",
    word: "alternative",
    phonetic: "[ɔːltə́ːrnətiv]",
    partOfSpeech: "명사/형용사",
    meaning: "대안 / 대안의, 대체[cite: 32]의",
    relatedForms: "alternatively (부) 그 대신에",
    paraphrase: ["substitute", "different", "other"],
    exampleEn: "recommend an alternative way to lose weight",
    exampleKo: "살을 빼는 다른 방법을 추천하다",
    memo: ""
  },
  {
    id: "d02-32",
    day: "Day 02",
    no: "32",
    word: "capacity",
    phonetic: "[kəpǽsəti]",
    partOfSpeech: "명사",
    meaning: "능력 / (공간의) 수용 능력, 용량 / 지위, 역할, 자격",
    relatedForms: "-",
    paraphrase: ["ability", "room", "role"],
    exampleEn: "increase the maximum server capacity",
    exampleKo: "최대 서버 용량을 증가시키다",
    memo: ""
  },
  {
    id: "d02-33",
    day: "Day 02",
    no: "33",
    word: "debate",
    phonetic: "[dibéit]",
    partOfSpeech: "명사/동사",
    meaning: "토론, 논쟁 / 토론하다, 논쟁하다",
    relatedForms: "-",
    paraphrase: ["dispute", "discussion"],
    exampleEn: "spark a heated debate",
    exampleKo: "열띤 토론을 불러일으키다",
    memo: ""
  },
  {
    id: "d02-34",
    day: "Day 02",
    no: "34",
    word: "currency",
    phonetic: "[kə́ːrənsi]",
    partOfSpeech: "명사",
    meaning: "통화, 화폐",
    relatedForms: "-",
    paraphrase: ["money"],
    exampleEn: "buy foreign currency at the bank",
    exampleKo: "은행에서 외화를 사다",
    memo: ""
  },
  {
    id: "d02-35",
    day: "Day 02",
    no: "35",
    word: "face",
    phonetic: "[feis]",
    partOfSpeech: "명사/동사",
    meaning: "얼굴 / 외관 / 직면하다 / 받아들이다, 인정하다",
    relatedForms: "-",
    paraphrase: ["exterior", "outside", "confront", "encounter", "experience"],
    exampleEn: "The company is facing new challenges.",
    exampleKo: "그 회사는 새로운 도전에 직면해 있다.",
    memo: "표현: face the truth (진실을 받아들이다)"
  },
  {
    id: "d02-36",
    day: "Day 02",
    no: "36",
    word: "deny",
    phonetic: "[dinái]",
    partOfSpeech: "동사",
    meaning: "부정하다, 부인하다 / 거부하다",
    relatedForms: "denial (명) 부정, 부인",
    paraphrase: ["reject"],
    exampleEn: "deny cheating during the exam",
    exampleKo: "시험 중 부정행위를 부인하다",
    memo: ""
  },
  {
    id: "d02-37",
    day: "Day 02",
    no: "37",
    word: "justice",
    phonetic: "[dʒʌ́stis]",
    partOfSpeech: "명사",
    meaning: "공정, 정의",
    relatedForms: "injustice (명) 불공평, 부당함",
    paraphrase: ["fairness"],
    exampleEn: "explore the theme of social justice",
    exampleKo: "사회 정의의 주제를 탐구하다",
    memo: ""
  },
  {
    id: "d02-38",
    day: "Day 02",
    no: "38",
    word: "decade",
    phonetic: "[dékeid]",
    partOfSpeech: "명사",
    meaning: "10년",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "in business for two decades",
    exampleKo: "20년 동안 영업을 한",
    memo: ""
  },
  {
    id: "d02-39",
    day: "Day 02",
    no: "39",
    word: "author",
    phonetic: "[ɔ́ːθər]",
    partOfSpeech: "명사",
    meaning: "저자, 작가",
    relatedForms: "-",
    paraphrase: ["writer"],
    exampleEn: "one of the best-selling authors",
    exampleKo: "베스트셀러 작가 중 한 명",
    memo: ""
  },
  {
    id: "d02-40",
    day: "Day 02",
    no: "40",
    word: "demonstrate",
    phonetic: "[démənstrèit]",
    partOfSpeech: "동사",
    meaning: "입증하다, 보여주다",
    relatedForms: "demonstration (명) 입증; 시위, 데모",
    paraphrase: ["prove", "show"],
    exampleEn: "demonstrate a talent for leadership",
    exampleKo: "리더십에 대한 재능을 보여주다",
    memo: ""
  },
  {
    id: "d02-41",
    day: "Day 02",
    no: "41",
    word: "confirm",
    phonetic: "[kənfə́ːrm]",
    partOfSpeech: "동사",
    meaning: "확인하다, 인정하다",
    relatedForms: "confirmation (명) 확인",
    paraphrase: ["affirm", "verify"],
    exampleEn: "There is no evidence to confirm the existence of aliens.",
    exampleKo: "외계인의 존재를 확인할 증거는 없다.",
    memo: ""
  },
  {
    id: "d02-42",
    day: "Day 02",
    no: "42",
    word: "divided",
    phonetic: "[diváidid]",
    partOfSpeech: "형용사",
    meaning: "갈라진, 나뉘어진, 분열된",
    relatedForms: "divide (동) 나누다, 분배하다",
    paraphrase: ["split", "separated", "segmented"],
    exampleEn: "a religiously divided society",
    exampleKo: "종교적으로 분열된 사회",
    memo: "지텔프 동의어: Insects are divided into three body parts. -> (b) segmented"
  },
  {
    id: "d02-43",
    day: "Day 02",
    no: "43",
    word: "contemporary",
    phonetic: "[kəntémpərèri]",
    partOfSpeech: "형용사/명사",
    meaning: "현대의 / 동시대의 / 동시대인",
    relatedForms: "-",
    paraphrase: ["current", "modern"],
    exampleEn: "The book is still enjoyed by contemporary readers.",
    exampleKo: "그 책은 현대의 독자들에게 여전히 사랑받고 있다.",
    memo: ""
  },
  {
    id: "d02-44",
    day: "Day 02",
    no: "44",
    word: "export",
    phonetic: "[ékspɔːrt]",
    partOfSpeech: "명사/동사",
    meaning: "수출 / 수출하다",
    relatedForms: "import (명) 수입, (동) 수입하다",
    paraphrase: [],
    exampleEn: "export cars all over the world",
    exampleKo: "자동차를 전 세계로 수출하다",
    memo: ""
  },
  {
    id: "d02-45",
    day: "Day 02",
    no: "45",
    word: "conscious",
    phonetic: "[kάnʃəs]",
    partOfSpeech: "형용사",
    meaning: "의식하고 있는, 자각하는",
    relatedForms: "consciousness (명) 의식, 인식, unconscious (형) 의식이 없는; 무의식적인",
    paraphrase: ["aware"],
    exampleEn: "Grace is very conscious of her appearance.",
    exampleKo: "그레이스는 자신의 외모를 매우 의식한다.",
    memo: ""
  },
  {
    id: "d02-46",
    day: "Day 02",
    no: "46",
    word: "emphasis",
    phonetic: "[émfəsis]",
    partOfSpeech: "명사",
    meaning: "강조, 중점",
    relatedForms: "emphasize (동) 강조하다",
    paraphrase: ["stress", "importance"],
    exampleEn: "place emphasis on fresh ingredients",
    exampleKo: "신선한 재료에 중점을 두다",
    memo: ""
  },
  {
    id: "d02-47",
    day: "Day 02",
    no: "47",
    word: "emerge",
    phonetic: "[imə́ːrdʒ]",
    partOfSpeech: "동사",
    meaning: "나타나다, 출현하다",
    relatedForms: "emergence (명) 발생, 출현",
    paraphrase: ["appear"],
    exampleEn: "A ship emerged from the horizon.",
    exampleKo: "배가 수평선에서 모습을 드러냈다.",
    memo: ""
  },
  {
    id: "d02-48",
    day: "Day 02",
    no: "48",
    word: "hold",
    phonetic: "[hould]",
    partOfSpeech: "동사",
    meaning: "잡다, 쥐다 / 유지하다 / 담다, 수용하다 / 개최하다, 열다 / 보유하다",
    relatedForms: "-",
    paraphrase: ["carry", "keep", "maintain", "store", "contain", "accommodate", "conduct", "run", "have", "possess"],
    exampleEn: "The fabric held its shape even after being washed.",
    exampleKo: "그 천은 세탁 후에도 모양을 유지했다.",
    memo: "표현: hold a series of meetings (연달아 회의를 열다), hold a college degree (대학 학위를 보유하다)"
  },
  {
    id: "d02-49",
    day: "Day 02",
    no: "49",
    word: "establish",
    phonetic: "[istǽbliʃ]",
    partOfSpeech: "동사",
    meaning: "세우다, 설립하다 / 입증하다, 밝히다",
    relatedForms: "establishment (명) 설립; 기관, 시설",
    paraphrase: ["erect", "found", "demonstrate", "prove"],
    exampleEn: "establish a church",
    exampleKo: "교회를 설립하다",
    memo: "지텔프 동의어: The police established that Michael acted in self-defense. -> (a) demonstrated"
  },
  {
    id: "d02-50",
    day: "Day 02",
    no: "50",
    word: "desire",
    phonetic: "[dizáiər]",
    partOfSpeech: "명사/동사",
    meaning: "욕구, 갈망 / 바라다, 갈망하다",
    relatedForms: "desirable (형) 바람직한",
    paraphrase: ["wish", "hope", "aspiration", "longing", "want", "crave", "demand", "request"],
    exampleEn: "desire to be successful",
    exampleKo: "성공하기를 갈망하다",
    memo: ""
  },
  {
    id: "d03-01",
    day: "Day 03",
    no: "01",
    word: "impact",
    phonetic: "[ímpækt]",
    partOfSpeech: "명사/동사",
    meaning: "영향 / 영향을 미치다",
    relatedForms: "-",
    paraphrase: ["effect", "influence"],
    exampleEn: "find out how hormones impact behavior",
    exampleKo: "호르몬이 행동에 어떻게 영향을 미치는지 알아내다",
    memo: ""
  },
  {
    id: "d03-02",
    day: "Day 03",
    no: "02",
    word: "settle",
    phonetic: "[sétl]",
    partOfSpeech: "동사",
    meaning: "해결하다 / (빚 등) 청산하다 / 정착하다",
    relatedForms: "settlement (명) 해결, 합의; 정착",
    paraphrase: ["solve", "resolve", "pay", "clear"],
    exampleEn: "settle conflicts through listening",
    exampleKo: "경청을 통해 갈등을 해결하다",
    memo: "지텔프 동의어: Jason is trying to settle the mystery of the murder. -> (b) solve"
  },
  {
    id: "d03-03",
    day: "Day 03",
    no: "03",
    word: "literature",
    phonetic: "[lítərətʃùər]",
    partOfSpeech: "명사",
    meaning: "문학 / 문헌, 논문, 자료",
    relatedForms: "-",
    paraphrase: ["paper", "thesis", "dissertation"],
    exampleEn: "look for literature related to the topic of her thesis",
    exampleKo: "그녀의 논문 주제와 관련된 문헌을 찾다",
    memo: ""
  },
  {
    id: "d03-04",
    day: "Day 03",
    no: "04",
    word: "fundamental",
    phonetic: "[fʌ̀ndəméntl]",
    partOfSpeech: "형용사/명사",
    meaning: "근본적인, 본질적인 / 근본, 핵심",
    relatedForms: "-",
    paraphrase: ["essential", "primary", "basic"],
    exampleEn: "the fundamental cause of back pain",
    exampleKo: "허리 통증의 근본적인 원인",
    memo: ""
  },
  {
    id: "d03-05",
    day: "Day 03",
    no: "05",
    word: "air",
    phonetic: "[εər]",
    partOfSpeech: "동사/명사",
    meaning: "방송하다, 방영하다 / 공기 / 항공, 비행기",
    relatedForms: "-",
    paraphrase: ["show", "broadcast", "televise"],
    exampleEn: "The show was aired in the early 1960s.",
    exampleKo: "그 쇼는 1960년대 초에 방영되었다.",
    memo: "travel by air (항공 여행)"
  },
  {
    id: "d03-06",
    day: "Day 03",
    no: "06",
    word: "impose",
    phonetic: "[impóuz]",
    partOfSpeech: "동사",
    meaning: "(의무, 세금 등) 부과하다",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "impose a high tax on fuel",
    exampleKo: "연료에 높은 세금을 부과하다",
    memo: ""
  },
  {
    id: "d03-07",
    day: "Day 03",
    no: "07",
    word: "favor",
    phonetic: "[féivər]",
    partOfSpeech: "명사/동사",
    meaning: "호의, 친절 / 선호하다",
    relatedForms: "favorite (형) 가장 좋아하는",
    paraphrase: ["kindness", "politeness", "prefer"],
    exampleEn: "return the favor",
    exampleKo: "호의를 되돌려주다, 보답하다",
    memo: "지텔프 동의어: Mike favors loose-fitting and comfortable clothes. -> (a) prefers | 숙어: in favor of (~을 지지[찬성]하는)"
  },
  {
    id: "d03-08",
    day: "Day 03",
    no: "08",
    word: "effect",
    phonetic: "[ifékt]",
    partOfSpeech: "명사",
    meaning: "영향, 효과",
    relatedForms: "effective (형) 효과적인",
    paraphrase: ["impact", "influence"],
    exampleEn: "have a negative effect",
    exampleKo: "부정적인 영향을 끼치다",
    memo: ""
  },
  {
    id: "d03-09",
    day: "Day 03",
    no: "09",
    word: "largely",
    phonetic: "[lάːrdʒli]",
    partOfSpeech: "부사",
    meaning: "대부분, 주로",
    relatedForms: "large (형) 큰, 많은",
    paraphrase: ["mostly", "mainly"],
    exampleEn: "The country is largely desert.",
    exampleKo: "그 나라는 대부분 사막이다.",
    memo: ""
  },
  {
    id: "d03-10",
    day: "Day 03",
    no: "10",
    word: "direction",
    phonetic: "[dirékʃən]",
    partOfSpeech: "명사",
    meaning: "방향 / 지휘, 감독",
    relatedForms: "direct (형) 직접적인, (동) 관리하다, 지휘하다",
    paraphrase: ["course", "path", "control", "supervision", "oversight"],
    exampleEn: "move in the right direction",
    exampleKo: "바른 방향으로 나아가다",
    memo: ""
  },
  {
    id: "d03-11",
    day: "Day 03",
    no: "11",
    word: "manufacturer",
    phonetic: "[mæ̀njəfǽktʃərər]",
    partOfSpeech: "명사",
    meaning: "제조회사",
    relatedForms: "manufacture (동) 제조하다",
    paraphrase: ["producer", "maker"],
    exampleEn: "make a complaint to the manufacturer",
    exampleKo: "제조사에 항의하다",
    memo: ""
  },
  {
    id: "d03-12",
    day: "Day 03",
    no: "12",
    word: "main",
    phonetic: "[mein]",
    partOfSpeech: "형용사",
    meaning: "주된, 주요한",
    relatedForms: "mainly (부) 주로",
    paraphrase: ["major", "leading", "chief"],
    exampleEn: "the main source of income",
    exampleKo: "주요 수입원",
    memo: ""
  },
  {
    id: "d03-13",
    day: "Day 03",
    no: "13",
    word: "leading",
    phonetic: "[líːdiŋ]",
    partOfSpeech: "형용사",
    meaning: "주도적인, 선도적인",
    relatedForms: "lead (동) 이끌다, 안내하다",
    paraphrase: ["major", "key", "top", "main"],
    exampleEn: "one of the leading manufacturers of computer equipment",
    exampleKo: "컴퓨터 장비의 주요 제조업체 중 하나",
    memo: ""
  },
  {
    id: "d03-14",
    day: "Day 03",
    no: "14",
    word: "decline",
    phonetic: "[dikláin]",
    partOfSpeech: "명사/동사",
    meaning: "하락, 감소, 쇠퇴 / 하락[감소]하다, 쇠퇴하다 / 거절하다",
    relatedForms: "-",
    paraphrase: ["decrease", "deterioration", "fall", "drop", "diminish", "worsen", "refuse", "reject"],
    exampleEn: "a gradual decline in population",
    exampleKo: "인구의 점진적인 감소",
    memo: "지텔프 동의어: The service quality of the restaurant declined steadily. -> (b) worsened | 예문: decline a job offer (채용 제안을 거절하다)"
  },
  {
    id: "d03-15",
    day: "Day 03",
    no: "15",
    word: "factor",
    phonetic: "[fǽktər]",
    partOfSpeech: "명사",
    meaning: "요인, 요소",
    relatedForms: "-",
    paraphrase: ["element", "component"],
    exampleEn: "an important factor in his success",
    exampleKo: "그의 성공에 있어 중요한 요소",
    memo: ""
  },
  {
    id: "d03-16",
    day: "Day 03",
    no: "16",
    word: "location",
    phonetic: "[loukéiʃən]",
    partOfSpeech: "명사",
    meaning: "위치, 장소",
    relatedForms: "-",
    paraphrase: ["place", "point"],
    exampleEn: "GPS allows users to determine their location.",
    exampleKo: "GPS는 사용자들이 자신들의 위치를 알아낼 수 있게 해 준다.",
    memo: ""
  },
  {
    id: "d03-17",
    day: "Day 03",
    no: "17",
    word: "negative",
    phonetic: "[négətiv]",
    partOfSpeech: "형용사",
    meaning: "부정적인",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "leave a negative review",
    exampleKo: "부정적인 평가를 남기다",
    memo: ""
  },
  {
    id: "d03-18",
    day: "Day 03",
    no: "18",
    word: "wage",
    phonetic: "[weidʒ]",
    partOfSpeech: "명사",
    meaning: "임금, 급료",
    relatedForms: "-",
    paraphrase: ["payment", "pay", "income", "salary"],
    exampleEn: "receive a 10% wage increase",
    exampleKo: "10%의 임금 인상을 받다",
    memo: ""
  },
  {
    id: "d03-19",
    day: "Day 03",
    no: "19",
    word: "limit",
    phonetic: "[límit]",
    partOfSpeech: "명사/동사",
    meaning: "제한, 한도 / 제한하다, 한정하다",
    relatedForms: "limited (형) 제한된, 한정된, limitation (명) 한계, 제약",
    paraphrase: ["maximum", "restriction", "ceiling", "confine", "curb", "restrict", "restrain", "control"],
    exampleEn: "limit caffeine intake to 200 mg a day",
    exampleKo: "카페인 섭취량을 하루에 200mg으로 제한하다",
    memo: "지텔프 동의어: The use of cell phones is limited to business calls. -> (b) confined"
  },
  {
    id: "d03-20",
    day: "Day 03",
    no: "20",
    word: "potential",
    phonetic: "[pəténʃəl]",
    partOfSpeech: "형용사/명사",
    meaning: "잠재적인 / 잠재력, 가능성",
    relatedForms: "potentially (부) 잠재적으로",
    paraphrase: ["possible", "likely", "hidden", "possibilities", "ability", "promise"],
    exampleEn: "We saw considerable potential in Andrea.",
    exampleKo: "우리는 안드레아에게서 상당한 잠재력을 보았다.",
    memo: "potential danger (잠재적 위험)"
  },
  {
    id: "d03-21",
    day: "Day 03",
    no: "21",
    word: "damage",
    phonetic: "[dǽmidʒ]",
    partOfSpeech: "명사/동사",
    meaning: "손상, 피해 / 손상을 입히다",
    relatedForms: "damaged (형) 손상된, 파손된",
    paraphrase: ["harm", "destruction", "bust", "injure", "mar"],
    exampleEn: "The earthquake caused great damage to the area.",
    exampleKo: "지진은 그 지역에 큰 피해를 입혔다.",
    memo: ""
  },
  {
    id: "d03-22",
    day: "Day 03",
    no: "22",
    word: "obvious",
    phonetic: "[άbviəs]",
    partOfSpeech: "형용사",
    meaning: "명백한, 분명한",
    relatedForms: "obviously (부) 명백하게, 분명하게",
    paraphrase: ["clear", "apparent", "evident"],
    exampleEn: "Sam has no obvious answers yet.",
    exampleKo: "샘은 아직 명확한 답을 가지고 있지 않다.",
    memo: ""
  },
  {
    id: "d03-23",
    day: "Day 03",
    no: "23",
    word: "legislation",
    phonetic: "[lèdʒisléiʃən]",
    partOfSpeech: "명사",
    meaning: "법률, 법률 제정",
    relatedForms: "-",
    paraphrase: ["law", "regulation"],
    exampleEn: "propose legislation on human rights",
    exampleKo: "인권에 관한 법안을 제안하다",
    memo: ""
  },
  {
    id: "d03-24",
    day: "Day 03",
    no: "24",
    word: "length",
    phonetic: "[leŋkθ]",
    partOfSpeech: "명사",
    meaning: "길이 / 기간",
    relatedForms: "lengthen (동) (길이가) 길어지다, 늘이다",
    paraphrase: ["duration", "period"],
    exampleEn: "Dolphins are usually less than 3 meters in length.",
    exampleKo: "돌고래는 보통 길이가 3미터 미만이다.",
    memo: ""
  },
  {
    id: "d03-25",
    day: "Day 03",
    no: "25",
    word: "practical",
    phonetic: "[prǽktikəl]",
    partOfSpeech: "형용사",
    meaning: "현실적인, 실질적인 / 실용적인",
    relatedForms: "practicality (명) 실용성",
    paraphrase: ["actual", "realistic"],
    exampleEn: "need practical advice",
    exampleKo: "현실적인 조언을 필요로 하다",
    memo: ""
  },
  {
    id: "d03-26",
    day: "Day 03",
    no: "26",
    word: "relatively",
    phonetic: "[rélətivli]",
    partOfSpeech: "부사",
    meaning: "비교적, 상대적으로",
    relatedForms: "relative (형) 상대적인",
    paraphrase: ["comparatively", "somewhat"],
    exampleEn: "The cat is a relatively small animal.",
    exampleKo: "고양이는 비교적 작은 동물이다.",
    memo: ""
  },
  {
    id: "d03-27",
    day: "Day 03",
    no: "27",
    word: "sort",
    phonetic: "[sɔːrt]",
    partOfSpeech: "명사/동사",
    meaning: "종류, 부류 / 분류하다, 구분하다",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "sort all the files by date",
    exampleKo: "모든 파일을 날짜에 따라 분류하다",
    memo: ""
  },
  {
    id: "d03-28",
    day: "Day 03",
    no: "28",
    word: "an array of",
    phonetic: "[əréi]",
    partOfSpeech: "표현",
    meaning: "다양한",
    relatedForms: "-",
    paraphrase: ["a range of"],
    exampleEn: "a wide array of cars from economy to sedan",
    exampleKo: "이코노미에서 세단에 이르기까지 다양한 종류의 자동차",
    memo: ""
  },
  {
    id: "d03-29",
    day: "Day 03",
    no: "29",
    word: "regarding",
    phonetic: "[rigάːrdiŋ]",
    partOfSpeech: "전치사",
    meaning: "~에 관한, ~에 관련해서",
    relatedForms: "-",
    paraphrase: ["about", "concerning", "as to"],
    exampleEn: "complaints regarding the noise",
    exampleKo: "소음에 대한 불만",
    memo: ""
  },
  {
    id: "d03-30",
    day: "Day 03",
    no: "30",
    word: "release",
    phonetic: "[rilíːs]",
    partOfSpeech: "동사/명사",
    meaning: "풀어 주다, 놓아주다 / 공개하다, 발표하다 / 발매하다 / 석방 / 공개, 발표 / 발매",
    relatedForms: "-",
    paraphrase: ["free", "liberate", "discharge", "publish", "issue", "launch", "unveil", "liberation"],
    exampleEn: "release the fish back into the ocean",
    exampleKo: "물고기를 바다로 다시 놓아주다",
    memo: "release a new video game (신작 비디오 게임을 발매하다)"
  },
  {
    id: "d03-31",
    day: "Day 03",
    no: "31",
    word: "sequence",
    phonetic: "[síːkwəns]",
    partOfSpeech: "명사",
    meaning: "차례, 순서 / 연속",
    relatedForms: "-",
    paraphrase: ["order", "series", "succession"],
    exampleEn: "take the courses in sequence",
    exampleKo: "순서대로 강좌를 듣다",
    memo: ""
  },
  {
    id: "d03-32",
    day: "Day 03",
    no: "32",
    word: "measure",
    phonetic: "[méʒər]",
    partOfSpeech: "명사/동사",
    meaning: "조치 / 기준, 척도 / 재다, 측정하다 / (치수) ~이다",
    relatedForms: "measurement (명) 측정; 치수",
    paraphrase: [],
    exampleEn: "take safety measures",
    exampleKo: "안전 조치를 취하다",
    memo: "measure the distance between two locations (두 지점 사이의 거리를 재다)"
  },
  {
    id: "d03-33",
    day: "Day 03",
    no: "33",
    word: "scientific",
    phonetic: "[sàiəntífik]",
    partOfSpeech: "형용사",
    meaning: "과학의, 과학적인",
    relatedForms: "science (명) 과학",
    paraphrase: [],
    exampleEn: "based on scientific data",
    exampleKo: "과학적인 데이터에 기초한",
    memo: ""
  },
  {
    id: "d03-34",
    day: "Day 03",
    no: "34",
    word: "assign",
    phonetic: "[əsáin]",
    partOfSpeech: "동사",
    meaning: "(업무 등) 맡기다, 할당하다 / 선임하다, 임명하다",
    relatedForms: "assignment (명) 임무, 과제; 배정, 할당",
    paraphrase: ["give", "allocate", "delegate", "appoint", "elect"],
    exampleEn: "assign Sean some household duties",
    exampleKo: "숀에게 일부 집안일을 할당하다",
    memo: "지텔프 동의어: Justin was assigned as Executive Officer. -> (a) appointed"
  },
  {
    id: "d03-35",
    day: "Day 03",
    no: "35",
    word: "able",
    phonetic: "[éibl]",
    partOfSpeech: "형용사",
    meaning: "~할 수 있는",
    relatedForms: "unable (형) ~할 수 없는",
    paraphrase: ["capable"],
    exampleEn: "able to work under pressure",
    exampleKo: "중압감 속에서 일할 수 있는",
    memo: ""
  },
  {
    id: "d03-36",
    day: "Day 03",
    no: "36",
    word: "technical",
    phonetic: "[téknikəl]",
    partOfSpeech: "형용사",
    meaning: "기술의, 기술적인 / 전문적인",
    relatedForms: "-",
    paraphrase: ["specialized"],
    exampleEn: "solve a technical problem",
    exampleKo: "기술적인 문제를 해결하다",
    memo: "technical terms (전문 용어)"
  },
  {
    id: "d03-37",
    day: "Day 03",
    no: "37",
    word: "origin",
    phonetic: "[ɔ́(ː)ridʒin]",
    partOfSpeech: "명사",
    meaning: "기원, 근원",
    relatedForms: "original (형) 본래의; 최초의; 독창적인",
    paraphrase: ["beginning", "inception", "source", "progenitor"],
    exampleEn: "the origin of blue jeans",
    exampleKo: "청바지의 기원",
    memo: ""
  },
  {
    id: "d03-38",
    day: "Day 03",
    no: "38",
    word: "pollution",
    phonetic: "[pəlúːʃən]",
    partOfSpeech: "명사",
    meaning: "오염, 더러움, 공해",
    relatedForms: "pollute (동) 오염시키다",
    paraphrase: ["contamination"],
    exampleEn: "take some measures to control pollution",
    exampleKo: "오염을 억제하기 위해 조치를 취하다",
    memo: ""
  },
  {
    id: "d03-39",
    day: "Day 03",
    no: "39",
    word: "permanent",
    phonetic: "[pə́ːrmənənt]",
    partOfSpeech: "형용사",
    meaning: "영원한, 영구적인 / 상근직의, 상임의",
    relatedForms: "-",
    paraphrase: ["lasting", "persistent"],
    exampleEn: "permanent damage to the brain",
    exampleKo: "뇌의 영구적인 손상",
    memo: ""
  },
  {
    id: "d03-40",
    day: "Day 03",
    no: "40",
    word: "accept",
    phonetic: "[æksépt]",
    partOfSpeech: "동사",
    meaning: "수락하다, 받아들이다",
    relatedForms: "acceptance (명) 수락, 받아들임",
    paraphrase: ["assume", "bear"],
    exampleEn: "accept negative feedback",
    exampleKo: "부정적인 의견을 받아들이다",
    memo: ""
  },
  {
    id: "d03-41",
    day: "Day 03",
    no: "41",
    word: "edge",
    phonetic: "[edʒ]",
    partOfSpeech: "명사",
    meaning: "가장자리, 끝 / 우위, 유리함",
    relatedForms: "-",
    paraphrase: ["limit", "border", "advantage", "lead"],
    exampleEn: "The café is situated at the water's edge.",
    exampleKo: "그 카페는 물가에 위치해 있다.",
    memo: "지텔프 동의어: The new shoes will give runners a performance edge in the race. -> (a) advantage"
  },
  {
    id: "d03-42",
    day: "Day 03",
    no: "42",
    word: "rural",
    phonetic: "[rú(ː)rəl]",
    partOfSpeech: "형용사",
    meaning: "시골의, 지방의, 전원의",
    relatedForms: "-",
    paraphrase: ["rustic", "country"],
    exampleEn: "grow up in a rural town",
    exampleKo: "시골 마을에서 자라다",
    memo: ""
  },
  {
    id: "d03-43",
    day: "Day 03",
    no: "43",
    word: "occasional",
    phonetic: "[əkéiʒənl]",
    partOfSpeech: "형용사",
    meaning: "가끔씩의",
    relatedForms: "occasionally (부) 가끔, 때때로",
    paraphrase: ["casual", "intermittent"],
    exampleEn: "an occasional drink of alcohol",
    exampleKo: "가끔씩 마시는 술",
    memo: ""
  },
  {
    id: "d03-44",
    day: "Day 03",
    no: "44",
    word: "vary",
    phonetic: "[vέəri]",
    partOfSpeech: "동사",
    meaning: "다양하다, (각기) 다르다 / 다르게 하다",
    relatedForms: "various (형) 다양한 (= varying)",
    paraphrase: ["differ", "change", "alter", "modify"],
    exampleEn: "vary from person to person",
    exampleKo: "사람마다 다르다",
    memo: ""
  },
  {
    id: "d03-45",
    day: "Day 03",
    no: "45",
    word: "threat",
    phonetic: "[θret]",
    partOfSpeech: "명사",
    meaning: "협박, 위협",
    relatedForms: "threaten (동) 협박하다, 위협하다",
    paraphrase: [],
    exampleEn: "receive threats through social media",
    exampleKo: "소셜 미디어를 통해 협박을 받다",
    memo: ""
  },
  {
    id: "d03-46",
    day: "Day 03",
    no: "46",
    word: "diet",
    phonetic: "[dáiət]",
    partOfSpeech: "명사",
    meaning: "식단, 식사",
    relatedForms: "dietary (형) 식사의",
    paraphrase: ["food"],
    exampleEn: "have a balanced diet",
    exampleKo: "균형 잡힌 식사를 하다",
    memo: ""
  },
  {
    id: "d03-47",
    day: "Day 03",
    no: "47",
    word: "not necessarily",
    phonetic: "[nèsəsérəli]",
    partOfSpeech: "부사구",
    meaning: "반드시 ~인 것은 아닌",
    relatedForms: "necessary (형) 필요한",
    paraphrase: [],
    exampleEn: "Success does not necessarily lead to happiness.",
    exampleKo: "성공이 반드시 행복으로 이어지는 것은 아니다.",
    memo: ""
  },
  {
    id: "d03-48",
    day: "Day 03",
    no: "48",
    word: "departure",
    phonetic: "[dipάːrtʃər]",
    partOfSpeech: "명사",
    meaning: "출발 / 벗어남, 일탈",
    relatedForms: "depart (동) 출발하다; 떠나다",
    paraphrase: ["shift", "deviation"],
    exampleEn: "check the departure time",
    exampleKo: "출발 시간을 확인하다",
    memo: "a significant departure from his previous painting style (그의 이전 화풍에서 크게 벗어남)"
  },
  {
    id: "d03-49",
    day: "Day 03",
    no: "49",
    word: "authorize",
    phonetic: "[ɔ́ːθəràiz]",
    partOfSpeech: "동사",
    meaning: "허가하다, 인가하다",
    relatedForms: "authorization (명) 승인, 허가",
    paraphrase: ["allow", "permit", "approve", "sanction", "endorse"],
    exampleEn: "authorize the use of force",
    exampleKo: "무력 사용을 허가하다",
    memo: ""
  },
  {
    id: "d03-50",
    day: "Day 03",
    no: "50",
    word: "phase",
    phonetic: "[feiz]",
    partOfSpeech: "명사",
    meaning: "단계, 시기",
    relatedForms: "-",
    paraphrase: ["stage", "state", "step"],
    exampleEn: "complete the first phase of the project",
    exampleKo: "프로젝트의 첫 번째 단계를 완료하다",
    memo: "지텔프 동의어: The work will be done in four phases. -> (a) stages"
  },
  {
    id: "d04-01",
    day: "Day 04",
    no: "01",
    word: "encounter",
    phonetic: "[inkáuntər]",
    partOfSpeech: "동사",
    meaning: "직면하다, 마주치다",
    relatedForms: "-",
    paraphrase: ["face", "meet", "experience", "confront"],
    exampleEn: "encounter various problems",
    exampleKo: "여러 가지 문제에 직면하다",
    memo: "지텔프 동의어: William encountered bandits during the trip. -> (b) met"
  },
  {
    id: "d04-02",
    day: "Day 04",
    no: "02",
    word: "presence",
    phonetic: "[prézns]",
    partOfSpeech: "명사",
    meaning: "존재, 있음, 참석 / (기업의) 입지, 영향력",
    relatedForms: "present (형) 참석한; 현재의, (명) 선물",
    paraphrase: ["existence"],
    exampleEn: "have an international presence",
    exampleKo: "전 세계에 존재하다",
    memo: ""
  },
  {
    id: "d04-03",
    day: "Day 04",
    no: "03",
    word: "servant",
    phonetic: "[sə́ːrvənt]",
    partOfSpeech: "명사",
    meaning: "종업원, 봉사자 / 하인",
    relatedForms: "serve (동) 음식을 제공하다; 근무하다, 일하다",
    paraphrase: ["attendant"],
    exampleEn: "a public servant",
    exampleKo: "공무원",
    memo: ""
  },
  {
    id: "d04-04",
    day: "Day 04",
    no: "04",
    word: "vehicle",
    phonetic: "[víːikl]",
    partOfSpeech: "명사",
    meaning: "차, 차량",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "the most popular electric vehicle",
    exampleKo: "가장 인기 있는 전기차",
    memo: ""
  },
  {
    id: "d04-05",
    day: "Day 04",
    no: "05",
    word: "welfare",
    phonetic: "[wélfὲər]",
    partOfSpeech: "명사",
    meaning: "복지",
    relatedForms: "-",
    paraphrase: ["wellbeing"],
    exampleEn: "be committed to improving children's welfare",
    exampleKo: "아동 복지 향상에 힘쓰다",
    memo: ""
  },
  {
    id: "d04-06",
    day: "Day 04",
    no: "06",
    word: "organization",
    phonetic: "[ɔ̀ːrgənizéiʃən]",
    partOfSpeech: "명사",
    meaning: "기구, 단체",
    relatedForms: "organize (동) 조직하다, 준비하다; 정리하다",
    paraphrase: ["institution"],
    exampleEn: "a global organization that is committed to promoting peace",
    exampleKo: "평화 증진에 전념하는 국제기구",
    memo: ""
  },
  {
    id: "d04-07",
    day: "Day 04",
    no: "07",
    word: "immediately",
    phonetic: "[imíːdiətli]",
    partOfSpeech: "부사",
    meaning: "즉시, 바로",
    relatedForms: "immediate (형) 즉각적인, 당장의",
    paraphrase: ["instantly", "right away"],
    exampleEn: "immediately regret getting a tattoo",
    exampleKo: "문신을 한 것을 즉시 후회하다",
    memo: ""
  },
  {
    id: "d04-08",
    day: "Day 04",
    no: "08",
    word: "victim",
    phonetic: "[víktim]",
    partOfSpeech: "명사",
    meaning: "피해자, 희생자",
    relatedForms: "-",
    paraphrase: ["casualty"],
    exampleEn: "provide assistance to the flood victims",
    exampleKo: "홍수 피해자에게 도움을 주다",
    memo: ""
  },
  {
    id: "d04-09",
    day: "Day 04",
    no: "09",
    word: "donate",
    phonetic: "[dóuneit]",
    partOfSpeech: "동사",
    meaning: "기부하다, 기증하다",
    relatedForms: "donation (명) 기부, 기증",
    paraphrase: ["contribute", "give"],
    exampleEn: "donate organs after death",
    exampleKo: "사후에 장기를 기증하다",
    memo: ""
  },
  {
    id: "d04-10",
    day: "Day 04",
    no: "10",
    word: "supply",
    phonetic: "[səplái]",
    partOfSpeech: "명사/동사",
    meaning: "공급 / 공급량 / 공급하다, 제공하다",
    relatedForms: "-",
    paraphrase: ["provision", "provide", "give", "equip"],
    exampleEn: "an abundant supply of food",
    exampleKo: "음식의 충분한 공급",
    memo: "a shortage in blood supply (혈액 공급량의 부족)"
  },
  {
    id: "d04-11",
    day: "Day 04",
    no: "11",
    word: "violent",
    phonetic: "[váiələnt]",
    partOfSpeech: "형용사",
    meaning: "폭력적인, 난폭한",
    relatedForms: "violence (명) 폭력, 난동",
    paraphrase: ["brutal"],
    exampleEn: "the increase in violent behavior",
    exampleKo: "폭력적인 행동의 증가",
    memo: ""
  },
  {
    id: "d04-12",
    day: "Day 04",
    no: "12",
    word: "further",
    phonetic: "[fə́ːrðər]",
    partOfSpeech: "형용사/부사",
    meaning: "추가의, 그 이상의 / 더, 조금 더 / 더 멀리",
    relatedForms: "-",
    paraphrase: ["additional", "more"],
    exampleEn: "provide further information",
    exampleKo: "추가적인 정보를 제공하다",
    memo: ""
  },
  {
    id: "d04-13",
    day: "Day 04",
    no: "13",
    word: "primary",
    phonetic: "[práimeri]",
    partOfSpeech: "형용사",
    meaning: "주된, 주요한, 가장 중요한",
    relatedForms: "primarily (부) 주로",
    paraphrase: ["main", "chief", "leading"],
    exampleEn: "the primary source of information",
    exampleKo: "정보의 주요 출처",
    memo: ""
  },
  {
    id: "d04-14",
    day: "Day 04",
    no: "14",
    word: "contribution",
    phonetic: "[kὰntrəbjúːʃən]",
    partOfSpeech: "명사",
    meaning: "기여, 공헌, 기부",
    relatedForms: "contribute (동) 기여하다, contributor (명) (신문, 잡지 등) 기고자; 기여자",
    paraphrase: ["donation"],
    exampleEn: "significant contributions to society",
    exampleKo: "사회에 대한 지대한 공헌",
    memo: ""
  },
  {
    id: "d04-15",
    day: "Day 04",
    no: "15",
    word: "volunteer",
    phonetic: "[vὰləntíər]",
    partOfSpeech: "명사/동사",
    meaning: "자원자, 자원봉사자 / 자원하다, 자원봉사하다 / 제안하다, ~해주겠다고 하다",
    relatedForms: "voluntary (형) 자발적인",
    paraphrase: ["offer"],
    exampleEn: "volunteer at an animal shelter",
    exampleKo: "동물 보호소에서 자원봉사를 하다",
    memo: "지텔프 동의어: Hannah volunteered to help us clean up. -> (a) offered"
  },
  {
    id: "d04-16",
    day: "Day 04",
    no: "16",
    word: "proper",
    phonetic: "[prάpər]",
    partOfSpeech: "형용사",
    meaning: "적절한, 올바른",
    relatedForms: "properly (부) 알맞게, 적절하게",
    paraphrase: ["appropriate", "right", "correct"],
    exampleEn: "proper arrangement of furniture",
    exampleKo: "가구의 적절한 배치",
    memo: ""
  },
  {
    id: "d04-17",
    day: "Day 04",
    no: "17",
    word: "procedure",
    phonetic: "[prəsíːdʒər]",
    partOfSpeech: "명사",
    meaning: "절차, 순서",
    relatedForms: "-",
    paraphrase: ["process", "step"],
    exampleEn: "follow the proper procedure",
    exampleKo: "적절한 절차를 따르다",
    memo: ""
  },
  {
    id: "d04-18",
    day: "Day 04",
    no: "18",
    word: "recruit",
    phonetic: "[rikrúːt]",
    partOfSpeech: "동사/명사",
    meaning: "채용하다, 뽑다, 모집하다 / 신입, 신병",
    relatedForms: "recruitment (명) 신규 모집",
    paraphrase: ["gather", "draft", "enlist", "apprentice", "novice", "beginner"],
    exampleEn: "recruit a new staff of engineers",
    exampleKo: "새로운 기술자 직원들을 모집하다",
    memo: ""
  },
  {
    id: "d04-19",
    day: "Day 04",
    no: "19",
    word: "volume",
    phonetic: "[vάljuːm]",
    partOfSpeech: "명사",
    meaning: "볼륨, 음량 / 양, 용량",
    relatedForms: "-",
    paraphrase: ["amount", "quantity", "capacity"],
    exampleEn: "the high volume of traffic downtown",
    exampleKo: "시내의 많은 교통량",
    memo: ""
  },
  {
    id: "d04-20",
    day: "Day 04",
    no: "20",
    word: "widely",
    phonetic: "[wáidli]",
    partOfSpeech: "부사",
    meaning: "널리, 광범위하게",
    relatedForms: "wide (형) (폭이) 넓은",
    paraphrase: [],
    exampleEn: "an author of the widely popular books",
    exampleKo: "널리 인기 있는 책의 저자",
    memo: ""
  },
  {
    id: "d04-21",
    day: "Day 04",
    no: "21",
    word: "piece",
    phonetic: "[piːs]",
    partOfSpeech: "명사",
    meaning: "조각, 부분 / 작품",
    relatedForms: "-",
    paraphrase: ["slice", "fraction", "work"],
    exampleEn: "a piece of bread",
    exampleKo: "빵 한 조각",
    memo: "buy a beautiful piece of art (아름다운 미술 작품을 사다)"
  },
  {
    id: "d04-22",
    day: "Day 04",
    no: "22",
    word: "subsequent",
    phonetic: "[sʌ́bsikwənt]",
    partOfSpeech: "형용사",
    meaning: "후속의, 다음의, 뒤이어 일어나는",
    relatedForms: "subsequently (부) 나중에",
    paraphrase: ["following", "consequent", "resulting"],
    exampleEn: "be discussed in subsequent chapters",
    exampleKo: "후속 챕터에서 논의되다",
    memo: ""
  },
  {
    id: "d04-23",
    day: "Day 04",
    no: "23",
    word: "demand",
    phonetic: "[dimǽnd]",
    partOfSpeech: "동사/명사",
    meaning: "요구하다 / 수요, 요구",
    relatedForms: "demanding (형) 까다로운, 힘든",
    paraphrase: ["require", "request", "claim", "desire", "need", "requirement"],
    exampleEn: "high demand for tickets",
    exampleKo: "티켓에 대한 높은 수요",
    memo: "지텔프 동의어: The population growth led to a huge demand for more housing. -> (a) requirement"
  },
  {
    id: "d04-24",
    day: "Day 04",
    no: "24",
    word: "strategy",
    phonetic: "[strǽtədʒi]",
    partOfSpeech: "명사",
    meaning: "전략",
    relatedForms: "strategic (형) 전략적인",
    paraphrase: [],
    exampleEn: "develop a new strategy to increase sales",
    exampleKo: "판매를 늘리기 위한 새로운 전략을 개발하다",
    memo: ""
  },
  {
    id: "d04-25",
    day: "Day 04",
    no: "25",
    word: "priority",
    phonetic: "[praiɔ́ːrəti]",
    partOfSpeech: "명사",
    meaning: "우선, 우선사항",
    relatedForms: "prioritize (동) 우선순위를 매기다",
    paraphrase: [],
    exampleEn: "consider national security a top priority",
    exampleKo: "국가 안보를 최우선으로 생각하다",
    memo: ""
  },
  {
    id: "d04-26",
    day: "Day 04",
    no: "26",
    word: "proportion",
    phonetic: "[prəpɔ́ːrʃən]",
    partOfSpeech: "명사",
    meaning: "비율, 비중",
    relatedForms: "-",
    paraphrase: ["amount", "volume"],
    exampleEn: "affect a large proportion of the population worldwide",
    exampleKo: "전 세계 인구의 많은 비중에 영향을 끼치다",
    memo: ""
  },
  {
    id: "d04-27",
    day: "Day 04",
    no: "27",
    word: "mysterious",
    phonetic: "[mistí(ː)riəs]",
    partOfSpeech: "형용사",
    meaning: "불가사의한, 설명하기 힘든, 신비한",
    relatedForms: "mystery (명) 미스터리, 수수께끼",
    paraphrase: ["puzzling", "weird", "strange"],
    exampleEn: "the mysterious death of Princess Diana",
    exampleKo: "다이애나비의 불가사의한 죽음",
    memo: ""
  },
  {
    id: "d04-28",
    day: "Day 04",
    no: "28",
    word: "equip",
    phonetic: "[ikwíp]",
    partOfSpeech: "동사",
    meaning: "장비[설비]를 갖추게 하다",
    relatedForms: "equipment (명) 장비, 설비",
    paraphrase: ["provide", "supply", "furnish", "outfit"],
    exampleEn: "be equipped with a GPS system",
    exampleKo: "GPS 시스템을 갖추다",
    memo: "지텔프 동의어: We need to equip the room with more chairs. -> (a) furnish"
  },
  {
    id: "d04-29",
    day: "Day 04",
    no: "29",
    word: "transport",
    phonetic: "[trænspɔ́ːrt]",
    partOfSpeech: "동사/명사",
    meaning: "운송하다, 옮기다 / 운송, 수송",
    relatedForms: "transportation (명) 운송, 이동",
    paraphrase: ["deliver", "transfer"],
    exampleEn: "transport medical equipment",
    exampleKo: "의료 장비를 운반하다",
    memo: ""
  },
  {
    id: "d04-30",
    day: "Day 04",
    no: "30",
    word: "publication",
    phonetic: "[pʌ̀blikéiʃən]",
    partOfSpeech: "명사",
    meaning: "출판, 발행 / 간행물",
    relatedForms: "publish (동) 출판하다, 발행하다",
    paraphrase: ["magazine", "book", "periodical"],
    exampleEn: "the publication of a new book",
    exampleKo: "새 책의 출판",
    memo: "make corporate publications (기업 간행물을 발행하다)"
  },
  {
    id: "d04-31",
    day: "Day 04",
    no: "31",
    word: "ease",
    phonetic: "[iːz]",
    partOfSpeech: "명사/동사",
    meaning: "쉬움, 용이함 / 덜다, 완화하다, 안정시키다",
    relatedForms: "-",
    paraphrase: ["comfort", "relaxation", "relieve", "alleviate", "lessen", "calm"],
    exampleEn: "prefer the ease of shopping online",
    exampleKo: "온라인 쇼핑의 용이성을 선호하다",
    memo: "ease traffic congestion (교통 체증을 완화하다)"
  },
  {
    id: "d04-32",
    day: "Day 04",
    no: "32",
    word: "progress",
    phonetic: "[prάgrəs]",
    partOfSpeech: "명사/동사",
    meaning: "진행, 진척, 발전 / 진행하다, 나아가다",
    relatedForms: "-",
    paraphrase: ["advance", "advancement", "proceed", "continue"],
    exampleEn: "make progress towards a goal",
    exampleKo: "목표를 향해 나아가다",
    memo: ""
  },
  {
    id: "d04-33",
    day: "Day 04",
    no: "33",
    word: "slightly",
    phonetic: "[sláitli]",
    partOfSpeech: "부사",
    meaning: "약간, 근소하게",
    relatedForms: "slight (형) 약간의, 근소한",
    paraphrase: ["marginally"],
    exampleEn: "a slightly different opinion",
    exampleKo: "약간 다른 의견",
    memo: ""
  },
  {
    id: "d04-34",
    day: "Day 04",
    no: "34",
    word: "entire",
    phonetic: "[intáiər]",
    partOfSpeech: "형용사",
    meaning: "전체의",
    relatedForms: "entirely (부) 전적으로, 완전히",
    paraphrase: ["whole", "full"],
    exampleEn: "sleep for an entire day",
    exampleKo: "하루 종일 자다",
    memo: ""
  },
  {
    id: "d04-35",
    day: "Day 04",
    no: "35",
    word: "discover",
    phonetic: "[diskʌ́vər]",
    partOfSpeech: "동사",
    meaning: "발견하다 / 알아내다",
    relatedForms: "discovery (명) 발견",
    paraphrase: [],
    exampleEn: "discover a body",
    exampleKo: "시체를 발견하다",
    memo: ""
  },
  {
    id: "d04-36",
    day: "Day 04",
    no: "36",
    word: "prospective",
    phonetic: "[prəspéktiv]",
    partOfSpeech: "형용사",
    meaning: "장래의, 유망한",
    relatedForms: "prospect (명) 전망, 예상",
    paraphrase: ["potential", "possible"],
    exampleEn: "a prospective client",
    exampleKo: "잠재 고객",
    memo: ""
  },
  {
    id: "d04-37",
    day: "Day 04",
    no: "37",
    word: "audit",
    phonetic: "[ɔ́ːdit]",
    partOfSpeech: "명사/동사",
    meaning: "감사, 회계감사 / 회계감사를 하다",
    relatedForms: "auditor (명) 감사원, 회계 감사원",
    paraphrase: ["inspect"],
    exampleEn: "conduct an annual audit",
    exampleKo: "연례 감사를 실시하다",
    memo: ""
  },
  {
    id: "d04-38",
    day: "Day 04",
    no: "38",
    word: "relevant",
    phonetic: "[réləvənt]",
    partOfSpeech: "형용사",
    meaning: "적절한, 관련된",
    relatedForms: "relevance (명) 관련, 관련성",
    paraphrase: ["related", "pertinent"],
    exampleEn: "include all the relevant information",
    exampleKo: "모든 관련 정보를 포함하다",
    memo: ""
  },
  {
    id: "d04-39",
    day: "Day 04",
    no: "39",
    word: "attempt",
    phonetic: "[ətémpt]",
    partOfSpeech: "동사/명사",
    meaning: "시도하다 / 시도, 노력",
    relatedForms: "-",
    paraphrase: ["try", "try", "effort"],
    exampleEn: "attempt to climb over the fence",
    exampleKo: "울타리를 넘어가려고 시도하다",
    memo: ""
  },
  {
    id: "d04-40",
    day: "Day 04",
    no: "40",
    word: "endangered",
    phonetic: "[indéindʒərd]",
    partOfSpeech: "형용사",
    meaning: "멸종 위기에 처한",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "protect endangered species",
    exampleKo: "멸종 위기 종을 보호하다",
    memo: ""
  },
  {
    id: "d04-41",
    day: "Day 04",
    no: "41",
    word: "substantial",
    phonetic: "[səbstǽnʃəl]",
    partOfSpeech: "형용사",
    meaning: "상당한",
    relatedForms: "substantially (부) 상당히, 꽤",
    paraphrase: ["large", "considerable", "significant"],
    exampleEn: "a substantial increase in the use of social media",
    exampleKo: "소셜 미디어 사용의 상당한 증가",
    memo: ""
  },
  {
    id: "d04-42",
    day: "Day 04",
    no: "42",
    word: "closely",
    phonetic: "[klóusli]",
    partOfSpeech: "부사",
    meaning: "면밀하게, 꼼꼼하게 / 밀접하게, 긴밀하게",
    relatedForms: "-",
    paraphrase: ["carefully"],
    exampleEn: "be closely monitored by the government",
    exampleKo: "정부에 의해 면밀히 감시되다",
    memo: "be closely related to (~와 밀접하게 연관되어 있다)"
  },
  {
    id: "d04-43",
    day: "Day 04",
    no: "43",
    word: "proof",
    phonetic: "[pruːf]",
    partOfSpeech: "명사",
    meaning: "증거",
    relatedForms: "prove (동) 증명하다, 입증하다",
    paraphrase: ["evidence", "verification"],
    exampleEn: "show proof of purchase",
    exampleKo: "구매 증명서를 제시하다",
    memo: ""
  },
  {
    id: "d04-44",
    day: "Day 04",
    no: "44",
    word: "standard",
    phonetic: "[stǽndərd]",
    partOfSpeech: "명사/형용사",
    meaning: "기준, 표준, 규격 / 기준의, 표준의",
    relatedForms: "standardize (동) 표준화하다",
    paraphrase: ["norm", "criterion"],
    exampleEn: "maintain standards of food safety",
    exampleKo: "식품 안전 기준을 유지하다",
    memo: ""
  },
  {
    id: "d04-45",
    day: "Day 04",
    no: "45",
    word: "status",
    phonetic: "[stéitəs]",
    partOfSpeech: "명사",
    meaning: "지위, 위상 / 상태, 상황",
    relatedForms: "-",
    paraphrase: ["position", "standing", "condition", "development"],
    exampleEn: "fight for equal status",
    exampleKo: "평등한 지위를 위해 싸우다",
    memo: "a patient's health status (환자의 건강 상태)"
  },
  {
    id: "d04-46",
    day: "Day 04",
    no: "46",
    word: "taste",
    phonetic: "[teist]",
    partOfSpeech: "명사/동사",
    meaning: "맛, 미각 / 취향, 기호 / 감각, 센스, 안목 / 맛보다, ~한 맛이 나다",
    relatedForms: "tasty (형) 맛있는",
    paraphrase: ["flavor", "liking", "preference", "judgment"],
    exampleEn: "have good taste in art",
    exampleKo: "예술에 대한 안목이 높다",
    memo: "지텔프 동의어: Frank has developed a taste for sushi. -> (a) liking | 예문: The soup tastes delicious. (그 수프는 맛이 좋다.)"
  },
  {
    id: "d04-47",
    day: "Day 04",
    no: "47",
    word: "ingredient",
    phonetic: "[ingríːdiənt]",
    partOfSpeech: "명사",
    meaning: "요리의 재료, 요소",
    relatedForms: "-",
    paraphrase: ["component", "element"],
    exampleEn: "mix all the ingredients together with both hands",
    exampleKo: "양손으로 모든 요리 재료를 함께 섞다",
    memo: ""
  },
  {
    id: "d04-48",
    day: "Day 04",
    no: "48",
    word: "succeed",
    phonetic: "[səksíːd]",
    partOfSpeech: "동사",
    meaning: "성공하다 / 계승하다, 뒤를 잇다",
    relatedForms: "success (명) 성공",
    paraphrase: ["thrive", "replace", "follow"],
    exampleEn: "succeed in finding a new job",
    exampleKo: "새 직장을 구하는 데 성공하다",
    memo: "succeed his father as chairperson (의장으로서 아버지의 뒤를 잇다)"
  },
  {
    id: "d04-49",
    day: "Day 04",
    no: "49",
    word: "classify",
    phonetic: "[klǽsəfài]",
    partOfSpeech: "동사",
    meaning: "분류하다",
    relatedForms: "classification (명) 분류",
    paraphrase: ["categorize", "label", "sort"],
    exampleEn: "be classified as endangered",
    exampleKo: "멸종 위기 종으로 분류되다",
    memo: ""
  },
  {
    id: "d04-50",
    day: "Day 04",
    no: "50",
    word: "sum",
    phonetic: "[sʌm]",
    partOfSpeech: "명사",
    meaning: "총합 / 액수, 금액",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "cost a huge sum of money",
    exampleKo: "거액의 돈이 들다",
    memo: ""
  },
  {
    id: "d05-01",
    day: "Day 05",
    no: "01",
    word: "experience",
    phonetic: "[ikspí(ː)riəns]",
    partOfSpeech: "명사/동사",
    meaning: "경험 / 경험하다, 겪다",
    relatedForms: "experienced (형) 경험이 많은, 능숙한 (= seasoned)",
    paraphrase: [],
    exampleEn: "personal experience",
    exampleKo: "개인적인 경험",
    memo: "experience pain (고통을 겪다)"
  },
  {
    id: "d05-02",
    day: "Day 05",
    no: "02",
    word: "predator",
    phonetic: "[prédətər]",
    partOfSpeech: "명사",
    meaning: "포식자",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "escape from predators",
    exampleKo: "포식자로부터 도망치다",
    memo: ""
  },
  {
    id: "d05-03",
    day: "Day 05",
    no: "03",
    word: "respond",
    phonetic: "[rispάnd]",
    partOfSpeech: "동사",
    meaning: "반응하다, 대응하다 / 응답하다",
    relatedForms: "response (명) 반응, 대응; 응답",
    paraphrase: ["react", "answer", "reply"],
    exampleEn: "respond to a customer's complaint",
    exampleKo: "고객의 항의에 대응하다",
    memo: "respond to messages (메시지에 응답하다)"
  },
  {
    id: "d05-04",
    day: "Day 05",
    no: "04",
    word: "tough",
    phonetic: "[tʌf]",
    partOfSpeech: "형용사",
    meaning: "어려운, 힘든 / 강인한",
    relatedForms: "-",
    paraphrase: ["hard", "harsh", "strong"],
    exampleEn: "go through a tough time",
    exampleKo: "힘든 시간을 보내다",
    memo: "a tough guy (강인한 남자)"
  },
  {
    id: "d05-05",
    day: "Day 05",
    no: "05",
    word: "religious",
    phonetic: "[rilídʒəs]",
    partOfSpeech: "형용사",
    meaning: "종교의 / 독실한",
    relatedForms: "religion (명) 종교",
    paraphrase: ["spiritual", "devout"],
    exampleEn: "a religious belief",
    exampleKo: "종교적 신념",
    memo: "a religious Catholic (독실한 가톨릭 신자)"
  },
  {
    id: "d05-06",
    day: "Day 05",
    no: "06",
    word: "surrounding",
    phonetic: "[səráundiŋ]",
    partOfSpeech: "형용사",
    meaning: "주변의, 인근의",
    relatedForms: "surround (동) 둘러싸다",
    paraphrase: ["neighboring", "adjacent"],
    exampleEn: "the surrounding area",
    exampleKo: "주변 지역",
    memo: ""
  },
  {
    id: "d05-07",
    day: "Day 05",
    no: "07",
    word: "dependent",
    phonetic: "[dipéndənt]",
    partOfSpeech: "형용사",
    meaning: "의존하는, 의지하는",
    relatedForms: "-",
    paraphrase: ["reliant"],
    exampleEn: "The patient is dependent on the doctor.",
    exampleKo: "환자는 의사에게 의지한다.",
    memo: ""
  },
  {
    id: "d05-08",
    day: "Day 05",
    no: "08",
    word: "commit",
    phonetic: "[kəmít]",
    partOfSpeech: "동사",
    meaning: "저지르다 / 약속하다 / 헌신하다, 전념하다",
    relatedForms: "commitment (명) 약속; 헌신",
    paraphrase: ["do", "perform", "dedicate"],
    exampleEn: "commit a crime",
    exampleKo: "범죄를 저지르다",
    memo: "지텔프 동의어: Scott is committed to his studies. -> (b) dedicated | commit to going to the gym three times a week (일주일에 세 번 체육관에 가기로 약속하다)"
  },
  {
    id: "d05-09",
    day: "Day 05",
    no: "09",
    word: "representative",
    phonetic: "[rèprizéntətiv]",
    partOfSpeech: "명사/형용사",
    meaning: "대표(자) / 대리인 / 대표하는, 잘 나타내는",
    relatedForms: "represent (동) 대표하다; 나타내다",
    paraphrase: [],
    exampleEn: "a company representative",
    exampleKo: "회사 대표",
    memo: "A flag is representative of a country and its people. (국기는 그 나라와 그 국민을 대표한다.)"
  },
  {
    id: "d05-10",
    day: "Day 05",
    no: "10",
    word: "exceed",
    phonetic: "[iksíːd]",
    partOfSpeech: "동사",
    meaning: "넘다, 초과하다",
    relatedForms: "-",
    paraphrase: ["surpass"],
    exampleEn: "The elevator exceeded its maximum capacity.",
    exampleKo: "엘리베이터가 정원을 초과하였다.",
    memo: "지텔프 동의어: The cost of the project exceeded one million dollars. -> (b) surpassed"
  },
  {
    id: "d05-11",
    day: "Day 05",
    no: "11",
    word: "revolution",
    phonetic: "[rèvəlúːʃən]",
    partOfSpeech: "명사",
    meaning: "혁명 / 변혁, 혁신 / (행성의) 공전",
    relatedForms: "revolutionary (형) 혁명적인",
    paraphrase: ["coup", "rebellion", "uprising", "change", "transformation"],
    exampleEn: "the Industrial Revolution",
    exampleKo: "산업혁명(대변혁)",
    memo: "the revolution of the earth (지구의 공전)"
  },
  {
    id: "d05-12",
    day: "Day 05",
    no: "12",
    word: "colleague",
    phonetic: "[kάliːg]",
    partOfSpeech: "명사",
    meaning: "동료",
    relatedForms: "-",
    paraphrase: ["co-worker", "associate", "partner"],
    exampleEn: "collaborate with colleagues",
    exampleKo: "동료들과 협력하다",
    memo: ""
  },
  {
    id: "d05-13",
    day: "Day 05",
    no: "13",
    word: "talented",
    phonetic: "[tǽləntid]",
    partOfSpeech: "형용사",
    meaning: "재능 있는, 타고난",
    relatedForms: "talent (명) 재능",
    paraphrase: ["gifted"],
    exampleEn: "a talented musician",
    exampleKo: "재능 있는 음악가",
    memo: ""
  },
  {
    id: "d05-14",
    day: "Day 05",
    no: "14",
    word: "complimentary",
    phonetic: "[kὰmpləméntəri]",
    partOfSpeech: "형용사",
    meaning: "무료의 / 칭찬하는",
    relatedForms: "compliment (명) 칭찬",
    paraphrase: ["free"],
    exampleEn: "complimentary shuttle service",
    exampleKo: "무료 셔틀 서비스",
    memo: "Rachel's teacher was complimentary about her essay. (레이첼의 선생님은 그녀의 에세이를 칭찬했다.)"
  },
  {
    id: "d05-15",
    day: "Day 05",
    no: "15",
    word: "require",
    phonetic: "[rikwáiər]",
    partOfSpeech: "동사",
    meaning: "필요로 하다, 요구하다",
    relatedForms: "requirement (명) 필요, 요구; 요건, 필요조건",
    paraphrase: ["demand"],
    exampleEn: "Patients with diabetes require treatment with insulin.",
    exampleKo: "당뇨병 환자는 인슐린 치료를 필요로 한다.",
    memo: "require information about the project's timeline (프로젝트 일정에 대한 정보를 요구하다)"
  },
  {
    id: "d05-16",
    day: "Day 05",
    no: "16",
    word: "fair",
    phonetic: "[fεər]",
    partOfSpeech: "형용사/명사",
    meaning: "공정한 / 박람회",
    relatedForms: "fairly (부) 공정하게",
    paraphrase: ["exposition"],
    exampleEn: "a fair election",
    exampleKo: "공정한 선거",
    memo: "a science fair (과학 박람회)"
  },
  {
    id: "d05-17",
    day: "Day 05",
    no: "17",
    word: "insist",
    phonetic: "[insíst]",
    partOfSpeech: "동사",
    meaning: "주장하다, 고집부리다",
    relatedForms: "insistence (명) 주장, 고집",
    paraphrase: [],
    exampleEn: "Taylor insisted that she was right.",
    exampleKo: "테일러는 그녀가 옳다고 주장했다.",
    memo: ""
  },
  {
    id: "d05-18",
    day: "Day 05",
    no: "18",
    word: "scarce",
    phonetic: "[skεərs]",
    partOfSpeech: "형용사",
    meaning: "부족한, 희소한",
    relatedForms: "scarcely (부) 거의 ~하지 않는",
    paraphrase: ["limited", "insufficient", "rare"],
    exampleEn: "scarce resources",
    exampleKo: "희소한 자원",
    memo: ""
  },
  {
    id: "d05-19",
    day: "Day 05",
    no: "19",
    word: "burst",
    phonetic: "[bəːrst]",
    partOfSpeech: "동사",
    meaning: "터지다, 파열하다",
    relatedForms: "-",
    paraphrase: ["explode"],
    exampleEn: "The balloon burst with a loud bang.",
    exampleKo: "풍선이 쾅 하고 터졌다.",
    memo: ""
  },
  {
    id: "d05-20",
    day: "Day 05",
    no: "20",
    word: "extinct",
    phonetic: "[ikstíŋkt]",
    partOfSpeech: "형용사",
    meaning: "멸종된",
    relatedForms: "extinction (명) 멸종",
    paraphrase: [],
    exampleEn: "extinct dinosaurs",
    exampleKo: "멸종된 공룡들",
    memo: ""
  },
  {
    id: "d05-21",
    day: "Day 05",
    no: "21",
    word: "raise",
    phonetic: "[reiz]",
    partOfSpeech: "동사",
    meaning: "(물리적으로) 들어올리다 / (가격·수준 등) 높이다 / 제기하다, 언급하다 / 키우다, 기르다",
    relatedForms: "-",
    paraphrase: ["lift", "elevate", "increase", "mention", "support", "bring up"],
    exampleEn: "raise awareness of the importance of recycling",
    exampleKo: "재활용의 중요성에 대한 인식을 높이다",
    memo: "지텔프 동의어: Lauren raised concerns about the new policy. -> (b) mentioned | raise their hands (그들의 손을 들다), raise a child (아이를 키우다)"
  },
  {
    id: "d05-22",
    day: "Day 05",
    no: "22",
    word: "responsible",
    phonetic: "[rispάnsəbl]",
    partOfSpeech: "형용사",
    meaning: "책임지고 있는",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "Brian is responsible for the planning of the event.",
    exampleKo: "브라이언은 그 행사의 계획을 책임진다.",
    memo: ""
  },
  {
    id: "d05-23",
    day: "Day 05",
    no: "23",
    word: "numerous",
    phonetic: "[njúːmərəs]",
    partOfSpeech: "형용사",
    meaning: "수많은",
    relatedForms: "-",
    paraphrase: ["many", "plentiful"],
    exampleEn: "travel to numerous cities",
    exampleKo: "수많은 도시를 여행하다",
    memo: ""
  },
  {
    id: "d05-24",
    day: "Day 05",
    no: "24",
    word: "edit",
    phonetic: "[édit]",
    partOfSpeech: "동사",
    meaning: "편집하다",
    relatedForms: "editor (명) 편집자",
    paraphrase: [],
    exampleEn: "edit a YouTube video",
    exampleKo: "유튜브 영상을 편집하다",
    memo: "edit a book (책을 편집하다)"
  },
  {
    id: "d05-25",
    day: "Day 05",
    no: "25",
    word: "upcoming",
    phonetic: "[ʌ́pkʌ̀miŋ]",
    partOfSpeech: "형용사",
    meaning: "다가오는, 곧 있을",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "prepare for the upcoming event",
    exampleKo: "다가오는 행사를 준비하다",
    memo: ""
  },
  {
    id: "d05-26",
    day: "Day 05",
    no: "26",
    word: "prove",
    phonetic: "[pruːv]",
    partOfSpeech: "동사",
    meaning: "증명하다, 입증하다",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "The theory of evolution has been proven to be true.",
    exampleKo: "진화론은 사실로 증명되었다.",
    memo: ""
  },
  {
    id: "d05-27",
    day: "Day 05",
    no: "27",
    word: "determine",
    phonetic: "[ditə́ːrmin]",
    partOfSpeech: "동사",
    meaning: "알아내다, 밝히다 / (결)정하다",
    relatedForms: "determined (형) 확고한, 단호한",
    paraphrase: ["identify", "discover", "decide", "settle"],
    exampleEn: "The jury will determine the guilt or innocence of the defendant.",
    exampleKo: "배심원들은 피고의 유무죄를 결정할 것이다.",
    memo: "지텔프 동의어: Psychologists use tests to determine a person's IQ. -> (a) identify"
  },
  {
    id: "d05-28",
    day: "Day 05",
    no: "28",
    word: "artificial",
    phonetic: "[ὰːrtəfíʃəl]",
    partOfSpeech: "형용사",
    meaning: "인공의, 인조의",
    relatedForms: "-",
    paraphrase: ["man-made"],
    exampleEn: "Artificial Intelligence",
    exampleKo: "인공지능",
    memo: "artificial grass (인조 잔디)"
  },
  {
    id: "d05-29",
    day: "Day 05",
    no: "29",
    word: "illness",
    phonetic: "[ílnis]",
    partOfSpeech: "명사",
    meaning: "(질)병",
    relatedForms: "ill (형) 아픈",
    paraphrase: ["disease", "sickness", "disorder"],
    exampleEn: "mental illness",
    exampleKo: "정신질환",
    memo: ""
  },
  {
    id: "d05-30",
    day: "Day 05",
    no: "30",
    word: "wealthy",
    phonetic: "[wélθi]",
    partOfSpeech: "형용사",
    meaning: "부유한",
    relatedForms: "wealth (명) 부유함, 재산",
    paraphrase: ["rich", "affluent", "prosperous"],
    exampleEn: "the wealthy upper class",
    exampleKo: "부유한 상류층",
    memo: ""
  },
  {
    id: "d05-31",
    day: "Day 05",
    no: "31",
    word: "broaden",
    phonetic: "[brɔ́ːdn]",
    partOfSpeech: "동사",
    meaning: "넓어지다, 넓히다",
    relatedForms: "broad (형) 넓은, 광범위한",
    paraphrase: ["widen", "expand"],
    exampleEn: "broaden my horizons",
    exampleKo: "나의 시야를 넓히다",
    memo: "The new advertising campaign is designed to broaden the target audience. (새로운 광고 캠페인은 타깃층을 넓히기 위해 고안되었다.)"
  },
  {
    id: "d05-32",
    day: "Day 05",
    no: "32",
    word: "candidate",
    phonetic: "[kǽndidèit]",
    partOfSpeech: "명사",
    meaning: "후보자, 지원자",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "a candidate for the city council",
    exampleKo: "시의회 의원 후보자",
    memo: ""
  },
  {
    id: "d05-33",
    day: "Day 05",
    no: "33",
    word: "engaging",
    phonetic: "[ingéidʒiŋ]",
    partOfSpeech: "형용사",
    meaning: "매력적인",
    relatedForms: "engage (동) 사로잡다, 끌다",
    paraphrase: ["charming", "attractive", "appealing", "fascinating"],
    exampleEn: "have an engaging smile",
    exampleKo: "매력적인 미소를 짓다",
    memo: ""
  },
  {
    id: "d05-34",
    day: "Day 05",
    no: "34",
    word: "attribute",
    phonetic: "[ətríbjuːt] / [ǽtrəbjùːt]",
    partOfSpeech: "동사/명사",
    meaning: "(공로, 책임 등) 돌리다 / 자질, 속성",
    relatedForms: "-",
    paraphrase: ["credit", "ascribe", "trait", "quality", "feature"],
    exampleEn: "The success of the event is attributed to the hard work of the organizers.",
    exampleKo: "행사의 성공은 주최 측의 노력 때문이다.",
    memo: "지텔프 동의어: The most important attribute of a leader is courage. -> (b) trait | 숙어: be attributed to (~의 덕분이다, ~의 탓으로 보다)"
  },
  {
    id: "d05-35",
    day: "Day 05",
    no: "35",
    word: "climate",
    phonetic: "[kláimit]",
    partOfSpeech: "명사",
    meaning: "기후 / 분위기, 풍조",
    relatedForms: "-",
    paraphrase: ["weather", "atmosphere"],
    exampleEn: "climate change",
    exampleKo: "기후 변화",
    memo: "The economic climate is worsening. (경제 상황이 악화되고 있다.)"
  },
  {
    id: "d05-36",
    day: "Day 05",
    no: "36",
    word: "property",
    phonetic: "[prάpərti]",
    partOfSpeech: "명사",
    meaning: "재산, 소유물 / 부동산",
    relatedForms: "-",
    paraphrase: [],
    exampleEn: "property tax",
    exampleKo: "재산세",
    memo: "own a property (부동산을 소유하다)"
  },
  {
    id: "d05-37",
    day: "Day 05",
    no: "37",
    word: "instrument",
    phonetic: "[ínstrəmənt]",
    partOfSpeech: "명사",
    meaning: "기구 / 악기",
    relatedForms: "-",
    paraphrase: ["tool", "device", "implement"],
    exampleEn: "high-tech scientific instruments",
    exampleKo: "첨단 과학 기구",
    memo: "play musical instruments (악기를 연주하다)"
  },
  {
    id: "d05-38",
    day: "Day 05",
    no: "38",
    word: "recognize",
    phonetic: "[rékəgnàiz]",
    partOfSpeech: "동사",
    meaning: "알아보다, 식별하다 / (중요성, 가치 등) 인정하다",
    relatedForms: "recognition (명) 알아봄; 인정",
    paraphrase: ["identify", "accept", "acknowledge"],
    exampleEn: "It is important to recognize the signs of depression.",
    exampleKo: "우울증의 징후를 알아차리는 것은 중요하다.",
    memo: "지텔프 동의어: Ashley was recognized as a gifted artist at a young age. -> (b) accepted"
  },
  {
    id: "d05-39",
    day: "Day 05",
    no: "39",
    word: "commercial",
    phonetic: "[kəmə́ːrʃəl]",
    partOfSpeech: "형용사/명사",
    meaning: "상업의 / 상업적인, 이윤을 추구하는 / 광고",
    relatedForms: "commerce (명) 상업",
    paraphrase: ["business", "profitable", "advertisement"],
    exampleEn: "a commercial building",
    exampleKo: "상가 건물",
    memo: "No commercial use allowed (상업적 사용 금지), radio commercials (라디오 광고)"
  },
  {
    id: "d05-40",
    day: "Day 05",
    no: "40",
    word: "guarantee",
    phonetic: "[gæ̀rəntíː]",
    partOfSpeech: "동사/명사",
    meaning: "보장하다 / 보증하다 / 보장 / 보증",
    relatedForms: "-",
    paraphrase: ["assure", "ensure", "promise", "assurance", "promise", "warranty"],
    exampleEn: "The company guarantees that the product is free of defects.",
    exampleKo: "회사는 제품에 결함이 없음을 보장하고 있다.",
    memo: "a money-back guarantee (환불 보증)"
  },
  {
    id: "d05-41",
    day: "Day 05",
    no: "41",
    word: "attach",
    phonetic: "[ətǽtʃ]",
    partOfSpeech: "동사",
    meaning: "붙이다, 연결하다 / 첨부하다",
    relatedForms: "attachment (명) 첨부; 애착",
    paraphrase: ["join", "fasten", "fix", "stick", "glue"],
    exampleEn: "attach the label to the package",
    exampleKo: "소포에 라벨을 붙이다",
    memo: "check the attached file (첨부 파일을 확인하다)"
  },
  {
    id: "d05-42",
    day: "Day 05",
    no: "42",
    word: "supervisor",
    phonetic: "[súːpərvàizər]",
    partOfSpeech: "명사",
    meaning: "감독관, 관리자",
    relatedForms: "supervision (명) 감독, 관리, supervise (동) 감독하다",
    paraphrase: ["manager", "inspector", "administrator"],
    exampleEn: "The factory supervisor monitors the quality of the products.",
    exampleKo: "공장장은 제품의 품질을 검사한다.",
    memo: ""
  },
  {
    id: "d05-43",
    day: "Day 05",
    no: "43",
    word: "guilty",
    phonetic: "[gílti]",
    partOfSpeech: "형용사",
    meaning: "죄책감이 드는 / 유죄의",
    relatedForms: "guilt (명) 죄책감; 유죄",
    paraphrase: ["sorry", "ashamed", "regretful", "culpable"],
    exampleEn: "feel guilty about not studying for the test",
    exampleKo: "시험 공부를 하지 않은 것에 대해 죄책감을 느끼다",
    memo: "be found guilty (유죄 판결을 받다)"
  },
  {
    id: "d05-44",
    day: "Day 05",
    no: "44",
    word: "undergo",
    phonetic: "[ʌ̀ndərgóu]",
    partOfSpeech: "동사",
    meaning: "겪다",
    relatedForms: "-",
    paraphrase: ["experience", "go through", "suffer"],
    exampleEn: "undergo a change in lifestyle",
    exampleKo: "생활 방식의 변화를 겪다",
    memo: ""
  },
  {
    id: "d05-45",
    day: "Day 05",
    no: "45",
    word: "forecast",
    phonetic: "[fɔ́ːrkæ̀st]",
    partOfSpeech: "명사/동사",
    meaning: "예측, 예상 / 예측하다",
    relatedForms: "-",
    paraphrase: ["prediction", "anticipation", "predict", "anticipate", "foresee", "guess"],
    exampleEn: "the weather forecast",
    exampleKo: "일기 예보",
    memo: ""
  },
  {
    id: "d05-46",
    day: "Day 05",
    no: "46",
    word: "arise",
    phonetic: "[əráiz]",
    partOfSpeech: "동사",
    meaning: "발생하다",
    relatedForms: "-",
    paraphrase: ["happen", "occur", "emerge"],
    exampleEn: "A new issue has arisen.",
    exampleKo: "새로운 문제가 발생했다.",
    memo: ""
  },
  {
    id: "d05-47",
    day: "Day 05",
    no: "47",
    word: "abandon",
    phonetic: "[əbǽndən]",
    partOfSpeech: "동사",
    meaning: "버리다, 떠나다 / 포기하다, 그만두다",
    relatedForms: "-",
    paraphrase: ["leave", "discard", "dump", "give up", "stop", "drop", "discontinue"],
    exampleEn: "If you abandon your child, you will be arrested.",
    exampleKo: "아이를 버리면 체포될 것이다.",
    memo: "abandon its attempts to develop a new product (신제품 개발 시도를 포기하다)"
  },
  {
    id: "d05-48",
    day: "Day 05",
    no: "48",
    word: "reflect",
    phonetic: "[riflékt]",
    partOfSpeech: "동사",
    meaning: "비추다, 반사하다 / 반영하다, 나타내다",
    relatedForms: "reflection (명) (비친) 모습; 반영; 반사",
    paraphrase: ["mirror", "reveal", "show", "indicate"],
    exampleEn: "The window reflected the image of the clouds.",
    exampleKo: "창문에 구름의 모습이 비쳤다.",
    memo: "지텔프 동의어: The price of the stock reflects the company's performance. -> (b) reveals | Sunlight reflects on the water. (햇빛이 물에 반사된다.)"
  },
  {
    id: "d05-49",
    day: "Day 05",
    no: "49",
    word: "alter",
    phonetic: "[ɔ́ːltər]",
    partOfSpeech: "동사",
    meaning: "변하다, 바꾸다",
    relatedForms: "alteration (명) 변화; 변경",
    paraphrase: ["change", "vary", "modify"],
    exampleEn: "Eric altered his plans for the trip.",
    exampleKo: "에릭은 여행 계획을 바꿨다.",
    memo: "Ronald's behavior was altered by the medication. (로널드의 행동은 그 약에 의해 변했다.)"
  },
  {
    id: "d05-50",
    day: "Day 05",
    no: "50",
    word: "revenue",
    phonetic: "[révənjùː]",
    partOfSpeech: "명사",
    meaning: "수입, 수익",
    relatedForms: "-",
    paraphrase: ["income", "proceeds"],
    exampleEn: "revenue from online sales",
    exampleKo: "온라인 판매 수익",
    memo: ""
  },
  {
        "id":  "d06-01",
        "day":  "Day 06",
        "no":  "01",
        "word":  "conduct",
        "phonetic":  "[kəndʌ́kt]",
        "partOfSpeech":  "동사",
        "meaning":  "수행하다, 진행하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "lead"
                       ],
        "exampleEn":  "conduct a detailed study",
        "exampleKo":  "상세한 연구를 수행하다",
        "memo":  "지텔프 동의어: A renowned expert will conduct the workshop. -> (b) lead"
    },
    {
        "id":  "d06-02",
        "day":  "Day 06",
        "no":  "02",
        "word":  "confident",
        "phonetic":  "[kάnfidənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "자신감 있는, 확신하고 있는",
        "relatedForms":  "confidence (명) 자신감, 확신",
        "paraphrase":  [
                           "convinced",
                           "certain"
                       ],
        "exampleEn":  "quite confident about life",
        "exampleKo":  "인생에 대해 꽤 자신 있는",
        "memo":  "I am confident that we share the same goal. (저는 우리가 같은 목표를 가지고 있다고 확신합니다.)"
    },
    {
        "id":  "d06-03",
        "day":  "Day 06",
        "no":  "03",
        "word":  "given",
        "phonetic":  "[gívn]",
        "partOfSpeech":  "전치사/접속사",
        "meaning":  "~라는 것을 감안하면",
        "relatedForms":  "-",
        "paraphrase":  [
                           "considering"
                       ],
        "exampleEn":  "Given that it is raining, we will have to cancel our picnic.",
        "exampleKo":  "비가 온다는 것을 고려하면, 우리는 소풍을 취소해야 할 것이다.",
        "memo":  ""
    },
    {
        "id":  "d06-04",
        "day":  "Day 06",
        "no":  "04",
        "word":  "instead",
        "phonetic":  "[instéd]",
        "partOfSpeech":  "부사",
        "meaning":  "대신에",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "I was going to watch a movie but went for a walk instead.",
        "exampleKo":  "나는 영화를 보려고 했지만 대신 산책을 갔다.",
        "memo":  ""
    },
    {
        "id":  "d06-05",
        "day":  "Day 06",
        "no":  "05",
        "word":  "approximately",
        "phonetic":  "[əprάksəmətli]",
        "partOfSpeech":  "부사",
        "meaning":  "대략",
        "relatedForms":  "approximate (형) 대략적인, 근사치의",
        "paraphrase":  [
                           "almost",
                           "nearly",
                           "roughly",
                           "about",
                           "around"
                       ],
        "exampleEn":  "for approximately 15 minutes",
        "exampleKo":  "대략 15분 동안",
        "memo":  ""
    },
    {
        "id":  "d06-06",
        "day":  "Day 06",
        "no":  "06",
        "word":  "absorb",
        "phonetic":  "[æbsɔ́ːrb]",
        "partOfSpeech":  "동사",
        "meaning":  "흡수하다, 빨아들이이다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "digest",
                           "soak up"
                       ],
        "exampleEn":  "Your body can absorb 30 grams of protein in one meal.",
        "exampleKo":  "여러분의 몸은 한 끼에 30그램의 단백질을 흡수할 수 있습니다.",
        "memo":  ""
    },
    {
        "id":  "d06-07",
        "day":  "Day 06",
        "no":  "07",
        "word":  "exhibit",
        "phonetic":  "[igzíbit]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "전시하다 / 보이다, 나타내다 / 전시회, 전시품, 전시물",
        "relatedForms":  "exhibition (명) 전시회",
        "paraphrase":  [
                           "display",
                           "present",
                           "show",
                           "reveal"
                       ],
        "exampleEn":  "exhibit symptoms of stress",
        "exampleKo":  "스트레스 증상을 보이다",
        "memo":  "a photo exhibit (사진 전시회)"
    },
    {
        "id":  "d06-08",
        "day":  "Day 06",
        "no":  "08",
        "word":  "accuse",
        "phonetic":  "[əkjúːz]",
        "partOfSpeech":  "동사",
        "meaning":  "비난하다, 고소하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "blame",
                           "denounce"
                       ],
        "exampleEn":  "accuse Kevin of spreading false information",
        "exampleKo":  "케빈이 잘못된 정보를 퍼뜨렸다고 비난하다",
        "memo":  ""
    },
    {
        "id":  "d06-09",
        "day":  "Day 06",
        "no":  "09",
        "word":  "apologize",
        "phonetic":  "[əpάlədʒàiz]",
        "partOfSpeech":  "동사",
        "meaning":  "사과하다",
        "relatedForms":  "apology (명) 사과",
        "paraphrase":  [
                           "express regret"
                       ],
        "exampleEn":  "apologize for the mistake",
        "exampleKo":  "잘못을 사과하다",
        "memo":  ""
    },
    {
        "id":  "d06-10",
        "day":  "Day 06",
        "no":  "10",
        "word":  "cease",
        "phonetic":  "[siːs]",
        "partOfSpeech":  "동사",
        "meaning":  "중단하다, 멈추다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "finish",
                           "stop",
                           "end",
                           "halt"
                       ],
        "exampleEn":  "cease production of consumer goods",
        "exampleKo":  "소비재의 생산을 중단하다",
        "memo":  ""
    },
    {
        "id":  "d06-11",
        "day":  "Day 06",
        "no":  "11",
        "word":  "vacant",
        "phonetic":  "[véikənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "비어 있는, 공석의",
        "relatedForms":  "vacancy (명) 빈자리, 공석, 결원; (호텔 등의) 빈 방",
        "paraphrase":  [

                       ],
        "exampleEn":  "buy the vacant lot",
        "exampleKo":  "공터를 매입하다",
        "memo":  ""
    },
    {
        "id":  "d06-12",
        "day":  "Day 06",
        "no":  "12",
        "word":  "accurate",
        "phonetic":  "[ǽkjərit]",
        "partOfSpeech":  "형용사",
        "meaning":  "정확한",
        "relatedForms":  "accuracy (명) 정확, 정확성",
        "paraphrase":  [
                           "precise",
                           "exact",
                           "correct"
                       ],
        "exampleEn":  "an accurate description of the situation",
        "exampleKo":  "상황의 정확한 묘사",
        "memo":  ""
    },
    {
        "id":  "d06-13",
        "day":  "Day 06",
        "no":  "13",
        "word":  "equivalent",
        "phonetic":  "[ikwívələnt]",
        "partOfSpeech":  "형용사",
        "meaning":  "동등한, 맞먹는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "equal",
                           "comparable",
                           "identical"
                       ],
        "exampleEn":  "$1 is equivalent to about 1,300 won.",
        "exampleKo":  "1달러는 1,300원에 상당한다.",
        "memo":  ""
    },
    {
        "id":  "d06-14",
        "day":  "Day 06",
        "no":  "14",
        "word":  "frequent",
        "phonetic":  "[fríːkwənt]",
        "partOfSpeech":  "형용사/동사",
        "meaning":  "잦은, 빈번한 / 자주 방문하다",
        "relatedForms":  "frequency (명) 빈도, frequently (부) 자주, 빈번히",
        "paraphrase":  [
                           "repeated",
                           "common",
                           "recurrent",
                           "visit",
                           "patronize"
                       ],
        "exampleEn":  "the most frequent cause of head injuries",
        "exampleKo":  "머리 부상의 가장 빈번한 원인",
        "memo":  "지텔프 동의어: The café is frequented by families with young children. -> (b) visited"
    },
    {
        "id":  "d06-15",
        "day":  "Day 06",
        "no":  "15",
        "word":  "administrative",
        "phonetic":  "[ædmínəstrèitiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "행정적인, 관리의",
        "relatedForms":  "administration (명) 행정, 관리, administer (동) 시행하다, 관리하다",
        "paraphrase":  [
                           "executive",
                           "managerial"
                       ],
        "exampleEn":  "provide administrative support",
        "exampleKo":  "행정적인 지원을 제공하다",
        "memo":  ""
    },
    {
        "id":  "d06-16",
        "day":  "Day 06",
        "no":  "16",
        "word":  "implement",
        "phonetic":  "[ímpləmənt]",
        "partOfSpeech":  "동사",
        "meaning":  "실행하다, 시행하다",
        "relatedForms":  "implementation (명) 실행, 시행",
        "paraphrase":  [
                           "enforce",
                           "enact",
                           "execute",
                           "carry out"
                       ],
        "exampleEn":  "implement tax reform",
        "exampleKo":  "세제 개혁을 시행하다",
        "memo":  ""
    },
    {
        "id":  "d06-17",
        "day":  "Day 06",
        "no":  "17",
        "word":  "locate",
        "phonetic":  "[lóukeit]",
        "partOfSpeech":  "동사",
        "meaning":  "~의 위치를 찾아내다",
        "relatedForms":  "location (명) 장소, 지점",
        "paraphrase":  [
                           "discover",
                           "find"
                       ],
        "exampleEn":  "try to locate the missing girl",
        "exampleKo":  "실종된 여자 아이의 행방을 찾기 위해 노력하다",
        "memo":  "숙어: be located (위치하다)"
    },
    {
        "id":  "d06-18",
        "day":  "Day 06",
        "no":  "18",
        "word":  "anticipate",
        "phonetic":  "[æntísəpèit]",
        "partOfSpeech":  "동사",
        "meaning":  "예감하다, 예상하다",
        "relatedForms":  "anticipation (명) 기대, 예감",
        "paraphrase":  [
                           "expect",
                           "predict",
                           "forecast"
                       ],
        "exampleEn":  "anticipate a lot of participants",
        "exampleKo":  "많은 참석자를 예상하다",
        "memo":  ""
    },
    {
        "id":  "d06-19",
        "day":  "Day 06",
        "no":  "19",
        "word":  "literally",
        "phonetic":  "[lítərəli]",
        "partOfSpeech":  "부사",
        "meaning":  "문자 그대로, 말 그대로",
        "relatedForms":  "literal (형) 문자 그대로의, 말 그대로의",
        "paraphrase":  [
                           "exactly",
                           "actually"
                       ],
        "exampleEn":  "I was literally about to die of hunger.",
        "exampleKo":  "나는 말 그대로 배고파 죽을 지경이었다.",
        "memo":  ""
    },
    {
        "id":  "d06-20",
        "day":  "Day 06",
        "no":  "20",
        "word":  "complicated",
        "phonetic":  "[kάmpləkèitid]",
        "partOfSpeech":  "형용사",
        "meaning":  "복잡한",
        "relatedForms":  "complication (명) 복잡, 복잡한 문제",
        "paraphrase":  [
                           "difficult",
                           "complex",
                           "intricate"
                       ],
        "exampleEn":  "the complicated process of buying a home",
        "exampleKo":  "집을 사는 복잡한 과정",
        "memo":  ""
    },
    {
        "id":  "d06-21",
        "day":  "Day 06",
        "no":  "21",
        "word":  "inform",
        "phonetic":  "[infɔ́ːrm]",
        "partOfSpeech":  "동사",
        "meaning":  "통보하다, 알리다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "notify",
                           "tell",
                           "advise"
                       ],
        "exampleEn":  "Erica informed the tenants that the rent is due tomorrow.",
        "exampleKo":  "에리카는 세입자들에게 집세가 내일까지라고 알렸다.",
        "memo":  ""
    },
    {
        "id":  "d06-22",
        "day":  "Day 06",
        "no":  "22",
        "word":  "adequate",
        "phonetic":  "[ǽdikwit]",
        "partOfSpeech":  "형용사",
        "meaning":  "적절한, 충분한",
        "relatedForms":  "inadequate (형) 부적절한, 불충분한",
        "paraphrase":  [
                           "enough",
                           "suitable",
                           "sufficient"
                       ],
        "exampleEn":  "read under adequate lighting to protect my eyes",
        "exampleKo":  "내 눈을 보호하기 위해 적절한 조명 아래서 책을 읽다",
        "memo":  ""
    },
    {
        "id":  "d06-23",
        "day":  "Day 06",
        "no":  "23",
        "word":  "devastate",
        "phonetic":  "[dévəstèit]",
        "partOfSpeech":  "동사",
        "meaning":  "완전히 파괴하다, 황폐화시키다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "destroy",
                           "batter",
                           "ruin",
                           "wreck"
                       ],
        "exampleEn":  "The floods devastated the crops.",
        "exampleKo":  "홍수로 농작물이 황폐해졌다.",
        "memo":  ""
    },
    {
        "id":  "d06-24",
        "day":  "Day 06",
        "no":  "24",
        "word":  "massive",
        "phonetic":  "[mǽsiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "거대한, 대규모의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "huge",
                           "enormous",
                           "gigantic",
                           "vast"
                       ],
        "exampleEn":  "erect a massive statue",
        "exampleKo":  "거대한 동상을 세우다",
        "memo":  ""
    },
    {
        "id":  "d06-25",
        "day":  "Day 06",
        "no":  "25",
        "word":  "acknowledge",
        "phonetic":  "[æknάlidʒ]",
        "partOfSpeech":  "동사",
        "meaning":  "인정하다, 승인하다 / 감사를 표하다",
        "relatedForms":  "acknowledgment (명) 인정, 승인; 감사, 사례",
        "paraphrase":  [
                           "admit",
                           "accept",
                           "recognize"
                       ],
        "exampleEn":  "Gary acknowledged that he was wrong.",
        "exampleKo":  "게리는 자신이 틀렸다는 것을 인정했다.",
        "memo":  "지텔프 동의어: We would like to acknowledge your continued support. -> (b) recognize"
    },
    {
        "id":  "d06-26",
        "day":  "Day 06",
        "no":  "26",
        "word":  "liquid",
        "phonetic":  "[líkwid]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "액체 / 액체의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "fluid"
                       ],
        "exampleEn":  "spill liquid soap all over the floor",
        "exampleKo":  "바닥에 액체 비누를 엎지르다",
        "memo":  ""
    },
    {
        "id":  "d06-27",
        "day":  "Day 06",
        "no":  "27",
        "word":  "comprehensive",
        "phonetic":  "[kὰmprihénsiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "포괄적인, 광범위한",
        "relatedForms":  "comprehend (동) 파악하다, 이해하다",
        "paraphrase":  [
                           "thorough",
                           "extensive",
                           "broad"
                       ],
        "exampleEn":  "carry out a comprehensive study",
        "exampleKo":  "포괄적인 연구를 수행하다",
        "memo":  ""
    },
    {
        "id":  "d06-28",
        "day":  "Day 06",
        "no":  "28",
        "word":  "enclose",
        "phonetic":  "[inklóuz]",
        "partOfSpeech":  "동사",
        "meaning":  "동봉하다 / 둘러싸다, 에워싸다",
        "relatedForms":  "enclosed (형) 동봉된",
        "paraphrase":  [
                           "include",
                           "surround",
                           "cover"
                       ],
        "exampleEn":  "enclose the area with a fence",
        "exampleKo":  "그 구역을 울타리로 둘러싸다",
        "memo":  "Enclosed is a copy of my résumé. (제 이력서 사본을 동봉합니다.)"
    },
    {
        "id":  "d06-29",
        "day":  "Day 06",
        "no":  "29",
        "word":  "adapt",
        "phonetic":  "[ədǽpt]",
        "partOfSpeech":  "동사",
        "meaning":  "개조하다, 바꾸다 / 적응하다 / (연극, 영화 등으로) 각색하다",
        "relatedForms":  "adaptation (명) 개조, 변경; 각색 작품",
        "paraphrase":  [
                           "change",
                           "modify",
                           "adjust",
                           "alter",
                           "convert"
                       ],
        "exampleEn":  "adapt the recipe to use less sugar",
        "exampleKo":  "설탕을 덜 쓰도록 조리법을 수정하다",
        "memo":  "The book has been adapted into a movie. (그 책은 영화로 각색되었다.)"
    },
    {
        "id":  "d06-30",
        "day":  "Day 06",
        "no":  "30",
        "word":  "chemical",
        "phonetic":  "[kémikəl]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "화학물질 / 화학의",
        "relatedForms":  "chemistry (명) 화학, chemist (명) 화학자",
        "paraphrase":  [
                           "substance"
                       ],
        "exampleEn":  "contain toxic chemicals",
        "exampleKo":  "유독성 화학물질을 함유하다",
        "memo":  ""
    },
    {
        "id":  "d06-31",
        "day":  "Day 06",
        "no":  "31",
        "word":  "reduce",
        "phonetic":  "[ridjúːs]",
        "partOfSpeech":  "동사",
        "meaning":  "낮추다, 줄이다",
        "relatedForms":  "reduction (명) 감소, 삭감",
        "paraphrase":  [
                           "cut",
                           "lower",
                           "decrease",
                           "diminish"
                       ],
        "exampleEn":  "reduce the amount of waste",
        "exampleKo":  "폐기물의 양을 줄이다",
        "memo":  ""
    },
    {
        "id":  "d06-32",
        "day":  "Day 06",
        "no":  "32",
        "word":  "affordable",
        "phonetic":  "[əfɔ́ːrdəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "저렴한",
        "relatedForms":  "afford (동) ~을 감당할 여유가 있다",
        "paraphrase":  [
                           "inexpensive",
                           "reasonable",
                           "moderate"
                       ],
        "exampleEn":  "have access to affordable health care",
        "exampleKo":  "저렴한 의료 서비스를 이용할 수 있다",
        "memo":  ""
    },
    {
        "id":  "d06-33",
        "day":  "Day 06",
        "no":  "33",
        "word":  "distinct",
        "phonetic":  "[distíŋkt]",
        "partOfSpeech":  "형용사",
        "meaning":  "뚜렷한, 분명한 / 독특한, 전혀 다른",
        "relatedForms":  "distinction (명) 차이; 특별함",
        "paraphrase":  [

                       ],
        "exampleEn":  "have a distinct sense of humor",
        "exampleKo":  "독특한 유머 감각을 가지고 있다",
        "memo":  ""
    },
    {
        "id":  "d06-34",
        "day":  "Day 06",
        "no":  "34",
        "word":  "entry",
        "phonetic":  "[éntri]",
        "partOfSpeech":  "명사",
        "meaning":  "입장, 진입 / 입력 / 응모작, 출품작",
        "relatedForms":  "enter (동) 입장하다, 들어가다; 입력하다",
        "paraphrase":  [
                           "access",
                           "admission",
                           "record",
                           "registration"
                       ],
        "exampleEn":  "illegal entry into the United States",
        "exampleKo":  "미국으로의 불법 입국",
        "memo":  "entries for the writing competition (글쓰기 대회의 응모작들)"
    },
    {
        "id":  "d06-35",
        "day":  "Day 06",
        "no":  "35",
        "word":  "fix",
        "phonetic":  "[fiks]",
        "partOfSpeech":  "동사",
        "meaning":  "고치다, 해결하다 / 고정시키다",
        "relatedForms":  "fixed (형) 고정된",
        "paraphrase":  [
                           "repair",
                           "mend",
                           "attach",
                           "tie",
                           "secure"
                       ],
        "exampleEn":  "fix the leak in the ceiling",
        "exampleKo":  "천장의 누수를 고치다",
        "memo":  "지텔프 동의어: We can't leave until we fix the flat tire. -> (b) repair"
    },
    {
        "id":  "d06-36",
        "day":  "Day 06",
        "no":  "36",
        "word":  "admire",
        "phonetic":  "[ædmáiər]",
        "partOfSpeech":  "동사",
        "meaning":  "존경하다, 우러러보다",
        "relatedForms":  "admirable (형) 감탄할 만한, 존경스러운",
        "paraphrase":  [
                           "respect",
                           "honor",
                           "appreciate"
                       ],
        "exampleEn":  "admire those who never give up",
        "exampleKo":  "포기하지 않는 사람들을 존경하다",
        "memo":  ""
    },
    {
        "id":  "d06-37",
        "day":  "Day 06",
        "no":  "37",
        "word":  "comprise",
        "phonetic":  "[kəmpráiz]",
        "partOfSpeech":  "동사",
        "meaning":  "구성되다, 이뤄지다 / 차지하다, 구성하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "include",
                           "consist of",
                           "form",
                           "constitute"
                       ],
        "exampleEn":  "Women comprise a majority of childcare workers.",
        "exampleKo":  "여성이 보육시설 종사자의 대다수를 차지한다.",
        "memo":  "숙어: be comprised of (~로 구성되다)"
    },
    {
        "id":  "d06-38",
        "day":  "Day 06",
        "no":  "38",
        "word":  "impressive",
        "phonetic":  "[imprésiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "인상적인",
        "relatedForms":  "impression (명) 인상, 느낌, impress (동) 깊은 인상을 주다, 감동을 주다",
        "paraphrase":  [
                           "prodigious",
                           "dazzling"
                       ],
        "exampleEn":  "show impressive growth",
        "exampleKo":  "인상적인 성장을 보이다",
        "memo":  ""
    },
    {
        "id":  "d06-39",
        "day":  "Day 06",
        "no":  "39",
        "word":  "project",
        "phonetic":  "[prάdʒekt] / [prədʒékt]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "예상하다, 예측하다, 전망하다 / 프로젝트, 사업",
        "relatedForms":  "-",
        "paraphrase":  [
                           "expect",
                           "estimate",
                           "forecast",
                           "predict"
                       ],
        "exampleEn":  "project economic growth of 2%",
        "exampleKo":  "2%의 경제 성장을 전망하다",
        "memo":  ""
    },
    {
        "id":  "d06-40",
        "day":  "Day 06",
        "no":  "40",
        "word":  "adjust",
        "phonetic":  "[ədʒʌ́st]",
        "partOfSpeech":  "동사",
        "meaning":  "조절하다, 조정하다 / 적응하다",
        "relatedForms":  "adjustment (명) 조절; 적응",
        "paraphrase":  [
                           "change",
                           "adapt",
                           "alter",
                           "modify"
                       ],
        "exampleEn":  "adjust the light in the living room",
        "exampleKo":  "거실의 조명을 조절하다",
        "memo":  "adjust to the new schedule (새로운 일정에 적응하다)"
    },
    {
        "id":  "d06-41",
        "day":  "Day 06",
        "no":  "41",
        "word":  "organism",
        "phonetic":  "[ɔ́ːrgənìzəm]",
        "partOfSpeech":  "명사",
        "meaning":  "유기체, 생물, 미생물",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "All living organisms need water to survive.",
        "exampleKo":  "모든 살아있는 유기체는 생존하기 위해 물이 필요하다.",
        "memo":  ""
    },
    {
        "id":  "d06-42",
        "day":  "Day 06",
        "no":  "42",
        "word":  "advantage",
        "phonetic":  "[ædvǽntidʒ]",
        "partOfSpeech":  "명사",
        "meaning":  "이점, 장점, 유리한 점",
        "relatedForms":  "disadvantage (명) 불리한 점",
        "paraphrase":  [
                           "edge",
                           "benefit"
                       ],
        "exampleEn":  "Owning a home has an advantage over renting.",
        "exampleKo":  "집을 소유하는 것은 임대하는 것보다 장점이 있다.",
        "memo":  ""
    },
    {
        "id":  "d06-43",
        "day":  "Day 06",
        "no":  "43",
        "word":  "assist",
        "phonetic":  "[əsíst]",
        "partOfSpeech":  "동사",
        "meaning":  "돕다, 보조하다",
        "relatedForms":  "assistance (명) 도움, 지원",
        "paraphrase":  [
                           "help",
                           "support",
                           "aid"
                       ],
        "exampleEn":  "assist with the cleaning up",
        "exampleKo":  "청소를 돕다",
        "memo":  ""
    },
    {
        "id":  "d06-44",
        "day":  "Day 06",
        "no":  "44",
        "word":  "command",
        "phonetic":  "[kəmǽnd]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "지휘하다, 명령하다 / 지휘, 명령 / (언어에 대한) 지식, 능력",
        "relatedForms":  "-",
        "paraphrase":  [
                           "order",
                           "compel",
                           "direct"
                       ],
        "exampleEn":  "train a dog to respond to human commands",
        "exampleKo":  "사람의 명령에 반응하도록 개를 훈련시키다",
        "memo":  "지텔프 동의어: The captain commanded the troops to halt. -> (a) ordered"
    },
    {
        "id":  "d06-45",
        "day":  "Day 06",
        "no":  "45",
        "word":  "exhausted",
        "phonetic":  "[igzɔ́ːstid]",
        "partOfSpeech":  "형용사",
        "meaning":  "지친, 기진맥진한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "tired",
                           "fatigued"
                       ],
        "exampleEn":  "exhausted after working all day",
        "exampleKo":  "하루 종일 일한 후 녹초가 된",
        "memo":  ""
    },
    {
        "id":  "d06-46",
        "day":  "Day 06",
        "no":  "46",
        "word":  "disrupt",
        "phonetic":  "[disrʌ́pt]",
        "partOfSpeech":  "동사",
        "meaning":  "방해하다, 지장을 주다",
        "relatedForms":  "disruptive (형) 방해하는, 지장을 주는, disruption (명) 방해, 지장",
        "paraphrase":  [
                           "interrupt",
                           "disturb",
                           "hamper",
                           "unsettle"
                       ],
        "exampleEn":  "The flooding disrupted travel on many roads.",
        "exampleKo":  "홍수는 많은 도로의 교통에 지장을 주었다.",
        "memo":  ""
    },
    {
        "id":  "d06-47",
        "day":  "Day 06",
        "no":  "47",
        "word":  "verify",
        "phonetic":  "[vérəfài]",
        "partOfSpeech":  "동사",
        "meaning":  "확인하다, 증명하다",
        "relatedForms":  "verification (명) 확인, 증명",
        "paraphrase":  [
                           "check",
                           "prove",
                           "confirm"
                       ],
        "exampleEn":  "Megan had to be fingerprinted to verify her identity.",
        "exampleKo":  "메건은 신원을 확인하기 위해 지문을 채취해야 했다.",
        "memo":  "지텔프 동의어: A blood test has verified that the patient has the flu. -> (a) confirmed"
    },
    {
        "id":  "d06-48",
        "day":  "Day 06",
        "no":  "48",
        "word":  "appreciate",
        "phonetic":  "[əpríːʃièit]",
        "partOfSpeech":  "동사",
        "meaning":  "고마워하다 / 진가를 알다, 감상할 줄 알다 / (가치가) 오르다",
        "relatedForms":  "appreciation (명) 감사; 이해, 감상, appreciative (형) 고마워하는; 감상하는",
        "paraphrase":  [
                           "be grateful for",
                           "value",
                           "respect",
                           "admire",
                           "increase",
                           "rise"
                       ],
        "exampleEn":  "appreciate working in a creative environment",
        "exampleKo":  "창의적인 환경에서 일하는 것을 감사히 여기다",
        "memo":  "She can appreciate a good book. (그녀는 좋은 책의 가치를 안다.)"
    },
    {
        "id":  "d06-49",
        "day":  "Day 06",
        "no":  "49",
        "word":  "competitive",
        "phonetic":  "[kəmpétətiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "경쟁력 있는 / 경쟁의, 경쟁을 하는",
        "relatedForms":  "competitor (명) 경쟁자",
        "paraphrase":  [

                       ],
        "exampleEn":  "competitive salary",
        "exampleKo":  "경쟁력 있는 급여",
        "memo":  "a highly competitive world (경쟁이 치열한 세계)"
    },
    {
        "id":  "d06-50",
        "day":  "Day 06",
        "no":  "50",
        "word":  "consent",
        "phonetic":  "[kənsént]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "동의, 합의 / 동의하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "agreement",
                           "assent",
                           "approval",
                           "agree",
                           "concur"
                       ],
        "exampleEn":  "require proof of parental consent",
        "exampleKo":  "부모 동의의 증명을 필요로 하다",
        "memo":  ""
    },
  {
        "id":  "d07-01",
        "day":  "Day 07",
        "no":  "01",
        "word":  "logical",
        "phonetic":  "[lάdʒikəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "논리적인",
        "relatedForms":  "logic (명) 논리",
        "paraphrase":  [

                       ],
        "exampleEn":  "a logical way of thinking",
        "exampleKo":  "논리적인 사고 방식",
        "memo":  ""
    },
    {
        "id":  "d07-02",
        "day":  "Day 07",
        "no":  "02",
        "word":  "transfer",
        "phonetic":  "[trænsfə́ːr]",
        "partOfSpeech":  "동사",
        "meaning":  "옮기다, 이전하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "move"
                       ],
        "exampleEn":  "transfer to a new school",
        "exampleKo":  "새 학교로 전학하다",
        "memo":  "transfer money from one account to another (한 계좌에서 다른 계좌로 돈을 이체하다)"
    },
    {
        "id":  "d07-03",
        "day":  "Day 07",
        "no":  "03",
        "word":  "collapse",
        "phonetic":  "[kəlǽps]",
        "partOfSpeech":  "동사",
        "meaning":  "무너지다, 쓰러지다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "fall down"
                       ],
        "exampleEn":  "The building collapsed due to the earthquake.",
        "exampleKo":  "그 건물은 지진으로 무너졌다.",
        "memo":  ""
    },
    {
        "id":  "d07-04",
        "day":  "Day 07",
        "no":  "04",
        "word":  "exclusive",
        "phonetic":  "[iksklúːsiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "독점적인, 전용의",
        "relatedForms":  "exclusively (부) 독점적으로, 전적으로",
        "paraphrase":  [
                           "sole",
                           "private"
                       ],
        "exampleEn":  "an exclusive interview with a famous actor",
        "exampleKo":  "유명 배우와의 단독 인터뷰",
        "memo":  "지텔프 동의어: The members of the club have exclusive use of the clubhouse on weekends. -> (a) private"
    },
    {
        "id":  "d07-05",
        "day":  "Day 07",
        "no":  "05",
        "word":  "react",
        "phonetic":  "[riǽkt]",
        "partOfSpeech":  "동사",
        "meaning":  "반응하다, 대응하다",
        "relatedForms":  "reaction (명) 반응, 대응",
        "paraphrase":  [
                           "respond"
                       ],
        "exampleEn":  "react positively to feedback",
        "exampleKo":  "피드백에 긍정적으로 반응하다",
        "memo":  ""
    },
    {
        "id":  "d07-06",
        "day":  "Day 07",
        "no":  "06",
        "word":  "constant",
        "phonetic":  "[kάnstənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "지속적인, 끊임없는",
        "relatedForms":  "constantly (부) 끊임없이, 계속",
        "paraphrase":  [
                           "continuous",
                           "sustained"
                       ],
        "exampleEn":  "A plant needs constant care to grow properly.",
        "exampleKo":  "식물이 제대로 자라기 위해서는 지속적인 관리가 필요하다.",
        "memo":  ""
    },
    {
        "id":  "d07-07",
        "day":  "Day 07",
        "no":  "07",
        "word":  "reward",
        "phonetic":  "[riwɔ́ːrd]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "보상, 사례 / 보상하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "prize",
                           "benefit",
                           "return"
                       ],
        "exampleEn":  "get a financial reward",
        "exampleKo":  "금전적인 보상을 받다",
        "memo":  ""
    },
    {
        "id":  "d07-08",
        "day":  "Day 07",
        "no":  "08",
        "word":  "aggressive",
        "phonetic":  "[əgrésiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "공격적인",
        "relatedForms":  "aggression (명) 공격성",
        "paraphrase":  [
                           "offensive"
                       ],
        "exampleEn":  "Aggressive children are more likely to be involved in fights.",
        "exampleKo":  "공격적인 아이들은 싸움에 휘말릴 가능성이 더 높다.",
        "memo":  ""
    },
    {
        "id":  "d07-09",
        "day":  "Day 07",
        "no":  "09",
        "word":  "actually",
        "phonetic":  "[ǽktʃuəli]",
        "partOfSpeech":  "부사",
        "meaning":  "실제로",
        "relatedForms":  "actual (형) 실제의",
        "paraphrase":  [
                           "really",
                           "indeed"
                       ],
        "exampleEn":  "actually see the Eiffel Tower",
        "exampleKo":  "에펠탑을 실제로 보다",
        "memo":  ""
    },
    {
        "id":  "d07-10",
        "day":  "Day 07",
        "no":  "10",
        "word":  "honor",
        "phonetic":  "[άnər]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "영광, 명예 / 공적으로 보상하다 / 명예를 베풀다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "recognition",
                           "prestige",
                           "recognize",
                           "commend",
                           "acknowledge"
                       ],
        "exampleEn":  "The team received honor for their victory.",
        "exampleKo":  "그 팀은 우승으로 영예를 얻었다.",
        "memo":  "He was honored as a knight. (그는 기사 작위를 받았다.)"
    },
    {
        "id":  "d07-11",
        "day":  "Day 07",
        "no":  "11",
        "word":  "expensive",
        "phonetic":  "[ikspénsiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "비싼",
        "relatedForms":  "expense (명) 비용, 경비",
        "paraphrase":  [
                           "costly"
                       ],
        "exampleEn":  "too expensive to buy",
        "exampleKo":  "너무 비싸서 살 수 없는",
        "memo":  ""
    },
    {
        "id":  "d07-12",
        "day":  "Day 07",
        "no":  "12",
        "word":  "consist",
        "phonetic":  "[kənsíst]",
        "partOfSpeech":  "동사",
        "meaning":  "구성되다",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "a building that consists of two floors",
        "exampleKo":  "2층으로 된 건물",
        "memo":  "The jury consists of six people. (배심원은 6명으로 구성되어 있다.)"
    },
    {
        "id":  "d07-13",
        "day":  "Day 07",
        "no":  "13",
        "word":  "philosophy",
        "phonetic":  "[filάsəfi]",
        "partOfSpeech":  "명사",
        "meaning":  "철학",
        "relatedForms":  "philosopher (명) 철학자",
        "paraphrase":  [

                       ],
        "exampleEn":  "The philosophy of Aristotle is still studied by many scholars today.",
        "exampleKo":  "아리스토텔레스의 철학은 오늘날에도 많은 학자들에 의해 연구되고 있다.",
        "memo":  ""
    },
    {
        "id":  "d07-14",
        "day":  "Day 07",
        "no":  "14",
        "word":  "manage",
        "phonetic":  "[mǽnidʒ]",
        "partOfSpeech":  "동사",
        "meaning":  "(회사·조직 등) 운영하다 / (어려운 일) 해내다 / 관리하다, 통제하다",
        "relatedForms":  "manager (명) 관리자, managerial (형) 관리자의",
        "paraphrase":  [
                           "run",
                           "operate",
                           "control"
                       ],
        "exampleEn":  "manage to persuade the shareholders to approve the merger",
        "exampleKo":  "간신히 주주들을 설득하여 합병을 승인받다",
        "memo":  "지텔프 동의어: The company is managed by a board of directors. -> (a) run | manage time effectively (시간을 효율적으로 관리하다)"
    },
    {
        "id":  "d07-15",
        "day":  "Day 07",
        "no":  "15",
        "word":  "resolve",
        "phonetic":  "[rizάlv]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "해결하다 / 결심하다, 결의하다 / 결심, 결의",
        "relatedForms":  "resolution (명) 해결; 결심, determination (명)",
        "paraphrase":  [
                           "solve",
                           "address",
                           "decide",
                           "determine"
                       ],
        "exampleEn":  "resolve a dispute",
        "exampleKo":  "분쟁을 해결하다",
        "memo":  "resolve to quit smoking (담배를 끊기로 결심하다)"
    },
    {
        "id":  "d07-16",
        "day":  "Day 07",
        "no":  "16",
        "word":  "precise",
        "phonetic":  "[prisáis]",
        "partOfSpeech":  "형용사",
        "meaning":  "정확한",
        "relatedForms":  "precisely (부) 정확하게",
        "paraphrase":  [
                           "exact",
                           "accurate"
                       ],
        "exampleEn":  "get precise measurements",
        "exampleKo":  "정확한 치수를 재다",
        "memo":  ""
    },
    {
        "id":  "d07-17",
        "day":  "Day 07",
        "no":  "17",
        "word":  "nervous",
        "phonetic":  "[nə́ːrvəs]",
        "partOfSpeech":  "형용사",
        "meaning":  "긴장한, 불안한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "anxious"
                       ],
        "exampleEn":  "Kayla felt nervous about going on stage.",
        "exampleKo":  "카일라는 무대에 오르는 것이 긴장되었다.",
        "memo":  ""
    },
    {
        "id":  "d07-18",
        "day":  "Day 07",
        "no":  "18",
        "word":  "official",
        "phonetic":  "[əfíʃəl]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "관리, 공무원 / 공적인, 공인된 / 공식적인",
        "relatedForms":  "officially (부) 공식적으로",
        "paraphrase":  [
                           "authorized",
                           "formal"
                       ],
        "exampleEn":  "local officials",
        "exampleKo":  "지방 공무원",
        "memo":  "official documents (공문서), the official website (공식 웹사이트)"
    },
    {
        "id":  "d07-19",
        "day":  "Day 07",
        "no":  "19",
        "word":  "rapidly",
        "phonetic":  "[rǽpidli]",
        "partOfSpeech":  "부사",
        "meaning":  "빠르게, 급속히",
        "relatedForms":  "rapid (형) 빠른, 급속한",
        "paraphrase":  [
                           "quickly",
                           "fast"
                       ],
        "exampleEn":  "rapidly changing IT technology",
        "exampleKo":  "빠르게 변화하고 있는 IT 기술",
        "memo":  ""
    },
    {
        "id":  "d07-20",
        "day":  "Day 07",
        "no":  "20",
        "word":  "presentation",
        "phonetic":  "[prìːzentéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "발표",
        "relatedForms":  "present (동) 발표하다; 제시하다",
        "paraphrase":  [
                           "speech"
                       ],
        "exampleEn":  "a new product presentation",
        "exampleKo":  "신제품 발표회",
        "memo":  ""
    },
    {
        "id":  "d07-21",
        "day":  "Day 07",
        "no":  "21",
        "word":  "extend",
        "phonetic":  "[iksténd]",
        "partOfSpeech":  "동사",
        "meaning":  "확장하다, 확대하다 / (기간 등) 연장하다",
        "relatedForms":  "extensive (형) 광범위한",
        "paraphrase":  [
                           "widen",
                           "expand",
                           "prolong"
                       ],
        "exampleEn":  "The road was extended by two miles.",
        "exampleKo":  "도로가 2마일 연장되었다.",
        "memo":  "지텔프 동의어: The deadline for the project has been extended by two weeks. -> (b) prolonged"
    },
    {
        "id":  "d07-22",
        "day":  "Day 07",
        "no":  "22",
        "word":  "construct",
        "phonetic":  "[kənstrʌ́kt]",
        "partOfSpeech":  "동사",
        "meaning":  "건설하다",
        "relatedForms":  "construction (명) 건설; 건축물",
        "paraphrase":  [
                           "build"
                       ],
        "exampleEn":  "construct a new building",
        "exampleKo":  "새로운 건물을 짓다",
        "memo":  ""
    },
    {
        "id":  "d07-23",
        "day":  "Day 07",
        "no":  "23",
        "word":  "consult",
        "phonetic":  "[kənsʌ́lt]",
        "partOfSpeech":  "동사",
        "meaning":  "상담하다, 상의하다",
        "relatedForms":  "consultation (명) 상담, 상의",
        "paraphrase":  [
                           "confer"
                       ],
        "exampleEn":  "consult an expert about the investment strategy",
        "exampleKo":  "투자 전략에 대해 전문가와 상담하다",
        "memo":  ""
    },
    {
        "id":  "d07-24",
        "day":  "Day 07",
        "no":  "24",
        "word":  "opportunity",
        "phonetic":  "[ὰpərtjúːnəti]",
        "partOfSpeech":  "명사",
        "meaning":  "기회",
        "relatedForms":  "-",
        "paraphrase":  [
                           "chance"
                       ],
        "exampleEn":  "a great opportunity for learning new things",
        "exampleKo":  "새로운 것을 배울 수 있는 좋은 기회",
        "memo":  ""
    },
    {
        "id":  "d07-25",
        "day":  "Day 07",
        "no":  "25",
        "word":  "accompany",
        "phonetic":  "[əkʌ́mpəni]",
        "partOfSpeech":  "동사",
        "meaning":  "동행하다 / 동반하다, 수반하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "guide",
                           "escort",
                           "usher"
                       ],
        "exampleEn":  "Nicole will accompany her friends on their trip to Europe.",
        "exampleKo":  "니콜은 유럽 여행에 친구들과 동행할 것이다.",
        "memo":  "The disease may be accompanied by a fever. (그 병은 열을 동반할 수 있다.)"
    },
    {
        "id":  "d07-26",
        "day":  "Day 07",
        "no":  "26",
        "word":  "quote",
        "phonetic":  "[kwout]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "인용하다 / 인용구",
        "relatedForms":  "-",
        "paraphrase":  [
                           "cite",
                           "extract",
                           "quotation"
                       ],
        "exampleEn":  "The passage was quoted from the book.",
        "exampleKo":  "그 구절은 책에서 인용한 것이다.",
        "memo":  ""
    },
    {
        "id":  "d07-27",
        "day":  "Day 07",
        "no":  "27",
        "word":  "phenomenon",
        "phonetic":  "[finάmənὰn]",
        "partOfSpeech":  "명사",
        "meaning":  "현상, 사건",
        "relatedForms":  "-",
        "paraphrase":  [
                           "occurrence",
                           "event"
                       ],
        "exampleEn":  "the phenomenon of global warming",
        "exampleKo":  "지구 온난화 현상",
        "memo":  ""
    },
    {
        "id":  "d07-28",
        "day":  "Day 07",
        "no":  "28",
        "word":  "renew",
        "phonetic":  "[rinjúː]",
        "partOfSpeech":  "동사",
        "meaning":  "갱신하다, 연장하다",
        "relatedForms":  "renewal (명) 갱신, 연장",
        "paraphrase":  [

                       ],
        "exampleEn":  "renew a contract",
        "exampleKo":  "계약을 갱신하다",
        "memo":  ""
    },
    {
        "id":  "d07-29",
        "day":  "Day 07",
        "no":  "29",
        "word":  "specialized",
        "phonetic":  "[spéʃəlàizd]",
        "partOfSpeech":  "형용사",
        "meaning":  "전문화된, 전문적인",
        "relatedForms":  "specialize (동) ~을 전문으로 하다",
        "paraphrase":  [

                       ],
        "exampleEn":  "specialized equipment",
        "exampleKo":  "전문 장비",
        "memo":  ""
    },
    {
        "id":  "d07-30",
        "day":  "Day 07",
        "no":  "30",
        "word":  "drive",
        "phonetic":  "[draiv]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "운전하다 / 운전 / 운동, 캠페인",
        "relatedForms":  "-",
        "paraphrase":  [
                           "operate",
                           "campaign"
                       ],
        "exampleEn":  "participate in the blood drive",
        "exampleKo":  "헌혈 캠페인에 참여하다",
        "memo":  ""
    },
    {
        "id":  "d07-31",
        "day":  "Day 07",
        "no":  "31",
        "word":  "dependable",
        "phonetic":  "[dipéndəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "믿을 만한, 신뢰할 수 있는",
        "relatedForms":  "depend (동) 의존하다, 의지하다; 믿다",
        "paraphrase":  [
                           "reliable",
                           "trustworthy",
                           "faithful"
                       ],
        "exampleEn":  "a dependable friend",
        "exampleKo":  "신뢰할 수 있는 친구",
        "memo":  "지텔프 동의어: Michelle is looking for a dependable babysitter to watch her kids. -> (a) reliable"
    },
    {
        "id":  "d07-32",
        "day":  "Day 07",
        "no":  "32",
        "word":  "depression",
        "phonetic":  "[dipréʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "우울함, 우울증 / 경기 침체",
        "relatedForms":  "-",
        "paraphrase":  [
                           "despair",
                           "gloom",
                           "melancholy",
                           "recession",
                           "slump"
                       ],
        "exampleEn":  "treat depression",
        "exampleKo":  "우울증을 치료하다",
        "memo":  "the Great Depression (경제 대공황)"
    },
    {
        "id":  "d07-33",
        "day":  "Day 07",
        "no":  "33",
        "word":  "radical",
        "phonetic":  "[rǽdikəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "급진적인, 급진파의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "extreme"
                       ],
        "exampleEn":  "radical politics",
        "exampleKo":  "급진적인 정치",
        "memo":  ""
    },
    {
        "id":  "d07-34",
        "day":  "Day 07",
        "no":  "34",
        "word":  "digest",
        "phonetic":  "[dáidʒest]",
        "partOfSpeech":  "동사",
        "meaning":  "소화하다, 소화시키다",
        "relatedForms":  "digestion (명) 소화",
        "paraphrase":  [
                           "absorb"
                       ],
        "exampleEn":  "digest food well",
        "exampleKo":  "음식을 잘 소화시키다",
        "memo":  "easily digest complex information (복잡한 정보를 쉽게 소화하다[이해하다])"
    },
    {
        "id":  "d07-35",
        "day":  "Day 07",
        "no":  "35",
        "word":  "soar",
        "phonetic":  "[sɔːr]",
        "partOfSpeech":  "동사",
        "meaning":  "치솟다, 급상승하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "increase",
                           "rise",
                           "grow",
                           "escalate"
                       ],
        "exampleEn":  "soaring prices",
        "exampleKo":  "치솟는 물가",
        "memo":  "지텔프 동의어: The athlete's popularity soared after he won the gold medal. -> (b) increased"
    },
    {
        "id":  "d07-36",
        "day":  "Day 07",
        "no":  "36",
        "word":  "creature",
        "phonetic":  "[kríːtʃər]",
        "partOfSpeech":  "명사",
        "meaning":  "생물, 생명체",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "a sea creature",
        "exampleKo":  "바다 생물",
        "memo":  ""
    },
    {
        "id":  "d07-37",
        "day":  "Day 07",
        "no":  "37",
        "word":  "disabled",
        "phonetic":  "[diséibld]",
        "partOfSpeech":  "형용사",
        "meaning":  "장애가 있는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "paralyzed"
                       ],
        "exampleEn":  "physically disabled",
        "exampleKo":  "신체 장애가 있는",
        "memo":  ""
    },
    {
        "id":  "d07-38",
        "day":  "Day 07",
        "no":  "38",
        "word":  "request",
        "phonetic":  "[rikwést]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "요청, 요구 / 요청하다, 요구하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "demand",
                           "appeal",
                           "demand",
                           "beg",
                           "ask for"
                       ],
        "exampleEn":  "make a request",
        "exampleKo":  "요청하다",
        "memo":  "request help from a staff member (직원에게 도움을 청하다)"
    },
    {
        "id":  "d07-39",
        "day":  "Day 07",
        "no":  "39",
        "word":  "obligation",
        "phonetic":  "[ὰbləgéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "의무, 책임",
        "relatedForms":  "-",
        "paraphrase":  [
                           "duty",
                           "responsibility",
                           "liability"
                       ],
        "exampleEn":  "have an obligation to finish this project",
        "exampleKo":  "이 프로젝트를 끝내야 할 의무가 있다",
        "memo":  ""
    },
    {
        "id":  "d07-40",
        "day":  "Day 07",
        "no":  "40",
        "word":  "create",
        "phonetic":  "[kriéit]",
        "partOfSpeech":  "동사",
        "meaning":  "만들어 내다",
        "relatedForms":  "creative (형) 창의적인",
        "paraphrase":  [
                           "make",
                           "produce",
                           "generate",
                           "develop"
                       ],
        "exampleEn":  "create more jobs",
        "exampleKo":  "일자리를 창출하다",
        "memo":  "create a mobile game (모바일 게임을 만들어 내다)"
    },
    {
        "id":  "d07-41",
        "day":  "Day 07",
        "no":  "41",
        "word":  "deliberately",
        "phonetic":  "[dilíbəritli]",
        "partOfSpeech":  "부사",
        "meaning":  "의도적으로, 고의로",
        "relatedForms":  "deliberate (형) 고의적인, (동) 심사숙고하다",
        "paraphrase":  [
                           "intentionally",
                           "on purpose"
                       ],
        "exampleEn":  "deliberately avoid eye contact",
        "exampleKo":  "의도적으로 눈을 피하다",
        "memo":  ""
    },
    {
        "id":  "d07-42",
        "day":  "Day 07",
        "no":  "42",
        "word":  "monitor",
        "phonetic":  "[mάnətər]",
        "partOfSpeech":  "동사",
        "meaning":  "감시하다, 주시하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "observe",
                           "watch",
                           "check"
                       ],
        "exampleEn":  "carefully monitor the growth of a plant",
        "exampleKo":  "식물의 성장을 주의 깊게 관찰하다",
        "memo":  "지텔프 동의어: The nurse constantly monitored the patient's heart rate. -> (b) observed"
    },
    {
        "id":  "d07-43",
        "day":  "Day 07",
        "no":  "43",
        "word":  "convince",
        "phonetic":  "[kənvíns]",
        "partOfSpeech":  "동사",
        "meaning":  "확신시키다, 납득시키다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "persuade",
                           "assure"
                       ],
        "exampleEn":  "The jury was not convinced by the defendant's story.",
        "exampleKo":  "배심원들은 피고의 이야기를 납득하지 못했다.",
        "memo":  ""
    },
    {
        "id":  "d07-44",
        "day":  "Day 07",
        "no":  "44",
        "word":  "enhance",
        "phonetic":  "[inhǽns]",
        "partOfSpeech":  "동사",
        "meaning":  "(품질·가치 등) 향상시키다",
        "relatedForms":  "enhancement (명) 향상",
        "paraphrase":  [
                           "improve"
                       ],
        "exampleEn":  "Technology has enhanced our ability to communicate.",
        "exampleKo":  "기술은 우리의 의사소통 능력을 향상시켰다.",
        "memo":  ""
    },
    {
        "id":  "d07-45",
        "day":  "Day 07",
        "no":  "45",
        "word":  "mass",
        "phonetic":  "[mæs]",
        "partOfSpeech":  "형용사/명사",
        "meaning":  "대규모의, 대중적인 / 덩어리 / 대량 / 무리, 대중",
        "relatedForms":  "-",
        "paraphrase":  [
                           "crowd"
                       ],
        "exampleEn":  "a mass movement",
        "exampleKo":  "대중 운동",
        "memo":  "body mass index (체질량 지수), mass production (대량생산)"
    },
    {
        "id":  "d07-46",
        "day":  "Day 07",
        "no":  "46",
        "word":  "means",
        "phonetic":  "[miːnz]",
        "partOfSpeech":  "명사",
        "meaning":  "수단, 방법",
        "relatedForms":  "-",
        "paraphrase":  [
                           "method",
                           "way"
                       ],
        "exampleEn":  "means of transportation",
        "exampleKo":  "교통[운송] 수단",
        "memo":  "means of communication (의사소통 수단)"
    },
    {
        "id":  "d07-47",
        "day":  "Day 07",
        "no":  "47",
        "word":  "cooperation",
        "phonetic":  "[kouὰpəréiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "협력",
        "relatedForms":  "cooperate (동) 협력하다",
        "paraphrase":  [
                           "collaboration",
                           "teamwork"
                       ],
        "exampleEn":  "military cooperation with allies",
        "exampleKo":  "동맹국과의 군사 협력",
        "memo":  ""
    },
    {
        "id":  "d07-48",
        "day":  "Day 07",
        "no":  "48",
        "word":  "trade",
        "phonetic":  "[treid]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "거래, 무역 / 거래하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "business",
                           "commerce",
                           "transaction"
                       ],
        "exampleEn":  "a world trade fair",
        "exampleKo":  "세계 무역 박람회",
        "memo":  "trade with other countries (다른 나라와 무역하다)"
    },
    {
        "id":  "d07-49",
        "day":  "Day 07",
        "no":  "49",
        "word":  "grant",
        "phonetic":  "[grænt]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "주다, 수여하다 / 보조금, 지원금",
        "relatedForms":  "-",
        "paraphrase":  [
                           "provide",
                           "give",
                           "allocate",
                           "subsidy"
                       ],
        "exampleEn":  "get a grant for the research",
        "exampleKo":  "연구비를 지원받다",
        "memo":  "지텔프 동의어: The school will grant you a scholarship if you have good grades. -> (a) give"
    },
    {
        "id":  "d07-50",
        "day":  "Day 07",
        "no":  "50",
        "word":  "arrive",
        "phonetic":  "[əráiv]",
        "partOfSpeech":  "동사",
        "meaning":  "도착하다",
        "relatedForms":  "arrival (명) 도착",
        "paraphrase":  [

                       ],
        "exampleEn":  "arrive late at school",
        "exampleKo":  "학교에 늦게 도착하다",
        "memo":  ""
    },
  {
        "id":  "d08-01",
        "day":  "Day 08",
        "no":  "01",
        "word":  "exclude",
        "phonetic":  "[iksklúːd]",
        "partOfSpeech":  "동사",
        "meaning":  "제외하다, 배제하다",
        "relatedForms":  "exclusion (명) 제외, 배제",
        "paraphrase":  [
                           "eliminate",
                           "remove",
                           "omit",
                           "get rid of",
                           "rule out"
                       ],
        "exampleEn":  "exclude red meat from his diet",
        "exampleKo":  "그의 식단에서 붉은 고기를 제외하다",
        "memo":  ""
    },
    {
        "id":  "d08-02",
        "day":  "Day 08",
        "no":  "02",
        "word":  "solve",
        "phonetic":  "[sɑlv]",
        "partOfSpeech":  "동사",
        "meaning":  "해결하다",
        "relatedForms":  "solution (명) 해법, 해결책; 용액, 혼합물",
        "paraphrase":  [
                           "resolve",
                           "settle",
                           "cure"
                       ],
        "exampleEn":  "solve a problem",
        "exampleKo":  "문제를 해결하다",
        "memo":  "지텔프 동의어: The detective is working to solve the mystery of the missing jewels. -> (a) settle"
    },
    {
        "id":  "d08-03",
        "day":  "Day 08",
        "no":  "03",
        "word":  "intelligence",
        "phonetic":  "[intélədʒəns]",
        "partOfSpeech":  "명사",
        "meaning":  "지능, 지성",
        "relatedForms":  "intelligent (형) 지적인, 똑똑한",
        "paraphrase":  [
                           "brightness"
                       ],
        "exampleEn":  "try to measure the intelligence of a mouse",
        "exampleKo":  "쥐의 지능을 측정하기 위해 노력하다",
        "memo":  ""
    },
    {
        "id":  "d08-04",
        "day":  "Day 08",
        "no":  "04",
        "word":  "dismiss",
        "phonetic":  "[dismís]",
        "partOfSpeech":  "동사",
        "meaning":  "무시하다, 일축하다 / 해산시키다 / 해고하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "disregard",
                           "reject",
                           "free",
                           "disperse",
                           "fire"
                       ],
        "exampleEn":  "dismiss the possibility of an economic crisis",
        "exampleKo":  "경제 위기의 가능성을 일축하다",
        "memo":  ""
    },
    {
        "id":  "d08-05",
        "day":  "Day 08",
        "no":  "05",
        "word":  "surge",
        "phonetic":  "[səːrdʒ]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "급등하다, 밀려들다 / 급등, 고조",
        "relatedForms":  "-",
        "paraphrase":  [
                           "increase",
                           "jump",
                           "rush",
                           "rise",
                           "boost",
                           "growth"
                       ],
        "exampleEn":  "a great surge in the use of social media",
        "exampleKo":  "소셜 미디어 사용의 급증",
        "memo":  ""
    },
    {
        "id":  "d08-06",
        "day":  "Day 08",
        "no":  "06",
        "word":  "discipline",
        "phonetic":  "[dísəplin]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "규율, 기강 / 절제, 자제력 / 징계하다, 훈육하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "authority",
                           "rule"
                       ],
        "exampleEn":  "ways to improve school discipline",
        "exampleKo":  "학교 규율을 개선하는 방법",
        "memo":  ""
    },
    {
        "id":  "d08-07",
        "day":  "Day 08",
        "no":  "07",
        "word":  "distinguish",
        "phonetic":  "[distíŋgwiʃ]",
        "partOfSpeech":  "동사",
        "meaning":  "구별하다, 분간하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "differentiate",
                           "discern",
                           "separate",
                           "identify"
                       ],
        "exampleEn":  "distinguish between the twins",
        "exampleKo":  "쌍둥이를 구별하다",
        "memo":  ""
    },
    {
        "id":  "d08-08",
        "day":  "Day 08",
        "no":  "08",
        "word":  "profitable",
        "phonetic":  "[prάfitəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "수익성이 있는, 이득이 되는",
        "relatedForms":  "profit (명) 수익, 이윤",
        "paraphrase":  [
                           "lucrative",
                           "rewarding"
                       ],
        "exampleEn":  "a highly profitable investment",
        "exampleKo":  "수익성이 높은 투자",
        "memo":  ""
    },
    {
        "id":  "d08-09",
        "day":  "Day 08",
        "no":  "09",
        "word":  "enthusiasm",
        "phonetic":  "[inθúːziæ̀zəm]",
        "partOfSpeech":  "명사",
        "meaning":  "열정, 열광, 열의",
        "relatedForms":  "enthusiastic (형) 열정적인, 열렬한 (= avid), enthusiast (명) 열렬한 팬, 열광적인 애호가",
        "paraphrase":  [
                           "passion",
                           "devotion"
                       ],
        "exampleEn":  "disappointed with the speaker's lack of enthusiasm",
        "exampleKo":  "연설자의 열의 부족에 실망한",
        "memo":  ""
    },
    {
        "id":  "d08-10",
        "day":  "Day 08",
        "no":  "10",
        "word":  "depending on",
        "phonetic":  "[dipéndiŋ]",
        "partOfSpeech":  "전치사",
        "meaning":  "~에 따라",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "The amount of rainfall changes depending on the region.",
        "exampleKo":  "강우량은 지역에 따라 달라진다.",
        "memo":  ""
    },
    {
        "id":  "d08-11",
        "day":  "Day 08",
        "no":  "11",
        "word":  "register",
        "phonetic":  "[rédʒistər]",
        "partOfSpeech":  "동사",
        "meaning":  "등록하다",
        "relatedForms":  "registration (명) 등록",
        "paraphrase":  [
                           "sign up",
                           "enroll"
                       ],
        "exampleEn":  "register for a cooking class",
        "exampleKo":  "요리 강좌에 등록하다",
        "memo":  ""
    },
    {
        "id":  "d08-12",
        "day":  "Day 08",
        "no":  "12",
        "word":  "refund",
        "phonetic":  "[riːfʌnd]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "환불 / 환불하다",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "return an item for a refund",
        "exampleKo":  "환불을 위해 상품을 반품하다",
        "memo":  ""
    },
    {
        "id":  "d08-13",
        "day":  "Day 08",
        "no":  "13",
        "word":  "ethnic",
        "phonetic":  "[éθnik]",
        "partOfSpeech":  "형용사",
        "meaning":  "인종의, 민족의",
        "relatedForms":  "ethnically (부) 인종적으로, 민족적으로",
        "paraphrase":  [

                       ],
        "exampleEn":  "people from a variety of ethnic backgrounds",
        "exampleKo":  "다양한 민족적 배경을 가진 사람들",
        "memo":  ""
    },
    {
        "id":  "d08-14",
        "day":  "Day 08",
        "no":  "14",
        "word":  "obtain",
        "phonetic":  "[əbtéin]",
        "partOfSpeech":  "동사",
        "meaning":  "얻다, 획득하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "get",
                           "gain",
                           "secure",
                           "land",
                           "acquire"
                       ],
        "exampleEn":  "obtain a map of the area",
        "exampleKo":  "그 지역의 지도를 입수하다",
        "memo":  "지텔프 동의어: Benjamin obtained a degree in history last year. -> (b) gained"
    },
    {
        "id":  "d08-15",
        "day":  "Day 08",
        "no":  "15",
        "word":  "expenditure",
        "phonetic":  "[ikspénditʃər]",
        "partOfSpeech":  "명사",
        "meaning":  "지출",
        "relatedForms":  "-",
        "paraphrase":  [
                           "payment",
                           "expense",
                           "spending"
                       ],
        "exampleEn":  "a large expenditure on defense",
        "exampleKo":  "국방에 대한 거액의 지출",
        "memo":  ""
    },
    {
        "id":  "d08-16",
        "day":  "Day 08",
        "no":  "16",
        "word":  "disturb",
        "phonetic":  "[distə́ːrb]",
        "partOfSpeech":  "동사",
        "meaning":  "방해하다, 불안하게 하다",
        "relatedForms":  "disturbance (명) 소동, 방해",
        "paraphrase":  [
                           "disrupt",
                           "upset",
                           "worry"
                       ],
        "exampleEn":  "Drinking coffee may disturb sleep patterns.",
        "exampleKo":  "커피를 마시는 것은 수면 패턴을 방해할 수 있다.",
        "memo":  ""
    },
    {
        "id":  "d08-17",
        "day":  "Day 08",
        "no":  "17",
        "word":  "enormous",
        "phonetic":  "[inɔ́ːrməs]",
        "partOfSpeech":  "형용사",
        "meaning":  "거대한, 엄청난",
        "relatedForms":  "enormously (부) 엄청나게",
        "paraphrase":  [
                           "huge",
                           "immense",
                           "massive",
                           "great",
                           "gigantic"
                       ],
        "exampleEn":  "an enormous amount of debt",
        "exampleKo":  "엄청난 액수의 부채",
        "memo":  ""
    },
    {
        "id":  "d08-18",
        "day":  "Day 08",
        "no":  "18",
        "word":  "promote",
        "phonetic":  "[prəmóut]",
        "partOfSpeech":  "동사",
        "meaning":  "승진시키다 / 홍보하다 / 고취하다, 증진시키다",
        "relatedForms":  "promotion (명) 승진; 홍보; 장려",
        "paraphrase":  [
                           "advertise",
                           "boost",
                           "foster",
                           "encourage"
                       ],
        "exampleEn":  "promote his new album by going on tour",
        "exampleKo":  "순회공연을 하여 그의 새 앨범을 홍보하다",
        "memo":  "promote health (건강을 증진시키다)"
    },
    {
        "id":  "d08-19",
        "day":  "Day 08",
        "no":  "19",
        "word":  "invest",
        "phonetic":  "[invést]",
        "partOfSpeech":  "동사",
        "meaning":  "투자하다",
        "relatedForms":  "investment (명) 투자, investor (명) 투자자",
        "paraphrase":  [
                           "spend",
                           "devote"
                       ],
        "exampleEn":  "invest $10,000 in stocks",
        "exampleKo":  "주식에 1만 달러를 투자하다",
        "memo":  ""
    },
    {
        "id":  "d08-20",
        "day":  "Day 08",
        "no":  "20",
        "word":  "lively",
        "phonetic":  "[láivli]",
        "partOfSpeech":  "형용사",
        "meaning":  "활발한, 열띤",
        "relatedForms":  "-",
        "paraphrase":  [
                           "enthusiastic"
                       ],
        "exampleEn":  "a lively debate about politics",
        "exampleKo":  "정치에 관한 활발한 토론",
        "memo":  ""
    },
    {
        "id":  "d08-21",
        "day":  "Day 08",
        "no":  "21",
        "word":  "occupy",
        "phonetic":  "[άkjəpài]",
        "partOfSpeech":  "동사",
        "meaning":  "(장소) 차지하다 / 점령하다",
        "relatedForms":  "occupancy (명) 거주, 점유, occupant (명) 거주자, 입주자",
        "paraphrase":  [
                           "take"
                       ],
        "exampleEn":  "The bed occupies half of the room.",
        "exampleKo":  "그 침대가 방의 절반을 차지한다.",
        "memo":  "be occupied by the Spanish (스페인에 점령당하다)"
    },
    {
        "id":  "d08-22",
        "day":  "Day 08",
        "no":  "22",
        "word":  "dominate",
        "phonetic":  "[dάmənèit]",
        "partOfSpeech":  "동사",
        "meaning":  "지배하다, 장악하다",
        "relatedForms":  "dominant (형) 우세한, 지배적인",
        "paraphrase":  [
                           "control",
                           "lead"
                       ],
        "exampleEn":  "dominate the computer industry",
        "exampleKo":  "컴퓨터 산업을 장악하다",
        "memo":  ""
    },
    {
        "id":  "d08-23",
        "day":  "Day 08",
        "no":  "23",
        "word":  "interpret",
        "phonetic":  "[intə́ːrprit]",
        "partOfSpeech":  "동사",
        "meaning":  "해석하다, 이해하다 / 통역하다",
        "relatedForms":  "interpretation (명) 해석, 이해; 통역",
        "paraphrase":  [
                           "understand",
                           "comprehend",
                           "translate"
                       ],
        "exampleEn":  "interpret the behavior of the dog",
        "exampleKo":  "개의 행동을 해석하다",
        "memo":  ""
    },
    {
        "id":  "d08-24",
        "day":  "Day 08",
        "no":  "24",
        "word":  "migration",
        "phonetic":  "[maigréiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "이주, 이동",
        "relatedForms":  "migrate (동) 이동하다, 이주하다",
        "paraphrase":  [
                           "travel"
                       ],
        "exampleEn":  "illegal migration into the United States",
        "exampleKo":  "미국으로의 불법 이주",
        "memo":  ""
    },
    {
        "id":  "d08-25",
        "day":  "Day 08",
        "no":  "25",
        "word":  "gather",
        "phonetic":  "[gǽðər]",
        "partOfSpeech":  "동사",
        "meaning":  "모이다 / 모으다, 수집하다",
        "relatedForms":  "gathering (명) 모임; 수집",
        "paraphrase":  [
                           "assemble",
                           "congregate",
                           "convene",
                           "flock",
                           "collect"
                       ],
        "exampleEn":  "gather information about the subject",
        "exampleKo":  "그 주제에 관한 정보를 수집하다",
        "memo":  "지텔프 동의어: A large number of swans gathered together. -> (b) flocked"
    },
    {
        "id":  "d08-26",
        "day":  "Day 08",
        "no":  "26",
        "word":  "draft",
        "phonetic":  "[dræft]",
        "partOfSpeech":  "명사",
        "meaning":  "초안, 초고 / 신인선수 선발",
        "relatedForms":  "-",
        "paraphrase":  [
                           "outline",
                           "plan"
                       ],
        "exampleEn":  "the final draft of my novel",
        "exampleKo":  "소설의 최종 원고",
        "memo":  ""
    },
    {
        "id":  "d08-27",
        "day":  "Day 08",
        "no":  "27",
        "word":  "notion",
        "phonetic":  "[nóuʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "개념, 관념, 생각",
        "relatedForms":  "-",
        "paraphrase":  [
                           "idea",
                           "belief",
                           "concept"
                       ],
        "exampleEn":  "reject the traditional notions of right and wrong",
        "exampleKo":  "옳고 그름의 전통적인 관념을 거부하다",
        "memo":  ""
    },
    {
        "id":  "d08-28",
        "day":  "Day 08",
        "no":  "28",
        "word":  "operate",
        "phonetic":  "[άpərèit]",
        "partOfSpeech":  "동사",
        "meaning":  "작동[가동]하다, 작동[가동]시키다 / 운영[운행]되다, 운영[운행]하다",
        "relatedForms":  "operation (명) 작전, 활동; 수술; 운행[운영]",
        "paraphrase":  [
                           "function",
                           "work",
                           "manage",
                           "run"
                       ],
        "exampleEn":  "operate the electric equipment",
        "exampleKo":  "전기 장비를 작동시키다",
        "memo":  "operate at full capacity (전면 가동되다)"
    },
    {
        "id":  "d08-29",
        "day":  "Day 08",
        "no":  "29",
        "word":  "durable",
        "phonetic":  "[djúərəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "오래가는, 내구성이 있는",
        "relatedForms":  "durability (명) 내구성",
        "paraphrase":  [
                           "sturdy",
                           "strong",
                           "robust"
                       ],
        "exampleEn":  "be made from a durable material",
        "exampleKo":  "내구성이 있는 재료로 만들어지다",
        "memo":  ""
    },
    {
        "id":  "d08-30",
        "day":  "Day 08",
        "no":  "30",
        "word":  "occupation",
        "phonetic":  "[ὰkjəpéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "점거, 사용 / 점령 / 직업",
        "relatedForms":  "-",
        "paraphrase":  [
                           "possession",
                           "use",
                           "invasion",
                           "conquest",
                           "job",
                           "profession"
                       ],
        "exampleEn":  "the Spanish occupation of Mexico",
        "exampleKo":  "스페인의 멕시코 점령",
        "memo":  "The house was not fit for occupation. (그 집은 거주하기에 적합하지 않았다.)"
    },
    {
        "id":  "d08-31",
        "day":  "Day 08",
        "no":  "31",
        "word":  "highly",
        "phonetic":  "[háili]",
        "partOfSpeech":  "부사",
        "meaning":  "매우, 고도로, 높이",
        "relatedForms":  "-",
        "paraphrase":  [
                           "greatly",
                           "very",
                           "well"
                       ],
        "exampleEn":  "be highly regarded by critics",
        "exampleKo":  "비평가들로부터 높은 평가를 받다",
        "memo":  ""
    },
    {
        "id":  "d08-32",
        "day":  "Day 08",
        "no":  "32",
        "word":  "acute",
        "phonetic":  "[əkjúːt]",
        "partOfSpeech":  "형용사",
        "meaning":  "(질병) 급성의 / 극심한, 심각한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "serious",
                           "sharp",
                           "severe",
                           "intense"
                       ],
        "exampleEn":  "a major source of acute stress",
        "exampleKo":  "극심한 스트레스의 주요 원인",
        "memo":  ""
    },
    {
        "id":  "d08-33",
        "day":  "Day 08",
        "no":  "33",
        "word":  "negotiate",
        "phonetic":  "[nigóuʃièit]",
        "partOfSpeech":  "동사",
        "meaning":  "협상하다, 타결하다",
        "relatedForms":  "negotiation (명) 협상",
        "paraphrase":  [
                           "settle"
                       ],
        "exampleEn":  "negotiate a peace treaty",
        "exampleKo":  "평화 조약을 협상하다",
        "memo":  ""
    },
    {
        "id":  "d08-34",
        "day":  "Day 08",
        "no":  "34",
        "word":  "respect",
        "phonetic":  "[rispékt]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "존경하다 / 존경, 존중",
        "relatedForms":  "-",
        "paraphrase":  [
                           "admire",
                           "regard",
                           "revere",
                           "regard",
                           "appreciation"
                       ],
        "exampleEn":  "show respect for others",
        "exampleKo":  "타인에 대한 존중을 보이다",
        "memo":  ""
    },
    {
        "id":  "d08-35",
        "day":  "Day 08",
        "no":  "35",
        "word":  "observe",
        "phonetic":  "[əbzə́ːrv]",
        "partOfSpeech":  "동사",
        "meaning":  "관찰하다, 주시하다 / 준수하다 / (논평, 의견) 말하다",
        "relatedForms":  "observation (명) 관찰, 관측; 소견, observance (명) (규칙 등의) 준수",
        "paraphrase":  [
                           "monitor",
                           "watch",
                           "follow",
                           "obey",
                           "adhere to",
                           "keep to"
                       ],
        "exampleEn":  "observe the behavior of the child",
        "exampleKo":  "아이의 행동을 관찰하다",
        "memo":  "지텔프 동의어: Employees are required to observe the dress code. -> (a) follow"
    },
    {
        "id":  "d08-36",
        "day":  "Day 08",
        "no":  "36",
        "word":  "odd",
        "phonetic":  "[ɑd]",
        "partOfSpeech":  "형용사",
        "meaning":  "이상한 / 홀수의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "strange",
                           "unusual",
                           "weird",
                           "peculiar",
                           "bizarre"
                       ],
        "exampleEn":  "have an odd feeling",
        "exampleKo":  "이상한 느낌이 들다",
        "memo":  ""
    },
    {
        "id":  "d08-37",
        "day":  "Day 08",
        "no":  "37",
        "word":  "perceive",
        "phonetic":  "[pərsíːv]",
        "partOfSpeech":  "동사",
        "meaning":  "인식하다, ~로 여기다",
        "relatedForms":  "perception (명) 인식",
        "paraphrase":  [

                       ],
        "exampleEn":  "be perceived as a brave person",
        "exampleKo":  "용감한 사람으로 인식되다",
        "memo":  ""
    },
    {
        "id":  "d08-38",
        "day":  "Day 08",
        "no":  "38",
        "word":  "period",
        "phonetic":  "[pí(ː)riəd]",
        "partOfSpeech":  "명사",
        "meaning":  "기간 / 시기, 단계",
        "relatedForms":  "periodically (부) 정기적으로, 주기적으로",
        "paraphrase":  [
                           "time",
                           "phase",
                           "stage"
                       ],
        "exampleEn":  "for a short period of time",
        "exampleKo":  "짧은 기간 동안",
        "memo":  "지텔프 동의어: We are still in the early period of the research. -> (b) stage"
    },
    {
        "id":  "d08-39",
        "day":  "Day 08",
        "no":  "39",
        "word":  "reliable",
        "phonetic":  "[riláiəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "믿을 수 있는, 신뢰할 만한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "dependable",
                           "trustworthy",
                           "stable"
                       ],
        "exampleEn":  "be based on reliable data",
        "exampleKo":  "신뢰할 수 있는 데이터에 기초하고 있다",
        "memo":  ""
    },
    {
        "id":  "d08-40",
        "day":  "Day 08",
        "no":  "40",
        "word":  "ownership",
        "phonetic":  "[óunərʃìp]",
        "partOfSpeech":  "명사",
        "meaning":  "소유, 소유권",
        "relatedForms":  "owner (명) 주인, 소유자",
        "paraphrase":  [
                           "occupation",
                           "possession"
                       ],
        "exampleEn":  "gain ownership of the business",
        "exampleKo":  "사업의 소유권을 얻다",
        "memo":  ""
    },
    {
        "id":  "d08-41",
        "day":  "Day 08",
        "no":  "41",
        "word":  "proceed",
        "phonetic":  "[prəsíːd]",
        "partOfSpeech":  "동사",
        "meaning":  "진행되다, 계속되다",
        "relatedForms":  "proceeds (명) 수익",
        "paraphrase":  [
                           "continue",
                           "progress",
                           "go on"
                       ],
        "exampleEn":  "proceed according to the instructions",
        "exampleKo":  "지시에 따라 진행하다",
        "memo":  ""
    },
    {
        "id":  "d08-42",
        "day":  "Day 08",
        "no":  "42",
        "word":  "original",
        "phonetic":  "[ərídʒənl]",
        "partOfSpeech":  "형용사/명사",
        "meaning":  "원래의, 본래의 / 독창적인, 새로운 / 원본",
        "relatedForms":  "originally (부) 원래, 본래, originality (명) 독창성",
        "paraphrase":  [
                           "first",
                           "initial",
                           "early",
                           "earliest",
                           "creative",
                           "new",
                           "fresh"
                       ],
        "exampleEn":  "proceed with the original plan",
        "exampleKo":  "원래의 계획을 계속 진행하다",
        "memo":  "지텔프 동의어: Ashley developed a truly original recipe for apple pie. -> (b) creative | an original idea (독창적인 아이디어)"
    },
    {
        "id":  "d08-43",
        "day":  "Day 08",
        "no":  "43",
        "word":  "overcome",
        "phonetic":  "[òuvərkʌ́m]",
        "partOfSpeech":  "동사",
        "meaning":  "극복하다, 이겨내다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "master",
                           "conquer"
                       ],
        "exampleEn":  "overcome a fear of flying",
        "exampleKo":  "비행공포증을 극복하다",
        "memo":  ""
    },
    {
        "id":  "d08-44",
        "day":  "Day 08",
        "no":  "44",
        "word":  "height",
        "phonetic":  "[hait]",
        "partOfSpeech":  "명사",
        "meaning":  "높이, 키[신장] / 고도, 해발 / 절정, 최고조",
        "relatedForms":  "high (형) 높은, (부) 높이, 높게",
        "paraphrase":  [
                           "tallness",
                           "altitude",
                           "elevation",
                           "peak",
                           "top",
                           "climax",
                           "culmination"
                       ],
        "exampleEn":  "over six feet in height",
        "exampleKo":  "키가 6피트가 넘는",
        "memo":  "at the height of the economic boom (경제 호황의 절정기에)"
    },
    {
        "id":  "d08-45",
        "day":  "Day 08",
        "no":  "45",
        "word":  "punishment",
        "phonetic":  "[pʌ́niʃmənt]",
        "partOfSpeech":  "명사",
        "meaning":  "벌, 처벌",
        "relatedForms":  "punish (동) 처벌하다",
        "paraphrase":  [

                       ],
        "exampleEn":  "the punishment for robbery",
        "exampleKo":  "강도에 대한 처벌",
        "memo":  ""
    },
    {
        "id":  "d08-46",
        "day":  "Day 08",
        "no":  "46",
        "word":  "exposed",
        "phonetic":  "[ikspóuzd]",
        "partOfSpeech":  "형용사",
        "meaning":  "노출된, 드러난",
        "relatedForms":  "exposure (명) 노출, expose (동) 노출시키다, 드러내다",
        "paraphrase":  [
                           "open",
                           "bare",
                           "uncovered",
                           "unprotected"
                       ],
        "exampleEn":  "exposed to pollution",
        "exampleKo":  "오염에 노출된",
        "memo":  "지텔프 동의어: The wires were exposed and sparking. -> (a) unprotected"
    },
    {
        "id":  "d08-47",
        "day":  "Day 08",
        "no":  "47",
        "word":  "perspective",
        "phonetic":  "[pərspéktiv]",
        "partOfSpeech":  "명사",
        "meaning":  "관점, 시각",
        "relatedForms":  "-",
        "paraphrase":  [
                           "view",
                           "viewpoint"
                       ],
        "exampleEn":  "provide a new perspective on life",
        "exampleKo":  "인생에 대해 새로운 시각을 제공하다",
        "memo":  ""
    },
    {
        "id":  "d08-48",
        "day":  "Day 08",
        "no":  "48",
        "word":  "reputation",
        "phonetic":  "[rèpjutéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "명성, 평판",
        "relatedForms":  "reputable (형) 평판이 좋은",
        "paraphrase":  [
                           "standing",
                           "fame",
                           "honor"
                       ],
        "exampleEn":  "earn a reputation as a creative painter",
        "exampleKo":  "창조적인 화가로서 명성을 얻다",
        "memo":  ""
    },
    {
        "id":  "d08-49",
        "day":  "Day 08",
        "no":  "49",
        "word":  "predict",
        "phonetic":  "[pridíkt]",
        "partOfSpeech":  "동사",
        "meaning":  "예측하다, 예상하다",
        "relatedForms":  "predictable (형) 예측 가능한, prediction (명) 예상, 예측",
        "paraphrase":  [
                           "anticipate",
                           "forecast",
                           "project"
                       ],
        "exampleEn":  "predict the results of the experiment",
        "exampleKo":  "실험 결과를 예측하다",
        "memo":  ""
    },
    {
        "id":  "d08-50",
        "day":  "Day 08",
        "no":  "50",
        "word":  "retire",
        "phonetic":  "[ritáiər]",
        "partOfSpeech":  "동사",
        "meaning":  "은퇴하다, 그만두다",
        "relatedForms":  "retirement (명) 은퇴, 퇴직",
        "paraphrase":  [
                           "resign",
                           "quit"
                       ],
        "exampleEn":  "decide to retire early",
        "exampleKo":  "조기 퇴직을 결심하다",
        "memo":  ""
    },
  {
        "id":  "d09-01",
        "day":  "Day 09",
        "no":  "01",
        "word":  "positive",
        "phonetic":  "[pάzitiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "긍정적인, 호의적인",
        "relatedForms":  "-",
        "paraphrase":  [
                           "optimistic",
                           "affirmative"
                       ],
        "exampleEn":  "always maintain a positive attitude",
        "exampleKo":  "항상 긍정적인 태도를 유지하다",
        "memo":  ""
    },
    {
        "id":  "d09-02",
        "day":  "Day 09",
        "no":  "02",
        "word":  "permission",
        "phonetic":  "[pərmíʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "허가, 허락",
        "relatedForms":  "permit (동) 허가하다, 허락하다",
        "paraphrase":  [
                           "authorization",
                           "approval"
                       ],
        "exampleEn":  "Give permission to use the phone.",
        "exampleKo":  "전화를 사용할 수 있도록 허락해 주세요.",
        "memo":  ""
    },
    {
        "id":  "d09-03",
        "day":  "Day 09",
        "no":  "03",
        "word":  "routine",
        "phonetic":  "[ruːtíːn]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "일상, 일과 / 일상의, 일상적인",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "Waking up early and going for a run has become Crystal's routine.",
        "exampleKo":  "일찍 일어나서 달리기를 하는 것은 크리스탈의 일과가 되었다.",
        "memo":  ""
    },
    {
        "id":  "d09-04",
        "day":  "Day 09",
        "no":  "04",
        "word":  "propel",
        "phonetic":  "[prəpél]",
        "partOfSpeech":  "동사",
        "meaning":  "추진하다, 몰고 가다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "drive",
                           "push",
                           "force"
                       ],
        "exampleEn":  "propel the boat forward",
        "exampleKo":  "보트를 전진시키다",
        "memo":  "지텔프 동의어: The rocket's engines will propel it into orbit. -> (a) push"
    },
    {
        "id":  "d09-05",
        "day":  "Day 09",
        "no":  "05",
        "word":  "abstract",
        "phonetic":  "[æbstrækt]",
        "partOfSpeech":  "형용사/명사",
        "meaning":  "추상적인 / (논문의) 초록, 요약",
        "relatedForms":  "-",
        "paraphrase":  [
                           "summary"
                       ],
        "exampleEn":  "an abstract work of art",
        "exampleKo":  "추상적인 미술 작품",
        "memo":  ""
    },
    {
        "id":  "d09-06",
        "day":  "Day 09",
        "no":  "06",
        "word":  "rough",
        "phonetic":  "[rʌf]",
        "partOfSpeech":  "형용사",
        "meaning":  "(표면 등) 거친, 고르지 않은 / 대략적인, 대강의",
        "relatedForms":  "roughly (부) 대략, 대강",
        "paraphrase":  [
                           "uneven",
                           "irregular",
                           "approximate"
                       ],
        "exampleEn":  "the rough surface of the moon",
        "exampleKo":  "달의 거친 표면",
        "memo":  "A rough estimate for the cost of the project is $100,000. (프로젝트의 대략적인 비용은 10만 달러이다.)"
    },
    {
        "id":  "d09-07",
        "day":  "Day 09",
        "no":  "07",
        "word":  "promise",
        "phonetic":  "[prάmis]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "약속하다 / 약속 / 가능성, 잠재력",
        "relatedForms":  "promising (형) 유망한",
        "paraphrase":  [
                           "guarantee",
                           "assure",
                           "pledge",
                           "vow",
                           "potential"
                       ],
        "exampleEn":  "promise to finish the homework by 9 p.m.",
        "exampleKo":  "숙제를 9시까지 끝내겠다고 약속하다",
        "memo":  "지텔프 동의어: This new medication shows promise in treating cancer. -> (b) potential"
    },
    {
        "id":  "d09-08",
        "day":  "Day 09",
        "no":  "08",
        "word":  "remarkable",
        "phonetic":  "[rimάːrkəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "놀랄 만한, 놀라운",
        "relatedForms":  "remark (명) 발언, 언급 (= comment)",
        "paraphrase":  [
                           "surprising",
                           "notable",
                           "wonderful",
                           "extraordinary"
                       ],
        "exampleEn":  "The Wright brothers' first flight was a remarkable feat.",
        "exampleKo":  "라이트 형제의 첫 비행은 놀라운 업적이었다.",
        "memo":  ""
    },
    {
        "id":  "d09-09",
        "day":  "Day 09",
        "no":  "09",
        "word":  "severe",
        "phonetic":  "[sivíər]",
        "partOfSpeech":  "형용사",
        "meaning":  "심각한, 극심한",
        "relatedForms":  "severely (부) 극심하게, 심각하게",
        "paraphrase":  [
                           "serious",
                           "intense",
                           "awful",
                           "extreme",
                           "harsh"
                       ],
        "exampleEn":  "severe mental illness",
        "exampleKo":  "심각한 정신 질환",
        "memo":  ""
    },
    {
        "id":  "d09-10",
        "day":  "Day 09",
        "no":  "10",
        "word":  "accommodate",
        "phonetic":  "[əkάmədèit]",
        "partOfSpeech":  "동사",
        "meaning":  "수용하다 / 필요한 것을 제공하다",
        "relatedForms":  "accommodations (명) 숙박 시설",
        "paraphrase":  [
                           "help",
                           "support"
                       ],
        "exampleEn":  "The bus can accommodate up to fifty passengers.",
        "exampleKo":  "그 버스는 최대 50명의 승객을 수용할 수 있다.",
        "memo":  "accommodate customers with children by providing high chairs (높은 의자를 제공하여 아이들을 데리고 있는 손님들에게 편의를 제공하다)"
    },
    {
        "id":  "d09-11",
        "day":  "Day 09",
        "no":  "11",
        "word":  "invade",
        "phonetic":  "[invéid]",
        "partOfSpeech":  "동사",
        "meaning":  "침입하다, 침략하다",
        "relatedForms":  "invasion (명) 침입, 침략",
        "paraphrase":  [
                           "attack"
                       ],
        "exampleEn":  "The Soviet Union invaded Afghanistan in order to expand its territory.",
        "exampleKo":  "소련은 영토를 확장하기 위해 아프가니스탄을 침략했다.",
        "memo":  ""
    },
    {
        "id":  "d09-12",
        "day":  "Day 09",
        "no":  "12",
        "word":  "pleasant",
        "phonetic":  "[pléznt]",
        "partOfSpeech":  "형용사",
        "meaning":  "즐거운, 기분 좋은",
        "relatedForms":  "pleasure (명) 즐거움, 기쁨",
        "paraphrase":  [
                           "pleasing",
                           "satisfying",
                           "delightful",
                           "enjoyable"
                       ],
        "exampleEn":  "pleasant memories of childhood",
        "exampleKo":  "어린 시절의 즐거운 기억",
        "memo":  "have a pleasant evening (즐거운 저녁 시간을 보내다)"
    },
    {
        "id":  "d09-13",
        "day":  "Day 09",
        "no":  "13",
        "word":  "sharply",
        "phonetic":  "[ʃάːrpli]",
        "partOfSpeech":  "부사",
        "meaning":  "급격히",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "Stock prices fell sharply.",
        "exampleKo":  "주가가 급격히 하락했다.",
        "memo":  ""
    },
    {
        "id":  "d09-14",
        "day":  "Day 09",
        "no":  "14",
        "word":  "recover",
        "phonetic":  "[rikʌ́vər]",
        "partOfSpeech":  "동사",
        "meaning":  "회복하다, 되찾다",
        "relatedForms":  "recovery (명) 회복",
        "paraphrase":  [
                           "regain",
                           "retrieve",
                           "improve",
                           "heal"
                       ],
        "exampleEn":  "recover from the surgery",
        "exampleKo":  "수술에서 회복하다",
        "memo":  "지텔프 동의어: George recovered consciousness after being in a coma for three days. -> (a) regained"
    },
    {
        "id":  "d09-15",
        "day":  "Day 09",
        "no":  "15",
        "word":  "possess",
        "phonetic":  "[pəzés]",
        "partOfSpeech":  "동사",
        "meaning":  "소유하다, 가지다",
        "relatedForms":  "possession (명) 소유(물)",
        "paraphrase":  [
                           "have"
                       ],
        "exampleEn":  "possess a lot of wealth",
        "exampleKo":  "많은 재산을 소유하다",
        "memo":  "possess the ability to empathize with others (타인과 공감할 수 있는 능력을 갖고 있다)"
    },
    {
        "id":  "d09-16",
        "day":  "Day 09",
        "no":  "16",
        "word":  "resist",
        "phonetic":  "[rizíst]",
        "partOfSpeech":  "동사",
        "meaning":  "참다, 견디다 / 저항하다, 반대하다",
        "relatedForms":  "resistant (형) 저항력 있는, 잘 견디는, resistance (명) 저항",
        "paraphrase":  [
                           "withstand",
                           "oppose",
                           "confront",
                           "defy"
                       ],
        "exampleEn":  "can't resist eating chocolate cake",
        "exampleKo":  "초콜릿 케이크를 먹지 않을 수 없다",
        "memo":  "resist negative changes (부정적인 변화에 저항하다)"
    },
    {
        "id":  "d09-17",
        "day":  "Day 09",
        "no":  "17",
        "word":  "shift",
        "phonetic":  "[ʃift]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "변화, 움직임 / 교대 근무 / 움직이다, 이동하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "change",
                           "move"
                       ],
        "exampleEn":  "work the night shift",
        "exampleKo":  "야간 근무를 하다",
        "memo":  "The Earth's axis has shifted from its original position. (지구의 축이 원래의 위치에서 벗어났다.)"
    },
    {
        "id":  "d09-18",
        "day":  "Day 09",
        "no":  "18",
        "word":  "stir",
        "phonetic":  "[stəːr]",
        "partOfSpeech":  "동사",
        "meaning":  "(휘)젓다 / 불러일으키다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "mix",
                           "blend",
                           "raise",
                           "inspire",
                           "prompt",
                           "provoke",
                           "arouse"
                       ],
        "exampleEn":  "stir soup with a spoon",
        "exampleKo":  "숟가락으로 수프를 젓다",
        "memo":  "지텔프 동의어: The increase in crime has stirred concerns among residents. -> (a) raised"
    },
    {
        "id":  "d09-19",
        "day":  "Day 09",
        "no":  "19",
        "word":  "privilege",
        "phonetic":  "[prívəlidʒ]",
        "partOfSpeech":  "명사",
        "meaning":  "특권, 특혜 / 영광",
        "relatedForms":  "-",
        "paraphrase":  [
                           "right",
                           "benefit",
                           "advantage",
                           "honor"
                       ],
        "exampleEn":  "enjoy special privileges as a member of the VIP club",
        "exampleKo":  "VIP 클럽의 회원으로서 특권을 누리다",
        "memo":  "It is a privilege to be able to learn from the best professors. (최고의 교수들에게 배울 수 있다는 것은 영광이다.)"
    },
    {
        "id":  "d09-20",
        "day":  "Day 09",
        "no":  "20",
        "word":  "reserve",
        "phonetic":  "[rizə́ːrv]",
        "partOfSpeech":  "동사",
        "meaning":  "예약하다 / 확보하다, 따로 남겨두다",
        "relatedForms":  "reservation (명) 예약",
        "paraphrase":  [
                           "book",
                           "hold"
                       ],
        "exampleEn":  "reserve a seat on the train",
        "exampleKo":  "기차 좌석을 예약하다",
        "memo":  "reserve a space in the parking lot (주차장에 공간을 확보하다)"
    },
    {
        "id":  "d09-21",
        "day":  "Day 09",
        "no":  "21",
        "word":  "particularly",
        "phonetic":  "[pərtíkjələrli]",
        "partOfSpeech":  "부사",
        "meaning":  "특히",
        "relatedForms":  "particular (형) 특정한; 특별한",
        "paraphrase":  [
                           "especially",
                           "specifically",
                           "in particular"
                       ],
        "exampleEn":  "Emma is particularly interested in the study of linguistics.",
        "exampleKo":  "엠마는 특히 언어학에 관심이 있다.",
        "memo":  ""
    },
    {
        "id":  "d09-22",
        "day":  "Day 09",
        "no":  "22",
        "word":  "allocate",
        "phonetic":  "[ǽləkèit]",
        "partOfSpeech":  "동사",
        "meaning":  "할당하다",
        "relatedForms":  "allocation (명) 할당(량)",
        "paraphrase":  [
                           "assign",
                           "distribute"
                       ],
        "exampleEn":  "allocate a larger budget to the marketing department",
        "exampleKo":  "마케팅 부서에 더 많은 예산을 할당하다",
        "memo":  ""
    },
    {
        "id":  "d09-23",
        "day":  "Day 09",
        "no":  "23",
        "word":  "favorable",
        "phonetic":  "[féivərəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "호의적인, 우호적인",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "a favorable response to the new product",
        "exampleKo":  "신제품에 대한 호의적인 반응",
        "memo":  ""
    },
    {
        "id":  "d09-24",
        "day":  "Day 09",
        "no":  "24",
        "word":  "submit",
        "phonetic":  "[səbmít]",
        "partOfSpeech":  "동사",
        "meaning":  "제출하다",
        "relatedForms":  "submission (명) 제출; 항복",
        "paraphrase":  [
                           "hand in",
                           "file"
                       ],
        "exampleEn":  "Submit your report by Friday.",
        "exampleKo":  "금요일까지 보고서를 제출해라.",
        "memo":  ""
    },
    {
        "id":  "d09-25",
        "day":  "Day 09",
        "no":  "25",
        "word":  "species",
        "phonetic":  "[spíːʃiːz]",
        "partOfSpeech":  "명사",
        "meaning":  "(생물의 분류 단위) 종",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "an endangered species",
        "exampleKo":  "멸종 위기에 처한 종",
        "memo":  ""
    },
    {
        "id":  "d09-26",
        "day":  "Day 09",
        "no":  "26",
        "word":  "steady",
        "phonetic":  "[stédi]",
        "partOfSpeech":  "형용사",
        "meaning":  "지속적인, 꾸준한",
        "relatedForms":  "steadily (부) 꾸준히",
        "paraphrase":  [
                           "continuous",
                           "constant"
                       ],
        "exampleEn":  "aim for steady growth",
        "exampleKo":  "꾸준한 성장을 목표로 하다",
        "memo":  "The company has a steady supply of raw materials. (그 회사는 원자재가 안정적으로 공급되고 있다.)"
    },
    {
        "id":  "d09-27",
        "day":  "Day 09",
        "no":  "27",
        "word":  "sympathy",
        "phonetic":  "[símpəθi]",
        "partOfSpeech":  "명사",
        "meaning":  "동정, 연민",
        "relatedForms":  "-",
        "paraphrase":  [
                           "compassion",
                           "pity",
                           "empathy"
                       ],
        "exampleEn":  "feel no sympathy for criminals",
        "exampleKo":  "범죄자들에게 동정심을 느끼지 않다",
        "memo":  ""
    },
    {
        "id":  "d09-28",
        "day":  "Day 09",
        "no":  "28",
        "word":  "replace",
        "phonetic":  "[ripléis]",
        "partOfSpeech":  "동사",
        "meaning":  "(새것으로) 교체하다 / (다른 것을) 대신하다, 대체하다",
        "relatedForms":  "replacement (명) 대체(품); 후임자",
        "paraphrase":  [
                           "change",
                           "substitute"
                       ],
        "exampleEn":  "find someone to replace the retiring CEO",
        "exampleKo":  "은퇴하는 CEO를 대신할 사람을 찾다",
        "memo":  "지텔프 동의어: James will replace the roof on the house. -> (a) change"
    },
    {
        "id":  "d09-29",
        "day":  "Day 09",
        "no":  "29",
        "word":  "praise",
        "phonetic":  "[preiz]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "칭찬하다 / 칭찬",
        "relatedForms":  "-",
        "paraphrase":  [
                           "acclaim",
                           "compliment",
                           "applaud",
                           "applause",
                           "tout"
                       ],
        "exampleEn":  "The actor's outstanding performance was praised by the director.",
        "exampleKo":  "그 배우의 뛰어난 연기는 감독으로부터 칭찬을 받았다.",
        "memo":  ""
    },
    {
        "id":  "d09-30",
        "day":  "Day 09",
        "no":  "30",
        "word":  "statistic",
        "phonetic":  "[stətístik]",
        "partOfSpeech":  "명사",
        "meaning":  "통계(학)",
        "relatedForms":  "statistical (형) 통계의",
        "paraphrase":  [

                       ],
        "exampleEn":  "according to official statistics",
        "exampleKo":  "공식 통계에 의하면",
        "memo":  ""
    },
    {
        "id":  "d09-31",
        "day":  "Day 09",
        "no":  "31",
        "word":  "otherwise",
        "phonetic":  "[ʌ́ðərwàiz]",
        "partOfSpeech":  "부사",
        "meaning":  "그렇지 않으면[않았다면]",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "The fire alarm went off. Otherwise, there could have been injuries.",
        "exampleKo":  "화재경보기가 울렸다. 그렇지 않았다면, 부상자가 있었을 수도 있다.",
        "memo":  ""
    },
    {
        "id":  "d09-32",
        "day":  "Day 09",
        "no":  "32",
        "word":  "advocate",
        "phonetic":  "[ǽdvəkèit] / [ǽdvəkət]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "지지하다, 옹호하다 / 지지자, 옹호자",
        "relatedForms":  "-",
        "paraphrase":  [
                           "support",
                           "supporter",
                           "defender"
                       ],
        "exampleEn":  "advocate for policies that protect the environment",
        "exampleKo":  "환경을 보호하는 정책을 옹호하다",
        "memo":  ""
    },
    {
        "id":  "d09-33",
        "day":  "Day 09",
        "no":  "33",
        "word":  "prefer",
        "phonetic":  "[prifə́ːr]",
        "partOfSpeech":  "동사",
        "meaning":  "선호하다",
        "relatedForms":  "preference (명) 선호",
        "paraphrase":  [
                           "favor"
                       ],
        "exampleEn":  "prefer chocolate to vanilla",
        "exampleKo":  "바닐라보다 초콜릿을 더 선호하다",
        "memo":  "prefer studying at home (집에서 공부하는 것을 선호하다)"
    },
    {
        "id":  "d09-34",
        "day":  "Day 09",
        "no":  "34",
        "word":  "update",
        "phonetic":  "[ʌpdéit]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "최신의 것으로 만들다 / 업데이트",
        "relatedForms":  "-",
        "paraphrase":  [
                           "upgrade",
                           "renew",
                           "revise",
                           "modernize"
                       ],
        "exampleEn":  "update the system regularly",
        "exampleKo":  "정기적으로 시스템을 업데이트하다",
        "memo":  "automatic software updates (소프트웨어 자동 업데이트)"
    },
    {
        "id":  "d09-35",
        "day":  "Day 09",
        "no":  "35",
        "word":  "vital",
        "phonetic":  "[váitl]",
        "partOfSpeech":  "형용사",
        "meaning":  "필수적인, 매우 중요한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "essential",
                           "important",
                           "critical",
                           "key",
                           "crucial"
                       ],
        "exampleEn":  "The heart is a vital organ in the human body.",
        "exampleKo":  "심장은 인체에 필수적인 기관이다.",
        "memo":  "지텔프 동의어: It is vital that all products are thoroughly tested before they are released. -> (a) important"
    },
    {
        "id":  "d09-36",
        "day":  "Day 09",
        "no":  "36",
        "word":  "rescue",
        "phonetic":  "[réskjuː]",
        "partOfSpeech":  "동사",
        "meaning":  "구조하다, 구출하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "save"
                       ],
        "exampleEn":  "rescue the drowning child",
        "exampleKo":  "물에 빠진 아이를 구하다",
        "memo":  ""
    },
    {
        "id":  "d09-37",
        "day":  "Day 09",
        "no":  "37",
        "word":  "specify",
        "phonetic":  "[spésəfài]",
        "partOfSpeech":  "동사",
        "meaning":  "(구체적으로) 명시하다",
        "relatedForms":  "specification (명) 설명서",
        "paraphrase":  [
                           "stipulate"
                       ],
        "exampleEn":  "Please specify the quantity when placing your order.",
        "exampleKo":  "주문할 때 수량을 구체적으로 명시하라.",
        "memo":  ""
    },
    {
        "id":  "d09-38",
        "day":  "Day 09",
        "no":  "38",
        "word":  "survive",
        "phonetic":  "[sərváiv]",
        "partOfSpeech":  "동사",
        "meaning":  "살아남다, 생존하다",
        "relatedForms":  "survival (명) 생존",
        "paraphrase":  [
                           "subsist"
                       ],
        "exampleEn":  "survive in harsh conditions",
        "exampleKo":  "혹독한 환경에서 살아남다",
        "memo":  ""
    },
    {
        "id":  "d09-39",
        "day":  "Day 09",
        "no":  "39",
        "word":  "familiar",
        "phonetic":  "[fəmíljər]",
        "partOfSpeech":  "형용사",
        "meaning":  "익숙한, 낯익은",
        "relatedForms":  "unfamiliar (형) 낯선",
        "paraphrase":  [

                       ],
        "exampleEn":  "Andrew is familiar with the area.",
        "exampleKo":  "앤드류는 그 지역에 익숙하다.",
        "memo":  "see a familiar face (낯익은 얼굴을 보다)"
    },
    {
        "id":  "d09-40",
        "day":  "Day 09",
        "no":  "40",
        "word":  "premise",
        "phonetic":  "[prémis]",
        "partOfSpeech":  "명사",
        "meaning":  "전제",
        "relatedForms":  "-",
        "paraphrase":  [
                           "assumption"
                       ],
        "exampleEn":  "The theory is based on the premise that all people are equal.",
        "exampleKo":  "그 이론은 모든 사람이 평등하다는 전제에 근거를 두고 있다.",
        "memo":  ""
    },
    {
        "id":  "d09-41",
        "day":  "Day 09",
        "no":  "41",
        "word":  "struggle",
        "phonetic":  "[strʌ́gl]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "애쓰다, 고군분투하다 / 투쟁",
        "relatedForms":  "-",
        "paraphrase":  [
                           "strive",
                           "fight",
                           "battle"
                       ],
        "exampleEn":  "The refugees are struggling to survive.",
        "exampleKo":  "난민들은 살아남기 위해 고군분투하고 있다.",
        "memo":  "the power struggle between the two political parties (두 정당 간의 권력 투쟁)"
    },
    {
        "id":  "d09-42",
        "day":  "Day 09",
        "no":  "42",
        "word":  "sufficient",
        "phonetic":  "[səfíʃənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "충분한",
        "relatedForms":  "sufficiency (명) 충분함, insufficient (형) 불충분한",
        "paraphrase":  [
                           "enough",
                           "adequate"
                       ],
        "exampleEn":  "sufficient time to complete the task",
        "exampleKo":  "임무를 완수하기에 충분한 시간",
        "memo":  "지텔프 동의어: Getting sufficient sleep can help improve concentration. -> (b) enough"
    },
    {
        "id":  "d09-43",
        "day":  "Day 09",
        "no":  "43",
        "word":  "attain",
        "phonetic":  "[ətéin]",
        "partOfSpeech":  "동사",
        "meaning":  "(노력 끝에) 이루다, 달성하다 / (특정 수준) 이르다, 도달하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "achieve",
                           "accomplish",
                           "reach"
                       ],
        "exampleEn":  "Olivia attained her goal of becoming a doctor.",
        "exampleKo":  "올리비아는 의사가 되겠다는 목표를 달성했다.",
        "memo":  "The car attained a speed of 100 mph. (그 차는 시속 100마일에 도달했다.)"
    },
    {
        "id":  "d09-44",
        "day":  "Day 09",
        "no":  "44",
        "word":  "attract",
        "phonetic":  "[ətrǽkt]",
        "partOfSpeech":  "동사",
        "meaning":  "(주의·관심 등을) 끌다",
        "relatedForms":  "attractive (형) 매력적인, attraction (명) 명소; 매력",
        "paraphrase":  [
                           "draw"
                       ],
        "exampleEn":  "attract more customers",
        "exampleKo":  "더 많은 손님을 끌다",
        "memo":  "The trash attracted many flies. (쓰레기는 많은 파리를 끌어들였다.)"
    },
    {
        "id":  "d09-45",
        "day":  "Day 09",
        "no":  "45",
        "word":  "election",
        "phonetic":  "[ilékʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "선거",
        "relatedForms":  "elect (동) 선출하다",
        "paraphrase":  [
                           "race"
                       ],
        "exampleEn":  "a presidential election",
        "exampleKo":  "대통령 선거",
        "memo":  ""
    },
    {
        "id":  "d09-46",
        "day":  "Day 09",
        "no":  "46",
        "word":  "preserve",
        "phonetic":  "[prizə́ːrv]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "보존하다, 보호하다 / 보호구역",
        "relatedForms":  "preservation (명) 보존, 보호",
        "paraphrase":  [
                           "protect",
                           "maintain",
                           "conserve",
                           "keep"
                       ],
        "exampleEn":  "preserve cultural heritage",
        "exampleKo":  "문화유산을 보존하다",
        "memo":  "nature preserve (자연 보호 구역)"
    },
    {
        "id":  "d09-47",
        "day":  "Day 09",
        "no":  "47",
        "word":  "purchase",
        "phonetic":  "[pə́ːrtʃəs]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "구매하다, 사다 / 구매, 구매한 물건",
        "relatedForms":  "-",
        "paraphrase":  [
                           "buy",
                           "get"
                       ],
        "exampleEn":  "purchase some new clothes",
        "exampleKo":  "새 옷을 사다",
        "memo":  ""
    },
    {
        "id":  "d09-48",
        "day":  "Day 09",
        "no":  "48",
        "word":  "sustain",
        "phonetic":  "[səstéin]",
        "partOfSpeech":  "동사",
        "meaning":  "유지하다, 지속하다",
        "relatedForms":  "sustainable (형) 지속 가능한",
        "paraphrase":  [
                           "maintain",
                           "continue"
                       ],
        "exampleEn":  "sustain life with food and water",
        "exampleKo":  "음식과 물로 생명을 유지하다",
        "memo":  ""
    },
    {
        "id":  "d09-49",
        "day":  "Day 09",
        "no":  "49",
        "word":  "outcome",
        "phonetic":  "[áutkʌ̀m]",
        "partOfSpeech":  "명사",
        "meaning":  "결과",
        "relatedForms":  "-",
        "paraphrase":  [
                           "result",
                           "end",
                           "consequence"
                       ],
        "exampleEn":  "a satisfactory outcome",
        "exampleKo":  "만족스러운 결과",
        "memo":  ""
    },
    {
        "id":  "d09-50",
        "day":  "Day 09",
        "no":  "50",
        "word":  "transaction",
        "phonetic":  "[trænsǽkʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "거래",
        "relatedForms":  "-",
        "paraphrase":  [
                           "deal"
                       ],
        "exampleEn":  "financial transactions",
        "exampleKo":  "금융 거래",
        "memo":  ""
    },
  {
        "id":  "d10-01",
        "day":  "Day 10",
        "no":  "01",
        "word":  "innocent",
        "phonetic":  "[ínəsnt]",
        "partOfSpeech":  "형용사",
        "meaning":  "무죄의, 무고한",
        "relatedForms":  "innocence (명) 결백, 무죄",
        "paraphrase":  [
                           "blameless"
                       ],
        "exampleEn":  "the death of innocent people",
        "exampleKo":  "무고한 사람들의 죽음",
        "memo":  ""
    },
    {
        "id":  "d10-02",
        "day":  "Day 10",
        "no":  "02",
        "word":  "hesitate",
        "phonetic":  "[hézətèit]",
        "partOfSpeech":  "동사",
        "meaning":  "주저하다, 망설이다",
        "relatedForms":  "hesitant (형) 주저하는, 망설이는 (= disinclined)",
        "paraphrase":  [

                       ],
        "exampleEn":  "hesitate to move to a new city",
        "exampleKo":  "새로운 도시로 이사하기를 주저하다",
        "memo":  ""
    },
    {
        "id":  "d10-03",
        "day":  "Day 10",
        "no":  "03",
        "word":  "temporary",
        "phonetic":  "[témpərèri]",
        "partOfSpeech":  "형용사",
        "meaning":  "임시의, 일시적인",
        "relatedForms":  "temporarily (부) 일시적으로",
        "paraphrase":  [
                           "brief",
                           "short-term"
                       ],
        "exampleEn":  "temporary closure of the road",
        "exampleKo":  "도로의 임시 폐쇄",
        "memo":  ""
    },
    {
        "id":  "d10-04",
        "day":  "Day 10",
        "no":  "04",
        "word":  "restore",
        "phonetic":  "[ristɔ́ːr]",
        "partOfSpeech":  "동사",
        "meaning":  "회복하다, 복원하다, 복구하다",
        "relatedForms":  "restoration (명) 복원, 복구",
        "paraphrase":  [
                           "revive",
                           "repair",
                           "recover",
                           "renovate",
                           "rebuild"
                       ],
        "exampleEn":  "restore the damaged painting",
        "exampleKo":  "훼손된 그림을 복원하다",
        "memo":  ""
    },
    {
        "id":  "d10-05",
        "day":  "Day 10",
        "no":  "05",
        "word":  "retain",
        "phonetic":  "[ritéin]",
        "partOfSpeech":  "동사",
        "meaning":  "간직하다, 보존하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "keep",
                           "maintain",
                           "preserve"
                       ],
        "exampleEn":  "retain the title of champion",
        "exampleKo":  "챔피언 타이틀을 유지하다",
        "memo":  ""
    },
    {
        "id":  "d10-06",
        "day":  "Day 10",
        "no":  "06",
        "word":  "suspect",
        "phonetic":  "[səspékt] / [sʌ́spekt]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "의심하다, 수상쩍어하다 / 용의자",
        "relatedForms":  "suspicious (형) 의심하는, 의심쩍은",
        "paraphrase":  [
                           "feel",
                           "believe",
                           "suppose"
                       ],
        "exampleEn":  "be suspected of fraud",
        "exampleKo":  "사기 혐의를 받다",
        "memo":  ""
    },
    {
        "id":  "d10-07",
        "day":  "Day 10",
        "no":  "07",
        "word":  "variety",
        "phonetic":  "[vəráiəti]",
        "partOfSpeech":  "명사",
        "meaning":  "다양성, 다양 / 종류, 품종",
        "relatedForms":  "-",
        "paraphrase":  [
                           "diversity",
                           "range",
                           "array",
                           "kind",
                           "type",
                           "sort"
                       ],
        "exampleEn":  "perform a variety of tasks",
        "exampleKo":  "다양한 일을 수행하다",
        "memo":  "지텔프 동의어: There are four varieties of apples in this box. -> (b) kinds | grow three varieties of tomatoes (세 가지 종류의 토마토를 재배하다)"
    },
    {
        "id":  "d10-08",
        "day":  "Day 10",
        "no":  "08",
        "word":  "win",
        "phonetic":  "[win]",
        "partOfSpeech":  "동사",
        "meaning":  "이기다, 승리하다 / 상을 타다",
        "relatedForms":  "winner (명) 우승자, 당첨자",
        "paraphrase":  [

                       ],
        "exampleEn":  "win the grand prize in the contest",
        "exampleKo":  "대회에서 대상을 타다",
        "memo":  ""
    },
    {
        "id":  "d10-09",
        "day":  "Day 10",
        "no":  "09",
        "word":  "adjacent",
        "phonetic":  "[ədʒéisənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "가까운, 인접한",
        "relatedForms":  "adjacency (명) 인접, 근접",
        "paraphrase":  [
                           "nearby",
                           "neighboring",
                           "close"
                       ],
        "exampleEn":  "live in the adjacent town",
        "exampleKo":  "근처의 마을에서 살다",
        "memo":  ""
    },
    {
        "id":  "d10-10",
        "day":  "Day 10",
        "no":  "10",
        "word":  "transform",
        "phonetic":  "[trænsfɔ́ːrm]",
        "partOfSpeech":  "동사",
        "meaning":  "(완전히) 변화시키다, 변형시키다",
        "relatedForms":  "transformation (명) 변화, 변신",
        "paraphrase":  [
                           "change",
                           "alter",
                           "convert",
                           "revolutionize"
                       ],
        "exampleEn":  "transform the prince into a frog",
        "exampleKo":  "왕자를 개구리로 변신시키다",
        "memo":  "지텔프 동의어: Containerization transformed the shipping industry. -> (a) revolutionized"
    },
    {
        "id":  "d10-11",
        "day":  "Day 10",
        "no":  "11",
        "word":  "endure",
        "phonetic":  "[indjúər]",
        "partOfSpeech":  "동사",
        "meaning":  "참다, 견디다",
        "relatedForms":  "enduring (형) 오래가는, 지속적인 (= lasting), endurance (명) 인내, 지구력",
        "paraphrase":  [
                           "tolerate",
                           "accept",
                           "suffer",
                           "withstand"
                       ],
        "exampleEn":  "endure constant back pain",
        "exampleKo":  "계속되는 허리 통증을 견디다",
        "memo":  ""
    },
    {
        "id":  "d10-12",
        "day":  "Day 10",
        "no":  "12",
        "word":  "qualification",
        "phonetic":  "[kwὰləfəkéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "자질, 자격, 자격요건",
        "relatedForms":  "qualify (동) 자격이 되다, 자격을 주다",
        "paraphrase":  [
                           "eligibility"
                       ],
        "exampleEn":  "have the necessary qualifications for the job",
        "exampleKo":  "그 일에 필요한 자격을 갖추다",
        "memo":  ""
    },
    {
        "id":  "d10-13",
        "day":  "Day 10",
        "no":  "13",
        "word":  "understanding",
        "phonetic":  "[ʌ̀ndərstǽndiŋ]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "이해 / 이해심 있는",
        "relatedForms":  "understand (동) 이해하다",
        "paraphrase":  [
                           "perception",
                           "knowledge",
                           "appreciation"
                       ],
        "exampleEn":  "a clear understanding of the goal",
        "exampleKo":  "목표에 대한 명확한 이해",
        "memo":  ""
    },
    {
        "id":  "d10-14",
        "day":  "Day 10",
        "no":  "14",
        "word":  "convey",
        "phonetic":  "[kənvéi]",
        "partOfSpeech":  "동사",
        "meaning":  "전하다, (생각을) 전달하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "transport",
                           "communicate",
                           "express"
                       ],
        "exampleEn":  "convey our gratitude",
        "exampleKo":  "우리의 감사함을 전하다",
        "memo":  ""
    },
    {
        "id":  "d10-15",
        "day":  "Day 10",
        "no":  "15",
        "word":  "strengthen",
        "phonetic":  "[stréŋkθən]",
        "partOfSpeech":  "동사",
        "meaning":  "강화하다, 튼튼하게 하다",
        "relatedForms":  "strength (명) 힘; 장점",
        "paraphrase":  [
                           "cement",
                           "reinforce",
                           "fortify"
                       ],
        "exampleEn":  "strengthen the immune system",
        "exampleKo":  "면역 체계를 강화하다",
        "memo":  ""
    },
    {
        "id":  "d10-16",
        "day":  "Day 10",
        "no":  "16",
        "word":  "vague",
        "phonetic":  "[veig]",
        "partOfSpeech":  "형용사",
        "meaning":  "애매한, 모호한, 희미한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "unclear",
                           "rough"
                       ],
        "exampleEn":  "a vague memory of my childhood",
        "exampleKo":  "내 어린 시절의 희미한 기억",
        "memo":  ""
    },
    {
        "id":  "d10-17",
        "day":  "Day 10",
        "no":  "17",
        "word":  "ultimate",
        "phonetic":  "[ʌ́ltəmət]",
        "partOfSpeech":  "형용사",
        "meaning":  "궁극적인, 최후의, 최종의",
        "relatedForms":  "ultimately (부) 결국, 궁극적으로",
        "paraphrase":  [
                           "final",
                           "eventual"
                       ],
        "exampleEn":  "the ultimate outcome of the negotiation",
        "exampleKo":  "협상의 최종 결과",
        "memo":  ""
    },
    {
        "id":  "d10-18",
        "day":  "Day 10",
        "no":  "18",
        "word":  "associate",
        "phonetic":  "[əsóuʃièit]",
        "partOfSpeech":  "동사",
        "meaning":  "연관시키다, 관련짓다",
        "relatedForms":  "association (명) 관련, 연관 (= connection); 협회",
        "paraphrase":  [
                           "relate",
                           "connect",
                           "link",
                           "affiliate"
                       ],
        "exampleEn":  "be associated with several scandals",
        "exampleKo":  "여러 가지 추문에 연루되다",
        "memo":  ""
    },
    {
        "id":  "d10-19",
        "day":  "Day 10",
        "no":  "19",
        "word":  "substance",
        "phonetic":  "[sʌ́bstəns]",
        "partOfSpeech":  "명사",
        "meaning":  "물질",
        "relatedForms":  "-",
        "paraphrase":  [
                           "material",
                           "element"
                       ],
        "exampleEn":  "harmful substances in cosmetics",
        "exampleKo":  "화장품의 유해 물질",
        "memo":  ""
    },
    {
        "id":  "d10-20",
        "day":  "Day 10",
        "no":  "20",
        "word":  "executive",
        "phonetic":  "[igzékjətiv]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "임원, 간부, 경영진 / 임원의, 간부의",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "top executives at large companies",
        "exampleKo":  "대기업의 최고 경영자",
        "memo":  ""
    },
    {
        "id":  "d10-21",
        "day":  "Day 10",
        "no":  "21",
        "word":  "coordinate",
        "phonetic":  "[kouɔ́ːrdənèit]",
        "partOfSpeech":  "동사",
        "meaning":  "조정하다, 조율하다 / 어울리다, 조화롭게 하다",
        "relatedForms":  "coordination (명) 협력; (신체의) 협응력",
        "paraphrase":  [
                           "organize",
                           "blend",
                           "match"
                       ],
        "exampleEn":  "coordinate the schedule",
        "exampleKo":  "일정을 조정하다",
        "memo":  "지텔프 동의어: Chris wanted to coordinate the table and chairs. -> (a) match"
    },
    {
        "id":  "d10-22",
        "day":  "Day 10",
        "no":  "22",
        "word":  "willing",
        "phonetic":  "[wíliŋ]",
        "partOfSpeech":  "형용사",
        "meaning":  "~할 의향이 있는",
        "relatedForms":  "willingly (부) 기꺼이",
        "paraphrase":  [
                           "happy",
                           "pleased"
                       ],
        "exampleEn":  "willing to work overtime",
        "exampleKo":  "기꺼이 초과 근무를 하는",
        "memo":  ""
    },
    {
        "id":  "d10-23",
        "day":  "Day 10",
        "no":  "23",
        "word":  "bury",
        "phonetic":  "[béri]",
        "partOfSpeech":  "동사",
        "meaning":  "묻다, 매장하다",
        "relatedForms":  "burial (명) 매장, 장례",
        "paraphrase":  [

                       ],
        "exampleEn":  "be buried deep in the ground",
        "exampleKo":  "땅속 깊이 묻히다",
        "memo":  ""
    },
    {
        "id":  "d10-24",
        "day":  "Day 10",
        "no":  "24",
        "word":  "boast",
        "phonetic":  "[boust]",
        "partOfSpeech":  "동사",
        "meaning":  "뽐내다, 자랑하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "brag",
                           "show off"
                       ],
        "exampleEn":  "boast about his new car",
        "exampleKo":  "그의 새 차에 대해 자랑하다",
        "memo":  ""
    },
    {
        "id":  "d10-25",
        "day":  "Day 10",
        "no":  "25",
        "word":  "undertake",
        "phonetic":  "[ʌ̀ndərtéik]",
        "partOfSpeech":  "동사",
        "meaning":  "착수하다, 떠맡다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "take on",
                           "tackle"
                       ],
        "exampleEn":  "undertake research into the causes of global warming",
        "exampleKo":  "지구 온난화의 원인에 대한 연구에 착수하다",
        "memo":  ""
    },
    {
        "id":  "d10-26",
        "day":  "Day 10",
        "no":  "26",
        "word":  "abundant",
        "phonetic":  "[əbʌ́ndənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "풍부한",
        "relatedForms":  "abundance (명) 풍부함",
        "paraphrase":  [
                           "plentiful",
                           "generous",
                           "rich"
                       ],
        "exampleEn":  "an abundant supply of oxygen",
        "exampleKo":  "풍부한 산소 공급",
        "memo":  ""
    },
    {
        "id":  "d10-27",
        "day":  "Day 10",
        "no":  "27",
        "word":  "connect",
        "phonetic":  "[kənékt]",
        "partOfSpeech":  "동사",
        "meaning":  "연결하다, 결합하다 / 관련시키다, 결부시키다",
        "relatedForms":  "connection (명) 관련, 연관, 연결 (= association)",
        "paraphrase":  [
                           "attach",
                           "assemble",
                           "link",
                           "affix",
                           "associate",
                           "attribute",
                           "relate"
                       ],
        "exampleEn":  "The two events are closely connected to each other.",
        "exampleKo":  "그 두 사건은 서로 밀접하게 연관되어 있다.",
        "memo":  ""
    },
    {
        "id":  "d10-28",
        "day":  "Day 10",
        "no":  "28",
        "word":  "deem",
        "phonetic":  "[diːm]",
        "partOfSpeech":  "동사",
        "meaning":  "~라고 여기다, 간주하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "consider",
                           "believe",
                           "reckon"
                       ],
        "exampleEn":  "be deemed to be accurate",
        "exampleKo":  "정확하다고 간주되다",
        "memo":  "지텔프 동의어: Taj Mahal is deemed an architectural masterpiece. -> (a) considered"
    },
    {
        "id":  "d10-29",
        "day":  "Day 10",
        "no":  "29",
        "word":  "widespread",
        "phonetic":  "[wáidspréd]",
        "partOfSpeech":  "형용사",
        "meaning":  "널리 퍼진, 광범위한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "prevalent",
                           "prevailing",
                           "common"
                       ],
        "exampleEn":  "widespread drug use",
        "exampleKo":  "널리 퍼진 약물의 사용",
        "memo":  ""
    },
    {
        "id":  "d10-30",
        "day":  "Day 10",
        "no":  "30",
        "word":  "fragment",
        "phonetic":  "[frǽgmənt]",
        "partOfSpeech":  "명사",
        "meaning":  "파편, 조각",
        "relatedForms":  "-",
        "paraphrase":  [
                           "piece"
                       ],
        "exampleEn":  "find ancient pottery fragments",
        "exampleKo":  "고대 도자기 파편들을 발견하다",
        "memo":  ""
    },
    {
        "id":  "d10-31",
        "day":  "Day 10",
        "no":  "31",
        "word":  "resign",
        "phonetic":  "[rizáin]",
        "partOfSpeech":  "동사",
        "meaning":  "사임하다, 그만두다",
        "relatedForms":  "resignation (명) 사임, 사직",
        "paraphrase":  [
                           "leave",
                           "quit",
                           "retire"
                       ],
        "exampleEn":  "formally resign as Governor",
        "exampleKo":  "정식으로 지사직을 사퇴하다",
        "memo":  ""
    },
    {
        "id":  "d10-32",
        "day":  "Day 10",
        "no":  "32",
        "word":  "arrangement",
        "phonetic":  "[əréindʒmənt]",
        "partOfSpeech":  "명사",
        "meaning":  "준비, 주선 / 약속, 합의 / 배열, 정렬",
        "relatedForms":  "arrange (동) 준비하다; 배열하다, 정렬하다",
        "paraphrase":  [
                           "plan",
                           "preparation",
                           "agreement",
                           "settlement",
                           "organization",
                           "alignment"
                       ],
        "exampleEn":  "make arrangements for the delivery of the furniture",
        "exampleKo":  "가구를 배달할 준비를 하다",
        "memo":  "the business arrangement between the two companies (두 회사 간의 업무 협의)"
    },
    {
        "id":  "d10-33",
        "day":  "Day 10",
        "no":  "33",
        "word":  "virtue",
        "phonetic":  "[və́ːrtʃuː]",
        "partOfSpeech":  "명사",
        "meaning":  "미덕, 선, 장점",
        "relatedForms":  "-",
        "paraphrase":  [
                           "goodness",
                           "merit",
                           "strength"
                       ],
        "exampleEn":  "the virtue of kindness",
        "exampleKo":  "친절의 미덕",
        "memo":  ""
    },
    {
        "id":  "d10-34",
        "day":  "Day 10",
        "no":  "34",
        "word":  "attack",
        "phonetic":  "[ətǽk]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "공격하다 / 공격",
        "relatedForms":  "-",
        "paraphrase":  [
                           "assault",
                           "assail",
                           "invade"
                       ],
        "exampleEn":  "be attacked by a large dog",
        "exampleKo":  "큰 개에게 공격을 당하다",
        "memo":  ""
    },
    {
        "id":  "d10-35",
        "day":  "Day 10",
        "no":  "35",
        "word":  "adhere",
        "phonetic":  "[ædhíər]",
        "partOfSpeech":  "동사",
        "meaning":  "들러붙다 / 고수하다, 준수하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "stick",
                           "glue",
                           "attach",
                           "follow",
                           "observe",
                           "abide by"
                       ],
        "exampleEn":  "The tiles won't adhere to the floor properly.",
        "exampleKo":  "타일이 바닥에 제대로 붙지 않는다.",
        "memo":  "adhere to the terms of the contract (계약 조건을 지키다)"
    },
    {
        "id":  "d10-36",
        "day":  "Day 10",
        "no":  "36",
        "word":  "certificate",
        "phonetic":  "[sərtífikit]",
        "partOfSpeech":  "명사",
        "meaning":  "자격증, 증명서",
        "relatedForms":  "certify (동) 보증하다, 증명하다",
        "paraphrase":  [
                           "document",
                           "voucher"
                       ],
        "exampleEn":  "receive a certificate of completion",
        "exampleKo":  "수료증을 받다",
        "memo":  ""
    },
    {
        "id":  "d10-37",
        "day":  "Day 10",
        "no":  "37",
        "word":  "genetic",
        "phonetic":  "[dʒənétik]",
        "partOfSpeech":  "형용사",
        "meaning":  "유전의, 유전자의",
        "relatedForms":  "gene (명) 유전자",
        "paraphrase":  [

                       ],
        "exampleEn":  "each person's unique genetic makeup",
        "exampleKo":  "개개인의 고유한 유전자 구성",
        "memo":  ""
    },
    {
        "id":  "d10-38",
        "day":  "Day 10",
        "no":  "38",
        "word":  "witness",
        "phonetic":  "[wítnis]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "목격하다, 보다 / 목격자",
        "relatedForms":  "-",
        "paraphrase":  [
                           "see",
                           "view",
                           "watch",
                           "observe",
                           "observer"
                       ],
        "exampleEn":  "witness an amazing sunrise",
        "exampleKo":  "놀라운 일출을 목격하다",
        "memo":  ""
    },
    {
        "id":  "d10-39",
        "day":  "Day 10",
        "no":  "39",
        "word":  "challenge",
        "phonetic":  "[tʃǽlindʒ]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "도전하다, 반박하다 / 도전, 어려움",
        "relatedForms":  "challenging (형) (힘들지만) 도전해 볼 만한",
        "paraphrase":  [
                           "dispute",
                           "confront",
                           "defy",
                           "question",
                           "opposition",
                           "confrontation"
                       ],
        "exampleEn":  "challenge conventional thinking",
        "exampleKo":  "전통적인 사고에 이의를 제기하다",
        "memo":  "face new challenges (새로운 도전에 직면하다)"
    },
    {
        "id":  "d10-40",
        "day":  "Day 10",
        "no":  "40",
        "word":  "argue",
        "phonetic":  "[άːrgjuː]",
        "partOfSpeech":  "동사",
        "meaning":  "다투다, 언쟁하다 / 주장하다",
        "relatedForms":  "argument (명) 논쟁, 언쟁; 주장 (= dispute)",
        "paraphrase":  [
                           "contend",
                           "assert"
                       ],
        "exampleEn":  "argue with each other",
        "exampleKo":  "서로 논쟁하다",
        "memo":  "숙어: argue for (~에 찬성하는 주장을 하다 = advocate for), argue against (~에 반대하는 주장을 하다)"
    },
    {
        "id":  "d10-41",
        "day":  "Day 10",
        "no":  "41",
        "word":  "defective",
        "phonetic":  "[diféktiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "결함이 있는",
        "relatedForms":  "defect (명) 결함, 결점",
        "paraphrase":  [
                           "faulty",
                           "flawed"
                       ],
        "exampleEn":  "return the defective product",
        "exampleKo":  "결함이 있는 상품을 반품하다",
        "memo":  ""
    },
    {
        "id":  "d10-42",
        "day":  "Day 10",
        "no":  "42",
        "word":  "oversee",
        "phonetic":  "[òuvərsíː]",
        "partOfSpeech":  "동사",
        "meaning":  "감독하다, 지켜보다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "supervise",
                           "manage",
                           "direct"
                       ],
        "exampleEn":  "oversee the company's operations",
        "exampleKo":  "회사의 운영을 감독하다",
        "memo":  "지텔프 동의어: Craig Kenney was appointed to oversee the construction project. -> (a) supervise"
    },
    {
        "id":  "d10-43",
        "day":  "Day 10",
        "no":  "43",
        "word":  "majority",
        "phonetic":  "[mədʒɔ́ːrəti]",
        "partOfSpeech":  "명사",
        "meaning":  "다수, 대부분",
        "relatedForms":  "major (형) 주요한, 중요한, (명) 전공",
        "paraphrase":  [
                           "most"
                       ],
        "exampleEn":  "the majority of the world's population",
        "exampleKo":  "세계 인구의 대부분",
        "memo":  ""
    },
    {
        "id":  "d10-44",
        "day":  "Day 10",
        "no":  "44",
        "word":  "adventure",
        "phonetic":  "[ædvkéntʃər]",
        "partOfSpeech":  "명사",
        "meaning":  "모험",
        "relatedForms":  "adventurer (명) 모험가",
        "paraphrase":  [

                       ],
        "exampleEn":  "Life is full of adventure.",
        "exampleKo":  "인생은 모험으로 가득 차 있다.",
        "memo":  ""
    },
    {
        "id":  "d10-45",
        "day":  "Day 10",
        "no":  "45",
        "word":  "differ",
        "phonetic":  "[dífər]",
        "partOfSpeech":  "동사",
        "meaning":  "다르다, 의견이 다르다",
        "relatedForms":  "different (형) 다른, 차이가 있는, differentiate (동) 구별하다, 구분하다",
        "paraphrase":  [
                           "disagree"
                       ],
        "exampleEn":  "differ on whether to accept the offer",
        "exampleKo":  "그 제의를 받아들일지에 대해 의견이 다르다",
        "memo":  ""
    },
    {
        "id":  "d10-46",
        "day":  "Day 10",
        "no":  "46",
        "word":  "dispose of",
        "phonetic":  "[dispóuz]",
        "partOfSpeech":  "동사구",
        "meaning":  "처분하다, 없애다",
        "relatedForms":  "disposal (명) 처분, 폐기",
        "paraphrase":  [
                           "discard",
                           "dump",
                           "throw away",
                           "get rid of"
                       ],
        "exampleEn":  "dispose of nuclear waste",
        "exampleKo":  "핵폐기물을 처리하다",
        "memo":  ""
    },
    {
        "id":  "d10-47",
        "day":  "Day 10",
        "no":  "47",
        "word":  "neglect",
        "phonetic":  "[niglékt]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "방치하다, 소홀히 하다 / 방치, 소홀",
        "relatedForms":  "negligible (형) 무시해도 좋을 정도의, 하찮은",
        "paraphrase":  [
                           "ignore",
                           "disregard"
                       ],
        "exampleEn":  "neglect the maintenance of his car",
        "exampleKo":  "그의 차의 정비를 소홀히 하다",
        "memo":  ""
    },
    {
        "id":  "d10-48",
        "day":  "Day 10",
        "no":  "48",
        "word":  "excel",
        "phonetic":  "[iksél]",
        "partOfSpeech":  "동사",
        "meaning":  "뛰어나다, 탁월하다",
        "relatedForms":  "excellent (형) 뛰어난, 탁월한",
        "paraphrase":  [
                           "be superior"
                       ],
        "exampleEn":  "excel at customer service",
        "exampleKo":  "고객 서비스에 뛰어나다",
        "memo":  ""
    },
    {
        "id":  "d10-49",
        "day":  "Day 10",
        "no":  "49",
        "word":  "norm",
        "phonetic":  "[nɔːrm]",
        "partOfSpeech":  "명사",
        "meaning":  "규범, 표준",
        "relatedForms":  "normal (형) 보통의, 정상적인",
        "paraphrase":  [
                           "standard"
                       ],
        "exampleEn":  "break social norms",
        "exampleKo":  "사회 규범을 어기다",
        "memo":  ""
    },
    {
        "id":  "d10-50",
        "day":  "Day 10",
        "no":  "50",
        "word":  "overwhelm",
        "phonetic":  "[òuvərhwélm]",
        "partOfSpeech":  "동사",
        "meaning":  "압도하다",
        "relatedForms":  "overwhelming (형) 압도적인, 강력한",
        "paraphrase":  [
                           "overpower"
                       ],
        "exampleEn":  "be overwhelmed by the amount of work",
        "exampleKo":  "일의 양에 압도되다",
        "memo":  ""
    },
  {
        "id":  "d11-01",
        "day":  "Day 11",
        "no":  "01",
        "word":  "patron",
        "phonetic":  "[péitrən]",
        "partOfSpeech":  "명사",
        "meaning":  "(예술 등) 후원자 / 고객",
        "relatedForms":  "patronize (동) 애용하다",
        "paraphrase":  [
                           "supporter",
                           "customer"
                       ],
        "exampleEn":  "A wealthy patron donated $1 million to the museum.",
        "exampleKo":  "부유한 후원자가 박물관에 100만 달러를 기부했다.",
        "memo":  ""
    },
    {
        "id":  "d11-02",
        "day":  "Day 11",
        "no":  "02",
        "word":  "explore",
        "phonetic":  "[iksplɔ́ːr]",
        "partOfSpeech":  "동사",
        "meaning":  "탐험하다 / 탐구하다, 연구하다",
        "relatedForms":  "exploration (명) 탐험; 탐구, 연구",
        "paraphrase":  [
                           "tour",
                           "investigate",
                           "inspect",
                           "examine",
                           "research"
                       ],
        "exampleEn":  "explore new places in the world",
        "exampleKo":  "세계의 새로운 곳을 탐험하다",
        "memo":  "explore new ways to increase profits (이익을 늘리기 위한 새로운 방법을 연구하다)"
    },
    {
        "id":  "d11-03",
        "day":  "Day 11",
        "no":  "03",
        "word":  "renowned",
        "phonetic":  "[rináund]",
        "partOfSpeech":  "형용사",
        "meaning":  "유명한, 명성이 있는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "famous",
                           "notable",
                           "well-known",
                           "celebrated"
                       ],
        "exampleEn":  "an internationally renowned artist",
        "exampleKo":  "국제적으로 유명한 예술가",
        "memo":  ""
    },
    {
        "id":  "d11-04",
        "day":  "Day 11",
        "no":  "04",
        "word":  "suited",
        "phonetic":  "[sjúːtid]",
        "partOfSpeech":  "형용사",
        "meaning":  "적합한, 어울리는",
        "relatedForms":  "suit (동) 알맞다, 적합하다",
        "paraphrase":  [
                           "right",
                           "appropriate",
                           "adapted",
                           "proper"
                       ],
        "exampleEn":  "Michael is suited for the position.",
        "exampleKo":  "마이클이 그 직책에 적합하다.",
        "memo":  "지텔프 동의어: The tools were not suited for the job. -> (b) adapted"
    },
    {
        "id":  "d11-05",
        "day":  "Day 11",
        "no":  "05",
        "word":  "inspire",
        "phonetic":  "[inspáiər]",
        "partOfSpeech":  "동사",
        "meaning":  "고무시키다, 영감을 주다",
        "relatedForms":  "inspiration (명) 영감(을 주는 것)",
        "paraphrase":  [
                           "motivate",
                           "encourage",
                           "stir",
                           "stimulate",
                           "spur",
                           "influence"
                       ],
        "exampleEn":  "The experience inspired Jenny to start writing poetry.",
        "exampleKo":  "그 경험은 제니가 시를 쓰기 시작하도록 고무시켰다.",
        "memo":  ""
    },
    {
        "id":  "d11-06",
        "day":  "Day 11",
        "no":  "06",
        "word":  "respective",
        "phonetic":  "[rispéktiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "각각의, 각자의",
        "relatedForms":  "respectively (부) 각각, 각자",
        "paraphrase":  [
                           "individual",
                           "own",
                           "separate"
                       ],
        "exampleEn":  "The employees went back to their respective offices.",
        "exampleKo":  "직원들은 각자의 사무실로 돌아갔다.",
        "memo":  ""
    },
    {
        "id":  "d11-07",
        "day":  "Day 11",
        "no":  "07",
        "word":  "critic",
        "phonetic":  "[krítik]",
        "partOfSpeech":  "명사",
        "meaning":  "비평가, 평론가",
        "relatedForms":  "critical (형) 비판적인; 아주 중요한",
        "paraphrase":  [
                           "pundit"
                       ],
        "exampleEn":  "The film was highly regarded by critics.",
        "exampleKo":  "그 영화는 비평가들로부터 높은 평가를 받았다.",
        "memo":  ""
    },
    {
        "id":  "d11-08",
        "day":  "Day 11",
        "no":  "08",
        "word":  "advanced",
        "phonetic":  "[ædvǽnst]",
        "partOfSpeech":  "형용사",
        "meaning":  "진보한, 첨단의 / 상급의",
        "relatedForms":  "advancement (명) 진보, 발전, advance (동) 나아가다, 발전하다",
        "paraphrase":  [
                           "sophisticated",
                           "up-to-date",
                           "modern",
                           "state-of-the-art",
                           "high-level"
                       ],
        "exampleEn":  "advanced technology",
        "exampleKo":  "첨단 기술",
        "memo":  "advanced students (상급반 학생들)"
    },
    {
        "id":  "d11-09",
        "day":  "Day 11",
        "no":  "09",
        "word":  "consistent",
        "phonetic":  "[kənsístənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "일관된, 한결같은 / 일치하는 (~with)",
        "relatedForms":  "consistency (명) 일관성",
        "paraphrase":  [
                           "steady",
                           "constant",
                           "persistent",
                           "regular",
                           "agreeing",
                           "compatible",
                           "harmonious"
                       ],
        "exampleEn":  "Tyler has a consistent pattern of being late.",
        "exampleKo":  "타일러는 지각하는 버릇이 한결같다.",
        "memo":  "The results of the study were consistent with the hypothesis. (연구 결과는 가설과 일치했다.)"
    },
    {
        "id":  "d11-10",
        "day":  "Day 11",
        "no":  "10",
        "word":  "appeal",
        "phonetic":  "[əpíːl]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "호소, 간청 / 매력 / 호소(간청)하다 / ~에게 어필하다, 매력적이다",
        "relatedForms":  "appealing (형) 어필하는, 매력적인",
        "paraphrase":  [
                           "request",
                           "plea",
                           "charm",
                           "attraction",
                           "attractiveness",
                           "plead"
                       ],
        "exampleEn":  "appeal to a wide audience",
        "exampleKo":  "많은 사람들에게 어필하다",
        "memo":  ""
    },
    {
        "id":  "d11-11",
        "day":  "Day 11",
        "no":  "11",
        "word":  "amenity",
        "phonetic":  "[əménəti]",
        "partOfSpeech":  "명사",
        "meaning":  "편의 시설",
        "relatedForms":  "-",
        "paraphrase":  [
                           "facility",
                           "convenience"
                       ],
        "exampleEn":  "The hotel offers many technological amenities, such as free Wi-Fi.",
        "exampleKo":  "호텔은 무료 와이파이와 같은 많은 기술적 편의 시설을 제공한다.",
        "memo":  ""
    },
    {
        "id":  "d11-12",
        "day":  "Day 11",
        "no":  "12",
        "word":  "housekeeper",
        "phonetic":  "[háuskìːpər]",
        "partOfSpeech":  "명사",
        "meaning":  "가사도우미, 관리인",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "hire a housekeeper",
        "exampleKo":  "가사 도우미를 고용하다",
        "memo":  ""
    },
    {
        "id":  "d11-13",
        "day":  "Day 11",
        "no":  "13",
        "word":  "delegate",
        "phonetic":  "[déligət] / [déligèit]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "대표, 사절 / (업무, 권한 등을) 위임하다",
        "relatedForms":  "delegation (명) 대표단; 위임",
        "paraphrase":  [
                           "representative",
                           "deputy",
                           "assign",
                           "entrust"
                       ],
        "exampleEn":  "Johnson was his company's delegate to the conference.",
        "exampleKo":  "존슨은 콘퍼런스에서 회사의 대표였다.",
        "memo":  "지텔프 동의어: In order to be productive, Lauren learned how to delegate some tasks. -> (a) assign | delegate responsibilities to team members (팀원들에게 업무를 위임하다)"
    },
    {
        "id":  "d11-14",
        "day":  "Day 11",
        "no":  "14",
        "word":  "ambiguous",
        "phonetic":  "[æmbígjuəs]",
        "partOfSpeech":  "형용사",
        "meaning":  "애매모호한, 중의적인",
        "relatedForms":  "ambiguity (명) 모호성, 중의성",
        "paraphrase":  [
                           "unclear",
                           "uncertain",
                           "vague",
                           "obscure"
                       ],
        "exampleEn":  "The terms of the contract were ambiguous.",
        "exampleKo":  "계약 조건이 모호했다.",
        "memo":  ""
    },
    {
        "id":  "d11-15",
        "day":  "Day 11",
        "no":  "15",
        "word":  "compatible",
        "phonetic":  "[kəmpǽtəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "호환 가능한 / 양립할 수 있는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "consistent"
                       ],
        "exampleEn":  "The software is not compatible with my computer.",
        "exampleKo":  "그 소프트웨어는 내 컴퓨터와 호환되지 않는다.",
        "memo":  "Your theory is compatible with my belief. (당신의 이론은 나의 신념과 양립할 수 있다.)"
    },
    {
        "id":  "d11-16",
        "day":  "Day 11",
        "no":  "16",
        "word":  "task",
        "phonetic":  "[tæsk]",
        "partOfSpeech":  "명사",
        "meaning":  "임무, 과제",
        "relatedForms":  "-",
        "paraphrase":  [
                           "duty",
                           "assignment",
                           "job"
                       ],
        "exampleEn":  "complete complex tasks successfully",
        "exampleKo":  "복잡한 과제를 성공적으로 완료하다",
        "memo":  ""
    },
    {
        "id":  "d11-17",
        "day":  "Day 11",
        "no":  "17",
        "word":  "absence",
        "phonetic":  "[ǽbsəns]",
        "partOfSpeech":  "명사",
        "meaning":  "부재, 결석",
        "relatedForms":  "absent (형) 부재한, 결석한",
        "paraphrase":  [
                           "unavailability",
                           "nonexistence"
                       ],
        "exampleEn":  "absence of predators",
        "exampleKo":  "포식자의 부재",
        "memo":  "숙어: leave of absence (휴가)"
    },
    {
        "id":  "d11-18",
        "day":  "Day 11",
        "no":  "18",
        "word":  "duration",
        "phonetic":  "[djuəréiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "지속 기간",
        "relatedForms":  "-",
        "paraphrase":  [
                           "period",
                           "length",
                           "span"
                       ],
        "exampleEn":  "for the duration of my vacation",
        "exampleKo":  "나의 휴가 기간 동안",
        "memo":  ""
    },
    {
        "id":  "d11-19",
        "day":  "Day 11",
        "no":  "19",
        "word":  "edible",
        "phonetic":  "[édəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "먹을 수 있는, 식용의",
        "relatedForms":  "inedible (형) 먹을 수 없는, 식용이 아닌",
        "paraphrase":  [
                           "harmless"
                       ],
        "exampleEn":  "edible plants",
        "exampleKo":  "먹을 수 있는 식물",
        "memo":  ""
    },
    {
        "id":  "d11-20",
        "day":  "Day 11",
        "no":  "20",
        "word":  "induce",
        "phonetic":  "[indjúːs]",
        "partOfSpeech":  "동사",
        "meaning":  "설득해서 ~하게 만들다 / 유발하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "get",
                           "persuade",
                           "encourage",
                           "convince",
                           "cause",
                           "generate",
                           "produce",
                           "lead to"
                       ],
        "exampleEn":  "The boss induced Edgar to take the job.",
        "exampleKo":  "상사는 에드가를 설득해서 그 일을 맡도록 만들었다.",
        "memo":  "지텔프 동의어: The strong smell of bleach may induce a headache. -> (b) cause | induce vomiting (구토를 유발하다)"
    },
    {
        "id":  "d11-21",
        "day":  "Day 11",
        "no":  "21",
        "word":  "lack",
        "phonetic":  "[læk]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "부족 / 부족하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "shortage",
                           "deficiency",
                           "insufficiency",
                           "need",
                           "miss"
                       ],
        "exampleEn":  "lack of discipline",
        "exampleKo":  "규율의 부족",
        "memo":  "The candidate lacked experience. (그 지원자는 경험이 부족했다.)"
    },
    {
        "id":  "d11-22",
        "day":  "Day 11",
        "no":  "22",
        "word":  "enforce",
        "phonetic":  "[infɔ́ːrs]",
        "partOfSpeech":  "동사",
        "meaning":  "(규칙, 법 등을) 실시하다, 시행하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "implement",
                           "execute",
                           "administer"
                       ],
        "exampleEn":  "enforce a law",
        "exampleKo":  "법을 시행하다",
        "memo":  ""
    },
    {
        "id":  "d11-23",
        "day":  "Day 11",
        "no":  "23",
        "word":  "back",
        "phonetic":  "[bæk]",
        "partOfSpeech":  "부사/명사/동사",
        "meaning":  "뒤로, 다시 / 등, 뒷면 / 지지하다, 뒷받침하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "backwards",
                           "again",
                           "rear side",
                           "support",
                           "help",
                           "assist"
                       ],
        "exampleEn":  "I am moving back to my hometown.",
        "exampleKo":  "나는 고향으로 돌아간다.",
        "memo":  "The history of the city dates back to the early 1800s. (그 도시의 역사는 1800년대 초로 거슬러 올라간다.) | A scientific theory should be backed by verified data. (과학 이론은 검증된 자료에 의해 뒷받침되어야 한다.)"
    },
    {
        "id":  "d11-24",
        "day":  "Day 11",
        "no":  "24",
        "word":  "editorial",
        "phonetic":  "[èditɔ́ːriəl]",
        "partOfSpeech":  "형용사/명사",
        "meaning":  "편집의 / (신문의) 사설",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "an editorial assistant",
        "exampleKo":  "편집 보조",
        "memo":  ""
    },
    {
        "id":  "d11-25",
        "day":  "Day 11",
        "no":  "25",
        "word":  "enrollment",
        "phonetic":  "[inróulmənt]",
        "partOfSpeech":  "명사",
        "meaning":  "등록, 입학",
        "relatedForms":  "enroll (동) 등록하다, 입학하다",
        "paraphrase":  [
                           "acceptance",
                           "admission"
                       ],
        "exampleEn":  "requirements for enrollment in college",
        "exampleKo":  "대학 입학을 위한 요건",
        "memo":  ""
    },
    {
        "id":  "d11-26",
        "day":  "Day 11",
        "no":  "26",
        "word":  "drawback",
        "phonetic":  "[drɔ́ːbæ̀k]",
        "partOfSpeech":  "명사",
        "meaning":  "결점, 단점",
        "relatedForms":  "-",
        "paraphrase":  [
                           "disadvantage",
                           "difficulty",
                           "trouble",
                           "downside"
                       ],
        "exampleEn":  "One drawback to living in the city is the noise.",
        "exampleKo":  "도시에서 사는 것의 한 가지 단점은 소음이다.",
        "memo":  ""
    },
    {
        "id":  "d11-27",
        "day":  "Day 11",
        "no":  "27",
        "word":  "imitate",
        "phonetic":  "[ímətèit]",
        "partOfSpeech":  "동사",
        "meaning":  "모방하다, 베끼다",
        "relatedForms":  "imitation (명) 모방; 모조품",
        "paraphrase":  [
                           "copy",
                           "emulate",
                           "follow"
                       ],
        "exampleEn":  "Children imitate what they see.",
        "exampleKo":  "아이들은 자신이 보는 것을 따라한다.",
        "memo":  "지텔프 동의어: Adam is working hard to imitate the success of his favorite author. -> (b) emulate"
    },
    {
        "id":  "d11-28",
        "day":  "Day 11",
        "no":  "28",
        "word":  "ancestor",
        "phonetic":  "[ǽnsestər]",
        "partOfSpeech":  "명사",
        "meaning":  "조상, 선조",
        "relatedForms":  "-",
        "paraphrase":  [
                           "forefather"
                       ],
        "exampleEn":  "Mary's ancestors were farmers in Ireland.",
        "exampleKo":  "메리의 조상은 아일랜드의 농부였다.",
        "memo":  ""
    },
    {
        "id":  "d11-29",
        "day":  "Day 11",
        "no":  "29",
        "word":  "disaster",
        "phonetic":  "[dizǽstər]",
        "partOfSpeech":  "명사",
        "meaning":  "재난, 재앙",
        "relatedForms":  "disastrous (형) 끔찍한",
        "paraphrase":  [
                           "calamity",
                           "catastrophe"
                       ],
        "exampleEn":  "natural disasters",
        "exampleKo":  "자연 재해",
        "memo":  ""
    },
    {
        "id":  "d11-30",
        "day":  "Day 11",
        "no":  "30",
        "word":  "pursue",
        "phonetic":  "[pərsúː]",
        "partOfSpeech":  "동사",
        "meaning":  "추구하다, 계속해 나가다",
        "relatedForms":  "pursuit (명) 추구",
        "paraphrase":  [
                           "seek",
                           "follow",
                           "engage in"
                       ],
        "exampleEn":  "pursue a career in teaching",
        "exampleKo":  "교직에서의 커리어를 추구하다",
        "memo":  "Lauren is pursuing her passion for music. (로렌은 음악에 대한 열정을 추구하고 있다.)"
    },
    {
        "id":  "d11-31",
        "day":  "Day 11",
        "no":  "31",
        "word":  "alarming",
        "phonetic":  "[əlάːrmiŋ]",
        "partOfSpeech":  "형용사",
        "meaning":  "걱정스러울 정도의, 놀랄 정도의",
        "relatedForms":  "alarm (명) 알람; 경보, (동) 걱정시키다, 놀라게 하다",
        "paraphrase":  [
                           "worrying",
                           "shocking",
                           "disturbing"
                       ],
        "exampleEn":  "an alarming rise in Earth's temperatures",
        "exampleKo":  "지구 기온의 걱정스러울 정도의 상승",
        "memo":  "지텔프 동의어: The world's climate is changing at an alarming rate. -> (b) worrying"
    },
    {
        "id":  "d11-32",
        "day":  "Day 11",
        "no":  "32",
        "word":  "extraordinary",
        "phonetic":  "[ikstrɔ́ːrdənèri]",
        "partOfSpeech":  "형용사",
        "meaning":  "이례적인, 특이한 / 비범한, 예사롭지 않은",
        "relatedForms":  "-",
        "paraphrase":  [
                           "unusual",
                           "odd",
                           "strange",
                           "special",
                           "outstanding",
                           "exceptional",
                           "amazing",
                           "phenomenal",
                           "marvellous"
                       ],
        "exampleEn":  "an extraordinary story",
        "exampleKo":  "특이한 이야기",
        "memo":  "an extraordinary ability (비범한 능력)"
    },
    {
        "id":  "d11-33",
        "day":  "Day 11",
        "no":  "33",
        "word":  "discontinue",
        "phonetic":  "[dìskəntínjuː]",
        "partOfSpeech":  "동사",
        "meaning":  "중단하다 / 생산을 중단하다, 단종하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "end",
                           "stop",
                           "finish",
                           "terminate"
                       ],
        "exampleEn":  "discontinue a service",
        "exampleKo":  "서비스를 중단하다",
        "memo":  "a discontinued product (단종된 상품)"
    },
    {
        "id":  "d11-34",
        "day":  "Day 11",
        "no":  "34",
        "word":  "overdue",
        "phonetic":  "[òuvərdjúː]",
        "partOfSpeech":  "형용사",
        "meaning":  "연체된, 기한이 지난",
        "relatedForms":  "-",
        "paraphrase":  [
                           "unpaid",
                           "payable",
                           "delayed",
                           "late"
                       ],
        "exampleEn":  "The payment is a week overdue.",
        "exampleKo":  "지불 기한이 일주일이 지났다.",
        "memo":  ""
    },
    {
        "id":  "d11-35",
        "day":  "Day 11",
        "no":  "35",
        "word":  "venture",
        "phonetic":  "[véntʃər]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "벤처 (사업) / <위험을 감수하며> ~에 가보다, 뛰어들다",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "a successful business joint venture",
        "exampleKo":  "성공적인 공동 사업 벤처",
        "memo":  "venture into the online business (온라인 사업으로 뛰어들다)"
    },
    {
        "id":  "d11-36",
        "day":  "Day 11",
        "no":  "36",
        "word":  "ethic",
        "phonetic":  "[éθik]",
        "partOfSpeech":  "명사",
        "meaning":  "윤리, 도덕",
        "relatedForms":  "ethical (형) 윤리적인, 도덕적인",
        "paraphrase":  [

                       ],
        "exampleEn":  "work ethic",
        "exampleKo":  "직장 윤리",
        "memo":  ""
    },
    {
        "id":  "d11-37",
        "day":  "Day 11",
        "no":  "37",
        "word":  "supplies",
        "phonetic":  "[səpláiz]",
        "partOfSpeech":  "명사",
        "meaning":  "필수품, 물자",
        "relatedForms":  "-",
        "paraphrase":  [
                           "necessities"
                       ],
        "exampleEn":  "medical supplies",
        "exampleKo":  "의약품",
        "memo":  "office supplies (사무 용품)"
    },
    {
        "id":  "d11-38",
        "day":  "Day 11",
        "no":  "38",
        "word":  "objective",
        "phonetic":  "[əbdʒéktiv]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "목적, 목표 / 객관적인",
        "relatedForms":  "objectively (부) 객관적으로",
        "paraphrase":  [
                           "goal",
                           "purpose",
                           "aim",
                           "object",
                           "target"
                       ],
        "exampleEn":  "Alan achieved his objective of becoming an accountant.",
        "exampleKo":  "앨런은 회계사가 되겠다는 목표를 달성했다.",
        "memo":  "지텔프 동의어: The main objective of the research was to find a cure for cancer. -> (a) goal | an objective assessment (객관적인 평가)"
    },
    {
        "id":  "d11-39",
        "day":  "Day 11",
        "no":  "39",
        "word":  "apply",
        "phonetic":  "[əplái]",
        "partOfSpeech":  "동사",
        "meaning":  "지원하다, 신청하다 (~for) / 적용하다, 적용되다 / 바르다",
        "relatedForms":  "application (명) 지원(서), 신청(서); 적용, applicant (명) 지원자, 신청자",
        "paraphrase":  [
                           "use",
                           "implement",
                           "employ",
                           "relate",
                           "put on"
                       ],
        "exampleEn":  "apply for a loan",
        "exampleKo":  "대출을 신청하다",
        "memo":  "The rules do not apply to you. (그 규칙들은 당신에게 적용되지 않습니다.) | apply sunscreen (자외선 차단제를 바르다)"
    },
    {
        "id":  "d11-40",
        "day":  "Day 11",
        "no":  "40",
        "word":  "expert",
        "phonetic":  "[ékspəːrt]",
        "partOfSpeech":  "명사",
        "meaning":  "전문가",
        "relatedForms":  "expertise (명) 전문성, 전문 지식",
        "paraphrase":  [
                           "specialist",
                           "professional",
                           "guru"
                       ],
        "exampleEn":  "a security expert",
        "exampleKo":  "보안 전문가",
        "memo":  ""
    },
    {
        "id":  "d11-41",
        "day":  "Day 11",
        "no":  "41",
        "word":  "evaluate",
        "phonetic":  "[ivǽljuèit]",
        "partOfSpeech":  "동사",
        "meaning":  "평가하다",
        "relatedForms":  "evaluation (명) 평가",
        "paraphrase":  [
                           "assess",
                           "judge",
                           "appraise",
                           "value"
                       ],
        "exampleEn":  "evaluate the status of a building",
        "exampleKo":  "건물의 상태를 평가하다",
        "memo":  ""
    },
    {
        "id":  "d11-42",
        "day":  "Day 11",
        "no":  "42",
        "word":  "currently",
        "phonetic":  "[kə́ːrəntli]",
        "partOfSpeech":  "부사",
        "meaning":  "현재",
        "relatedForms":  "current (형) 현재의",
        "paraphrase":  [
                           "now",
                           "at the moment"
                       ],
        "exampleEn":  "I am currently working as a bank teller.",
        "exampleKo":  "저는 현재 은행원으로 일하고 있습니다.",
        "memo":  ""
    },
    {
        "id":  "d11-43",
        "day":  "Day 11",
        "no":  "43",
        "word":  "assemble",
        "phonetic":  "[əsémbl]",
        "partOfSpeech":  "동사",
        "meaning":  "모이다, ~을 모으다 / (가구나 기계 등) 조립하다",
        "relatedForms":  "assembly (명) 집회; 조립",
        "paraphrase":  [
                           "meet",
                           "gather",
                           "collect",
                           "convene",
                           "connect",
                           "construct",
                           "put together"
                       ],
        "exampleEn":  "assemble a robot",
        "exampleKo":  "로봇을 조립하다",
        "memo":  "The executives assembled in a meeting room. (임원들이 회의실에 모였다.)"
    },
    {
        "id":  "d11-44",
        "day":  "Day 11",
        "no":  "44",
        "word":  "diverse",
        "phonetic":  "[daivə́ːrs]",
        "partOfSpeech":  "형용사",
        "meaning":  "다양한",
        "relatedForms":  "diversity (명) 다양성, diversify (동) 다양화하다",
        "paraphrase":  [
                           "various",
                           "varied",
                           "mixed"
                       ],
        "exampleEn":  "a group of people with diverse backgrounds",
        "exampleKo":  "다양한 배경을 가진 사람들의 모임",
        "memo":  ""
    },
    {
        "id":  "d11-45",
        "day":  "Day 11",
        "no":  "45",
        "word":  "execute",
        "phonetic":  "[éksikjùːt]",
        "partOfSpeech":  "동사",
        "meaning":  "실행하다, 수행하다 / 처형하다, 사형하다",
        "relatedForms":  "execution (명) 실행; 처형",
        "paraphrase":  [
                           "implement",
                           "perform",
                           "achieve",
                           "obey",
                           "do",
                           "fulfill",
                           "administer",
                           "kill",
                           "hang"
                       ],
        "exampleEn":  "The dog successfully executed its master's commands.",
        "exampleKo":  "그 개는 성공적으로 주인의 명령을 실행했다.",
        "memo":  "지텔프 동의어: The prisoners were executed for their part in the rebellion. -> (a) killed | The man was executed for being a spy. (그 남자는 스파이라는 이유로 처형당했다.)"
    },
    {
        "id":  "d11-46",
        "day":  "Day 11",
        "no":  "46",
        "word":  "yield",
        "phonetic":  "[jiːld]",
        "partOfSpeech":  "동사",
        "meaning":  "(결과, 수익 등을) 내다, 산출하다 / ~에 응하다, 굴복하다 (~to)",
        "relatedForms":  "-",
        "paraphrase":  [
                           "produce",
                           "generate",
                           "submit",
                           "surrender",
                           "give in"
                       ],
        "exampleEn":  "The new study yielded interesting results.",
        "exampleKo":  "새로운 연구는 흥미로운 결과를 낳았다.",
        "memo":  "yield to demands (요구에 응하다)"
    },
    {
        "id":  "d11-47",
        "day":  "Day 11",
        "no":  "47",
        "word":  "clarify",
        "phonetic":  "[klǽrəfài]",
        "partOfSpeech":  "동사",
        "meaning":  "명료하게 설명하다, 분명히 하다",
        "relatedForms":  "clarification (명) (명료한) 설명",
        "paraphrase":  [
                           "explain",
                           "illuminate",
                           "elucidate"
                       ],
        "exampleEn":  "Please clarify how I can help you.",
        "exampleKo":  "제가 당신을 어떻게 도울 수 있는지 명확히 해 주세요.",
        "memo":  ""
    },
    {
        "id":  "d11-48",
        "day":  "Day 11",
        "no":  "48",
        "word":  "facilitate",
        "phonetic":  "[fəsílətèit]",
        "partOfSpeech":  "동사",
        "meaning":  "원활하게 만들다, 용이하게 하다",
        "relatedForms":  "facilitation (명) 촉진, 용이하게 함",
        "paraphrase":  [
                           "promote",
                           "ease",
                           "expedite",
                           "speed up",
                           "accelerate"
                       ],
        "exampleEn":  "facilitate learning",
        "exampleKo":  "학습을 용이하게 하다",
        "memo":  "facilitate growth (성장을 용이하게 하다)"
    },
    {
        "id":  "d11-49",
        "day":  "Day 11",
        "no":  "49",
        "word":  "characteristic",
        "phonetic":  "[kæ̀riktərístik]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "특성, 특징 / 전형적인, 특유의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "trait",
                           "feature",
                           "property",
                           "typical",
                           "special"
                       ],
        "exampleEn":  "characteristics of tropical fish",
        "exampleKo":  "열대어의 특징",
        "memo":  "지텔프 동의어: Larry's easygoing attitude is characteristic of him. -> (b) typical"
    },
    {
        "id":  "d11-50",
        "day":  "Day 11",
        "no":  "50",
        "word":  "eliminate",
        "phonetic":  "[ilímənèit]",
        "partOfSpeech":  "동사",
        "meaning":  "없애다, 제거하다",
        "relatedForms":  "elimination (명) 제거",
        "paraphrase":  [
                           "remove",
                           "get rid of",
                           "eradicate",
                           "delete"
                       ],
        "exampleEn":  "eliminate the risk of fire",
        "exampleKo":  "화재의 위험을 없애다",
        "memo":  "eliminate all the unnecessary items (불필요한 물건을 모두 없애다)"
    },
  {
        "id":  "d12-01",
        "day":  "Day 12",
        "no":  "01",
        "word":  "assume",
        "phonetic":  "[əsúːm]",
        "partOfSpeech":  "동사",
        "meaning":  "~라고 추정하다, 생각하다 / (책임 등) 맡다",
        "relatedForms":  "assumption (명) 추정; 인수",
        "paraphrase":  [
                           "believe",
                           "presume",
                           "suppose",
                           "hypothesize",
                           "accept",
                           "take on",
                           "undertake"
                       ],
        "exampleEn":  "Emily assumed that David would be late.",
        "exampleKo":  "에밀리는 데이비드가 늦을 것이라고 생각했다.",
        "memo":  "assume the role of a leader (지도자의 역할을 맡다)"
    },
    {
        "id":  "d12-02",
        "day":  "Day 12",
        "no":  "02",
        "word":  "delay",
        "phonetic":  "[diléi]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "지연, 연기 / 미루다, 연기하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "postpone",
                           "defer",
                           "put off"
                       ],
        "exampleEn":  "a delay in shipping",
        "exampleKo":  "배송 지연",
        "memo":  "delay the release of an album (앨범 발매를 연기하다)"
    },
    {
        "id":  "d12-03",
        "day":  "Day 12",
        "no":  "03",
        "word":  "install",
        "phonetic":  "[instɔ́ːl]",
        "partOfSpeech":  "동사",
        "meaning":  "설치하다",
        "relatedForms":  "installation (명) 설치",
        "paraphrase":  [
                           "set up"
                       ],
        "exampleEn":  "install a printer",
        "exampleKo":  "프린터를 설치하다",
        "memo":  ""
    },
    {
        "id":  "d12-04",
        "day":  "Day 12",
        "no":  "04",
        "word":  "institution",
        "phonetic":  "[ìnstitjúːʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "기관, 협회",
        "relatedForms":  "institute (명) 연구소",
        "paraphrase":  [
                           "establishment",
                           "congregation",
                           "organization",
                           "foundation"
                       ],
        "exampleEn":  "educational institutions",
        "exampleKo":  "교육 기관",
        "memo":  ""
    },
    {
        "id":  "d12-05",
        "day":  "Day 12",
        "no":  "05",
        "word":  "host",
        "phonetic":  "[houst]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "주최자, 개최자 / 주최하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "hold",
                           "provide",
                           "arrange"
                       ],
        "exampleEn":  "the host country of the Olympics",
        "exampleKo":  "올림픽 개최국",
        "memo":  "host a party (파티를 주최하다)"
    },
    {
        "id":  "d12-06",
        "day":  "Day 12",
        "no":  "06",
        "word":  "coincide",
        "phonetic":  "[kòuinsáid]",
        "partOfSpeech":  "동사",
        "meaning":  "동시에 일어나다 / 일치하다",
        "relatedForms":  "coincidence (명) 우연의 일치, 동시 발생",
        "paraphrase":  [
                           "agree",
                           "match"
                       ],
        "exampleEn":  "The full moon always coincides with a high tide.",
        "exampleKo":  "보름달은 항상 만조와 동시에 일어난다.",
        "memo":  "The results of the survey coincided with our expectations. (조사 결과는 우리의 예상과 일치했다.)"
    },
    {
        "id":  "d12-07",
        "day":  "Day 12",
        "no":  "07",
        "word":  "merit",
        "phonetic":  "[mérit]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "장점, 가치 / 받을 만하다, 받을 가치가 있다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "value",
                           "advantage",
                           "strength",
                           "virtue",
                           "deserve",
                           "earn",
                           "justify",
                           "warrant"
                       ],
        "exampleEn":  "have considerable merit",
        "exampleKo":  "상당한 가치가 있다",
        "memo":  "지텔프 동의어: Andrea has been working hard to merit a pay rise. -> (a) justify | The student's essay merits attention. (그 학생의 에세이는 주목받을 만하다.)"
    },
    {
        "id":  "d12-08",
        "day":  "Day 12",
        "no":  "08",
        "word":  "discrimination",
        "phonetic":  "[diskrìmənéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "차별",
        "relatedForms":  "discriminate (동) 차별하다",
        "paraphrase":  [
                           "unfairness",
                           "injustice"
                       ],
        "exampleEn":  "racial discrimination",
        "exampleKo":  "인종 차별",
        "memo":  ""
    },
    {
        "id":  "d12-09",
        "day":  "Day 12",
        "no":  "09",
        "word":  "evidence",
        "phonetic":  "[évidəns]",
        "partOfSpeech":  "명사",
        "meaning":  "증거",
        "relatedForms":  "evident (형) 명백한, 분명한",
        "paraphrase":  [
                           "proof"
                       ],
        "exampleEn":  "The article lacks evidence.",
        "exampleKo":  "그 기사는 증거가 부족하다.",
        "memo":  ""
    },
    {
        "id":  "d12-10",
        "day":  "Day 12",
        "no":  "10",
        "word":  "commence",
        "phonetic":  "[kəméns]",
        "partOfSpeech":  "동사",
        "meaning":  "시작되다, 시작하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "start",
                           "begin",
                           "open",
                           "initiate"
                       ],
        "exampleEn":  "The trial will commence on Monday.",
        "exampleKo":  "재판은 월요일에 시작될 것이다.",
        "memo":  "지텔프 동의어: The construction project will commence next week. -> (a) start"
    },
    {
        "id":  "d12-11",
        "day":  "Day 12",
        "no":  "11",
        "word":  "refuse",
        "phonetic":  "[rifjúːz]",
        "partOfSpeech":  "동사",
        "meaning":  "거절하다, 거부하다",
        "relatedForms":  "refusal (명) 거절, 거부",
        "paraphrase":  [
                           "decline",
                           "reject",
                           "turn down"
                       ],
        "exampleEn":  "refuse to release the information",
        "exampleKo":  "정보 공개를 거부하다",
        "memo":  ""
    },
    {
        "id":  "d12-12",
        "day":  "Day 12",
        "no":  "12",
        "word":  "exceptional",
        "phonetic":  "[iksépʃənl]",
        "partOfSpeech":  "형용사",
        "meaning":  "남다른, 특출난 / 예외적인",
        "relatedForms":  "exception (명) 예외",
        "paraphrase":  [
                           "special",
                           "excellent",
                           "remarkable",
                           "superior",
                           "extraordinary",
                           "unusual",
                           "odd",
                           "strange"
                       ],
        "exampleEn":  "have an exceptional talent for dance",
        "exampleKo":  "춤에 특출난 재능이 있다",
        "memo":  "exceptional circumstances (예외적인 상황)"
    },
    {
        "id":  "d12-13",
        "day":  "Day 12",
        "no":  "13",
        "word":  "commodity",
        "phonetic":  "[kəmάdəti]",
        "partOfSpeech":  "명사",
        "meaning":  "상품",
        "relatedForms":  "-",
        "paraphrase":  [
                           "goods",
                           "products",
                           "merchandise"
                       ],
        "exampleEn":  "commodity prices",
        "exampleKo":  "상품 가격",
        "memo":  ""
    },
    {
        "id":  "d12-14",
        "day":  "Day 12",
        "no":  "14",
        "word":  "definitely",
        "phonetic":  "[défənitli]",
        "partOfSpeech":  "부사",
        "meaning":  "분명히, 틀림없이",
        "relatedForms":  "definite (형) 분명한, 틀림없는",
        "paraphrase":  [
                           "certainly",
                           "surely",
                           "clearly"
                       ],
        "exampleEn":  "The way people live will definitely change in the future.",
        "exampleKo":  "사람들이 사는 방식은 미래에 분명히 바뀔 것이다.",
        "memo":  ""
    },
    {
        "id":  "d12-15",
        "day":  "Day 12",
        "no":  "15",
        "word":  "brief",
        "phonetic":  "[briːf]",
        "partOfSpeech":  "형용사",
        "meaning":  "(시간이) 짧은, 잠시 동안의 / (글이) 간단한, 간결한",
        "relatedForms":  "briefly (부) 잠시; 간단하게",
        "paraphrase":  [
                           "short",
                           "temporary",
                           "momentary",
                           "concise"
                       ],
        "exampleEn":  "a brief period",
        "exampleKo":  "짧은 기간",
        "memo":  "a brief email (간결한 이메일)"
    },
    {
        "id":  "d12-16",
        "day":  "Day 12",
        "no":  "16",
        "word":  "confused",
        "phonetic":  "[kənfjúːzd]",
        "partOfSpeech":  "형용사",
        "meaning":  "혼란스러운",
        "relatedForms":  "confusion (명) 혼란",
        "paraphrase":  [
                           "puzzled",
                           "bewildered",
                           "perplexed"
                       ],
        "exampleEn":  "confused about what to do",
        "exampleKo":  "무엇을 해야 할지 혼란스러운",
        "memo":  ""
    },
    {
        "id":  "d12-17",
        "day":  "Day 12",
        "no":  "17",
        "word":  "flexible",
        "phonetic":  "[fléksəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "융통성 있는, 유연한",
        "relatedForms":  "flexibility (명) 융통성, 유연성",
        "paraphrase":  [
                           "compliant",
                           "pliable",
                           "adjustable"
                       ],
        "exampleEn":  "flexible working arrangements",
        "exampleKo":  "유연 근무제",
        "memo":  ""
    },
    {
        "id":  "d12-18",
        "day":  "Day 12",
        "no":  "18",
        "word":  "market",
        "phonetic":  "[mάːrkit]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "시장 / 수요 / 광고하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "demand",
                           "need"
                       ],
        "exampleEn":  "the stock market",
        "exampleKo":  "주식 시장",
        "memo":  "market a business (사업체를 홍보하다)"
    },
    {
        "id":  "d12-19",
        "day":  "Day 12",
        "no":  "19",
        "word":  "compensate",
        "phonetic":  "[kάmpənsèit]",
        "partOfSpeech":  "동사",
        "meaning":  "보상하다",
        "relatedForms":  "compensation (명) 보상",
        "paraphrase":  [
                           "repay",
                           "reimburse",
                           "make up"
                       ],
        "exampleEn":  "compensate for the damage to a car",
        "exampleKo":  "자동차의 손해를 배상하다",
        "memo":  ""
    },
    {
        "id":  "d12-20",
        "day":  "Day 12",
        "no":  "20",
        "word":  "evolve",
        "phonetic":  "[ivάlv]",
        "partOfSpeech":  "동사",
        "meaning":  "진화하다, 발전하다",
        "relatedForms":  "evolution (명) 진화, 발전",
        "paraphrase":  [
                           "develop",
                           "grow",
                           "advance",
                           "progress"
                       ],
        "exampleEn":  "Humans have evolved over millions of years.",
        "exampleKo":  "인간은 수백만 년에 걸쳐 진화해 왔다.",
        "memo":  ""
    },
    {
        "id":  "d12-21",
        "day":  "Day 12",
        "no":  "21",
        "word":  "persist",
        "phonetic":  "[pərsíst]",
        "partOfSpeech":  "동사",
        "meaning":  "지속되다, 계속하다",
        "relatedForms":  "persistence (명) 지속; 고집",
        "paraphrase":  [
                           "continue",
                           "last"
                       ],
        "exampleEn":  "The problem persists in our society today.",
        "exampleKo":  "오늘날에도 그 문제는 우리 사회에 남아 있다.",
        "memo":  "지텔프 동의어: Despite his ankle pain, Shawn persisted and finished the race. -> (b) continued"
    },
    {
        "id":  "d12-22",
        "day":  "Day 12",
        "no":  "22",
        "word":  "contrast",
        "phonetic":  "[kάntræst]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "차이, 대조 / 대조하다",
        "relatedForms":  "contrasting (형) 대조적인",
        "paraphrase":  [
                           "difference",
                           "comparison",
                           "compare"
                       ],
        "exampleEn":  "contrast two different types of treatment",
        "exampleKo":  "두 가지 다른 치료법을 대조하다",
        "memo":  "숙어: by contrast (대조적으로)"
    },
    {
        "id":  "d12-23",
        "day":  "Day 12",
        "no":  "23",
        "word":  "diminish",
        "phonetic":  "[dimíniʃ]",
        "partOfSpeech":  "동사",
        "meaning":  "줄다, 줄이다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "decrease",
                           "decline",
                           "wane",
                           "dwindle"
                       ],
        "exampleEn":  "The use of plastic bags has diminished in recent years.",
        "exampleKo":  "최근 몇 년 동안 비닐봉지의 사용이 줄어들었다.",
        "memo":  ""
    },
    {
        "id":  "d12-24",
        "day":  "Day 12",
        "no":  "24",
        "word":  "explicit",
        "phonetic":  "[iksplísit]",
        "partOfSpeech":  "형용사",
        "meaning":  "분명한, 명확한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "clear",
                           "overt"
                       ],
        "exampleEn":  "explicit instructions",
        "exampleKo":  "명확한 지시사항",
        "memo":  ""
    },
    {
        "id":  "d12-25",
        "day":  "Day 12",
        "no":  "25",
        "word":  "avid",
        "phonetic":  "[ǽvid]",
        "partOfSpeech":  "형용사",
        "meaning":  "열렬한, 열성적인",
        "relatedForms":  "-",
        "paraphrase":  [
                           "eager",
                           "enthusiastic",
                           "passionate",
                           "devoted"
                       ],
        "exampleEn":  "an avid reader",
        "exampleKo":  "열렬한 독자",
        "memo":  ""
    },
    {
        "id":  "d12-26",
        "day":  "Day 12",
        "no":  "26",
        "word":  "controversial",
        "phonetic":  "[kὰntrəvə́ːrʃəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "논란이 되는",
        "relatedForms":  "controversy (명) 논란, 논쟁",
        "paraphrase":  [
                           "disputed",
                           "disputable",
                           "debatable"
                       ],
        "exampleEn":  "the controversial issue of gun control",
        "exampleKo":  "논란이 되고 있는 총기 규제 문제",
        "memo":  ""
    },
    {
        "id":  "d12-27",
        "day":  "Day 12",
        "no":  "27",
        "word":  "thoroughly",
        "phonetic":  "[θə́ːrouli]",
        "partOfSpeech":  "부사",
        "meaning":  "철저히, 완벽하게",
        "relatedForms":  "thorough (형) 철저한, 빈틈없는",
        "paraphrase":  [
                           "carefully",
                           "completely",
                           "comprehensively"
                       ],
        "exampleEn":  "thoroughly prepare for exams",
        "exampleKo":  "시험을 철저히 준비하다",
        "memo":  ""
    },
    {
        "id":  "d12-28",
        "day":  "Day 12",
        "no":  "28",
        "word":  "fragile",
        "phonetic":  "[frǽdʒəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "부서지기 쉬운, 여린",
        "relatedForms":  "fragility (명) 연약함, 불안정함",
        "paraphrase":  [
                           "breakable",
                           "brittle",
                           "delicate",
                           "weak",
                           "frail"
                       ],
        "exampleEn":  "fragile glass",
        "exampleKo":  "깨지기 쉬운 유리",
        "memo":  "지텔프 동의어: Newly hatched snails are known to have fragile shells. -> (a) delicate"
    },
    {
        "id":  "d12-29",
        "day":  "Day 12",
        "no":  "29",
        "word":  "compile",
        "phonetic":  "[kəmpáil]",
        "partOfSpeech":  "동사",
        "meaning":  "(여러 자료를) 엮다, 편집하다",
        "relatedForms":  "compilation (명) 모음집; 편집",
        "paraphrase":  [
                           "gather",
                           "put together"
                       ],
        "exampleEn":  "compile all of the articles into a single document",
        "exampleKo":  "모든 기사를 하나의 문서로 정리하다",
        "memo":  ""
    },
    {
        "id":  "d12-30",
        "day":  "Day 12",
        "no":  "30",
        "word":  "relative",
        "phonetic":  "[rélətiv]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "혈연이나 결혼으로 맺어진 사람(부모, 배우자, 후손 등) / 상대적인",
        "relatedForms":  "relatively (부) 상대적으로",
        "paraphrase":  [
                           "comparative"
                       ],
        "exampleEn":  "close relatives",
        "exampleKo":  "가까운 친인척",
        "memo":  "There is a relative lack of information available. (이용할 수 있는 정보가 상대적으로 부족하다.)"
    },
    {
        "id":  "d12-31",
        "day":  "Day 12",
        "no":  "31",
        "word":  "restrict",
        "phonetic":  "[ristríkt]",
        "partOfSpeech":  "동사",
        "meaning":  "제한하다, 제약하다",
        "relatedForms":  "restriction (명) 제한, 제약",
        "paraphrase":  [
                           "impede",
                           "limit",
                           "restrain"
                       ],
        "exampleEn":  "restrict movement to prevent the spread of disease",
        "exampleKo":  "질병 확산을 막기 위해 이동을 제한하다",
        "memo":  "지텔프 동의어: This jacket may feel tight but doesn't restrict movement. -> (b) impede"
    },
    {
        "id":  "d12-32",
        "day":  "Day 12",
        "no":  "32",
        "word":  "oppose",
        "phonetic":  "[əpóuz]",
        "partOfSpeech":  "동사",
        "meaning":  "반대하다",
        "relatedForms":  "opposition (명) 반대, opponent (명) 적, 반대자",
        "paraphrase":  [
                           "counter",
                           "confront"
                       ],
        "exampleEn":  "oppose a new policy",
        "exampleKo":  "새 정책에 반대하다",
        "memo":  ""
    },
    {
        "id":  "d12-33",
        "day":  "Day 12",
        "no":  "33",
        "word":  "deserve",
        "phonetic":  "[dizə́ːrv]",
        "partOfSpeech":  "동사",
        "meaning":  "받을 만하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "merit",
                           "earn",
                           "justify"
                       ],
        "exampleEn":  "deserve good grades",
        "exampleKo":  "좋은 성적을 받을 만하다",
        "memo":  ""
    },
    {
        "id":  "d12-34",
        "day":  "Day 12",
        "no":  "34",
        "word":  "harmful",
        "phonetic":  "[hάːrmfəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "해로운",
        "relatedForms":  "harm (동) 해를 끼치다, (명) 피해",
        "paraphrase":  [
                           "damaging",
                           "adverse",
                           "detrimental",
                           "negative",
                           "hazardous"
                       ],
        "exampleEn":  "harmful effects of smoking",
        "exampleKo":  "흡연의 해로운 영향",
        "memo":  ""
    },
    {
        "id":  "d12-35",
        "day":  "Day 12",
        "no":  "35",
        "word":  "translate",
        "phonetic":  "[trænsléit]",
        "partOfSpeech":  "동사",
        "meaning":  "번역하다",
        "relatedForms":  "translation (명) 번역",
        "paraphrase":  [
                           "interpret",
                           "paraphrase"
                       ],
        "exampleEn":  "translate a sentence into Spanish",
        "exampleKo":  "문장을 스페인어로 번역하다",
        "memo":  ""
    },
    {
        "id":  "d12-36",
        "day":  "Day 12",
        "no":  "36",
        "word":  "refine",
        "phonetic":  "[rifáin]",
        "partOfSpeech":  "동사",
        "meaning":  "정제하다 / 개선하다, 다듬다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "purify",
                           "filter",
                           "improve",
                           "develop",
                           "perfect",
                           "hone"
                       ],
        "exampleEn":  "refine crude oil",
        "exampleKo":  "원유를 정제하다",
        "memo":  "지텔프 동의어: In order to refine her acting, Maria practiced in front of a mirror. -> (a) improve | refine the manufacturing process (제조 공정을 개선하다)"
    },
    {
        "id":  "d12-37",
        "day":  "Day 12",
        "no":  "37",
        "word":  "conceive",
        "phonetic":  "[kənsíːv]",
        "partOfSpeech":  "동사",
        "meaning":  "(마음속으로) 상상하다 / 임신하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "imagine",
                           "envisage"
                       ],
        "exampleEn":  "conceive the idea of going to the moon",
        "exampleKo":  "달에 가는 상상을 하다",
        "memo":  "conceive a child (아이를 가지다)"
    },
    {
        "id":  "d12-38",
        "day":  "Day 12",
        "no":  "38",
        "word":  "exploit",
        "phonetic":  "[iksplɔ́it]",
        "partOfSpeech":  "동사",
        "meaning":  "(부당하게) 이용하다, 착취하다",
        "relatedForms":  "exploitation (명) (부당한) 이용, 착취",
        "paraphrase":  [
                           "abuse",
                           "manipulate"
                       ],
        "exampleEn":  "exploit workers by paying low wages",
        "exampleKo":  "저임금으로 노동자를 착취하다",
        "memo":  ""
    },
    {
        "id":  "d12-39",
        "day":  "Day 12",
        "no":  "39",
        "word":  "fascinate",
        "phonetic":  "[fǽsənèit]",
        "partOfSpeech":  "동사",
        "meaning":  "마음을 사로잡다",
        "relatedForms":  "fascination (명) 매력, 매혹됨, fascinating (형) 매혹적인",
        "paraphrase":  [
                           "captivate",
                           "charm",
                           "delight"
                       ],
        "exampleEn":  "fascinate the audience",
        "exampleKo":  "관객의 마음을 사로잡다",
        "memo":  ""
    },
    {
        "id":  "d12-40",
        "day":  "Day 12",
        "no":  "40",
        "word":  "literary",
        "phonetic":  "[lítərèri]",
        "partOfSpeech":  "형용사",
        "meaning":  "문학의",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "literary fiction",
        "exampleKo":  "문학 소설",
        "memo":  ""
    },
    {
        "id":  "d12-41",
        "day":  "Day 12",
        "no":  "41",
        "word":  "persuade",
        "phonetic":  "[pərswéid]",
        "partOfSpeech":  "동사",
        "meaning":  "설득하다, 납득시키다",
        "relatedForms":  "persuasive (형) 설득력 있는",
        "paraphrase":  [
                           "convince",
                           "reassure"
                       ],
        "exampleEn":  "fail to persuade the investors",
        "exampleKo":  "투자자들을 설득하는 데 실패하다",
        "memo":  ""
    },
    {
        "id":  "d12-42",
        "day":  "Day 12",
        "no":  "42",
        "word":  "stable",
        "phonetic":  "[stéibl]",
        "partOfSpeech":  "형용사",
        "meaning":  "안정적인",
        "relatedForms":  "stability (명) 안정(성)",
        "paraphrase":  [
                           "secure",
                           "reliable",
                           "sound"
                       ],
        "exampleEn":  "a stable relationship",
        "exampleKo":  "안정적인 관계",
        "memo":  "지텔프 동의어: Charles needed to start investing for a stable future. -> (b) secure | a stable job (안정적인 직업)"
    },
    {
        "id":  "d12-43",
        "day":  "Day 12",
        "no":  "43",
        "word":  "defeat",
        "phonetic":  "[difíːt]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "물리치다, 패배시키다 / 패배",
        "relatedForms":  "-",
        "paraphrase":  [
                           "beat",
                           "destroy",
                           "overwhelm"
                       ],
        "exampleEn":  "defeat the opponent",
        "exampleKo":  "상대를 물리치다",
        "memo":  ""
    },
    {
        "id":  "d12-44",
        "day":  "Day 12",
        "no":  "44",
        "word":  "hierarchy",
        "phonetic":  "[háiərὰːrki]",
        "partOfSpeech":  "명사",
        "meaning":  "계급, 계층",
        "relatedForms":  "-",
        "paraphrase":  [
                           "ranking"
                       ],
        "exampleEn":  "The military has a strict hierarchy.",
        "exampleKo":  "군대에는 엄격한 계급 체계가 있다.",
        "memo":  ""
    },
    {
        "id":  "d12-45",
        "day":  "Day 12",
        "no":  "45",
        "word":  "independence",
        "phonetic":  "[ìndipéndəns]",
        "partOfSpeech":  "명사",
        "meaning":  "독립(성)",
        "relatedForms":  "independent (형) 독립적인",
        "paraphrase":  [
                           "autonomy",
                           "freedom"
                       ],
        "exampleEn":  "Independence Day",
        "exampleKo":  "독립 기념일",
        "memo":  "financial independence (경제적 독립)"
    },
    {
        "id":  "d12-46",
        "day":  "Day 12",
        "no":  "46",
        "word":  "occasion",
        "phonetic":  "[əkéiʒən]",
        "partOfSpeech":  "명사",
        "meaning":  "때, 경우 / 행사",
        "relatedForms":  "occasionally (부) 때때로, 가끔",
        "paraphrase":  [
                           "moment",
                           "time",
                           "event",
                           "function",
                           "celebration"
                       ],
        "exampleEn":  "be late on numerous occasions",
        "exampleKo":  "여러 차례 지각하다",
        "memo":  "special occasions (특별한 행사)"
    },
    {
        "id":  "d12-47",
        "day":  "Day 12",
        "no":  "47",
        "word":  "devote",
        "phonetic":  "[divóut]",
        "partOfSpeech":  "동사",
        "meaning":  "바치다, 쏟다",
        "relatedForms":  "devotion (명) 헌신, 전념",
        "paraphrase":  [
                           "dedicate",
                           "commit",
                           "give"
                       ],
        "exampleEn":  "devote time to developing a new product",
        "exampleKo":  "신제품 개발에 시간을 바치다",
        "memo":  ""
    },
    {
        "id":  "d12-48",
        "day":  "Day 12",
        "no":  "48",
        "word":  "identical",
        "phonetic":  "[aidéntikəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "동일한, 똑같은",
        "relatedForms":  "-",
        "paraphrase":  [
                           "equal",
                           "the same",
                           "duplicate"
                       ],
        "exampleEn":  "two identical DNAs",
        "exampleKo":  "동일한 두 개의 DNA",
        "memo":  ""
    },
    {
        "id":  "d12-49",
        "day":  "Day 12",
        "no":  "49",
        "word":  "territory",
        "phonetic":  "[térətɔ̀ːri]",
        "partOfSpeech":  "명사",
        "meaning":  "영토 / 영역",
        "relatedForms":  "-",
        "paraphrase":  [
                           "area",
                           "land",
                           "zone",
                           "sector"
                       ],
        "exampleEn":  "Puerto Rico is a U.S. territory.",
        "exampleKo":  "푸에르토리코는 미국 영토이다.",
        "memo":  "Cats mark their territory with urine. (고양이는 오줌으로 자신의 영역을 표시한다.)"
    },
    {
        "id":  "d12-50",
        "day":  "Day 12",
        "no":  "50",
        "word":  "seldom",
        "phonetic":  "[séldəm]",
        "partOfSpeech":  "부사",
        "meaning":  "거의 ~않는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "rarely"
                       ],
        "exampleEn":  "Timothy seldom reads books.",
        "exampleKo":  "티모시는 거의 책을 읽지 않는다.",
        "memo":  ""
    },
  {
        "id":  "d13-01",
        "day":  "Day 13",
        "no":  "01",
        "word":  "thrive",
        "phonetic":  "[θraiv]",
        "partOfSpeech":  "동사",
        "meaning":  "<식물 등> 잘 자라다 / <사업 등> 번창하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "succeed",
                           "excel",
                           "prosper",
                           "flourish"
                       ],
        "exampleEn":  "The plants are thriving in the new greenhouse.",
        "exampleKo":  "식물들이 새 온실에서 잘 자라고 있다.",
        "memo":  "지텔프 동의어: The school managed to thrive during the years of budget cuts. -> (a) succeed | The small town thrived on tourism. (그 작은 마을은 관광으로 번창했다.)"
    },
    {
        "id":  "d13-02",
        "day":  "Day 13",
        "no":  "02",
        "word":  "conform",
        "phonetic":  "[kənfɔ́ːrm]",
        "partOfSpeech":  "동사",
        "meaning":  "순응하다, (집단의) 다른 구성원들과 같이 행동하다 / <규칙, 법 등을> 준수하다, 따르다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "adjust",
                           "adapt"
                       ],
        "exampleEn":  "Carrie refused to conform to the masses.",
        "exampleKo":  "캐리는 대중을 따르는 것을 거부했다.",
        "memo":  "conform to safety standards (안전 기준을 준수하다)"
    },
    {
        "id":  "d13-03",
        "day":  "Day 13",
        "no":  "03",
        "word":  "hypothesis",
        "phonetic":  "[haipάθəsis]",
        "partOfSpeech":  "명사",
        "meaning":  "가설",
        "relatedForms":  "-",
        "paraphrase":  [
                           "assumption"
                       ],
        "exampleEn":  "confirm a hypothesis",
        "exampleKo":  "가설을 입증하다",
        "memo":  ""
    },
    {
        "id":  "d13-04",
        "day":  "Day 13",
        "no":  "04",
        "word":  "resident",
        "phonetic":  "[rézidənt]",
        "partOfSpeech":  "명사",
        "meaning":  "거주자, 주민",
        "relatedForms":  "residential (형) 주택지의; 거주용의, residence (명) 주택, 거주지",
        "paraphrase":  [
                           "inhabitant",
                           "tenant",
                           "occupant"
                       ],
        "exampleEn":  "Local residents were against the construction plan.",
        "exampleKo":  "지역 주민들은 건설 계획에 반대했다.",
        "memo":  ""
    },
    {
        "id":  "d13-05",
        "day":  "Day 13",
        "no":  "05",
        "word":  "differentiate",
        "phonetic":  "[dìfərénʃièit]",
        "partOfSpeech":  "동사",
        "meaning":  "구별하다, 식별하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "distinguish",
                           "separate",
                           "discern",
                           "segregate"
                       ],
        "exampleEn":  "Melissa can't differentiate between red and orange.",
        "exampleKo":  "멜리사는 붉은색과 주황색을 구별하지 못한다.",
        "memo":  ""
    },
    {
        "id":  "d13-06",
        "day":  "Day 13",
        "no":  "06",
        "word":  "handle",
        "phonetic":  "[hǽndl]",
        "partOfSpeech":  "동사",
        "meaning":  "<상황, 업무, 사람 등을> 다루다, 처리하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "address",
                           "manage",
                           "deal with",
                           "take care of"
                       ],
        "exampleEn":  "Martha handled the situation with ease.",
        "exampleKo":  "마사는 그 상황을 쉽게 처리했다.",
        "memo":  ""
    },
    {
        "id":  "d13-07",
        "day":  "Day 13",
        "no":  "07",
        "word":  "inhibit",
        "phonetic":  "[inhíbit]",
        "partOfSpeech":  "동사",
        "meaning":  "방해하다, 억제하다",
        "relatedForms":  "inhibition (명) 방해, 억제",
        "paraphrase":  [
                           "prevent",
                           "hinder",
                           "restrain",
                           "impede"
                       ],
        "exampleEn":  "The chemicals inhibit harmful bacteria growth.",
        "exampleKo":  "그 화학물질은 해로운 박테리아의 성장을 억제한다.",
        "memo":  ""
    },
    {
        "id":  "d13-08",
        "day":  "Day 13",
        "no":  "08",
        "word":  "inspection",
        "phonetic":  "[inspékʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "점검, 시찰, 검사",
        "relatedForms":  "inspect (동) 점검하다, 시찰하다; 검사하다",
        "paraphrase":  [
                           "check",
                           "examination",
                           "investigation"
                       ],
        "exampleEn":  "an annual building inspection",
        "exampleKo":  "연례 건물 사찰",
        "memo":  "a close inspection of a fossil (화석의 정밀 검사)"
    },
    {
        "id":  "d13-09",
        "day":  "Day 13",
        "no":  "09",
        "word":  "loyal",
        "phonetic":  "[lɔ́iəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "충실한, 충성스러운",
        "relatedForms":  "-",
        "paraphrase":  [
                           "faithful",
                           "devoted"
                       ],
        "exampleEn":  "loyal customers",
        "exampleKo":  "충성 고객",
        "memo":  "지텔프 동의어: Jeffrey has been a loyal member of the organization for many years. -> (b) devoted | The queen was loyal to her country. (여왕은 자신의 국가에 충성했다.)"
    },
    {
        "id":  "d13-10",
        "day":  "Day 13",
        "no":  "10",
        "word":  "convert",
        "phonetic":  "[kənvə́ːrt]",
        "partOfSpeech":  "동사",
        "meaning":  "전환하다, 바꾸다",
        "relatedForms":  "conversion (명) 전환",
        "paraphrase":  [
                           "change",
                           "transform",
                           "turn",
                           "alter"
                       ],
        "exampleEn":  "The farmer wanted to convert his land into a wheat field.",
        "exampleKo":  "농부는 자신의 땅을 밀밭으로 전환하기를 원했다.",
        "memo":  ""
    },
    {
        "id":  "d13-11",
        "day":  "Day 13",
        "no":  "11",
        "word":  "ignorant",
        "phonetic":  "[ígnərənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "무식한, 무지한",
        "relatedForms":  "ignorance (명) 무지(함), 무식(함)",
        "paraphrase":  [
                           "uneducated",
                           "insensitive",
                           "unaware"
                       ],
        "exampleEn":  "some ignorant people",
        "exampleKo":  "일부 무지한 사람들",
        "memo":  "He was ignorant of literature. (그는 문학에 대해 무지했다.)"
    },
    {
        "id":  "d13-12",
        "day":  "Day 13",
        "no":  "12",
        "word":  "merely",
        "phonetic":  "[míərli]",
        "partOfSpeech":  "부사",
        "meaning":  "단지",
        "relatedForms":  "mere (형) 겨우, 불과",
        "paraphrase":  [
                           "only",
                           "just"
                       ],
        "exampleEn":  "The tree is merely three inches in diameter.",
        "exampleKo":  "그 나무는 지름이 단지 3인치밖에 되지 않는다.",
        "memo":  ""
    },
    {
        "id":  "d13-13",
        "day":  "Day 13",
        "no":  "13",
        "word":  "invention",
        "phonetic":  "[invénʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "발명품, 발명",
        "relatedForms":  "invent (동) 발명하다, inventor (명) 발명가",
        "paraphrase":  [
                           "creation",
                           "discovery"
                       ],
        "exampleEn":  "The telephone is a widely used invention.",
        "exampleKo":  "전화기는 널리 사용되는 발명품이다.",
        "memo":  "invention of nylon (나일론의 발명)"
    },
    {
        "id":  "d13-14",
        "day":  "Day 13",
        "no":  "14",
        "word":  "relieve",
        "phonetic":  "[rilíːv]",
        "partOfSpeech":  "동사",
        "meaning":  "완화하다, 안도하게 하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "ease",
                           "alleviate",
                           "reduce"
                       ],
        "exampleEn":  "relieve poverty",
        "exampleKo":  "빈곤을 완화하다",
        "memo":  "Jesse was relieved that he was not late. (제시는 지각하지 않아서 안도했다.)"
    },
    {
        "id":  "d13-15",
        "day":  "Day 13",
        "no":  "15",
        "word":  "exchange",
        "phonetic":  "[ikstʃéindʒ]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "교환 / 교환하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "trade",
                           "switch",
                           "interchange",
                           "change"
                       ],
        "exampleEn":  "I would like to exchange this shirt for a new one.",
        "exampleKo":  "이 셔츠를 새것으로 교환하고 싶습니다.",
        "memo":  "Frank got a bike in exchange for his skateboard. (프랭크는 자신의 스케이트보드를 주고 자전거를 받았다.)"
    },
    {
        "id":  "d13-16",
        "day":  "Day 13",
        "no":  "16",
        "word":  "infection",
        "phonetic":  "[infékʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "감염",
        "relatedForms":  "infect (동) 감염시키다",
        "paraphrase":  [

                       ],
        "exampleEn":  "A virus infection can be prevented with a vaccine.",
        "exampleKo":  "바이러스 감염은 백신으로 예방할 수 있다.",
        "memo":  ""
    },
    {
        "id":  "d13-17",
        "day":  "Day 13",
        "no":  "17",
        "word":  "compel",
        "phonetic":  "[kəmpél]",
        "partOfSpeech":  "동사",
        "meaning":  "강요하다, 강제하다",
        "relatedForms":  "compelling (형) 설득력 있는, 강력한; 강렬한",
        "paraphrase":  [
                           "force",
                           "make",
                           "oblige"
                       ],
        "exampleEn":  "Bryan was compelled to go to medical school.",
        "exampleKo":  "브라이언은 어쩔 수 없이 의대에 진학했다.",
        "memo":  "지텔프 동의어: The family was compelled to leave their home after the hurricane hit. -> (a) forced"
    },
    {
        "id":  "d13-18",
        "day":  "Day 13",
        "no":  "18",
        "word":  "treatment",
        "phonetic":  "[tríːtmənt]",
        "partOfSpeech":  "명사",
        "meaning":  "치료(법) / <사람에 대한> 대우 / <약품 등의> 처리",
        "relatedForms":  "treat (동) 치료하다; 대우하다; 처리하다, (명) 선물; 대접",
        "paraphrase":  [
                           "cure",
                           "remedy",
                           "handling",
                           "management"
                       ],
        "exampleEn":  "The patient's costly treatment was not effective.",
        "exampleKo":  "그 환자의 값비싼 치료는 효과가 없었다.",
        "memo":  "inadequate treatment of prisoners (죄수들에 대한 부적절한 처우)"
    },
    {
        "id":  "d13-19",
        "day":  "Day 13",
        "no":  "19",
        "word":  "mature",
        "phonetic":  "[mətʃúər]",
        "partOfSpeech":  "형용사",
        "meaning":  "다 자란 / 어른스러운, 성숙한",
        "relatedForms":  "immature (형) 다 자라지 못한; 미숙한, 미성숙한",
        "paraphrase":  [
                           "grown",
                           "grown-up",
                           "experienced"
                       ],
        "exampleEn":  "The insect is in its mature stage.",
        "exampleKo":  "그 곤충은 다 자란 상태이다.",
        "memo":  "The young ballet dancer is known for his mature artistic expressions. (그 젊은 발레 무용수는 성숙한 예술적 표현으로 유명하다.)"
    },
    {
        "id":  "d13-20",
        "day":  "Day 13",
        "no":  "20",
        "word":  "liberation",
        "phonetic":  "[lìbəréiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "해방",
        "relatedForms":  "liberate (동) 해방하다",
        "paraphrase":  [
                           "freedom",
                           "release"
                       ],
        "exampleEn":  "women's liberation movement",
        "exampleKo":  "여성 해방 운동",
        "memo":  ""
    },
    {
        "id":  "d13-21",
        "day":  "Day 13",
        "no":  "21",
        "word":  "constrain",
        "phonetic":  "[kənstréin]",
        "partOfSpeech":  "동사",
        "meaning":  "제약하다, 방해하다",
        "relatedForms":  "constraint (명) 제약",
        "paraphrase":  [
                           "restrict",
                           "restrain",
                           "limit",
                           "curb"
                       ],
        "exampleEn":  "Asian actors feel constrained by the lack of available roles in the U.S.",
        "exampleKo":  "미국에서 아시아계 배우들은 가능한 배역의 부족 때문에 제약을 느낀다.",
        "memo":  ""
    },
    {
        "id":  "d13-22",
        "day":  "Day 13",
        "no":  "22",
        "word":  "fluctuation",
        "phonetic":  "[flʌ̀ktʃuéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "변동",
        "relatedForms":  "fluctuate (동) 변동하다, 오르내리다",
        "paraphrase":  [
                           "change",
                           "swing",
                           "oscillation"
                       ],
        "exampleEn":  "fluctuation in fuel prices",
        "exampleKo":  "연료 가격의 변동",
        "memo":  ""
    },
    {
        "id":  "d13-23",
        "day":  "Day 13",
        "no":  "23",
        "word":  "immigrate",
        "phonetic":  "[íməgrèit]",
        "partOfSpeech":  "동사",
        "meaning":  "이주해 오다, 이민 오다",
        "relatedForms":  "immigration (명) 이주, 이민",
        "paraphrase":  [

                       ],
        "exampleEn":  "immigrate to a new country",
        "exampleKo":  "새로운 나라로 이주해 오다",
        "memo":  "He immigrated from Romania. (그는 루마니아에서 이민을 왔다.)"
    },
    {
        "id":  "d13-24",
        "day":  "Day 13",
        "no":  "24",
        "word":  "confine",
        "phonetic":  "[kənfáin]",
        "partOfSpeech":  "동사",
        "meaning":  "한정하다 / 가두다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "limit",
                           "restrict",
                           "restrain",
                           "imprison",
                           "keep"
                       ],
        "exampleEn":  "We should confine the use of the phone to emergencies.",
        "exampleKo":  "우리는 전화의 사용을 긴급 상황으로 제한해야 한다.",
        "memo":  "지텔프 동의어: We tried to confine the discussion to the relevant topics. -> (a) restrict | I was confined in a wheelchair for six months after my accident. (나는 사고 후 6개월 동안 휠체어에 갇혀 있었다.)"
    },
    {
        "id":  "d13-25",
        "day":  "Day 13",
        "no":  "25",
        "word":  "innovative",
        "phonetic":  "[inəvéitiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "혁신적인, 획기적인",
        "relatedForms":  "innovation (명) 혁신, 획기적인 것",
        "paraphrase":  [
                           "new",
                           "fresh",
                           "novel"
                       ],
        "exampleEn":  "an innovative approach to advertising",
        "exampleKo":  "광고에 대한 혁신적인 접근법",
        "memo":  ""
    },
    {
        "id":  "d13-26",
        "day":  "Day 13",
        "no":  "26",
        "word":  "mutually",
        "phonetic":  "[mjúːtʃuəli]",
        "partOfSpeech":  "부사",
        "meaning":  "서로, 상호간에",
        "relatedForms":  "mutual (형) 서로의, 상호간의",
        "paraphrase":  [

                       ],
        "exampleEn":  "a mutually beneficial business relationship",
        "exampleKo":  "서로에게 이로운 사업 관계",
        "memo":  ""
    },
    {
        "id":  "d13-27",
        "day":  "Day 13",
        "no":  "27",
        "word":  "audience",
        "phonetic":  "[ɔ́ːdiəns]",
        "partOfSpeech":  "명사",
        "meaning":  "대상, 시청자(층), 독자(층) / 청중, 관중",
        "relatedForms":  "-",
        "paraphrase":  [
                           "viewers",
                           "crowd",
                           "public"
                       ],
        "exampleEn":  "The classic novel is popular with modern audiences.",
        "exampleKo":  "그 고전 소설은 현대 독자들에게 인기가 있다.",
        "memo":  "perform in front of large audiences (많은 청중들 앞에서 공연하다)"
    },
    {
        "id":  "d13-28",
        "day":  "Day 13",
        "no":  "28",
        "word":  "shelter",
        "phonetic":  "[ʃéltər]",
        "partOfSpeech":  "명사",
        "meaning":  "피난(처), 보호시설",
        "relatedForms":  "-",
        "paraphrase":  [
                           "protection",
                           "cover",
                           "safety"
                       ],
        "exampleEn":  "The animals were seeking shelter from the storm.",
        "exampleKo":  "동물들은 폭풍으로부터 피난처를 찾고 있었다.",
        "memo":  ""
    },
    {
        "id":  "d13-29",
        "day":  "Day 13",
        "no":  "29",
        "word":  "expedition",
        "phonetic":  "[èkspədíʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "탐험(대)",
        "relatedForms":  "expedite (동) 더 신속히 처리하다",
        "paraphrase":  [
                           "exploration",
                           "mission"
                       ],
        "exampleEn":  "The explorer led an expedition to find the lost city.",
        "exampleKo":  "탐험가는 잃어버린 도시를 찾기 위해 탐험대를 이끌었다.",
        "memo":  ""
    },
    {
        "id":  "d13-30",
        "day":  "Day 13",
        "no":  "30",
        "word":  "intervene",
        "phonetic":  "[ìntərvíːn]",
        "partOfSpeech":  "동사",
        "meaning":  "개입하다, 끼어들다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "interfere",
                           "mediate"
                       ],
        "exampleEn":  "The government decided to intervene in the war.",
        "exampleKo":  "정부는 전쟁에 개입하기로 결정했다.",
        "memo":  ""
    },
    {
        "id":  "d13-31",
        "day":  "Day 13",
        "no":  "31",
        "word":  "prominent",
        "phonetic":  "[prάmənənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "저명한, 유력한 / 눈에 잘 띄는, 두드러진",
        "relatedForms":  "prominently (부) 눈에 잘 띄게",
        "paraphrase":  [
                           "famous",
                           "leading",
                           "important",
                           "noted",
                           "notable",
                           "renowned",
                           "noticeable"
                       ],
        "exampleEn":  "Julie is a prominent figure in the arts.",
        "exampleKo":  "줄리는 예술계에서 저명한 인물이다.",
        "memo":  "지텔프 동의어: Lucretia Mott was a prominent figure in the feminist movement. -> (b) leading | The painting hung in a prominent position in the museum. (그림은 박물관에서 눈에 잘 띄는 곳에 걸려 있었다.)"
    },
    {
        "id":  "d13-32",
        "day":  "Day 13",
        "no":  "32",
        "word":  "contrary",
        "phonetic":  "[kάntreri]",
        "partOfSpeech":  "형용사/부사",
        "meaning":  "반대되는, 상반되는 / 반대로, 상반되게",
        "relatedForms":  "-",
        "paraphrase":  [
                           "opposite",
                           "opposed",
                           "counter"
                       ],
        "exampleEn":  "Timothy chose to study psychology contrary to his parents' wishes.",
        "exampleKo":  "티모시는 부모님의 바람과는 달리 심리학을 공부하기로 선택했다.",
        "memo":  ""
    },
    {
        "id":  "d13-33",
        "day":  "Day 13",
        "no":  "33",
        "word":  "household",
        "phonetic":  "[háushòuld]",
        "partOfSpeech":  "형용사/명사",
        "meaning":  "가정(용)의 / 가구, 가족",
        "relatedForms":  "-",
        "paraphrase":  [
                           "family",
                           "home"
                       ],
        "exampleEn":  "household appliances",
        "exampleKo":  "가전제품",
        "memo":  "produce household items (생활 용품을 생산하다)"
    },
    {
        "id":  "d13-34",
        "day":  "Day 13",
        "no":  "34",
        "word":  "remind",
        "phonetic":  "[rimáind]",
        "partOfSpeech":  "동사",
        "meaning":  "상기시키다",
        "relatedForms":  "reminder (명) 상기시키는 것",
        "paraphrase":  [

                       ],
        "exampleEn":  "remind the residents of the no-pet policy",
        "exampleKo":  "주민들에게 반려 동물 금지 정책을 상기시키다",
        "memo":  ""
    },
    {
        "id":  "d13-35",
        "day":  "Day 13",
        "no":  "35",
        "word":  "convene",
        "phonetic":  "[kənvíːn]",
        "partOfSpeech":  "동사",
        "meaning":  "<회의 등> 소집하다, 모이다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "gather",
                           "assemble",
                           "meet"
                       ],
        "exampleEn":  "Many countries convened in Geneva to discuss the crisis.",
        "exampleKo":  "많은 나라들이 그 위기를 논의하기 위해 제네바에 모였다.",
        "memo":  ""
    },
    {
        "id":  "d13-36",
        "day":  "Day 13",
        "no":  "36",
        "word":  "found",
        "phonetic":  "[faund]",
        "partOfSpeech":  "동사",
        "meaning":  "설립하다",
        "relatedForms":  "founder (명) 창립자, 설립자",
        "paraphrase":  [
                           "establish",
                           "create",
                           "form",
                           "start",
                           "build"
                       ],
        "exampleEn":  "Megan founded a game company.",
        "exampleKo":  "메건은 게임 회사를 설립했다.",
        "memo":  ""
    },
    {
        "id":  "d13-37",
        "day":  "Day 13",
        "no":  "37",
        "word":  "denote",
        "phonetic":  "[dinóut]",
        "partOfSpeech":  "동사",
        "meaning":  "나타내다, 의미하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "mean",
                           "imply",
                           "signify"
                       ],
        "exampleEn":  "The Greek word \"agape\" denotes unconditional love.",
        "exampleKo":  "그리스어 아가페는 무조건적인 사랑을 의미한다.",
        "memo":  "지텔프 동의어: In literature, the color blue often denotes sadness. -> (b) means"
    },
    {
        "id":  "d13-38",
        "day":  "Day 13",
        "no":  "38",
        "word":  "embrace",
        "phonetic":  "[imbréis]",
        "partOfSpeech":  "동사",
        "meaning":  "<적극적으로> 수용하다, 받아들이다 / 껴안다, 포옹하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "accept",
                           "welcome",
                           "adopt",
                           "hug"
                       ],
        "exampleEn":  "embrace new concepts",
        "exampleKo":  "새로운 개념을 받아들이다",
        "memo":  ""
    },
    {
        "id":  "d13-39",
        "day":  "Day 13",
        "no":  "39",
        "word":  "charity",
        "phonetic":  "[tʃǽrəti]",
        "partOfSpeech":  "명사",
        "meaning":  "자선, 자선 단체",
        "relatedForms":  "charitable (형) 자선의",
        "paraphrase":  [

                       ],
        "exampleEn":  "Johnny loves to devote his time to charity.",
        "exampleKo":  "쟈니는 자신의 시간을 자선 단체에 바치는 것을 매우 좋아한다.",
        "memo":  ""
    },
    {
        "id":  "d13-40",
        "day":  "Day 13",
        "no":  "40",
        "word":  "protest",
        "phonetic":  "[prəutést] / [próutest]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "항의하다 / 항의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "complain",
                           "demonstrate",
                           "demonstration"
                       ],
        "exampleEn":  "protest about a defective product",
        "exampleKo":  "불량품에 항의하다",
        "memo":  "a political protest rally (정치 항의 집회)"
    },
    {
        "id":  "d13-41",
        "day":  "Day 13",
        "no":  "41",
        "word":  "incidence",
        "phonetic":  "[ínsidəns]",
        "partOfSpeech":  "명사",
        "meaning":  "발생률, 발생 빈도",
        "relatedForms":  "-",
        "paraphrase":  [
                           "frequency",
                           "occurrence"
                       ],
        "exampleEn":  "lower the incidence of disease",
        "exampleKo":  "질병의 발생률을 낮추다",
        "memo":  ""
    },
    {
        "id":  "d13-42",
        "day":  "Day 13",
        "no":  "42",
        "word":  "precede",
        "phonetic":  "[prisíːd]",
        "partOfSpeech":  "동사",
        "meaning":  "선행하다, ~보다 먼저 발생하다",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "A welcome speech preceded the performance.",
        "exampleKo":  "공연에 앞서 환영사가 있었다.",
        "memo":  ""
    },
    {
        "id":  "d13-43",
        "day":  "Day 13",
        "no":  "43",
        "word":  "aptly",
        "phonetic":  "[ǽptli]",
        "partOfSpeech":  "부사",
        "meaning":  "적절하게",
        "relatedForms":  "apt (형) 적절한",
        "paraphrase":  [
                           "fittingly",
                           "appropriately"
                       ],
        "exampleEn":  "There were actually few cars on the aptly named \"Lonely Road.\"",
        "exampleKo":  "\"외로운 길\"이라고 적절하게 이름이 지어진 도로에는 실제로 차들이 거의 없었다.",
        "memo":  ""
    },
    {
        "id":  "d13-44",
        "day":  "Day 13",
        "no":  "44",
        "word":  "correspondence",
        "phonetic":  "[kɔ̀ːrəspάndəns]",
        "partOfSpeech":  "명사",
        "meaning":  "서신",
        "relatedForms":  "correspond (동) 서신을 주고받다; 일치하다, correspondent (명) 특파원, 기자",
        "paraphrase":  [
                           "communication",
                           "letter"
                       ],
        "exampleEn":  "business correspondence",
        "exampleKo":  "업무용 서신",
        "memo":  ""
    },
    {
        "id":  "d13-45",
        "day":  "Day 13",
        "no":  "45",
        "word":  "injury",
        "phonetic":  "[índʒəri]",
        "partOfSpeech":  "명사",
        "meaning":  "부상",
        "relatedForms":  "injured (형) 부상을 입은, 다친",
        "paraphrase":  [
                           "damage",
                           "wound"
                       ],
        "exampleEn":  "recovery from injuries",
        "exampleKo":  "부상으로부터의 회복",
        "memo":  ""
    },
    {
        "id":  "d13-46",
        "day":  "Day 13",
        "no":  "46",
        "word":  "motivated",
        "phonetic":  "[móutəvèitid]",
        "partOfSpeech":  "형용사",
        "meaning":  "의욕이 있는",
        "relatedForms":  "motivation (명) 의욕; 동기, motivate (동) 동기부여하다",
        "paraphrase":  [
                           "inspired",
                           "prompted"
                       ],
        "exampleEn":  "I felt motivated to continue working hard.",
        "exampleKo":  "나는 계속 열심히 일해야겠다는 의욕을 느꼈다.",
        "memo":  ""
    },
    {
        "id":  "d13-47",
        "day":  "Day 13",
        "no":  "47",
        "word":  "descendant",
        "phonetic":  "[diséndənt]",
        "partOfSpeech":  "명사",
        "meaning":  "후손",
        "relatedForms":  "descend (동) 내려가다",
        "paraphrase":  [
                           "offspring",
                           "relative"
                       ],
        "exampleEn":  "a direct descendant of the king",
        "exampleKo":  "왕의 직계 후손",
        "memo":  ""
    },
    {
        "id":  "d13-48",
        "day":  "Day 13",
        "no":  "48",
        "word":  "insight",
        "phonetic":  "[ínsàit]",
        "partOfSpeech":  "명사",
        "meaning":  "통찰(력)",
        "relatedForms":  "-",
        "paraphrase":  [
                           "understanding"
                       ],
        "exampleEn":  "The study grants insight into dogs' behavior.",
        "exampleKo":  "그 연구는 개의 행동에 대한 통찰을 준다.",
        "memo":  ""
    },
    {
        "id":  "d13-49",
        "day":  "Day 13",
        "no":  "49",
        "word":  "speculate",
        "phonetic":  "[spékjəlèit]",
        "partOfSpeech":  "동사",
        "meaning":  "추측하다",
        "relatedForms":  "speculation (명) 추측",
        "paraphrase":  [
                           "guess",
                           "suppose",
                           "conjecture"
                       ],
        "exampleEn":  "Researchers speculate that the universe is infinite.",
        "exampleKo":  "연구자들은 우주가 무한하다고 추측한다.",
        "memo":  "지텔프 동의어: Some scientists speculate that the universe began with a big bang. -> (a) suppose"
    },
    {
        "id":  "d13-50",
        "day":  "Day 13",
        "no":  "50",
        "word":  "inclined",
        "phonetic":  "[inkláind]",
        "partOfSpeech":  "형용사",
        "meaning":  "~쪽으로 기울는, ~하고 싶은",
        "relatedForms":  "inclination (명) 의향; 경향",
        "paraphrase":  [
                           "disposed",
                           "prone",
                           "likely"
                       ],
        "exampleEn":  "I was inclined to believe that he was telling the truth.",
        "exampleKo":  "나는 그가 진실을 말하고 있다고 믿는 쪽으로 기울었다.",
        "memo":  ""
    },
  {
        "id":  "d14-01",
        "day":  "Day 14",
        "no":  "01",
        "word":  "contract",
        "phonetic":  "[kάntrækt] / [kəntrǽkt]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "계약 / 계약하다, 계약을 맺다 / (질병 등) 걸리다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "deal",
                           "agreement",
                           "arrangement",
                           "hire",
                           "arrange",
                           "develop",
                           "get",
                           "catch"
                       ],
        "exampleEn":  "sign a contract",
        "exampleKo":  "계약서에 서명하다",
        "memo":  "contract a virus (바이러스에 감염되다)"
    },
    {
        "id":  "d14-02",
        "day":  "Day 14",
        "no":  "02",
        "word":  "vegetation",
        "phonetic":  "[vèdʒətéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "식물, 초목",
        "relatedForms":  "-",
        "paraphrase":  [
                           "plants"
                       ],
        "exampleEn":  "green vegetation",
        "exampleKo":  "푸른 초목",
        "memo":  ""
    },
    {
        "id":  "d14-03",
        "day":  "Day 14",
        "no":  "03",
        "word":  "labor",
        "phonetic":  "[léibər]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "노동 / 일하다, 노동하다, 노력하다",
        "relatedForms":  "laborer (명) 노동자",
        "paraphrase":  [
                           "work",
                           "toil",
                           "work",
                           "endeavor",
                           "strive"
                       ],
        "exampleEn":  "manual labor",
        "exampleKo":  "육체노동",
        "memo":  ""
    },
    {
        "id":  "d14-04",
        "day":  "Day 14",
        "no":  "04",
        "word":  "conceal",
        "phonetic":  "[kənsíːl]",
        "partOfSpeech":  "동사",
        "meaning":  "숨기다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "hide",
                           "cover",
                           "bury"
                       ],
        "exampleEn":  "conceal his true identity",
        "exampleKo":  "그의 진짜 신분을 숨기다",
        "memo":  "지텔프 동의어: Frank was able to conceal the gun in his jacket without being seen. -> (a) hide"
    },
    {
        "id":  "d14-05",
        "day":  "Day 14",
        "no":  "05",
        "word":  "instruct",
        "phonetic":  "[instrʌ́kt]",
        "partOfSpeech":  "동사",
        "meaning":  "지시하다",
        "relatedForms":  "instruction (명) 지시; 설명",
        "paraphrase":  [
                           "order",
                           "command",
                           "tell"
                       ],
        "exampleEn":  "instruct the staff to submit their reports",
        "exampleKo":  "직원들에게 보고서를 제출하도록 지시하다",
        "memo":  ""
    },
    {
        "id":  "d14-06",
        "day":  "Day 14",
        "no":  "06",
        "word":  "detective",
        "phonetic":  "[ditéktiv]",
        "partOfSpeech":  "명사",
        "meaning":  "탐정",
        "relatedForms":  "detect (동) 발견하다, 감지하다 (= find)",
        "paraphrase":  [
                           "investigator",
                           "sleuth"
                       ],
        "exampleEn":  "a detective novel",
        "exampleKo":  "추리(탐정) 소설",
        "memo":  ""
    },
    {
        "id":  "d14-07",
        "day":  "Day 14",
        "no":  "07",
        "word":  "apprentice",
        "phonetic":  "[əpréntis]",
        "partOfSpeech":  "명사",
        "meaning":  "견습생",
        "relatedForms":  "apprenticeship (명) 견습 기간",
        "paraphrase":  [
                           "trainee",
                           "pupil"
                       ],
        "exampleEn":  "The master sculptor invited Mary to become his apprentice.",
        "exampleKo":  "거장 조각가가 메리에게 자신의 견습생이 되라고 제안했다.",
        "memo":  ""
    },
    {
        "id":  "d14-08",
        "day":  "Day 14",
        "no":  "08",
        "word":  "invoke",
        "phonetic":  "[invóuk]",
        "partOfSpeech":  "동사",
        "meaning":  "<법·규칙 등> 발동하다 / (주장을 뒷받침하려고) 언급하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "implement",
                           "resort to",
                           "mention",
                           "cite",
                           "quote"
                       ],
        "exampleEn":  "The government invoked martial law.",
        "exampleKo":  "정부는 계엄령을 발동했다.",
        "memo":  "The author invoked scholars in order to support her claim. (저자는 자신의 주장을 뒷받침하기 위해 학자들을 언급했다.)"
    },
    {
        "id":  "d14-09",
        "day":  "Day 14",
        "no":  "09",
        "word":  "regulate",
        "phonetic":  "[régjəlèit]",
        "partOfSpeech":  "동사",
        "meaning":  "규제하다",
        "relatedForms":  "regulation (명) 규제; 규정",
        "paraphrase":  [
                           "control",
                           "govern"
                       ],
        "exampleEn":  "regulate the use of pesticides in agriculture",
        "exampleKo":  "농업에서 살충제 사용을 규제하다",
        "memo":  "지텔프 동의어: The government will regulate the prices of essential goods. -> (b) control"
    },
    {
        "id":  "d14-10",
        "day":  "Day 14",
        "no":  "10",
        "word":  "annual",
        "phonetic":  "[ǽnjuəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "연례의, 연간의",
        "relatedForms":  "annually (부) 매년",
        "paraphrase":  [
                           "yearly"
                       ],
        "exampleEn":  "annual salary",
        "exampleKo":  "연봉",
        "memo":  "an annual event (연례 행사)"
    },
    {
        "id":  "d14-11",
        "day":  "Day 14",
        "no":  "11",
        "word":  "convenient",
        "phonetic":  "[kənvíːnjənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "편리한",
        "relatedForms":  "convenience (명) 편리(함)",
        "paraphrase":  [

                       ],
        "exampleEn":  "It is convenient to live close to your work.",
        "exampleKo":  "직장과 가까운 곳에 사는 것은 편리하다.",
        "memo":  ""
    },
    {
        "id":  "d14-12",
        "day":  "Day 14",
        "no":  "12",
        "word":  "particulars",
        "phonetic":  "[pərtíkjələrz]",
        "partOfSpeech":  "명사",
        "meaning":  "상세(한 것), 세부 사항",
        "relatedForms":  "-",
        "paraphrase":  [
                           "details",
                           "specifics"
                       ],
        "exampleEn":  "give particulars about the project",
        "exampleKo":  "프로젝트에 대한 세부 사항을 전달하다",
        "memo":  ""
    },
    {
        "id":  "d14-13",
        "day":  "Day 14",
        "no":  "13",
        "word":  "discharge",
        "phonetic":  "[distʃάːrdʒ]",
        "partOfSpeech":  "동사",
        "meaning":  "배출하다, 방출하다 / 해고하다, 떠나게 하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "release",
                           "free",
                           "dismiss",
                           "expel",
                           "liberate"
                       ],
        "exampleEn":  "discharge chemicals into the air",
        "exampleKo":  "화학물질을 대기 중으로 배출하다",
        "memo":  ""
    },
    {
        "id":  "d14-14",
        "day":  "Day 14",
        "no":  "14",
        "word":  "sales",
        "phonetic":  "[seilz]",
        "partOfSpeech":  "명사",
        "meaning":  "판매량, 매출 / 영업(부)",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "increased sales",
        "exampleKo":  "증가된 매출",
        "memo":  "a sales team (영업팀)"
    },
    {
        "id":  "d14-15",
        "day":  "Day 14",
        "no":  "15",
        "word":  "erosion",
        "phonetic":  "[iróuʒən]",
        "partOfSpeech":  "명사",
        "meaning":  "침식",
        "relatedForms":  "erode (동) 침식되다, 침식시키다",
        "paraphrase":  [
                           "corrosion"
                       ],
        "exampleEn":  "erosion of the coastline",
        "exampleKo":  "해안선의 침식",
        "memo":  ""
    },
    {
        "id":  "d14-16",
        "day":  "Day 14",
        "no":  "16",
        "word":  "employment",
        "phonetic":  "[implɔ́imənt]",
        "partOfSpeech":  "명사",
        "meaning":  "고용, 취업 / 직장, 일자리",
        "relatedForms":  "employ (동) 고용하다, employee (명) 직원, 종업원, employer (명) 고용주",
        "paraphrase":  [
                           "work",
                           "position",
                           "job"
                       ],
        "exampleEn":  "increase employment",
        "exampleKo":  "고용을 늘리다",
        "memo":  "find employment (일자리를 구하다)"
    },
    {
        "id":  "d14-17",
        "day":  "Day 14",
        "no":  "17",
        "word":  "reasonable",
        "phonetic":  "[ríːzənəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "합리적인, 타당한",
        "relatedForms":  "reasonably (부) 합리적으로",
        "paraphrase":  [
                           "moderate",
                           "modest",
                           "fair",
                           "acceptable"
                       ],
        "exampleEn":  "a reasonable request",
        "exampleKo":  "합당한 요구",
        "memo":  "a reasonable price (합리적인 가격)"
    },
    {
        "id":  "d14-18",
        "day":  "Day 14",
        "no":  "18",
        "word":  "inherent",
        "phonetic":  "[inhí(ː)ərənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "고유의, 내재하는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "intrinsic"
                       ],
        "exampleEn":  "There are many risks inherent in investment.",
        "exampleKo":  "투자에는 많은 내재된 위험이 있다.",
        "memo":  ""
    },
    {
        "id":  "d14-19",
        "day":  "Day 14",
        "no":  "19",
        "word":  "notable",
        "phonetic":  "[nóutəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "주목할 만한, 두드러진 / 유명한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "remarkable",
                           "noticeable",
                           "famous",
                           "prominent",
                           "renowned",
                           "celebrated"
                       ],
        "exampleEn":  "A notable feature of the product is its durability.",
        "exampleKo":  "그 제품의 두드러진 특징은 내구성이다.",
        "memo":  "지텔프 동의어: Rebecca made a notable contribution to the community. -> (a) remarkable | a notable figure (유명 인사)"
    },
    {
        "id":  "d14-20",
        "day":  "Day 14",
        "no":  "20",
        "word":  "marginal",
        "phonetic":  "[mάːrdʒənl]",
        "partOfSpeech":  "형용사",
        "meaning":  "미미한, 근소한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "slight",
                           "minor",
                           "negligible",
                           "insignificant"
                       ],
        "exampleEn":  "marginal changes in the price of gasoline",
        "exampleKo":  "휘발유 가격의 근소한 변화",
        "memo":  ""
    },
    {
        "id":  "d14-21",
        "day":  "Day 14",
        "no":  "21",
        "word":  "prevail",
        "phonetic":  "[privéil]",
        "partOfSpeech":  "동사",
        "meaning":  "만연하다, 널리 퍼져 있다 / 이기다, 승리하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "abound",
                           "predominate",
                           "win",
                           "triumph"
                       ],
        "exampleEn":  "Anxiety prevailed among the students taking the test.",
        "exampleKo":  "시험을 보는 학생들 사이에 불안감이 퍼져 있었다.",
        "memo":  ""
    },
    {
        "id":  "d14-22",
        "day":  "Day 14",
        "no":  "22",
        "word":  "expand",
        "phonetic":  "[ikspǽnd]",
        "partOfSpeech":  "동사",
        "meaning":  "확장하다, 넓히다, 팽창시키다",
        "relatedForms":  "expansive (형) 넓은, 광범위한, expansion (명) 확장",
        "paraphrase":  [
                           "grow",
                           "develop",
                           "enlarge",
                           "spread",
                           "broaden"
                       ],
        "exampleEn":  "expand the business",
        "exampleKo":  "사업을 확장하다",
        "memo":  "expand your horizon (시야를 넓히다)"
    },
    {
        "id":  "d14-23",
        "day":  "Day 14",
        "no":  "23",
        "word":  "accordingly",
        "phonetic":  "[əkɔ́ːrdiŋli]",
        "partOfSpeech":  "부사",
        "meaning":  "그에 따라",
        "relatedForms":  "-",
        "paraphrase":  [
                           "appropriately",
                           "correspondingly"
                       ],
        "exampleEn":  "The hospital will respond accordingly to the patient's condition.",
        "exampleKo":  "병원은 환자의 상태에 따라 대응할 것이다.",
        "memo":  ""
    },
    {
        "id":  "d14-24",
        "day":  "Day 14",
        "no":  "24",
        "word":  "offset",
        "phonetic":  "[ɔ́ːfsèt]",
        "partOfSpeech":  "동사",
        "meaning":  "상쇄하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "balance",
                           "counteract",
                           "redeem"
                       ],
        "exampleEn":  "offset losses by reducing expenses",
        "exampleKo":  "비용을 절감하여 손실을 상쇄하다",
        "memo":  ""
    },
    {
        "id":  "d14-25",
        "day":  "Day 14",
        "no":  "25",
        "word":  "deposit",
        "phonetic":  "[dipάzit]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "예금, 보증금 / 예금하다 / ~에 두다[놓다]",
        "relatedForms":  "-",
        "paraphrase":  [
                           "save",
                           "put",
                           "place",
                           "drop"
                       ],
        "exampleEn":  "security deposit",
        "exampleKo":  "보증금",
        "memo":  "deposit trash in the proper receptacle (쓰레기를 적절한 용기에 넣다)"
    },
    {
        "id":  "d14-26",
        "day":  "Day 14",
        "no":  "26",
        "word":  "irrational",
        "phonetic":  "[irǽʃənl]",
        "partOfSpeech":  "형용사",
        "meaning":  "비이성적인, 비합리적인",
        "relatedForms":  "rational (형) 이성적인, 합리적인",
        "paraphrase":  [
                           "illogical",
                           "unreasonable",
                           "absurd"
                       ],
        "exampleEn":  "An irrational fear can lead to a phobia.",
        "exampleKo":  "비이성적인 두려움은 공포증으로 이어질 수 있다.",
        "memo":  ""
    },
    {
        "id":  "d14-27",
        "day":  "Day 14",
        "no":  "27",
        "word":  "pact",
        "phonetic":  "[pækt]",
        "partOfSpeech":  "명사",
        "meaning":  "협정, 계약",
        "relatedForms":  "-",
        "paraphrase":  [
                           "agreement",
                           "contract",
                           "deal",
                           "bargain"
                       ],
        "exampleEn":  "make a pact with the government",
        "exampleKo":  "정부와 계약을 맺다",
        "memo":  ""
    },
    {
        "id":  "d14-28",
        "day":  "Day 14",
        "no":  "28",
        "word":  "traditional",
        "phonetic":  "[trədíʃənl]",
        "partOfSpeech":  "형용사",
        "meaning":  "전통적인",
        "relatedForms":  "-",
        "paraphrase":  [
                           "conventional"
                       ],
        "exampleEn":  "traditional culture",
        "exampleKo":  "전통 문화",
        "memo":  ""
    },
    {
        "id":  "d14-29",
        "day":  "Day 14",
        "no":  "29",
        "word":  "earn",
        "phonetic":  "[əːrn]",
        "partOfSpeech":  "동사",
        "meaning":  "(돈을) 벌다 / (자격이 되어) ~을 얻다, 획득하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "get",
                           "gain",
                           "deserve",
                           "justify",
                           "merit"
                       ],
        "exampleEn":  "earn fortunes in real estate",
        "exampleKo":  "부동산으로 재산을 모으다",
        "memo":  "지텔프 동의어: Sheryl Sandberg is an independent woman who has earned the respect of many. -> (b) gained | earn a reputation (평판을 얻다)"
    },
    {
        "id":  "d14-30",
        "day":  "Day 14",
        "no":  "30",
        "word":  "tolerance",
        "phonetic":  "[tάlərəns]",
        "partOfSpeech":  "명사",
        "meaning":  "관대함, 관용 / 내성",
        "relatedForms":  "tolerate (동) 용인하다; 참다, 견뎌내다",
        "paraphrase":  [
                           "forbearance",
                           "sympathy",
                           "resistance"
                       ],
        "exampleEn":  "tolerance to a medication",
        "exampleKo":  "약물에 대한 내성",
        "memo":  "tolerance towards those who are different from us (우리와 다른 사람들에 대한 관용)"
    },
    {
        "id":  "d14-31",
        "day":  "Day 14",
        "no":  "31",
        "word":  "modify",
        "phonetic":  "[mάdəfài]",
        "partOfSpeech":  "동사",
        "meaning":  "수정하다",
        "relatedForms":  "modification (명) 수정",
        "paraphrase":  [
                           "adjust",
                           "change",
                           "alter"
                       ],
        "exampleEn":  "modify the lesson plan",
        "exampleKo":  "교안을 수정하다",
        "memo":  ""
    },
    {
        "id":  "d14-32",
        "day":  "Day 14",
        "no":  "32",
        "word":  "intense",
        "phonetic":  "[inténs]",
        "partOfSpeech":  "형용사",
        "meaning":  "극심한, 치열한",
        "relatedForms":  "intensely (부) 극심하게, 몹시, intensify (동) 심해지다, 강화하다",
        "paraphrase":  [
                           "severe",
                           "extreme",
                           "fierce",
                           "harsh"
                       ],
        "exampleEn":  "intense storms",
        "exampleKo":  "극심한 폭풍우",
        "memo":  ""
    },
    {
        "id":  "d14-33",
        "day":  "Day 14",
        "no":  "33",
        "word":  "nutrition",
        "phonetic":  "[njuːtríʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "영양, 영양 섭취",
        "relatedForms":  "nutrient (명) 영양소, 영양분, nutritional (형) 영양의",
        "paraphrase":  [
                           "food",
                           "nourishment"
                       ],
        "exampleEn":  "adequate nutrition",
        "exampleKo":  "충분한 영양 섭취",
        "memo":  ""
    },
    {
        "id":  "d14-34",
        "day":  "Day 14",
        "no":  "34",
        "word":  "warranty",
        "phonetic":  "[wɔ́ːrənti]",
        "partOfSpeech":  "명사",
        "meaning":  "보증(서)",
        "relatedForms":  "-",
        "paraphrase":  [
                           "guarantee"
                       ],
        "exampleEn":  "The warranty period is one year from the date of purchase.",
        "exampleKo":  "보증 기간은 구매일로부터 1년이다.",
        "memo":  ""
    },
    {
        "id":  "d14-35",
        "day":  "Day 14",
        "no":  "35",
        "word":  "remote",
        "phonetic":  "[rimóut]",
        "partOfSpeech":  "형용사",
        "meaning":  "원격의, 먼 곳에 있는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "distant"
                       ],
        "exampleEn":  "a remote control device",
        "exampleKo":  "원격 조종 장치",
        "memo":  ""
    },
    {
        "id":  "d14-36",
        "day":  "Day 14",
        "no":  "36",
        "word":  "attend",
        "phonetic":  "[əténd]",
        "partOfSpeech":  "동사",
        "meaning":  "참석하다 / (학교 등) 다니다",
        "relatedForms":  "attendance (명) 출석, 참석, attendee (명) 출석자; 참석자",
        "paraphrase":  [

                       ],
        "exampleEn":  "attend a conference",
        "exampleKo":  "학회에 참석하다",
        "memo":  "attend a university (대학에 다니다)"
    },
    {
        "id":  "d14-37",
        "day":  "Day 14",
        "no":  "37",
        "word":  "optimistic",
        "phonetic":  "[ὰptəmístik]",
        "partOfSpeech":  "형용사",
        "meaning":  "낙관적인, 낙천적인",
        "relatedForms":  "-",
        "paraphrase":  [
                           "hopeful",
                           "positive",
                           "confident"
                       ],
        "exampleEn":  "take an optimistic view of the future",
        "exampleKo":  "미래를 낙관적으로 보다",
        "memo":  ""
    },
    {
        "id":  "d14-38",
        "day":  "Day 14",
        "no":  "38",
        "word":  "reliant",
        "phonetic":  "[riláiənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "의존하는, 의지하는",
        "relatedForms":  "reliance (명) 의존, 의지",
        "paraphrase":  [
                           "dependent"
                       ],
        "exampleEn":  "The team is too reliant on its star player.",
        "exampleKo":  "그 팀은 스타 선수에게 너무 의존하고 있다.",
        "memo":  "지텔프 동의어: Jack is reliant on his coach for motivation. -> (b) dependent"
    },
    {
        "id":  "d14-39",
        "day":  "Day 14",
        "no":  "39",
        "word":  "structure",
        "phonetic":  "[strʌ́ktʃər]",
        "partOfSpeech":  "명사",
        "meaning":  "구조, 구성 / 구조물, 건축물",
        "relatedForms":  "structural (형) 구조상의, 구조적인",
        "paraphrase":  [

                       ],
        "exampleEn":  "brain structure",
        "exampleKo":  "뇌구조",
        "memo":  "an ancient structure (고대 건축물)"
    },
    {
        "id":  "d14-40",
        "day":  "Day 14",
        "no":  "40",
        "word":  "ongoing",
        "phonetic":  "[άngòuiŋ]",
        "partOfSpeech":  "형용사",
        "meaning":  "진행 중인",
        "relatedForms":  "-",
        "paraphrase":  [
                           "current",
                           "continuing",
                           "continued",
                           "constant"
                       ],
        "exampleEn":  "an ongoing debate",
        "exampleKo":  "계속 진행 중인 토론",
        "memo":  ""
    },
    {
        "id":  "d14-41",
        "day":  "Day 14",
        "no":  "41",
        "word":  "parallel",
        "phonetic":  "[pǽrəlèl]",
        "partOfSpeech":  "명사/형용사/동사",
        "meaning":  "유사점, 유사성 / 평행한, 나란한 / 유사하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "similarity",
                           "resemblance",
                           "match"
                       ],
        "exampleEn":  "parallel lines",
        "exampleKo":  "평행선",
        "memo":  "draw a parallel between two historical figures (두 역사적 인물의 유사점을 찾다)"
    },
    {
        "id":  "d14-42",
        "day":  "Day 14",
        "no":  "42",
        "word":  "royalty",
        "phonetic":  "[rɔ́iəlti]",
        "partOfSpeech":  "명사",
        "meaning":  "왕족 / 저작권 사용료, 인세",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "British royalty",
        "exampleKo":  "영국 왕족",
        "memo":  "pay royalties to the original author (원작자에게 인세를 지불하다)"
    },
    {
        "id":  "d14-43",
        "day":  "Day 14",
        "no":  "43",
        "word":  "average",
        "phonetic":  "[ǽvəridʒ]",
        "partOfSpeech":  "형용사/명사",
        "meaning":  "평균의, 보통의 / 평균",
        "relatedForms":  "-",
        "paraphrase":  [
                           "common",
                           "usual",
                           "regular",
                           "mean",
                           "standard",
                           "norm"
                       ],
        "exampleEn":  "the average person",
        "exampleKo":  "보통 사람",
        "memo":  "숙어: on average (평균적으로)"
    },
    {
        "id":  "d14-44",
        "day":  "Day 14",
        "no":  "44",
        "word":  "following",
        "phonetic":  "[fάlouiŋ]",
        "partOfSpeech":  "형용사",
        "meaning":  "다음에 나오는, 이하의 / 다음의, 그다음의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "next",
                           "coming",
                           "subsequent",
                           "succeeding"
                       ],
        "exampleEn":  "Answer the following question.",
        "exampleKo":  "다음 질문에 답하세요.",
        "memo":  "지텔프 동의어: In the following chapter, the book will explore the theme of loss. -> (b) succeeding | the following year (그 다음 해)"
    },
    {
        "id":  "d14-45",
        "day":  "Day 14",
        "no":  "45",
        "word":  "relocate",
        "phonetic":  "[rìːloukéit]",
        "partOfSpeech":  "동사",
        "meaning":  "옮기다, 이전하다",
        "relatedForms":  "relocation (명) 이전, 이동",
        "paraphrase":  [
                           "move"
                       ],
        "exampleEn":  "The factory relocated to Vietnam.",
        "exampleKo":  "그 공장은 베트남으로 이전했다.",
        "memo":  ""
    },
    {
        "id":  "d14-46",
        "day":  "Day 14",
        "no":  "46",
        "word":  "outstanding",
        "phonetic":  "[àutstǽndiŋ]",
        "partOfSpeech":  "형용사",
        "meaning":  "뛰어난 / 미지불된",
        "relatedForms":  "-",
        "paraphrase":  [
                           "excellent",
                           "great",
                           "superb",
                           "impressive",
                           "exceptional",
                           "unpaid",
                           "remaining",
                           "payable"
                       ],
        "exampleEn":  "outstanding performance at the Olympics",
        "exampleKo":  "올림픽에서의 뛰어난 성과",
        "memo":  "an outstanding balance of $15,000 (15,000달러의 미불 잔액)"
    },
    {
        "id":  "d14-47",
        "day":  "Day 14",
        "no":  "47",
        "word":  "isolate",
        "phonetic":  "[áisəlèit]",
        "partOfSpeech":  "동사",
        "meaning":  "고립시키다, 격리하다",
        "relatedForms":  "isolation (명) 고립, 격리",
        "paraphrase":  [
                           "separate",
                           "disconnect"
                       ],
        "exampleEn":  "isolate a patient",
        "exampleKo":  "환자를 격리하다",
        "memo":  ""
    },
    {
        "id":  "d14-48",
        "day":  "Day 14",
        "no":  "48",
        "word":  "random",
        "phonetic":  "[rǽndəm]",
        "partOfSpeech":  "형용사",
        "meaning":  "무작위의, 닥치는 대로의",
        "relatedForms":  "randomly (부) 무작위로",
        "paraphrase":  [

                       ],
        "exampleEn":  "select a random sample",
        "exampleKo":  "무작위로 표본을 추출하다",
        "memo":  ""
    },
    {
        "id":  "d14-49",
        "day":  "Day 14",
        "no":  "49",
        "word":  "cultivate",
        "phonetic":  "[kʌ́ltəvèit]",
        "partOfSpeech":  "동사",
        "meaning":  "재배하다, 기르다 / 함양하다, 기르다",
        "relatedForms":  "cultivation (명) 재배, 경작; 함양",
        "paraphrase":  [
                           "grow",
                           "develop",
                           "foster"
                       ],
        "exampleEn":  "cultivate potatoes",
        "exampleKo":  "감자를 재배하다",
        "memo":  "cultivate a positive habit of being a good listener (남의 말을 잘 듣는 좋은 습관을 기르다)"
    },
    {
        "id":  "d14-50",
        "day":  "Day 14",
        "no":  "50",
        "word":  "prestigious",
        "phonetic":  "[prestídʒəs]",
        "partOfSpeech":  "형용사",
        "meaning":  "권위 있는, 일류의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "respected",
                           "renowned",
                           "esteemed"
                       ],
        "exampleEn":  "win a prestigious award",
        "exampleKo":  "권위 있는 상을 받다",
        "memo":  "prestigious universities (명문대학교)"
    },
  {
        "id":  "d15-01",
        "day":  "Day 15",
        "no":  "01",
        "word":  "endeavor",
        "phonetic":  "[endévər]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "시도, 노력 / 노력하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "effort",
                           "attempt",
                           "try",
                           "strive"
                       ],
        "exampleEn":  "endeavor to reduce waste",
        "exampleKo":  "쓰레기를 줄이기 위해 노력하다",
        "memo":  "지텔프 동의어: Harry was making an endeavor to develop his career. -> (b) effort"
    },
    {
        "id":  "d15-02",
        "day":  "Day 15",
        "no":  "02",
        "word":  "revise",
        "phonetic":  "[riváiz]",
        "partOfSpeech":  "동사",
        "meaning":  "수정하다, 변경하다",
        "relatedForms":  "revision (명) 수정, 변경",
        "paraphrase":  [
                           "change",
                           "modify",
                           "alter"
                       ],
        "exampleEn":  "revise a plan",
        "exampleKo":  "계획을 수정하다",
        "memo":  ""
    },
    {
        "id":  "d15-03",
        "day":  "Day 15",
        "no":  "03",
        "word":  "rigid",
        "phonetic":  "[rídʒid]",
        "partOfSpeech":  "형용사",
        "meaning":  "엄격한, 융통성 없는 / 단단한, 굳은",
        "relatedForms":  "-",
        "paraphrase":  [
                           "strict",
                           "stringent",
                           "rigorous",
                           "inflexible",
                           "stiff",
                           "hard"
                       ],
        "exampleEn":  "rigid work ethic",
        "exampleKo":  "엄격한 직업 윤리",
        "memo":  "rigid structure of a building (건물의 단단한 구조)"
    },
    {
        "id":  "d15-04",
        "day":  "Day 15",
        "no":  "04",
        "word":  "swallow",
        "phonetic":  "[swάlou]",
        "partOfSpeech":  "동사",
        "meaning":  "삼키다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "eat"
                       ],
        "exampleEn":  "The snake swallowed its prey.",
        "exampleKo":  "뱀이 먹이를 삼켰다.",
        "memo":  ""
    },
    {
        "id":  "d15-05",
        "day":  "Day 15",
        "no":  "05",
        "word":  "reluctance",
        "phonetic":  "[rilʌ́ktəns]",
        "partOfSpeech":  "명사",
        "meaning":  "꺼림, 마음 내키지 않음",
        "relatedForms":  "reluctant (형) 꺼리는, 내키지 않아 하는",
        "paraphrase":  [
                           "unwillingness",
                           "hesitancy"
                       ],
        "exampleEn":  "Alyssa showed reluctance to talk about her childhood.",
        "exampleKo":  "앨리사는 자신의 어린 시절에 대해 이야기하기를 꺼려했다.",
        "memo":  ""
    },
    {
        "id":  "d15-06",
        "day":  "Day 15",
        "no":  "06",
        "word":  "prohibit",
        "phonetic":  "[prouhíbit]",
        "partOfSpeech":  "동사",
        "meaning":  "금지하다, 못하게 하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "forbid",
                           "ban",
                           "disallow"
                       ],
        "exampleEn":  "prohibit the sale of alcohol",
        "exampleKo":  "주류 판매를 금지하다",
        "memo":  "prohibit people from littering in public places (공공장소에서 쓰레기 버리는 것을 금지하다)"
    },
    {
        "id":  "d15-07",
        "day":  "Day 15",
        "no":  "07",
        "word":  "prosperous",
        "phonetic":  "[prάspərəs]",
        "partOfSpeech":  "형용사",
        "meaning":  "번영하는, 번창하는, 부유한",
        "relatedForms":  "prosperity (명) 번영, 번창, prosper (동) 번영하다, 번창하다",
        "paraphrase":  [
                           "successful",
                           "thriving",
                           "flourishing",
                           "wealthy",
                           "rich"
                       ],
        "exampleEn":  "a prosperous career",
        "exampleKo":  "화려한 경력",
        "memo":  "a prosperous business (번창하는 사업체)"
    },
    {
        "id":  "d15-08",
        "day":  "Day 15",
        "no":  "08",
        "word":  "solely",
        "phonetic":  "[sóulli]",
        "partOfSpeech":  "부사",
        "meaning":  "오직, 유일하게",
        "relatedForms":  "-",
        "paraphrase":  [
                           "only",
                           "exclusively",
                           "entirely"
                       ],
        "exampleEn":  "focus solely on training",
        "exampleKo":  "오로지 훈련에만 집중하다",
        "memo":  ""
    },
    {
        "id":  "d15-09",
        "day":  "Day 15",
        "no":  "09",
        "word":  "resemble",
        "phonetic":  "[rizémbl]",
        "partOfSpeech":  "동사",
        "meaning":  "닮다",
        "relatedForms":  "resemblance (명) 닮음, 유사함",
        "paraphrase":  [
                           "look like"
                       ],
        "exampleEn":  "The planet resembles the shape of a ball.",
        "exampleKo":  "그 행성은 공의 모양을 닮았다.",
        "memo":  ""
    },
    {
        "id":  "d15-10",
        "day":  "Day 15",
        "no":  "10",
        "word":  "fade",
        "phonetic":  "[feid]",
        "partOfSpeech":  "동사",
        "meaning":  "희미해지다, 퇴색하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "wane",
                           "decline",
                           "dwindle",
                           "wither"
                       ],
        "exampleEn":  "Alan's career began to fade after he was caught drunk on stage.",
        "exampleKo":  "앨런이 술 취한 채 무대에 오른 것이 발각된 후 그의 경력은 퇴색하기 시작했다.",
        "memo":  "지텔프 동의어: The popularity of the band was starting to fade due to their lack of originality. -> (a) wane"
    },
    {
        "id":  "d15-11",
        "day":  "Day 15",
        "no":  "11",
        "word":  "preliminary",
        "phonetic":  "[prilímənèri]",
        "partOfSpeech":  "형용사",
        "meaning":  "예비의, 사전의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "preparatory"
                       ],
        "exampleEn":  "preliminary requirements to join the program",
        "exampleKo":  "그 프로그램에 참여하기 위한 예비 요건",
        "memo":  ""
    },
    {
        "id":  "d15-12",
        "day":  "Day 15",
        "no":  "12",
        "word":  "mate",
        "phonetic":  "[meit]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "짝짓기하다, 교미하다 / 친구, 동료",
        "relatedForms":  "-",
        "paraphrase":  [
                           "breed",
                           "match",
                           "friend",
                           "partner",
                           "companion"
                       ],
        "exampleEn":  "Male ants mate with the queen and die afterwards.",
        "exampleKo":  "수컷 개미들은 여왕과 짝짓기를 하고 그 후에 죽는다.",
        "memo":  "during mating season (교미 기간 동안)"
    },
    {
        "id":  "d15-13",
        "day":  "Day 15",
        "no":  "13",
        "word":  "terminate",
        "phonetic":  "[tə́ːrmənèit]",
        "partOfSpeech":  "동사",
        "meaning":  "끝내다, 종결하다",
        "relatedForms":  "termination (명) 종료, 종결",
        "paraphrase":  [
                           "end",
                           "finish",
                           "stop",
                           "discontinue"
                       ],
        "exampleEn":  "terminate the contract",
        "exampleKo":  "계약을 끝내다",
        "memo":  ""
    },
    {
        "id":  "d15-14",
        "day":  "Day 15",
        "no":  "14",
        "word":  "suitable",
        "phonetic":  "[sjúːtəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "적절한, 알맞은",
        "relatedForms":  "suitability (명) 적합함, 알맞음",
        "paraphrase":  [
                           "right",
                           "appropriate",
                           "fit",
                           "fitting"
                       ],
        "exampleEn":  "a suitable topic for discussion",
        "exampleKo":  "토론하기에 적절한 주제",
        "memo":  ""
    },
    {
        "id":  "d15-15",
        "day":  "Day 15",
        "no":  "15",
        "word":  "lecture",
        "phonetic":  "[léktʃər]",
        "partOfSpeech":  "명사",
        "meaning":  "강의, 강연",
        "relatedForms":  "-",
        "paraphrase":  [
                           "lesson",
                           "speech",
                           "talk"
                       ],
        "exampleEn":  "a series of lectures on birth defects",
        "exampleKo":  "선천성 결함에 대한 일련의 강의",
        "memo":  ""
    },
    {
        "id":  "d15-16",
        "day":  "Day 15",
        "no":  "16",
        "word":  "utilize",
        "phonetic":  "[júːtəlàiz]",
        "partOfSpeech":  "동사",
        "meaning":  "활용하다, 이용하다",
        "relatedForms":  "utilization (명) 활용, 이용",
        "paraphrase":  [
                           "use",
                           "employ"
                       ],
        "exampleEn":  "utilize new technology to increase efficiency",
        "exampleKo":  "효율성을 높이기 위해 새로운 기술을 활용하다",
        "memo":  ""
    },
    {
        "id":  "d15-17",
        "day":  "Day 15",
        "no":  "17",
        "word":  "missing",
        "phonetic":  "[mísiŋ]",
        "partOfSpeech":  "형용사",
        "meaning":  "없어진, 실종된 / 빠진, 누락된",
        "relatedForms":  "-",
        "paraphrase":  [
                           "lost",
                           "absent",
                           "lacking"
                       ],
        "exampleEn":  "missing soldiers",
        "exampleKo":  "실종된 군인들",
        "memo":  "a missing order (누락된 주문)"
    },
    {
        "id":  "d15-18",
        "day":  "Day 15",
        "no":  "18",
        "word":  "minor",
        "phonetic":  "[máinər]",
        "partOfSpeech":  "형용사",
        "meaning":  "사소한, 크거나 중요하지 않은",
        "relatedForms":  "minority (명) 소수",
        "paraphrase":  [
                           "unimportant",
                           "trivial",
                           "insignificant",
                           "negligible"
                       ],
        "exampleEn":  "I received a product with minor damage.",
        "exampleKo":  "나는 사소한 손상이 있는 상품을 받았다.",
        "memo":  "지텔프 동의어: The tax cut will have a minor effect on the economy. -> (b) negligible"
    },
    {
        "id":  "d15-19",
        "day":  "Day 15",
        "no":  "19",
        "word":  "financial",
        "phonetic":  "[fainǽnʃəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "재정의, 금융의",
        "relatedForms":  "finance (명) 재정, 금융, (동) 자금을 대다, financially (부) 재정적으로",
        "paraphrase":  [

                       ],
        "exampleEn":  "provide financial support",
        "exampleKo":  "재정적인 지원을 제공하다",
        "memo":  "experience financial problems (재정적인 문제를 겪다)"
    },
    {
        "id":  "d15-20",
        "day":  "Day 15",
        "no":  "20",
        "word":  "suspend",
        "phonetic":  "[səspénd]",
        "partOfSpeech":  "동사",
        "meaning":  "중단하다, 정지시키다 / 정학 처분을 내리다",
        "relatedForms":  "suspension (명) 중단, 정지; 정학",
        "paraphrase":  [
                           "withhold"
                       ],
        "exampleEn":  "The bus service to the city has been suspended due to heavy snow.",
        "exampleKo":  "폭설로 시내로 가는 버스 운행이 중단되었다.",
        "memo":  "be suspended from school for fighting (싸움으로 정학을 당하다)"
    },
    {
        "id":  "d15-21",
        "day":  "Day 15",
        "no":  "21",
        "word":  "diagnose",
        "phonetic":  "[dáiəgnòus]",
        "partOfSpeech":  "동사",
        "meaning":  "진단하다, 원인을 밝히다",
        "relatedForms":  "diagnosis (명) 진단",
        "paraphrase":  [
                           "identify",
                           "determine"
                       ],
        "exampleEn":  "Nicole was diagnosed with stomach cancer.",
        "exampleKo":  "니콜은 위암 진단을 받았다.",
        "memo":  "diagnose a fault in the engine (엔진에서 문제를 진단하다)"
    },
    {
        "id":  "d15-22",
        "day":  "Day 15",
        "no":  "22",
        "word":  "invalidate",
        "phonetic":  "[invǽlədèit]",
        "partOfSpeech":  "동사",
        "meaning":  "무효화하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "disprove",
                           "nullify",
                           "annul"
                       ],
        "exampleEn":  "The recent study invalidated Dr. Wong's findings.",
        "exampleKo":  "최근의 연구는 웡 박사의 연구 결과를 무효화했다.",
        "memo":  "지텔프 동의어: The scientific theory was invalidated by the experimental evidence. -> (a) disproved"
    },
    {
        "id":  "d15-23",
        "day":  "Day 15",
        "no":  "23",
        "word":  "childhood",
        "phonetic":  "[tʃáildhùd]",
        "partOfSpeech":  "명사",
        "meaning":  "어린 시절, 유년 시절",
        "relatedForms":  "-",
        "paraphrase":  [
                           "youth"
                       ],
        "exampleEn":  "Paige spent her childhood working on the family farm.",
        "exampleKo":  "페이지는 가족 농장에서 일을 하며 어린 시절을 보냈다.",
        "memo":  "a challenging childhood (힘든 유년 시절)"
    },
    {
        "id":  "d15-24",
        "day":  "Day 15",
        "no":  "24",
        "word":  "fertile",
        "phonetic":  "[fə́ːrtl]",
        "partOfSpeech":  "형용사",
        "meaning":  "비옥한 / 생식 능력이 있는",
        "relatedForms":  "fertilize (동) 비옥하게 하다; (생물 등) 수정시키다, fertility (명) 비옥함; 생식력",
        "paraphrase":  [
                           "productive",
                           "rich"
                       ],
        "exampleEn":  "fertile soil",
        "exampleKo":  "비옥한 땅",
        "memo":  "The animal was very fertile and had many offspring. (그 동물은 매우 생식력이 좋아서 많은 새끼를 낳았다.)"
    },
    {
        "id":  "d15-25",
        "day":  "Day 15",
        "no":  "25",
        "word":  "transmit",
        "phonetic":  "[trænsmít]",
        "partOfSpeech":  "동사",
        "meaning":  "전송하다, 방송하다 / 전염시키다",
        "relatedForms":  "transmission (명) 전송, 방송; 전염",
        "paraphrase":  [
                           "send",
                           "relay",
                           "broadcast",
                           "spread",
                           "transfer"
                       ],
        "exampleEn":  "The nerves transmit information to the brain.",
        "exampleKo":  "신경은 정보를 뇌로 전달한다.",
        "memo":  "지텔프 동의어: We will transmit the payment using our secure system. -> (a) send | The disease is transmitted by mosquitoes. (그 병은 모기에 의해 전염된다.)"
    },
    {
        "id":  "d15-26",
        "day":  "Day 15",
        "no":  "26",
        "word":  "supplement",
        "phonetic":  "[sʌ́pləmənt]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "보충하다, 보완하다 / 보충제",
        "relatedForms":  "supplementary (형) 보충의, 추가의",
        "paraphrase":  [
                           "reinforce",
                           "augment"
                       ],
        "exampleEn":  "take a supplement rich in vitamins every day",
        "exampleKo":  "매일 비타민이 풍부한 보충제를 섭취하다",
        "memo":  ""
    },
    {
        "id":  "d15-27",
        "day":  "Day 15",
        "no":  "27",
        "word":  "trigger",
        "phonetic":  "[trígər]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "유발하다, 일으키다 / (사건을 일으키는) 요인",
        "relatedForms":  "-",
        "paraphrase":  [
                           "cause",
                           "generate",
                           "provoke",
                           "prompt",
                           "bring about"
                       ],
        "exampleEn":  "The sound of the gunshot triggered memories of the war.",
        "exampleKo":  "총소리는 전쟁의 기억을 불러일으켰다.",
        "memo":  "The trigger of the fire was a faulty electrical wire. (화재의 발단은 전선 결함이었다.)"
    },
    {
        "id":  "d15-28",
        "day":  "Day 15",
        "no":  "28",
        "word":  "substitute",
        "phonetic":  "[sʌ́bstitjùːt]",
        "partOfSpeech":  "동사",
        "meaning":  "A로 B를 대체하다 (substitute A for B) / A를 B로 대체하다 (substitute A with B)",
        "relatedForms":  "substitution (명) 대체",
        "paraphrase":  [
                           "replace",
                           "exchange",
                           "swap"
                       ],
        "exampleEn":  "You can substitute quinoa for rice.",
        "exampleKo":  "쌀 대신에 퀴노아를 써도 됩니다.",
        "memo":  "I was substituted for John in the play. (나는 그 연극에서 존을 대신했다.) | substitute coffee with healthier alternatives (커피를 좀 더 건강한 대안들로 대체하다)"
    },
    {
        "id":  "d15-29",
        "day":  "Day 15",
        "no":  "29",
        "word":  "researcher",
        "phonetic":  "[risə́ːrtʃər]",
        "partOfSpeech":  "명사",
        "meaning":  "연구자",
        "relatedForms":  "research (명) 연구, 조사, (동) 연구하다",
        "paraphrase":  [

                       ],
        "exampleEn":  "The study was conducted by researchers from the University of California.",
        "exampleKo":  "그 연구는 캘리포니아 대학 출신의 연구자들에 의해 시행되었다.",
        "memo":  ""
    },
    {
        "id":  "d15-30",
        "day":  "Day 15",
        "no":  "30",
        "word":  "typically",
        "phonetic":  "[típikəli]",
        "partOfSpeech":  "부사",
        "meaning":  "일반적으로, 보통 / 전형적으로",
        "relatedForms":  "typical (형) 일반적인; 전형적인",
        "paraphrase":  [
                           "usually",
                           "generally"
                       ],
        "exampleEn":  "Steven typically leaves work at 6 p.m.",
        "exampleKo":  "스티븐은 보통 오후 6시에 퇴근한다.",
        "memo":  ""
    },
    {
        "id":  "d15-31",
        "day":  "Day 15",
        "no":  "31",
        "word":  "habitual",
        "phonetic":  "[həbítʃuəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "습관적인, 늘 하는",
        "relatedForms":  "habit (명) 습관, 버릇",
        "paraphrase":  [
                           "usual",
                           "persistent",
                           "frequent"
                       ],
        "exampleEn":  "a habitual liar",
        "exampleKo":  "상습적인 거짓말쟁이",
        "memo":  "지텔프 동의어: John's habitual tardiness caused him to miss some important deadlines. -> (a) persistent | Leah was wearing her habitual hat. (리아는 늘 하는 모자를 쓰고 있었다.)"
    },
    {
        "id":  "d15-32",
        "day":  "Day 15",
        "no":  "32",
        "word":  "defense",
        "phonetic":  "[diféns]",
        "partOfSpeech":  "명사",
        "meaning":  "방어",
        "relatedForms":  "defend (동) 방어하다",
        "paraphrase":  [
                           "guard",
                           "protection",
                           "cover"
                       ],
        "exampleEn":  "Some fish use their spines for self-defense.",
        "exampleKo":  "어떤 물고기들은 자기 방어를 위해 가시를 사용한다.",
        "memo":  "a soccer player with great defense (훌륭한 수비력을 갖춘 축구 선수)"
    },
    {
        "id":  "d15-33",
        "day":  "Day 15",
        "no":  "33",
        "word":  "variable",
        "phonetic":  "[vέəriəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "변하기 쉬운, 변덕스러운",
        "relatedForms":  "-",
        "paraphrase":  [
                           "changeable"
                       ],
        "exampleEn":  "The weather of this area is most variable in the winter.",
        "exampleKo":  "이 지역의 날씨는 겨울에 가장 변덕스럽다.",
        "memo":  ""
    },
    {
        "id":  "d15-34",
        "day":  "Day 15",
        "no":  "34",
        "word":  "promptly",
        "phonetic":  "[prάmptli]",
        "partOfSpeech":  "부사",
        "meaning":  "즉시, 신속하게 / 정시에, 제때에",
        "relatedForms":  "prompt (형) 즉각적인, 신속한; 시간을 엄수하는",
        "paraphrase":  [
                           "instantly",
                           "immediately",
                           "swiftly",
                           "punctually",
                           "on time"
                       ],
        "exampleEn":  "help the customer promptly",
        "exampleKo":  "고객을 즉시 돕다",
        "memo":  "address the issues promptly (문제를 신속하게 해결하다) | We should leave promptly at 9 A.M. (우리는 아침 9시 정각에 떠나야 합니다.)"
    },
    {
        "id":  "d15-35",
        "day":  "Day 15",
        "no":  "35",
        "word":  "venue",
        "phonetic":  "[vénjuː]",
        "partOfSpeech":  "명사",
        "meaning":  "장소",
        "relatedForms":  "-",
        "paraphrase":  [
                           "place",
                           "location"
                       ],
        "exampleEn":  "a wedding venue",
        "exampleKo":  "결혼식 장소",
        "memo":  ""
    },
    {
        "id":  "d15-36",
        "day":  "Day 15",
        "no":  "36",
        "word":  "lifespan",
        "phonetic":  "[láifspæn]",
        "partOfSpeech":  "명사",
        "meaning":  "수명",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "A dog has an average lifespan of 10-13 years.",
        "exampleKo":  "개의 평균 수명은 10~13년이다.",
        "memo":  ""
    },
    {
        "id":  "d15-37",
        "day":  "Day 15",
        "no":  "37",
        "word":  "violate",
        "phonetic":  "[váiəlèit]",
        "partOfSpeech":  "동사",
        "meaning":  "위반하다, 침해하다",
        "relatedForms":  "violation (명) 위반; 침해",
        "paraphrase":  [
                           "disobey",
                           "break",
                           "defy"
                       ],
        "exampleEn":  "violate safety standards",
        "exampleKo":  "안전 기준을 위반하다",
        "memo":  "violate human rights (인권을 침해하다)"
    },
    {
        "id":  "d15-38",
        "day":  "Day 15",
        "no":  "38",
        "word":  "grasp",
        "phonetic":  "[græsp]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "이해하다 / 꽉 잡다 / 파악, 이해 / 꽉 잡기",
        "relatedForms":  "-",
        "paraphrase":  [
                           "understand",
                           "get",
                           "comprehend",
                           "grip",
                           "hold",
                           "understanding",
                           "knowledge"
                       ],
        "exampleEn":  "grasp the main idea of the book",
        "exampleKo":  "책의 핵심 내용을 파악하다",
        "memo":  "지텔프 동의어: The instructions were so difficult to grasp. -> (b) understand | grasp every opportunity (모든 기회를 붙잡다) | The product manager has a good grasp of what the market wants. (상품 매니저는 시장이 무엇을 원하는지 잘 이해하고 있다.)"
    },
    {
        "id":  "d15-39",
        "day":  "Day 15",
        "no":  "39",
        "word":  "transit",
        "phonetic":  "[trǽnsit]",
        "partOfSpeech":  "명사",
        "meaning":  "운송, 운반",
        "relatedForms":  "transition (명) 전환, 변화, (동) 전환하다",
        "paraphrase":  [
                           "transfer",
                           "movement",
                           "transport",
                           "travel"
                       ],
        "exampleEn":  "The item was damaged in transit.",
        "exampleKo":  "그 품목은 운송 중에 손상되었다.",
        "memo":  ""
    },
    {
        "id":  "d15-40",
        "day":  "Day 15",
        "no":  "40",
        "word":  "addicted",
        "phonetic":  "[ədíktid]",
        "partOfSpeech":  "형용사",
        "meaning":  "중독된",
        "relatedForms":  "addict (명) 중독자",
        "paraphrase":  [
                           "hooked",
                           "obsessed"
                       ],
        "exampleEn":  "be addicted to video games",
        "exampleKo":  "비디오 게임에 중독되다",
        "memo":  ""
    },
    {
        "id":  "d15-41",
        "day":  "Day 15",
        "no":  "41",
        "word":  "prompt",
        "phonetic":  "[prάmpt]",
        "partOfSpeech":  "동사/형용사",
        "meaning":  "유발하다, 촉구하다 / 신속한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "motivate",
                           "cause",
                           "inspire",
                           "induce",
                           "immediate",
                           "quick",
                           "rapid",
                           "instant"
                       ],
        "exampleEn":  "The movie prompted me to abandon my aspiration of becoming a teacher.",
        "exampleKo":  "그 영화를 보고 나는 교사가 되겠다는 열망을 버리게 되었다.",
        "memo":  "지텔프 동의어: The death of her best friend prompted her to become a doctor. -> (a) motivated | a prompt reply (신속한 응답)"
    },
    {
        "id":  "d15-42",
        "day":  "Day 15",
        "no":  "42",
        "word":  "strict",
        "phonetic":  "[strikt]",
        "partOfSpeech":  "형용사",
        "meaning":  "엄격한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "rigid",
                           "rigorous",
                           "staunch"
                       ],
        "exampleEn":  "a strict dress code",
        "exampleKo":  "엄격한 복장 규정",
        "memo":  "a strict upbringing (엄격한 양육)"
    },
    {
        "id":  "d15-43",
        "day":  "Day 15",
        "no":  "43",
        "word":  "alert",
        "phonetic":  "[ələ́ːrt]",
        "partOfSpeech":  "형용사",
        "meaning":  "정신을 바짝 차린",
        "relatedForms":  "-",
        "paraphrase":  [
                           "attentive",
                           "vigilant",
                           "awake"
                       ],
        "exampleEn":  "Stay alert while driving.",
        "exampleKo":  "운전 중에는 정신을 바짝 차려라.",
        "memo":  ""
    },
    {
        "id":  "d15-44",
        "day":  "Day 15",
        "no":  "44",
        "word":  "constellation",
        "phonetic":  "[kὰnstəléiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "별자리",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "stars in the constellation of Orion",
        "exampleKo":  "오리온 별자리의 별들",
        "memo":  ""
    },
    {
        "id":  "d15-45",
        "day":  "Day 15",
        "no":  "45",
        "word":  "breed",
        "phonetic":  "[briːd]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "<동물이나 식물의> 품종 / 사육하다, 번식하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "kind",
                           "family",
                           "variety",
                           "reproduce"
                       ],
        "exampleEn":  "study physical characteristics of dog breeds",
        "exampleKo":  "개 품종의 신체적 특징을 연구하다",
        "memo":  "Many birds breed in the spring. (많은 새들이 봄에 번식한다.)"
    },
    {
        "id":  "d15-46",
        "day":  "Day 15",
        "no":  "46",
        "word":  "insect",
        "phonetic":  "[ínsekt]",
        "partOfSpeech":  "명사",
        "meaning":  "곤충",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "harmful insects",
        "exampleKo":  "해충",
        "memo":  "I apply natural oils to repel insects. (나는 곤충을 쫓아 버리기 위해 천연 오일을 바른다.)"
    },
    {
        "id":  "d15-47",
        "day":  "Day 15",
        "no":  "47",
        "word":  "withdraw",
        "phonetic":  "[wiðdrɔ́ː]",
        "partOfSpeech":  "동사",
        "meaning":  "중단하다 / 철수하다 / 인출하다",
        "relatedForms":  "withdrawal (명) 인출; 철수; 중단",
        "paraphrase":  [
                           "retreat",
                           "depart",
                           "leave"
                       ],
        "exampleEn":  "The company withdrew its financial support from the athlete.",
        "exampleKo":  "회사는 그 운동선수에 대한 재정적 지원을 중단했다.",
        "memo":  "The troops have withdrawn from the base. (군대가 기지에서 철수했다.) | withdraw money (돈을 인출하다)"
    },
    {
        "id":  "d15-48",
        "day":  "Day 15",
        "no":  "48",
        "word":  "flourish",
        "phonetic":  "[flə́ːriʃ]",
        "partOfSpeech":  "동사",
        "meaning":  "번창하다, 번성하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "prosper",
                           "thrive",
                           "succeed"
                       ],
        "exampleEn":  "The business flourished due to its new, innovative product.",
        "exampleKo":  "혁신적인 신제품으로 사업이 번창했다.",
        "memo":  "The plant flourishes in high humidity. (그 식물은 높은 습도에서 무성하게 자란다.)"
    },
    {
        "id":  "d15-49",
        "day":  "Day 15",
        "no":  "49",
        "word":  "civilization",
        "phonetic":  "[sìvəlizéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "문명",
        "relatedForms":  "civil (형) 민간의, 시민의",
        "paraphrase":  [

                       ],
        "exampleEn":  "the ancient civilizations of Asia",
        "exampleKo":  "아시아 고대 문명",
        "memo":  ""
    },
    {
        "id":  "d15-50",
        "day":  "Day 15",
        "no":  "50",
        "word":  "prey",
        "phonetic":  "[prei]",
        "partOfSpeech":  "명사",
        "meaning":  "<동물의> 먹이",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "Sharks eat various prey.",
        "exampleKo":  "상어는 다양한 먹이를 먹는다.",
        "memo":  ""
    },
  {
        "id":  "d16-01",
        "day":  "Day 16",
        "no":  "01",
        "word":  "forbid",
        "phonetic":  "[fərbíd]",
        "partOfSpeech":  "동사",
        "meaning":  "금지하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "ban",
                           "prohibit",
                           "outlaw",
                           "proscribe"
                       ],
        "exampleEn":  "forbid smoking in public places",
        "exampleKo":  "공공장소에서의 흡연을 금지하다",
        "memo":  ""
    },
    {
        "id":  "d16-02",
        "day":  "Day 16",
        "no":  "02",
        "word":  "interact",
        "phonetic":  "[ìntərǽkt]",
        "partOfSpeech":  "동사",
        "meaning":  "소통하다, 교류하다 / 상호작용하다",
        "relatedForms":  "interaction (명) 교류; 상호작용",
        "paraphrase":  [
                           "interplay"
                       ],
        "exampleEn":  "interact with others through social media",
        "exampleKo":  "SNS를 통해 다른 사람들과 교류하다",
        "memo":  "find out how the medicine interacts with other drugs (그 약이 다른 약과 어떻게 상호작용하는지 알아내다)"
    },
    {
        "id":  "d16-03",
        "day":  "Day 16",
        "no":  "03",
        "word":  "dedication",
        "phonetic":  "[dèdikéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "전념, 헌신",
        "relatedForms":  "dedicate (동) 전념하다, 헌신하다",
        "paraphrase":  [
                           "devotion",
                           "commitment",
                           "loyalty"
                       ],
        "exampleEn":  "Ricky showed dedication to his project.",
        "exampleKo":  "리키는 그의 프로젝트에 헌신적인 모습을 보였다.",
        "memo":  "지텔프 동의어: From a young age, Kelly showed dedication to becoming a doctor. -> (b) commitment"
    },
    {
        "id":  "d16-04",
        "day":  "Day 16",
        "no":  "04",
        "word":  "quantity",
        "phonetic":  "[kwάntəti]",
        "partOfSpeech":  "명사",
        "meaning":  "양, 수량",
        "relatedForms":  "-",
        "paraphrase":  [
                           "amount",
                           "number",
                           "volume"
                       ],
        "exampleEn":  "a large quantity of waste",
        "exampleKo":  "대량의 폐기물",
        "memo":  ""
    },
    {
        "id":  "d16-05",
        "day":  "Day 16",
        "no":  "05",
        "word":  "architecture",
        "phonetic":  "[άːrkitèktʃər]",
        "partOfSpeech":  "명사",
        "meaning":  "건축, 건축양식",
        "relatedForms":  "architect (명) 건축가",
        "paraphrase":  [

                       ],
        "exampleEn":  "medieval architecture",
        "exampleKo":  "중세 건축 양식",
        "memo":  ""
    },
    {
        "id":  "d16-06",
        "day":  "Day 16",
        "no":  "06",
        "word":  "designated",
        "phonetic":  "[dézignèitid]",
        "partOfSpeech":  "형용사",
        "meaning":  "지정된",
        "relatedForms":  "designate (동) 지정하다",
        "paraphrase":  [
                           "reserved"
                       ],
        "exampleEn":  "designated parking areas",
        "exampleKo":  "지정된 주차 구역",
        "memo":  ""
    },
    {
        "id":  "d16-07",
        "day":  "Day 16",
        "no":  "07",
        "word":  "duplicate",
        "phonetic":  "[djúːpləkèit] / [djúːplikət]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "(중복해서) 다시 하다 / 복제하다, 사본을 만들다 / 복제품, 사본",
        "relatedForms":  "-",
        "paraphrase":  [
                           "repeat",
                           "copy",
                           "reproduction"
                       ],
        "exampleEn":  "It is important to avoid duplicating work when possible.",
        "exampleKo":  "가능한 한 중복 작업을 피하는 것이 중요하다.",
        "memo":  ""
    },
    {
        "id":  "d16-08",
        "day":  "Day 16",
        "no":  "08",
        "word":  "capture",
        "phonetic":  "[kǽptʃər]",
        "partOfSpeech":  "동사",
        "meaning":  "<사람·동물> 포획하다 / 점령하다 / <흥미·관심> 사로잡다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "take",
                           "catch",
                           "grab",
                           "invade",
                           "seize",
                           "occupy",
                           "engage"
                       ],
        "exampleEn":  "capture the enemy's base",
        "exampleKo":  "적의 기지를 점령하다",
        "memo":  "capture the interest of the audience (관객의 흥미를 끌다)"
    },
    {
        "id":  "d16-09",
        "day":  "Day 16",
        "no":  "09",
        "word":  "collaborate",
        "phonetic":  "[kəlǽbərèit]",
        "partOfSpeech":  "동사",
        "meaning":  "협력하다",
        "relatedForms":  "collaboration (명) 협력, 합작(품)",
        "paraphrase":  [
                           "cooperate",
                           "join forces"
                       ],
        "exampleEn":  "collaborate with other departments",
        "exampleKo":  "다른 부서와 협력하다",
        "memo":  ""
    },
    {
        "id":  "d16-10",
        "day":  "Day 16",
        "no":  "10",
        "word":  "chase",
        "phonetic":  "[tʃeis]",
        "partOfSpeech":  "동사",
        "meaning":  "추격하다, 뒤쫓다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "follow",
                           "pursue"
                       ],
        "exampleEn":  "The police were chasing the thief.",
        "exampleKo":  "경찰은 도둑을 쫓고 있었다.",
        "memo":  ""
    },
    {
        "id":  "d16-11",
        "day":  "Day 16",
        "no":  "11",
        "word":  "embarrassed",
        "phonetic":  "[imbǽrəst]",
        "partOfSpeech":  "형용사",
        "meaning":  "당황스러운",
        "relatedForms":  "-",
        "paraphrase":  [
                           "ashamed",
                           "abashed",
                           "uncomfortable"
                       ],
        "exampleEn":  "Ella was embarrassed to find that she had forgotten her wallet.",
        "exampleKo":  "엘라는 지갑을 잊어버린 것을 알고 당황했다.",
        "memo":  ""
    },
    {
        "id":  "d16-12",
        "day":  "Day 16",
        "no":  "12",
        "word":  "deficiency",
        "phonetic":  "[difíʃənsi]",
        "partOfSpeech":  "명사",
        "meaning":  "결핍, 부족",
        "relatedForms":  "deficient (형) 결핍된, 부족한",
        "paraphrase":  [
                           "shortage",
                           "lack",
                           "deficit"
                       ],
        "exampleEn":  "vitamin D deficiency",
        "exampleKo":  "비타민 D 결핍증",
        "memo":  "지텔프 동의어: A deficiency of magnesium can lead to muscle cramps. -> (a) shortage"
    },
    {
        "id":  "d16-13",
        "day":  "Day 16",
        "no":  "13",
        "word":  "cognitive",
        "phonetic":  "[kάgnətiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "인지적인, 인식의",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "theory of cognitive development",
        "exampleKo":  "인지 발달 이론",
        "memo":  ""
    },
    {
        "id":  "d16-14",
        "day":  "Day 16",
        "no":  "14",
        "word":  "theme",
        "phonetic":  "[θiːm]",
        "partOfSpeech":  "명사",
        "meaning":  "주제, 테마",
        "relatedForms":  "-",
        "paraphrase":  [
                           "topic",
                           "subject"
                       ],
        "exampleEn":  "The theme of the painting is hope.",
        "exampleKo":  "이 그림의 주제는 희망이다.",
        "memo":  ""
    },
    {
        "id":  "d16-15",
        "day":  "Day 16",
        "no":  "15",
        "word":  "deter",
        "phonetic":  "[ditə́ːr]",
        "partOfSpeech":  "동사",
        "meaning":  "단념시키다, 그만두게 하다",
        "relatedForms":  "deterrent (명) 억제책",
        "paraphrase":  [
                           "discourage",
                           "inhibit",
                           "stop",
                           "prevent",
                           "prohibit"
                       ],
        "exampleEn":  "The high cost of living can deter people from moving to a new city.",
        "exampleKo":  "높은 생활비는 사람들이 새로운 도시로 이사하는 것을 단념시킬 수 있다.",
        "memo":  ""
    },
    {
        "id":  "d16-16",
        "day":  "Day 16",
        "no":  "16",
        "word":  "acting",
        "phonetic":  "[ǽktiŋ]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "연기 / 대행하는, 대리의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "performance",
                           "temporary",
                           "interim"
                       ],
        "exampleEn":  "an acting career",
        "exampleKo":  "연기 경력",
        "memo":  "an acting manager (부장 대리인)"
    },
    {
        "id":  "d16-17",
        "day":  "Day 16",
        "no":  "17",
        "word":  "session",
        "phonetic":  "[séʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "기간, 시간",
        "relatedForms":  "-",
        "paraphrase":  [
                           "period",
                           "time"
                       ],
        "exampleEn":  "a training session",
        "exampleKo":  "연수 기간",
        "memo":  "a therapy session (치료 시간)"
    },
    {
        "id":  "d16-18",
        "day":  "Day 16",
        "no":  "18",
        "word":  "symptom",
        "phonetic":  "[símptəm]",
        "partOfSpeech":  "명사",
        "meaning":  "증상 / 징후",
        "relatedForms":  "-",
        "paraphrase":  [
                           "indication",
                           "sign"
                       ],
        "exampleEn":  "have mild cold symptoms",
        "exampleKo":  "가벼운 감기 증상이 있다",
        "memo":  ""
    },
    {
        "id":  "d16-19",
        "day":  "Day 16",
        "no":  "19",
        "word":  "integrate",
        "phonetic":  "[íntəgrèit]",
        "partOfSpeech":  "동사",
        "meaning":  "통합되다, 통합하다",
        "relatedForms":  "integration (명) 통합",
        "paraphrase":  [
                           "combine",
                           "join",
                           "unite"
                       ],
        "exampleEn":  "The marketing department will be integrated with the public relations department.",
        "exampleKo":  "마케팅 부서는 홍보 부서와 통합될 것이다.",
        "memo":  ""
    },
    {
        "id":  "d16-20",
        "day":  "Day 16",
        "no":  "20",
        "word":  "conserve",
        "phonetic":  "[kənsə́ːrv]",
        "partOfSpeech":  "동사",
        "meaning":  "보존하다, 보호하다",
        "relatedForms":  "conservation (명) 보존, 보호",
        "paraphrase":  [
                           "protect",
                           "preserve",
                           "save"
                       ],
        "exampleEn":  "conserve the environment by recycling",
        "exampleKo":  "재활용하여 환경을 보호하다",
        "memo":  "지텔프 동의어: We have a responsibility to conserve our woodlands to ensure a healthy environment. -> (b) preserve"
    },
    {
        "id":  "d16-21",
        "day":  "Day 16",
        "no":  "21",
        "word":  "attire",
        "phonetic":  "[ətáiər]",
        "partOfSpeech":  "명사",
        "meaning":  "의복, 복장",
        "relatedForms":  "-",
        "paraphrase":  [
                           "clothes",
                           "clothing",
                           "gear",
                           "garment",
                           "apparel"
                       ],
        "exampleEn":  "formal attire",
        "exampleKo":  "정장",
        "memo":  ""
    },
    {
        "id":  "d16-22",
        "day":  "Day 16",
        "no":  "22",
        "word":  "manuscript",
        "phonetic":  "[mǽnjəskrìpt]",
        "partOfSpeech":  "명사",
        "meaning":  "원고",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "proofread a manuscript",
        "exampleKo":  "원고를 교정하다",
        "memo":  ""
    },
    {
        "id":  "d16-23",
        "day":  "Day 16",
        "no":  "23",
        "word":  "disappear",
        "phonetic":  "[dìsəpíər]",
        "partOfSpeech":  "동사",
        "meaning":  "사라지다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "vanish"
                       ],
        "exampleEn":  "Maria suddenly disappeared from the party.",
        "exampleKo":  "마리아는 갑자기 파티에서 사라졌다.",
        "memo":  ""
    },
    {
        "id":  "d16-24",
        "day":  "Day 16",
        "no":  "24",
        "word":  "navigation",
        "phonetic":  "[næ̀vəgéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "운항, 항해",
        "relatedForms":  "navigate (동) 길을 찾다; 운항하다, 항해하다",
        "paraphrase":  [

                       ],
        "exampleEn":  "The navigation system is an important tool for pilots.",
        "exampleKo":  "내비게이션 시스템은 조종사들에게 중요한 도구이다.",
        "memo":  ""
    },
    {
        "id":  "d16-25",
        "day":  "Day 16",
        "no":  "25",
        "word":  "expire",
        "phonetic":  "[ikspáiər]",
        "partOfSpeech":  "동사",
        "meaning":  "만료되다",
        "relatedForms":  "expiration (명) 만료",
        "paraphrase":  [
                           "end"
                       ],
        "exampleEn":  "The contract expires in six months.",
        "exampleKo":  "그 계약은 6개월 후에 만료된다.",
        "memo":  ""
    },
    {
        "id":  "d16-26",
        "day":  "Day 16",
        "no":  "26",
        "word":  "authentic",
        "phonetic":  "[ɔːθéntik]",
        "partOfSpeech":  "형용사",
        "meaning":  "진짜의, 정통의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "original",
                           "genuine",
                           "real"
                       ],
        "exampleEn":  "authentic Chinese cuisine",
        "exampleKo":  "정통 중국 요리",
        "memo":  "This work of art is authentic. (이 예술 작품은 진품이다.)"
    },
    {
        "id":  "d16-27",
        "day":  "Day 16",
        "no":  "27",
        "word":  "diplomatic",
        "phonetic":  "[dìpləmǽtik]",
        "partOfSpeech":  "형용사",
        "meaning":  "외교의",
        "relatedForms":  "diplomat (명) 외교관",
        "paraphrase":  [

                       ],
        "exampleEn":  "a diplomatic dispute",
        "exampleKo":  "외교 분쟁",
        "memo":  ""
    },
    {
        "id":  "d16-28",
        "day":  "Day 16",
        "no":  "28",
        "word":  "defy",
        "phonetic":  "[difái]",
        "partOfSpeech":  "동사",
        "meaning":  "반항하다, 무시하다 / ~이 불가능하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "disobey",
                           "challenge",
                           "resist",
                           "oppose",
                           "confront",
                           "disregard"
                       ],
        "exampleEn":  "defy the government's rules and regulations",
        "exampleKo":  "정부의 규칙과 규제를 무시하다",
        "memo":  "지텔프 동의어: Daniel defied the king's orders and was promptly executed. -> (b) disobeyed | defy explanation (설명이 불가능하다)"
    },
    {
        "id":  "d16-29",
        "day":  "Day 16",
        "no":  "29",
        "word":  "await",
        "phonetic":  "[əwéit]",
        "partOfSpeech":  "동사",
        "meaning":  "기다리다",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "await the results of the test",
        "exampleKo":  "시험 결과를 기다리다",
        "memo":  ""
    },
    {
        "id":  "d16-30",
        "day":  "Day 16",
        "no":  "30",
        "word":  "celebrate",
        "phonetic":  "[séləbrèit]",
        "partOfSpeech":  "동사",
        "meaning":  "축하하다",
        "relatedForms":  "celebration (명) 축하(행사)",
        "paraphrase":  [
                           "commemorate",
                           "observe"
                       ],
        "exampleEn":  "celebrate an anniversary",
        "exampleKo":  "기념일을 축하하다",
        "memo":  ""
    },
    {
        "id":  "d16-31",
        "day":  "Day 16",
        "no":  "31",
        "word":  "entrance",
        "phonetic":  "[éntrəns]",
        "partOfSpeech":  "명사",
        "meaning":  "입구 / 입학",
        "relatedForms":  "enter (동) 들어가다; 입학하다",
        "paraphrase":  [
                           "entry",
                           "access",
                           "gate",
                           "admission"
                       ],
        "exampleEn":  "the entrance to the library",
        "exampleKo":  "도서관 입구",
        "memo":  "a university entrance exam (대학 입학 시험)"
    },
    {
        "id":  "d16-32",
        "day":  "Day 16",
        "no":  "32",
        "word":  "reinforce",
        "phonetic":  "[rìːinfɔ́ːrs]",
        "partOfSpeech":  "동사",
        "meaning":  "강화하다, 보강하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "support",
                           "strengthen",
                           "fortify"
                       ],
        "exampleEn":  "reinforce the argument with data from a recent study",
        "exampleKo":  "최근 연구 자료를 활용하여 논점을 강화하다",
        "memo":  ""
    },
    {
        "id":  "d16-33",
        "day":  "Day 16",
        "no":  "33",
        "word":  "destination",
        "phonetic":  "[dèstənéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "목적지",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "reach our destination",
        "exampleKo":  "우리의 목적지에 도착하다",
        "memo":  "a tourist destination (관광지)"
    },
    {
        "id":  "d16-34",
        "day":  "Day 16",
        "no":  "34",
        "word":  "intrigue",
        "phonetic":  "[intríːg]",
        "partOfSpeech":  "동사",
        "meaning":  "흥미를 일으키다",
        "relatedForms":  "intriguing (형) 흥미로운",
        "paraphrase":  [
                           "interest",
                           "charm",
                           "fascinate"
                       ],
        "exampleEn":  "Charles was intrigued by the mystery of the Pyramids.",
        "exampleKo":  "찰스는 피라미드의 신비에 흥미를 느꼈다.",
        "memo":  ""
    },
    {
        "id":  "d16-35",
        "day":  "Day 16",
        "no":  "35",
        "word":  "fiction",
        "phonetic":  "[fíkʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "소설",
        "relatedForms":  "-",
        "paraphrase":  [
                           "novel",
                           "tale"
                       ],
        "exampleEn":  "science fiction",
        "exampleKo":  "공상 과학 소설",
        "memo":  ""
    },
    {
        "id":  "d16-36",
        "day":  "Day 16",
        "no":  "36",
        "word":  "costume",
        "phonetic":  "[kάstjuːm]",
        "partOfSpeech":  "명사",
        "meaning":  "의상, 분장",
        "relatedForms":  "-",
        "paraphrase":  [
                           "outfit",
                           "dress"
                       ],
        "exampleEn":  "a costume party",
        "exampleKo":  "코스튬 파티",
        "memo":  ""
    },
    {
        "id":  "d16-37",
        "day":  "Day 16",
        "no":  "37",
        "word":  "distance",
        "phonetic":  "[dístəns]",
        "partOfSpeech":  "명사",
        "meaning":  "거리",
        "relatedForms":  "distant (형) (거리가) 먼; (친척 관계가) 먼",
        "paraphrase":  [

                       ],
        "exampleEn":  "travel long distances",
        "exampleKo":  "장거리를 여행하다",
        "memo":  ""
    },
    {
        "id":  "d16-38",
        "day":  "Day 16",
        "no":  "38",
        "word":  "deviate",
        "phonetic":  "[díːvièit]",
        "partOfSpeech":  "동사",
        "meaning":  "벗어나다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "differ",
                           "depart",
                           "stray"
                       ],
        "exampleEn":  "The participants deviated from the expected behavior.",
        "exampleKo":  "참가자들은 예상된 행동에서 벗어났다.",
        "memo":  "지텔프 동의어: Michelle decided to deviate from the norm. -> (a) differ"
    },
    {
        "id":  "d16-39",
        "day":  "Day 16",
        "no":  "39",
        "word":  "legend",
        "phonetic":  "[lédʒənd]",
        "partOfSpeech":  "명사",
        "meaning":  "전설(적인 인물)",
        "relatedForms":  "legendary (형) 전설적인; 전설에 나오는",
        "paraphrase":  [

                       ],
        "exampleEn":  "The Beatles' music became legend.",
        "exampleKo":  "비틀즈의 음악은 전설이 되었다.",
        "memo":  ""
    },
    {
        "id":  "d16-40",
        "day":  "Day 16",
        "no":  "40",
        "word":  "compose",
        "phonetic":  "[kəmpóuz]",
        "partOfSpeech":  "동사",
        "meaning":  "구성하다 / 작곡하다 / 쓰다, 작성하다",
        "relatedForms":  "composer (명) 작곡가",
        "paraphrase":  [
                           "comprise",
                           "make",
                           "create",
                           "produce"
                       ],
        "exampleEn":  "The United States is composed of fifty states.",
        "exampleKo":  "미국은 50개의 주로 구성되어 있다.",
        "memo":  "compose a letter (편지를 쓰다)"
    },
    {
        "id":  "d16-41",
        "day":  "Day 16",
        "no":  "41",
        "word":  "marine",
        "phonetic":  "[məríːn]",
        "partOfSpeech":  "형용사",
        "meaning":  "해양의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "maritime"
                       ],
        "exampleEn":  "marine mammals",
        "exampleKo":  "해양 포유동물",
        "memo":  ""
    },
    {
        "id":  "d16-42",
        "day":  "Day 16",
        "no":  "42",
        "word":  "complex",
        "phonetic":  "[kάmpleks]",
        "partOfSpeech":  "형용사/명사",
        "meaning":  "복잡한 / (건물) 단지",
        "relatedForms":  "-",
        "paraphrase":  [
                           "complicated",
                           "elaborate",
                           "intricate"
                       ],
        "exampleEn":  "a complex structure",
        "exampleKo":  "복잡한 구조",
        "memo":  "an apartment complex (아파트 단지)"
    },
    {
        "id":  "d16-43",
        "day":  "Day 16",
        "no":  "43",
        "word":  "prose",
        "phonetic":  "[prouz]",
        "partOfSpeech":  "명사",
        "meaning":  "산문, 산문체",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "a literary work written in prose",
        "exampleKo":  "산문으로 쓰여진 문학 작품",
        "memo":  ""
    },
    {
        "id":  "d16-44",
        "day":  "Day 16",
        "no":  "44",
        "word":  "distract",
        "phonetic":  "[distrǽkt]",
        "partOfSpeech":  "동사",
        "meaning":  "산만하게 하다, 집중을 방해하다",
        "relatedForms":  "distraction (명) 산만하게 하는 것; 집중을 방해하는 것",
        "paraphrase":  [
                           "divert",
                           "sidetrack"
                       ],
        "exampleEn":  "The noise from the construction work distracted attention from the meeting.",
        "exampleKo":  "공사 소음이 회의 참석자들의 주의를 산만하게 했다.",
        "memo":  ""
    },
    {
        "id":  "d16-45",
        "day":  "Day 16",
        "no":  "45",
        "word":  "disorder",
        "phonetic":  "[disɔ́ːrdər]",
        "partOfSpeech":  "명사",
        "meaning":  "이상, 장애 / 무질서, 혼란",
        "relatedForms":  "-",
        "paraphrase":  [
                           "disease",
                           "illness",
                           "chaos",
                           "disturbance",
                           "unrest",
                           "turmoil"
                       ],
        "exampleEn":  "eating disorders",
        "exampleKo":  "섭식 장애",
        "memo":  ""
    },
    {
        "id":  "d16-46",
        "day":  "Day 16",
        "no":  "46",
        "word":  "shed",
        "phonetic":  "[ʃed]",
        "partOfSpeech":  "동사",
        "meaning":  "~을 밝히다, 조명하다 / <껍질 등> 벗기다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "remove",
                           "lose"
                       ],
        "exampleEn":  "The data sheds light on the impact of the recession on families.",
        "exampleKo":  "이 자료는 불경기가 가정에 미치는 영향을 조명한다.",
        "memo":  "The snake shed its skin. (뱀이 허물을 벗었다.)"
    },
    {
        "id":  "d16-47",
        "day":  "Day 16",
        "no":  "47",
        "word":  "eagerly",
        "phonetic":  "[íːgərli]",
        "partOfSpeech":  "부사",
        "meaning":  "열렬히, 간절히",
        "relatedForms":  "-",
        "paraphrase":  [
                           "keenly",
                           "anxiously"
                       ],
        "exampleEn":  "eagerly anticipate the release of the new iPhone",
        "exampleKo":  "신형 아이폰 출시를 간절히 기다리다",
        "memo":  ""
    },
    {
        "id":  "d16-48",
        "day":  "Day 16",
        "no":  "48",
        "word":  "fatal",
        "phonetic":  "[féitl]",
        "partOfSpeech":  "형용사",
        "meaning":  "치명적인, 죽음을 초래하는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "lethal",
                           "disastrous"
                       ],
        "exampleEn":  "a fatal accident",
        "exampleKo":  "치명적인 사고",
        "memo":  ""
    },
    {
        "id":  "d16-49",
        "day":  "Day 16",
        "no":  "49",
        "word":  "portray",
        "phonetic":  "[pɔːrtréi]",
        "partOfSpeech":  "동사",
        "meaning":  "<글, 그림 등으로> 묘사하다, 표현하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "depict",
                           "display",
                           "describe"
                       ],
        "exampleEn":  "portray the character as a villain",
        "exampleKo":  "그 인물을 악역으로 표현하다",
        "memo":  "지텔프 동의어: The novel portrays the struggles of a family during the war. -> (a) depicts"
    },
    {
        "id":  "d16-50",
        "day":  "Day 16",
        "no":  "50",
        "word":  "exempt",
        "phonetic":  "[igzémpt]",
        "partOfSpeech":  "동사",
        "meaning":  "면제하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "free",
                           "excuse"
                       ],
        "exampleEn":  "Senior citizens are exempted from paying the entrance fee.",
        "exampleKo":  "노인들은 입장료를 면제받는다.",
        "memo":  ""
    },
  {
        "id":  "d17-01",
        "day":  "Day 17",
        "no":  "01",
        "word":  "proximity",
        "phonetic":  "[prɑksíməti]",
        "partOfSpeech":  "명사",
        "meaning":  "<거리·시간 등> 가까움, 근접(성)",
        "relatedForms":  "-",
        "paraphrase":  [
                           "nearness",
                           "vicinity",
                           "closeness"
                       ],
        "exampleEn":  "The hotel is in proximity to the airport.",
        "exampleKo":  "그 호텔은 공항에서 가깝다.",
        "memo":  "지텔프 동의어: The proximity of the two countries makes trade between them easier. -> (a) nearness"
    },
    {
        "id":  "d17-02",
        "day":  "Day 17",
        "no":  "02",
        "word":  "debris",
        "phonetic":  "[dəbríː]",
        "partOfSpeech":  "명사",
        "meaning":  "잔해",
        "relatedForms":  "-",
        "paraphrase":  [
                           "remains",
                           "fragments"
                       ],
        "exampleEn":  "the debris of a plane crash",
        "exampleKo":  "추락한 비행기의 잔해",
        "memo":  ""
    },
    {
        "id":  "d17-03",
        "day":  "Day 17",
        "no":  "03",
        "word":  "insurance",
        "phonetic":  "[inʃúərəns]",
        "partOfSpeech":  "명사",
        "meaning":  "보험",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "The company provides health insurance to its employees.",
        "exampleKo":  "회사는 직원들에게 건강 보험을 제공한다.",
        "memo":  ""
    },
    {
        "id":  "d17-04",
        "day":  "Day 17",
        "no":  "04",
        "word":  "expel",
        "phonetic":  "[ikspél]",
        "partOfSpeech":  "동사",
        "meaning":  "추방하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "banish",
                           "remove",
                           "exile"
                       ],
        "exampleEn":  "expel illegal immigrants",
        "exampleKo":  "불법 이민자를 추방하다",
        "memo":  ""
    },
    {
        "id":  "d17-05",
        "day":  "Day 17",
        "no":  "05",
        "word":  "erupt",
        "phonetic":  "[irʌ́pt]",
        "partOfSpeech":  "동사",
        "meaning":  "<화산이> 폭발하다, 분출하다 / <사태 등이> 발생하다, 터지다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "explode"
                       ],
        "exampleEn":  "A volcano erupted in Iceland near the capital Reykjavik.",
        "exampleKo":  "아이슬란드 수도 레이캬비크 근처에서 화산이 폭발했다.",
        "memo":  "Cries for help erupted from the crowd. (군중으로부터 도움을 외치는 소리가 터져 나왔다.)"
    },
    {
        "id":  "d17-06",
        "day":  "Day 17",
        "no":  "06",
        "word":  "formal",
        "phonetic":  "[fɔ́ːrməl]",
        "partOfSpeech":  "형용사",
        "meaning":  "공식적인, 정식의 / 격식을 차린",
        "relatedForms":  "formally (부) 공식적으로; 정중하게",
        "paraphrase":  [
                           "official"
                       ],
        "exampleEn":  "Ashley didn't attain formal education.",
        "exampleKo":  "애슐리는 정식 교육을 받지 못했다.",
        "memo":  "You should wear formal attire for the event. (당신은 그 행사를 위해 정장을 입어야 합니다.)"
    },
    {
        "id":  "d17-07",
        "day":  "Day 17",
        "no":  "07",
        "word":  "withstand",
        "phonetic":  "[widstǽnd]",
        "partOfSpeech":  "동사",
        "meaning":  "견디다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "endure",
                           "resist"
                       ],
        "exampleEn":  "withstand wear and tear",
        "exampleKo":  "마모를 견디다",
        "memo":  "The fabric can withstand high temperatures. (그 천은 고온을 견딜 수 있다.)"
    },
    {
        "id":  "d17-08",
        "day":  "Day 17",
        "no":  "08",
        "word":  "dissolve",
        "phonetic":  "[dizάlv]",
        "partOfSpeech":  "동사",
        "meaning":  "용해되다, 녹다 / ~을 끝내다, 해체하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "melt",
                           "end",
                           "dismantle"
                       ],
        "exampleEn":  "The tablet dissolves in water.",
        "exampleKo":  "그 알약은 물에 녹는다.",
        "memo":  "The Soviet Union was dissolved into 15 countries. (소련은 15개국으로 해체되었다.)"
    },
    {
        "id":  "d17-09",
        "day":  "Day 17",
        "no":  "09",
        "word":  "consume",
        "phonetic":  "[kənsúːm]",
        "partOfSpeech":  "동사",
        "meaning":  "먹다, 섭취하다 / 소비하다, 쓰다",
        "relatedForms":  "consumer (명) 소비자",
        "paraphrase":  [
                           "eat",
                           "swallow",
                           "use",
                           "spend"
                       ],
        "exampleEn":  "This food should be consumed within two hours.",
        "exampleKo":  "이 음식은 2시간 이내에 먹어야 한다.",
        "memo":  "This hair dryer consumes much electricity. (이 헤어드라이어는 많은 전기를 소비한다.)"
    },
    {
        "id":  "d17-10",
        "day":  "Day 17",
        "no":  "10",
        "word":  "fearful",
        "phonetic":  "[fíərfəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "두려워하는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "scared",
                           "afraid",
                           "frightened"
                       ],
        "exampleEn":  "The squirrels are usually fearful of humans.",
        "exampleKo":  "다람쥐는 보통 사람을 무서워한다.",
        "memo":  ""
    },
    {
        "id":  "d17-11",
        "day":  "Day 17",
        "no":  "11",
        "word":  "fortress",
        "phonetic":  "[fɔ́ːrtris]",
        "partOfSpeech":  "명사",
        "meaning":  "요새",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "This medieval fortress was built with stones.",
        "exampleKo":  "이 중세시대 요새는 돌로 지어졌다.",
        "memo":  ""
    },
    {
        "id":  "d17-12",
        "day":  "Day 17",
        "no":  "12",
        "word":  "frustrate",
        "phonetic":  "[frʌ́streit]",
        "partOfSpeech":  "동사",
        "meaning":  "짜증나게 하다, 답답하게 하다 / <시도, 계획 등> 좌절시키다",
        "relatedForms":  "frustration (명) 짜증, 답답함; 좌절",
        "paraphrase":  [
                           "annoy",
                           "stop",
                           "discourage",
                           "inhibit",
                           "foil",
                           "thwart"
                       ],
        "exampleEn":  "be frustrated with the restaurant's service",
        "exampleKo":  "레스토랑의 서비스에 답답함을 느끼다",
        "memo":  "지텔프 동의어: The leg injury frustrated his attempts to win the race. -> (b) discouraged | The bad weather frustrated our plans. (나쁜 날씨는 우리의 계획을 좌절시켰다.)"
    },
    {
        "id":  "d17-13",
        "day":  "Day 17",
        "no":  "13",
        "word":  "opening",
        "phonetic":  "[óupniŋ]",
        "partOfSpeech":  "명사",
        "meaning":  "빈 일자리, 공석 / 개업, 개장",
        "relatedForms":  "-",
        "paraphrase":  [
                           "opportunity",
                           "beginning",
                           "launch",
                           "start"
                       ],
        "exampleEn":  "announce job openings",
        "exampleKo":  "빈 일자리를 광고하다 (채용 공고를 내다)",
        "memo":  "the opening of a new museum (새로운 박물관의 개장)"
    },
    {
        "id":  "d17-14",
        "day":  "Day 17",
        "no":  "14",
        "word":  "historic",
        "phonetic":  "[histɔ́ːrik]",
        "partOfSpeech":  "형용사",
        "meaning":  "역사적으로 중요한, 역사적인",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "a historic speech",
        "exampleKo":  "역사적인 연설",
        "memo":  "The theater was recognized as a historic site. (그 극장은 역사적인 장소로 인정받았다.)"
    },
    {
        "id":  "d17-15",
        "day":  "Day 17",
        "no":  "15",
        "word":  "disapprove",
        "phonetic":  "[dìsəprúːv]",
        "partOfSpeech":  "동사",
        "meaning":  "반대하다, 못마땅해하다",
        "relatedForms":  "approve (동) 찬성하다, 허락하다; 승인하다, disapproval (명) 반대, 못마땅해함",
        "paraphrase":  [
                           "dislike",
                           "deplore"
                       ],
        "exampleEn":  "My mom disapproved of my decision to major in art.",
        "exampleKo":  "어머니는 미술을 전공하기로 한 나의 결정을 못마땅해했다.",
        "memo":  ""
    },
    {
        "id":  "d17-16",
        "day":  "Day 17",
        "no":  "16",
        "word":  "trait",
        "phonetic":  "[treit]",
        "partOfSpeech":  "명사",
        "meaning":  "특징, 특성",
        "relatedForms":  "-",
        "paraphrase":  [
                           "characteristic",
                           "feature",
                           "attribute"
                       ],
        "exampleEn":  "genetic traits of seeds",
        "exampleKo":  "씨앗의 유전적 특징",
        "memo":  "지텔프 동의어: Some common traits of successful people are hard work and determination. -> (a) characteristics | a dog's behavioral traits (개의 행동 특성)"
    },
    {
        "id":  "d17-17",
        "day":  "Day 17",
        "no":  "17",
        "word":  "humble",
        "phonetic":  "[hʌ́mbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "겸손한 / 미천한, 보잘것없는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "modest",
                           "simple",
                           "poor",
                           "insignificant"
                       ],
        "exampleEn":  "a humble person",
        "exampleKo":  "겸손한 사람",
        "memo":  "humble origins (미천한 출신)"
    },
    {
        "id":  "d17-18",
        "day":  "Day 17",
        "no":  "18",
        "word":  "disregard",
        "phonetic":  "[dìsrigάːrd]",
        "partOfSpeech":  "동사",
        "meaning":  "무시하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "ignore",
                           "neglect"
                       ],
        "exampleEn":  "Please disregard my previous e-mail.",
        "exampleKo":  "제가 이전에 보냈던 이메일은 무시해 주세요.",
        "memo":  ""
    },
    {
        "id":  "d17-19",
        "day":  "Day 17",
        "no":  "19",
        "word":  "derive",
        "phonetic":  "[diráiv]",
        "partOfSpeech":  "동사",
        "meaning":  "~에서 유래되다, 비롯되다 / 얻다, 끌어내다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "take",
                           "obtain",
                           "get",
                           "receive",
                           "gather",
                           "collect"
                       ],
        "exampleEn":  "The English word \"story\" derives from the Greek word \"historia.\"",
        "exampleKo":  "\"story\"라는 영단어는 그리스어 \"historia\"에서 유래했다.",
        "memo":  "Los Angeles derives a lot of revenue from the sales of cars. (로스앤젤레스는 자동차 판매로 많은 수익을 얻는다.)"
    },
    {
        "id":  "d17-20",
        "day":  "Day 17",
        "no":  "20",
        "word":  "evaporate",
        "phonetic":  "[ivǽpərèit]",
        "partOfSpeech":  "동사",
        "meaning":  "<액체 등> 증발하다, 증발시키다",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "The sweat evaporates through the skin.",
        "exampleKo":  "땀은 피부를 통해 증발한다.",
        "memo":  ""
    },
    {
        "id":  "d17-21",
        "day":  "Day 17",
        "no":  "21",
        "word":  "ignore",
        "phonetic":  "[ignɔ́ːr]",
        "partOfSpeech":  "동사",
        "meaning":  "무시하다",
        "relatedForms":  "ignorant (형) 무지한, 무식한, ignorance (명) 무지(함), 무식(함)",
        "paraphrase":  [
                           "disregard",
                           "neglect"
                       ],
        "exampleEn":  "ignore social norms",
        "exampleKo":  "사회 규범을 무시하다",
        "memo":  "ignore harsh criticism (혹평을 무시하다)"
    },
    {
        "id":  "d17-22",
        "day":  "Day 17",
        "no":  "22",
        "word":  "maturity",
        "phonetic":  "[mətʃúərəti]",
        "partOfSpeech":  "명사",
        "meaning":  "<사람, 동식물 등> 다 자란 상태 / 성숙함, 어른스러움",
        "relatedForms":  "mature (형) 다 자란; 어른스러운, 성숙한",
        "paraphrase":  [
                           "adulthood"
                       ],
        "exampleEn":  "Trees reach maturity at different ages, depending on the species.",
        "exampleKo":  "나무는 종에 따라 다양한 나이에 성숙기에 도달한다.",
        "memo":  "It takes maturity to stay calm in stressful situations. (스트레스가 많은 상황에서 침착함을 유지하기 위해서는 성숙함이 필요하다.)"
    },
    {
        "id":  "d17-23",
        "day":  "Day 17",
        "no":  "23",
        "word":  "industrial",
        "phonetic":  "[indʌ́striəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "산업의, 공업의",
        "relatedForms":  "industry (명) 산업, 공업",
        "paraphrase":  [

                       ],
        "exampleEn":  "industrial safety standards",
        "exampleKo":  "산업 안전 기준",
        "memo":  "common industrial products (일반 공산품)"
    },
    {
        "id":  "d17-24",
        "day":  "Day 17",
        "no":  "24",
        "word":  "foster",
        "phonetic":  "[fɔ́ːstər]",
        "partOfSpeech":  "동사",
        "meaning":  "조성하다, 발전시키다 / (남의 아이를) 키우다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "develop",
                           "support",
                           "promote",
                           "encourage",
                           "bring up",
                           "raise",
                           "nurture"
                       ],
        "exampleEn":  "foster teamwork and collaboration",
        "exampleKo":  "팀워크와 협동심을 기르다[발전시키다]",
        "memo":  "지텔프 동의어: It is important to foster a sense of cooperation among team members. -> (a) encourage | decide to foster a child from the local orphanage (지역 고아원에서 아이를 입양하기로 결정하다)"
    },
    {
        "id":  "d17-25",
        "day":  "Day 17",
        "no":  "25",
        "word":  "general",
        "phonetic":  "[dʒénərəl]",
        "partOfSpeech":  "형용사/명사",
        "meaning":  "일반적인, 전반적인 / 장군",
        "relatedForms":  "generally (부) 일반적으로; 보통, 대개",
        "paraphrase":  [
                           "widespread",
                           "common",
                           "broad",
                           "prevalent"
                       ],
        "exampleEn":  "There is general concern about growing political tensions.",
        "exampleKo":  "점차적 긴장이 고조되는 것에 대해 대부분이 우려하고 있다.",
        "memo":  "general interest (일반적인 관심사)"
    },
    {
        "id":  "d17-26",
        "day":  "Day 17",
        "no":  "26",
        "word":  "evade",
        "phonetic":  "[ivéid]",
        "partOfSpeech":  "동사",
        "meaning":  "피하다 / <의무 등> 회피하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "avoid",
                           "escape"
                       ],
        "exampleEn":  "evade the police",
        "exampleKo":  "경찰을 피하다",
        "memo":  "evade a question (질문을 회피하다), evade tax payments (탈세하다)"
    },
    {
        "id":  "d17-27",
        "day":  "Day 17",
        "no":  "27",
        "word":  "fulfill",
        "phonetic":  "[fulfíl]",
        "partOfSpeech":  "동사",
        "meaning":  "<의무 등> 수행하다, 완료하다 / <꿈, 목표를> 달성하다, 이루다",
        "relatedForms":  "fulfillment (명) 성취(감); 수행, 이행",
        "paraphrase":  [
                           "perform",
                           "complete",
                           "realize",
                           "achieve",
                           "accomplish"
                       ],
        "exampleEn":  "fulfill a task",
        "exampleKo":  "업무를 수행하다",
        "memo":  "To fulfill his dream, Mark worked harder. (자신의 꿈을 이루기 위해 마크는 더 열심히 일했다.)"
    },
    {
        "id":  "d17-28",
        "day":  "Day 17",
        "no":  "28",
        "word":  "humidity",
        "phonetic":  "[hjuːmídəti]",
        "partOfSpeech":  "명사",
        "meaning":  "습도",
        "relatedForms":  "humid (형) 습한",
        "paraphrase":  [
                           "moisture",
                           "damp"
                       ],
        "exampleEn":  "The humidity in the room is very high.",
        "exampleKo":  "방안의 습도가 매우 높다.",
        "memo":  ""
    },
    {
        "id":  "d17-29",
        "day":  "Day 17",
        "no":  "29",
        "word":  "circular",
        "phonetic":  "[sə́ːrkjələr]",
        "partOfSpeech":  "형용사",
        "meaning":  "원형의, 둥근",
        "relatedForms":  "-",
        "paraphrase":  [
                           "round"
                       ],
        "exampleEn":  "The rocks are in a circular formation.",
        "exampleKo":  "돌들이 원형을 이루고 있다.",
        "memo":  "A fly typically flies in a circular motion. (파리는 보통 원형으로 난다.)"
    },
    {
        "id":  "d17-30",
        "day":  "Day 17",
        "no":  "30",
        "word":  "incredibly",
        "phonetic":  "[inkrédəbli]",
        "partOfSpeech":  "부사",
        "meaning":  "믿기 힘들게도 / 엄청나게, 대단히",
        "relatedForms":  "incredible (형) 믿기 힘든; 엄청난, 대단한",
        "paraphrase":  [
                           "unbelievably",
                           "amazingly"
                       ],
        "exampleEn":  "Incredibly, no one was injured from the fire.",
        "exampleKo":  "믿기 힘들게도, 그 화재로 다친 사람은 아무도 없었다.",
        "memo":  "an incredibly beautiful painting (엄청나게 아름다운 그림)"
    },
    {
        "id":  "d17-31",
        "day":  "Day 17",
        "no":  "31",
        "word":  "gradually",
        "phonetic":  "[grǽdʒuəli]",
        "partOfSpeech":  "부사",
        "meaning":  "서서히, 점차적으로",
        "relatedForms":  "gradual (형) 점진적인",
        "paraphrase":  [
                           "steadily",
                           "slowly",
                           "progressively"
                       ],
        "exampleEn":  "The leaves gradually perished due to the lack of sunlight.",
        "exampleKo":  "햇빛 부족으로 나뭇잎이 서서히 시들었다.",
        "memo":  "gradually progress from a small startup to a large corporation (작은 스타트업에서 점차 큰 회사로 발전하다)"
    },
    {
        "id":  "d17-32",
        "day":  "Day 17",
        "no":  "32",
        "word":  "intend",
        "phonetic":  "[inténd]",
        "partOfSpeech":  "동사",
        "meaning":  "의도하다, 계획하다",
        "relatedForms":  "intent (형) 열중하는, (명) 의도",
        "paraphrase":  [
                           "plan",
                           "aim",
                           "mean"
                       ],
        "exampleEn":  "intend to deceive customers",
        "exampleKo":  "고객을 속이려고 의도하다",
        "memo":  "intend to be a writer (작가가 되기로 계획하다)"
    },
    {
        "id":  "d17-33",
        "day":  "Day 17",
        "no":  "33",
        "word":  "adverse",
        "phonetic":  "[ædvə́ːrs]",
        "partOfSpeech":  "형용사",
        "meaning":  "좋지 않은, 불리한",
        "relatedForms":  "adversely (부) 불리하게, 안 좋게",
        "paraphrase":  [
                           "harmful",
                           "negative",
                           "unfavorable"
                       ],
        "exampleEn":  "adverse weather conditions",
        "exampleKo":  "불리한 기상 조건",
        "memo":  "지텔프 동의어: The adverse effects of smoking can lead to a variety of health problems. -> (b) harmful | adverse effect (역효과)"
    },
    {
        "id":  "d17-34",
        "day":  "Day 17",
        "no":  "34",
        "word":  "helpless",
        "phonetic":  "[hélplis]",
        "partOfSpeech":  "형용사",
        "meaning":  "무력한, 속수무책의, 의지할 곳 없는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "vulnerable",
                           "unprotected",
                           "exposed",
                           "weak"
                       ],
        "exampleEn":  "The bug may look small and helpless, but it is strong.",
        "exampleKo":  "이 벌레는 작고 무력해 보일 수 있지만 강하다.",
        "memo":  ""
    },
    {
        "id":  "d17-35",
        "day":  "Day 17",
        "no":  "35",
        "word":  "loosen",
        "phonetic":  "[lúːsn]",
        "partOfSpeech":  "동사",
        "meaning":  "느슨하게 하다, 완화하다",
        "relatedForms":  "loose (형) 느슨한; 헐렁한",
        "paraphrase":  [
                           "ease",
                           "relax",
                           "untie"
                       ],
        "exampleEn":  "loosen the screws",
        "exampleKo":  "나사를 풀다",
        "memo":  "loosen the restrictions (규제를 느슨히 하다)"
    },
    {
        "id":  "d17-36",
        "day":  "Day 17",
        "no":  "36",
        "word":  "surpass",
        "phonetic":  "[sərpǽs]",
        "partOfSpeech":  "동사",
        "meaning":  "넘어서다, 능가하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "exceed",
                           "outdo",
                           "beat"
                       ],
        "exampleEn":  "surpass our expectations",
        "exampleKo":  "우리의 기대를 능가하다",
        "memo":  "Erica has surpassed her teacher's swimming ability. (에리카는 선생님의 수영 실력을 능가했다.)"
    },
    {
        "id":  "d17-37",
        "day":  "Day 17",
        "no":  "37",
        "word":  "grateful",
        "phonetic":  "[gréitfəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "감사하는",
        "relatedForms":  "gratitude (명) 감사",
        "paraphrase":  [
                           "thankful",
                           "appreciative"
                       ],
        "exampleEn":  "Sarah is grateful to her mentors for their advice.",
        "exampleKo":  "사라는 멘토들의 조언에 감사한다.",
        "memo":  ""
    },
    {
        "id":  "d17-38",
        "day":  "Day 17",
        "no":  "38",
        "word":  "infamous",
        "phonetic":  "[ínfəməs]",
        "partOfSpeech":  "형용사",
        "meaning":  "악명 높은",
        "relatedForms":  "-",
        "paraphrase":  [
                           "notorious"
                       ],
        "exampleEn":  "infamous for poor air quality",
        "exampleKo":  "공기 질이 나쁘기로 악명 높은",
        "memo":  "He is infamous for being late to work. (그는 직장에 지각하기로 악명이 높다.)"
    },
    {
        "id":  "d17-39",
        "day":  "Day 17",
        "no":  "39",
        "word":  "memorable",
        "phonetic":  "[mémərəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "기억할 만한, 인상적인",
        "relatedForms":  "memorize (동) 외우다, 암기하다",
        "paraphrase":  [
                           "impressive",
                           "noteworthy",
                           "special",
                           "remarkable"
                       ],
        "exampleEn":  "a memorable experience",
        "exampleKo":  "기억할 만한 경험",
        "memo":  "memorable characters of the novel (그 소설의 기억에 남는 인물들)"
    },
    {
        "id":  "d17-40",
        "day":  "Day 17",
        "no":  "40",
        "word":  "copious",
        "phonetic":  "[kóupiəs]",
        "partOfSpeech":  "형용사",
        "meaning":  "대량의, 방대한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "large",
                           "great",
                           "abundant",
                           "plentiful",
                           "ample"
                       ],
        "exampleEn":  "copious amounts of time",
        "exampleKo":  "방대한 시간",
        "memo":  "지텔프 동의어: The copious use of resources has led to the depletion of the rainforest. -> (a) large | copious evidence (방대한 증거)"
    },
    {
        "id":  "d17-41",
        "day":  "Day 17",
        "no":  "41",
        "word":  "guidance",
        "phonetic":  "[gáidəns]",
        "partOfSpeech":  "명사",
        "meaning":  "지도, 안내",
        "relatedForms":  "guide (명) 안내(책자), (동) 안내하다",
        "paraphrase":  [
                           "direction",
                           "instruction",
                           "advice"
                       ],
        "exampleEn":  "receive guidance from a famous pianist",
        "exampleKo":  "유명한 피아니스트의 지도를 받다",
        "memo":  "guidance on how to use the software (소프트웨어 사용법에 대한 안내)"
    },
    {
        "id":  "d17-42",
        "day":  "Day 17",
        "no":  "42",
        "word":  "moderate",
        "phonetic":  "[mάdərət] / [mάdərèit]",
        "partOfSpeech":  "형용사/동사",
        "meaning":  "보통의, 중간의 / 온건한 / 완화하다",
        "relatedForms":  "moderately (부) 적당히, 중간 정도로",
        "paraphrase":  [
                           "reasonable",
                           "average",
                           "acceptable",
                           "mild"
                       ],
        "exampleEn":  "moderate success",
        "exampleKo":  "보통의 성공",
        "memo":  "moderate political views (온건한 정치적 견해)"
    },
    {
        "id":  "d17-43",
        "day":  "Day 17",
        "no":  "43",
        "word":  "sturdy",
        "phonetic":  "[stə́ːrdi]",
        "partOfSpeech":  "형용사",
        "meaning":  "견고한, 튼튼한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "solid",
                           "robust",
                           "durable"
                       ],
        "exampleEn":  "a sturdy fabric",
        "exampleKo":  "튼튼한 직물",
        "memo":  "a building of sturdy construction (튼튼한 구조의 건물)"
    },
    {
        "id":  "d17-44",
        "day":  "Day 17",
        "no":  "44",
        "word":  "identification",
        "phonetic":  "[aidèntəfəkéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "파악, 신원 확인 / 신분증",
        "relatedForms":  "-",
        "paraphrase":  [
                           "discovery",
                           "detection"
                       ],
        "exampleEn":  "identification of problems",
        "exampleKo":  "문제 파악",
        "memo":  "a form of identification (신분증의 한 종류)"
    },
    {
        "id":  "d17-45",
        "day":  "Day 17",
        "no":  "45",
        "word":  "notify",
        "phonetic":  "[nóutəfài]",
        "partOfSpeech":  "동사",
        "meaning":  "(공식적으로) 알리다",
        "relatedForms":  "notification (명) 알림, 통지",
        "paraphrase":  [
                           "inform",
                           "advise"
                       ],
        "exampleEn":  "notify the class of the date of the final exam",
        "exampleKo":  "기말고사 날짜를 학급에 알리다",
        "memo":  ""
    },
    {
        "id":  "d17-46",
        "day":  "Day 17",
        "no":  "46",
        "word":  "merger",
        "phonetic":  "[mə́ːrdʒər]",
        "partOfSpeech":  "명사",
        "meaning":  "합병",
        "relatedForms":  "merge (동) 합병하다",
        "paraphrase":  [
                           "consolidation"
                       ],
        "exampleEn":  "merger of the two companies",
        "exampleKo":  "두 회사의 합병",
        "memo":  ""
    },
    {
        "id":  "d17-47",
        "day":  "Day 17",
        "no":  "47",
        "word":  "pending",
        "phonetic":  "[péndiŋ]",
        "partOfSpeech":  "형용사/전치사",
        "meaning":  "곧 있을, 임박한 / 보류 중인 / ~가 있을 때까지",
        "relatedForms":  "-",
        "paraphrase":  [
                           "imminent",
                           "forthcoming",
                           "unfinished",
                           "unsettled",
                           "undecided"
                       ],
        "exampleEn":  "pending tasks",
        "exampleKo":  "곧 해야 하는 업무들",
        "memo":  "지텔프 동의어: Bryan is getting frustrated with all the pending matters. -> (b) unsettled | Nicole was suspended from work pending an investigation. (니콜은 조사를 기다리는 동안 업무 정지를 당했다.)"
    },
    {
        "id":  "d17-48",
        "day":  "Day 17",
        "no":  "48",
        "word":  "outdated",
        "phonetic":  "[àutdéitid]",
        "partOfSpeech":  "형용사",
        "meaning":  "구식의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "obsolete",
                           "dated"
                       ],
        "exampleEn":  "outdated equipment",
        "exampleKo":  "구식 장비",
        "memo":  ""
    },
    {
        "id":  "d17-49",
        "day":  "Day 17",
        "no":  "49",
        "word":  "drought",
        "phonetic":  "[draut]",
        "partOfSpeech":  "명사",
        "meaning":  "가뭄",
        "relatedForms":  "-",
        "paraphrase":  [
                           "dryness"
                       ],
        "exampleEn":  "Livestock are often severely affected by drought.",
        "exampleKo":  "가축은 종종 가뭄의 영향을 심하게 받는다.",
        "memo":  ""
    },
    {
        "id":  "d17-50",
        "day":  "Day 17",
        "no":  "50",
        "word":  "peer",
        "phonetic":  "[piər]",
        "partOfSpeech":  "명사",
        "meaning":  "또래",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "smarter than her peers",
        "exampleKo":  "그녀의 또래들보다 더 똑똑한",
        "memo":  "peer pressure (또래[동료]들로부터 받는 압력)"
    },
  {
        "id":  "d18-01",
        "day":  "Day 18",
        "no":  "01",
        "word":  "accord",
        "phonetic":  "[əkɔ́ːrd]",
        "partOfSpeech":  "명사",
        "meaning":  "합의, 일치",
        "relatedForms":  "-",
        "paraphrase":  [
                           "agreement",
                           "harmony",
                           "accordance"
                       ],
        "exampleEn":  "Jason's explanation is not in accord with the facts.",
        "exampleKo":  "제이슨의 설명은 사실과 일치하지 않는다.",
        "memo":  "지텔프 동의어: The results of the study were not in accord with what was expected. -> (b) agreement"
    },
    {
        "id":  "d18-02",
        "day":  "Day 18",
        "no":  "02",
        "word":  "distributor",
        "phonetic":  "[distríbjətər]",
        "partOfSpeech":  "명사",
        "meaning":  "유통업체, 배급사",
        "relatedForms":  "distribute (동) 분배하다; 배급하다, distribution (명) 분배; 배급",
        "paraphrase":  [

                       ],
        "exampleEn":  "a film distributor",
        "exampleKo":  "영화 배급사",
        "memo":  ""
    },
    {
        "id":  "d18-03",
        "day":  "Day 18",
        "no":  "03",
        "word":  "noticeable",
        "phonetic":  "[nóutisəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "뚜렷한, 현저한",
        "relatedForms":  "notice (동) 알아차리다, (명) 공고(문); 주목",
        "paraphrase":  [
                           "clear",
                           "obvious",
                           "conspicuous"
                       ],
        "exampleEn":  "a noticeable difference in the number of students",
        "exampleKo":  "학생 수의 현저한 차이",
        "memo":  ""
    },
    {
        "id":  "d18-04",
        "day":  "Day 18",
        "no":  "04",
        "word":  "sparingly",
        "phonetic":  "[spέəriŋli]",
        "partOfSpeech":  "부사",
        "meaning":  "조금씩, 아껴서",
        "relatedForms":  "-",
        "paraphrase":  [
                           "infrequently",
                           "frugally"
                       ],
        "exampleEn":  "use water sparingly",
        "exampleKo":  "물을 아껴[조금씩] 쓰다",
        "memo":  ""
    },
    {
        "id":  "d18-05",
        "day":  "Day 18",
        "no":  "05",
        "word":  "monument",
        "phonetic":  "[mάnjəmənt]",
        "partOfSpeech":  "명사",
        "meaning":  "기념비, 기념물",
        "relatedForms":  "-",
        "paraphrase":  [
                           "memorial"
                       ],
        "exampleEn":  "a historic monument",
        "exampleKo":  "역사적 기념물",
        "memo":  ""
    },
    {
        "id":  "d18-06",
        "day":  "Day 18",
        "no":  "06",
        "word":  "noble",
        "phonetic":  "[nóubl]",
        "partOfSpeech":  "형용사",
        "meaning":  "고귀한, 숭고한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "honorable",
                           "virtuous"
                       ],
        "exampleEn":  "Martin Luther King fought for a noble cause.",
        "exampleKo":  "마틴 루터 킹은 숭고한 대의를 위해 싸웠다.",
        "memo":  ""
    },
    {
        "id":  "d18-07",
        "day":  "Day 18",
        "no":  "07",
        "word":  "fundraising",
        "phonetic":  "[fʌ́ndrèisiŋ]",
        "partOfSpeech":  "명사",
        "meaning":  "모금",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "hold a fundraising event",
        "exampleKo":  "모금 행사를 열다",
        "memo":  ""
    },
    {
        "id":  "d18-08",
        "day":  "Day 18",
        "no":  "08",
        "word":  "malfunctioning",
        "phonetic":  "[mæ̀lfʌ́ŋkʃəniŋ]",
        "partOfSpeech":  "형용사",
        "meaning":  "오작동하는, 고장 난",
        "relatedForms":  "malfunction (동) 오작동하다, 고장 나다",
        "paraphrase":  [
                           "flawed",
                           "defective",
                           "faulty"
                       ],
        "exampleEn":  "a malfunctioning machine",
        "exampleKo":  "고장 난 기계",
        "memo":  ""
    },
    {
        "id":  "d18-09",
        "day":  "Day 18",
        "no":  "09",
        "word":  "obesity",
        "phonetic":  "[oubíːsəti]",
        "partOfSpeech":  "명사",
        "meaning":  "비만",
        "relatedForms":  "obese (형) 비만의",
        "paraphrase":  [
                           "corpulence",
                           "fatness"
                       ],
        "exampleEn":  "prevent obesity",
        "exampleKo":  "비만을 예방하다",
        "memo":  ""
    },
    {
        "id":  "d18-10",
        "day":  "Day 18",
        "no":  "10",
        "word":  "unforeseen",
        "phonetic":  "[ʌ̀nfrsíːn]",
        "partOfSpeech":  "형용사",
        "meaning":  "예기치 못한, 뜻밖의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "unexpected",
                           "unpredicted",
                           "unanticipated"
                       ],
        "exampleEn":  "Unforeseen circumstances may arise.",
        "exampleKo":  "예기치 못한 상황이 발생할 수 있다.",
        "memo":  "지텔프 동의어: Unforeseen circumstances led to the cancellation of the event. -> (a) Unexpected"
    },
    {
        "id":  "d18-11",
        "day":  "Day 18",
        "no":  "11",
        "word":  "overlook",
        "phonetic":  "[òuvərlúk]",
        "partOfSpeech":  "동사",
        "meaning":  "간과하다 / ~가 내려다보이다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "neglect",
                           "miss"
                       ],
        "exampleEn":  "overlook the importance of communication",
        "exampleKo":  "의사소통의 중요성을 간과하다",
        "memo":  ""
    },
    {
        "id":  "d18-12",
        "day":  "Day 18",
        "no":  "12",
        "word":  "byproduct",
        "phonetic":  "[báiprάdəkt]",
        "partOfSpeech":  "명사",
        "meaning":  "부산물, 부차적 결과",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "A byproduct of industrialization is environmental pollution.",
        "exampleKo":  "산업화의 부산물은 환경 오염이다.",
        "memo":  ""
    },
    {
        "id":  "d18-13",
        "day":  "Day 18",
        "no":  "13",
        "word":  "sanctuary",
        "phonetic":  "[sǽŋktʃuèri]",
        "partOfSpeech":  "명사",
        "meaning":  "보호 구역",
        "relatedForms":  "-",
        "paraphrase":  [
                           "reserve",
                           "shelter"
                       ],
        "exampleEn":  "a wildlife sanctuary",
        "exampleKo":  "야생 동물 보호 구역",
        "memo":  ""
    },
    {
        "id":  "d18-14",
        "day":  "Day 18",
        "no":  "14",
        "word":  "prolonged",
        "phonetic":  "[prəlɔ́ːŋd]",
        "partOfSpeech":  "형용사",
        "meaning":  "오래 계속되는, 장기간의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "extended",
                           "long",
                           "lengthy",
                           "protracted"
                       ],
        "exampleEn":  "Prolonged exposure to loud noise can cause hearing loss.",
        "exampleKo":  "큰 소음에 장기간 노출되면 청력 손실을 초래할 수 있다.",
        "memo":  ""
    },
    {
        "id":  "d18-15",
        "day":  "Day 18",
        "no":  "15",
        "word":  "petition",
        "phonetic":  "[pətíʃən]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "청원(서), 탄원(서) / 청원하다, 탄원하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "appeal",
                           "entreaty"
                       ],
        "exampleEn":  "submit a petition",
        "exampleKo":  "청원서를 제출하다",
        "memo":  ""
    },
    {
        "id":  "d18-16",
        "day":  "Day 18",
        "no":  "16",
        "word":  "moisture",
        "phonetic":  "[mɔ́istʃər]",
        "partOfSpeech":  "명사",
        "meaning":  "수분, 습기",
        "relatedForms":  "moisturize (동) 수분을 공급하다, 촉촉하게 하다",
        "paraphrase":  [
                           "dampness",
                           "humidity"
                       ],
        "exampleEn":  "absorb moisture from the soil",
        "exampleKo":  "토양에서 수분을 흡수하다",
        "memo":  ""
    },
    {
        "id":  "d18-17",
        "day":  "Day 18",
        "no":  "17",
        "word":  "spouse",
        "phonetic":  "[spaus]",
        "partOfSpeech":  "명사",
        "meaning":  "배우자",
        "relatedForms":  "-",
        "paraphrase":  [
                           "partner",
                           "husband",
                           "wife",
                           "mate"
                       ],
        "exampleEn":  "his spouse's incurable disease",
        "exampleKo":  "그의 배우자의 난치병",
        "memo":  ""
    },
    {
        "id":  "d18-18",
        "day":  "Day 18",
        "no":  "18",
        "word":  "obey",
        "phonetic":  "[oubéi]",
        "partOfSpeech":  "동사",
        "meaning":  "복종하다, 따르다",
        "relatedForms":  "obedience (명) 복종, 순종",
        "paraphrase":  [
                           "follow",
                           "execute"
                       ],
        "exampleEn":  "obey an order",
        "exampleKo":  "명령에 복종하다",
        "memo":  "지텔프 동의어: The defendant was required to obey the order of the court. -> (a) execute | obey the rules of the workplace (직장 규칙을 따르다)"
    },
    {
        "id":  "d18-19",
        "day":  "Day 18",
        "no":  "19",
        "word":  "stimulate",
        "phonetic":  "[stímjəlèit]",
        "partOfSpeech":  "동사",
        "meaning":  "자극하다, 촉진시키다",
        "relatedForms":  "stimulation (명) 자극, 촉진",
        "paraphrase":  [
                           "encourage",
                           "provoke"
                       ],
        "exampleEn":  "stimulate the brain",
        "exampleKo":  "두뇌를 자극하다",
        "memo":  "stimulate the release of hormones (호르몬 분비를 촉진시키다)"
    },
    {
        "id":  "d18-20",
        "day":  "Day 18",
        "no":  "20",
        "word":  "immoral",
        "phonetic":  "[imɔ́ːrəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "비도덕적인, 부도덕한",
        "relatedForms":  "moral (형) 도덕의; 도덕적인",
        "paraphrase":  [
                           "wicked",
                           "bad",
                           "malicious",
                           "unethical"
                       ],
        "exampleEn":  "It is immoral to cheat on a test.",
        "exampleKo":  "시험에서 부정행위를 하는 것은 부도덕한 일이다.",
        "memo":  ""
    },
    {
        "id":  "d18-21",
        "day":  "Day 18",
        "no":  "21",
        "word":  "skillfully",
        "phonetic":  "[skílfəli]",
        "partOfSpeech":  "부사",
        "meaning":  "능숙하게",
        "relatedForms":  "-",
        "paraphrase":  [
                           "expertly",
                           "adeptly",
                           "proficiently"
                       ],
        "exampleEn":  "skillfully play the piano",
        "exampleKo":  "피아노를 능숙하게 연주하다",
        "memo":  ""
    },
    {
        "id":  "d18-22",
        "day":  "Day 18",
        "no":  "22",
        "word":  "tenant",
        "phonetic":  "[ténənt]",
        "partOfSpeech":  "명사",
        "meaning":  "세입자",
        "relatedForms":  "-",
        "paraphrase":  [
                           "renter",
                           "occupant"
                       ],
        "exampleEn":  "landlord and tenant",
        "exampleKo":  "집주인과 세입자",
        "memo":  ""
    },
    {
        "id":  "d18-23",
        "day":  "Day 18",
        "no":  "23",
        "word":  "prone",
        "phonetic":  "[proun]",
        "partOfSpeech":  "형용사",
        "meaning":  "~하기 쉬운",
        "relatedForms":  "-",
        "paraphrase":  [
                           "liable",
                           "inclined"
                       ],
        "exampleEn":  "Children are prone to getting hurt.",
        "exampleKo":  "아이들은 다치기 쉽다.",
        "memo":  ""
    },
    {
        "id":  "d18-24",
        "day":  "Day 18",
        "no":  "24",
        "word":  "surrender",
        "phonetic":  "[səréndər]",
        "partOfSpeech":  "동사",
        "meaning":  "항복하다 / 넘겨주다, 내주다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "submit",
                           "yield",
                           "abandon"
                       ],
        "exampleEn":  "surrender the weapons to the enemy",
        "exampleKo":  "무기를 적에게 내주다",
        "memo":  ""
    },
    {
        "id":  "d18-25",
        "day":  "Day 18",
        "no":  "25",
        "word":  "influential",
        "phonetic":  "[ìnfluénʃəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "영향력 있는",
        "relatedForms":  "influence (명) 영향(력), (동) 영향을 미치다",
        "paraphrase":  [
                           "leading"
                       ],
        "exampleEn":  "an influential artist",
        "exampleKo":  "영향력 있는 예술가",
        "memo":  ""
    },
    {
        "id":  "d18-26",
        "day":  "Day 18",
        "no":  "26",
        "word":  "offspring",
        "phonetic":  "[ɔ́ːfsprìŋ]",
        "partOfSpeech":  "명사",
        "meaning":  "자식, 새끼",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "The rabbit produced six offspring.",
        "exampleKo":  "토끼는 새끼 여섯 마리를 낳았다.",
        "memo":  ""
    },
    {
        "id":  "d18-27",
        "day":  "Day 18",
        "no":  "27",
        "word":  "skeptical",
        "phonetic":  "[sképtikəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "회의적인, 의심 많은",
        "relatedForms":  "-",
        "paraphrase":  [
                           "doubtful",
                           "dubious",
                           "unsure"
                       ],
        "exampleEn":  "Adam is skeptical of the results of the study.",
        "exampleKo":  "아담은 그 연구 결과에 대해 회의적이다.",
        "memo":  "지텔프 동의어: Eric was skeptical about his chances of winning. -> (b) doubtful"
    },
    {
        "id":  "d18-28",
        "day":  "Day 18",
        "no":  "28",
        "word":  "superstition",
        "phonetic":  "[sjùːpərstíʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "미신",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "believe in superstition",
        "exampleKo":  "미신을 믿다",
        "memo":  ""
    },
    {
        "id":  "d18-29",
        "day":  "Day 18",
        "no":  "29",
        "word":  "tribe",
        "phonetic":  "[traib]",
        "partOfSpeech":  "명사",
        "meaning":  "종족, 부족",
        "relatedForms":  "-",
        "paraphrase":  [
                           "people"
                       ],
        "exampleEn":  "trade between different tribes",
        "exampleKo":  "서로 다른 부족 간의 무역",
        "memo":  ""
    },
    {
        "id":  "d18-30",
        "day":  "Day 18",
        "no":  "30",
        "word":  "multiple",
        "phonetic":  "[mʌ́ltəpl]",
        "partOfSpeech":  "형용사",
        "meaning":  "다수의, 여럿의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "several",
                           "many",
                           "numerous"
                       ],
        "exampleEn":  "make multiple copies",
        "exampleKo":  "여러 부를 복사하다",
        "memo":  "a multiple choice question (객관식 문제)"
    },
    {
        "id":  "d18-31",
        "day":  "Day 18",
        "no":  "31",
        "word":  "trace",
        "phonetic":  "[treis]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "추적하다, 밝혀내다 / 흔적, 자취",
        "relatedForms":  "-",
        "paraphrase":  [
                           "follow",
                           "track",
                           "remains",
                           "track",
                           "mark"
                       ],
        "exampleEn":  "The origins of the universe can be traced back to the Big Bang.",
        "exampleKo":  "우주의 기원은 빅뱅으로 거슬러 올라갈 수 있다.",
        "memo":  "find traces of blood at the crime scene (범죄 현장에서 혈흔을 발견하다) | 숙어: trace back to (~로 거슬러 올라가다)"
    },
    {
        "id":  "d18-32",
        "day":  "Day 18",
        "no":  "32",
        "word":  "elaborate",
        "phonetic":  "[ilǽbərət] / [ilǽbərèit]",
        "partOfSpeech":  "형용사/동사",
        "meaning":  "정교한, 정밀한 / 상세히 말하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "complicated",
                           "complex",
                           "detailed"
                       ],
        "exampleEn":  "The dress has an elaborate design.",
        "exampleKo":  "그 드레스는 디자인이 정교하다.",
        "memo":  "elaborate on the main points (요점을 상세히 설명하다)"
    },
    {
        "id":  "d18-33",
        "day":  "Day 18",
        "no":  "33",
        "word":  "genuine",
        "phonetic":  "[dʒénjuin]",
        "partOfSpeech":  "형용사",
        "meaning":  "진짜의, 진품의 / 진정한, 진실된",
        "relatedForms":  "-",
        "paraphrase":  [
                           "original",
                           "authentic",
                           "sincere",
                           "earnest"
                       ],
        "exampleEn":  "a genuine article",
        "exampleKo":  "진품",
        "memo":  "take a genuine interest in fashion (패션에 진정한 관심을 갖다)"
    },
    {
        "id":  "d18-34",
        "day":  "Day 18",
        "no":  "34",
        "word":  "pertaining to",
        "phonetic":  "[pərtéiniŋ]",
        "partOfSpeech":  "전치사",
        "meaning":  "~와 관련된",
        "relatedForms":  "-",
        "paraphrase":  [
                           "relating to",
                           "concerning",
                           "regarding"
                       ],
        "exampleEn":  "All information pertaining to the incident is confidential.",
        "exampleKo":  "그 사건과 관련된 모든 정보는 기밀이다.",
        "memo":  ""
    },
    {
        "id":  "d18-35",
        "day":  "Day 18",
        "no":  "35",
        "word":  "endorse",
        "phonetic":  "[indɔ́ːrs]",
        "partOfSpeech":  "동사",
        "meaning":  "<정책·의견 등> 지지하다, 승인하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "support",
                           "approve",
                           "back",
                           "sanction",
                           "authorize"
                       ],
        "exampleEn":  "The president refused to endorse the bill.",
        "exampleKo":  "대통령은 그 법안에 대한 승인을 거부했다.",
        "memo":  ""
    },
    {
        "id":  "d18-36",
        "day":  "Day 18",
        "no":  "36",
        "word":  "prolifically",
        "phonetic":  "[prəlífikəli]",
        "partOfSpeech":  "부사",
        "meaning":  "다작으로, 다산으로",
        "relatedForms":  "prolific (형) 다작의, 다산의",
        "paraphrase":  [
                           "productively",
                           "frequently"
                       ],
        "exampleEn":  "Writing prolifically is a great way to improve writing skills.",
        "exampleKo":  "글을 많이 쓰는 것은 글쓰기 능력을 향상시키는 좋은 방법이다.",
        "memo":  "지텔프 동의어: Ernest Hemingway published prolifically throughout his life. -> (a) frequently"
    },
    {
        "id":  "d18-37",
        "day":  "Day 18",
        "no":  "37",
        "word":  "surveillance",
        "phonetic":  "[sərvéiləns]",
        "partOfSpeech":  "명사",
        "meaning":  "감시",
        "relatedForms":  "-",
        "paraphrase":  [
                           "watch",
                           "observation"
                       ],
        "exampleEn":  "install a surveillance camera",
        "exampleKo":  "감시 카메라를 설치하다",
        "memo":  ""
    },
    {
        "id":  "d18-38",
        "day":  "Day 18",
        "no":  "38",
        "word":  "versatile",
        "phonetic":  "[və́ːrsətl]",
        "partOfSpeech":  "형용사",
        "meaning":  "다용도의, 다목적의, 다재다능한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "all-round"
                       ],
        "exampleEn":  "Salt is a versatile ingredient that can be used in many different dishes.",
        "exampleKo":  "소금은 다양한 요리에 사용될 수 있는 다용도 재료이다.",
        "memo":  ""
    },
    {
        "id":  "d18-39",
        "day":  "Day 18",
        "no":  "39",
        "word":  "wane",
        "phonetic":  "[wein]",
        "partOfSpeech":  "동사",
        "meaning":  "<영향력 등> 약해지다, 줄어들다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "fade",
                           "decline",
                           "weaken",
                           "diminish",
                           "subside"
                       ],
        "exampleEn":  "The popularity of the show has been slowly waning.",
        "exampleKo":  "그 쇼의 인기는 서서히 떨어지고 있다.",
        "memo":  ""
    },
    {
        "id":  "d18-40",
        "day":  "Day 18",
        "no":  "40",
        "word":  "ritual",
        "phonetic":  "[rítʃuəl]",
        "partOfSpeech":  "명사",
        "meaning":  "의식, 의례",
        "relatedForms":  "-",
        "paraphrase":  [
                           "ceremony",
                           "rite"
                       ],
        "exampleEn":  "The ritual of baptism is a Christian tradition.",
        "exampleKo":  "침례 의식은 기독교의 전통이다.",
        "memo":  ""
    },
    {
        "id":  "d18-41",
        "day":  "Day 18",
        "no":  "41",
        "word":  "texture",
        "phonetic":  "[tékstʃər]",
        "partOfSpeech":  "명사",
        "meaning":  "질감, 감촉",
        "relatedForms":  "-",
        "paraphrase":  [
                           "feel"
                       ],
        "exampleEn":  "the soft texture of the fabric",
        "exampleKo":  "원단의 부드러운 질감",
        "memo":  ""
    },
    {
        "id":  "d18-42",
        "day":  "Day 18",
        "no":  "42",
        "word":  "hardship",
        "phonetic":  "[hάːrdʃip]",
        "partOfSpeech":  "명사",
        "meaning":  "어려움, 역경",
        "relatedForms":  "-",
        "paraphrase":  [
                           "trouble",
                           "difficulty",
                           "adversity"
                       ],
        "exampleEn":  "suffer financial hardship",
        "exampleKo":  "재정적인 어려움을 겪다",
        "memo":  ""
    },
    {
        "id":  "d18-43",
        "day":  "Day 18",
        "no":  "43",
        "word":  "provoke",
        "phonetic":  "[prəvóuk]",
        "partOfSpeech":  "동사",
        "meaning":  "유발하다, 불러일으키다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "spark",
                           "cause",
                           "arouse",
                           "generate",
                           "prompt",
                           "induce"
                       ],
        "exampleEn":  "provoke a lot of debate",
        "exampleKo":  "많은 논쟁을 불러일으키다",
        "memo":  "지텔프 동의어: The new law provoked strong criticism from civil rights groups. -> (b) sparked"
    },
    {
        "id":  "d18-44",
        "day":  "Day 18",
        "no":  "44",
        "word":  "uphold",
        "phonetic":  "[ʌphóuld]",
        "partOfSpeech":  "동사",
        "meaning":  "옹호하다, 유지시키다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "maintain",
                           "support",
                           "sustain"
                       ],
        "exampleEn":  "The courts have a duty to uphold the law.",
        "exampleKo":  "법원은 법을 수호할 의무가 있다.",
        "memo":  ""
    },
    {
        "id":  "d18-45",
        "day":  "Day 18",
        "no":  "45",
        "word":  "slate",
        "phonetic":  "[sleit]",
        "partOfSpeech":  "동사",
        "meaning":  "계획하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "schedule",
                           "arrange",
                           "plan"
                       ],
        "exampleEn":  "The exhibition is slated for November.",
        "exampleKo":  "전시회는 11월로 예정되어 있다.",
        "memo":  ""
    },
    {
        "id":  "d18-46",
        "day":  "Day 18",
        "no":  "46",
        "word":  "vanish",
        "phonetic":  "[vǽniʃ]",
        "partOfSpeech":  "동사",
        "meaning":  "(갑자기) 사라지다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "disappear"
                       ],
        "exampleEn":  "The car vanished without trace from the parking lot.",
        "exampleKo":  "그 차는 주차장에서 흔적도 없이 사라졌다.",
        "memo":  ""
    },
    {
        "id":  "d18-47",
        "day":  "Day 18",
        "no":  "47",
        "word":  "findings",
        "phonetic":  "[fáindiŋz]",
        "partOfSpeech":  "명사",
        "meaning":  "(연구·조사 등) 결과",
        "relatedForms":  "-",
        "paraphrase":  [
                           "result",
                           "conclusion"
                       ],
        "exampleEn":  "The new findings will be presented at the conference.",
        "exampleKo":  "새로운 연구 결과가 학회에서 발표될 것이다.",
        "memo":  ""
    },
    {
        "id":  "d18-48",
        "day":  "Day 18",
        "no":  "48",
        "word":  "viable",
        "phonetic":  "[váiəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "실행 가능한, 실현 가능한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "possible",
                           "practical",
                           "feasible",
                           "realistic",
                           "workable"
                       ],
        "exampleEn":  "The proposed merger is not viable.",
        "exampleKo":  "제안된 합병은 실현 가능하지 않다.",
        "memo":  ""
    },
    {
        "id":  "d18-49",
        "day":  "Day 18",
        "no":  "49",
        "word":  "vicious",
        "phonetic":  "[víʃəs]",
        "partOfSpeech":  "형용사",
        "meaning":  "악랄한, 잔인한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "malicious",
                           "cruel",
                           "violent"
                       ],
        "exampleEn":  "a vicious attack",
        "exampleKo":  "잔인한 공격",
        "memo":  ""
    },
    {
        "id":  "d18-50",
        "day":  "Day 18",
        "no":  "50",
        "word":  "cater to",
        "phonetic":  "[kéitər]",
        "partOfSpeech":  "동사구",
        "meaning":  "~에 맞춰 제공하다, ~을 충족하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "serve",
                           "satisfy",
                           "meet"
                       ],
        "exampleEn":  "cater to the client's specific preferences",
        "exampleKo":  "고객의 특정 취향에 맞추다",
        "memo":  ""
    },
  {
        "id":  "d19-01",
        "day":  "Day 19",
        "no":  "01",
        "word":  "peculiar",
        "phonetic":  "[pikjúːljər]",
        "partOfSpeech":  "형용사",
        "meaning":  "이상한, 특이한 / 특유의",
        "relatedForms":  "-",
        "paraphrase":  [
                           "strange",
                           "unusual",
                           "uncommon",
                           "odd",
                           "weird",
                           "unique",
                           "distinct"
                       ],
        "exampleEn":  "gather peculiar items",
        "exampleKo":  "특이한 아이템을 모으다",
        "memo":  "features peculiar to mammals (포유류 특유의 특징)"
    },
    {
        "id":  "d19-02",
        "day":  "Day 19",
        "no":  "02",
        "word":  "unbearable",
        "phonetic":  "[ʌnbέərəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "참을 수 없는, 견디기 어려운",
        "relatedForms":  "bear (동) 참다, 견디다; (성질을) 띠다, 지니다",
        "paraphrase":  [
                           "intolerable"
                       ],
        "exampleEn":  "unbearable pain",
        "exampleKo":  "참을 수 없는 고통",
        "memo":  "unbearable heat (견딜 수 없는 더위)"
    },
    {
        "id":  "d19-03",
        "day":  "Day 19",
        "no":  "03",
        "word":  "myth",
        "phonetic":  "[miθ]",
        "partOfSpeech":  "명사",
        "meaning":  "신화 / 잘못된 믿음, 근거 없는 통념",
        "relatedForms":  "mythical (형) 신화에 나오는; 잘못된, 가공의",
        "paraphrase":  [
                           "legend",
                           "story",
                           "illusion"
                       ],
        "exampleEn":  "the Greek myths",
        "exampleKo":  "그리스 신화",
        "memo":  "the myth that men are better at math than women (남성이 여성보다 수학에 뛰어나다는 잘못된 통념)"
    },
    {
        "id":  "d19-04",
        "day":  "Day 19",
        "no":  "04",
        "word":  "tackle",
        "phonetic":  "[tækl]",
        "partOfSpeech":  "동사",
        "meaning":  "대처하다, 해결하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "address",
                           "deal with",
                           "handle"
                       ],
        "exampleEn":  "tackle a problem",
        "exampleKo":  "문제에 대처하다",
        "memo":  "지텔프 동의어: The group will meet to discuss how to tackle the issue of climate change. -> (a) address | tackle the crisis (위기에 대처하다)"
    },
    {
        "id":  "d19-05",
        "day":  "Day 19",
        "no":  "05",
        "word":  "ubiquitous",
        "phonetic":  "[juːbíkwətəs]",
        "partOfSpeech":  "형용사",
        "meaning":  "어디에나 있는, 흔히 볼 수 있는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "widespread",
                           "common",
                           "everywhere",
                           "pervasive"
                       ],
        "exampleEn":  "Starbucks is a ubiquitous coffee chain.",
        "exampleKo":  "스타벅스는 어디에나 있는 커피 체인점이다.",
        "memo":  ""
    },
    {
        "id":  "d19-06",
        "day":  "Day 19",
        "no":  "06",
        "word":  "punctuality",
        "phonetic":  "[pʌ̀ŋktʃuǽləti]",
        "partOfSpeech":  "명사",
        "meaning":  "시간 엄수",
        "relatedForms":  "punctual (형) 시간을 엄수하는",
        "paraphrase":  [
                           "promptness"
                       ],
        "exampleEn":  "Punctuality is the key element of success.",
        "exampleKo":  "시간 엄수는 성공의 핵심 요소다.",
        "memo":  ""
    },
    {
        "id":  "d19-07",
        "day":  "Day 19",
        "no":  "07",
        "word":  "disclose",
        "phonetic":  "[disklóuz]",
        "partOfSpeech":  "동사",
        "meaning":  "밝히다, 드러내다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "tell",
                           "reveal",
                           "show",
                           "unveil",
                           "expose",
                           "uncover"
                       ],
        "exampleEn":  "disclose details of the company's future plans",
        "exampleKo":  "회사의 장래 계획을 밝히다",
        "memo":  "finally disclose the truth (마침내 진실을 밝히다)"
    },
    {
        "id":  "d19-08",
        "day":  "Day 19",
        "no":  "08",
        "word":  "valid",
        "phonetic":  "[vǽlid]",
        "partOfSpeech":  "형용사",
        "meaning":  "유효한 / 타당한",
        "relatedForms":  "validity (명) 유효성; 타당성",
        "paraphrase":  [
                           "legitimate",
                           "sound",
                           "reasonable",
                           "acceptable",
                           "sensible"
                       ],
        "exampleEn":  "The coupon is no longer valid.",
        "exampleKo":  "쿠폰은 더 이상 유효하지 않다.",
        "memo":  "a valid criticism (타당한 비판)"
    },
    {
        "id":  "d19-09",
        "day":  "Day 19",
        "no":  "09",
        "word":  "summarize",
        "phonetic":  "[sʌ́məràiz]",
        "partOfSpeech":  "동사",
        "meaning":  "요약하다",
        "relatedForms":  "summary (명) 요약",
        "paraphrase":  [
                           "recap",
                           "outline",
                           "condense"
                       ],
        "exampleEn":  "summarize the main points of the meeting",
        "exampleKo":  "회의의 요점을 요약하다",
        "memo":  ""
    },
    {
        "id":  "d19-10",
        "day":  "Day 19",
        "no":  "10",
        "word":  "flawlessly",
        "phonetic":  "[flɔ́ːlisli]",
        "partOfSpeech":  "부사",
        "meaning":  "흠잡을 데 없이, 완벽하게",
        "relatedForms":  "flaw (명) 흠, 결함, 결점, flawless (형) 흠잡을 데 없는, 완벽한",
        "paraphrase":  [
                           "perfectly",
                           "impeccably"
                       ],
        "exampleEn":  "The truck driver transferred the cargo flawlessly.",
        "exampleKo":  "트럭 운전사는 화물을 완벽히 옮겼다.",
        "memo":  ""
    },
    {
        "id":  "d19-11",
        "day":  "Day 19",
        "no":  "11",
        "word":  "avert",
        "phonetic":  "[əvə́ːrt]",
        "partOfSpeech":  "동사",
        "meaning":  "방지하다, 막다 / 외면하다, 시선을 돌리다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "stop",
                           "prevent",
                           "avoid",
                           "turn away"
                       ],
        "exampleEn":  "avert famine",
        "exampleKo":  "기근을 방지하다",
        "memo":  "지텔프 동의어: The country is taking steps to avert an environmental disaster. -> (b) stop | Avert your thoughts from problems. (문제로부터 당신의 생각을 돌리세요.)"
    },
    {
        "id":  "d19-12",
        "day":  "Day 19",
        "no":  "12",
        "word":  "magnificent",
        "phonetic":  "[mægnífəsnt]",
        "partOfSpeech":  "형용사",
        "meaning":  "훌륭한, 장엄한, 매우 아름다운",
        "relatedForms":  "-",
        "paraphrase":  [
                           "grand",
                           "majestic",
                           "splendid",
                           "impressive",
                           "imposing"
                       ],
        "exampleEn":  "a magnificent view",
        "exampleKo":  "웅장한 경치",
        "memo":  "a magnificent speech (훌륭한 연설)"
    },
    {
        "id":  "d19-13",
        "day":  "Day 19",
        "no":  "13",
        "word":  "anniversary",
        "phonetic":  "[æ̀nəvə́ːrsəri]",
        "partOfSpeech":  "명사",
        "meaning":  "기념일",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "a wedding anniversary",
        "exampleKo":  "결혼 기념일",
        "memo":  "commemorate the 100th anniversary of his birth (그의 탄생 100주년을 기념하다)"
    },
    {
        "id":  "d19-14",
        "day":  "Day 19",
        "no":  "14",
        "word":  "dye",
        "phonetic":  "[dai]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "염료, 염색약 / 염색하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "coloring"
                       ],
        "exampleEn":  "dye the cloth purple",
        "exampleKo":  "천을 보라색으로 염색하다",
        "memo":  ""
    },
    {
        "id":  "d19-15",
        "day":  "Day 19",
        "no":  "15",
        "word":  "misplace",
        "phonetic":  "[mispléis]",
        "partOfSpeech":  "동사",
        "meaning":  "(제자리에 두지 않고) 어디에 두었는지 잊어버리다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "lose",
                           "mislay"
                       ],
        "exampleEn":  "He is always misplacing his car keys.",
        "exampleKo":  "그는 항상 차 열쇠 둔 곳을 잊어버린다.",
        "memo":  ""
    },
    {
        "id":  "d19-16",
        "day":  "Day 19",
        "no":  "16",
        "word":  "fossil",
        "phonetic":  "[fάsl]",
        "partOfSpeech":  "명사",
        "meaning":  "화석",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "unearth the fossil of a marine reptile",
        "exampleKo":  "해양 파충류의 화석을 발굴하다",
        "memo":  ""
    },
    {
        "id":  "d19-17",
        "day":  "Day 19",
        "no":  "17",
        "word":  "bolster",
        "phonetic":  "[bóulstər]",
        "partOfSpeech":  "동사",
        "meaning":  "강화하다, 보강하다 / (자신감, 사기 등) 북돋우다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "support",
                           "strengthen",
                           "reinforce",
                           "enhance"
                       ],
        "exampleEn":  "bolster the economy",
        "exampleKo":  "경제를 강화하다",
        "memo":  "지텔프 동의어: The company's cutting-edge products bolster its reputation as an industry leader. -> (b) enhance | bolster her confidence (그녀의 자신감을 북돋우다)"
    },
    {
        "id":  "d19-18",
        "day":  "Day 19",
        "no":  "18",
        "word":  "discourage",
        "phonetic":  "[diskə́ːridʒ]",
        "partOfSpeech":  "동사",
        "meaning":  "~을 하지 못하게 하다, 단념시키다 / 좌절시키다, 의욕을 꺾다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "deter",
                           "prevent",
                           "dishearten",
                           "daunt"
                       ],
        "exampleEn":  "Tyler was discouraged from becoming an actor by his parents.",
        "exampleKo":  "타일러는 부모님에 의해 배우가 되는 것을 단념하게 되었다.",
        "memo":  "Negative feedback on her restaurant discouraged Lauren. (자신의 레스토랑에 대한 부정적인 피드백은 로렌을 낙담시켰다.)"
    },
    {
        "id":  "d19-19",
        "day":  "Day 19",
        "no":  "19",
        "word":  "transparent",
        "phonetic":  "[trænspέərənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "투명한, 비치는 / 이해하기 쉬운, 명료한 / 숨김없는, 투명한",
        "relatedForms":  "transparency (명) 투명함",
        "paraphrase":  [
                           "clear",
                           "plain",
                           "easy",
                           "lucid",
                           "open",
                           "frank",
                           "candid",
                           "honest",
                           "direct"
                       ],
        "exampleEn":  "a transparent fish tank",
        "exampleKo":  "투명한 어항",
        "memo":  "transparent instructions (명료한 설명), a transparent election process (투명한 선거 과정)"
    },
    {
        "id":  "d19-20",
        "day":  "Day 19",
        "no":  "20",
        "word":  "outsource",
        "phonetic":  "[àutsɔ́ːrs]",
        "partOfSpeech":  "동사",
        "meaning":  "외부에 위탁하다",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "The work was outsourced to an advertising agency.",
        "exampleKo":  "그 일은 광고 대행사에 위탁되었다.",
        "memo":  ""
    },
    {
        "id":  "d19-21",
        "day":  "Day 19",
        "no":  "21",
        "word":  "hostility",
        "phonetic":  "[hɑstíləti]",
        "partOfSpeech":  "명사",
        "meaning":  "반감, 적대감",
        "relatedForms":  "-",
        "paraphrase":  [
                           "hatred",
                           "opposition",
                           "anger",
                           "aversion"
                       ],
        "exampleEn":  "hostility toward neighboring countries",
        "exampleKo":  "주변국에 대한 적대감",
        "memo":  ""
    },
    {
        "id":  "d19-22",
        "day":  "Day 19",
        "no":  "22",
        "word":  "reproduce",
        "phonetic":  "[rìːprədjúːs]",
        "partOfSpeech":  "동사",
        "meaning":  "(식물이나 동물 등) 번식하다, 생식하다 / 복사하다 / 다시 만들어 내다, 재현하다",
        "relatedForms":  "reproduction (명) 번식, 생식; 복사; 복제품",
        "paraphrase":  [
                           "breed",
                           "spawn",
                           "copy",
                           "duplicate"
                       ],
        "exampleEn":  "The fish of this lake reproduce during the rainy season.",
        "exampleKo":  "이 호수의 물고기는 장마철에 번식한다.",
        "memo":  "reproduce the artist's work on T-shirts (티셔츠에 작가의 작품을 재현하다)"
    },
    {
        "id":  "d19-23",
        "day":  "Day 19",
        "no":  "23",
        "word":  "graduate",
        "phonetic":  "[grǽdʒuèit] / [grǽdʒuət]",
        "partOfSpeech":  "동사/명사/형용사",
        "meaning":  "졸업하다 / 졸업생 / 대학원의",
        "relatedForms":  "graduation (명) 졸업(식)",
        "paraphrase":  [

                       ],
        "exampleEn":  "graduate from high school",
        "exampleKo":  "고등학교를 졸업하다",
        "memo":  "a graduate student (대학원생)"
    },
    {
        "id":  "d19-24",
        "day":  "Day 19",
        "no":  "24",
        "word":  "alleviate",
        "phonetic":  "[əlíːvièit]",
        "partOfSpeech":  "동사",
        "meaning":  "완화시키다, 경감시키다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "ease",
                           "relieve",
                           "lessen",
                           "reduce",
                           "mitigate"
                       ],
        "exampleEn":  "alleviate pain",
        "exampleKo":  "고통을 경감시키다",
        "memo":  "지텔프 동의어: There are many ways to alleviate pain without medication. -> (a) reduce | alleviate poverty (빈곤을 완화시키다)"
    },
    {
        "id":  "d19-25",
        "day":  "Day 19",
        "no":  "25",
        "word":  "scholarship",
        "phonetic":  "[skάlərʃìp]",
        "partOfSpeech":  "명사",
        "meaning":  "장학금",
        "relatedForms":  "-",
        "paraphrase":  [
                           "grant"
                       ],
        "exampleEn":  "be granted a full scholarship",
        "exampleKo":  "전액 장학금을 받다",
        "memo":  ""
    },
    {
        "id":  "d19-26",
        "day":  "Day 19",
        "no":  "26",
        "word":  "consecutive",
        "phonetic":  "[kənsékjətiv]",
        "partOfSpeech":  "형용사",
        "meaning":  "연속적인, 연이은",
        "relatedForms":  "consecutively (부) 연속으로, 연이어",
        "paraphrase":  [
                           "successive"
                       ],
        "exampleEn":  "for three consecutive hours",
        "exampleKo":  "3시간 연속으로",
        "memo":  ""
    },
    {
        "id":  "d19-27",
        "day":  "Day 19",
        "no":  "27",
        "word":  "courtesy",
        "phonetic":  "[kə́ːrtəsi]",
        "partOfSpeech":  "명사/형용사",
        "meaning":  "공손함, 예의 / 서비스로 제공되는, 무료로 제공되는",
        "relatedForms":  "-",
        "paraphrase":  [
                           "politeness",
                           "grace"
                       ],
        "exampleEn":  "treat customers with courtesy",
        "exampleKo":  "고객을 공손하게 대하다",
        "memo":  "a courtesy shuttle bus (서비스로 제공되는 셔틀 버스) | 숙어: (by) courtesy of (~의 허가를 받아, ~때문에, ~로부터 제공되는)"
    },
    {
        "id":  "d19-28",
        "day":  "Day 19",
        "no":  "28",
        "word":  "chronic",
        "phonetic":  "[krάnik]",
        "partOfSpeech":  "형용사",
        "meaning":  "만성의, 고질적인",
        "relatedForms":  "-",
        "paraphrase":  [
                           "persistent",
                           "constant",
                           "habitual"
                       ],
        "exampleEn":  "chronic diseases",
        "exampleKo":  "만성 질환",
        "memo":  "chronic stress (만성 스트레스)"
    },
    {
        "id":  "d19-29",
        "day":  "Day 19",
        "no":  "29",
        "word":  "commemorate",
        "phonetic":  "[kəmémərèit]",
        "partOfSpeech":  "동사",
        "meaning":  "기념하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "celebrate",
                           "observe"
                       ],
        "exampleEn":  "A memorial service was held to commemorate the event.",
        "exampleKo":  "그 사건을 기념하기 위해 추도식이 열렸다.",
        "memo":  ""
    },
    {
        "id":  "d19-30",
        "day":  "Day 19",
        "no":  "30",
        "word":  "temperate",
        "phonetic":  "[témpərət]",
        "partOfSpeech":  "형용사",
        "meaning":  "(날씨나 기후가) 온화한 / (사람의 행동이나 말이) 온화한, 절제된",
        "relatedForms":  "-",
        "paraphrase":  [
                           "mild",
                           "moderate"
                       ],
        "exampleEn":  "in a temperate region",
        "exampleKo":  "기후가 온화한 지역에서",
        "memo":  "지텔프 동의어: The temperate climate of the Pacific Northwest is perfect for growing grapes. -> (b) mild"
    },
    {
        "id":  "d19-31",
        "day":  "Day 19",
        "no":  "31",
        "word":  "longevity",
        "phonetic":  "[landʒévəti]",
        "partOfSpeech":  "명사",
        "meaning":  "수명, 장수",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "attribute longevity to positive attitude",
        "exampleKo":  "장수를 긍정적인 태도 덕분으로 보다",
        "memo":  ""
    },
    {
        "id":  "d19-32",
        "day":  "Day 19",
        "no":  "32",
        "word":  "discern",
        "phonetic":  "[disə́ːrn]",
        "partOfSpeech":  "동사",
        "meaning":  "파악하다 / 식별하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "perceive",
                           "notice",
                           "distinguish",
                           "differentiate"
                       ],
        "exampleEn":  "discern differences between the two paintings",
        "exampleKo":  "두 그림의 차이점을 파악하다",
        "memo":  ""
    },
    {
        "id":  "d19-33",
        "day":  "Day 19",
        "no":  "33",
        "word":  "solidarity",
        "phonetic":  "[sὰlədǽrəti]",
        "partOfSpeech":  "명사",
        "meaning":  "연대, 결속",
        "relatedForms":  "-",
        "paraphrase":  [
                           "unity"
                       ],
        "exampleEn":  "show solidarity with the young generation",
        "exampleKo":  "젊은 세대와의 연대를 보이다",
        "memo":  "지텔프 동의어: There is a great need for solidarity among all members of our team. -> (a) unity"
    },
    {
        "id":  "d19-34",
        "day":  "Day 19",
        "no":  "34",
        "word":  "staple",
        "phonetic":  "[stéipl]",
        "partOfSpeech":  "형용사",
        "meaning":  "기본이 되는, 주된",
        "relatedForms":  "-",
        "paraphrase":  [
                           "standard",
                           "chief",
                           "main",
                           "key",
                           "primary",
                           "principal"
                       ],
        "exampleEn":  "a staple dish of South Africa",
        "exampleKo":  "남아프리카의 기본 요리",
        "memo":  ""
    },
    {
        "id":  "d19-35",
        "day":  "Day 19",
        "no":  "35",
        "word":  "careless",
        "phonetic":  "[kέərlis]",
        "partOfSpeech":  "형용사",
        "meaning":  "부주의한, 경솔한",
        "relatedForms":  "care (명) 돌봄; 주의, (동) 신경 쓰다, 관심 갖다",
        "paraphrase":  [
                           "thoughtless",
                           "indiscreet"
                       ],
        "exampleEn":  "careless drivers",
        "exampleKo":  "부주의한 운전자들",
        "memo":  "a careless remark about weight (체중에 대한 경솔한 발언)"
    },
    {
        "id":  "d19-36",
        "day":  "Day 19",
        "no":  "36",
        "word":  "arrogant",
        "phonetic":  "[έrəgənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "거만한, 오만한",
        "relatedForms":  "arrogance (명) 거만, 오만",
        "paraphrase":  [
                           "conceited",
                           "lordly",
                           "haughty"
                       ],
        "exampleEn":  "an arrogant manner",
        "exampleKo":  "오만한 태도",
        "memo":  ""
    },
    {
        "id":  "d19-37",
        "day":  "Day 19",
        "no":  "37",
        "word":  "racial",
        "phonetic":  "[réiʃəl]",
        "partOfSpeech":  "형용사",
        "meaning":  "인종의, 인종간의",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "racial discrimination",
        "exampleKo":  "인종 차별",
        "memo":  "call for an end to racial injustice (인종 불평등의 종식을 호소하다)"
    },
    {
        "id":  "d19-38",
        "day":  "Day 19",
        "no":  "38",
        "word":  "improvise",
        "phonetic":  "[ímprəvàiz]",
        "partOfSpeech":  "동사",
        "meaning":  "즉흥적으로 하다, 있는 것으로 만들다",
        "relatedForms":  "improvisational (형) 즉흥의, improvisation (명) (공연·연기 등) 즉흥으로 하기",
        "paraphrase":  [
                           "invent",
                           "ad-lib"
                       ],
        "exampleEn":  "the improvised lyrics",
        "exampleKo":  "즉흥적으로 만들어진 가사",
        "memo":  ""
    },
    {
        "id":  "d19-39",
        "day":  "Day 19",
        "no":  "39",
        "word":  "perish",
        "phonetic":  "[périʃ]",
        "partOfSpeech":  "동사",
        "meaning":  "(사고나 재난 등으로) 죽다, 사라지다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "die",
                           "pass away"
                       ],
        "exampleEn":  "perish due to starvation",
        "exampleKo":  "기아로 죽다",
        "memo":  ""
    },
    {
        "id":  "d19-40",
        "day":  "Day 19",
        "no":  "40",
        "word":  "pest",
        "phonetic":  "[pest]",
        "partOfSpeech":  "명사",
        "meaning":  "해충, 유해 동물",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "reduce the number of pests",
        "exampleKo":  "해충의 수를 줄이다",
        "memo":  ""
    },
    {
        "id":  "d19-41",
        "day":  "Day 19",
        "no":  "41",
        "word":  "ban",
        "phonetic":  "[bæn]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "금지 / 금지하다",
        "relatedForms":  "-",
        "paraphrase":  [
                           "prohibition",
                           "forbid",
                           "prohibit",
                           "outlaw"
                       ],
        "exampleEn":  "The hunting of sea lions has been banned.",
        "exampleKo":  "바다사자의 사냥은 금지되었다.",
        "memo":  "지텔프 동의어: The school has decided to ban cell phones during class hours. -> (a) prohibit"
    },
    {
        "id":  "d19-42",
        "day":  "Day 19",
        "no":  "42",
        "word":  "implication",
        "phonetic":  "[ìmpləkéiʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "영향 / 암시",
        "relatedForms":  "imply (동) 암시하다",
        "paraphrase":  [
                           "suggestion"
                       ],
        "exampleEn":  "ecological implications of global warming",
        "exampleKo":  "지구 온난화의 생태학적 영향",
        "memo":  ""
    },
    {
        "id":  "d19-43",
        "day":  "Day 19",
        "no":  "43",
        "word":  "asset",
        "phonetic":  "[ǽset]",
        "partOfSpeech":  "명사",
        "meaning":  "자산, 재산",
        "relatedForms":  "-",
        "paraphrase":  [
                           "belongings",
                           "resource"
                       ],
        "exampleEn":  "see her as a future asset",
        "exampleKo":  "그녀를 미래의 자산으로 여기다",
        "memo":  "use all of the assets (모든 재산을 사용하다)"
    },
    {
        "id":  "d19-44",
        "day":  "Day 19",
        "no":  "44",
        "word":  "hatch",
        "phonetic":  "[hætʃ]",
        "partOfSpeech":  "동사",
        "meaning":  "부화하다",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "The eggs hatched into chicks.",
        "exampleKo":  "알이 병아리로 부화했다.",
        "memo":  ""
    },
    {
        "id":  "d19-45",
        "day":  "Day 19",
        "no":  "45",
        "word":  "incoherent",
        "phonetic":  "[ìnkouhíərənt]",
        "partOfSpeech":  "형용사",
        "meaning":  "횡설수설하는 / 일관성이 없는",
        "relatedForms":  "coherent (형) 논리 정연한; 일관성 있는",
        "paraphrase":  [
                           "wandering",
                           "inconsistent",
                           "confusing",
                           "unclear"
                       ],
        "exampleEn":  "The findings of the study were incoherent.",
        "exampleKo":  "연구 결과는 일관성이 없었다.",
        "memo":  ""
    },
    {
        "id":  "d19-46",
        "day":  "Day 19",
        "no":  "46",
        "word":  "retail",
        "phonetic":  "[ríːteil]",
        "partOfSpeech":  "명사/동사",
        "meaning":  "소매 / 소매하다",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "the retail price of the iPhone",
        "exampleKo":  "아이폰의 소매 가격",
        "memo":  ""
    },
    {
        "id":  "d19-47",
        "day":  "Day 19",
        "no":  "47",
        "word":  "complement",
        "phonetic":  "[kάmpləmənt]",
        "partOfSpeech":  "동사/명사",
        "meaning":  "보완하다 / 보완물, 보충제",
        "relatedForms":  "complementary (형) 상호 보완적인",
        "paraphrase":  [
                           "enhance",
                           "complete",
                           "improve",
                           "match"
                       ],
        "exampleEn":  "Teachers use pictures to complement their teaching.",
        "exampleKo":  "선생님들은 수업을 보완하기 위해 사진을 사용한다.",
        "memo":  "a nutritional complement (영양 보충제)"
    },
    {
        "id":  "d19-48",
        "day":  "Day 19",
        "no":  "48",
        "word":  "vulnerable",
        "phonetic":  "[vʌ́lnərəbl]",
        "partOfSpeech":  "형용사",
        "meaning":  "(~에) 상처받기 쉬운, 취약한",
        "relatedForms":  "-",
        "paraphrase":  [
                           "helpless",
                           "open",
                           "susceptible",
                           "exposed",
                           "unprotected",
                           "sensitive"
                       ],
        "exampleEn":  "Plants are vulnerable to pests and diseases.",
        "exampleKo":  "식물은 해충과 질병에 취약하다.",
        "memo":  "지텔프 동의어: Rickey is vulnerable to criticism because he tends to be very hard on himself. -> (a) open"
    },
    {
        "id":  "d19-49",
        "day":  "Day 19",
        "no":  "49",
        "word":  "manipulate",
        "phonetic":  "[mənípjəlèit]",
        "partOfSpeech":  "동사",
        "meaning":  "(교묘하게 사람이나 사물을) 조종하다 / 처리하다, 조작하다",
        "relatedForms":  "manipulation (명) 조작; 조종",
        "paraphrase":  [
                           "maneuver",
                           "operate",
                           "handle"
                       ],
        "exampleEn":  "manipulate the masses",
        "exampleKo":  "대중을 조종하다",
        "memo":  "manipulate a machine (기계를 조작하다)"
    },
    {
        "id":  "d19-50",
        "day":  "Day 19",
        "no":  "50",
        "word":  "corruption",
        "phonetic":  "[kərʌ́pʃən]",
        "partOfSpeech":  "명사",
        "meaning":  "부패, 타락",
        "relatedForms":  "-",
        "paraphrase":  [

                       ],
        "exampleEn":  "tackle the issue of nationwide corruption",
        "exampleKo":  "전국적인 부패 문제를 다루다",
        "memo":  ""
    }
];
