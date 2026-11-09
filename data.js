// G-TELP VOCA Day별 단어 데이터베이스
// 교재 사진 분석 결과 반영: Day 01 (01 ensure ~ 09 assure)

const INITIAL_WORDS_DATA = [
  {
    id: "d01-01",
    day: "Day 01",
    no: "01",
    word: "ensure",
    phonetic: "[inʃúər]",
    partOfSpeech: "동사",
    meaning: "보장하다, 확실하게 하다",
    relatedForms: "-",
    paraphrase: ["guarantee", "make sure", "confirm", "secure"],
    exampleEn: "Ensure that the plants get enough water.",
    exampleKo: "식물이 충분한 물을 얻도록 확실히 하다. (ensure satisfactory results: 만족할 만한 결과를 보장하다)",
    memo: "ensure + that절 / ensure satisfactory results (만족할 만한 결과를 보장하다)",
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
    phonetic: "[əwέər]",
    partOfSpeech: "형용사",
    meaning: "알고 있는, 의식하고 있는",
    relatedForms: "awareness (명) 의식, 인식",
    paraphrase: ["conscious", "mindful", "informed", "alert"],
    exampleEn: "Aware that Sally is difficult to work with.",
    exampleKo: "샐리와 함께 일하기 어렵다는 것을 알고 있는. (fully aware of the risk: 위험을 충분히 알고 있는)",
    memo: "be aware of (~을 알고 있다) / be aware that + 절",
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
    relatedForms: "elementary (형) 초보의, 기초적인",
    paraphrase: ["factor", "aspect", "component", "part"],
    exampleEn: "A key element in the relationship.",
    exampleKo: "관계의 핵심 요소.",
    memo: "a key element in ~ (~의 핵심 요인/요소)",
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
    phonetic: "[wə:rk]",
    partOfSpeech: "동사 / 명사",
    meaning: "일하다, 근무하다; 작동하다; 일, 작업; 작품, 저작물",
    relatedForms: "worker (명) 근로자, workmanship (명) 솜씨",
    paraphrase: ["serve", "be employed", "function", "operate", "task", "job", "piece", "creation"],
    exampleEn: "Prefer to work remotely.",
    exampleKo: "원격으로 일하는 것을 선호하다. (study the works of Leonardo da Vinci: 레오나르도 다빈치의 작품을 연구하다)",
    memo: "[지텔프 기출] Julie began to work as a nurse. ➔ work는 '일하다(근무하다)'이므로 serve가 정답 동의어!",
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
    relatedForms: "initially (부) 처음에, 초기에 / initiate (동) 시작하다",
    paraphrase: ["first", "early", "original", "primary"],
    exampleEn: "The initial response was encouraging.",
    exampleKo: "초기 반응은 고무적이었다.",
    memo: "initially (부) 처음에, 초기에 빈출",
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
    phonetic: "[lí:gəl]",
    partOfSpeech: "형용사",
    meaning: "법(률)의; 합법적인",
    relatedForms: "illegal (형) 불법의 / legalize (동) 합법화하다",
    paraphrase: ["lawful", "legitimate", "valid", "authorized"],
    exampleEn: "A legal way of evading tax.",
    exampleKo: "합법적인 절세(탈세) 방법. (avoid legal problems: 법적인 문제를 피하다)",
    memo: "반의어: illegal (불법의), legitimate (합법적인, 정당한)",
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
    phonetic: "[rimú:v]",
    partOfSpeech: "동사",
    meaning: "제거하다, 없애다; 벗다",
    relatedForms: "removal (명) 제거, 이동",
    paraphrase: ["eliminate", "get rid of", "take off", "clear"],
    exampleEn: "Remove weeds regularly.",
    exampleKo: "잡초를 주기적으로 제거하다. (remove the earrings before going to bed: 자기 전에 귀걸이를 빼다)",
    memo: "remove A from B (B에서 A를 제거하다) / get rid of, eliminate 동의어",
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
    meaning: "유지하다, 유지·관리하다",
    relatedForms: "maintenance (명) 유지 보수, 관리",
    paraphrase: ["keep", "uphold", "continue", "sustain", "preserve"],
    exampleEn: "Maintain high standards.",
    exampleKo: "높은 기준을 유지하다. (maintain good health: 좋은 건강을 유지하다)",
    memo: "maintain (동) ➔ maintenance (명) 유지 보수 철자 주의",
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
    paraphrase: ["convince", "promise", "persuade", "guarantee"],
    exampleEn: "The restaurant assured customers that it will not raise the prices.",
    exampleKo: "그 식당은 가격을 올리지 않을 것이라고 고객들에게 확신을 주었다.",
    memo: "[지텔프 기출] The mechanics assured me that the repair would be finished by Monday. ➔ 문장 속 assure는 '장담하다, 약속하다'이므로 promised가 정답 동의어!",
    options: [
      { word: "assure", def: "확신시키다, 장담하다" },
      { word: "ensure", def: "보장하다, 확실히 하다" },
      { word: "assume", def: "추정하다, 떠맡다" },
      { word: "assist", def: "돕다, 조력하다" }
    ]
  },
  {
    id: "d02-01",
    day: "Day 02",
    no: "01",
    word: "apparent",
    phonetic: "[əpǽrənt]",
    partOfSpeech: "형용사",
    meaning: "분명한, 명백한",
    relatedForms: "apparently (부) 명백히, 겉보기에는",
    paraphrase: ["obvious", "clear", "evident", "plain", "manifest"],
    exampleEn: "It is apparent that Emma is deeply stressed.",
    exampleKo: "엠마가 스트레스를 많이 받는 것이 분명하다. (for no apparent reason: 뚜렷한 이유 없이)",
    memo: "apparently (부) 명백히, 겉보기에는 / 반의어: obscure, ambiguous",
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
    partOfSpeech: "동사 / 명사",
    meaning: "공로를 인정하다; 칭찬, 인정; 신용",
    relatedForms: "creditable (형) 칭찬할 만한, creditor (명) 채권자",
    paraphrase: ["praise", "honor", "recognition", "attribute", "trust"],
    exampleEn: "Haley is credited with boosting the team's confidence.",
    exampleKo: "헤일리는 팀의 자신감을 높여준 공로를 인정받고 있다.",
    memo: "be credited to (~의 덕택이다 = be attributed to) / be credited with (-한 공로를 인정받다)",
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
    meaning: "운영하다; (대중교통 등) 운행하다; (기계를) 작동하다; 달리다",
    relatedForms: "runner (명) 주자, 주자",
    paraphrase: ["manage", "operate", "work", "function", "direct"],
    exampleEn: "Recently, Josh started to run a café.",
    exampleKo: "최근 조쉬는 카페를 운영하기 시작했다. (run an enterprise: 기업을 운영하다)",
    memo: "[지텔프 기출] Recently, Josh started to run a café. ➔ 문장 속 run은 '운영하다'이므로 manage가 정답 동의어! / run out of (~을 다 써버리다)",
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
    meaning: "규명하다, 정의하다, 분명히 하다",
    relatedForms: "definition (명) 규정, 정의 / definite (형) 확실한",
    paraphrase: ["determine", "establish", "specify", "clarify"],
    exampleEn: "Clearly define his career goals.",
    exampleKo: "그의 진로 목표를 명확히 정하다(규명하다).",
    memo: "definition (명) 정의, 규정 / definitely (부) 분명히, 확실히",
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
    meaning: "필수적인, 극히 중요한",
    relatedForms: "essence (명) 본질, 정수 / essentially (부) 근본적으로 (=basically)",
    paraphrase: ["vital", "important", "crucial", "critical", "key", "integral"],
    exampleEn: "A wide range of good bacteria is essential to our well-being.",
    exampleKo: "다양한 유익균들은 우리의 웰빙(건강)에 필수적이다.",
    memo: "be essential to/for (~에 필수적이다) / 동의어: vital, crucial, critical",
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
    partOfSpeech: "동사 / 명사",
    meaning: "집중하다, 초점을 맞추다; 집중, 초점",
    relatedForms: "focused (형) 집중된",
    paraphrase: ["concentrate", "center", "aim", "attention"],
    exampleEn: "Focus on details.",
    exampleKo: "세부사항에 집중하다.",
    memo: "focus on (~에 초점을 맞추다, 집중하다 = concentrate on)",
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
    phonetic: "[kánsikwèns]",
    partOfSpeech: "명사",
    meaning: "결과, 영향, 중요성",
    relatedForms: "consequently (부) 그 결과, 결과적으로",
    paraphrase: ["result", "outcome", "effect", "aftermath"],
    exampleEn: "Accept the consequences.",
    exampleKo: "결과를 받아들이다.",
    memo: "consequently (부) 결과적으로, 그 결과 빈출",
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
    meaning: "평가하다, 판단하다; 산정하다",
    relatedForms: "assessment (명) 평가, 판단 / assessor (명) 평가관",
    paraphrase: ["rate", "estimate", "evaluate", "appraise", "judge"],
    exampleEn: "Assess the effectiveness of the training program.",
    exampleKo: "교육 프로그램의 효과를 평가하다.",
    memo: "assessment (명) 평가 / access(접근하다)와 철자 혼동 주의!",
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
    relatedForms: "principled (형) 원칙이 있는",
    paraphrase: ["concept", "rule", "standards", "tenet", "doctrine"],
    exampleEn: "Understand the general principle.",
    exampleKo: "전반적인 원리를 이해하다.",
    memo: "principal(주요한; 교장)과 발음 유사 혼동 어휘 주의!",
    options: [
      { word: "principle", def: "원칙, 원리" },
      { word: "principal", def: "주요한; 교장" },
      { word: "prince", def: "왕자" },
      { word: "priority", def: "우선순위, 우선권" }
    ]
  }
];
