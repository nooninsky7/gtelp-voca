# G-TELP VOCA MASTER - 교재 기반 스마트 영단어 학습 시스템 (개인 비공개 학습용)

> [!CAUTION]
> **본 저장소 및 애플리케이션 데이터는 개인 맞춤형 학습을 위해 비공개로 관리되는 전용 자료입니다. 외부 공개, 검색엔진 크롤링, 상업적 활용 또는 제3자 배포·추천을 엄격히 금지합니다.**

- **검색엔진 차단**: `robots.txt` (`Disallow: /`) 및 `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">` 적용
- **전체 단어 수록 현황**: **총 1,082단어 완벽 탑재** (기초단어 82단어 + Day 01 ~ Day 20 각 50단어)
- **최신 버전**: **v3.1.2** (수기 암기팁 편집/자동저장 및 기기간 실시간 동기화 지원)

---

## 🔁 100% 무손실 앱 재구축 & 재실행 보장 (Disaster Recovery)

이 프로젝트는 **Node.js, npm, Webpack 등 복잡한 빌드 도구나 외부 서버에 대한 의존성이 전혀 없는 100% 순수 Vanilla 웹 기술(HTML, CSS, JavaScript)**로 개발되었습니다.

만약 향후 컴퓨터 포맷, 레포지토리 삭제, 플랫폼 이전 등 어떤 상황이 발생하더라도:

1. **로컬 오프라인 실행:**
   - 백업 압축 파일(`E_Words_M_FULL_MASTER_v3.0_DAY20.zip`)을 풀고 **`index.html`을 더블 클릭**하기만 하면 인터넷 연결 없이도 즉시 모든 단어장, 퀴즈, 플래시카드가 100% 동일하게 동작합니다.

2. **웹 호스팅 재배포:**
   - 폴더 안의 파일들(`index.html`, `app.js`, `data.js`, `style.css`, `robots.txt`)을 GitHub Pages, Netlify, Vercel, Cloudflare Pages 등 원하는 어떤 정적 웹 호스팅 서비스에든 그대로 업로드하면 10초 만에 현재와 동일한 웹 앱이 생성됩니다.

3. **데이터셋 재활용:**
   - 포함된 [`gtelp_voca_1082_words_complete.json`](file:///C:/Work/E%20Words_M/gtelp_voca_1082_words_complete.json) 파일에는 1,082단어의 모든 필드(발음기호, 품사, 뜻, 파생어, 패러프레이징, 예문, 해석, 출제포인트 팁)가 표준 JSON 규격으로 완벽하게 보존되어 있으므로 안드로이드/iOS 네이티브 앱, 엑셀, 노션 등 어디로든 1초 만에 가져와 쓸 수 있습니다.

---

## 📚 데이터베이스 수록 현황 (총 1,082단어)

| 구분 | 단어 수 | 단어 ID 범위 | 주요 대표 단어 및 수기 팁 |
| :--- | :---: | :---: | :--- |
| **기초단어** | 82단어 | `basic-01` ~ `basic-82` | prevent, publish, immediate, maintain, require ... |
| **Day 01** | 50단어 | `d01-01` ~ `d01-50` | indicate, yield, substantial, delicate, prompt ... |
| **Day 02** | 50단어 | `d02-01` ~ `d02-50` | determine, fundamental, fragile, implement, vital ... |
| **Day 03** | 50단어 | `d03-01` ~ `d03-50` | accommodate, essential, ambiguous, facilitate ... |
| **Day 04** | 50단어 | `d04-01` ~ `d04-50` | attribute, comprehensive, lucrative, reinforce ... |
| **Day 05** | 50단어 | `d05-01` ~ `d05-50` | compromise, resilient, plausible, generate ... |
| **Day 06** | 50단어 | `d06-01` ~ `d06-50` | designate, legitimate, scrutinize, versatile ... |
| **Day 07** | 50단어 | `d07-01` ~ `d07-50` | assess, formidable, spontaneous, terminate ... |
| **Day 08** | 50단어 | `d08-01` ~ `d08-50` | advocate, plausible, perpetual, augment ... |
| **Day 09** | 50단어 | `d09-01` ~ `d09-50` | positive, permission, routine, potential, crucial ... |
| **Day 10** | 50단어 | `d10-01` ~ `d10-50` | adequate, compensate, elaborate, preliminary ... |
| **Day 11** | 50단어 | `d11-01` ~ `d11-50` | patron, explore, explicit, adhere, tangible ... |
| **Day 12** | 50단어 | `d12-01` ~ `d12-50` | assume, delay, distinct, preliminary, allocate ... |
| **Day 13** | 50단어 | `d13-01` ~ `d13-50` | thrive, conform, feasible, arbitrary, mitigate ... |
| **Day 14** | 50단어 | `d14-01` ~ `d14-50` | contract, vegetation, labor, dispute, apparent ... |
| **Day 15** | 50단어 | `d15-01` ~ `d15-50` | endeavor, revise, rigid, mandatory, abundant ... |
| **Day 16** | 50단어 | `d16-01` ~ `d16-50` | forbid, interact, chronic, prospective, subtle ... |
| **Day 17** | 50단어 | `d17-01` ~ `d17-50` | proximity, debris, insurance, designate, manifest ... |
| **Day 18** | 50단어 | `d18-01` ~ `d18-50` | accord, distributor, noticeable, plausible, merge ... |
| **Day 19** | 50단어 | `d19-01` ~ `d19-50` | peculiar, unbearable, obscure, vulnerable, corrupt ... |
| **Day 20** | 50단어 | `d20-01` ~ `d20-50` | impede, reform, apprehensive, sophisticated, accident ... |
| **합계** | **1,082단어** | - | **기존 교재 팁 392개 + 사용자 수기 메모 편집 지원** |

---

## 🛠️ 주요 기능

1. **단어장 리스트 (VOCA List)**
   - Day별 필터링 (기초단어, Day 01 ~ Day 20, 전체보기)
   - 실시간 다항목 검색 (영단어, 한글 뜻, 품사, 패러프레이징 동의어)
   - 품사 태그, 발음기호, 파생어(터치 시 음성 재생), 예문/해석, 수기 메모 칩 노출
   - 선택 단어 집중 퀴즈 및 플래시카드 실행

2. **나만의 암기 팁 & 수기 메모 (Custom Memo & Sync)**
   - 단어 상세 모달창에서 직접 메모 입력/수정 가능
   - 3중 자동 저장(타이핑 800ms 디바운스, 포커스 아웃, 저장 버튼)
   - 기존 교재 팁 보호 및 원본 손실 방지 로직 탑재
   - 나만의 비밀 동기화 키(Cloud Sync)를 통해 스마트폰 ↔ 태블릿 ↔ PC 실시간 자동 동기화

3. **플래시카드 (Flashcards)**
   - 앞면: 영단어 + 발음기호 + 미국식 TTS 발음
   - 뒷면: 품사, 한글 뜻, 파생어, 패러프레이징 동의어, 예문 및 번역, **출제포인트/암기팁 카드**
   - 무작위 순서 셔플, 외운 단어/다시 볼 단어 자동 분류

4. **실전 퀴즈 시스템 (4-Choice & Cloze & Synonym)**
   - 4지선다 퀴즈 (Day당 50문항을 10문항씩 5라운드로 분할 학습)
   - 빈칸 문맥 완성 실전 퀴즈 (지텔프 독해 지문 실전형)
   - 패러프레이징 동의어 매칭 퀴즈 (지텔프 기출 유의어 집중 대비)
   - 누적 오답 횟수 관리 및 오답 단어 재시험 모드

5. **기기 간 실시간 자동 동기화 (Cloud Sync Key)**
   - REST API 기반의 슬롯 동기화를 통해 스마트폰과 태블릿 간 학습 진도 및 신규 단어, 수기 메모 실시간 동기화
   - JSON 백업 파일 다운로드 및 복원 기능 완벽 지원

---

## 📁 파일 구조

```
E Words_M/
├── index.html                           # 메인 UI 레이아웃, 모달 및 noindex 메타 태그
├── style.css                            # 커스텀 스타일 및 폰트/애니메이션
├── app.js                               # 퀴즈 엔진, 플래시카드, 동기화, UI 로직 (v3.1.2)
├── data.js                              # 공식 단어 데이터베이스 (INITIAL_WORDS_DATA - 1,082단어)
├── gtelp_voca_1082_words_complete.json  # 1,082단어 전체 원본 JSON 백업 파일
├── robots.txt                           # 검색엔진 크롤링 전체 차단
├── .gitignore                           # Git 추적 제외 규칙
└── README.md                            # 프로젝트 안내 및 재구축 가이드
```
