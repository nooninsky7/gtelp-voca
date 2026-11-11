# G-TELP VOCA MASTER - 교재 기반 스마트 영단어 학습 시스템

지텔프(G-TELP) 시험 대비를 위한 교재 기반 단어장 및 4가지 실전 퀴즈 & 플래시카드 웹 애플리케이션입니다.

- **웹 애플리케이션 공식 배포 주소**: [https://nooninsky7.github.io/gtelp-voca/](https://nooninsky7.github.io/gtelp-voca/)
- **전체 단어 수록 현황**: **총 1,082단어 완벽 탑재** (기초단어 82단어 + Day 01 ~ Day 20 각 50단어)

---

## 📚 데이터베이스 수록 현황 (총 1,082단어)

| 구분 | 단어 수 | 단어 ID 범위 | 주요 대표 단어 |
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
| **합계** | **1,082단어** | - | **지텔프 65점+ / Level 2 완벽 대비 데이터셋** |

---

## 🛠️ 주요 기능

1. **단어장 리스트 (VOCA List)**
   - Day별 선택 필터링 (기초단어, Day 01 ~ Day 20, 전체보기)
   - 실시간 다항목 검색 (영단어, 한글 뜻, 품사, 패러프레이징 동의어)
   - 품사 태그, 발음기호, 파생어(터치 시 음성 재생), 예문/해석 표시
   - 선택 단어 집중 퀴즈 및 플래시카드 실행

2. **플래시카드 (Flashcards)**
   - 앞면: 영단어 + 발음기호 + 미국식 TTS 발음
   - 뒷면: 품사, 한글 뜻, 파생어, 패러프레이징 유의어, 예문 및 번역
   - 자동 셔플(무작위 순서), 이전/다음 탐색, 외운 단어/다시 볼 단어 분류

3. **4지선다 퀴즈 (4-Choice Quiz)**
   - Day별 50문제를 10문제씩 5라운드로 나누어 단계별 학습
   - 오답 보기 단어 실시간 뜻풀이 및 발음 제공
   - 라운드 완료 진행률 자동 저장

4. **빈칸 실전 퀴즈 (Cloze Context Quiz)**
   - 실제 지텔프 시험 문맥형 빈칸 완성 퀴즈
   - 문제 예문 문맥에 맞는 단어 선택 및 즉각적인 해설/문장 번역 확인

5. **패러프레이징 동의어 퀴즈 (Synonym Quiz)**
   - 지텔프 독해 파트의 동의어 문제 적중 대비
   - 실제 출제된 기출 동의어 및 빈출 유의어 매칭 연습

6. **오답 노트 & 취약 단어 집중 관리**
   - 퀴즈 중 틀린 단어 누적 오답 횟수 자동 카운트
   - 오답 단어만 모아서 재시험 풀기

7. **기기 간 실시간 자동 동기화 (Cloud Sync Key)**
   - 비밀 동기화 키(Sync Key)를 통해 스마트폰과 태블릿 간 학습 진도 및 신규 단어 데이터 실시간 동기화
   - 데이터 백업 JSON 다운로드 및 복원 기능 지원

8. **태블릿 & 모바일 풀스크린 모드**
   - 태블릿 가로/세로 화면에 최적화된 전체화면 토글 및 PWA 홈 화면 추가 지원

---

## 📁 프로젝트 파일 구조

```
E Words_M/
├── index.html                           # 메인 UI 레이아웃 및 모달 컴포넌트
├── style.css                            # 커스텀 스타일 및 폰트/애니메이션
├── app.js                               # 퀴즈 엔진, 플래시카드, 동기화, UI 로직
├── data.js                              # 공식 단어 데이터베이스 (INITIAL_WORDS_DATA - 1,082단어)
├── gtelp_voca_1082_words_complete.json  # 1,082단어 전체 원본 JSON 백업 파일
├── robots.txt                           # 검색엔진 크롤링 방지
├── .gitignore                           # Git 추적 제외 규칙
└── README.md                            # 프로젝트 안내 및 데이터 보존 문서
```

---

## 🔒 데이터 무결성 및 백업 이력 (Git Tags & Backups)

- `v1.0-basic-to-day05-20261109`: 기초단어 ~ Day 05 (332단어)
- `v1.1-day06-added-20261110`: Day 06 추가 (382단어)
- `v1.2-day07-added-20261110`: Day 07 추가 (432단어)
- `v1.8-day08-added-20261111`: Day 08 추가 (482단어)
- `v1.9-day10-added-20261111`: Day 10 추가 (532단어)
- `v2.0-day11-added-20261111`: Day 11 추가 (582단어)
- `v2.1-day12-added-20261111`: Day 12 추가 (632단어)
- `v2.2-day09-added-20261111`: Day 09 추가 (682단어)
- `v2.3-day13-added-20261111`: Day 13 추가 (732단어)
- `v2.4-day14-added-20261111`: Day 14 추가 (782단어)
- `v2.5-day15-added-20261111`: Day 15 추가 (832단어)
- `v2.6-day16-added-20261111`: Day 16 추가 (882단어)
- `v2.7-day17-added-20261111`: Day 17 추가 (932단어)
- `v2.8-day18-added-20261111`: Day 18 추가 (982단어)
- `v2.9-day19-added-20261111`: Day 19 추가 (1,032단어)
- **`v3.0-day20-added-20261111`**: Day 20 추가 (1,082단어 공식 릴리스)
- **로컬 ZIP 아카이브**:
  - `C:\Work\E_Words_M_backup_v3.0_day20.zip`
  - `C:\Work\E_Words_M_FULL_MASTER_v3.0_DAY20.zip`
