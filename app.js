// VOCA Master - 메인 애플리케이션 로직

(function () {
  // 상태 변수
  let words = [];
  let wrongStats = {}; // { [id]: wrongCount }
  let currentTab = 'list';
  let activeDayFilter = 'ALL';
  let currentSort = 'default';
  let selectedWordIds = new Set();
  
  // TTS 설정
  let ttsVoice = null;
  let ttsRate = 0.9;
  let availableVoices = [];

  // 퀴즈 상태
  let activeQuiz = {
    type: 'standard', // 'standard' or 'paraphrase'
    questionList: [],
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    wrongList: [],
    answered: false
  };

  // DOM 로드 완료 후 초기화
  document.addEventListener('DOMContentLoaded', () => {
    initAuthLock();
    loadData();
    initTTS();
    initUI();
    renderDayFilters();
    renderWordList();
    renderStats();
  });

  // --------------------------------------------------------------------------
  // 0. 보안 및 PIN 잠금 화면 모듈 (기본 비밀번호: 0407)
  // --------------------------------------------------------------------------
  const DEFAULT_PIN_HASH = '45bd891a8dc77f546eb5e657a7619711dba80242d7c22d12a7b2b124f9bfb43d';

  // 순수 JS SHA-256 (HTTP 환경이나 crypto.subtle 미지원 환경 완벽 호환)
  function sha256Pure(ascii) {
    function rightRotate(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j;
    var result = '';
    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    var hash = [];
    var k = [];
    var primeCounter = 0;
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 300; i += candidate) { isComposite[i] = candidate; }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << ((3 - (i % 4)) * 8);
    }
    words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
    words[words[lengthProperty]] = asciiBitLength;
    for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, (j += 16));
      var oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        var s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        w[i] = i < 16 ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        var s1_maj = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
        var maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
        var t2 = (s1_maj + maj) | 0;
        var s0_ch = rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
        var ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
        var t1 = (hash[7] + s0_ch + ch + k[i] + w[i]) | 0;
        hash = [(t1 + t2) | 0].concat(hash);
        hash[4] = (hash[4] + t1) | 0;
      }
      for (i = 0; i < 8; i++) { hash[i] = (hash[i] + oldHash[i]) | 0; }
    }
    for (i = 0; i < 8; i++) {
      for (var b = 3; b >= 0; b--) {
        var byte = (hash[i] >> (b * 8)) & 255;
        result += (byte < 16 ? '0' : '') + byte.toString(16);
      }
    }
    return result;
  }

  async function computeSha256(text) {
    if (window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === 'function') {
      try {
        const msgUint8 = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {
        console.warn('crypto.subtle failed, falling back to pure JS sha256', e);
      }
    }
    return sha256Pure(text);
  }

  function initAuthLock() {
    const isRemembered = localStorage.getItem('gtelp_auth_state') === 'authenticated';
    const isSession = sessionStorage.getItem('gtelp_auth_state') === 'authenticated';
    const lockScreen = document.getElementById('appLockScreen');
    const pinInput = document.getElementById('lockPinInput');
    const errorEl = document.getElementById('lockPinError');
    const container = document.getElementById('pinInputContainer');

    function hideLockScreen() {
      if (!lockScreen) return;
      lockScreen.style.setProperty('display', 'none', 'important');
      lockScreen.classList.add('hidden');
      lockScreen.classList.remove('flex');
    }

    function showLockScreen() {
      if (!lockScreen) return;
      lockScreen.style.setProperty('display', 'flex', 'important');
      lockScreen.classList.remove('hidden');
      lockScreen.classList.add('flex');
    }

    if (isRemembered || isSession) {
      hideLockScreen();
    } else {
      showLockScreen();
      setTimeout(() => pinInput?.focus(), 150);
    }

    // 비상 닫기 / 건너뛰기 X 버튼
    document.getElementById('btnCloseLockScreen')?.addEventListener('click', () => {
      localStorage.setItem('gtelp_auth_state', 'authenticated');
      hideLockScreen();
      showToast('🔓 메인 화면으로 이동했습니다.');
    });

    // 잠금 실행 (로그아웃)
    function lockAppNow() {
      localStorage.removeItem('gtelp_auth_state');
      sessionStorage.removeItem('gtelp_auth_state');
      if (pinInput) pinInput.value = '';
      if (errorEl) errorEl.classList.add('hidden');
      showLockScreen();
      setTimeout(() => pinInput?.focus(), 150);
      closeModal('dataManageModal');
      showToast('🔒 앱이 잠겼습니다.');
    }

    document.getElementById('btnAppLock')?.addEventListener('click', lockAppNow);
    document.getElementById('btnLockAppNow')?.addEventListener('click', lockAppNow);

    // PIN 검증 및 잠금 해제
    async function handlePinSubmit() {
      if (!pinInput) return;
      const val = pinInput.value.trim();
      if (!val) {
        if (errorEl) {
          errorEl.textContent = '비밀번호를 입력해주세요.';
          errorEl.classList.remove('hidden');
        }
        return;
      }

      let isMatch = false;

      // 1. 마스터 기본 비밀번호 0407 직접 검증 (어떤 환경이든 무조건 해제 보장)
      if (val === '0407') {
        isMatch = true;
      }

      // 2. 평문 커스텀 비밀번호 검증
      const customPlain = localStorage.getItem('gtelp_custom_pin_plain');
      if (customPlain && val === customPlain) {
        isMatch = true;
      }

      // 3. SHA-256 해시 검증
      if (!isMatch) {
        try {
          const inputHash = await computeSha256(val);
          const targetHash = localStorage.getItem('gtelp_custom_pin_hash') || DEFAULT_PIN_HASH;
          if (inputHash === targetHash || inputHash === DEFAULT_PIN_HASH) {
            isMatch = true;
          }
        } catch (err) {
          console.error('Hash verify error:', err);
        }
      }

      if (isMatch) {
        const remember = document.getElementById('lockRememberDevice')?.checked ?? true;
        if (remember) {
          localStorage.setItem('gtelp_auth_state', 'authenticated');
        } else {
          sessionStorage.setItem('gtelp_auth_state', 'authenticated');
        }

        hideLockScreen();
        pinInput.value = '';
        if (errorEl) errorEl.classList.add('hidden');
        showToast('🔓 잠금이 해제되었습니다!');
      } else {
        if (container) {
          container.classList.remove('shake');
          void container.offsetWidth;
          container.classList.add('shake');
        }
        if (errorEl) {
          errorEl.textContent = '비밀번호가 일치하지 않습니다.';
          errorEl.classList.remove('hidden');
        }
        pinInput.value = '';
      }
    }

    pinInput?.addEventListener('input', () => {
      if (errorEl) errorEl.classList.add('hidden');
      if (pinInput.value.length >= 4) {
        handlePinSubmit();
      }
    });

    pinInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handlePinSubmit();
      }
    });

    document.getElementById('btnSubmitLockPin')?.addEventListener('click', handlePinSubmit);

    // 비상 비밀번호 초기화 버튼 (터치 한 번으로 즉시 잠금 풀기)
    document.getElementById('btnEmergencyResetPin')?.addEventListener('click', () => {
      localStorage.removeItem('gtelp_custom_pin_hash');
      localStorage.removeItem('gtelp_custom_pin_plain');
      localStorage.setItem('gtelp_auth_state', 'authenticated');
      hideLockScreen();
      showToast('🔓 잠금이 즉시 해제되었습니다!');
    });

    // 가상 터치 키패드
    document.querySelectorAll('.pin-keypad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (!pinInput) return;
        if (key === 'clear') {
          pinInput.value = '';
          if (errorEl) errorEl.classList.add('hidden');
        } else if (key === 'back') {
          pinInput.value = pinInput.value.slice(0, -1);
        } else {
          if (pinInput.value.length < 6) {
            pinInput.value += key;
            if (pinInput.value.length >= 4) {
              handlePinSubmit();
            }
          }
        }
      });
    });

    // 비밀번호 변경 모달 이벤트
    document.getElementById('btnOpenChangePin')?.addEventListener('click', () => {
      closeModal('dataManageModal');
      const curInput = document.getElementById('currentPinInput');
      const newInput = document.getElementById('newPinInput');
      const confirmInput = document.getElementById('newPinConfirmInput');
      const changeErr = document.getElementById('changePinError');
      if (curInput) curInput.value = '';
      if (newInput) newInput.value = '';
      if (confirmInput) confirmInput.value = '';
      if (changeErr) changeErr.classList.add('hidden');
      openModal('changePinModal');
    });

    document.getElementById('btnSaveNewPin')?.addEventListener('click', async () => {
      const curVal = document.getElementById('currentPinInput')?.value.trim();
      const newVal = document.getElementById('newPinInput')?.value.trim();
      const confirmVal = document.getElementById('newPinConfirmInput')?.value.trim();
      const errEl = document.getElementById('changePinError');

      const targetHash = localStorage.getItem('gtelp_custom_pin_hash') || DEFAULT_PIN_HASH;
      const customPlain = localStorage.getItem('gtelp_custom_pin_plain');
      let curMatch = (curVal === '0407') || (customPlain && curVal === customPlain);
      if (!curMatch) {
        const curHash = await computeSha256(curVal);
        curMatch = (curHash === targetHash || curHash === DEFAULT_PIN_HASH);
      }

      if (!curMatch) {
        if (errEl) {
          errEl.textContent = '현재 비밀번호가 일치하지 않습니다.';
          errEl.classList.remove('hidden');
        }
        return;
      }

      if (!newVal || newVal.length < 4 || newVal.length > 6) {
        if (errEl) {
          errEl.textContent = '새 비밀번호는 4~6자리로 입력해주세요.';
          errEl.classList.remove('hidden');
        }
        return;
      }

      if (newVal !== confirmVal) {
        if (errEl) {
          errEl.textContent = '새 비밀번호가 서로 일치하지 않습니다.';
          errEl.classList.remove('hidden');
        }
        return;
      }

      const newHash = await computeSha256(newVal);
      localStorage.setItem('gtelp_custom_pin_hash', newHash);
      localStorage.setItem('gtelp_custom_pin_plain', newVal);
      closeModal('changePinModal');
      showToast('🔑 비밀번호가 성공적으로 변경되었습니다!');
    });
  }

  // --------------------------------------------------------------------------
  // 1. 데이터 로드 & 저장소 (LocalStorage)
  // --------------------------------------------------------------------------
  function loadData() {
    const savedWords = localStorage.getItem('voca_words');
    let loaded = [];
    if (savedWords) {
      try {
        loaded = JSON.parse(savedWords);
      } catch (e) {
        loaded = [];
      }
    }

    // INITIAL_WORDS_DATA를 기준으로 데이터 맵 생성 (최신 교재 데이터 반영)
    const wordMap = new Map();
    INITIAL_WORDS_DATA.forEach(w => wordMap.set(w.id, { ...w }));
    
    // 사용자가 로컬에서 수정한 내용이나 추가된 커스텀 단어가 있다면 병합
    loaded.forEach(w => {
      if (!wordMap.has(w.id)) {
        wordMap.set(w.id, w);
      }
    });

    words = Array.from(wordMap.values());
    saveWords();

    const savedStats = localStorage.getItem('voca_wrong_stats');
    if (savedStats) {
      try {
        wrongStats = JSON.parse(savedStats);
      } catch (e) {
        wrongStats = {};
      }
    } else {
      wrongStats = {};
    }
  }

  function saveWords() {
    localStorage.setItem('voca_words', JSON.stringify(words));
  }

  function saveStats() {
    localStorage.setItem('voca_wrong_stats', JSON.stringify(wrongStats));
    renderStats();
  }

  function getWrongCount(id) {
    return wrongStats[id] || 0;
  }

  function addWrongCount(id) {
    wrongStats[id] = (wrongStats[id] || 0) + 1;
    saveStats();
  }

  function resetWordWrongCount(id) {
    if (wrongStats[id]) {
      delete wrongStats[id];
      saveStats();
    }
  }

  // --------------------------------------------------------------------------
  // 2. Web Speech API (TTS) - 모든 영단어 및 문장 발음
  // --------------------------------------------------------------------------
  function initTTS() {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    function populateVoices() {
      availableVoices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
      const select = document.getElementById('ttsVoiceSelect');
      if (!select) return;
      select.innerHTML = '';
      
      availableVoices.forEach((voice, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `${voice.name} (${voice.lang})`;
        if (voice.lang === 'en-US' && (voice.name.includes('Google') || voice.name.includes('Natural') || i === 0)) {
          opt.selected = true;
          ttsVoice = voice;
        }
        select.appendChild(opt);
      });

      if (!ttsVoice && availableVoices.length > 0) {
        ttsVoice = availableVoices[0];
      }
    }

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }

    const rateRange = document.getElementById('ttsRateRange');
    const rateValue = document.getElementById('ttsRateValue');
    if (rateRange) {
      rateRange.addEventListener('input', (e) => {
        ttsRate = parseFloat(e.target.value);
        rateValue.textContent = `${ttsRate.toFixed(1)}x`;
      });
    }

    const voiceSelect = document.getElementById('ttsVoiceSelect');
    if (voiceSelect) {
      voiceSelect.addEventListener('change', (e) => {
        const idx = parseInt(e.target.value);
        ttsVoice = availableVoices[idx] || null;
      });
    }

    document.getElementById('btnTestTts')?.addEventListener('click', () => {
      speak('prevent');
    });
  }

  function speak(text, e) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (!text || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // 이전 재생 취소
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = ttsRate;
    if (ttsVoice) {
      utterance.voice = ttsVoice;
    }
    window.speechSynthesis.speak(utterance);
  }

  // --------------------------------------------------------------------------
  // 3. UI 탭 전환 & 모달 제어
  // --------------------------------------------------------------------------
  window.switchTab = function (tabId) {
    currentTab = tabId;
    document.querySelectorAll('.nav-tab').forEach(btn => {
      const active = btn.dataset.tab === tabId;
      btn.classList.toggle('border-indigo-600', active);
      btn.classList.toggle('text-indigo-600', active);
      btn.classList.toggle('font-bold', active);
      btn.classList.toggle('border-transparent', !active);
      btn.classList.toggle('text-slate-500', !active);
    });

    ['list', 'flashcard', 'quiz', 'cloze-quiz', 'paraphrase-quiz', 'stats'].forEach(t => {
      const section = document.getElementById(`view-${t}`);
      if (section) {
        section.classList.toggle('hidden', t !== tabId);
      }
    });

    if (tabId === 'list') {
      renderWordList();
    } else if (tabId === 'flashcard') {
      setupFlashcardScopeUI();
    } else if (tabId === 'quiz') {
      setupQuizScopeUI('standard');
    } else if (tabId === 'cloze-quiz') {
      setupClozeScopeUI();
    } else if (tabId === 'paraphrase-quiz') {
      setupQuizScopeUI('paraphrase');
    } else if (tabId === 'stats') {
      renderStats();
    }
  };

  window.openModal = function (modalId) {
    document.getElementById(modalId)?.classList.remove('hidden');
  };

  window.closeModal = function (modalId) {
    if (modalId === 'wordDetailModal') {
      modalWordHistory = [];
      currentDetailWordId = null;
      document.getElementById('modalBackWordContainer')?.classList.add('hidden');
    }
    document.getElementById(modalId)?.classList.add('hidden');
  };

  function showToast(message) {
    const toast = document.getElementById('toastMessage');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2200);
  }

  // --------------------------------------------------------------------------
  // 4. 단어 리스트 및 필터/정렬 렌더링
  // --------------------------------------------------------------------------
  function getAllDays() {
    const daySet = new Set(words.map(w => w.day || 'Day 01'));
    return Array.from(daySet).sort();
  }

  function renderDayFilters() {
    const days = ['ALL', ...getAllDays()];
    const select = document.getElementById('dayDropdownSelect');
    if (!select) return;

    select.innerHTML = days.map(d => {
      const label = d === 'ALL' ? '전체 Day 보기' : `${d} (${words.filter(w => w.day === d).length}단어)`;
      return `<option value="${d}" ${activeDayFilter === d ? 'selected' : ''}>${label}</option>`;
    }).join('');

    select.onchange = (e) => {
      activeDayFilter = e.target.value;
      renderWordList();
      updateDayNavButtons();
    };

    // 현재 Day 바로 문제풀기 버튼 문구 동기화
    const quickQuizText = document.getElementById('btnDayQuickQuizText');
    if (quickQuizText) {
      quickQuizText.textContent = activeDayFilter === 'ALL' ? '전체 단어 풀기' : `${activeDayFilter} 문제 풀기`;
    }

    updateDayNavButtons();
  }

  function updateDayNavButtons() {
    const days = getAllDays();
    const prevBtn = document.getElementById('btnPrevDay');
    const nextBtn = document.getElementById('btnNextDay');
    const quickQuizText = document.getElementById('btnDayQuickQuizText');
    if (quickQuizText) {
      quickQuizText.textContent = activeDayFilter === 'ALL' ? '전체 단어 풀기' : `${activeDayFilter} 문제 풀기`;
    }
    if (!prevBtn || !nextBtn) return;

    if (activeDayFilter === 'ALL' || days.length <= 1) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      prevBtn.style.opacity = '0.4';
      nextBtn.style.opacity = '0.4';
      return;
    }

    const currentIndex = days.indexOf(activeDayFilter);
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= days.length - 1;
    prevBtn.style.opacity = currentIndex <= 0 ? '0.4' : '1';
    nextBtn.style.opacity = currentIndex >= days.length - 1 ? '0.4' : '1';
  }

  function goToAdjacentDay(delta) {
    const days = getAllDays();
    let currentIndex = days.indexOf(activeDayFilter);
    if (currentIndex === -1) currentIndex = 0;
    const newIndex = currentIndex + delta;
    if (newIndex >= 0 && newIndex < days.length) {
      activeDayFilter = days[newIndex];
      renderDayFilters();
      renderWordList();
      showToast(`[${activeDayFilter}] 단어 목록으로 이동했습니다.`);
    }
  }

  function renderDayGridDashboard() {
    const container = document.getElementById('dayGridContainer');
    if (!container) return;
    const days = getAllDays();

    container.innerHTML = days.map(d => {
      const dayWords = words.filter(w => w.day === d);
      const wrongCount = dayWords.filter(w => getWrongCount(w.id) > 0).length;
      const isCurrent = activeDayFilter === d;

      return `
        <div class="p-4 rounded-2xl border transition-all ${
          isCurrent 
            ? 'border-indigo-500 bg-indigo-50/60 shadow-md ring-2 ring-indigo-500/20' 
            : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
        } space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                ${d.replace('Day ', '')}
              </span>
              <div>
                <div class="font-black text-sm text-slate-900">${d}</div>
                <div class="text-[11px] text-slate-500">총 ${dayWords.length}단어 수록</div>
              </div>
            </div>

            ${wrongCount > 0 ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600">
                오답 ${wrongCount}개
              </span>
            ` : `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                완벽 마스터
              </span>
            `}
          </div>

          <!-- 액션 버튼들 -->
          <div class="grid grid-cols-4 gap-1 pt-1 border-t border-slate-100 text-[11px]">
            <button onclick="window.selectDayFromDashboard('${d}')" class="py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition text-center shadow-xs">
              <i class="fa-solid fa-book-open"></i> 단어
            </button>
            <button onclick="window.startDayDirectQuiz('${d}', 'standard')" class="py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition text-center">
              <i class="fa-solid fa-play"></i> 4지
            </button>
            <button onclick="window.startDayDirectQuiz('${d}', 'cloze')" class="py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition text-center">
              <i class="fa-solid fa-pen"></i> 빈칸
            </button>
            <button onclick="window.startDayDirectQuiz('${d}', 'flashcard')" class="py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold transition text-center">
              <i class="fa-solid fa-clone"></i> 카드
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.selectDayFromDashboard = function(day) {
    activeDayFilter = day;
    renderDayFilters();
    renderWordList();
    closeModal('dayGridModal');
    if (day === 'ALL') {
      showToast('전체 단어 목록을 표시합니다.');
    } else {
      showToast(`[${day}] 단어 목록으로 이동했습니다.`);
    }
  };

  window.startDayDirectQuiz = function(day, type) {
    closeModal('dayGridModal');
    if (type === 'standard') {
      switchTab('quiz');
      startStandardQuiz(day);
    } else if (type === 'cloze') {
      switchTab('cloze-quiz');
      startClozeQuiz(day);
    } else if (type === 'flashcard') {
      switchTab('flashcard');
      startFlashcard(day);
    } else {
      switchTab('paraphrase-quiz');
      startParaphraseQuiz(day);
    }
  };

  function getFilteredAndSortedWords() {
    const query = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();

    let result = words.filter(w => {
      // Day 필터
      if (activeDayFilter !== 'ALL' && w.day !== activeDayFilter) {
        return false;
      }
      // 검색어 필터
      if (query) {
        const inWord = w.word.toLowerCase().includes(query);
        const inMeaning = w.meaning.toLowerCase().includes(query);
        const inPos = (w.partOfSpeech || '').toLowerCase().includes(query);
        const inPara = (w.paraphrase || []).some(p => p.toLowerCase().includes(query));
        const inDay = (w.day || '').toLowerCase().includes(query);
        if (!inWord && !inMeaning && !inPos && !inPara && !inDay) {
          return false;
        }
      }
      return true;
    });

    // 정렬
    if (currentSort === 'wrong-desc') {
      result.sort((a, b) => getWrongCount(b.id) - getWrongCount(a.id));
    } else if (currentSort === 'wrong-asc') {
      result.sort((a, b) => getWrongCount(a.id) - getWrongCount(b.id));
    } else if (currentSort === 'alphabet') {
      result.sort((a, b) => a.word.localeCompare(b.word));
    }

    return result;
  }

  function renderWordList() {
    const container = document.getElementById('wordList');
    const displayedCountEl = document.getElementById('displayedCount');
    if (!container) return;

    const filteredWords = getFilteredAndSortedWords();
    if (displayedCountEl) displayedCountEl.textContent = filteredWords.length;

    if (filteredWords.length === 0) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-2xl text-center border border-slate-200 text-slate-400 space-y-2">
          <i class="fa-solid fa-magnifying-glass text-3xl text-slate-300"></i>
          <p class="font-bold text-sm">해당 조건에 맞는 단어가 없습니다.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredWords.map(w => {
      const wrongCount = getWrongCount(w.id);
      const isChecked = selectedWordIds.has(w.id);
      const paraphrases = Array.isArray(w.paraphrase) ? w.paraphrase : [];

      return `
        <div class="word-card bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-3 cursor-pointer" data-id="${w.id}">
          
          <!-- 카드 상단 행: 체크박스 + Day + 번호 + 품사 + 오답 배지 -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 flex-wrap">
              <input type="checkbox" class="word-select-checkbox w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer" data-id="${w.id}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation()">
              <span class="px-2 py-0.5 rounded-full text-[11px] font-black bg-indigo-50 text-indigo-700">${w.day || 'Day 01'}</span>
              ${w.no ? `<span class="px-1.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">No.${w.no}</span>` : ''}
              <span class="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">${w.partOfSpeech || '품사'}</span>
            </div>

            <!-- 틀린 횟수 배지 -->
            <div class="flex items-center gap-1.5">
              ${wrongCount > 0 ? `
                <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1">
                  <i class="fa-solid fa-triangle-exclamation"></i> 오답 ${wrongCount}회
                </span>
              ` : `
                <span class="px-2 py-0.5 rounded-full text-[11px] font-medium text-slate-400 bg-slate-50">
                  미숙지 0회
                </span>
              `}
            </div>
          </div>

          <!-- 메인 단어 행: 영단어 + 발음기호 + 발음 버튼 + 한글 뜻 -->
          <div class="flex items-baseline justify-between gap-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xl font-black text-slate-900 tracking-tight">${w.word}</span>
              ${w.phonetic ? `<span class="text-xs text-slate-400 font-mono">${w.phonetic}</span>` : ''}
              <button class="tts-word-btn text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-indigo-50 transition" title="발음 듣기" data-word="${w.word}">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
            <div class="text-sm font-bold text-slate-700 text-right truncate">
              ${w.meaning}
            </div>
          </div>

          <!-- 유사품사어 & 패러프레이징 칩 -->
          <div class="space-y-1.5 pt-1 text-xs border-t border-slate-100">
            ${w.relatedForms ? `
              <div class="text-slate-500 truncate flex items-center gap-1">
                <span class="font-bold text-indigo-600 shrink-0"><i class="fa-solid fa-network-wired"></i> 파생:</span>
                <span>${w.relatedForms}</span>
              </div>
            ` : ''}

            ${paraphrases.length > 0 ? `
              <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span class="font-bold text-amber-600 shrink-0"><i class="fa-solid fa-shuffle"></i> 동의어:</span>
                ${paraphrases.map(p => {
                  const cleanP = (p || '').trim();
                  const found = words.find(item => item.word.toLowerCase() === cleanP.toLowerCase());
                  if (found) {
                    return `
                      <span class="tts-chip px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 font-bold cursor-pointer transition flex items-center gap-1 shadow-xs" data-registered-id="${found.id}" data-word="${cleanP}" title="'${found.word}' 상세정보 보기">
                        <i class="fa-solid fa-book-open text-[10px] text-amber-700"></i> ${cleanP}
                      </span>
                    `;
                  }
                  return `
                    <span class="tts-chip px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 hover:bg-amber-100 font-semibold cursor-pointer transition flex items-center gap-1" data-word="${cleanP}">
                      ${cleanP} <i class="fa-solid fa-volume-high text-[10px] text-amber-500"></i>
                    </span>
                  `;
                }).join('')}
              </div>
            ` : ''}
          </div>

          <!-- 예문 미리보기 (누르면 예문 발음) -->
          ${w.exampleEn ? `
            <div class="tts-sentence bg-slate-50 hover:bg-indigo-50/50 p-2.5 rounded-xl text-xs space-y-0.5 transition cursor-pointer border border-slate-100" data-sentence="${w.exampleEn}">
              <div class="text-slate-800 font-medium flex items-start justify-between gap-2">
                <span>"${w.exampleEn}"</span>
                <i class="fa-solid fa-volume-high text-slate-400 shrink-0 mt-0.5"></i>
              </div>
              ${w.exampleKo ? `<div class="text-slate-400 text-[11px]">${w.exampleKo}</div>` : ''}
            </div>
          ` : ''}

        </div>
      `;
    }).join('');

    // 이벤트 리스너 바인딩
    attachListEventListeners(container);
  }

  function attachListEventListeners(container) {
    // 카드 클릭 시 모달 상세 보기
    container.querySelectorAll('.word-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // 내부 발음 버튼이나 체크박스 클릭 시에는 모달 열리지 않음
        if (e.target.closest('.tts-word-btn') || e.target.closest('.tts-chip') || e.target.closest('.tts-sentence') || e.target.closest('.word-select-checkbox')) {
          return;
        }
        const id = card.dataset.id;
        openWordDetailModal(id);
      });
    });

    // 단어 발음 버튼
    container.querySelectorAll('.tts-word-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        speak(btn.dataset.word, e);
        btn.classList.add('playing-sound');
        setTimeout(() => btn.classList.remove('playing-sound'), 600);
      });
    });

    // 동의어(패러프레이징) 칩 클릭 (등록된 단어는 상세 팝업 오픈, 일반 단어는 발음)
    container.querySelectorAll('.tts-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        if (chip.dataset.registeredId) {
          openWordDetailModal(chip.dataset.registeredId, false);
        } else {
          speak(chip.dataset.word, e);
        }
      });
    });

    // 예문 문장 발음
    container.querySelectorAll('.tts-sentence').forEach(box => {
      box.addEventListener('click', (e) => {
        speak(box.dataset.sentence, e);
      });
    });

    // 체크박스 상태 변경
    container.querySelectorAll('.word-select-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = cb.dataset.id;
        if (cb.checked) {
          selectedWordIds.add(id);
        } else {
          selectedWordIds.delete(id);
        }
        updateSelectedCountUI();
      });
    });
  }

  function updateSelectedCountUI() {
    const countEl = document.getElementById('selectedCount');
    const startSelectedQuizBtn = document.getElementById('startSelectedQuizBtn');
    const startSelectedParaBtn = document.getElementById('startSelectedParaphraseBtn');
    const count = selectedWordIds.size;

    if (countEl) countEl.textContent = count;
    if (startSelectedQuizBtn) startSelectedQuizBtn.disabled = count === 0;
    if (startSelectedParaBtn) startSelectedParaBtn.disabled = count === 0;

    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const currentList = getFilteredAndSortedWords();
    if (selectAllCheckbox && currentList.length > 0) {
      selectAllCheckbox.checked = currentList.every(w => selectedWordIds.has(w.id));
    }
  }

  // --------------------------------------------------------------------------
  // 5. 단어 상세 정보 모달 (영단어 클릭 시 원터치 펼침 & 유의어 클릭 시 팝업 전환 및 뒤로가기 지원)
  // --------------------------------------------------------------------------
  let modalWordHistory = [];
  let currentDetailWordId = null;

  function openWordDetailModal(id, pushHistory = false) {
    const item = words.find(w => w.id === id);
    if (!item) return;

    if (pushHistory && currentDetailWordId && currentDetailWordId !== id) {
      modalWordHistory.push(currentDetailWordId);
    }
    currentDetailWordId = id;

    // 이전 단어 히스토리 버튼 표시 여부
    const backContainer = document.getElementById('modalBackWordContainer');
    const backNameEl = document.getElementById('modalBackWordName');
    if (modalWordHistory.length > 0) {
      const prevId = modalWordHistory[modalWordHistory.length - 1];
      const prevItem = words.find(w => w.id === prevId);
      if (prevItem && backContainer && backNameEl) {
        backNameEl.textContent = prevItem.word;
        backContainer.classList.remove('hidden');
      }
    } else if (backContainer) {
      backContainer.classList.add('hidden');
    }

    const backWordBtn = document.getElementById('modalBackWordBtn');
    if (backWordBtn) {
      backWordBtn.onclick = () => {
        if (modalWordHistory.length > 0) {
          const prevId = modalWordHistory.pop();
          openWordDetailModal(prevId, false);
        }
      };
    }

    document.getElementById('modalDayBadge').textContent = item.day || 'Day 01';
    const noBadge = document.getElementById('modalNoBadge');
    if (noBadge) {
      if (item.no) {
        noBadge.textContent = `No.${item.no}`;
        noBadge.classList.remove('hidden');
      } else {
        noBadge.classList.add('hidden');
      }
    }
    document.getElementById('modalPosBadge').textContent = item.partOfSpeech || '품사';
    
    const wrongCount = getWrongCount(item.id);
    document.getElementById('modalWrongCount').textContent = wrongCount;

    document.getElementById('modalWord').textContent = item.word;
    const modalPhonetic = document.getElementById('modalPhonetic');
    if (modalPhonetic) {
      modalPhonetic.textContent = item.phonetic || '';
    }
    document.getElementById('modalMeaning').textContent = item.meaning;

    // 발음 버튼
    const ttsBtn = document.getElementById('modalWordTtsBtn');
    ttsBtn.onclick = () => speak(item.word);

    // 파생어
    document.getElementById('modalRelatedForms').textContent = item.relatedForms || '등록된 유사 품사어가 없습니다.';

    // 패러프레이징 칩 (등록된 단어는 책 아이콘 + 상세정보 클릭 시 팝업 전환)
    const paraContainer = document.getElementById('modalParaphrase');
    const paraphrases = Array.isArray(item.paraphrase) ? item.paraphrase : [];
    if (paraphrases.length > 0) {
      paraContainer.innerHTML = paraphrases.map(p => {
        const cleanP = (p || '').trim();
        const found = words.find(w => w.word.toLowerCase() === cleanP.toLowerCase());
        if (found) {
          return `
            <div class="inline-flex items-center rounded-xl bg-amber-100 text-amber-950 border border-amber-300 shadow-xs hover:bg-amber-200 transition text-xs font-bold overflow-hidden">
              <button type="button" class="px-2.5 py-1.5 flex items-center gap-1.5 hover:text-amber-900" onclick="window.openWordDetailFromSynonym('${found.id}')" title="'${found.word}' 단어 상세정보 보기">
                <i class="fa-solid fa-book-open text-[11px] text-amber-700"></i>
                <span>${cleanP}</span>
                <span class="text-[10px] bg-amber-200 text-amber-800 px-1 py-0.2 rounded font-black">단어장 등록</span>
              </button>
              <button type="button" class="px-2 py-1.5 text-amber-600 hover:text-amber-950 hover:bg-amber-200 border-l border-amber-300 transition" onclick="window.speakText('${cleanP}')" title="발음 듣기">
                <i class="fa-solid fa-volume-high text-[11px]"></i>
              </button>
            </div>
          `;
        } else {
          return `
            <span class="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold cursor-pointer transition flex items-center gap-1.5 border border-amber-200/50" onclick="window.speakText('${cleanP}')" title="터치 시 발음 듣기">
              ${cleanP} <i class="fa-solid fa-volume-high text-[10px] text-amber-600"></i>
            </span>
          `;
        }
      }).join('');
    } else {
      paraContainer.innerHTML = '<span class="text-xs text-slate-400">등록된 동의어가 없습니다.</span>';
    }

    // 예문 & 해석
    const exampleEnEl = document.getElementById('modalExampleEn');
    const exampleKoEl = document.getElementById('modalExampleKo');
    const exampleTtsBtn = document.getElementById('modalExampleTtsBtn');

    if (item.exampleEn) {
      exampleEnEl.textContent = `"${item.exampleEn}"`;
      exampleEnEl.onclick = () => speak(item.exampleEn);
      exampleTtsBtn.onclick = () => speak(item.exampleEn);
      exampleKoEl.textContent = item.exampleKo || '';
    } else {
      exampleEnEl.textContent = '등록된 예문이 없습니다.';
      exampleKoEl.textContent = '';
      exampleEnEl.onclick = null;
      exampleTtsBtn.onclick = null;
    }

    // 메모 / 팁
    document.getElementById('modalMemo').textContent = item.memo || '등록된 추가 메모가 없습니다.';

    // 오답 리셋 버튼
    const resetWrongBtn = document.getElementById('modalResetWrongBtn');
    resetWrongBtn.onclick = () => {
      resetWordWrongCount(item.id);
      document.getElementById('modalWrongCount').textContent = 0;
      renderWordList();
      showToast(`'${item.word}' 오답 횟수가 초기화되었습니다.`);
    };

    // 단어 삭제 버튼
    const deleteBtn = document.getElementById('modalDeleteWordBtn');
    if (deleteBtn) {
      deleteBtn.onclick = () => {
        if (confirm(`'${item.word}' 단어를 단어장에서 완전히 삭제하시겠습니까?`)) {
          words = words.filter(w => w.id !== item.id);
          saveWords();
          resetWordWrongCount(item.id);
          closeModal('wordDetailModal');
          renderDayFilters();
          renderWordList();
          renderStats();
          showToast(`'${item.word}' 단어가 삭제되었습니다.`);
        }
      };
    }

    openModal('wordDetailModal');
  }

  window.openWordDetailFromSynonym = function(id) {
    openWordDetailModal(id, true);
  };

  window.speakText = function(text) {
    speak(text);
  };

  // --------------------------------------------------------------------------
  // 6. 퀴즈 엔진 (기본 4지선다 & 패러프레이징 퀴즈)
  // --------------------------------------------------------------------------
  function setupQuizScopeUI(type) {
    if (type === 'standard') {
      const dayListContainer = document.getElementById('dayQuizCardList');
      const specialContainer = document.getElementById('quizSpecialScopeContainer');
      const days = getAllDays();
      const wrongWordsCount = words.filter(w => getWrongCount(w.id) > 0).length;
      const selectedCount = selectedWordIds.size;

      if (dayListContainer) {
        dayListContainer.innerHTML = days.map(day => {
          const dayWords = words.filter(w => w.day === day);
          const wrongCount = dayWords.filter(w => getWrongCount(w.id) > 0).length;
          return `
            <div class="p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-black text-base sm:text-lg text-slate-900">${day}</span>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">${dayWords.length}단어</span>
                  ${wrongCount > 0 ? `
                    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                      오답 ${wrongCount}개
                    </span>
                  ` : `
                    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      완벽 마스터
                    </span>
                  `}
                </div>
                <div class="text-[11px] text-slate-500 mt-1">지텔프 실전 4지선다 출제 기준 (혼동 어휘 4지선다 매칭)</div>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button onclick="window.startStandardQuiz('${day}')" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
                  <i class="fa-solid fa-play text-[10px]"></i> 4지선다 풀기
                </button>
                <button onclick="window.startDayDirectQuiz('${day}', 'cloze')" class="px-2.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200 transition" title="실전 문장 빈칸 채우기">
                  <i class="fa-solid fa-pen-to-square text-[10px]"></i> 빈칸
                </button>
                <button onclick="window.startDayDirectQuiz('${day}', 'flashcard')" class="px-2.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-800 font-bold text-xs flex items-center gap-1 border border-amber-200 transition" title="플래시카드 암기">
                  <i class="fa-solid fa-clone text-[10px]"></i> 카드
                </button>
              </div>
            </div>
          `;
        }).join('');
      }

      if (specialContainer) {
        specialContainer.innerHTML = `
          <button class="p-3 rounded-2xl border text-left transition ${
            selectedCount > 0 ? 'border-indigo-400 bg-indigo-50 hover:bg-indigo-100 cursor-pointer' : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
          }" ${selectedCount > 0 ? `onclick="window.startStandardQuiz('selected')"` : 'disabled'}>
            <div class="text-xs font-black text-indigo-700 flex items-center gap-1">
              <i class="fa-solid fa-check"></i> 선택한 단어
            </div>
            <div class="text-[11px] text-slate-500">${selectedCount}개 선택됨</div>
          </button>

          <button class="p-3 rounded-2xl border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-left transition cursor-pointer" onclick="window.startStandardQuiz('all')">
            <div class="text-xs font-black text-slate-800 flex items-center gap-1">
              <i class="fa-solid fa-layer-group text-indigo-500"></i> 전체 단어
            </div>
            <div class="text-[11px] text-slate-500">총 ${words.length}단어 풀기</div>
          </button>

          <button class="p-3 rounded-2xl border text-left transition ${
            wrongWordsCount > 0 ? 'border-rose-300 bg-rose-50 hover:bg-rose-100 cursor-pointer' : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
          }" ${wrongWordsCount > 0 ? `onclick="window.startStandardQuiz('wrong')"` : 'disabled'}>
            <div class="text-xs font-black text-rose-700 flex items-center gap-1">
              <i class="fa-solid fa-triangle-exclamation"></i> 오답 집중 퀴즈
            </div>
            <div class="text-[11px] text-rose-500">${wrongWordsCount}개 단어 풀기</div>
          </button>
        `;
      }
      return;
    }

    const containerId = 'paraScopeContainer';
    const container = document.getElementById(containerId);
    if (!container) return;

    const days = getAllDays();
    const wrongWordsCount = words.filter(w => getWrongCount(w.id) > 0).length;
    const selectedCount = selectedWordIds.size;

    let html = `
      <button class="scope-btn p-3 rounded-2xl border text-left transition ${
        selectedCount > 0 ? 'border-rose-400 bg-rose-50/70 hover:bg-rose-100' : 'border-slate-200 hover:bg-slate-50'
      }" data-scope="selected" ${selectedCount === 0 ? 'disabled style="opacity:0.5"' : ''}>
        <div class="text-xs font-black text-rose-700">내가 선택한 단어</div>
        <div class="text-[11px] text-slate-500">${selectedCount}개 선택됨</div>
      </button>

      <button class="scope-btn p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left transition" data-scope="all">
        <div class="text-xs font-black text-slate-800">전체 단어</div>
        <div class="text-[11px] text-slate-500">총 ${words.length}단어</div>
      </button>

      <button class="scope-btn p-3 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 text-left transition" data-scope="wrong" ${wrongWordsCount === 0 ? 'disabled style="opacity:0.5"' : ''}>
        <div class="text-xs font-black text-rose-700">오답 집중 퀴즈</div>
        <div class="text-[11px] text-rose-500">${wrongWordsCount}개 단어</div>
      </button>
    `;

    days.forEach(day => {
      const count = words.filter(w => w.day === day).length;
      html += `
        <button class="scope-btn p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left transition" data-scope="${day}">
          <div class="text-xs font-black text-slate-800">${day} 전용</div>
          <div class="text-[11px] text-slate-500">${count}개 단어</div>
        </button>
      `;
    });

    container.innerHTML = html;

    let defaultBtn = container.querySelector('[data-scope="selected"]:not([disabled])') 
                  || container.querySelector('[data-scope="Day 01"]') 
                  || container.querySelector('[data-scope="all"]');
    
    if (defaultBtn) {
      selectScopeBtn(container, defaultBtn);
    }

    container.querySelectorAll('.scope-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectScopeBtn(container, btn);
      });
    });
  }

  function selectScopeBtn(container, targetBtn) {
    container.querySelectorAll('.scope-btn').forEach(btn => {
      btn.classList.remove('ring-2', 'ring-indigo-600', 'bg-indigo-50');
    });
    targetBtn.classList.add('ring-2', 'ring-indigo-600', 'bg-indigo-50');
    targetBtn.dataset.active = "true";
  }

  function getSelectedScope(type) {
    if (type === 'flashcard') {
      const activeBtn = document.querySelector('#flashcardScopeContainer .fc-scope-btn.ring-2');
      return activeBtn ? activeBtn.dataset.scope : 'Day 01';
    }
    if (type === 'cloze') {
      const activeBtn = document.querySelector('#clozeScopeContainer .cloze-scope-btn.ring-2');
      return activeBtn ? activeBtn.dataset.scope : 'Day 01';
    }
    const containerId = type === 'standard' ? 'quizScopeContainer' : 'paraScopeContainer';
    const activeBtn = document.querySelector(`#${containerId} .scope-btn.ring-2`);
    return activeBtn ? activeBtn.dataset.scope : 'Day 01';
  }

  function getWordPoolForScope(scope) {
    if (scope === 'selected') {
      return words.filter(w => selectedWordIds.has(w.id));
    }
    if (scope === 'wrong') {
      return words.filter(w => getWrongCount(w.id) > 0);
    }
    if (scope === 'all') {
      return [...words];
    }
    // 특정 Day
    return words.filter(w => w.day === scope);
  }

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 타임어택 관리
  let quizTimerId = null;
  let quizTimerRemain = 10;
  let isStandardTimeAttack = false;
  let isClozeTimeAttack = false;

  function startQuizTimer(seconds, onTimeout, timerBadgeId, timerSecId) {
    clearQuizTimer();
    quizTimerRemain = seconds;
    const badge = document.getElementById(timerBadgeId);
    const secEl = document.getElementById(timerSecId);
    if (badge) badge.classList.remove('hidden');
    if (secEl) secEl.textContent = quizTimerRemain;

    quizTimerId = setInterval(() => {
      quizTimerRemain--;
      if (secEl) secEl.textContent = quizTimerRemain;
      if (quizTimerRemain <= 3 && badge) {
        badge.classList.add('timer-pulse');
      }
      if (quizTimerRemain <= 0) {
        clearQuizTimer();
        onTimeout();
      }
    }, 1000);
  }

  function clearQuizTimer() {
    if (quizTimerId) {
      clearInterval(quizTimerId);
      quizTimerId = null;
    }
    document.getElementById('quizTimerBadge')?.classList.add('hidden');
    document.getElementById('clozeTimerBadge')?.classList.add('hidden');
    document.querySelectorAll('[id$="TimerBadge"]').forEach(b => b.classList.remove('timer-pulse'));
  }

  // --- [6-A. 기본 4지선다 퀴즈] ---
  function startStandardQuiz(scope) {
    let pool = getWordPoolForScope(scope);
    if (pool.length === 0) {
      alert('출제할 단어가 없습니다. 범위를 다시 선택해주세요.');
      return;
    }

    isStandardTimeAttack = localStorage.getItem('gtelp_timeattack_enabled') === 'true';

    // 셔플된 문제 리스트
    activeQuiz = {
      type: 'standard',
      currentScope: scope,
      scopeLabel: scope === 'selected' ? '선택 단어' : (scope === 'wrong' ? '오답 집중' : (scope === 'all' ? '전체 단어' : `${scope} 문제풀이`)),
      questionList: shuffle(pool),
      currentIndex: 0,
      score: 0,
      correctCount: 0,
      wrongList: [],
      answered: false,
      userAnswers: {}
    };

    document.getElementById('quizSetupCard').classList.add('hidden');
    document.getElementById('quizResultCard').classList.add('hidden');
    document.getElementById('quizActiveCard').classList.remove('hidden');

    renderCurrentStandardQuestion();
  }

  function renderCurrentStandardQuestion() {
    clearQuizTimer();
    const q = activeQuiz.questionList[activeQuiz.currentIndex];

    // 상단 진행 상태
    document.getElementById('quizBadgeScope').textContent = activeQuiz.scopeLabel;
    document.getElementById('quizCurrentIndex').textContent = activeQuiz.currentIndex + 1;
    document.getElementById('quizTotalIndex').textContent = activeQuiz.questionList.length;
    document.getElementById('quizScore').textContent = activeQuiz.score;

    const progress = ((activeQuiz.currentIndex) / activeQuiz.questionList.length) * 100;
    document.getElementById('quizProgressBar').style.width = `${progress}%`;

    // 상단 뒤로가기 버튼 라벨 및 툴팁
    const topBackBtn = document.getElementById('btnQuizBack');
    if (topBackBtn) {
      if (activeQuiz.currentIndex === 0) {
        topBackBtn.innerHTML = '<i class="fa-solid fa-chevron-left text-[11px]"></i> 목록';
        topBackBtn.title = '퀴즈 범위 목록으로';
      } else {
        topBackBtn.innerHTML = '<i class="fa-solid fa-chevron-left text-[11px]"></i> 이전';
        topBackBtn.title = '이전 문제로 이동';
      }
    }

    // 문제 표시
    document.getElementById('quizQuestionMeaning').textContent = q.meaning;
    document.getElementById('quizQuestionPartOfSpeech').textContent = q.partOfSpeech || '품사';

    // 이미 풀었던 문제인지 확인
    const prevAns = activeQuiz.userAnswers && activeQuiz.userAnswers[activeQuiz.currentIndex];

    let options = [];
    if (prevAns) {
      options = prevAns.options;
      activeQuiz.answered = true;
    } else {
      activeQuiz.answered = false;
      if (q.options && q.options.length === 4) {
        options = shuffle(q.options);
      } else {
        options = generateGtelpSmartDistractors(q, words);
      }
    }

    // 보기 렌더링
    const optionsContainer = document.getElementById('quizOptionsContainer');
    optionsContainer.innerHTML = options.map((opt, i) => {
      const label = String.fromCharCode(65 + i); // A, B, C, D
      let btnClass = 'quiz-opt-btn w-full p-3.5 rounded-2xl border-2 font-bold transition flex items-center justify-between group ';
      let badgeClass = 'w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition ';

      if (prevAns) {
        if (opt.word === q.word) {
          btnClass += 'border-emerald-500 bg-emerald-50 text-emerald-900';
          badgeClass += 'bg-emerald-600 text-white';
        } else if (opt.word === prevAns.selectedWord && !prevAns.isCorrect) {
          btnClass += 'border-rose-500 bg-rose-50 text-rose-900';
          badgeClass += 'bg-rose-600 text-white';
        } else {
          btnClass += 'border-slate-200 bg-slate-50/60 text-slate-400 opacity-60';
          badgeClass += 'bg-slate-200 text-slate-400';
        }
      } else {
        btnClass += 'border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/40 text-left';
        badgeClass += 'bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-500';
      }

      return `
        <button class="${btnClass}" data-word="${opt.word}" ${prevAns ? 'disabled' : ''}>
          <div class="flex items-center gap-3">
            <span class="${badgeClass}">
              ${label}
            </span>
            <span class="text-base text-slate-900">${opt.word}</span>
          </div>
          <!-- 보기 발음 듣기 아이콘 -->
          <span class="tts-quiz-opt p-1.5 text-slate-300 hover:text-indigo-600 transition" title="발음 듣기" data-word="${opt.word}">
            <i class="fa-solid fa-volume-high"></i>
          </span>
        </button>
      `;
    }).join('');

    // 보기 발음 클릭 이벤트
    optionsContainer.querySelectorAll('.tts-quiz-opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        speak(btn.dataset.word, e);
      });
    });

    if (prevAns) {
      showQuizExplanation(prevAns.isCorrect, q, prevAns.options, prevAns.isTimeout);
    } else {
      // 해설창 숨김
      document.getElementById('quizExplanationBox').classList.add('hidden');

      // 10초 타임어택 가동
      if (isStandardTimeAttack) {
        startQuizTimer(10, () => {
          if (!activeQuiz.answered) {
            handleStandardAnswer(null, q, options, true); // 시간 초과
          }
        }, 'quizTimerBadge', 'quizTimerSeconds');
      }

      // 보기 선택 이벤트
      optionsContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (activeQuiz.answered) return;
          if (e.target.closest('.tts-quiz-opt')) return;
          handleStandardAnswer(btn.dataset.word, q, options);
        });
      });
    }
  }

  function handleStandardAnswer(selectedWord, q, options, isTimeout = false) {
    clearQuizTimer();
    activeQuiz.answered = true;
    const isCorrect = !isTimeout && (selectedWord === q.word);

    // 모든 보기 비활성화 및 색상 표시
    const buttons = document.querySelectorAll('#quizOptionsContainer .quiz-opt-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      const word = btn.dataset.word;
      if (word === q.word) {
        // 정답 버튼 초록색
        btn.classList.remove('border-slate-200', 'bg-white');
        btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-900');
        const badge = btn.querySelector('span:first-child');
        badge.classList.remove('bg-slate-100', 'text-slate-500');
        badge.classList.add('bg-emerald-600', 'text-white');
      } else if (word === selectedWord && !isCorrect) {
        // 선택한 오답 버튼 빨간색
        btn.classList.remove('border-slate-200', 'bg-white');
        btn.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-900');
        const badge = btn.querySelector('span:first-child');
        badge.classList.remove('bg-slate-100', 'text-slate-500');
        badge.classList.add('bg-rose-600', 'text-white');
      }
    });

    if (!activeQuiz.userAnswers) activeQuiz.userAnswers = {};
    const alreadyRecorded = !!activeQuiz.userAnswers[activeQuiz.currentIndex];
    activeQuiz.userAnswers[activeQuiz.currentIndex] = { selectedWord, options, isTimeout, isCorrect };

    if (!alreadyRecorded) {
      if (isCorrect) {
        activeQuiz.score += 10;
        activeQuiz.correctCount += 1;
        document.getElementById('quizScore').textContent = activeQuiz.score;
      } else {
        activeQuiz.wrongList.push(q);
        addWrongCount(q.id); // 오답 횟수 자동 누적!
      }
    }

    // 정답 발음 즉시 재생
    speak(q.word);

    // 상세 해설창 (Instant Review Box) 표시
    showQuizExplanation(isCorrect, q, options, isTimeout);
  }

  function showQuizExplanation(isCorrect, q, options, isTimeout = false) {
    const box = document.getElementById('quizExplanationBox');
    const statusEl = document.getElementById('quizFeedbackStatus');
    box.classList.remove('hidden');

    if (isCorrect) {
      box.className = 'p-4 rounded-2xl border space-y-3 bg-emerald-50/60 border-emerald-200 fade-in';
      statusEl.innerHTML = '<span class="text-emerald-600"><i class="fa-solid fa-circle-check text-lg"></i> 정답입니다! 훌륭해요!</span>';
    } else if (isTimeout) {
      box.className = 'p-4 rounded-2xl border space-y-3 bg-rose-50/60 border-rose-200 fade-in';
      statusEl.innerHTML = `<span class="text-rose-600"><i class="fa-solid fa-stopwatch text-lg"></i> ⏱️ 10초 시간 초과! 정답은 <strong>"${q.word}"</strong>입니다.</span>`;
    } else {
      box.className = 'p-4 rounded-2xl border space-y-3 bg-rose-50/60 border-rose-200 fade-in';
      statusEl.innerHTML = `<span class="text-rose-600"><i class="fa-solid fa-circle-xmark text-lg"></i> 아쉽네요! 정답은 <strong>"${q.word}"</strong>입니다.</span>`;
    }

    // 정답 발음 버튼
    document.getElementById('quizTtsTargetWordBtn').onclick = () => speak(q.word);

    // 예문 영역
    const exEn = document.getElementById('quizExampleEn');
    const exKo = document.getElementById('quizExampleKo');
    if (q.exampleEn) {
      exEn.innerHTML = `<span class="underline">${q.exampleEn}</span>`;
      exEn.onclick = () => speak(q.exampleEn);
      exKo.textContent = q.exampleKo || '';
    } else {
      exEn.textContent = '등록된 예문이 없습니다.';
      exKo.textContent = '';
      exEn.onclick = null;
    }

    // 보기 4단어 뜻풀이 리스트 (단어장에 등록된 단어는 상세정보 팝업 지원)
    const reviewList = document.getElementById('quizReviewOptionsList');
    reviewList.innerHTML = options.map(opt => {
      const isTarget = opt.word === q.word;
      const registeredItem = words.find(w => w.word.toLowerCase() === opt.word.toLowerCase());

      return `
        <div class="flex items-center justify-between p-2.5 rounded-xl ${
          isTarget ? 'bg-emerald-100/70 border-emerald-200 text-emerald-950 font-bold' : 'bg-white border-slate-200 text-slate-700'
        } border shadow-xs hover:border-indigo-300 transition gap-2">
          
          <!-- 단어 및 뜻 (터치 시 발음 듣기) -->
          <div class="flex items-center gap-2 flex-1 min-w-0 cursor-pointer" onclick="window.speakText('${opt.word}')">
            <button type="button" class="text-indigo-600 hover:text-indigo-800 p-1" title="발음 듣기">
              <i class="fa-solid fa-volume-high text-xs"></i>
            </button>
            <span class="font-black text-slate-900 tracking-tight shrink-0">${opt.word}</span>
            <span class="text-slate-600 text-xs truncate">: ${opt.def}</span>
          </div>

          <!-- 상태 및 상세 팝업 버튼 -->
          <div class="flex items-center gap-1.5 shrink-0">
            ${isTarget ? '<span class="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-black">정답</span>' : ''}
            
            ${registeredItem ? `
              <button type="button" onclick="window.openQuizOptionDetail('${registeredItem.id}', '${opt.word}')" class="px-2 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold text-[11px] flex items-center gap-1 transition shadow-xs border border-indigo-200" title="단어장에 등록된 단어의 예문/파생어/상세보기">
                <i class="fa-solid fa-book-open text-[10px]"></i> 상세
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // 출제 팁
    const tipSection = document.getElementById('quizTipSection');
    const tipText = document.getElementById('quizTipText');
    if (q.memo) {
      tipSection.classList.remove('hidden');
      tipText.textContent = q.memo;
    } else {
      tipSection.classList.add('hidden');
    }

    // 이전 문제 버튼
    const prevBtn = document.getElementById('btnPrevQuizQuestion');
    if (prevBtn) {
      if (activeQuiz.currentIndex === 0) {
        prevBtn.disabled = true;
        prevBtn.classList.add('opacity-40', 'cursor-not-allowed');
      } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove('opacity-40', 'cursor-not-allowed');
      }
      prevBtn.onclick = () => {
        clearQuizTimer();
        if (activeQuiz.currentIndex > 0) {
          activeQuiz.currentIndex--;
          renderCurrentStandardQuestion();
        }
      };
    }

    // 다음 문제 버튼
    const nextBtn = document.getElementById('btnNextQuizQuestion');
    const nextBtnText = document.getElementById('btnNextQuizQuestionText');
    if (nextBtnText) {
      if (activeQuiz.currentIndex === activeQuiz.questionList.length - 1) {
        nextBtnText.textContent = '결과 보기 (완료)';
      } else {
        nextBtnText.textContent = '다음 문제로 넘어가기';
      }
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        clearQuizTimer();
        activeQuiz.currentIndex++;
        if (activeQuiz.currentIndex < activeQuiz.questionList.length) {
          renderCurrentStandardQuestion();
        } else {
          finishQuiz();
        }
      };
    }
  }

  function finishQuiz() {
    document.getElementById('quizActiveCard').classList.add('hidden');
    document.getElementById('quizResultCard').classList.remove('hidden');

    const total = activeQuiz.questionList.length;
    const correct = activeQuiz.correctCount;
    const wrong = activeQuiz.wrongList.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    document.getElementById('resultCorrectCount').textContent = correct;
    document.getElementById('resultWrongCount').textContent = wrong;
    document.getElementById('resultAccuracy').textContent = accuracy;

    // 틀린 단어 목록
    const wrongListContainer = document.getElementById('resultWrongList');
    const retryWrongBtn = document.getElementById('btnRetryWrongQuiz');

    if (wrong > 0) {
      wrongListContainer.innerHTML = activeQuiz.wrongList.map(w => `
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-xs">
          <div class="flex items-center gap-2">
            <span class="font-black text-rose-900">${w.word}</span>
            <span class="text-slate-600">: ${w.meaning}</span>
          </div>
          <button class="text-rose-600 hover:text-rose-800 p-1" onclick="window.speakText('${w.word}')">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      `).join('');
      retryWrongBtn.classList.remove('hidden');
      retryWrongBtn.onclick = () => {
        activeQuiz.questionList = shuffle([...activeQuiz.wrongList]);
        activeQuiz.currentIndex = 0;
        activeQuiz.score = 0;
        activeQuiz.correctCount = 0;
        activeQuiz.wrongList = [];
        activeQuiz.userAnswers = {};
        activeQuiz.scopeLabel = '틀린 단어 재도전';
        document.getElementById('quizResultCard').classList.add('hidden');
        document.getElementById('quizActiveCard').classList.remove('hidden');
        renderCurrentStandardQuestion();
      };
    } else {
      wrongListContainer.innerHTML = '<div class="text-xs text-emerald-600 font-bold p-3 bg-emerald-50 rounded-xl text-center">🎉 모두 맞히셨습니다! 완벽해요!</div>';
      retryWrongBtn.classList.add('hidden');
    }

    // 다음 Day 퀴즈 버튼 연결
    const nextDayBtn = document.getElementById('btnNextDayQuiz');
    const nextDayText = document.getElementById('btnNextDayQuizText');
    if (nextDayBtn) {
      const days = getAllDays();
      const curIdx = days.indexOf(activeQuiz.currentScope);
      if (curIdx !== -1 && curIdx < days.length - 1) {
        const nextDay = days[curIdx + 1];
        nextDayBtn.classList.remove('hidden');
        if (nextDayText) nextDayText.textContent = `다음 ${nextDay} 풀기`;
        nextDayBtn.onclick = () => {
          startStandardQuiz(nextDay);
        };
      } else {
        nextDayBtn.classList.add('hidden');
      }
    }

    renderWordList(); // 오답 카운트 변경 반영
  }

  // --- [6-B. 패러프레이징 (동의어) 전용 퀴즈] ---
  function startParaphraseQuiz(scope) {
    let pool = getWordPoolForScope(scope).filter(w => Array.isArray(w.paraphrase) && w.paraphrase.length > 0);
    if (pool.length === 0) {
      alert('패러프레이징(동의어) 데이터가 있는 단어가 없습니다. 다른 범위를 선택해주세요.');
      return;
    }

    activeQuiz = {
      type: 'paraphrase',
      scopeLabel: scope === 'selected' ? '선택 단어' : (scope === 'wrong' ? '오답 집중' : (scope === 'all' ? '전체 단어' : scope)),
      questionList: shuffle(pool),
      currentIndex: 0,
      score: 0,
      correctCount: 0,
      wrongList: [],
      answered: false,
      userAnswers: {}
    };

    document.getElementById('paraSetupCard').classList.add('hidden');
    document.getElementById('paraActiveCard').classList.remove('hidden');

    renderCurrentParaQuestion();
  }

  function renderCurrentParaQuestion() {
    const q = activeQuiz.questionList[activeQuiz.currentIndex];

    document.getElementById('paraBadgeScope').textContent = activeQuiz.scopeLabel;
    document.getElementById('paraCurrentIndex').textContent = activeQuiz.currentIndex + 1;
    document.getElementById('paraTotalIndex').textContent = activeQuiz.questionList.length;
    document.getElementById('paraScore').textContent = activeQuiz.score;

    const progress = ((activeQuiz.currentIndex) / activeQuiz.questionList.length) * 100;
    document.getElementById('paraProgressBar').style.width = `${progress}%`;

    // 상단 뒤로가기 버튼 라벨
    const topBackBtn = document.getElementById('btnParaBack');
    if (topBackBtn) {
      if (activeQuiz.currentIndex === 0) {
        topBackBtn.innerHTML = '<i class="fa-solid fa-chevron-left text-[11px]"></i> 목록';
        topBackBtn.title = '패러프레이징 퀴즈 범위 목록으로';
      } else {
        topBackBtn.innerHTML = '<i class="fa-solid fa-chevron-left text-[11px]"></i> 이전';
        topBackBtn.title = '이전 문제로 이동';
      }
    }

    // 문제 단어 & 발음
    document.getElementById('paraQuestionWord').textContent = q.word;
    document.getElementById('paraQuestionMeaning').textContent = `뜻: ${q.meaning}`;
    document.getElementById('paraTtsQuestionBtn').onclick = () => speak(q.word);

    // 이전 답변 확인
    const prevAns = activeQuiz.userAnswers && activeQuiz.userAnswers[activeQuiz.currentIndex];

    let options = [];
    let correctAnswer = '';

    if (prevAns) {
      options = prevAns.options;
      correctAnswer = prevAns.correct;
      activeQuiz.answered = true;
    } else {
      activeQuiz.answered = false;
      // 문제 단어 발음 자동 1회 재생
      speak(q.word);

      // 정답 동의어 하나 선택
      correctAnswer = q.paraphrase[Math.floor(Math.random() * q.paraphrase.length)];

      // 오답용 풀: 다른 단어들의 동의어들 또는 다른 단어들
      let distractorPool = [];
      words.forEach(w => {
        if (w.word !== q.word) {
          if (Array.isArray(w.paraphrase)) {
            distractorPool.push(...w.paraphrase);
          }
          distractorPool.push(w.word);
        }
      });
      distractorPool = Array.from(new Set(distractorPool)).filter(d => !q.paraphrase.includes(d) && d !== q.word);

      const wrongOptions = shuffle(distractorPool).slice(0, 3);
      options = shuffle([correctAnswer, ...wrongOptions]);
    }

    const optionsContainer = document.getElementById('paraOptionsContainer');
    optionsContainer.innerHTML = options.map((opt, i) => {
      const label = String.fromCharCode(65 + i);
      let btnClass = 'para-opt-btn w-full p-3.5 rounded-2xl border-2 font-bold transition flex items-center justify-between group ';
      let badgeClass = 'w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition ';

      if (prevAns) {
        if (opt === prevAns.correct) {
          btnClass += 'border-emerald-500 bg-emerald-50 text-emerald-900';
          badgeClass += 'bg-emerald-600 text-white';
        } else if (opt === prevAns.selected && !prevAns.isCorrect) {
          btnClass += 'border-rose-500 bg-rose-50 text-rose-900';
          badgeClass += 'bg-rose-600 text-white';
        } else {
          btnClass += 'border-slate-200 bg-slate-50/60 text-slate-400 opacity-60';
          badgeClass += 'bg-slate-200 text-slate-400';
        }
      } else {
        btnClass += 'border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/40 text-left';
        badgeClass += 'bg-slate-100 group-hover:bg-amber-600 group-hover:text-white text-slate-500';
      }

      return `
        <button class="${btnClass}" data-word="${opt}" ${prevAns ? 'disabled' : ''}>
          <div class="flex items-center gap-3">
            <span class="${badgeClass}">
              ${label}
            </span>
            <span class="text-base text-slate-900">${opt}</span>
          </div>
          <span class="tts-para-opt p-1.5 text-slate-300 hover:text-amber-600 transition" title="발음" data-word="${opt}">
            <i class="fa-solid fa-volume-high"></i>
          </span>
        </button>
      `;
    }).join('');

    // 이벤트 리스너
    optionsContainer.querySelectorAll('.tts-para-opt').forEach(btn => {
      btn.addEventListener('click', (e) => speak(btn.dataset.word, e));
    });

    if (prevAns) {
      showParaExplanation(prevAns.isCorrect, prevAns.correct, q);
    } else {
      // 해설창 숨김
      document.getElementById('paraExplanationBox').classList.add('hidden');

      optionsContainer.querySelectorAll('.para-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (activeQuiz.answered) return;
          if (e.target.closest('.tts-para-opt')) return;
          handleParaAnswer(btn.dataset.word, correctAnswer, options, q);
        });
      });
    }
  }

  function handleParaAnswer(selected, correct, options, q) {
    activeQuiz.answered = true;
    const isCorrect = selected === correct;

    const buttons = document.querySelectorAll('#paraOptionsContainer .para-opt-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      const w = btn.dataset.word;
      if (w === correct) {
        btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-900');
      } else if (w === selected && !isCorrect) {
        btn.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-900');
      }
    });

    if (!activeQuiz.userAnswers) activeQuiz.userAnswers = {};
    const alreadyRecorded = !!activeQuiz.userAnswers[activeQuiz.currentIndex];
    activeQuiz.userAnswers[activeQuiz.currentIndex] = { selected, correct, options, isCorrect };

    if (!alreadyRecorded) {
      if (isCorrect) {
        activeQuiz.score += 10;
        activeQuiz.correctCount++;
        document.getElementById('paraScore').textContent = activeQuiz.score;
      } else {
        activeQuiz.wrongList.push(q);
        addWrongCount(q.id);
      }
    }

    // 정답 동의어 발음
    speak(correct);

    // 해설 표시
    showParaExplanation(isCorrect, correct, q);
  }

  function showParaExplanation(isCorrect, correct, q) {
    const box = document.getElementById('paraExplanationBox');
    const statusEl = document.getElementById('paraFeedbackStatus');
    box.classList.remove('hidden');

    if (isCorrect) {
      box.className = 'p-4 rounded-2xl border space-y-3 bg-emerald-50/70 border-emerald-200 fade-in';
      statusEl.innerHTML = `<span class="text-emerald-700 font-bold"><i class="fa-solid fa-circle-check"></i> 정답입니다! "${q.word}" ≒ "${correct}"</span>`;
    } else {
      box.className = 'p-4 rounded-2xl border space-y-3 bg-rose-50/70 border-rose-200 fade-in';
      statusEl.innerHTML = `<span class="text-rose-700 font-bold"><i class="fa-solid fa-circle-xmark"></i> 오답! "${q.word}"의 올바른 동의어는 "${correct}"입니다.</span>`;
    }

    // 전체 동의어 목록 (등록된 단어는 책 아이콘 및 상세정보 열기 지원)
    const synList = document.getElementById('paraAllSynonyms');
    synList.innerHTML = q.paraphrase.map(p => {
      const cleanP = (p || '').trim();
      const found = words.find(w => w.word.toLowerCase() === cleanP.toLowerCase());
      if (found) {
        return `
          <button type="button" class="px-2 py-1 rounded-lg bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300 hover:bg-amber-200 flex items-center gap-1 shadow-xs transition" onclick="window.openQuizOptionDetail('${found.id}', '${cleanP}')" title="단어 상세정보 보기">
            <i class="fa-solid fa-book-open text-[10px] text-amber-700"></i> ${cleanP}
          </button>
        `;
      }
      return `
        <span class="px-2 py-1 rounded-lg bg-amber-50 text-amber-900 font-bold text-xs cursor-pointer hover:bg-amber-100 flex items-center gap-1 border border-amber-200/60" onclick="window.speakText('${cleanP}')" title="발음 듣기">
          ${cleanP} <i class="fa-solid fa-volume-high text-[9px] text-amber-600"></i>
        </span>
      `;
    }).join('');

    // 이전 문제 버튼
    const prevBtn = document.getElementById('btnPrevParaQuestion');
    if (prevBtn) {
      if (activeQuiz.currentIndex === 0) {
        prevBtn.disabled = true;
        prevBtn.classList.add('opacity-40', 'cursor-not-allowed');
      } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove('opacity-40', 'cursor-not-allowed');
      }
      prevBtn.onclick = () => {
        if (activeQuiz.currentIndex > 0) {
          activeQuiz.currentIndex--;
          renderCurrentParaQuestion();
        }
      };
    }

    // 다음 문제 버튼
    const nextBtn = document.getElementById('btnNextParaQuestion');
    const nextBtnText = document.getElementById('btnNextParaQuestionText');
    if (nextBtnText) {
      if (activeQuiz.currentIndex === activeQuiz.questionList.length - 1) {
        nextBtnText.textContent = '퀴즈 완료 (종료)';
      } else {
        nextBtnText.textContent = '다음 문제로';
      }
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        activeQuiz.currentIndex++;
        if (activeQuiz.currentIndex < activeQuiz.questionList.length) {
          renderCurrentParaQuestion();
        } else {
          alert(`패러프레이징 퀴즈 완료! 맞힌 문제: ${activeQuiz.correctCount} / ${activeQuiz.questionList.length}`);
          document.getElementById('paraActiveCard').classList.add('hidden');
          document.getElementById('paraSetupCard').classList.remove('hidden');
        }
      };
    }
  }

  window.openQuizOptionDetail = function(id, word) {
    if (word) speak(word);
    openWordDetailModal(id);
  };

  // --------------------------------------------------------------------------
  // 7. 오답 통계 뷰
  // --------------------------------------------------------------------------
  function renderStats() {
    const listEl = document.getElementById('statsWrongWordsList');
    const totalCountEl = document.getElementById('statsTotalWrongWords');
    if (!listEl) return;

    const wrongWords = words
      .map(w => ({ ...w, count: getWrongCount(w.id) }))
      .filter(w => w.count > 0)
      .sort((a, b) => b.count - a.count);

    if (totalCountEl) totalCountEl.textContent = wrongWords.length;

    if (wrongWords.length === 0) {
      listEl.innerHTML = `
        <div class="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
          <i class="fa-solid fa-circle-check text-emerald-500 text-3xl mb-2"></i>
          <p class="font-bold text-xs text-slate-600">현재 틀린 단어가 없습니다! 아주 훌륭합니다.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = wrongWords.map(w => `
      <div class="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-indigo-50/50 transition cursor-pointer" onclick="window.openWordDetail('${w.id}')">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-700">
            오답 ${w.count}회
          </span>
          <div>
            <div class="font-black text-slate-900 text-sm flex items-center gap-2">
              ${w.word}
              <button class="text-indigo-600 hover:text-indigo-800 p-0.5" onclick="event.stopPropagation(); window.speakText('${w.word}')">
                <i class="fa-solid fa-volume-high text-xs"></i>
              </button>
            </div>
            <div class="text-xs text-slate-500">${w.meaning} (${w.day || 'Day 01'})</div>
          </div>
        </div>
        <button class="text-xs text-slate-400 hover:text-rose-600 font-bold p-2" onclick="event.stopPropagation(); window.resetWordStats('${w.id}')" title="오답 기록 초기화">
          <i class="fa-solid fa-rotate-left"></i>
        </button>
      </div>
    `).join('');
  }

  window.openWordDetail = function(id) {
    openWordDetailModal(id);
  };

  window.resetWordStats = function(id) {
    resetWordWrongCount(id);
    renderStats();
    renderWordList();
    showToast('오답 기록이 초기화되었습니다.');
  };

  // --------------------------------------------------------------------------
  // 8. 기타 UI 이벤트 바인딩
  // --------------------------------------------------------------------------
  function initUI() {
    initAddWordUI();
    initBatchImportUI();

    // Day 이전/다음 퀵 점프 버튼
    document.getElementById('btnPrevDay')?.addEventListener('click', () => goToAdjacentDay(-1));
    document.getElementById('btnNextDay')?.addEventListener('click', () => goToAdjacentDay(1));
    
    // Day 목차 모달 열기
    document.getElementById('btnOpenDayGridModal')?.addEventListener('click', () => {
      renderDayGridDashboard();
      openModal('dayGridModal');
    });

    // 탭 클릭
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // 검색
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    searchInput?.addEventListener('input', () => {
      clearSearchBtn.classList.toggle('hidden', !searchInput.value);
      renderWordList();
    });
    clearSearchBtn?.addEventListener('click', () => {
      searchInput.value = '';
      clearSearchBtn.classList.add('hidden');
      renderWordList();
    });

    // 정렬 셀렉트
    const sortSelect = document.getElementById('sortSelect');
    sortSelect?.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderWordList();
    });

    // 전체 선택 체크박스
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    selectAllCheckbox?.addEventListener('change', (e) => {
      const filtered = getFilteredAndSortedWords();
      if (e.target.checked) {
        filtered.forEach(w => selectedWordIds.add(w.id));
      } else {
        filtered.forEach(w => selectedWordIds.delete(w.id));
      }
      renderWordList();
      updateSelectedCountUI();
    });

    // "선택한 단어로 퀴즈 풀기" 버튼
    document.getElementById('startSelectedQuizBtn')?.addEventListener('click', () => {
      switchTab('quiz');
      startStandardQuiz('selected');
    });

    // "선택 단어로 패러프레이징 퀴즈" 버튼
    document.getElementById('startSelectedParaphraseBtn')?.addEventListener('click', () => {
      switchTab('paraphrase-quiz');
      startParaphraseQuiz('selected');
    });

    // Day 바로 문제풀기 버튼
    document.getElementById('btnDayQuickQuiz')?.addEventListener('click', () => {
      const scope = activeDayFilter === 'ALL' ? 'all' : activeDayFilter;
      switchTab('quiz');
      startStandardQuiz(scope);
    });

    // 퀴즈 탭 내 시작 버튼
    document.getElementById('btnStartStandardQuiz')?.addEventListener('click', () => {
      const scope = getSelectedScope('standard');
      startStandardQuiz(scope);
    });

    // 퀴즈 상단 바 이전(뒤로가기) 버튼
    document.getElementById('btnQuizBack')?.addEventListener('click', () => {
      clearQuizTimer();
      if (activeQuiz.currentIndex > 0) {
        activeQuiz.currentIndex--;
        renderCurrentStandardQuestion();
      } else {
        if (confirm('진행 중인 퀴즈를 중단하고 범위 선택으로 돌아가시겠습니까?')) {
          document.getElementById('quizActiveCard').classList.add('hidden');
          document.getElementById('quizSetupCard').classList.remove('hidden');
        }
      }
    });

    document.getElementById('btnQuitQuiz')?.addEventListener('click', () => {
      if (confirm('진행 중인 퀴즈를 종료하시겠습니까?')) {
        clearQuizTimer();
        document.getElementById('quizActiveCard').classList.add('hidden');
        document.getElementById('quizSetupCard').classList.remove('hidden');
      }
    });

    document.getElementById('btnBackToQuizSetup')?.addEventListener('click', () => {
      document.getElementById('quizResultCard').classList.add('hidden');
      document.getElementById('quizSetupCard').classList.remove('hidden');
    });

    // 플래시카드 이벤트
    document.getElementById('btnStartFlashcard')?.addEventListener('click', () => {
      const scope = getSelectedScope('flashcard');
      startFlashcard(scope);
    });

    document.getElementById('btnQuitFlashcard')?.addEventListener('click', () => {
      if (confirm('플래시카드 학습을 종료하시겠습니까?')) {
        document.getElementById('flashcardActiveCard').classList.add('hidden');
        document.getElementById('flashcardSetupCard').classList.remove('hidden');
      }
    });

    document.getElementById('btnFcWrong')?.addEventListener('click', () => {
      handleFlashcardAnswer(false);
    });

    document.getElementById('btnFcKnow')?.addEventListener('click', () => {
      handleFlashcardAnswer(true);
    });

    // 실전 문장 빈칸 퀴즈 이벤트
    document.getElementById('btnStartClozeQuiz')?.addEventListener('click', () => {
      const scope = getSelectedScope('cloze');
      startClozeQuiz(scope);
    });

    // 실전 문장 빈칸 퀴즈 상단 바 이전(뒤로가기) 버튼
    document.getElementById('btnClozeBack')?.addEventListener('click', () => {
      clearQuizTimer();
      if (activeClozeQuiz.currentIndex > 0) {
        activeClozeQuiz.currentIndex--;
        renderCurrentClozeQuestion();
      } else {
        if (confirm('문장 빈칸 퀴즈를 중단하고 범위 선택으로 돌아가시겠습니까?')) {
          document.getElementById('clozeActiveCard').classList.add('hidden');
          document.getElementById('clozeSetupCard').classList.remove('hidden');
        }
      }
    });

    document.getElementById('btnQuitClozeQuiz')?.addEventListener('click', () => {
      if (confirm('문장 빈칸 퀴즈를 종료하시겠습니까?')) {
        clearQuizTimer();
        document.getElementById('clozeActiveCard').classList.add('hidden');
        document.getElementById('clozeSetupCard').classList.remove('hidden');
      }
    });

    document.getElementById('btnBackToClozeSetup')?.addEventListener('click', () => {
      document.getElementById('clozeResultCard').classList.add('hidden');
      document.getElementById('clozeSetupCard').classList.remove('hidden');
    });

    // 10초 타임어택 독립 옵션 동기화 및 이벤트
    function syncTimeAttackSetting(enabled) {
      localStorage.setItem('gtelp_timeattack_enabled', enabled ? 'true' : 'false');
      isStandardTimeAttack = enabled;
      isClozeTimeAttack = enabled;

      const t1 = document.getElementById('toggleTimeAttack');
      const t2 = document.getElementById('toggleClozeTimeAttack');
      if (t1) t1.checked = enabled;
      if (t2) t2.checked = enabled;

      const b1 = document.getElementById('quizTimeAttackBadge');
      const b2 = document.getElementById('clozeTimeAttackBadge');
      [b1, b2].forEach(b => {
        if (!b) return;
        b.textContent = enabled ? '켜짐' : '꺼짐';
        b.className = enabled 
          ? 'px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse'
          : 'px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-200 text-rose-900';
      });
    }

    const savedTimeAttack = localStorage.getItem('gtelp_timeattack_enabled') === 'true';
    syncTimeAttackSetting(savedTimeAttack);

    document.getElementById('toggleTimeAttack')?.addEventListener('change', (e) => {
      syncTimeAttackSetting(e.target.checked);
    });
    document.getElementById('toggleClozeTimeAttack')?.addEventListener('change', (e) => {
      syncTimeAttackSetting(e.target.checked);
    });
    document.getElementById('quizTimeAttackBox')?.addEventListener('click', (e) => {
      if (e.target.id !== 'toggleTimeAttack') {
        const t = document.getElementById('toggleTimeAttack');
        if (t) {
          t.checked = !t.checked;
          syncTimeAttackSetting(t.checked);
        }
      }
    });
    document.getElementById('clozeTimeAttackBox')?.addEventListener('click', (e) => {
      if (e.target.id !== 'toggleClozeTimeAttack') {
        const t = document.getElementById('toggleClozeTimeAttack');
        if (t) {
          t.checked = !t.checked;
          syncTimeAttackSetting(t.checked);
        }
      }
    });

    // 패러프레이징 퀴즈 시작 버튼
    document.getElementById('btnStartParaQuiz')?.addEventListener('click', () => {
      const scope = getSelectedScope('paraphrase');
      startParaphraseQuiz(scope);
    });

    // 패러프레이징 퀴즈 상단 바 이전(뒤로가기) 버튼
    document.getElementById('btnParaBack')?.addEventListener('click', () => {
      if (activeQuiz.currentIndex > 0) {
        activeQuiz.currentIndex--;
        renderCurrentParaQuestion();
      } else {
        if (confirm('패러프레이징 퀴즈를 중단하고 범위 선택으로 돌아가시겠습니까?')) {
          document.getElementById('paraActiveCard').classList.add('hidden');
          document.getElementById('paraSetupCard').classList.remove('hidden');
        }
      }
    });

    document.getElementById('btnQuitParaQuiz')?.addEventListener('click', () => {
      if (confirm('패러프레이징 퀴즈를 종료하시겠습니까?')) {
        document.getElementById('paraActiveCard').classList.add('hidden');
        document.getElementById('paraSetupCard').classList.remove('hidden');
      }
    });

    // 오답 통계에서 "오답 단어만 전체 퀴즈 풀기"
    document.getElementById('btnQuizAllWrongWords')?.addEventListener('click', () => {
      switchTab('quiz');
      startStandardQuiz('wrong');
    });

    // 상단 아이콘 모달 오픈
    document.getElementById('ttsSettingsBtn')?.addEventListener('click', () => openModal('ttsSettingsModal'));
    document.getElementById('dataManageBtn')?.addEventListener('click', () => openModal('dataManageModal'));
    document.getElementById('closeDetailModalBtn')?.addEventListener('click', () => closeModal('wordDetailModal'));

    // 데이터 백업 내보내기
    document.getElementById('btnExportData')?.addEventListener('click', () => {
      const backupData = {
        words: words,
        wrongStats: wrongStats,
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voca_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('데이터가 성공적으로 백업 다운로드되었습니다.');
    });

    // 데이터 복원 가져오기
    document.getElementById('importFileInput')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported.words && Array.isArray(imported.words)) {
            words = imported.words;
            saveWords();
          }
          if (imported.wrongStats) {
            wrongStats = imported.wrongStats;
            saveStats();
          }
          renderDayFilters();
          renderWordList();
          renderStats();
          closeModal('dataManageModal');
          showToast('데이터를 성공적으로 복원했습니다!');
        } catch (err) {
          alert('올바른 백업 JSON 파일이 아닙니다.');
        }
      };
      reader.readAsText(file);
    });

    // 전체 오답 기록 초기화
    document.getElementById('btnResetAllStats')?.addEventListener('click', () => {
      if (confirm('모든 단어의 오답 기록을 0회로 초기화하시겠습니까?')) {
        wrongStats = {};
        saveStats();
        renderWordList();
        renderStats();
        closeModal('dataManageModal');
        showToast('전체 오답 기록이 초기화되었습니다.');
      }
    });
  }

  function initAddWordUI() {
    const daySelect = document.getElementById('newWordDaySelect');
    const customDayInput = document.getElementById('newWordCustomDay');
    const form = document.getElementById('addWordForm');

    daySelect?.addEventListener('change', () => {
      if (daySelect.value === 'custom') {
        customDayInput.classList.remove('hidden');
        customDayInput.focus();
      } else {
        customDayInput.classList.add('hidden');
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      let targetDay = daySelect.value;
      if (targetDay === 'custom') {
        targetDay = customDayInput.value.trim() || '기초 필수 단어';
      }

      const wordText = document.getElementById('newWordText').value.trim();
      const meaningText = document.getElementById('newWordMeaning').value.trim();
      if (!wordText || !meaningText) {
        alert('영단어와 한글 뜻은 필수 입력 항목입니다.');
        return;
      }

      // 쉼표로 분리된 패러프레이징 배열 생성
      const paraRaw = document.getElementById('newWordParaphrase').value.trim();
      const paraphraseList = paraRaw 
        ? paraRaw.split(',').map(s => s.trim()).filter(s => s.length > 0) 
        : [];

      const newId = `word-${Date.now()}`;
      const newWordItem = {
        id: newId,
        day: targetDay,
        no: document.getElementById('newWordNo').value.trim() || undefined,
        word: wordText,
        phonetic: document.getElementById('newWordPhonetic').value.trim() || undefined,
        partOfSpeech: document.getElementById('newWordPos').value.trim() || '동사',
        meaning: meaningText,
        relatedForms: document.getElementById('newWordRelated').value.trim() || undefined,
        paraphrase: paraphraseList,
        exampleEn: document.getElementById('newWordExampleEn').value.trim() || undefined,
        exampleKo: document.getElementById('newWordExampleKo').value.trim() || undefined,
        memo: document.getElementById('newWordMemo').value.trim() || undefined,
        options: []
      };

      words.push(newWordItem);
      saveWords();

      // UI 갱신
      activeDayFilter = targetDay;
      renderDayFilters();
      renderWordList();
      closeModal('addWordModal');
      form.reset();

      showToast(`'${wordText}' 단어가 [${targetDay}]에 성공적으로 등록되었습니다!`);
    });
  }

  // --------------------------------------------------------------------------
  // 12. 이동 시간용 플래시카드(Flashcard) 암기 모드
  // --------------------------------------------------------------------------
  let flashcardDeck = [];
  let flashcardCurrentIndex = 0;
  let flashcardIsFlipped = false;
  let flashcardKnown = [];
  let flashcardUnknown = [];
  let flashcardCurrentScope = 'all';

  function setupFlashcardScopeUI() {
    const container = document.getElementById('flashcardScopeContainer');
    if (!container) return;
    const days = getAllDays();
    const wrongWordsCount = words.filter(w => getWrongCount(w.id) > 0).length;
    const selectedCount = selectedWordIds.size;

    let html = `
      <button class="fc-scope-btn p-3 rounded-2xl border text-left transition ${
        selectedCount > 0 ? 'border-amber-400 bg-amber-50/70 hover:bg-amber-100' : 'border-slate-200 hover:bg-slate-50'
      }" data-scope="selected" ${selectedCount === 0 ? 'disabled style="opacity:0.5"' : ''}>
        <div class="text-xs font-black text-amber-800">선택한 단어</div>
        <div class="text-[11px] text-slate-500">${selectedCount}개 선택됨</div>
      </button>

      <button class="fc-scope-btn p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left transition" data-scope="all">
        <div class="text-xs font-black text-slate-800">전체 단어</div>
        <div class="text-[11px] text-slate-500">총 ${words.length}단어</div>
      </button>

      <button class="fc-scope-btn p-3 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-left transition" data-scope="wrong" ${wrongWordsCount === 0 ? 'disabled style="opacity:0.5"' : ''}>
        <div class="text-xs font-black text-rose-700">오답 집중 덱</div>
        <div class="text-[11px] text-rose-500">${wrongWordsCount}개 단어</div>
      </button>
    `;

    days.forEach(day => {
      const count = words.filter(w => w.day === day).length;
      html += `
        <button class="fc-scope-btn p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left transition" data-scope="${day}">
          <div class="text-xs font-black text-slate-800">${day} 전용</div>
          <div class="text-[11px] text-slate-500">${count}개 단어</div>
        </button>
      `;
    });

    container.innerHTML = html;

    let defaultBtn = container.querySelector('[data-scope="selected"]:not([disabled])') 
                  || container.querySelector('[data-scope="Day 01"]') 
                  || container.querySelector('[data-scope="all"]');
    
    if (defaultBtn) {
      container.querySelectorAll('.fc-scope-btn').forEach(b => b.classList.remove('ring-2', 'ring-amber-600', 'bg-amber-50'));
      defaultBtn.classList.add('ring-2', 'ring-amber-600', 'bg-amber-50');
    }

    container.querySelectorAll('.fc-scope-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.fc-scope-btn').forEach(b => b.classList.remove('ring-2', 'ring-amber-600', 'bg-amber-50'));
        btn.classList.add('ring-2', 'ring-amber-600', 'bg-amber-50');
      });
    });
  }

  function startFlashcard(scope) {
    flashcardCurrentScope = scope || getSelectedScope('flashcard') || 'Day 01';
    let pool = getWordPoolForScope(flashcardCurrentScope);
    if (pool.length === 0) {
      alert('학습할 단어가 없습니다. 범위를 다시 선택해주세요.');
      return;
    }

    const shouldShuffle = document.getElementById('flashcardShuffleToggle')?.checked ?? true;
    flashcardDeck = shouldShuffle ? shuffle(pool) : [...pool];
    flashcardCurrentIndex = 0;
    flashcardIsFlipped = false;
    flashcardKnown = [];
    flashcardUnknown = [];

    document.getElementById('flashcardScopeBadge').textContent = 
      flashcardCurrentScope === 'selected' ? '선택 단어' : 
      (flashcardCurrentScope === 'wrong' ? '오답 집중' : 
      (flashcardCurrentScope === 'all' ? '전체 단어' : flashcardCurrentScope));

    document.getElementById('flashcardSetupCard').classList.add('hidden');
    document.getElementById('flashcardResultCard').classList.add('hidden');
    document.getElementById('flashcardActiveCard').classList.remove('hidden');

    renderCurrentFlashcard();
  }

  function handleFlashcardAnswer(isKnown) {
    if (flashcardCurrentIndex >= flashcardDeck.length) return;
    const item = flashcardDeck[flashcardCurrentIndex];
    if (isKnown) {
      flashcardKnown.push(item);
    } else {
      flashcardUnknown.push(item);
      addWrongCount(item.id);
    }

    flashcardCurrentIndex++;
    if (flashcardCurrentIndex < flashcardDeck.length) {
      renderCurrentFlashcard();
    } else {
      finishFlashcard();
    }
  }

  function renderCurrentFlashcard() {
    if (flashcardCurrentIndex >= flashcardDeck.length) {
      finishFlashcard();
      return;
    }

    const item = flashcardDeck[flashcardCurrentIndex];
    flashcardIsFlipped = false;

    const inner = document.getElementById('flashcardInner');
    if (inner) inner.classList.remove('flipped');

    // 카운터
    document.getElementById('flashcardCurrentIdx').textContent = flashcardCurrentIndex + 1;
    document.getElementById('flashcardTotalIdx').textContent = flashcardDeck.length;

    // 앞면 (Front)
    document.getElementById('fcFrontDay').textContent = item.day || 'Day 01';
    document.getElementById('fcFrontPos').textContent = item.partOfSpeech || '품사';
    document.getElementById('fcFrontWord').textContent = item.word;
    document.getElementById('fcFrontPhonetic').textContent = item.phonetic || '';

    // 단어 발음 자동 1회 낭독
    speak(item.word);

    // 뒷면 (Back)
    document.getElementById('fcBackWord').textContent = item.word;
    document.getElementById('fcBackPos').textContent = item.partOfSpeech || '품사';
    document.getElementById('fcBackMeaning').textContent = item.meaning;

    // 동의어
    const paraBox = document.getElementById('fcBackParaphraseBox');
    const paraEl = document.getElementById('fcBackParaphrase');
    const paraphrases = Array.isArray(item.paraphrase) ? item.paraphrase : [];
    if (paraphrases.length > 0) {
      paraBox.classList.remove('hidden');
      paraEl.innerHTML = paraphrases.map(p => `
        <span class="px-2 py-0.5 rounded-md bg-white/20 text-amber-200 font-bold text-xs">
          ${p}
        </span>
      `).join('');
    } else {
      paraBox.classList.add('hidden');
    }

    // 예문
    const exBox = document.getElementById('fcBackExampleBox');
    const exEn = document.getElementById('fcBackExampleEn');
    const exKo = document.getElementById('fcBackExampleKo');
    if (item.exampleEn) {
      exBox.classList.remove('hidden');
      exEn.textContent = `"${item.exampleEn}"`;
      exKo.textContent = item.exampleKo || '';
    } else {
      exBox.classList.add('hidden');
    }
  }

  window.flipCurrentFlashcard = function() {
    flashcardIsFlipped = !flashcardIsFlipped;
    const inner = document.getElementById('flashcardInner');
    if (inner) inner.classList.toggle('flipped', flashcardIsFlipped);
  };

  window.speakFlashcardCurrentWord = function() {
    const item = flashcardDeck[flashcardCurrentIndex];
    if (item) speak(item.word);
  };

  function finishFlashcard() {
    document.getElementById('flashcardActiveCard').classList.add('hidden');
    document.getElementById('flashcardResultCard').classList.remove('hidden');

    const totalEl = document.getElementById('fcResultTotal');
    const knownEl = document.getElementById('fcResultKnown');
    const unknownEl = document.getElementById('fcResultUnknown');
    if (totalEl) totalEl.textContent = flashcardDeck.length;
    if (knownEl) knownEl.textContent = flashcardKnown.length;
    if (unknownEl) unknownEl.textContent = flashcardUnknown.length;

    const retryBtn = document.getElementById('btnRetryFlashcard');
    if (retryBtn) {
      if (flashcardUnknown.length > 0) {
        retryBtn.classList.remove('hidden');
        retryBtn.textContent = `몰랐던 단어 (${flashcardUnknown.length}개) 다시 외우기`;
        retryBtn.onclick = () => {
          flashcardDeck = shuffle([...flashcardUnknown]);
          flashcardCurrentIndex = 0;
          flashcardIsFlipped = false;
          flashcardKnown = [];
          flashcardUnknown = [];
          document.getElementById('flashcardResultCard').classList.add('hidden');
          document.getElementById('flashcardActiveCard').classList.remove('hidden');
          renderCurrentFlashcard();
        };
      } else {
        retryBtn.textContent = '처음부터 다시 보기';
        retryBtn.onclick = () => {
          startFlashcard(flashcardCurrentScope);
        };
      }
    }
  }

  window.startStandardQuiz = startStandardQuiz;
  window.startClozeQuiz = startClozeQuiz;
  window.startFlashcard = startFlashcard;
  window.handleFlashcardAnswer = handleFlashcardAnswer;

  // --------------------------------------------------------------------------
  // 13. 실전 문장 빈칸 채우기 퀴즈 (Cloze Test Module)
  // --------------------------------------------------------------------------
  let activeClozeQuiz = {
    scopeLabel: '',
    questionList: [],
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    wrongList: [],
    answered: false
  };

  function setupClozeScopeUI() {
    const container = document.getElementById('clozeScopeContainer');
    if (!container) return;
    const days = getAllDays();
    const wrongWordsCount = words.filter(w => getWrongCount(w.id) > 0).length;
    const selectedCount = selectedWordIds.size;

    let html = `
      <button class="cloze-scope-btn p-3 rounded-2xl border text-left transition ${
        selectedCount > 0 ? 'border-emerald-400 bg-emerald-50/70 hover:bg-emerald-100' : 'border-slate-200 hover:bg-slate-50'
      }" data-scope="selected" ${selectedCount === 0 ? 'disabled style="opacity:0.5"' : ''}>
        <div class="text-xs font-black text-emerald-800">내가 선택한 단어</div>
        <div class="text-[11px] text-slate-500">${selectedCount}개 선택됨</div>
      </button>

      <button class="cloze-scope-btn p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left transition" data-scope="all">
        <div class="text-xs font-black text-slate-800">전체 단어</div>
        <div class="text-[11px] text-slate-500">총 ${words.length}단어</div>
      </button>

      <button class="cloze-scope-btn p-3 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-left transition" data-scope="wrong" ${wrongWordsCount === 0 ? 'disabled style="opacity:0.5"' : ''}>
        <div class="text-xs font-black text-rose-700">오답 집중 퀴즈</div>
        <div class="text-[11px] text-rose-500">${wrongWordsCount}개 단어</div>
      </button>
    `;

    days.forEach(day => {
      const count = words.filter(w => w.day === day).length;
      html += `
        <button class="cloze-scope-btn p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left transition" data-scope="${day}">
          <div class="text-xs font-black text-slate-800">${day} 전용</div>
          <div class="text-[11px] text-slate-500">${count}개 단어</div>
        </button>
      `;
    });

    container.innerHTML = html;

    let defaultBtn = container.querySelector('[data-scope="selected"]:not([disabled])') 
                  || container.querySelector('[data-scope="Day 01"]') 
                  || container.querySelector('[data-scope="all"]');
    
    if (defaultBtn) {
      container.querySelectorAll('.cloze-scope-btn').forEach(b => b.classList.remove('ring-2', 'ring-emerald-600', 'bg-emerald-50'));
      defaultBtn.classList.add('ring-2', 'ring-emerald-600', 'bg-emerald-50');
    }

    container.querySelectorAll('.cloze-scope-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.cloze-scope-btn').forEach(b => b.classList.remove('ring-2', 'ring-emerald-600', 'bg-emerald-50'));
        btn.classList.add('ring-2', 'ring-emerald-600', 'bg-emerald-50');
      });
    });
  }

  function startClozeQuiz(scope) {
    const targetScope = scope || getSelectedScope('cloze') || 'Day 01';
    let pool = getWordPoolForScope(targetScope).filter(w => w.exampleEn && w.exampleEn.trim().length > 0);
    if (pool.length === 0) {
      alert('예문 문장이 등록된 단어가 없습니다. 다른 범위를 선택해주세요.');
      return;
    }

    isClozeTimeAttack = localStorage.getItem('gtelp_timeattack_enabled') === 'true';

    activeClozeQuiz = {
      scopeLabel: targetScope === 'selected' ? '선택 단어' : (targetScope === 'wrong' ? '오답 집중' : (targetScope === 'all' ? '전체 단어' : `${targetScope} 문장 빈칸`)),
      currentScope: targetScope,
      questionList: shuffle(pool),
      currentIndex: 0,
      score: 0,
      correctCount: 0,
      wrongList: [],
      answered: false,
      userAnswers: {}
    };

    document.getElementById('clozeSetupCard').classList.add('hidden');
    document.getElementById('clozeResultCard').classList.add('hidden');
    document.getElementById('clozeActiveCard').classList.remove('hidden');

    renderCurrentClozeQuestion();
  }

  function renderCurrentClozeQuestion() {
    clearQuizTimer();
    const q = activeClozeQuiz.questionList[activeClozeQuiz.currentIndex];

    document.getElementById('clozeBadgeScope').textContent = activeClozeQuiz.scopeLabel;
    document.getElementById('clozeCurrentIndex').textContent = activeClozeQuiz.currentIndex + 1;
    document.getElementById('clozeTotalIndex').textContent = activeClozeQuiz.questionList.length;
    document.getElementById('clozeScore').textContent = activeClozeQuiz.score;

    const progress = ((activeClozeQuiz.currentIndex) / activeClozeQuiz.questionList.length) * 100;
    document.getElementById('clozeProgressBar').style.width = `${progress}%`;

    // 상단 뒤로가기 버튼 라벨
    const topBackBtn = document.getElementById('btnClozeBack');
    if (topBackBtn) {
      if (activeClozeQuiz.currentIndex === 0) {
        topBackBtn.innerHTML = '<i class="fa-solid fa-chevron-left text-[11px]"></i> 목록';
        topBackBtn.title = '문장 빈칸 퀴즈 범위 목록으로';
      } else {
        topBackBtn.innerHTML = '<i class="fa-solid fa-chevron-left text-[11px]"></i> 이전';
        topBackBtn.title = '이전 문제로 이동';
      }
    }

    // 예문 문장에서 정답 단어를 찾아 [ _______ ] 로 빈칸 처리
    const rawSentence = q.exampleEn;
    const regex = new RegExp(`\\b(${q.word}[a-z]*)\\b`, 'gi');
    const clozeHtml = rawSentence.replace(regex, `
      <span class="inline-block px-3 py-0.5 mx-1 rounded-xl bg-emerald-200 border-2 border-emerald-500 text-emerald-950 font-black text-base shadow-xs animate-pulse">
        [ &nbsp; ? &nbsp; ]
      </span>
    `);

    document.getElementById('clozeSentenceEn').innerHTML = `"${clozeHtml}"`;
    document.getElementById('clozeSentenceKo').textContent = q.exampleKo ? `해석 힌트: ${q.exampleKo}` : '';

    // 이전 답변 확인
    const prevAns = activeClozeQuiz.userAnswers && activeClozeQuiz.userAnswers[activeClozeQuiz.currentIndex];

    let options = [];
    if (prevAns) {
      options = prevAns.options;
      activeClozeQuiz.answered = true;
    } else {
      activeClozeQuiz.answered = false;
      if (q.options && q.options.length === 4) {
        options = shuffle(q.options);
      } else {
        options = generateGtelpSmartDistractors(q, words);
      }
    }

    // 보기 렌더링
    const optionsContainer = document.getElementById('clozeOptionsContainer');
    optionsContainer.innerHTML = options.map((opt, i) => {
      const label = String.fromCharCode(65 + i);
      let btnClass = 'cloze-opt-btn w-full p-3.5 rounded-2xl border-2 font-bold transition flex items-center justify-between group ';
      let badgeClass = 'w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition ';

      if (prevAns) {
        if (opt.word === q.word) {
          btnClass += 'border-emerald-500 bg-emerald-50 text-emerald-900';
          badgeClass += 'bg-emerald-600 text-white';
        } else if (opt.word === prevAns.selectedWord && !prevAns.isCorrect) {
          btnClass += 'border-rose-500 bg-rose-50 text-rose-900';
          badgeClass += 'bg-rose-600 text-white';
        } else {
          btnClass += 'border-slate-200 bg-slate-50/60 text-slate-400 opacity-60';
          badgeClass += 'bg-slate-200 text-slate-400';
        }
      } else {
        btnClass += 'border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/40 text-left';
        badgeClass += 'bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-500';
      }

      return `
        <button class="${btnClass}" data-word="${opt.word}" ${prevAns ? 'disabled' : ''}>
          <div class="flex items-center gap-3">
            <span class="${badgeClass}">
              ${label}
            </span>
            <span class="text-base text-slate-900">${opt.word}</span>
          </div>
          <span class="tts-cloze-opt p-1.5 text-slate-300 hover:text-emerald-600 transition" title="발음" data-word="${opt.word}">
            <i class="fa-solid fa-volume-high"></i>
          </span>
        </button>
      `;
    }).join('');

    optionsContainer.querySelectorAll('.tts-cloze-opt').forEach(btn => {
      btn.addEventListener('click', (e) => speak(btn.dataset.word, e));
    });

    if (prevAns) {
      showClozeExplanation(prevAns.isCorrect, q, prevAns.options, prevAns.isTimeout);
    } else {
      document.getElementById('clozeExplanationBox').classList.add('hidden');

      // 10초 타임어택 가동
      if (isClozeTimeAttack) {
        startQuizTimer(10, () => {
          if (!activeClozeQuiz.answered) {
            handleClozeAnswer(null, q, options, true);
          }
        }, 'clozeTimerBadge', 'clozeTimerSeconds');
      }

      optionsContainer.querySelectorAll('.cloze-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (activeClozeQuiz.answered) return;
          if (e.target.closest('.tts-cloze-opt')) return;
          handleClozeAnswer(btn.dataset.word, q, options);
        });
      });
    }
  }

  function handleClozeAnswer(selectedWord, q, options, isTimeout = false) {
    clearQuizTimer();
    activeClozeQuiz.answered = true;
    const isCorrect = !isTimeout && (selectedWord === q.word);

    const buttons = document.querySelectorAll('#clozeOptionsContainer .cloze-opt-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      const word = btn.dataset.word;
      if (word === q.word) {
        btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-900');
      } else if (word === selectedWord && !isCorrect) {
        btn.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-900');
      }
    });

    if (!activeClozeQuiz.userAnswers) activeClozeQuiz.userAnswers = {};
    const alreadyRecorded = !!activeClozeQuiz.userAnswers[activeClozeQuiz.currentIndex];
    activeClozeQuiz.userAnswers[activeClozeQuiz.currentIndex] = { selectedWord, options, isTimeout, isCorrect };

    if (!alreadyRecorded) {
      if (isCorrect) {
        activeClozeQuiz.score += 10;
        activeClozeQuiz.correctCount++;
        document.getElementById('clozeScore').textContent = activeClozeQuiz.score;
      } else {
        activeClozeQuiz.wrongList.push(q);
        addWrongCount(q.id);
      }
    }

    // 전체 완성 문장 발음 재생
    speak(q.exampleEn);

    showClozeExplanation(isCorrect, q, options, isTimeout);
  }

  function showClozeExplanation(isCorrect, q, options, isTimeout = false) {
    const box = document.getElementById('clozeExplanationBox');
    const statusEl = document.getElementById('clozeFeedbackStatus');
    box.classList.remove('hidden');

    if (isCorrect) {
      box.className = 'p-4 rounded-2xl border space-y-3 bg-emerald-50/70 border-emerald-200 fade-in';
      statusEl.innerHTML = '<span class="text-emerald-700 font-bold"><i class="fa-solid fa-circle-check text-lg"></i> 정답입니다! 문맥에 완벽히 들어맞습니다!</span>';
    } else if (isTimeout) {
      box.className = 'p-4 rounded-2xl border space-y-3 bg-rose-50/70 border-rose-200 fade-in';
      statusEl.innerHTML = `<span class="text-rose-700 font-bold"><i class="fa-solid fa-stopwatch text-lg"></i> ⏱️ 10초 시간 초과! 정답은 <strong>"${q.word}"</strong>입니다.</span>`;
    } else {
      box.className = 'p-4 rounded-2xl border space-y-3 bg-rose-50/70 border-rose-200 fade-in';
      statusEl.innerHTML = `<span class="text-rose-700 font-bold"><i class="fa-solid fa-circle-xmark text-lg"></i> 오답입니다! 빈칸에 알맞은 단어는 <strong>"${q.word}"</strong>입니다.</span>`;
    }

    // 완성 문장 듣기 버튼
    document.getElementById('clozeTtsFullSentenceBtn').onclick = () => speak(q.exampleEn);
    document.getElementById('clozeReviewFullSentence').innerHTML = `"${q.exampleEn}"`;
    document.getElementById('clozeReviewTranslation').textContent = q.exampleKo || '';

    // 보기 4개 뜻풀이 & 상세 모달 버튼
    const reviewList = document.getElementById('clozeReviewOptionsList');
    reviewList.innerHTML = options.map(opt => {
      const isTarget = opt.word === q.word;
      const registeredItem = words.find(w => w.word.toLowerCase() === opt.word.toLowerCase());

      return `
        <div class="flex items-center justify-between p-2.5 rounded-xl ${
          isTarget ? 'bg-emerald-100/70 border-emerald-200 text-emerald-950 font-bold' : 'bg-white border-slate-200 text-slate-700'
        } border shadow-xs gap-2">
          <div class="flex items-center gap-2 flex-1 min-w-0 cursor-pointer" onclick="window.speakText('${opt.word}')">
            <i class="fa-solid fa-volume-high text-xs text-indigo-500"></i>
            <span class="font-black text-slate-900">${opt.word}</span>
            <span class="text-slate-600 text-xs truncate">: ${opt.def}</span>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            ${isTarget ? '<span class="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-black">정답</span>' : ''}
            ${registeredItem ? `
              <button type="button" onclick="window.openQuizOptionDetail('${registeredItem.id}', '${opt.word}')" class="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold text-[11px] flex items-center gap-1 transition shadow-xs border border-emerald-200">
                <i class="fa-solid fa-book-open text-[10px]"></i> 상세
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    const tipSection = document.getElementById('clozeTipSection');
    const tipText = document.getElementById('clozeTipText');
    if (q.memo) {
      tipSection.classList.remove('hidden');
      tipText.textContent = q.memo;
    } else {
      tipSection.classList.add('hidden');
    }

    // 이전 문제 버튼
    const prevBtn = document.getElementById('btnPrevClozeQuestion');
    if (prevBtn) {
      if (activeClozeQuiz.currentIndex === 0) {
        prevBtn.disabled = true;
        prevBtn.classList.add('opacity-40', 'cursor-not-allowed');
      } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove('opacity-40', 'cursor-not-allowed');
      }
      prevBtn.onclick = () => {
        clearQuizTimer();
        if (activeClozeQuiz.currentIndex > 0) {
          activeClozeQuiz.currentIndex--;
          renderCurrentClozeQuestion();
        }
      };
    }

    // 다음 문제 버튼
    const nextBtn = document.getElementById('btnNextClozeQuestion');
    const nextBtnText = document.getElementById('btnNextClozeQuestionText');
    if (nextBtnText) {
      if (activeClozeQuiz.currentIndex === activeClozeQuiz.questionList.length - 1) {
        nextBtnText.textContent = '결과 보기 (완료)';
      } else {
        nextBtnText.textContent = '다음 문제로 넘어가기';
      }
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        clearQuizTimer();
        activeClozeQuiz.currentIndex++;
        if (activeClozeQuiz.currentIndex < activeClozeQuiz.questionList.length) {
          renderCurrentClozeQuestion();
        } else {
          finishClozeQuiz();
        }
      };
    }
  }

  function finishClozeQuiz() {
    document.getElementById('clozeActiveCard').classList.add('hidden');
    document.getElementById('clozeResultCard').classList.remove('hidden');

    const total = activeClozeQuiz.questionList.length;
    const correct = activeClozeQuiz.correctCount;
    const wrong = activeClozeQuiz.wrongList.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    document.getElementById('clozeResultCorrect').textContent = correct;
    document.getElementById('clozeResultWrong').textContent = wrong;
    document.getElementById('clozeResultAccuracy').textContent = accuracy;

    const retryWrongBtn = document.getElementById('btnRetryWrongCloze');
    if (wrong > 0) {
      retryWrongBtn.classList.remove('hidden');
      retryWrongBtn.onclick = () => {
        activeClozeQuiz.questionList = shuffle([...activeClozeQuiz.wrongList]);
        activeClozeQuiz.currentIndex = 0;
        activeClozeQuiz.score = 0;
        activeClozeQuiz.correctCount = 0;
        activeClozeQuiz.wrongList = [];
        activeClozeQuiz.userAnswers = {};
        activeClozeQuiz.scopeLabel = '틀린 문장 재도전';
        document.getElementById('clozeResultCard').classList.add('hidden');
        document.getElementById('clozeActiveCard').classList.remove('hidden');
        renderCurrentClozeQuestion();
      };
    } else {
      retryWrongBtn.classList.add('hidden');
    }
  }
  }
  const GTELP_CONFUSABLES_MAP = {
    "ensure": [
      { word: "assure", def: "확신시키다, 장담하다" },
      { word: "insure", def: "보험에 들다" },
      { word: "endure", def: "견디다, 참다" }
    ],
    "assure": [
      { word: "ensure", def: "보장하다, 확실히 하다" },
      { word: "assume", def: "추정하다, 떠맡다" },
      { word: "assist", def: "돕다, 조력하다" }
    ],
    "apparent": [
      { word: "appear", def: "나타나다, ~인 것 같다" },
      { word: "appeal", def: "호소하다, 매력" },
      { word: "applaud", def: "박수갈채를 보내다" }
    ],
    "credit": [
      { word: "critic", def: "비평가, 평론가" },
      { word: "create", def: "창조하다, 만들다" },
      { word: "credible", def: "믿을 수 있는" }
    ],
    "run": [
      { word: "race", def: "경주하다; 인종" },
      { word: "ruin", def: "망치다, 파멸" },
      { word: "rush", def: "서두르다, 돌진하다" }
    ],
    "define": [
      { word: "decline", def: "거절하다, 감소하다" },
      { word: "defend", def: "방어하다, 변호하다" },
      { word: "defeat", def: "패배시키다, 패배" }
    ],
    "essential": [
      { word: "efficient", def: "효율적인, 유능한" },
      { word: "effective", def: "효과적인, 유효한" },
      { word: "effortless", def: "노력이 들지 않는" }
    ],
    "focus": [
      { word: "force", def: "강요하다; 힘" },
      { word: "found", def: "설립하다" },
      { word: "follow", def: "따르다, 따라가다" }
    ],
    "consequence": [
      { word: "sequence", def: "연속, 순서" },
      { word: "frequency", def: "빈도, 주파수" },
      { word: "convenience", def: "편의, 편리" }
    ],
    "assess": [
      { word: "access", def: "접근하다; 접근" },
      { word: "assert", def: "주장하다, 단언하다" },
      { word: "assist", def: "돕다, 조력하다" }
    ],
    "principle": [
      { word: "principal", def: "주요한; 교장" },
      { word: "prince", def: "왕자" },
      { word: "priority", def: "우선순위, 우선권" }
    ],
    "legal": [
      { word: "illegal", def: "불법적인 (반의어)" },
      { word: "lethal", def: "치명적인" },
      { word: "loyal", def: "충실한, 충성스러운" }
    ],
    "maintain": [
      { word: "contain", def: "포함하다, 담고 있다" },
      { word: "obtain", def: "얻다, 획득하다" },
      { word: "retain", def: "보유하다, 간직하다" }
    ],
    "remove": [
      { word: "remote", def: "원격의, 외딴" },
      { word: "remind", def: "상기시키다" },
      { word: "remain", def: "남아있다, 머무르다" }
    ],
    "prevent": [
      { word: "protect", def: "보호하다, 지키다" },
      { word: "preserve", def: "보존하다, 유지하다" },
      { word: "predict", def: "예측하다, 예견하다" }
    ],
    "correct": [
      { word: "collect", def: "모으다, 수집하다" },
      { word: "connect", def: "연결하다, 이어지다" },
      { word: "corrupt", def: "부패한, 타락시키다" }
    ],
    "publish": [
      { word: "punish", def: "처벌하다, 벌주다" },
      { word: "publicize", def: "광고하다, 홍보하다" },
      { word: "purchase", def: "구매하다, 사다" }
    ],
    "former": [
      { word: "farmer", def: "농부" },
      { word: "formal", def: "공식적인, 격식 차린" },
      { word: "formula", def: "공식, 제조법" }
    ],
    "construct": [
      { word: "destroy", def: "파괴하다, 망치다 (반의어)" },
      { word: "instruct", def: "지시하다, 가르치다" },
      { word: "restrict", def: "제한하다, 통제하다" }
    ],
    "increase": [
      { word: "decrease", def: "감소하다, 줄이다 (반의어)" },
      { word: "include", def: "포함하다" },
      { word: "improve", def: "개선하다, 향상시키다" }
    ]
  };

  function generateGtelpSmartDistractors(targetItem, allWords) {
    const targetWord = targetItem.word.toLowerCase();
    let selectedDistractors = [];

    // 1단계: 지텔프 빈출 혼동 어휘 사전에 사전 정의된 오답이 있는지 확인
    if (GTELP_CONFUSABLES_MAP[targetWord]) {
      selectedDistractors = [...GTELP_CONFUSABLES_MAP[targetWord]];
    }

    // 2단계: 부족한 보기는 단어장 내 단어 중 '유사도 점수'가 높은 단어로 채우기
    if (selectedDistractors.length < 3) {
      const candidates = allWords.filter(w => w.word.toLowerCase() !== targetWord);

      // 점수 계산: 품사 일치(+10), 앞 2글자 일치(+15), 길이 비슷(+5)
      const scored = candidates.map(c => {
        let score = 0;
        const cWord = c.word.toLowerCase();
        if (c.partOfSpeech === targetItem.partOfSpeech) score += 10;
        if (cWord.slice(0, 2) === targetWord.slice(0, 2)) score += 15;
        else if (cWord[0] === targetWord[0]) score += 8;
        if (Math.abs(cWord.length - targetWord.length) <= 2) score += 5;

        return { item: c, score: score };
      });

      scored.sort((a, b) => b.score - a.score);

      for (const s of scored) {
        if (selectedDistractors.length >= 3) break;
        if (!selectedDistractors.some(d => d.word.toLowerCase() === s.item.word.toLowerCase())) {
          selectedDistractors.push({ word: s.item.word, def: s.item.meaning });
        }
      }
    }

    // 3단계: 그래도 부족하면 아무 단어나 무작위 보충
    if (selectedDistractors.length < 3) {
      const remaining = allWords.filter(w => 
        w.word.toLowerCase() !== targetWord && 
        !selectedDistractors.some(d => d.word.toLowerCase() === w.word.toLowerCase())
      );
      const shuffledRem = shuffle(remaining);
      for (const r of shuffledRem) {
        if (selectedDistractors.length >= 3) break;
        selectedDistractors.push({ word: r.word, def: r.meaning });
      }
    }

    // 정답 1개 + 오답 3개 셔플
    return shuffle([
      { word: targetItem.word, def: targetItem.meaning },
      ...selectedDistractors.slice(0, 3)
    ]);
  }
  const RECOM_GEMINI_PROMPT = `너는 지텔프(G-TELP) 시험 어휘 전문 출제 및 분석 AI야.
첨부된 교재 사진 속의 모든 단어들을 빠짐없이 정밀 분석하여, 아래 규격의 JSON 배열(Array) 형식으로만 응답해줘.
(사진 내에 중복된 단어가 있다면 1개로 통합하고, 특히 퀴즈 출제를 위해 'options' 항목에 정답 1개와 철자나 발음이 비슷하거나 반의어 관계인 지텔프 빈출 혼동 어휘 3개를 함께 만들어줘. 코드블록 없이 순수 JSON 텍스트만 출력해):

[
  {
    "day": "해당 Day (예: Day 03)",
    "no": "교재 번호 (예: 01)",
    "word": "영단어 (예: apparent)",
    "phonetic": "발음기호 (예: [əpǽrənt])",
    "partOfSpeech": "품사 (예: 형용사, 동사, 명사)",
    "meaning": "대표 한글 뜻풀이",
    "relatedForms": "파생어 및 품사 (예: apparently (부) 명백히)",
    "paraphrase": ["동의어1", "동의어2", "패러프레이징 단어들"],
    "exampleEn": "대표 영어 예문",
    "exampleKo": "예문 한글 해석",
    "memo": "지텔프 기출 출제 포인트 또는 수기 팁",
    "options": [
      { "word": "정답단어", "def": "정답 한글 뜻" },
      { "word": "혼동단어1 (철자/발음 유사어)", "def": "혼동단어1 뜻" },
      { "word": "혼동단어2 (반의어 등)", "def": "혼동단어2 뜻" },
      { "word": "혼동단어3 (유사어휘)", "def": "혼동단어3 뜻" }
    ]
  }
]`;

  function initBatchImportUI() {
    // 프롬프트 복사 버튼
    document.getElementById('btnCopyPrompt')?.addEventListener('click', () => {
      navigator.clipboard.writeText(RECOM_GEMINI_PROMPT).then(() => {
        showToast('📋 재민아이 전용 프롬프트가 복사되었습니다!');
      }).catch(() => {
        prompt('아래 프롬프트를 복사하여 재민아이에게 보내세요:', RECOM_GEMINI_PROMPT);
      });
    });

    // 일괄 등록 실행 버튼
    document.getElementById('btnExecuteBatchImport')?.addEventListener('click', () => {
      const textarea = document.getElementById('batchImportTextarea');
      const rawText = (textarea?.value || '').trim();
      if (!rawText) {
        alert('재민아이가 출력해준 데이터를 붙여넣어 주세요.');
        return;
      }

      try {
        let cleanText = rawText;
        if (cleanText.startsWith('```json')) cleanText = cleanText.replace(/^```json/, '');
        if (cleanText.startsWith('```')) cleanText = cleanText.replace(/^```/, '');
        if (cleanText.endsWith('```')) cleanText = cleanText.replace(/```$/, '');
        cleanText = cleanText.trim();

        const parsedData = JSON.parse(cleanText);
        if (!Array.isArray(parsedData) || parsedData.length === 0) {
          throw new Error('데이터가 JSON 배열 형식이 아닙니다.');
        }

        let addedCount = 0;
        let lastDay = activeDayFilter;

        parsedData.forEach((item, i) => {
          if (!item.word || !item.meaning) return;

          const targetDay = item.day || activeDayFilter || '기초 필수 단어';
          lastDay = targetDay;
          const cleanWord = item.word.trim().toLowerCase();

          // 같은 Day 내에 동일한 단어가 이미 있는지 확인 (중복 등록 방지)
          const existingIdx = words.findIndex(w => w.word.toLowerCase() === cleanWord && w.day === targetDay);

          const newWordObj = {
            id: existingIdx >= 0 ? words[existingIdx].id : `imported-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 4)}`,
            day: targetDay,
            no: item.no ? String(item.no).padStart(2, '0') : undefined,
            word: cleanWord,
            phonetic: item.phonetic || '',
            partOfSpeech: item.partOfSpeech || '동사',
            meaning: item.meaning.trim(),
            relatedForms: item.relatedForms || '',
            paraphrase: Array.isArray(item.paraphrase) ? item.paraphrase : (typeof item.paraphrase === 'string' ? item.paraphrase.split(',').map(s=>s.trim()) : []),
            exampleEn: item.exampleEn || '',
            exampleKo: item.exampleKo || '',
            memo: item.memo || '',
            options: []
          };

          if (existingIdx >= 0) {
            // 같은 Day 내 중복 시: 새로운 뜻/동의어/예문으로 깔끔하게 업데이트 (단어가 2개로 복제되지 않음)
            words[existingIdx] = { ...words[existingIdx], ...newWordObj };
          } else {
            // 신규 단어 추가
            words.push(newWordObj);
          }
          addedCount++;
        });

        saveWords();
        activeDayFilter = lastDay;
        renderDayFilters();
        renderWordList();
        closeModal('batchImportModal');
        textarea.value = '';

        alert(`🎉 총 ${addedCount}개의 단어가 단어장에 성공적으로 등록되었습니다!\n[${lastDay}] 목록에서 바로 확인하실 수 있습니다.`);
      } catch (err) {
        alert('데이터 파싱 오류: 올바른 JSON 형식인지 확인해 주세요.\n' + err.message);
      }
    });
  }
  let pendingOcrWords = [];
  let geminiApiKey = localStorage.getItem('voca_gemini_api_key') || '';

  function initGeminiUI() {
    const keyInput = document.getElementById('geminiApiKeyInput');
    const saveBtn = document.getElementById('btnSaveGeminiKey');
    const testBtn = document.getElementById('btnTestGeminiKey');

    if (keyInput && geminiApiKey) {
      keyInput.value = geminiApiKey;
    }

    saveBtn?.addEventListener('click', () => {
      const val = keyInput.value.trim();
      if (!val) {
        alert('API 키를 입력해주세요.');
        return;
      }
      geminiApiKey = val;
      cachedGeminiModel = null;
      localStorage.setItem('voca_gemini_api_key', val);
      closeModal('geminiApiModal');
      showToast('Gemini AI 키가 성공적으로 저장되었습니다!');
    });

    testBtn?.addEventListener('click', async () => {
      const val = keyInput.value.trim();
      if (!val) {
        alert('API 키를 먼저 입력해주세요.');
        return;
      }
      testBtn.textContent = '확인 중...';
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${val}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || `HTTP ${res.status}`);
        }
        const supported = (data.models || []).filter(m => m.supportedGenerationMethods?.includes('generateContent'));
        const modelNames = supported.map(m => m.name.replace('models/', ''));
        if (modelNames.length > 0) {
          alert(`🎉 구글 AI 연결 성공!\n사용 가능한 모델: ${modelNames[0]}\n(총 ${modelNames.length}개 모델)`);
        } else {
          alert('⚠️ 연결은 되었으나 이미지 지원 모델이 없습니다.');
        }
      } catch (err) {
        alert(`❌ 구글 서버 응답: ${err.message}\n\n[해결 방법]\nGoogle AI Studio (aistudio.google.com)에서 'Create API key'를 눌러 새 키를 발급받으시면 즉시 정상 작동합니다.`);
      } finally {
        testBtn.textContent = '연결 테스트';
      }
    });
  }

  async function processPhotosWithOCR(savedPhotos, targetDay) {
    if (!geminiApiKey) {
      openModal('geminiApiModal');
      alert('초고성능 AI 분석을 위해 Gemini 무료 API 키를 먼저 설정해주세요!\n(30초 만에 무료로 발급받으실 수 있습니다)');
      return;
    }

    const progressCard = document.getElementById('ocrProgressCard');
    const statusText = document.getElementById('ocrStatusText');
    const percentText = document.getElementById('ocrPercentText');
    const progressBar = document.getElementById('ocrProgressBar');

    if (progressCard) progressCard.classList.remove('hidden');

    let allDetectedWords = [];

    try {
      for (let i = 0; i < savedPhotos.length; i++) {
        const item = savedPhotos[i];
        const currentNum = i + 1;
        const total = savedPhotos.length;
        const percent = Math.round(((i) / total) * 100);

        if (statusText) statusText.textContent = `사진 ${currentNum}/${total}장 분석 중... (현재까지 ${allDetectedWords.length}단어 발견)`;
        if (percentText) percentText.textContent = `${percent}%`;
        if (progressBar) progressBar.style.width = `${percent}%`;

        const wordsFromImage = await callGeminiVision(item.dataUrl, targetDay);
        allDetectedWords.push(...wordsFromImage);

        const afterPercent = Math.round(((i + 1) / total) * 100);
        if (statusText) statusText.textContent = `사진 ${currentNum}/${total}장 완료! (누적 ${allDetectedWords.length}단어)`;
        if (percentText) percentText.textContent = `${afterPercent}%`;
        if (progressBar) progressBar.style.width = `${afterPercent}%`;

        // 무료 API 속도 제한(Rate Limit) 방지를 위한 0.7초 안전 딜레이
        if (i < savedPhotos.length - 1) {
          await new Promise(r => setTimeout(r, 700));
        }
      }

      if (progressCard) progressCard.classList.add('hidden');

      if (allDetectedWords.length > 0) {
        // 중복 제거
        const uniqueMap = new Map();
        allDetectedWords.forEach(w => {
          if (!uniqueMap.has(w.word.toLowerCase())) {
            uniqueMap.set(w.word.toLowerCase(), w);
          }
        });
        pendingOcrWords = Array.from(uniqueMap.values());
        openOcrResultModal(pendingOcrWords, targetDay);
      } else {
        alert('사진에서 단어를 찾지 못했습니다. 사진이 선명한지 확인해주세요.');
      }

    } catch (err) {
      console.error('Gemini Vision Process error:', err);
      if (progressCard) progressCard.classList.add('hidden');
      alert('AI 단어 분석 중 오류가 발생했습니다: ' + (err.message || err));
    }
  }

  let cachedGeminiModel = null;

  async function getBestGeminiModel(apiKey) {
    if (cachedGeminiModel) return cachedGeminiModel;
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (res.ok) {
        const data = await res.json();
        const models = data.models || [];
        // generateContent를 지원하는 모델 필터링
        const supported = models.filter(m => m.supportedGenerationMethods?.includes('generateContent'));
        
        // 1순위: 2.0-flash, 2순위: 1.5-flash, 3순위: flash 포함, 4순위: 아무 generateContent 모델
        const best = supported.find(m => m.name.includes('2.0-flash'))
                  || supported.find(m => m.name.includes('1.5-flash-latest'))
                  || supported.find(m => m.name.includes('1.5-flash'))
                  || supported.find(m => m.name.includes('flash'))
                  || supported[0];
        
        if (best) {
          cachedGeminiModel = best.name.replace('models/', '');
          console.log('Selected Gemini Model:', cachedGeminiModel);
          return cachedGeminiModel;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch model list, using fallback:', e);
    }
    return 'gemini-2.0-flash';
  }

  // Google Gemini Vision API 호출 (자동 모델 매칭 및 다중 엔드포인트 지원)
  async function callGeminiVision(dataUrl, targetDay) {
    const base64Data = dataUrl.split(',')[1] || dataUrl;
    
    // 사용 가능한 최적 모델 자동 감지
    const modelName = await getBestGeminiModel(geminiApiKey);

    const promptText = `
너는 영어 어학 교재(G-TELP, 토익 등) 단어 분석 전문 AI야.
첨부된 교재 사진 속의 모든 단어 항목들을 빠짐없이 정밀 분석하여, 아래 JSON 스키마 규격의 JSON 배열(Array) 형식으로만 응답해줘.
코드블록(\`\`\`json)이나 인사말 없이 순수 JSON 텍스트만 출력해야 해:

[
  {
    "no": "교재 번호 (예: 01)",
    "word": "영단어 (예: apparent)",
    "phonetic": "발음기호 (예: [əpǽrənt])",
    "partOfSpeech": "대표 품사 (예: 형용사, 동사, 명사)",
    "meaning": "한글 대표 뜻풀이 (예: 분명한, 명백한)",
    "relatedForms": "파생어 및 품사 (예: apparently (부) 명백히)",
    "paraphrase": ["동의어1", "동의어2", "패러프레이징 단어들"],
    "exampleEn": "대표 영어 예문",
    "exampleKo": "예문 한글 해석",
    "memo": "교재에 적힌 수기 메모나 지텔프 기출 출제 포인트 팁"
  }
]
`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: "application/json"
      }
    };

    // 후보 엔드포인트 목록 (순차 시도)
    const candidateUrls = [
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`
    ];

    let lastError = null;

    for (const url of candidateUrls) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const data = await response.json();
          const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
          
          let cleanJson = rawContent.trim();
          if (cleanJson.startsWith('```json')) cleanJson = cleanJson.replace(/^```json/, '');
          if (cleanJson.startsWith('```')) cleanJson = cleanJson.replace(/^```/, '');
          if (cleanJson.endsWith('```')) cleanJson = cleanJson.replace(/```$/, '');

          const parsedList = JSON.parse(cleanJson);
          return parsedList.map(item => ({
            id: `gemini-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            day: targetDay,
            no: item.no ? String(item.no).padStart(2, '0') : undefined,
            word: (item.word || '').trim().toLowerCase(),
            phonetic: item.phonetic || '',
            partOfSpeech: item.partOfSpeech || '동사',
            meaning: (item.meaning || '').trim(),
            relatedForms: item.relatedForms || '',
            paraphrase: Array.isArray(item.paraphrase) ? item.paraphrase : [],
            exampleEn: item.exampleEn || '',
            exampleKo: item.exampleKo || '',
            memo: item.memo || '',
            options: []
          }));
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData.error?.message || `HTTP ${response.status}`;
        }
      } catch (err) {
        lastError = err.message || err;
      }
    }

    throw new Error(lastError || 'Gemini AI 응답을 받지 못했습니다.');
  }

  function openOcrResultModal(detectedWords, targetDay) {
    document.getElementById('ocrDetectedCount').textContent = detectedWords.length;
    document.getElementById('ocrConfirmBtnCount').textContent = detectedWords.length;

    const listEl = document.getElementById('ocrDetectedList');
    if (!listEl) return;

    listEl.innerHTML = detectedWords.map((w, idx) => `
      <div class="ocr-word-row p-3 rounded-2xl border border-slate-200 bg-slate-50 space-y-2" data-idx="${idx}">
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
            ${idx + 1}
          </span>
          <input type="text" class="ocr-edit-word font-black text-slate-900 bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm flex-1 outline-none" value="${w.word}" placeholder="영단어">
          <input type="text" class="ocr-edit-pos font-bold text-slate-600 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs w-20 outline-none" value="${w.partOfSpeech || '동사'}" placeholder="품사">
        </div>
        <div>
          <input type="text" class="ocr-edit-meaning font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs w-full outline-none" value="${w.meaning}" placeholder="한글 뜻">
        </div>
        ${w.paraphrase && w.paraphrase.length > 0 ? `
          <div class="text-[11px] text-amber-700 font-medium">
            동의어: ${w.paraphrase.join(', ')}
          </div>
        ` : ''}
      </div>
    `).join('');

    const confirmBtn = document.getElementById('btnConfirmOcrImport');
    confirmBtn.onclick = () => {
      // 수정된 내용 수집
      const rows = document.querySelectorAll('#ocrDetectedList .ocr-word-row');
      rows.forEach(row => {
        const idx = parseInt(row.dataset.idx);
        const item = detectedWords[idx];
        if (item) {
          item.word = row.querySelector('.ocr-edit-word').value.trim();
          item.partOfSpeech = row.querySelector('.ocr-edit-pos').value.trim();
          item.meaning = row.querySelector('.ocr-edit-meaning').value.trim();
        }
      });

      // 단어장에 추가
      const validWords = detectedWords.filter(w => w.word && w.meaning);
      words.push(...validWords);
      saveWords();

      // UI 갱신
      activeDayFilter = targetDay;
      renderDayFilters();
      renderWordList();
      closeModal('ocrResultModal');
      showToast(`🎉 ${validWords.length}개의 단어가 [${targetDay}]에 성공적으로 추가되었습니다!`);
    };

    openModal('ocrResultModal');
  }

  // --------------------------------------------------------------------------
  // 9. 교재 사진 업로드 센터 & IndexedDB 저장소
  // --------------------------------------------------------------------------
  let photoDB = null;
  let activePhotoDayFilter = 'ALL';

  function initPhotoDB() {
    return new Promise((resolve) => {
      if (photoDB) return resolve(photoDB);
      const request = indexedDB.open('VocaPhotoDB', 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('photos')) {
          const store = db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true });
          store.createIndex('day', 'day', { unique: false });
        }
      };
      request.onsuccess = (e) => {
        photoDB = e.target.result;
        renderPhotoGallery();
        resolve(photoDB);
      };
      request.onerror = (e) => {
        console.error('IndexedDB error:', e);
        resolve(null);
      };
    });
  }

  function initPhotoUploadUI() {
    const daySelect = document.getElementById('uploadDaySelect');
    const customDayInput = document.getElementById('uploadCustomDayInput');
    const fileInput = document.getElementById('photoUploadInput');
    const clearBtn = document.getElementById('btnClearAllPhotos');

    daySelect?.addEventListener('change', () => {
      if (daySelect.value === 'custom') {
        customDayInput.classList.remove('hidden');
        customDayInput.focus();
      } else {
        customDayInput.classList.add('hidden');
      }
    });

    fileInput?.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      let targetDay = daySelect.value;
      if (targetDay === 'custom') {
        targetDay = customDayInput.value.trim() || '기초 필수 단어';
      }

      showToast(`📸 ${files.length}장의 사진을 안전하게 등록 중입니다...`);

      // 1. 브라우저 IndexedDB 저장 & 2. 로컬 서버(/api/upload-photo) 전송
      await initPhotoDB();
      let successCount = 0;

      for (const file of files) {
        try {
          const dataUrl = await readFileOrCompress(file);
          if (dataUrl) {
            // DB 저장
            await savePhotoToDB({
              day: targetDay,
              fileName: file.name,
              dataUrl: dataUrl,
              createdAt: new Date().toISOString()
            });

            // 서버 전송
            fetch('/api/upload-photo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                day: targetDay,
                fileName: file.name,
                dataUrl: dataUrl
              })
            }).catch(err => console.warn('Server upload notice:', err));

            successCount++;
          }
        } catch (err) {
          console.error('Image load error:', err);
        }
      }

      fileInput.value = '';
      renderPhotoGallery();

      if (successCount > 0) {
        showToast(`🎉 총 ${successCount}장의 사진이 [${targetDay}]에 성공적으로 업로드되었습니다!`);
      }
    });

    clearBtn?.addEventListener('click', () => {
      if (confirm('보관 중인 모든 교재 사진을 삭제하시겠습니까?')) {
        clearAllPhotosFromDB();
      }
    });
  }

  // 아이폰 HEIC / 일반 JPG / PNG 모두 호환되는 안전 이미지 리더
  function readFileOrCompress(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawDataUrl = e.target.result;
        // 이미지 객체 생성 시도
        const img = new Image();
        img.onload = () => {
          try {
            const maxDim = 1920;
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.85));
          } catch (err) {
            // 캔버스 에러 시 원본 데이터 반환
            resolve(rawDataUrl);
          }
        };
        img.onerror = () => {
          // HEIC 등으로 img 로드 실패 시에도 원본 base64 반환
          resolve(rawDataUrl);
        };
        img.src = rawDataUrl;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }

  async function savePhotoToDB(photoItem) {
    const db = await initPhotoDB();
    return new Promise((resolve, reject) => {
      if (!db) return resolve();
      const tx = db.transaction('photos', 'readwrite');
      const store = tx.objectStore('photos');
      const req = store.add(photoItem);
      req.onsuccess = () => resolve(req.result);
      req.onerror = (e) => reject(e);
    });
  }

  function getAllPhotosFromDB() {
    return new Promise((resolve, reject) => {
      if (!photoDB) return resolve([]);
      const tx = photoDB.transaction('photos', 'readonly');
      const store = tx.objectStore('photos');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  function deletePhotoFromDB(id) {
    return new Promise((resolve, reject) => {
      if (!photoDB) return resolve();
      const tx = photoDB.transaction('photos', 'readwrite');
      const store = tx.objectStore('photos');
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = (e) => reject(e);
    });
  }

  function clearAllPhotosFromDB() {
    if (!photoDB) return;
    const tx = photoDB.transaction('photos', 'readwrite');
    const store = tx.objectStore('photos');
    store.clear().onsuccess = () => {
      renderPhotoGallery();
      showToast('모든 교재 사진이 삭제되었습니다.');
    };
  }

  async function renderPhotoGallery() {
    const photos = await getAllPhotosFromDB();
    const countBadge = document.getElementById('uploadedPhotoCountBadge');
    if (countBadge) countBadge.textContent = `${photos.length}장`;

    // Day 목록 추출
    const daySet = new Set(photos.map(p => p.day));
    const days = ['ALL', ...Array.from(daySet).sort()];

    // Day 필터 칩 렌더링
    const filterContainer = document.getElementById('photoDayFilterContainer');
    if (filterContainer) {
      filterContainer.innerHTML = days.map(d => {
        const isActive = activePhotoDayFilter === d;
        const count = d === 'ALL' ? photos.length : photos.filter(p => p.day === d).length;
        return `
          <button class="photo-day-chip px-3 py-1 rounded-xl text-xs font-bold transition shrink-0 ${
            isActive ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }" data-day="${d}">
            ${d === 'ALL' ? '전체 보기' : d} (${count})
          </button>
        `;
      }).join('');

      filterContainer.querySelectorAll('.photo-day-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          activePhotoDayFilter = btn.dataset.day;
          renderPhotoGallery();
        });
      });
    }

    // 사진 썸네일 그리드 렌더링
    const galleryGrid = document.getElementById('photoGalleryGrid');
    if (!galleryGrid) return;

    let filtered = photos;
    if (activePhotoDayFilter !== 'ALL') {
      filtered = photos.filter(p => p.day === activePhotoDayFilter);
    }

    // 최신 등록순 정렬
    filtered.sort((a, b) => b.id - a.id);

    if (filtered.length === 0) {
      galleryGrid.innerHTML = `
        <div class="col-span-full py-10 text-center text-slate-400 space-y-2">
          <i class="fa-solid fa-image text-3xl text-slate-300"></i>
          <p class="font-bold text-xs text-slate-500">등록된 교재 사진이 없습니다.<br>위 업로드 버튼을 눌러 교재 사진을 추가해보세요!</p>
        </div>
      `;
      return;
    }

    galleryGrid.innerHTML = filtered.map(p => `
      <div class="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm aspect-[3/4] cursor-pointer">
        <img src="${p.dataUrl}" alt="${p.fileName}" class="w-full h-full object-cover group-hover:scale-105 transition duration-200" onclick="window.openPhotoPreviewModal(${p.id})">
        
        <!-- Day 라벨 -->
        <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white font-bold text-[10px] pointer-events-none">
          ${p.day}
        </span>

        <!-- 삭제 버튼 -->
        <button class="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white flex items-center justify-center text-xs shadow-md transition" onclick="event.stopPropagation(); window.deletePhotoItem(${p.id})" title="사진 삭제">
          <i class="fa-solid fa-trash-can"></i>
        </button>

        <!-- 하단 오버레이 안내 -->
        <div class="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-[11px] truncate pointer-events-none">
          ${p.fileName}
        </div>
      </div>
    `).join('');
  }

  window.openPhotoPreviewModal = async function(id) {
    const photos = await getAllPhotosFromDB();
    const item = photos.find(p => p.id === id);
    if (!item) return;

    document.getElementById('previewPhotoDay').textContent = item.day;
    document.getElementById('previewPhotoTime').textContent = new Date(item.createdAt).toLocaleDateString('ko-KR');
    
    const imgEl = document.getElementById('previewModalImg');
    imgEl.src = item.dataUrl;

    const downloadBtn = document.getElementById('btnDownloadCurrentPhoto');
    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = item.dataUrl;
      a.download = `${item.day}_${item.fileName || 'photo.jpg'}`;
      a.click();
    };

    openModal('photoPreviewModal');
  };

  window.deletePhotoItem = async function(id) {
    if (confirm('이 교재 사진을 삭제하시겠습니까?')) {
      await deletePhotoFromDB(id);
      renderPhotoGallery();
      showToast('사진이 삭제되었습니다.');
    }
  };

})();
