# G-TELP VOCA MASTER - 교재 기반 스마트 영단어 학습 시스템 (개인 비공개 학습용)

> [!CAUTION]
> **본 저장소 및 애플리케이션 데이터는 개인 맞춤형 학습을 위해 비공개로 관리되는 전용 자료입니다. 외부 공개, 검색엔진 크롤링, 상업적 활용 또는 제3자 배포·추천을 엄격히 금지합니다.**

- **검색엔진 차단**: `robots.txt` (`Disallow: /`) 및 `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">` 적용
- **전체 단어 수록 현황**: **총 1,110단어 완벽 탑재** (기초단어 82단어 + Day 01 ~ Day 20 각 50단어 + 기출 혼동어휘 28단어)
- **최신 버전**: **v4.4.1** (학습진도표 미니멀화 & X축 날짜별 일일 1회독 완료 합계 실시간 노출: 불필요한 맞춤진도·Day필터·학습순서를 정리하여 실제 진도표 본체만 즉시 집중 노출하고, X축 상단 각 날짜 하단에 그날 1회독 완료한 총 회차 숫자 및 상세 툴팁 탑재)

---

## 🔁 100% 무손실 앱 재구축 & 재실행 보장 (Disaster Recovery)

이 프로젝트는 **Node.js, npm, Webpack 등 복잡한 빌드 도구나 외부 서버에 대한 의존성이 전혀 없는 100% 순수 Vanilla 웹 기술(HTML, CSS, JavaScript)**로 개발되었습니다.

만약 향후 컴퓨터 포맷, 레포지토리 삭제, 플랫폼 이전 등 어떤 상황이 발생하더라도:

1. **로컬 오프라인 실행:**
   - 백업 압축 파일(`E_Words_M_FULL_MASTER_v3.9.8_LATEST.zip`)을 풀고 **`index.html`을 더블 클릭**하기만 하면 인터넷 연결 없이도 즉시 모든 단어장, 퀴즈, 플래시카드가 100% 동일하게 동작합니다.

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
| **기출 혼동어휘** | 28단어 | `conf-01` ~ `conf-28` | initiative, intimate, principal, credible, lethal, convenience ... |
| **합계** | **1,110단어** | - | **기존 교재 팁 392개 + 혼동어휘 핵심 팁 28개 완벽 탑재** |

---

## 🛠️ 주요 기능

1. **단어장 리스트 (VOCA List)**
   - Day별 필터링 (기초단어, Day 01 ~ Day 20, 전체보기)
   - **스마트 검색 & 실제 검색어 최상단 독립 카드 노출**:
     - 검색어와 정확히 일치하거나 검색어로 시작하는 단어가 1순위 최상단에 자동 정렬
     - 동의어 또는 파생어 검색 시에도 원문 단어에만 묻히지 않고 **실제 검색한 단어 자체의 독립 단어 카드(발음 버튼, 뜻, 예문)가 1순위로 생성/노출**되고 부모 단어도 함께 연계 출력
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
   - **유기적 상세 연동**: 동의어 및 파생어 칩 터치 시 즉시 상세 모달 연결 (`[상세]` 노란색 배지 통일) 및 개별 발음 스피커 탑재
   - **스마트 이어보기**: 플래시카드 학습 도중 나갔다 재진입 시 보던 카드 위치 그대로 자동 복원
   - **모바일/태블릿 터치 최적화**: 3D 카드 플립 뒷면 터치 이벤트 완벽 지원, 버튼 사이즈 최적화로 가독성 및 본문 공간 극대화
   - **학습 완료 시 첫화면 즉시 복귀**: 한 Day의 카드를 모두 확인하면 즉시 플래시카드 Day 목록 첫화면으로 자동 복귀하여 실시간 갱신된 회독수를 바로 확인 가능
   - 무작위 순서 셔플 및 교재 원본 순서 정렬 옵션 지원, 외운 단어/다시 볼 단어 자동 분류

4. **실전 퀴즈 시스템 & 회독수 트래킹 (4-Choice & Cloze & Synonym & Rounds)**
   - 4지선다 퀴즈 (Day당 50문항을 10문항씩 5라운드로 분할 학습)
   - 빈칸 문맥 완성 실전 퀴즈 (지텔프 독해 지문 실전형)
   - 패러프레이징 동의어 매칭 퀴즈 (지텔프 기출 유의어 집중 대비)
   - **회독수(회독차수) 실시간 표시**: 각 탭(플래시카드/문장빈칸퀴즈/패러프레이징/4지선다) Day 선택 버튼에 회독차수 뱃지 자동 표시
   - 누적 오답 횟수 관리 및 오답 단어 재시험 모드

5. **유기적 어휘 연계 엔진 (Comprehensive Vocabulary Engine)**
   - 단어장 등록 단어뿐 아니라 동의어, 파생어, 기출 연계 보기 단어까지 100% 상세정보 모달 팝업 지원
   - 상세 모달 상단 배지 정규화: 모든 팝업 상단에 `"Day 01"`, `"No.01"` 형식으로 깔끔하고 일관된 표기
   - 단어 간 탐색 히스토리(`이전 단어로 돌아가기`) 지원으로 꼬리에 꼬리를 무는 연계 학습

6. **기기 간 실시간 자동 동기화 (Cloud Sync Key)**
   - REST API 기반의 슬롯 동기화를 통해 스마트폰과 태블릿 간 학습 진도 및 신규 단어, 수기 메모 실시간 동기화
   - JSON 백업 파일 다운로드 및 복원 기능 완벽 지원

7. **📅 데일리 학습 진도 매트릭스 & 복습 체크표 (v4.4.1 미니멀 최적화)**
   - **실제 진도표 본체 즉시 노출**:
     - 기존의 상단 맞춤진도 카드, Day 필터 버튼, 4단계 학습순서 범례 등 시야를 가리던 부가 요소를 전면 제거하여, 진도표 탭 진입 시 표 본체만 시원하고 깔끔하게 즉시 노출.
   - **X축 상단 날짜 하단 일일 1회독 완료 합계 숫자 노출**:
     - 상단 각 날짜(11/22, 11/23 ...) 하단에 그날 어떤 항목이든 1회독을 완료한 총 개수(숫자)를 간결하게 표시. (마우스 오버나 터치 시 어떤 Day의 어떤 항목을 완료했는지 상세 툴팁 노출)
   - **X축 날짜 (11/22일 기준 시작, 14일치 동시 노출 & [오늘] 하이라이트)**:
     - 날짜칸 너비를 슬림하게 압축(34~44px)하여 가로 스크롤 부담 없이 수많은 날짜가 화면에 한눈에 노출
   - **깔끔한 텍스트 기반 4단계 구분 & 괄호 누적 회독수**:
     - `1단계 플래시카드 (0)`, `2단계 4지선다 (1)` 형식으로 괄호 안에 누적 회독수를 바로 표기하여 공간 극대화
   - **셀 내 간결한 숫자 회차 표기 & 수동 체크/즉시 학습 연동**:
     - 셀 안에는 깔끔한 숫자(`1`, `2` 등)만 심플하게 표시 (미완료는 `-`). 셀 클릭 시 "해당 학습 바로 시작" 및 "날짜별 수동 체크/취소" 팝업 모달 제공.
   - **해당 항목 모든 단어 완독 시에만 회독 엄격 집계**:
     - 플래시카드(Day 전수 확인), 4지선다(Day 전체 문항 풀이), 문장빈칸(Day 전체 빈칸 풀이), 패러프레이징(Day 전체 동의어 풀이)을 끝까지 모두 완료했을 때만 1회독으로 인정되어 정직하고 체계적인 회독 관리 보장

8. **📍 4대 학습 항목 풀던 위치 실시간 완전 기억 & 이어풀기 시스템 (v4.4.0)**
   - **모드별 독립 세션 & Day별 영구 저장소 완벽 분리**:
     - 플래시카드, 4지선다, 문장빈칸, 패러프레이징 4개 항목이 각각 독립된 진행 상태 맵(`gtelp_fc_last_progress`, `gtelp_quiz_last_progress`, `gtelp_cloze_last_progress`, `gtelp_para_last_progress`)을 보유하여, 다른 모드를 열거나 탭을 이동해도 기존에 풀던 문제 번호가 절대로 덮어씌워지거나 지워지지 않음.
   - **Day 선택 화면 진행 배지 & 1클릭 이어풀기**:
     - 중간에 풀다 만 Day가 있을 경우 Day 목록에 `[N/50번 이어풀기]` 배지가 선명하게 노출되고, 버튼 역시 `N번 이어풀기`로 자동 변환되어 클릭 한 번으로 풀던 자리로 즉시 복귀.
   - **중단 시 자동 보존**:
     - 상단 뒤로가기나 학습 중단(종료) 버튼 클릭 시 세션이 삭제되지 않고 현재 진행 인덱스가 안전하게 자동 저장됨. (모든 문제를 끝까지 다 풀었을 때만 완료 처리되어 다음 번에 1번부터 새 회독으로 시작).

---

## 📁 파일 구조

```
E Words_M/
├── index.html                           # 메인 UI 레이아웃, 모달 및 noindex 메타 태그
├── style.css                            # 커스텀 스타일 및 폰트/애니메이션
├── app.js                               # 퀴즈 엔진, 플래시카드, 동기화, UI 로직 (v4.4.1)
├── data.js                              # 공식 단어 데이터베이스 (INITIAL_WORDS_DATA - 1,082단어)
├── gtelp_voca_1082_words_complete.json  # 1,082단어 전체 원본 JSON 백업 파일
├── robots.txt                           # 검색엔진 크롤링 전체 차단
├── .gitignore                           # Git 추적 제외 규칙
└── README.md                            # 프로젝트 안내 및 재구축 가이드
```
