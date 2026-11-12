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

  let geminiApiKey = localStorage.getItem('voca_gemini_api_key') || '';

  // DOM 로드 완료 후 초기화
  document.addEventListener('DOMContentLoaded', () => {
    const APP_CURRENT_VER = 'v3.9.5_20261112_1350';
    try {
      const installedVer = localStorage.getItem('voca_installed_ver');
      if (installedVer !== APP_CURRENT_VER) {
        localStorage.setItem('voca_installed_ver', APP_CURRENT_VER);
        // 이전 버전의 손상되거나 캐시된 세션 초기화
        localStorage.removeItem('gtelp_active_learning_session');
      }
      localStorage.removeItem('gtelp_auth_state');
      sessionStorage.removeItem('gtelp_auth_state');
      localStorage.removeItem('gtelp_custom_pin_hash');
      localStorage.removeItem('gtelp_custom_pin_plain');
    } catch (e) {}
    loadData();
    initTTS();
    initUI();
    renderDayFilters();
    renderWordList();
    renderStats();

    // 클라우드 동기화 키가 등록되어 있다면 최신 데이터 자동 가져오기
    if (typeof getCloudSyncKey === 'function' && getCloudSyncKey()) {
      syncPullFromCloud(true);
    }

    // 다른 앱 작업 후 복귀하거나 재접속 시 이전 풀던 문제/카드 세션 자동 복원!
    const restored = restoreActiveLearningSession();
    if (!restored) {
      switchTab('list');
    }
  });

  // 모바일 백그라운드 전환 및 복귀 이벤트 (다른 앱 전환 시 실시간 보존 및 복귀 시 최신 동기화)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      clearQuizTimer();
      saveCurrentLearningSession();
    } else if (document.visibilityState === 'visible') {
      if (typeof syncPullFromCloud === 'function' && typeof getCloudSyncKey === 'function' && getCloudSyncKey()) {
        syncPullFromCloud(true);
      }
    }
  });
  window.addEventListener('pagehide', () => {
    clearQuizTimer();
    saveCurrentLearningSession();
  });
  window.addEventListener('beforeunload', () => {
    saveCurrentLearningSession();
  });

  // --------------------------------------------------------------------------
  // 1. 데이터 로드 & 저장소 (LocalStorage)
  // --------------------------------------------------------------------------
  const CUSTOM_MEMOS_KEY = 'voca_custom_memos';

  function getCustomMemos() {
    try {
      const saved = localStorage.getItem(CUSTOM_MEMOS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  function saveWordCustomMemo(id, memo) {
    try {
      const customMemos = getCustomMemos();
      const trimmed = (memo || '').trim();
      const initialWord = INITIAL_WORDS_DATA.find(w => w.id === id);
      const defaultMemo = initialWord ? (initialWord.memo || '').trim() : '';

      if (trimmed && trimmed !== defaultMemo) {
        customMemos[id] = trimmed;
      } else {
        delete customMemos[id];
      }
      localStorage.setItem(CUSTOM_MEMOS_KEY, JSON.stringify(customMemos));
      const target = words.find(w => w.id === id);
      if (target) {
        target.memo = trimmed || defaultMemo;
      }
      saveWords();
    } catch (e) {
      console.error('Failed to save custom memo:', e);
    }
  }

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
    const existingWordKeys = new Set();

    INITIAL_WORDS_DATA.forEach(w => {
      wordMap.set(w.id, { ...w });
      const key = `${w.day}::${(w.word || '').trim().toLowerCase()}`;
      existingWordKeys.add(key);
    });
    
    // 사용자가 로컬에서 수정한 내용이나 추가된 커스텀 단어가 있다면 병합 (단, 정식 단어와 중복되는 구버전 단어는 최신 정식 데이터 우선)
    loaded.forEach(w => {
      const normalizedDay = (w.day === '기초 01' || w.day === '기초01' || w.day === '기초 필수 단어') ? '기초단어' : w.day;
      const key = `${normalizedDay}::${(w.word || '').trim().toLowerCase()}`;
      if (!wordMap.has(w.id) && !existingWordKeys.has(key)) {
        wordMap.set(w.id, { ...w, day: normalizedDay });
        existingWordKeys.add(key);
      }
    });

    words = Array.from(wordMap.values());
    window.words = words;

    // 사용자가 작성/수정한 커스텀 암기 팁(수기 메모) 로드 및 단어별 병합
    const customMemos = getCustomMemos();
    words.forEach(w => {
      if (customMemos[w.id] !== undefined && customMemos[w.id].trim() !== '') {
        w.memo = customMemos[w.id];
      }
    });

    // '기초01', '기초 01', '기초 필수 단어'로 등록된 단어의 Day 명칭을 '기초단어'로 마이그레이션
    let wordsChanged = false;
    words.forEach(w => {
      if (w.day === '기초01' || w.day === '기초 01' || w.day === '기초 필수 단어') {
        w.day = '기초단어';
        wordsChanged = true;
      }
    });
    if (wordsChanged) {
      saveWords();
    } else {
      saveWords();
    }

    // Day별 회독 차수 초기화 및 마이그레이션 (기초단어 4지선다 1회독 반영)
    migrateDayRoundStats();

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
    if (typeof debouncedCloudPush === 'function') debouncedCloudPush();
  }

  function resetWordWrongCount(id) {
    if (wrongStats[id]) {
      delete wrongStats[id];
      saveStats();
      if (typeof debouncedCloudPush === 'function') debouncedCloudPush();
    }
  }

  // --- [Day별 회독 차수 관리] ---
  const DAY_ROUND_STATS_KEY = 'gtelp_day_round_stats';

  function getDayRoundStats() {
    try {
      const raw = localStorage.getItem(DAY_ROUND_STATS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveDayRoundStats(stats) {
    try {
      localStorage.setItem(DAY_ROUND_STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save day round stats', e);
    }
  }

  function getDayRoundCount(day, type) {
    if (!day) return 0;
    const stats = getDayRoundStats();
    if (!stats[day]) return 0;
    return Number(stats[day][type]) || 0;
  }

  function incrementDayRoundCount(day, type) {
    if (!day || ['all', 'wrong', 'selected'].includes(day)) return 0;
    const stats = getDayRoundStats();
    if (!stats[day]) stats[day] = {};
    const current = Number(stats[day][type]) || 0;
    const next = current + 1;
    stats[day][type] = next;
    saveDayRoundStats(stats);
    // 클라우드 동기화 키가 있으면 즉시 자동 업로드
    if (typeof syncPushToCloud === 'function' && typeof getCloudSyncKey === 'function' && getCloudSyncKey()) {
      syncPushToCloud(true);
    }
    return next;
  }

  function migrateDayRoundStats() {
    const stats = getDayRoundStats();
    let changed = false;

    // '기초01', '기초 01', '기초 필수 단어'가 있다면 '기초단어'로 통합
    ['기초01', '기초 01', '기초 필수 단어'].forEach(oldKey => {
      if (stats[oldKey]) {
        if (!stats['기초단어']) stats['기초단어'] = {};
        stats['기초단어'].standard = Math.max(stats['기초단어'].standard || 0, stats[oldKey].standard || 0);
        stats['기초단어'].cloze = Math.max(stats['기초단어'].cloze || 0, stats[oldKey].cloze || 0);
        delete stats[oldKey];
        changed = true;
      }
    });

    // 사용자의 "기초단어 4지선다는 1회독 완료" 반영 (최소 1회독 설정)
    if (!stats['기초단어']) {
      stats['기초단어'] = { standard: 1, cloze: 0 };
      changed = true;
    } else if (!stats['기초단어'].standard || stats['기초단어'].standard < 1) {
      stats['기초단어'].standard = 1;
      changed = true;
    }

    if (changed) {
      saveDayRoundStats(stats);
    }
  }

  function resetDayRoundStats() {
    try {
      localStorage.removeItem(DAY_ROUND_STATS_KEY);
      if (typeof syncPushToCloud === 'function' && typeof getCloudSyncKey === 'function' && getCloudSyncKey()) {
        syncPushToCloud(true);
      }
    } catch (e) {}
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

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel(); // 이전 재생 취소

      // 순수 영문과 공백/구두점만 남겨서 모바일/PC TTS 안정성 확보 (괄호 안 한글 설명 등 제거)
      let cleanText = String(text)
        .replace(/\([^\)]*\)/g, '')
        .replace(/["'“”]/g, '')
        .trim();

      if (!cleanText) cleanText = String(text).trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = ttsRate || 1.0;
      if (ttsVoice) {
        utterance.voice = ttsVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('TTS playback error:', err);
    }
  }

  // --------------------------------------------------------------------------
  // 2-B. 실전 학습 세션 자동 저장 & 이어하기 (앱 전환/재접속 대비)
  // --------------------------------------------------------------------------
  const SESSION_KEY = 'gtelp_active_learning_session';

  function saveCurrentLearningSession() {
    try {
      // 1. 일반 4지선다 퀴즈
      const quizActive = document.getElementById('quizActiveCard');
      if (currentTab === 'quiz' && quizActive && !quizActive.classList.contains('hidden') && activeQuiz && activeQuiz.questionList && activeQuiz.questionList.length > 0) {
        const data = {
          tab: 'quiz',
          type: 'standard',
          currentScope: activeQuiz.currentScope,
          scopeLabel: activeQuiz.scopeLabel,
          questionList: activeQuiz.questionList,
          currentIndex: activeQuiz.currentIndex,
          score: activeQuiz.score,
          correctCount: activeQuiz.correctCount,
          wrongList: activeQuiz.wrongList,
          answered: activeQuiz.answered,
          userAnswers: activeQuiz.userAnswers || {},
          savedAt: Date.now()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
        return;
      }

      // 2. 문장 빈칸 퀴즈 (Cloze)
      const clozeActive = document.getElementById('clozeActiveCard');
      if (currentTab === 'cloze-quiz' && clozeActive && !clozeActive.classList.contains('hidden') && activeClozeQuiz && activeClozeQuiz.questionList && activeClozeQuiz.questionList.length > 0) {
        const data = {
          tab: 'cloze-quiz',
          type: 'cloze',
          currentScope: activeClozeQuiz.currentScope,
          scopeLabel: activeClozeQuiz.scopeLabel,
          questionList: activeClozeQuiz.questionList,
          currentIndex: activeClozeQuiz.currentIndex,
          score: activeClozeQuiz.score,
          correctCount: activeClozeQuiz.correctCount,
          wrongList: activeClozeQuiz.wrongList,
          answered: activeClozeQuiz.answered,
          userAnswers: activeClozeQuiz.userAnswers || {},
          savedAt: Date.now()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
        return;
      }

      // 3. 패러프레이징 퀴즈
      const paraActive = document.getElementById('paraActiveCard');
      if (currentTab === 'paraphrase-quiz' && paraActive && !paraActive.classList.contains('hidden') && activeQuiz && activeQuiz.type === 'paraphrase' && activeQuiz.questionList && activeQuiz.questionList.length > 0) {
        const data = {
          tab: 'paraphrase-quiz',
          type: 'paraphrase',
          currentScope: activeQuiz.currentScope,
          scopeLabel: activeQuiz.scopeLabel,
          questionList: activeQuiz.questionList,
          currentIndex: activeQuiz.currentIndex,
          score: activeQuiz.score,
          correctCount: activeQuiz.correctCount,
          wrongList: activeQuiz.wrongList,
          answered: activeQuiz.answered,
          userAnswers: activeQuiz.userAnswers || {},
          savedAt: Date.now()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
        return;
      }

      // 4. 플래시카드
      const fcActive = document.getElementById('flashcardActiveCard');
      if (currentTab === 'flashcard' && fcActive && !fcActive.classList.contains('hidden') && flashcardDeck && flashcardDeck.length > 0 && flashcardCurrentIndex < flashcardDeck.length) {
        const data = {
          tab: 'flashcard',
          type: 'flashcard',
          scope: flashcardCurrentScope,
          deck: flashcardDeck,
          currentIndex: flashcardCurrentIndex,
          known: flashcardKnown,
          unknown: flashcardUnknown,
          savedAt: Date.now()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
        return;
      }
    } catch (e) {
      console.warn('Failed to save learning session:', e);
    }
  }

  function clearCurrentLearningSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
      updateResumeBanners();
    } catch (e) {}
  }

  function restoreActiveLearningSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !data.savedAt) return false;

      // 48시간 이내의 세션만 자동 복원
      if (Date.now() - data.savedAt > 48 * 60 * 60 * 1000) {
        clearCurrentLearningSession();
        return false;
      }

      if (data.tab === 'quiz' && data.type === 'standard') {
        if (!data.questionList || data.questionList.length === 0) return false;
        activeQuiz = {
          type: 'standard',
          currentScope: data.currentScope,
          scopeLabel: data.scopeLabel || '이어풀기 퀴즈',
          questionList: data.questionList,
          currentIndex: Math.min(data.currentIndex || 0, data.questionList.length - 1),
          score: data.score || 0,
          correctCount: data.correctCount || 0,
          wrongList: data.wrongList || [],
          answered: data.answered || false,
          userAnswers: data.userAnswers || {}
        };
        switchTab('quiz');
        document.getElementById('quizSetupCard')?.classList.add('hidden');
        document.getElementById('quizResultCard')?.classList.add('hidden');
        document.getElementById('quizActiveCard')?.classList.remove('hidden');
        renderCurrentStandardQuestion();
        showToast(`📍 풀던 퀴즈(${activeQuiz.currentIndex + 1}/${activeQuiz.questionList.length}번)로 바로 이어졌습니다!`);
        return true;
      }

      if (data.tab === 'cloze-quiz') {
        if (!data.questionList || data.questionList.length === 0) return false;
        activeClozeQuiz = {
          scopeLabel: data.scopeLabel || '이어풀기 빈칸',
          currentScope: data.currentScope,
          questionList: data.questionList,
          currentIndex: Math.min(data.currentIndex || 0, data.questionList.length - 1),
          score: data.score || 0,
          correctCount: data.correctCount || 0,
          wrongList: data.wrongList || [],
          answered: data.answered || false,
          userAnswers: data.userAnswers || {}
        };
        switchTab('cloze-quiz');
        document.getElementById('clozeSetupCard')?.classList.add('hidden');
        document.getElementById('clozeResultCard')?.classList.add('hidden');
        document.getElementById('clozeActiveCard')?.classList.remove('hidden');
        renderCurrentClozeQuestion();
        showToast(`📍 풀던 문장 빈칸(${activeClozeQuiz.currentIndex + 1}/${activeClozeQuiz.questionList.length}번)으로 바로 이어졌습니다!`);
        return true;
      }

      if (data.tab === 'paraphrase-quiz') {
        if (!data.questionList || data.questionList.length === 0) return false;
        activeQuiz = {
          type: 'paraphrase',
          currentScope: data.currentScope,
          scopeLabel: data.scopeLabel || '이어풀기 동의어',
          questionList: data.questionList,
          currentIndex: Math.min(data.currentIndex || 0, data.questionList.length - 1),
          score: data.score || 0,
          correctCount: data.correctCount || 0,
          wrongList: data.wrongList || [],
          answered: data.answered || false,
          userAnswers: data.userAnswers || {}
        };
        switchTab('paraphrase-quiz');
        document.getElementById('paraSetupCard')?.classList.add('hidden');
        document.getElementById('paraActiveCard')?.classList.remove('hidden');
        renderCurrentParaQuestion();
        showToast(`📍 풀던 패러프레이징(${activeQuiz.currentIndex + 1}/${activeQuiz.questionList.length}번)으로 바로 이어졌습니다!`);
        return true;
      }

      if (data.tab === 'flashcard') {
        if (!data.deck || data.deck.length === 0) return false;
        flashcardDeck = data.deck;
        flashcardCurrentIndex = Math.min(data.currentIndex || 0, data.deck.length - 1);
        flashcardCurrentScope = data.scope;
        flashcardKnown = data.known || [];
        flashcardUnknown = data.unknown || [];
        flashcardIsFlipped = false;
        switchTab('flashcard');
        document.getElementById('flashcardSetupCard')?.classList.add('hidden');
        document.getElementById('flashcardResultCard')?.classList.add('hidden');
        document.getElementById('flashcardActiveCard')?.classList.remove('hidden');
        renderCurrentFlashcard();
        showToast(`📍 보던 플래시카드(${flashcardCurrentIndex + 1}/${flashcardDeck.length}번)로 바로 이어졌습니다!`);
        return true;
      }
    } catch (e) {
      console.warn('Failed to restore learning session:', e);
    }
    return false;
  }

  function updateResumeBanners() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      const data = raw ? JSON.parse(raw) : null;
      const isValid = data && data.savedAt && (Date.now() - data.savedAt < 48 * 60 * 60 * 1000);

      // 1. Standard Quiz Banner
      const quizBanner = document.getElementById('quizResumeBanner');
      if (quizBanner) {
        if (isValid && data.tab === 'quiz' && data.questionList && data.questionList.length > 0) {
          const badge = document.getElementById('quizResumeScopeBadge');
          const progress = document.getElementById('quizResumeProgressText');
          if (badge) badge.textContent = data.scopeLabel || 'Day 01';
          if (progress) progress.textContent = `${(data.currentIndex || 0) + 1} / ${data.questionList.length}번`;
          quizBanner.classList.remove('hidden');
          const btn = document.getElementById('btnResumeQuizNow');
          if (btn) btn.onclick = () => restoreActiveLearningSession();
        } else {
          quizBanner.classList.add('hidden');
        }
      }

      // 2. Cloze Quiz Banner
      const clozeBanner = document.getElementById('clozeResumeBanner');
      if (clozeBanner) {
        if (isValid && data.tab === 'cloze-quiz' && data.questionList && data.questionList.length > 0) {
          const badge = document.getElementById('clozeResumeScopeBadge');
          const progress = document.getElementById('clozeResumeProgressText');
          if (badge) badge.textContent = data.scopeLabel || 'Day 01';
          if (progress) progress.textContent = `${(data.currentIndex || 0) + 1} / ${data.questionList.length}번`;
          clozeBanner.classList.remove('hidden');
          const btn = document.getElementById('btnResumeClozeNow');
          if (btn) btn.onclick = () => restoreActiveLearningSession();
        } else {
          clozeBanner.classList.add('hidden');
        }
      }

      // 3. Paraphrase Quiz Banner
      const paraBanner = document.getElementById('paraResumeBanner');
      if (paraBanner) {
        if (isValid && data.tab === 'paraphrase-quiz' && data.questionList && data.questionList.length > 0) {
          const badge = document.getElementById('paraResumeScopeBadge');
          const progress = document.getElementById('paraResumeProgressText');
          if (badge) badge.textContent = data.scopeLabel || 'Day 01';
          if (progress) progress.textContent = `${(data.currentIndex || 0) + 1} / ${data.questionList.length}번`;
          paraBanner.classList.remove('hidden');
          const btn = document.getElementById('btnResumeParaNow');
          if (btn) btn.onclick = () => restoreActiveLearningSession();
        } else {
          paraBanner.classList.add('hidden');
        }
      }

      // 4. Flashcard Banner
      const fcBanner = document.getElementById('flashcardResumeBanner');
      if (fcBanner) {
        if (isValid && data.tab === 'flashcard' && data.deck && data.deck.length > 0) {
          const badge = document.getElementById('flashcardResumeScopeBadge');
          const progress = document.getElementById('flashcardResumeProgressText');
          if (badge) badge.textContent = data.scope || 'Day 01';
          if (progress) progress.textContent = `${(data.currentIndex || 0) + 1} / ${data.deck.length}번`;
          fcBanner.classList.remove('hidden');
          const btn = document.getElementById('btnResumeFlashcardNow');
          if (btn) btn.onclick = () => restoreActiveLearningSession();
        } else {
          fcBanner.classList.add('hidden');
        }
      }
    } catch (e) {
      console.warn('Error updating resume banners:', e);
    }
  }

  // --------------------------------------------------------------------------
  // 3. UI 탭 전환 & 모달 제어
  // --------------------------------------------------------------------------
  window.switchTab = function (tabId) {
    saveCurrentLearningSession();
    currentTab = tabId;
    document.querySelectorAll('.nav-tab').forEach(btn => {
      const active = (btn.dataset.tab === tabId) || (tabId === 'quiz' && btn.dataset.tab === 'list');
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
      const fcActive = document.getElementById('flashcardActiveCard');
      if (fcActive && !fcActive.classList.contains('hidden') && flashcardDeck && flashcardDeck.length > 0) {
        // 이미 진행 중인 카드 화면 유지
      } else {
        setupFlashcardScopeUI();
      }
    } else if (tabId === 'quiz') {
      const quizActive = document.getElementById('quizActiveCard');
      if (quizActive && !quizActive.classList.contains('hidden') && activeQuiz && activeQuiz.type === 'standard' && activeQuiz.questionList && activeQuiz.questionList.length > 0) {
        // 이미 진행 중인 퀴즈 화면 유지
      } else {
        setupQuizScopeUI('standard');
      }
    } else if (tabId === 'cloze-quiz') {
      const clozeActive = document.getElementById('clozeActiveCard');
      if (clozeActive && !clozeActive.classList.contains('hidden') && activeClozeQuiz && activeClozeQuiz.questionList && activeClozeQuiz.questionList.length > 0) {
        // 이미 진행 중인 빈칸 퀴즈 화면 유지
      } else {
        setupClozeScopeUI();
      }
    } else if (tabId === 'paraphrase-quiz') {
      const paraActive = document.getElementById('paraActiveCard');
      if (paraActive && !paraActive.classList.contains('hidden') && activeQuiz && activeQuiz.type === 'paraphrase' && activeQuiz.questionList && activeQuiz.questionList.length > 0) {
        // 이미 진행 중인 동의어 퀴즈 화면 유지
      } else {
        setupQuizScopeUI('paraphrase');
      }
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
      if (currentTab === 'flashcard' && flashcardDeck && flashcardDeck[flashcardCurrentIndex]) {
        const cur = flashcardDeck[flashcardCurrentIndex];
        const fcInput = document.getElementById('fcBackMemoInput');
        if (fcInput && cur.memo !== undefined) {
          fcInput.value = cur.memo || '';
        }
      }
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
  // 유사품사어(파생어) 텍스트를 개별 단어 단위로 파싱하여 발음 재생이 가능한 칩으로 변환
  function parseRelatedForms(rawStr) {
    if (!rawStr || rawStr === '-' || !rawStr.trim()) return [];
    // 쉼표 뒤에 영어단어와 괄호(품사)가 오는 패턴을 기준으로 분리
    const parts = rawStr.split(/,\s*(?=[A-Za-z][A-Za-z\s\-]*\s*\()/);
    const results = [];
    parts.forEach(p => {
      const trimmed = p.trim();
      if (!trimmed) return;
      const match = trimmed.match(/^([A-Za-z][A-Za-z\s\-]*?)\s*(\([^\)]+\).*)$/);
      if (match) {
        results.push({
          word: match[1].trim(),
          desc: match[2].trim(),
          raw: trimmed
        });
      } else {
        const fallbackMatch = trimmed.match(/^([A-Za-z][A-Za-z\s\-]*)/);
        if (fallbackMatch && fallbackMatch[1].trim()) {
          const w = fallbackMatch[1].trim();
          results.push({
            word: w,
            desc: trimmed.slice(w.length).trim(),
            raw: trimmed
          });
        } else {
          results.push({
            word: '',
            desc: trimmed,
            raw: trimmed
          });
        }
      }
    });
    return results;
  }

  function renderRelatedFormsChips(rawStr, isCompact = false, parentWordId = null) {
    const list = parseRelatedForms(rawStr);
    if (list.length === 0) return '';

    return list.map(item => {
      if (!item.word) {
        return `<span class="text-slate-500">${item.desc}</span>`;
      }
      const cleanWord = item.word.replace(/'/g, "\\'");
      const regWord = words.find(w => w && w.word && w.word.toLowerCase() === item.word.toLowerCase());
      const regId = regWord ? regWord.id : '';

      return `
        <div class="inline-flex items-center rounded-lg bg-indigo-50/90 hover:bg-indigo-100 text-indigo-950 border border-indigo-200/90 shadow-2xs text-xs font-semibold overflow-hidden transition group">
          <button type="button" class="px-2 py-1 flex items-center gap-1 cursor-pointer active:scale-95 hover:text-indigo-900 touch-manipulation" onclick="event.stopPropagation(); window.openQuizOptionDetail('${regId}', '${cleanWord}', '${(item.desc || '').replace(/'/g, "\\'")}', '${parentWordId || ''}')" title="'${item.word}' 단어 상세정보 보기">
            <i class="fa-solid fa-book-open text-[10px] text-indigo-600 group-hover:scale-110 transition-transform pointer-events-none"></i>
            <span class="font-bold underline decoration-indigo-300 pointer-events-none">${item.word}</span>
            <span class="text-[9px] bg-indigo-200 text-indigo-900 font-black px-1.5 py-0.2 rounded pointer-events-none">상세</span>
            ${item.desc ? `<span class="text-[10px] text-slate-500 font-normal pointer-events-none">(${item.desc})</span>` : ''}
          </button>
          <button type="button" class="px-1.5 py-1 text-indigo-600 hover:text-indigo-950 hover:bg-indigo-200 border-l border-indigo-200 transition cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.speakText('${cleanWord}', event)" title="'${item.word}' 발음 듣기">
            <i class="fa-solid fa-volume-high text-[10px] pointer-events-none"></i>
          </button>
        </div>
      `;
    }).join(' ');
  }

  function normalizeDayName(d) {
    if (!d) return '';
    const str = String(d).trim();
    const m = str.match(/^Day\s*(\d+)$/i);
    if (m) {
      return `Day ${String(m[1]).padStart(2, '0')}`;
    }
    if (str === '기초01' || str === '기초 01' || str === '기초 필수 단어') return '기초단어';
    return str;
  }

  function getAllDays() {
    const daySet = new Set(words.map(w => normalizeDayName(w.day || 'Day 01')));
    const days = Array.from(daySet);
    return days.sort((a, b) => {
      // '기초단어'를 항상 최상단 맨 위로 배치
      if (a === '기초단어' || a === '기초01' || a === '기초 01') return -1;
      if (b === '기초단어' || b === '기초01' || b === '기초 01') return 1;
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
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
      const stdRounds = getDayRoundCount(d, 'standard');
      const clozeRounds = getDayRoundCount(d, 'cloze');
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
                ${d.startsWith('Day ') ? d.replace('Day ', '') : (d.includes('기초') ? '기초' : d.slice(0, 2))}
              </span>
              <div>
                <div class="font-black text-sm text-slate-900">${d}</div>
                <div class="text-[11px] text-slate-500">총 ${dayWords.length}단어 수록</div>
                <div class="text-[10px] text-slate-500 mt-0.5">
                  4지: <strong class="${stdRounds > 0 ? 'text-indigo-600 font-bold' : 'text-slate-400'}">${stdRounds}회독</strong> · 빈칸: <strong class="${clozeRounds > 0 ? 'text-emerald-600 font-bold' : 'text-slate-400'}">${clozeRounds}회독</strong>
                </div>
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
              <i class="fa-solid fa-play"></i> 4지${stdRounds > 0 ? ` (${stdRounds})` : ''}
            </button>
            <button onclick="window.startDayDirectQuiz('${d}', 'cloze')" class="py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition text-center">
              <i class="fa-solid fa-pen"></i> 빈칸${clozeRounds > 0 ? ` (${clozeRounds})` : ''}
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
      // Day 필터 (상단 검색창에 검색어가 비어있을 때만 Day 필터 적용)
      if (!query && activeDayFilter !== 'ALL' && normalizeDayName(w.day) !== normalizeDayName(activeDayFilter)) {
        return false;
      }
      // 검색어 필터 (영단어, 한글 뜻, 품사, 패러프레이징, 파생어, Day, 메모)
      if (query) {
        const inWord = (w.word || '').toLowerCase().includes(query);
        const inMeaning = (w.meaning || '').toLowerCase().includes(query);
        const inPos = (w.partOfSpeech || '').toLowerCase().includes(query);
        const inPara = (w.paraphrase || []).some(p => (p || '').toLowerCase().includes(query));
        const inDay = (w.day || '').toLowerCase().includes(query);
        const inRelated = (w.relatedForms || '').toLowerCase().includes(query);
        const inMemo = (w.memo || '').toLowerCase().includes(query);
        if (!inWord && !inMeaning && !inPos && !inPara && !inDay && !inRelated && !inMemo) {
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
      result.sort((a, b) => (a.word || '').localeCompare(b.word || ''));
    }

    return result;
  }

  let expandAllWordsInList = false;

  // 모바일/태블릿 등에서 브라우저 디스크 캐시 및 이전 세션을 완전히 비우고 최신 코드로 강제 새로고침하는 유틸리티
  window.forceAppUpdate = function () {
    try {
      localStorage.removeItem('gtelp_active_learning_session');
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
    } catch (e) {}
    const baseUrl = window.location.origin + window.location.pathname;
    window.location.replace(baseUrl + '?t=' + Date.now());
  };

  // 언제든 Day 전체 목차(대시보드)로 초기화하는 헬퍼 함수
  window.resetToDayFolders = function() {
    activeDayFilter = 'ALL';
    expandAllWordsInList = false;
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
    const dayDropdown = document.getElementById('dayDropdownSelect');
    if (dayDropdown) dayDropdown.value = 'ALL';
    switchTab('list');
    renderWordList();
  };

  window.selectDayFolder = function(day) {
    expandAllWordsInList = false;
    activeDayFilter = normalizeDayName(day);
    const select = document.getElementById('dayDropdownSelect');
    if (select) select.value = activeDayFilter;
    renderDayFilters();
    renderWordList();
    if (activeDayFilter !== 'ALL') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(`[${activeDayFilter}] 단어 목록을 불러왔습니다.`);
    }
  };

  window.toggleExpandAllWords = function(expand) {
    expandAllWordsInList = expand;
    renderWordList();
    if (expand) {
      showToast('1,082개 전체 단어를 한 번에 펼쳤습니다.');
    }
  };

  // Day별 묶음(폴더) 대시보드 뷰 (초고속 로딩 & 모바일 최적화)
  function renderDayFoldersView(container) {
    const days = getAllDays();
    const totalWords = words.length;

    let html = `
      <!-- Day 폴더 그리드 헤더 안내 -->
      <div class="bg-gradient-to-r from-indigo-50 via-purple-50 to-slate-50 p-4 rounded-3xl border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div class="space-y-0.5">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-[11px]">Day 선택</span>
            <span class="font-extrabold text-slate-900 text-sm">학습할 Day를 터치하세요</span>
          </div>
          <p class="text-xs text-slate-500">
            총 <strong class="text-indigo-600 font-bold">${totalWords}개 단어</strong>가 Day별 50단어로 깔끔하게 분류되어 빠른 학습과 쾌적한 반응속도를 제공합니다.
          </p>
        </div>
        <button onclick="window.toggleExpandAllWords(true)" class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-indigo-600 font-bold text-xs transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer active:scale-95">
          <i class="fa-solid fa-list text-indigo-600"></i> 전체 단어 한 번에 펼치기
        </button>
      </div>

      <!-- Day별 폴더 카드 그리드 (반응형 1열 / 2열 / 3열) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
    `;

    days.forEach(d => {
      const dayWords = words.filter(w => normalizeDayName(w.day) === normalizeDayName(d));
      const wrongCount = dayWords.filter(w => getWrongCount(w.id) > 0).length;
      const stdRounds = getDayRoundCount(d, 'standard');
      const clozeRounds = getDayRoundCount(d, 'cloze');
      const sampleWords = dayWords.slice(0, 4).map(w => w.word).join(', ');

      html += `
        <div onclick="window.selectDayFolder('${d}')" class="day-folder-card bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-400 transition cursor-pointer space-y-3 group active:scale-[0.99]">
          
          <!-- 카드 상단: Day 배지 + 단어 수 + 오답 알림 -->
          <div class="flex items-center justify-between pointer-events-none">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full ${d === '기초단어' ? 'bg-emerald-500' : 'bg-indigo-600'}"></span>
              <h4 class="font-black text-slate-900 text-base group-hover:text-indigo-600 transition flex items-center gap-1.5">
                ${d}
              </h4>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                ${dayWords.length}단어
              </span>
            </div>
            ${wrongCount > 0 ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700 flex items-center gap-1" title="오답 단어 ${wrongCount}개">
                <i class="fa-solid fa-triangle-exclamation"></i> 오답 ${wrongCount}
              </span>
            ` : `
              <span class="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition text-sm">
                <i class="fa-solid fa-chevron-right"></i>
              </span>
            `}
          </div>

          <!-- 대표 단어 미리보기 -->
          <div class="text-xs text-slate-400 font-medium truncate pointer-events-none">
            <i class="fa-solid fa-quote-left text-[10px] text-slate-300 mr-1"></i>${sampleWords}...
          </div>

          <!-- 회독 현황 뱃지 -->
          <div class="flex items-center gap-2 text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-100 pointer-events-none">
            <span class="px-1.5 py-0.5 rounded bg-slate-50 border border-slate-100 flex items-center gap-1">
              <i class="fa-solid fa-circle-check text-indigo-500 text-[10px]"></i> 4지: <strong>${stdRounds}회독</strong>
            </span>
            <span class="px-1.5 py-0.5 rounded bg-slate-50 border border-slate-100 flex items-center gap-1">
              <i class="fa-solid fa-pen text-emerald-500 text-[10px]"></i> 빈칸: <strong>${clozeRounds}회독</strong>
            </span>
          </div>

          <!-- [메인 터치 버튼: 단어 목록 보기] 터치 시 즉시 해당 Day의 50단어 전체 목록 표시 -->
          <button type="button" onclick="event.stopPropagation(); window.selectDayFolder('${d}')" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-xs sm:text-sm transition text-center shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98">
            <i class="fa-solid fa-book-open text-xs"></i>
            <span>${d} 단어 목록 보기 (${dayWords.length}단어)</span>
          </button>

          <!-- 보조 액션 버튼들 (4지선다, 문장 빈칸, 플래시카드 즉시 시작) -->
          <div class="grid grid-cols-3 gap-1.5 pt-0.5 text-[11px]">
            <button type="button" onclick="event.stopPropagation(); window.startDayDirectQuiz('${d}', 'standard')" class="py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold transition text-center shadow-2xs" title="4지선다 퀴즈">
              <i class="fa-solid fa-play text-indigo-600 text-[10px]"></i> 4지선다
            </button>
            <button type="button" onclick="event.stopPropagation(); window.startDayDirectQuiz('${d}', 'cloze')" class="py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-800 font-bold transition text-center shadow-2xs" title="빈칸 문맥 퀴즈">
              <i class="fa-solid fa-pen text-emerald-600 text-[10px]"></i> 문장 빈칸
            </button>
            <button type="button" onclick="event.stopPropagation(); window.startDayDirectQuiz('${d}', 'flashcard')" class="py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-800 font-bold transition text-center shadow-2xs" title="플래시카드 암기">
              <i class="fa-solid fa-clone text-amber-600 text-[10px]"></i> 플래시카드
            </button>
          </div>

        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  function highlightText(text, query) {
    if (!text || !query) return text || '';
    const cleanQ = query.trim();
    if (!cleanQ) return text;
    try {
      const esc = cleanQ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return String(text).replace(new RegExp(`(${esc})`, 'gi'), '<mark class="bg-amber-200 text-amber-950 px-0.5 rounded font-black">$1</mark>');
    } catch (e) {
      return text;
    }
  }

  function renderWordList() {
    const container = document.getElementById('wordList');
    const displayedCountEl = document.getElementById('displayedCount');
    if (!container) return;

    const query = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();

    // 전체보기(ALL)이고 검색어가 없으며, '전체 펼치기'를 누르지 않은 경우 -> 쾌속 Day 폴더 그리드 렌더링!
    if (activeDayFilter === 'ALL' && !query && !expandAllWordsInList) {
      if (displayedCountEl) displayedCountEl.textContent = words.length;
      renderDayFoldersView(container);
      return;
    }

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

    // 상단 네비게이션 바 (검색 결과 중이거나 특정 Day 보기 중이거나 전체 펼치기 중일 때)
    const backBarHtml = query ? `
      <div class="bg-indigo-50 p-3.5 rounded-2xl border border-indigo-200 flex items-center justify-between shadow-xs mb-1">
        <span class="text-xs text-indigo-950 font-bold flex items-center gap-1.5">
          <i class="fa-solid fa-magnifying-glass text-indigo-600"></i>
          <span>"<strong>${query}</strong>" 검색 결과: <strong class="text-indigo-600">${filteredWords.length}개</strong> 단어</span>
        </span>
        <button onclick="window.resetToDayFolders()" class="px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center gap-1 shadow-xs cursor-pointer active:scale-95">
          <i class="fa-solid fa-xmark text-slate-400"></i> 검색 닫기
        </button>
      </div>
    ` : (activeDayFilter !== 'ALL' && !query) ? `
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-3.5 rounded-2xl border border-indigo-100 flex items-center justify-between shadow-xs mb-1">
        <button onclick="window.selectDayFolder('ALL')" class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-700 font-extrabold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95">
          <i class="fa-solid fa-arrow-left"></i> 전체 Day 목록으로
        </button>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full ${activeDayFilter === '기초단어' ? 'bg-emerald-500' : 'bg-indigo-600'}"></span>
          <span class="font-black text-slate-900 text-sm">${activeDayFilter}</span>
          <span class="text-xs text-indigo-600 font-bold">(${filteredWords.length}단어)</span>
        </div>
        <div class="flex items-center gap-1.5">
          <button onclick="window.startDayDirectQuiz('${activeDayFilter}', 'standard')" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition shadow-xs cursor-pointer active:scale-95">
            <i class="fa-solid fa-play text-[10px]"></i> 퀴즈
          </button>
        </div>
      </div>
    ` : (expandAllWordsInList && !query) ? `
      <div class="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex items-center justify-between mb-1">
        <span class="text-xs text-slate-600 font-bold">1,082단어 전체가 펼쳐진 상태입니다.</span>
        <button onclick="window.toggleExpandAllWords(false)" class="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-indigo-700 font-bold text-xs transition flex items-center gap-1 shadow-xs cursor-pointer active:scale-95">
          <i class="fa-solid fa-folder-tree"></i> Day별 폴더 묶음으로 보기
        </button>
      </div>
    ` : '';

    container.innerHTML = backBarHtml + filteredWords.map(w => {
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

          <!-- 메인 단어 행: 영단어 + 발음기호 + 발음 버튼 & 한글 뜻 (절대 잘리지 않는 풀사이즈 강조 표시) -->
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4 border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">${highlightText(w.word, query)}</span>
              ${w.phonetic ? `<span class="text-xs text-slate-400 font-mono">${w.phonetic}</span>` : ''}
              <button type="button" class="tts-word-btn text-indigo-600 hover:text-indigo-800 p-1.5 rounded-full hover:bg-indigo-50 transition cursor-pointer active:scale-95" title="발음 듣기" data-word="${w.word}">
                <i class="fa-solid fa-volume-high text-sm"></i>
              </button>
            </div>
            <div class="text-base sm:text-lg font-black text-indigo-950 sm:text-right leading-snug break-words">
              ${highlightText(w.meaning, query)}
            </div>
          </div>

          <!-- 유사품사어 & 패러프레이징 칩 -->
          <div class="space-y-1.5 pt-1 text-xs border-t border-slate-100">
            ${w.relatedForms && w.relatedForms !== '-' && w.relatedForms.trim() ? `
              <div class="text-slate-500 flex items-center gap-1.5 flex-wrap">
                <span class="font-bold text-indigo-600 shrink-0"><i class="fa-solid fa-network-wired"></i> 파생:</span>
                ${renderRelatedFormsChips(w.relatedForms, true, w.id)}
              </div>
            ` : ''}

            ${paraphrases.length > 0 ? `
              <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span class="font-bold text-amber-600 shrink-0"><i class="fa-solid fa-shuffle"></i> 동의어:</span>
                ${paraphrases.map(p => {
                  const cleanP = (p || '').trim();
                  const safeP = cleanP.replace(/'/g, "\\'");
                  const regWord = words.find(item => item && item.word && item.word.toLowerCase() === cleanP.toLowerCase());
                  const regId = regWord ? regWord.id : '';
                  return `
                    <div class="inline-flex items-center rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300/80 shadow-2xs text-xs font-bold overflow-hidden transition group">
                      <button type="button" class="px-2 py-1 flex items-center gap-1 cursor-pointer active:scale-95 hover:text-amber-900 touch-manipulation" onclick="event.stopPropagation(); window.openQuizOptionDetail('${regId}', '${safeP}', '', '${w.id}')" title="'${cleanP}' 단어 상세정보 보기">
                        <i class="fa-solid fa-book-open text-[10px] text-amber-700 group-hover:scale-110 transition-transform pointer-events-none"></i>
                        <span class="underline decoration-amber-300 pointer-events-none">${highlightText(cleanP, query)}</span>
                        <span class="text-[9px] bg-amber-400 text-amber-950 font-black px-1.5 py-0.2 rounded pointer-events-none">상세</span>
                      </button>
                      <button type="button" class="px-1.5 py-1 text-amber-700 hover:text-amber-950 hover:bg-amber-200 border-l border-amber-300 transition cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.speakText('${safeP}', event)" title="'${cleanP}' 발음 듣기">
                        <i class="fa-solid fa-volume-high text-[10px] pointer-events-none"></i>
                      </button>
                    </div>
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

          <!-- 출제 포인트 & 암기 팁 미리보기 -->
          ${w.memo ? `
            <div class="p-2 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] text-purple-900 flex items-start gap-1.5 leading-snug">
              <i class="fa-solid fa-pen-nib text-purple-500 shrink-0 mt-0.5 text-[10px]"></i>
              <span class="font-medium">${w.memo}</span>
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

  function openWordDetailModal(idOrItem, pushHistory = false) {
    let item = null;
    let itemId = null;

    if (typeof idOrItem === 'object' && idOrItem !== null) {
      item = idOrItem;
      itemId = item.id || ('temp-' + (item.word || 'word'));
    } else if (typeof idOrItem === 'string') {
      itemId = idOrItem.trim();
      item = words.find(w => w && w.id === itemId);
      if (!item) {
        item = words.find(w => w && w.word && w.word.toLowerCase() === itemId.toLowerCase());
      }
      if (!item) {
        item = getWordDetailsComprehensive(itemId);
      }
    }

    if (!item) return;

    // 상세 모달 열릴 때 단어 발음 자동 재생 (화면 바뀔 때 소리 자동 재생)
    if (item.word) {
      speak(item.word);
    }

    if (pushHistory && currentDetailWordId && currentDetailWordId !== itemId) {
      modalWordHistory.push(currentDetailWordId);
    }
    currentDetailWordId = itemId;

    // 이전 단어 히스토리 버튼 표시 여부
    const backContainer = document.getElementById('modalBackWordContainer');
    const backNameEl = document.getElementById('modalBackWordName');
    if (modalWordHistory.length > 0) {
      const prevId = modalWordHistory[modalWordHistory.length - 1];
      const prevItem = words.find(w => w.id === prevId) || words.find(w => w.word === prevId);
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

    document.getElementById('modalDayBadge').textContent = item.day || '어휘 보기';
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
    
    const wrongCount = item.id ? getWrongCount(item.id) : 0;
    document.getElementById('modalWrongCount').textContent = wrongCount;

    document.getElementById('modalWord').textContent = item.word || '';
    const modalPhonetic = document.getElementById('modalPhonetic');
    if (modalPhonetic) {
      modalPhonetic.textContent = item.phonetic || '';
    }
    document.getElementById('modalMeaning').textContent = item.meaning || '';

    // 발음 버튼
    const ttsBtn = document.getElementById('modalWordTtsBtn');
    ttsBtn.onclick = () => speak(item.word);

    // 파생어
    const modalRelatedEl = document.getElementById('modalRelatedForms');
    if (modalRelatedEl) {
      if (item.relatedForms && item.relatedForms !== '-' && item.relatedForms.trim()) {
        modalRelatedEl.innerHTML = `
          <div class="flex flex-wrap gap-2">
            ${renderRelatedFormsChips(item.relatedForms, false, item.id)}
          </div>
        `;
      } else {
        modalRelatedEl.innerHTML = '<span class="text-slate-400 font-normal">등록된 유사 품사어가 없습니다.</span>';
      }
    }

    // 패러프레이징 칩 (모든 동의어 100% 유기적 상세 팝업 & 원터치 전용 발음 버튼 & '상세' 명칭 통일)
    const paraContainer = document.getElementById('modalParaphrase');
    const paraphrases = Array.isArray(item.paraphrase) ? item.paraphrase : [];
    if (paraphrases.length > 0) {
      paraContainer.innerHTML = paraphrases.map(p => {
        const cleanP = (p || '').trim();
        const safeP = cleanP.replace(/'/g, "\\'");
        const found = words.find(w => w && w.word && w.word.toLowerCase() === cleanP.toLowerCase());
        const foundId = found ? found.id : '';

        return `
          <div class="inline-flex items-center rounded-xl bg-amber-100 text-amber-950 border border-amber-300 shadow-xs hover:bg-amber-200 transition text-xs font-bold overflow-hidden">
            <button type="button" class="px-2.5 py-1.5 flex items-center gap-1.5 hover:text-amber-900 cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.openQuizOptionDetail('${foundId}', '${safeP}', '', '${item.id}')" title="'${cleanP}' 단어 상세정보 보기">
              <i class="fa-solid fa-book-open text-[11px] text-amber-700 pointer-events-none"></i>
              <span class="pointer-events-none">${cleanP}</span>
              <span class="text-[10px] bg-amber-300 text-amber-900 px-1.5 py-0.2 rounded font-black pointer-events-none">상세</span>
            </button>
            <button type="button" class="px-2 py-1.5 text-amber-700 hover:text-amber-950 hover:bg-amber-200 border-l border-amber-300 transition cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.speakText('${safeP}', event)" title="발음 듣기">
              <i class="fa-solid fa-volume-high text-[11px] pointer-events-none"></i>
            </button>
          </div>
        `;
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

    // 메모 / 암기 팁 편집창 및 자동저장 설정
    const memoInput = document.getElementById('modalMemoInput');
    const memoSaveBtn = document.getElementById('modalMemoSaveBtn');
    const memoSaveBadge = document.getElementById('modalMemoSaveBadge');
    const legacyMemoEl = document.getElementById('modalMemo');
    if (legacyMemoEl) {
      legacyMemoEl.textContent = item.memo || '등록된 추가 메모가 없습니다.';
    }

    if (memoInput) {
      memoInput.value = item.memo || '';
      
      let memoDebounceTimer = null;
      const doSaveMemo = (showToastMsg = false) => {
        const currentVal = memoInput.value.trim();
        if (item.memo !== currentVal) {
          item.memo = currentVal;
          saveWordCustomMemo(item.id, currentVal);
          if (memoSaveBadge) {
            memoSaveBadge.classList.remove('opacity-0');
            setTimeout(() => memoSaveBadge.classList.add('opacity-0'), 1500);
          }
          if (showToastMsg) {
            showToast('암기 팁이 저장되었습니다!');
          }
          renderWordList();
          if (typeof debouncedCloudPush === 'function') debouncedCloudPush();
        }
      };

      if (memoSaveBtn) {
        memoSaveBtn.onclick = () => doSaveMemo(true);
      }

      memoInput.onblur = () => {
        doSaveMemo(false);
      };

      memoInput.oninput = () => {
        if (memoDebounceTimer) clearTimeout(memoDebounceTimer);
        memoDebounceTimer = setTimeout(() => {
          doSaveMemo(false);
        }, 800);
      };
    }

    // 오답 리셋 버튼 및 단어 삭제 버튼 (정식 등록 단어에만 활성화)
    const isSynthetic = !item.id || item.isSynthetic || String(item.id).startsWith('distractor-') || String(item.id).startsWith('temp-') || String(item.id).startsWith('syn-');
    const resetWrongBtn = document.getElementById('modalResetWrongBtn');
    if (resetWrongBtn) {
      resetWrongBtn.classList.toggle('hidden', isSynthetic);
      resetWrongBtn.onclick = () => {
        resetWordWrongCount(item.id);
        document.getElementById('modalWrongCount').textContent = 0;
        renderWordList();
        showToast(`'${item.word}' 오답 횟수가 초기화되었습니다.`);
      };
    }

    // 단어 삭제 버튼
    const deleteBtn = document.getElementById('modalDeleteWordBtn');
    if (deleteBtn) {
      deleteBtn.classList.toggle('hidden', isSynthetic);
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

  window.openWordDetailModal = openWordDetailModal;
  window.openWordDetailFromSynonym = function(id) {
    openWordDetailModal(id, true);
  };

  window.speakText = function(text, e) {
    if (e && e.stopPropagation) e.stopPropagation();
    speak(text, e);
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
          const stdRounds = getDayRoundCount(day, 'standard');
          const clozeRounds = getDayRoundCount(day, 'cloze');

          return `
            <div class="p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="space-y-1.5">
                <div class="flex items-center gap-2 flex-wrap">
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

                <!-- 4지선다 & 빈칸 회독 차수 배지 -->
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${
                    stdRounds > 0 
                      ? 'bg-indigo-100 text-indigo-900 border border-indigo-200' 
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }">
                    <i class="fa-solid ${stdRounds > 0 ? 'fa-circle-check text-indigo-600' : 'fa-circle text-slate-300 text-[8px]'}"></i>
                    <span>4지선다:</span>
                    <strong class="${stdRounds > 0 ? 'text-indigo-800 font-black' : 'text-slate-400 font-medium'}">${stdRounds > 0 ? `${stdRounds}회독 완료` : '미진행'}</strong>
                  </span>

                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${
                    clozeRounds > 0 
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }">
                    <i class="fa-solid ${clozeRounds > 0 ? 'fa-circle-check text-emerald-600' : 'fa-circle text-slate-300 text-[8px]'}"></i>
                    <span>빈칸:</span>
                    <strong class="${clozeRounds > 0 ? 'text-emerald-800 font-black' : 'text-slate-400 font-medium'}">${clozeRounds > 0 ? `${clozeRounds}회독 완료` : '미진행'}</strong>
                  </span>
                </div>

                <div class="text-[11px] text-slate-500">지텔프 실전 4지선다 출제 기준 (혼동 어휘 4지선다 매칭)</div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0 flex-wrap">
                <button onclick="window.switchTab('list'); window.selectDayFolder('${day}');" class="px-2.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold text-xs flex items-center gap-1 border border-indigo-200 transition" title="단어 목록 보기">
                  <i class="fa-solid fa-book-open text-[10px]"></i>
                  <span>단어 목록</span>
                </button>
                <button onclick="window.startStandardQuiz('${day}')" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
                  <i class="fa-solid fa-play text-[10px]"></i>
                  <span>4지선다</span>
                </button>
                <button onclick="window.startDayDirectQuiz('${day}', 'cloze')" class="px-2.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200 transition" title="실전 문장 빈칸 채우기">
                  <i class="fa-solid fa-pen-to-square text-[10px]"></i>
                  <span>빈칸</span>
                </button>
                <button onclick="window.startDayDirectQuiz('${day}', 'flashcard')" class="px-2.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-800 font-bold text-xs flex items-center gap-1 border border-amber-200 transition" title="플래시카드 암기">
                  <i class="fa-solid fa-clone text-[10px]"></i>
                  <span>카드</span>
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
      updateResumeBanners();
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
      const paraRounds = getDayRoundCount(day, 'paraphrase');
      html += `
        <button class="scope-btn p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left transition" data-scope="${day}">
          <div class="flex items-center justify-between gap-1 mb-0.5">
            <span class="text-xs font-black text-slate-800">${day}</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-black ${
              paraRounds > 0 
                ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }">
              ${paraRounds > 0 ? `${paraRounds}회독` : '0회독'}
            </span>
          </div>
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
    updateResumeBanners();
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
      userAnswers: {},
      isRetry: false
    };

    document.getElementById('quizSetupCard').classList.add('hidden');
    document.getElementById('quizResultCard').classList.add('hidden');
    document.getElementById('quizActiveCard').classList.remove('hidden');

    renderCurrentStandardQuestion();
    saveCurrentLearningSession();
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

    // 만약 options가 비어있거나 4개 미만인 경우 즉시 안전 보충
    if (!options || !Array.isArray(options) || options.length < 4) {
      options = generateGtelpSmartDistractors(q, words);
    }

    // 보기 렌더링
    const optionsContainer = document.getElementById('quizOptionsContainer');
    optionsContainer.innerHTML = options.map((opt, i) => {
      const label = String.fromCharCode(65 + i); // A, B, C, D
      // 문자열 또는 객체({ word, def }) 형태 모두 지원
      const optWord = typeof opt === 'string' ? opt : (opt && opt.word ? opt.word : '');

      let btnClass = 'quiz-opt-btn w-full p-3.5 rounded-2xl border-2 font-bold transition flex items-center justify-between group ';
      let badgeClass = 'w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition ';

      if (prevAns) {
        if (optWord === q.word) {
          btnClass += 'border-emerald-500 bg-emerald-50 text-emerald-900';
          badgeClass += 'bg-emerald-600 text-white';
        } else if (optWord === prevAns.selectedWord && !prevAns.isCorrect) {
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
        <button class="${btnClass}" data-word="${optWord}" ${prevAns ? 'disabled' : ''}>
          <div class="flex items-center gap-3">
            <span class="${badgeClass}">
              ${label}
            </span>
            <span class="text-base text-slate-900">${optWord}</span>
          </div>
          <!-- 보기 발음 듣기 아이콘 -->
          <span class="tts-quiz-opt p-1.5 text-slate-300 hover:text-indigo-600 transition" title="발음 듣기" data-word="${optWord}">
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
    saveCurrentLearningSession();
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
    saveCurrentLearningSession();
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

    // 정답 단어 전체 상세정보 열기 버튼
    const openTargetBtn = document.getElementById('quizBtnOpenTargetDetail');
    if (openTargetBtn) {
      openTargetBtn.onclick = () => window.openQuizOptionDetail(q.id, q.word, q.meaning);
    }

    // 정답 발음 버튼
    const ttsTargetBtn = document.getElementById('quizTtsTargetWordBtn');
    if (ttsTargetBtn) {
      ttsTargetBtn.onclick = () => speak(q.word);
    }

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

    // 보기 4단어 뜻풀이 리스트 (모든 보기 단어 100% 상세정보 팝업 & 원터치 터치 지원)
    const reviewList = document.getElementById('quizReviewOptionsList');
    reviewList.innerHTML = options.map(opt => {
      const optWord = typeof opt === 'string' ? opt : (opt && opt.word ? opt.word : '');
      const isTarget = optWord.toLowerCase() === (q.word || '').toLowerCase();
      const registeredItem = words.find(w => w && w.word && w.word.toLowerCase() === optWord.toLowerCase());
      const optDef = (typeof opt === 'object' && opt && opt.def) 
        ? opt.def 
        : (registeredItem ? registeredItem.meaning : (opt.meaning || ''));

      const safeDefForAttr = (optDef || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const registeredId = registeredItem ? registeredItem.id : '';

      return `
        <div class="flex items-center justify-between p-3 rounded-2xl ${
          isTarget ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-bold' : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700'
        } border shadow-xs transition gap-2 cursor-pointer group active:scale-[0.99]" onclick="window.openQuizOptionDetail('${registeredId}', '${optWord}', '${safeDefForAttr}')">
          
          <!-- 단어 및 뜻 (터치 시 상세 모달 오픈, 스피커 클릭 시 발음 재생) -->
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <button type="button" class="text-indigo-600 hover:text-indigo-800 p-1.5 rounded-lg hover:bg-indigo-50 transition shrink-0" title="발음 듣기" onclick="event.stopPropagation(); window.speakText('${optWord}', event)">
              <i class="fa-solid fa-volume-high text-xs"></i>
            </button>
            <div class="min-w-0">
              <span class="font-black text-slate-900 tracking-tight text-sm">${optWord}</span>
              <span class="text-slate-600 text-xs truncate ml-1">: ${optDef}</span>
            </div>
          </div>

          <!-- 상태 및 상세 팝업 버튼 -->
          <div class="flex items-center gap-1.5 shrink-0">
            ${isTarget ? '<span class="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black">정답</span>' : ''}
            
            <button type="button" onclick="event.stopPropagation(); window.openQuizOptionDetail('${registeredId}', '${optWord}', '${safeDefForAttr}')" class="px-2.5 py-1 rounded-xl ${
              isTarget ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700'
            } font-bold text-xs flex items-center gap-1 transition shadow-xs border border-indigo-200 cursor-pointer active:scale-95" title="'${optWord}' 상세 예문/파생어/암기팁 보기">
              <i class="fa-solid fa-book-open text-[11px]"></i>
              <span>상세</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // 출제 팁 & 핵심 포인트 (등록된 메모가 없으면 파생어/동의어/출제 팁 자동 보강)
    const tipSection = document.getElementById('quizTipSection');
    const tipText = document.getElementById('quizTipText');
    if (q.memo && q.memo.trim()) {
      tipSection.classList.remove('hidden');
      tipText.textContent = q.memo;
    } else if (q.relatedForms && q.relatedForms !== '-' && q.relatedForms.trim()) {
      tipSection.classList.remove('hidden');
      tipText.innerHTML = `<strong>[파생어/형태]</strong> ${q.relatedForms}`;
    } else if (Array.isArray(q.paraphrase) && q.paraphrase.length > 0) {
      tipSection.classList.remove('hidden');
      tipText.innerHTML = `<strong>[핵심 동의어]</strong> ${q.paraphrase.join(', ')}`;
    } else {
      tipSection.classList.remove('hidden');
      tipText.innerHTML = `<strong>[지텔프 핵심 어휘]</strong> "${q.word}" (${q.partOfSpeech || '어휘'}) - 주요 뜻: ${q.meaning}`;
    }

    // 모바일에서 풀이 직후 해설창이 한눈에 보이도록 자동 부드러운 스크롤
    setTimeout(() => {
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 120);

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
    clearQuizTimer();
    clearCurrentLearningSession();
    document.getElementById('quizActiveCard').classList.add('hidden');
    document.getElementById('quizResultCard').classList.remove('hidden');

    const total = activeQuiz.questionList.length;
    const correct = activeQuiz.correctCount;
    const wrong = activeQuiz.wrongList.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    document.getElementById('resultCorrectCount').textContent = correct;
    document.getElementById('resultWrongCount').textContent = wrong;
    document.getElementById('resultAccuracy').textContent = accuracy;

    // 4지선다 Day별 회독 차수 카운트 & 결과 배지 표시
    const roundBadge = document.getElementById('quizResultRoundBadge');
    const roundText = document.getElementById('quizResultRoundText');
    const isSpecialScope = ['all', 'wrong', 'selected'].includes(activeQuiz.currentScope);
    if (!activeQuiz.isRetry && activeQuiz.currentScope && !isSpecialScope) {
      const newRound = incrementDayRoundCount(activeQuiz.currentScope, 'standard');
      if (roundBadge && roundText) {
        roundText.textContent = `${activeQuiz.currentScope} 4지선다 ${newRound}회독 달성! 🎉`;
        roundBadge.classList.remove('hidden');
      }
      showToast(`${activeQuiz.currentScope} 4지선다 ${newRound}회독 달성! 👏`);
    } else {
      if (roundBadge) roundBadge.classList.add('hidden');
    }

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
        activeQuiz.isRetry = true;
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
    saveCurrentLearningSession();
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
    saveCurrentLearningSession();
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
    saveCurrentLearningSession();
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

    // 전체 동의어 목록 (모든 동의어 단어 상세정보 팝업 & 발음 버튼 & '상세' 명칭 통일)
    const synList = document.getElementById('paraAllSynonyms');
    synList.innerHTML = q.paraphrase.map(p => {
      const cleanP = (p || '').trim();
      const safeP = cleanP.replace(/'/g, "\\'");
      const found = words.find(w => w && w.word && w.word.toLowerCase() === cleanP.toLowerCase());
      const idParam = found ? found.id : '';
      return `
        <div class="inline-flex items-center rounded-xl bg-amber-100 text-amber-950 border border-amber-300 shadow-xs hover:bg-amber-200 transition text-xs font-bold overflow-hidden">
          <button type="button" class="px-2.5 py-1.5 flex items-center gap-1.5 hover:text-amber-900 cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.openQuizOptionDetail('${idParam}', '${safeP}', '', '${q.id}')" title="'${cleanP}' 단어 상세정보 보기">
            <i class="fa-solid fa-book-open text-[11px] text-amber-700 pointer-events-none"></i>
            <span class="pointer-events-none">${cleanP}</span>
            <span class="text-[10px] bg-amber-300 text-amber-900 px-1.5 py-0.2 rounded font-black pointer-events-none">상세</span>
          </button>
          <button type="button" class="px-2 py-1.5 text-amber-700 hover:text-amber-950 hover:bg-amber-200 border-l border-amber-300 transition cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.speakText('${safeP}', event)" title="발음 듣기">
            <i class="fa-solid fa-volume-high text-[11px] pointer-events-none"></i>
          </button>
        </div>
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
          clearCurrentLearningSession();
          const isSpecialParaScope = ['all', 'wrong', 'selected'].includes(activeQuiz.currentScope);
          if (!activeQuiz.isRetry && activeQuiz.currentScope && !isSpecialParaScope) {
            const newRound = incrementDayRoundCount(activeQuiz.currentScope, 'paraphrase');
            showToast(`${activeQuiz.currentScope} 패러프레이징 ${newRound}회독 달성! 🎉`);
          }
          alert(`패러프레이징 퀴즈 완료! 맞힌 문제: ${activeQuiz.correctCount} / ${activeQuiz.questionList.length}`);
          document.getElementById('paraActiveCard').classList.add('hidden');
          document.getElementById('paraSetupCard').classList.remove('hidden');
          setupQuizScopeUI('paraphrase');
        }
      };
    }
  }

  // 모든 단어(동의어, 파생어, 혼동 어휘)를 유기적으로 연결하여 100% 상세정보를 구성하는 엔진
  function getWordDetailsComprehensive(wordOrId, contextParent = null) {
    if (!wordOrId) return null;
    const clean = String(wordOrId).trim();
    const cleanLower = clean.toLowerCase();

    // 1. 직접 ID 매칭
    let found = words.find(w => w && w.id === clean);
    // 2. 정확한 영단어 매칭
    if (!found) {
      found = words.find(w => w && w.word && w.word.toLowerCase() === cleanLower);
    }
    // 3. 기호/공백 정규화 매칭
    if (!found) {
      const cleanAlpha = cleanLower.replace(/[^a-z]/g, '');
      if (cleanAlpha.length >= 2) {
        found = words.find(w => w && w.word && w.word.toLowerCase().replace(/[^a-z]/g, '') === cleanAlpha);
      }
    }

    if (found) {
      return { ...found, isRegistered: true };
    }

    // 4. 단어장에 직접 등록되지 않은 동의어/파생어인 경우:
    // 이 단어가 어느 부모 단어의 paraphrase 또는 relatedForms에 속해있는지 유기적 역방향 탐색!
    let parent = contextParent;
    if (!parent || !parent.word) {
      // paraphrase에서 역탐색
      parent = words.find(w => Array.isArray(w.paraphrase) && w.paraphrase.some(p => (p || '').toLowerCase() === cleanLower));
    }
    if (!parent) {
      // relatedForms에서 역탐색
      parent = words.find(w => w.relatedForms && w.relatedForms.toLowerCase().includes(cleanLower));
    }

    // 파생어인 경우 파생어 뜻 파싱 시도
    let relatedDesc = '';
    if (parent && parent.relatedForms) {
      const parsedList = parseRelatedForms(parent.relatedForms);
      const match = parsedList.find(rf => (rf.word || '').toLowerCase() === cleanLower);
      if (match && match.desc) {
        relatedDesc = match.desc;
      }
    }

    let meaning = '';
    let partOfSpeech = '어휘';
    let exampleEn = '';
    let exampleKo = '';
    let memo = '';

    if (parent) {
      if (relatedDesc) {
        meaning = `${relatedDesc} ("${parent.word}"의 파생어)`;
        partOfSpeech = relatedDesc.includes('명') ? '명사' : (relatedDesc.includes('형') ? '형용사' : (relatedDesc.includes('부') ? '부사' : (parent.partOfSpeech || '어휘')));
      } else {
        meaning = `${parent.meaning} ("${parent.word}"의 핵심 동의어)`;
        partOfSpeech = parent.partOfSpeech || '어휘';
      }

      // 예문 생성: 부모 단어의 예문에서 부모 단어를 해당 동의어로 치환하거나 문맥 제공!
      if (parent.exampleEn) {
        try {
          const escapedWord = (parent.word || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp('\\b' + escapedWord + '\\b', 'gi');
          if (regex.test(parent.exampleEn)) {
            exampleEn = parent.exampleEn.replace(regex, clean);
            exampleKo = parent.exampleKo || '';
          } else {
            exampleEn = `${parent.exampleEn}`;
            exampleKo = `${parent.exampleKo || ''} (동의어: ${clean} ↔ ${parent.word})`;
          }
        } catch (e) {
          exampleEn = parent.exampleEn || '';
          exampleKo = parent.exampleKo || '';
        }
      }

      memo = `[지텔프 핵심 포인트] "${parent.word}" (${parent.meaning})와 상호 치환 출제되는 필수 패러프레이징/파생어 표현입니다.`;
    } else {
      meaning = '지텔프 기출 핵심 연계 어휘';
      partOfSpeech = '어휘';
      memo = '지텔프 기출 4지선다 보기 및 패러프레이징 연계 어휘입니다.';
    }

    return {
      id: 'syn-' + cleanLower.replace(/[^a-z0-9]/g, '-'),
      word: clean,
      phonetic: '',
      partOfSpeech: partOfSpeech,
      meaning: meaning,
      relatedForms: parent ? `${parent.word} (${parent.partOfSpeech || '원문'})` : '-',
      paraphrase: parent ? [parent.word, ...(parent.paraphrase || []).filter(p => (p || '').toLowerCase() !== cleanLower)] : [],
      exampleEn: exampleEn,
      exampleKo: exampleKo,
      memo: memo,
      day: parent ? `${parent.day || 'Day'} 연계` : '기출 연계',
      no: parent ? (parent.no ? `No.${parent.no} 관련` : '') : '',
      isSynthetic: true,
      parentWord: parent ? parent.word : null,
      parentId: parent ? parent.id : null
    };
  }

  window.openQuizOptionDetail = function(id, word, fallbackDef = '', contextParent = null) {
    const cleanWord = (word || '').trim();
    if (cleanWord) speak(cleanWord);

    // 부모 단어 식별 (문맥 파악용 - 객체 또는 문자열 ID 지원)
    let parent = null;
    if (contextParent && typeof contextParent === 'object') {
      parent = contextParent;
    } else if (typeof contextParent === 'string' && contextParent.trim()) {
      const pid = contextParent.trim().toLowerCase();
      parent = words.find(w => w && (w.id === pid || (w.word && w.word.toLowerCase() === pid)));
    }

    // 플래시카드 현재 단어 또는 퀴즈의 현재 문제 단어를 contextParent로 자동 활용
    if (!parent) {
      if (currentTab === 'flashcard' && flashcardDeck && flashcardDeck[flashcardCurrentIndex]) {
        parent = flashcardDeck[flashcardCurrentIndex];
      } else if (currentTab === 'quiz' && activeQuiz && activeQuiz.questionList) {
        parent = activeQuiz.questionList[activeQuiz.currentIndex];
      } else if (currentTab === 'cloze-quiz' && activeClozeQuiz && activeClozeQuiz.questionList) {
        parent = activeClozeQuiz.questionList[activeClozeQuiz.currentIndex];
      }
    }

    const detailItem = getWordDetailsComprehensive(id || cleanWord, parent);
    if (detailItem) {
      if (fallbackDef && (!detailItem.meaning || detailItem.meaning.includes('관련 어휘') || detailItem.meaning.includes('핵심 동의어'))) {
        detailItem.meaning = fallbackDef;
      }
      openWordDetailModal(detailItem, true);
    }
  };

  window.openWordComprehensiveDetail = window.openQuizOptionDetail;

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
    initCloudSyncUI();

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

    // 상단 상시 고정 검색
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    searchInput?.addEventListener('input', () => {
      const val = (searchInput.value || '').trim();
      clearSearchBtn.classList.toggle('hidden', !val);
      if (val) {
        // 어느 탭(퀴즈, 플래시카드, 통계 등)에 있든 즉시 단어 검색 뷰로 자동 전환
        if (currentTab !== 'list') {
          switchTab('list');
        }
        expandAllWordsInList = true;
      } else {
        expandAllWordsInList = false;
      }
      renderWordList();
    });
    clearSearchBtn?.addEventListener('click', () => {
      searchInput.value = '';
      clearSearchBtn.classList.add('hidden');
      expandAllWordsInList = false;
      renderWordList();
      searchInput.focus();
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
        clearCurrentLearningSession();
        document.getElementById('quizActiveCard').classList.add('hidden');
        document.getElementById('quizSetupCard').classList.remove('hidden');
      }
    });

    document.getElementById('btnBackToQuizSetup')?.addEventListener('click', () => {
      clearCurrentLearningSession();
      document.getElementById('quizResultCard').classList.add('hidden');
      document.getElementById('quizSetupCard').classList.remove('hidden');
      setupQuizScopeUI('standard');
    });

    // 플래시카드 이벤트
    document.getElementById('btnStartFlashcard')?.addEventListener('click', () => {
      const scope = getSelectedScope('flashcard');
      startFlashcard(scope);
    });

    document.getElementById('btnQuitFlashcard')?.addEventListener('click', () => {
      if (confirm('플래시카드 학습을 잠시 중단하시겠습니까? (현재 보던 위치가 자동 저장됩니다)')) {
        saveFlashcardProgress(flashcardCurrentScope, flashcardCurrentIndex);
        saveCurrentLearningSession();
        document.getElementById('flashcardActiveCard').classList.add('hidden');
        document.getElementById('flashcardSetupCard').classList.remove('hidden');
        setupFlashcardScopeUI();
      }
    });

    document.getElementById('btnFcResetToStart')?.addEventListener('click', (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      if (confirm('첫 번째 단어(1번)부터 다시 시작하시겠습니까?')) {
        flashcardCurrentIndex = 0;
        saveFlashcardProgress(flashcardCurrentScope, 0);
        saveCurrentLearningSession();
        renderCurrentFlashcard();
        showToast('1번 단어로 이동했습니다.');
      }
    });

    document.getElementById('btnFcWrong')?.addEventListener('click', () => {
      handleFlashcardAnswer(false);
    });

    document.getElementById('btnFcNext')?.addEventListener('click', () => {
      handleFlashcardNext();
    });

    document.getElementById('btnFcPrev')?.addEventListener('click', () => {
      handleFlashcardPrev();
    });

    document.getElementById('btnFcPrevBottom')?.addEventListener('click', () => {
      handleFlashcardPrev();
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
        clearCurrentLearningSession();
        document.getElementById('clozeActiveCard').classList.add('hidden');
        document.getElementById('clozeSetupCard').classList.remove('hidden');
      }
    });

    document.getElementById('btnBackToClozeSetup')?.addEventListener('click', () => {
      clearCurrentLearningSession();
      document.getElementById('clozeResultCard').classList.add('hidden');
      document.getElementById('clozeSetupCard').classList.remove('hidden');
      setupClozeScopeUI();
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
        clearCurrentLearningSession();
        document.getElementById('paraActiveCard').classList.add('hidden');
        document.getElementById('paraSetupCard').classList.remove('hidden');
      }
    });

    // 오답 통계에서 "오답 단어만 전체 퀴즈 풀기"
    document.getElementById('btnQuizAllWrongWords')?.addEventListener('click', () => {
      switchTab('quiz');
      startStandardQuiz('wrong');
    });

    // 상단 아이콘 모달 오픈 & 전체화면 토글
    document.getElementById('ttsSettingsBtn')?.addEventListener('click', () => openModal('ttsSettingsModal'));
    document.getElementById('dataManageBtn')?.addEventListener('click', () => openModal('dataManageModal'));
    document.getElementById('btnToggleFullscreen')?.addEventListener('click', () => toggleFullscreen());
    document.getElementById('closeDetailModalBtn')?.addEventListener('click', () => closeModal('wordDetailModal'));

    // 데이터 백업 내보내기
    document.getElementById('btnExportData')?.addEventListener('click', () => {
      const backupData = {
        words: words,
        customMemos: getCustomMemos(),
        wrongStats: wrongStats,
        dayRoundStats: getDayRoundStats(),
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
          let newWordsList = null;
          if (Array.isArray(imported)) {
            newWordsList = imported;
          } else if (imported.words && Array.isArray(imported.words)) {
            newWordsList = imported.words;
          }

          if (newWordsList) {
            words = newWordsList.map((item, idx) => {
              const day = (item.day === '기초 01' || item.day === '기초01' || item.day === '기초 필수 단어') ? '기초단어' : (item.day || 'Day 01');
              let id = item.id;
              if (!id) {
                const noStr = item.no ? String(item.no).padStart(2, '0') : String(idx + 1).padStart(2, '0');
                if (day === '기초단어') {
                  id = `basic-${noStr}`;
                } else if (day.startsWith('Day ')) {
                  const dayNum = day.replace('Day ', '').padStart(2, '0');
                  id = `d${dayNum}-${noStr}`;
                } else {
                  id = `custom-${Date.now()}-${idx}`;
                }
              }
              return {
                id: id,
                day: day,
                no: item.no ? String(item.no).padStart(2, '0') : String(idx + 1).padStart(2, '0'),
                word: item.word || '',
                phonetic: item.phonetic || '',
                partOfSpeech: item.partOfSpeech || '품사',
                meaning: item.meaning || '',
                relatedForms: item.relatedForms || '-',
                paraphrase: Array.isArray(item.paraphrase) ? item.paraphrase : (item.paraphrase ? [item.paraphrase] : []),
                exampleEn: item.exampleEn || '',
                exampleKo: item.exampleKo || '',
                memo: item.memo || '',
                options: item.options || undefined
              };
            });
            saveWords();
          }
          if (imported.wrongStats) {
            wrongStats = imported.wrongStats;
            saveStats();
          }
          if (imported.customMemos && typeof imported.customMemos === 'object') {
            localStorage.setItem(CUSTOM_MEMOS_KEY, JSON.stringify(imported.customMemos));
            words.forEach(w => {
              if (imported.customMemos[w.id] !== undefined) {
                w.memo = imported.customMemos[w.id];
              }
            });
          }
          if (imported.dayRoundStats) {
            saveDayRoundStats(imported.dayRoundStats);
          }
          renderDayFilters();
          renderWordList();
          renderStats();
          setupQuizScopeUI('standard');
          setupClozeScopeUI();
          renderDayGridModal();
          closeModal('dataManageModal');
          if (typeof syncPushToCloud === 'function' && typeof getCloudSyncKey === 'function' && getCloudSyncKey()) {
            syncPushToCloud(true);
          }
          showToast(`총 ${words.length}개 단어 데이터가 성공적으로 등록되었습니다!`);
        } catch (err) {
          alert('올바른 백업 JSON 파일이 아닙니다.');
        }
      };
      reader.readAsText(file);
    });

    // Day별 회독 차수 초기화
    document.getElementById('btnResetDayRounds')?.addEventListener('click', () => {
      if (confirm('모든 Day의 4지선다 및 빈칸 문제 회독 차수를 0회로 초기화하시겠습니까?')) {
        resetDayRoundStats();
        setupQuizScopeUI('standard');
        setupQuizScopeUI('paraphrase');
        setupClozeScopeUI();
        setupFlashcardScopeUI();
        renderDayGridModal();
        closeModal('dataManageModal');
        showToast('Day별 회독 기록이 초기화되었습니다.');
      }
    });

    // 전체 오답 기록 초기화
    document.getElementById('btnResetAllStats')?.addEventListener('click', () => {
      if (confirm('모든 단어의 오답 기록을 0회로 초기화하시겠습니까?')) {
        wrongStats = {};
        saveStats();
        if (typeof syncPushToCloud === 'function' && typeof getCloudSyncKey === 'function' && getCloudSyncKey()) {
          syncPushToCloud(true);
        }
        renderWordList();
        renderStats();
        closeModal('dataManageModal');
        showToast('전체 오답 기록이 초기화되었습니다.');
      }
    });
  }

  // --- [태블릿/모바일 전체화면 (Fullscreen) 기능] ---
  function isCurrentlyFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  }

  function toggleFullscreen() {
    const doc = document;
    const docEl = document.documentElement;

    if (!isCurrentlyFullscreen()) {
      const request = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
      if (request) {
        request.call(docEl).then(() => {
          showToast('🖥️ 전체화면 모드로 전환되었습니다.');
        }).catch(() => {
          showToast('🖥️ 전체화면 모드로 전환되었습니다.');
        });
      } else {
        alert('현재 브라우저에서는 전체화면 버튼 API를 직접 지원하지 않습니다.\n\n💡 팁: 태블릿 브라우저 메뉴(공유/설정)에서 [홈 화면에 추가]를 하시면 상단 주소창과 툴바가 완전히 사라진 깔끔한 전체화면 앱으로 이용하실 수 있습니다!');
      }
    } else {
      const exit = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;
      if (exit) {
        exit.call(doc).then(() => {
          showToast('전체화면이 해제되었습니다.');
        }).catch(() => {});
      }
    }
  }

  function updateFullscreenUI() {
    const isFs = isCurrentlyFullscreen();
    const icon = document.getElementById('fullscreenIcon');
    const btn = document.getElementById('btnToggleFullscreen');
    if (icon) {
      icon.className = isFs ? 'fa-solid fa-compress text-sm' : 'fa-solid fa-expand text-sm';
    }
    if (btn) {
      btn.title = isFs ? '전체화면 종료' : '전체화면으로 보기 (툴바 숨기기)';
      if (isFs) {
        btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-600');
        btn.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
      } else {
        btn.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-600');
        btn.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
      }
    }
  }

  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(ev => {
    document.addEventListener(ev, updateFullscreenUI);
  });

  window.toggleFullscreen = toggleFullscreen;

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

    // 영단어 AI / 사전 자동 채우기 이벤트
    const autoLookupBtn = document.getElementById('btnAutoLookupWord');
    const autoLookupIcon = document.getElementById('iconAutoLookup');
    const autoLookupText = document.getElementById('textAutoLookup');
    const wordInput = document.getElementById('newWordText');

    async function handleAutoLookup() {
      const word = (wordInput?.value || '').trim();
      if (!word) {
        alert('먼저 영단어를 입력해주세요.');
        wordInput?.focus();
        return;
      }

      try {
        if (autoLookupIcon) autoLookupIcon.className = 'fa-solid fa-spinner fa-spin text-amber-300';
        if (autoLookupText) autoLookupText.textContent = '단어 정보 분석 중...';
        if (autoLookupBtn) autoLookupBtn.disabled = true;

        const info = await autoLookupWordInfo(word);
        if (info) {
          if (info.partOfSpeech) document.getElementById('newWordPos').value = info.partOfSpeech;
          if (info.meaning) document.getElementById('newWordMeaning').value = info.meaning;
          if (info.phonetic) document.getElementById('newWordPhonetic').value = info.phonetic;
          if (info.paraphrase) {
            const paraVal = Array.isArray(info.paraphrase) ? info.paraphrase.join(', ') : info.paraphrase;
            document.getElementById('newWordParaphrase').value = paraVal;
          }
          if (info.relatedForms) document.getElementById('newWordRelated').value = info.relatedForms;
          if (info.exampleEn) document.getElementById('newWordExampleEn').value = info.exampleEn;
          if (info.exampleKo) document.getElementById('newWordExampleKo').value = info.exampleKo;
          if (info.memo) document.getElementById('newWordMemo').value = info.memo;
          showToast(`'${word}' 단어 정보가 자동으로 완성되었습니다! 검토 후 필요시 수정하세요.`);
        } else {
          showToast('사전에서 정보를 찾지 못했습니다. 직접 입력해주세요.');
        }
      } catch (err) {
        console.error('Auto lookup error:', err);
        showToast('단어 자동 조회 중 오류가 발생했습니다.');
      } finally {
        if (autoLookupIcon) autoLookupIcon.className = 'fa-solid fa-wand-magic-sparkles text-amber-300';
        if (autoLookupText) autoLookupText.textContent = 'AI / 사전 자동 채우기';
        if (autoLookupBtn) autoLookupBtn.disabled = false;
      }
    }

    autoLookupBtn?.addEventListener('click', handleAutoLookup);
    wordInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAutoLookup();
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      let targetDay = daySelect.value;
      if (targetDay === 'custom') {
        targetDay = customDayInput.value.trim() || '기초단어';
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
      if (typeof syncPushToCloud === 'function' && typeof getCloudSyncKey === 'function' && getCloudSyncKey()) {
        syncPushToCloud(true);
      }

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
  // 8-0. 영단어 AI / 사전 자동 완성 엔진 (Gemini AI + 무료 공개 사전 이중 지원)
  // --------------------------------------------------------------------------
  async function autoLookupWordInfo(word) {
    const cleanWord = (word || '').trim().toLowerCase();
    if (!cleanWord) return null;

    // 1. 이미 등록된 1,082개 공식 데이터셋에 있다면 검증된 고품질 교재 데이터 즉시 활용
    const existing = words.find(w => (w.word || '').trim().toLowerCase() === cleanWord);
    if (existing) {
      return {
        partOfSpeech: existing.partOfSpeech || '명사',
        meaning: existing.meaning || '',
        phonetic: existing.phonetic || '',
        paraphrase: existing.paraphrase || [],
        relatedForms: existing.relatedForms || '',
        exampleEn: existing.exampleEn || '',
        exampleKo: existing.exampleKo || '',
        memo: existing.memo || ''
      };
    }

    // 2. Gemini API 키가 있다면 지텔프 기출 맞춤형 초고성능 AI 분석 호출
    if (geminiApiKey) {
      try {
        const geminiData = await fetchGeminiWordAnalysis(cleanWord);
        if (geminiData && geminiData.meaning) {
          return geminiData;
        }
      } catch (err) {
        console.warn('Gemini lookup fallback to public dictionary:', err);
      }
    }

    // 3. 무료 공개 사전 API 및 Google 번역 백업 조회 (별도 API 키 없이 즉시 작동)
    return await fetchFreeDictionaryWordInfo(cleanWord);
  }

  // Gemini 기반 지텔프 맞춤 단어 분석
  async function fetchGeminiWordAnalysis(word) {
    if (!geminiApiKey) return null;
    let modelName = 'gemini-2.0-flash';
    try {
      if (typeof getBestGeminiModel === 'function') {
        modelName = await getBestGeminiModel(geminiApiKey);
      }
    } catch (e) {}

    const promptText = `너는 지텔프(G-TELP) 시험 전문 어학 사전 AI야. 영단어 "${word}"를 분석해서 지텔프 시험에 최적화된 아래 JSON 규격의 단일 JSON 객체(Object) 하나만 출력해줘. 코드블록(\`\`\`json)이나 부연 설명 없이 오직 JSON만 반환해야 해:
{
  "partOfSpeech": "대표 품사 (예: 동사, 형용사, 명사, 부사)",
  "meaning": "지텔프 시험에 알맞은 대표 한글 뜻풀이 1~2개",
  "phonetic": "[발음기호]",
  "relatedForms": "주요 파생어 및 품사 (예: 파생단어 (형) 뜻)",
  "paraphrase": ["핵심동의어1", "동의어2", "동의어3", "동의어4"],
  "exampleEn": "지텔프 수준의 자연스러운 영어 예문",
  "exampleKo": "위 영어 예문의 자연스러운 한글 번역",
  "memo": "혼동 어휘 주의점이나 지텔프 출제 팁"
}`;

    const candidateUrls = [
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`
    ];

    for (const url of candidateUrls) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { temperature: 0.1 }
          })
        });
        if (res.ok) {
          const json = await res.json();
          const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
          const firstBrace = cleaned.indexOf('{');
          const lastBrace = cleaned.lastIndexOf('}');
          if (firstBrace >= 0 && lastBrace >= 0) {
            return JSON.parse(cleaned.substring(firstBrace, lastBrace + 1));
          }
        }
      } catch (err) {}
    }
    return null;
  }

  // 무료 공개 사전 + Google 번역 단어 정보 수집 (API 키 불필요)
  async function fetchFreeDictionaryWordInfo(word) {
    let phonetic = '';
    let partOfSpeech = '명사';
    let meaning = '';
    let exampleEn = '';
    let exampleKo = '';
    let paraphrase = [];

    // A. Free Dictionary API (무료 영영 사전)
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (res.ok) {
        const data = await res.json();
        const entry = Array.isArray(data) ? data[0] : null;
        if (entry) {
          phonetic = entry.phonetic || (entry.phonetics?.find(p => p.text)?.text) || '';
          if (entry.meanings && entry.meanings.length > 0) {
            const m = entry.meanings[0];
            const posMap = { noun: '명사', verb: '동사', adjective: '형용사', adverb: '부사', preposition: '전치사' };
            partOfSpeech = posMap[m.partOfSpeech?.toLowerCase()] || m.partOfSpeech || '명사';
            if (m.definitions && m.definitions.length > 0) {
              const def = m.definitions[0];
              if (def.example) exampleEn = def.example;
              if (def.synonyms && def.synonyms.length > 0) {
                paraphrase = def.synonyms.slice(0, 4);
              }
            }
          }
        }
      }
    } catch (e) {}

    // B. Datamuse API (무료 동의어/유의어)
    if (paraphrase.length === 0) {
      try {
        const synRes = await fetch(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}&max=5`);
        if (synRes.ok) {
          const synList = await synRes.json();
          paraphrase = synList.map(s => s.word).filter(Boolean);
        }
      } catch (e) {}
    }

    // C. Google Translate 무료 엔드포인트 (한글 뜻 및 예문 번역)
    try {
      const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(word)}`);
      if (transRes.ok) {
        const transJson = await transRes.json();
        meaning = transJson?.[0]?.[0]?.[0] || '';
      }
    } catch (e) {}

    if (exampleEn) {
      try {
        const exTransRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(exampleEn)}`);
        if (exTransRes.ok) {
          const exTransJson = await exTransRes.json();
          exampleKo = exTransJson?.[0]?.[0]?.[0] || '';
        }
      } catch (e) {}
    } else {
      exampleEn = `It is important to understand the concept of ${word}.`;
      exampleKo = `${meaning || word}의 개념을 이해하는 것이 중요하다.`;
    }

    return {
      partOfSpeech: partOfSpeech,
      meaning: meaning || word,
      phonetic: phonetic ? (phonetic.startsWith('[') ? phonetic : `[${phonetic}]`) : '',
      paraphrase: paraphrase,
      relatedForms: '',
      exampleEn: exampleEn,
      exampleKo: exampleKo,
      memo: ''
    };
  }
  // --------------------------------------------------------------------------
  const CLOUD_SYNC_KEY_STORAGE = 'gtelp_cloud_sync_key';
  const CLOUD_SYNC_LAST_TIME_STORAGE = 'gtelp_cloud_sync_last_time';
  const CLOUD_SYNC_API_BASE = 'https://api.restful-api.dev/objects';
  let isSyncInProgress = false;
  let debounceSyncTimer = null;

  function getCloudSyncKey() {
    return (localStorage.getItem(CLOUD_SYNC_KEY_STORAGE) || '').trim();
  }

  function setCloudSyncKey(key) {
    if (key) {
      localStorage.setItem(CLOUD_SYNC_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(CLOUD_SYNC_KEY_STORAGE);
    }
  }

  function removeCloudSyncKey() {
    localStorage.removeItem(CLOUD_SYNC_KEY_STORAGE);
    localStorage.removeItem(CLOUD_SYNC_LAST_TIME_STORAGE);
  }

  function getCloudLastTime() {
    return localStorage.getItem(CLOUD_SYNC_LAST_TIME_STORAGE) || '';
  }

  function setCloudLastTime() {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    localStorage.setItem(CLOUD_SYNC_LAST_TIME_STORAGE, timeStr);
    return timeStr;
  }

  // 기본 교재(data.js)에 없는 사용자가 직접 추가한 단어 목록 추출
  function getCustomWords() {
    const initialIdSet = new Set(INITIAL_WORDS_DATA.map(w => w.id));
    return words.filter(w => !initialIdSet.has(w.id));
  }

  // 클라우드에서 받은 커스텀 단어 병합
  function mergeCustomWords(cloudCustomWords) {
    if (!Array.isArray(cloudCustomWords) || cloudCustomWords.length === 0) return false;
    const existingIds = new Set(words.map(w => w.id));
    const existingKeys = new Set(words.map(w => `${w.day}::${(w.word || '').trim().toLowerCase()}`));
    let added = false;

    cloudCustomWords.forEach(w => {
      const key = `${w.day}::${(w.word || '').trim().toLowerCase()}`;
      if (!existingIds.has(w.id) && !existingKeys.has(key)) {
        words.push(w);
        existingIds.add(w.id);
        existingKeys.add(key);
        added = true;
      }
    });

    if (added) {
      saveWords();
    }
    return added;
  }

  // Day별 회독 차수 스마트 병합 (핸드폰/태블릿 중 더 높은 회독수 유지 -> 회독 손실 방지)
  function mergeDayRoundStats(cloudDayRoundStats) {
    if (!cloudDayRoundStats || typeof cloudDayRoundStats !== 'object') return false;
    const localStats = getDayRoundStats();
    let changed = false;

    for (const [day, types] of Object.entries(cloudDayRoundStats)) {
      if (!localStats[day]) localStats[day] = {};
      for (const [quizType, count] of Object.entries(types || {})) {
        const remoteCount = Number(count) || 0;
        const localCount = Number(localStats[day][quizType]) || 0;
        if (remoteCount > localCount) {
          localStats[day][quizType] = remoteCount;
          changed = true;
        }
      }
    }

    if (changed) {
      saveDayRoundStats(localStats);
    }
    return changed;
  }

  // 오답 기록 스마트 병합
  function mergeWrongStats(cloudWrongStats) {
    if (!cloudWrongStats || typeof cloudWrongStats !== 'object') return false;
    let changed = false;

    for (const [id, count] of Object.entries(cloudWrongStats)) {
      const remoteCount = Number(count) || 0;
      const localCount = Number(wrongStats[id]) || 0;
      if (remoteCount > localCount) {
        wrongStats[id] = remoteCount;
        changed = true;
      }
    }

    if (changed) {
      saveStats();
    }
    return changed;
  }

  // 커스텀 암기 팁(수기 메모) 스마트 병합
  function mergeCustomMemos(cloudCustomMemos) {
    if (!cloudCustomMemos || typeof cloudCustomMemos !== 'object') return false;
    const localMemos = getCustomMemos();
    let changed = false;

    for (const [id, memo] of Object.entries(cloudCustomMemos)) {
      const cleanRemote = (memo || '').trim();
      if (cleanRemote && localMemos[id] !== cleanRemote) {
        localMemos[id] = cleanRemote;
        changed = true;
        const target = words.find(w => w.id === id);
        if (target) {
          target.memo = cleanRemote;
        }
      }
    }

    if (changed) {
      localStorage.setItem(CUSTOM_MEMOS_KEY, JSON.stringify(localMemos));
      saveWords();
    }
    return changed;
  }

  // 동기화 중 스피너 표시
  function setCloudSyncBusy(isBusy) {
    const headerIcon = document.getElementById('cloudSyncHeaderIcon');
    const pushIcon = document.getElementById('pushSyncIcon');
    const pullIcon = document.getElementById('pullSyncIcon');

    if (isBusy) {
      headerIcon?.classList.add('fa-spin');
      pushIcon?.classList.add('fa-spin');
      pullIcon?.classList.add('fa-spin');
    } else {
      headerIcon?.classList.remove('fa-spin');
      pushIcon?.classList.remove('fa-spin');
      pullIcon?.classList.remove('fa-spin');
    }
  }

  // UI 상태 갱신 (연결됨 / 미연결 뷰 전환)
  function updateCloudSyncUI() {
    const key = getCloudSyncKey();
    const statusBadge = document.getElementById('cloudSyncStatusBadge');
    const unconnectedSec = document.getElementById('cloudSyncUnconnectedSection');
    const connectedSec = document.getElementById('cloudSyncConnectedSection');
    const displayKey = document.getElementById('displaySyncKey');
    const lastTimeText = document.getElementById('syncLastTimeText');
    const dot = document.getElementById('cloudSyncDot');
    const headerBtn = document.getElementById('btnCloudSyncStatus');
    const headerIcon = document.getElementById('cloudSyncHeaderIcon');

    if (key) {
      if (statusBadge) {
        statusBadge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-700 flex items-center gap-1';
        statusBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 연결됨';
      }
      unconnectedSec?.classList.add('hidden');
      connectedSec?.classList.remove('hidden');
      if (displayKey) displayKey.textContent = key;
      if (lastTimeText) lastTimeText.textContent = getCloudLastTime() || '방금 전';
      dot?.classList.remove('hidden');
      if (headerIcon) headerIcon.className = 'fa-solid fa-cloud text-emerald-600';
      if (headerBtn) headerBtn.title = '기기간 실시간 동기화 (연결됨)';
    } else {
      if (statusBadge) {
        statusBadge.className = 'px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-600';
        statusBadge.textContent = '미연결';
      }
      unconnectedSec?.classList.remove('hidden');
      connectedSec?.classList.add('hidden');
      dot?.classList.add('hidden');
      if (headerIcon) headerIcon.className = 'fa-solid fa-cloud text-slate-400';
      if (headerBtn) headerBtn.title = '기기간 실시간 동기화 (미연결)';
    }
  }

  // 새 비밀 키 발급
  async function syncCreateKey() {
    try {
      setCloudSyncBusy(true);
      const payload = {
        name: 'gtelp_voca_sync',
        data: {
          customWords: getCustomWords(),
          customMemos: getCustomMemos(),
          wrongStats: wrongStats,
          dayRoundStats: getDayRoundStats(),
          updatedAt: new Date().toISOString()
        }
      };

      const res = await fetch(CLOUD_SYNC_API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('서버 응답 오류 (' + res.status + ')');
      const result = await res.json();
      const newKey = result.id;
      if (!newKey) throw new Error('동기화 키 생성 실패');

      setCloudSyncKey(newKey);
      setCloudLastTime();
      updateCloudSyncUI();
      showToast('🎉 나만의 비밀 동기화 키가 발급되었습니다!');
    } catch (err) {
      console.error(err);
      alert('동기화 키 발급 중 오류가 발생했습니다. 인터넷 연결 상태를 확인해주세요.\n' + err.message);
    } finally {
      setCloudSyncBusy(false);
    }
  }

  // 기존 비밀 키로 연결
  async function syncConnectKey(keyToConnect) {
    const trimmed = (keyToConnect || '').trim();
    if (!trimmed) {
      alert('비밀 동기화 키를 입력해주세요.');
      return;
    }

    try {
      setCloudSyncBusy(true);
      const res = await fetch(`${CLOUD_SYNC_API_BASE}/${encodeURIComponent(trimmed)}`);
      if (!res.ok) {
        if (res.status === 404) {
          alert('입력하신 키를 서버에서 찾을 수 없습니다. 키를 다시 한번 확인해주세요.');
          return;
        }
        throw new Error('서버 응답 오류 (' + res.status + ')');
      }

      const result = await res.json();
      if (!result || !result.data) {
        alert('동기화 슬롯 데이터를 읽을 수 없습니다.');
        return;
      }

      setCloudSyncKey(trimmed);

      const remoteData = result.data;
      const wordsUpdated = mergeCustomWords(remoteData.customWords);
      const roundsUpdated = mergeDayRoundStats(remoteData.dayRoundStats);
      const wrongsUpdated = mergeWrongStats(remoteData.wrongStats);
      const memosUpdated = mergeCustomMemos(remoteData.customMemos);

      // 상호 동기화를 위해 로컬 데이터도 클라우드에 즉시 반영
      await syncPushToCloud(true);

      setCloudLastTime();
      updateCloudSyncUI();

      if (wordsUpdated || roundsUpdated || wrongsUpdated || memosUpdated) {
        renderDayFilters();
        renderWordList();
        renderStats();
        setupQuizScopeUI('standard');
        setupQuizScopeUI('paraphrase');
        setupClozeScopeUI();
        setupFlashcardScopeUI();
        renderDayGridModal();
      }

      showToast('🔗 기기 연결 완료! 두 기기가 실시간으로 동기화됩니다.');
    } catch (err) {
      console.error(err);
      alert('동기화 연결 중 오류가 발생했습니다.\n' + err.message);
    } finally {
      setCloudSyncBusy(false);
    }
  }

  // 클라우드로 올리기 (Push)
  async function syncPushToCloud(silent = false) {
    const key = getCloudSyncKey();
    if (!key || isSyncInProgress) return;

    try {
      isSyncInProgress = true;
      setCloudSyncBusy(true);

      const payload = {
        name: 'gtelp_voca_sync',
        data: {
          customWords: getCustomWords(),
          customMemos: getCustomMemos(),
          wrongStats: wrongStats,
          dayRoundStats: getDayRoundStats(),
          updatedAt: new Date().toISOString()
        }
      };

      const res = await fetch(`${CLOUD_SYNC_API_BASE}/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('서버 응답 오류 (' + res.status + ')');

      setCloudLastTime();
      updateCloudSyncUI();

      if (!silent) {
        showToast('☁️ 최신 데이터가 클라우드로 동기화(올리기)되었습니다!');
      }
    } catch (err) {
      console.error('Push error:', err);
      if (!silent) {
        alert('클라우드 업로드 실패: 인터넷 연결을 확인해주세요.\n' + err.message);
      }
    } finally {
      isSyncInProgress = false;
      setCloudSyncBusy(false);
    }
  }

  // 클라우드에서 내려받기 (Pull)
  async function syncPullFromCloud(silent = false) {
    const key = getCloudSyncKey();
    if (!key || isSyncInProgress) return;

    try {
      isSyncInProgress = true;
      setCloudSyncBusy(true);

      const res = await fetch(`${CLOUD_SYNC_API_BASE}/${encodeURIComponent(key)}`);
      if (!res.ok) {
        if (res.status === 404) {
          console.warn('Sync slot not found on cloud');
          return;
        }
        throw new Error('서버 응답 오류 (' + res.status + ')');
      }

      const result = await res.json();
      if (!result || !result.data) return;

      const remoteData = result.data;
      const wordsUpdated = mergeCustomWords(remoteData.customWords);
      const roundsUpdated = mergeDayRoundStats(remoteData.dayRoundStats);
      const wrongsUpdated = mergeWrongStats(remoteData.wrongStats);
      const memosUpdated = mergeCustomMemos(remoteData.customMemos);

      setCloudLastTime();
      updateCloudSyncUI();

      if (wordsUpdated || roundsUpdated || wrongsUpdated || memosUpdated) {
        renderDayFilters();
        renderWordList();
        renderStats();
        setupQuizScopeUI('standard');
        setupQuizScopeUI('paraphrase');
        setupClozeScopeUI();
        setupFlashcardScopeUI();
        renderDayGridModal();
      }

      if (!silent) {
        showToast('☁️ 클라우드로부터 최신 데이터를 내려받았습니다!');
      }
    } catch (err) {
      console.error('Pull error:', err);
      if (!silent) {
        alert('클라우드 동기화 실패: 인터넷 연결을 확인해주세요.\n' + err.message);
      }
    } finally {
      isSyncInProgress = false;
      setCloudSyncBusy(false);
    }
  }

  // 오답 기록 등 빈번한 변경 시 디바운스 push
  function debouncedCloudPush() {
    if (getCloudSyncKey()) {
      if (debounceSyncTimer) clearTimeout(debounceSyncTimer);
      debounceSyncTimer = setTimeout(() => {
        syncPushToCloud(true);
      }, 1500);
    }
  }

  // 동기화 모듈 UI 이벤트 바인딩
  function initCloudSyncUI() {
    updateCloudSyncUI();

    // 상단 헤더 동기화 아이콘 클릭 시 모달 열기
    document.getElementById('btnCloudSyncStatus')?.addEventListener('click', () => {
      openModal('dataManageModal');
      const card = document.getElementById('cloudSyncCard');
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // 새 키 발급 버튼
    document.getElementById('btnCreateSyncKey')?.addEventListener('click', () => {
      syncCreateKey();
    });

    // 기존 키 연결 버튼
    document.getElementById('btnConnectSyncKey')?.addEventListener('click', () => {
      const input = document.getElementById('inputSyncKey');
      syncConnectKey(input?.value);
    });

    // 엔터키로도 연결
    document.getElementById('inputSyncKey')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        syncConnectKey(e.target.value);
      }
    });

    // 키 복사 버튼
    document.getElementById('btnCopySyncKey')?.addEventListener('click', () => {
      const key = getCloudSyncKey();
      if (!key) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(key).then(() => {
          const textSpan = document.getElementById('copyKeyText');
          if (textSpan) {
            textSpan.textContent = '복사 완료!';
            setTimeout(() => { textSpan.textContent = '키 복사'; }, 2000);
          }
          showToast('📋 동기화 키가 복사되었습니다! 다른 기기에 붙여넣으세요.');
        }).catch(() => {
          prompt('아래 동기화 키를 복사하세요:', key);
        });
      } else {
        prompt('아래 동기화 키를 복사하세요:', key);
      }
    });

    // 수동 올리기 버튼
    document.getElementById('btnManualPushSync')?.addEventListener('click', () => {
      syncPushToCloud(false);
    });

    // 수동 내려받기 버튼
    document.getElementById('btnManualPullSync')?.addEventListener('click', () => {
      syncPullFromCloud(false);
    });

    // 연결 해제 버튼
    document.getElementById('btnDisconnectSyncKey')?.addEventListener('click', () => {
      if (confirm('동기화 연결을 해제하시겠습니까?\n\n(연결을 해제해도 기기에 저장된 단어 및 회독 기록은 유지됩니다)')) {
        removeCloudSyncKey();
        updateCloudSyncUI();
        showToast('동기화 연결이 해제되었습니다.');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. 이동 시간용 플래시카드(Flashcard) 암기 모드 & 진도 이어보기
  // --------------------------------------------------------------------------
  let flashcardDeck = [];
  let flashcardCurrentIndex = 0;
  let flashcardIsFlipped = false;
  let flashcardKnown = [];
  let flashcardUnknown = [];
  let flashcardCurrentScope = 'all';

  const FC_PROGRESS_KEY = 'gtelp_fc_last_progress';

  function getFlashcardProgressMap() {
    try {
      const raw = localStorage.getItem(FC_PROGRESS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveFlashcardProgress(scope, index) {
    if (!scope) return;
    try {
      const map = getFlashcardProgressMap();
      map[scope] = {
        index: Math.max(0, index || 0),
        updatedAt: Date.now()
      };
      localStorage.setItem(FC_PROGRESS_KEY, JSON.stringify(map));
    } catch (e) {}
  }

  function getFlashcardLastIndex(scope) {
    if (!scope) return 0;
    try {
      const map = getFlashcardProgressMap();
      return map[scope] ? (map[scope].index || 0) : 0;
    } catch (e) {
      return 0;
    }
  }

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
      const savedIdx = getFlashcardLastIndex(day);
      const fcRounds = getDayRoundCount(day, 'flashcard');
      const progressBadge = (savedIdx > 0 && savedIdx < count)
        ? `<span class="text-[10px] text-amber-700 bg-amber-100 font-extrabold px-1.5 py-0.5 rounded-md inline-block mt-0.5">${savedIdx + 1}/${count}번 이어보기</span>`
        : `<span class="text-[11px] text-slate-500">${count}개 단어</span>`;

      html += `
        <button class="fc-scope-btn p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left transition" data-scope="${day}">
          <div class="flex items-center justify-between gap-1 mb-0.5">
            <span class="text-xs font-black text-slate-800">${day}</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-black ${
              fcRounds > 0 
                ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }">
              ${fcRounds > 0 ? `${fcRounds}회독` : '0회독'}
            </span>
          </div>
          <div>${progressBadge}</div>
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
    updateResumeBanners();
  }

  function startFlashcard(scope, forceReset = false) {
    flashcardCurrentScope = scope || getSelectedScope('flashcard') || 'Day 01';
    let pool = getWordPoolForScope(flashcardCurrentScope);
    if (pool.length === 0) {
      alert('학습할 단어가 없습니다. 범위를 다시 선택해주세요.');
      return;
    }

    // 기본 정렬: 교재 원래 순번(No. 01 ~ No. 50) 엄격 오름차순
    pool.sort((a, b) => (parseInt(a.no, 10) || 0) - (parseInt(b.no, 10) || 0));

    const shouldShuffle = document.getElementById('flashcardShuffleToggle')?.checked ?? false;
    flashcardDeck = shouldShuffle ? shuffle(pool) : [...pool];

    if (!forceReset && !shouldShuffle) {
      const savedIdx = getFlashcardLastIndex(flashcardCurrentScope);
      if (savedIdx > 0 && savedIdx < flashcardDeck.length) {
        flashcardCurrentIndex = savedIdx;
        showToast(`📍 ${flashcardCurrentScope} (${savedIdx + 1}/${flashcardDeck.length}번)로 이어서 시작합니다!`);
      } else {
        flashcardCurrentIndex = 0;
      }
    } else {
      flashcardCurrentIndex = 0;
    }

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
    saveFlashcardProgress(flashcardCurrentScope, flashcardCurrentIndex);
    saveCurrentLearningSession();
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
    saveFlashcardProgress(flashcardCurrentScope, flashcardCurrentIndex);
    saveCurrentLearningSession();
    if (flashcardCurrentIndex < flashcardDeck.length) {
      renderCurrentFlashcard();
    } else {
      finishFlashcard();
    }
  }

  function handleFlashcardNext() {
    if (flashcardCurrentIndex >= flashcardDeck.length - 1) {
      finishFlashcard();
      return;
    }
    flashcardCurrentIndex++;
    saveFlashcardProgress(flashcardCurrentScope, flashcardCurrentIndex);
    saveCurrentLearningSession();
    renderCurrentFlashcard();
  }

  function handleFlashcardPrev() {
    if (flashcardCurrentIndex > 0) {
      flashcardCurrentIndex--;
      saveFlashcardProgress(flashcardCurrentScope, flashcardCurrentIndex);
      saveCurrentLearningSession();
      renderCurrentFlashcard();
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

    // 카운터 및 진행도
    document.getElementById('flashcardCurrentIdx').textContent = flashcardCurrentIndex + 1;
    document.getElementById('flashcardTotalIdx').textContent = flashcardDeck.length;

    // 앞면 (Front): Day 및 교재 순번(No.) 명확히 표기
    const dayText = item.day || 'Day 01';
    const noText = item.no ? ` · No.${item.no}` : '';
    document.getElementById('fcFrontDay').textContent = dayText + noText;
    document.getElementById('fcFrontPos').textContent = item.partOfSpeech || '품사';
    document.getElementById('fcFrontWord').textContent = item.word;
    document.getElementById('fcFrontPhonetic').textContent = item.phonetic || '';

    // 단어 발음 자동 1회 낭독
    speak(item.word);

    // 뒷면 (Back): 단어, 교재 순번, 품사, 주요 뜻
    document.getElementById('fcBackWord').textContent = item.word;
    const backNoEl = document.getElementById('fcBackNo');
    if (backNoEl) {
      if (item.no) {
        backNoEl.textContent = `No.${item.no}`;
        backNoEl.classList.remove('hidden');
      } else {
        backNoEl.classList.add('hidden');
      }
    }
    document.getElementById('fcBackPos').textContent = item.partOfSpeech || '품사';
    document.getElementById('fcBackMeaning').textContent = item.meaning;

    // 동의어 (패러프레이징 - 100% 유기적 단어 상세정보 & 원터치 발음)
    const paraBox = document.getElementById('fcBackParaphraseBox');
    const paraEl = document.getElementById('fcBackParaphrase');
    const paraphrases = Array.isArray(item.paraphrase) ? item.paraphrase : [];
    if (paraphrases.length > 0) {
      paraBox.classList.remove('hidden');
      paraEl.innerHTML = paraphrases.map(p => {
        const cleanP = (p || '').trim();
        const safeP = cleanP.replace(/'/g, "\\'");
        const regWord = words.find(w => w && w.word && w.word.toLowerCase() === cleanP.toLowerCase());
        const isReg = !!regWord;

        return `
          <div class="inline-flex items-center rounded-xl bg-white/20 hover:bg-white/30 text-amber-200 hover:text-white border border-amber-300/40 shadow-xs transition text-sm font-bold overflow-hidden group">
            <button type="button" class="px-3 py-1.5 flex items-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.openQuizOptionDetail('${isReg ? regWord.id : ''}', '${safeP}')" title="'${cleanP}' 단어 상세정보 보기">
              <i class="fa-solid fa-book-open text-xs text-amber-300 group-hover:scale-110 transition-transform pointer-events-none"></i>
              <span class="underline decoration-amber-300/40 pointer-events-none">${cleanP}</span>
              <span class="text-[10px] ${isReg ? 'bg-amber-400 text-amber-950 font-black' : 'bg-amber-400/30 text-amber-200 font-extrabold'} px-1.5 py-0.2 rounded-md pointer-events-none">상세</span>
            </button>
            <button type="button" class="px-2.5 py-1.5 text-amber-300 hover:text-white hover:bg-white/20 border-l border-amber-300/30 transition cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.speakText('${safeP}', event)" title="'${cleanP}' 발음 듣기">
              <i class="fa-solid fa-volume-high text-xs pointer-events-none"></i>
            </button>
          </div>
        `;
      }).join('');
    } else {
      paraBox.classList.add('hidden');
    }

    // 파생어 (유사품사어 - 100% 유기적 단어 상세정보 & 원터치 발음)
    const relatedBox = document.getElementById('fcBackRelatedBox');
    const relatedEl = document.getElementById('fcBackRelated');
    if (relatedBox && relatedEl) {
      if (item.relatedForms && item.relatedForms !== '-' && item.relatedForms.trim()) {
        relatedBox.classList.remove('hidden');
        const list = parseRelatedForms(item.relatedForms);
        relatedEl.innerHTML = list.map(rf => {
          if (!rf.word) return `<span class="text-slate-300 text-sm font-medium">${rf.desc}</span>`;
          const cleanWord = (rf.word || '').trim();
          const safeWord = cleanWord.replace(/'/g, "\\'");
          const regWord = words.find(w => w && w.word && w.word.toLowerCase() === cleanWord.toLowerCase());
          const isReg = !!regWord;

          return `
            <div class="inline-flex items-center rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/25 shadow-xs transition text-sm font-semibold overflow-hidden group">
              <button type="button" class="px-3 py-1.5 flex items-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.openQuizOptionDetail('${isReg ? regWord.id : ''}', '${safeWord}', '${(rf.desc || '').replace(/'/g, "\\'")}')" title="'${cleanWord}' 단어 상세정보 보기">
                <i class="fa-solid fa-book-open text-xs text-indigo-200 group-hover:scale-110 transition-transform pointer-events-none"></i>
                <span class="font-bold underline decoration-white/50 group-hover:text-amber-200 pointer-events-none">${cleanWord}</span>
                <span class="text-[10px] ${isReg ? 'bg-indigo-300 text-indigo-950 font-black' : 'bg-indigo-400/30 text-indigo-100 font-extrabold'} px-1.5 py-0.2 rounded-md pointer-events-none">상세</span>
                ${rf.desc ? `<span class="text-xs text-indigo-100 font-normal pointer-events-none">(${rf.desc})</span>` : ''}
              </button>
              <button type="button" class="px-2.5 py-1.5 text-indigo-200 hover:text-white hover:bg-white/20 border-l border-white/20 transition cursor-pointer active:scale-95 touch-manipulation" onclick="event.stopPropagation(); window.speakText('${safeWord}', event)" title="'${cleanWord}' 발음 듣기">
                <i class="fa-solid fa-volume-high text-xs pointer-events-none"></i>
              </button>
            </div>
          `;
        }).join(' ');
      } else {
        relatedBox.classList.add('hidden');
      }
    }

    // 예문 & 해석 (터치 시 발음 재생)
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

    // 출제 포인트 & 나만의 암기 팁 메모 입력창 (단어 상세정보와 실시간 양방향 연동)
    const fcMemoInput = document.getElementById('fcBackMemoInput');
    const fcMemoSaveBtn = document.getElementById('btnFcSaveMemo');
    const fcMemoSaveBadge = document.getElementById('fcBackMemoSaveBadge');

    if (fcMemoInput) {
      fcMemoInput.value = item.memo || '';

      let fcMemoTimer = null;
      const doSaveFcMemo = (showBadge = false) => {
        const val = (fcMemoInput.value || '').trim();
        if (item.memo !== val) {
          item.memo = val;
          saveWordCustomMemo(item.id, val);
          if (showBadge && fcMemoSaveBadge) {
            fcMemoSaveBadge.classList.remove('opacity-0');
            setTimeout(() => fcMemoSaveBadge.classList.add('opacity-0'), 1500);
          }
          renderWordList();
        }
      };

      fcMemoInput.oninput = () => {
        if (fcMemoTimer) clearTimeout(fcMemoTimer);
        fcMemoTimer = setTimeout(() => doSaveFcMemo(true), 600);
      };

      fcMemoInput.onblur = () => {
        doSaveFcMemo(true);
      };

      if (fcMemoSaveBtn) {
        fcMemoSaveBtn.onclick = (e) => {
          if (e && e.stopPropagation) e.stopPropagation();
          doSaveFcMemo(true);
          showToast('암기 팁이 저장되었습니다!');
        };
      }
    }

    // 상단 이전 버튼 & 하단 이전 버튼 상태 갱신
    const prevBtn = document.getElementById('btnFcPrev');
    const prevBtnBottom = document.getElementById('btnFcPrevBottom');
    const isFirst = flashcardCurrentIndex === 0;
    [prevBtn, prevBtnBottom].forEach(btn => {
      if (btn) {
        btn.disabled = isFirst;
        btn.style.opacity = isFirst ? '0.4' : '1';
        btn.style.pointerEvents = isFirst ? 'none' : 'auto';
      }
    });

    const nextBtnSpan = document.querySelector('#btnFcNext span');
    if (nextBtnSpan) {
      nextBtnSpan.textContent = (flashcardCurrentIndex === flashcardDeck.length - 1) ? '학습 완료' : '다음 단어';
    }
  }

  window.flipCurrentFlashcard = function() {
    flashcardIsFlipped = !flashcardIsFlipped;
    const inner = document.getElementById('flashcardInner');
    if (inner) inner.classList.toggle('flipped', flashcardIsFlipped);
  };

  window.speakFlashcardCurrentWord = function() {
    const item = flashcardDeck[flashcardCurrentIndex];
    if (item && item.word) speak(item.word);
  };

  window.speakFlashcardExample = function(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const item = flashcardDeck[flashcardCurrentIndex];
    if (item && item.exampleEn) speak(item.exampleEn, e);
  };

  function finishFlashcard() {
    saveFlashcardProgress(flashcardCurrentScope, 0);
    clearCurrentLearningSession();

    // 플래시카드 Day별 회독 차수 카운트
    const isSpecialFcScope = ['all', 'wrong', 'selected'].includes(flashcardCurrentScope);
    if (flashcardCurrentScope && !isSpecialFcScope) {
      const newRound = incrementDayRoundCount(flashcardCurrentScope, 'flashcard');
      showToast(`${flashcardCurrentScope} 플래시카드 ${newRound}회독 달성! 🎉`);
    }

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
          startFlashcard(flashcardCurrentScope, true);
        };
      }
    }
  }

  window.startStandardQuiz = startStandardQuiz;
  window.startClozeQuiz = startClozeQuiz;
  window.startFlashcard = startFlashcard;
  window.handleFlashcardAnswer = handleFlashcardAnswer;
  window.handleFlashcardNext = handleFlashcardNext;
  window.handleFlashcardPrev = handleFlashcardPrev;
  window.speakFlashcardExample = speakFlashcardExample;

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
      const clozeRounds = getDayRoundCount(day, 'cloze');
      html += `
        <button class="cloze-scope-btn p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left transition" data-scope="${day}">
          <div class="flex items-center justify-between gap-1 mb-0.5">
            <span class="text-xs font-black text-slate-800">${day}</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-black ${
              clozeRounds > 0 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }">
              ${clozeRounds > 0 ? `${clozeRounds}회독` : '0회독'}
            </span>
          </div>
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
    updateResumeBanners();
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
      userAnswers: {},
      isRetry: false
    };

    document.getElementById('clozeSetupCard').classList.add('hidden');
    document.getElementById('clozeResultCard').classList.add('hidden');
    document.getElementById('clozeActiveCard').classList.remove('hidden');

    renderCurrentClozeQuestion();
    saveCurrentLearningSession();
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

    // 만약 options가 비어있거나 4개 미만인 경우 즉시 안전 보충
    if (!options || !Array.isArray(options) || options.length < 4) {
      options = generateGtelpSmartDistractors(q, words);
    }

    // 보기 렌더링
    const optionsContainer = document.getElementById('clozeOptionsContainer');
    optionsContainer.innerHTML = options.map((opt, i) => {
      const label = String.fromCharCode(65 + i);
      const optWord = typeof opt === 'string' ? opt : (opt && opt.word ? opt.word : '');
      let btnClass = 'cloze-opt-btn w-full p-3.5 rounded-2xl border-2 font-bold transition flex items-center justify-between group ';
      let badgeClass = 'w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition ';

      if (prevAns) {
        if (optWord === q.word) {
          btnClass += 'border-emerald-500 bg-emerald-50 text-emerald-900';
          badgeClass += 'bg-emerald-600 text-white';
        } else if (optWord === prevAns.selectedWord && !prevAns.isCorrect) {
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
        <button class="${btnClass}" data-word="${optWord}" ${prevAns ? 'disabled' : ''}>
          <div class="flex items-center gap-3">
            <span class="${badgeClass}">
              ${label}
            </span>
            <span class="text-base text-slate-900">${optWord}</span>
          </div>
          <span class="tts-cloze-opt p-1.5 text-slate-300 hover:text-emerald-600 transition" title="발음" data-word="${optWord}">
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
    saveCurrentLearningSession();
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
    saveCurrentLearningSession();
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

    // 정답 단어 전체 상세정보 열기 버튼
    const openTargetBtn = document.getElementById('clozeBtnOpenTargetDetail');
    if (openTargetBtn) {
      openTargetBtn.onclick = () => window.openQuizOptionDetail(q.id, q.word, q.meaning);
    }

    // 완성 문장 듣기 버튼
    const ttsSentenceBtn = document.getElementById('clozeTtsFullSentenceBtn');
    if (ttsSentenceBtn) {
      ttsSentenceBtn.onclick = () => speak(q.exampleEn);
    }
    document.getElementById('clozeReviewFullSentence').innerHTML = `"${q.exampleEn}"`;
    document.getElementById('clozeReviewTranslation').textContent = q.exampleKo || '';

    // 보기 4개 뜻풀이 & 상세 모달 버튼 (100% 모든 보기 단어 상세 팝업 연동)
    const reviewList = document.getElementById('clozeReviewOptionsList');
    reviewList.innerHTML = options.map(opt => {
      const optWord = typeof opt === 'string' ? opt : (opt && opt.word ? opt.word : '');
      const isTarget = optWord.toLowerCase() === (q.word || '').toLowerCase();
      const registeredItem = words.find(w => w && w.word && w.word.toLowerCase() === optWord.toLowerCase());
      const optDef = (typeof opt === 'object' && opt && opt.def) 
        ? opt.def 
        : (registeredItem ? registeredItem.meaning : (opt.meaning || ''));

      const safeDefForAttr = (optDef || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const registeredId = registeredItem ? registeredItem.id : '';

      return `
        <div class="flex items-center justify-between p-3 rounded-2xl ${
          isTarget ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-bold' : 'bg-white border-slate-200 hover:border-emerald-300 text-slate-700'
        } border shadow-xs transition gap-2 cursor-pointer group active:scale-[0.99]" onclick="window.openQuizOptionDetail('${registeredId}', '${optWord}', '${safeDefForAttr}')">
          
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <button type="button" class="text-emerald-600 hover:text-emerald-800 p-1.5 rounded-lg hover:bg-emerald-50 transition shrink-0" title="발음 듣기" onclick="event.stopPropagation(); window.speakText('${optWord}', event)">
              <i class="fa-solid fa-volume-high text-xs"></i>
            </button>
            <div class="min-w-0">
              <span class="font-black text-slate-900 tracking-tight text-sm">${optWord}</span>
              <span class="text-slate-600 text-xs truncate ml-1">: ${optDef}</span>
            </div>
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            ${isTarget ? '<span class="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black">정답</span>' : ''}
            
            <button type="button" onclick="event.stopPropagation(); window.openQuizOptionDetail('${registeredId}', '${optWord}', '${safeDefForAttr}')" class="px-2.5 py-1 rounded-xl ${
              isTarget ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700'
            } font-bold text-xs flex items-center gap-1 transition shadow-xs border border-emerald-200 cursor-pointer active:scale-95" title="'${optWord}' 상세 예문/파생어/암기팁 보기">
              <i class="fa-solid fa-book-open text-[11px]"></i>
              <span>상세</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // 출제 팁 & 핵심 포인트
    const tipSection = document.getElementById('clozeTipSection');
    const tipText = document.getElementById('clozeTipText');
    if (q.memo && q.memo.trim()) {
      tipSection.classList.remove('hidden');
      tipText.textContent = q.memo;
    } else if (q.relatedForms && q.relatedForms !== '-' && q.relatedForms.trim()) {
      tipSection.classList.remove('hidden');
      tipText.innerHTML = `<strong>[파생어/형태]</strong> ${q.relatedForms}`;
    } else if (Array.isArray(q.paraphrase) && q.paraphrase.length > 0) {
      tipSection.classList.remove('hidden');
      tipText.innerHTML = `<strong>[핵심 동의어]</strong> ${q.paraphrase.join(', ')}`;
    } else {
      tipSection.classList.remove('hidden');
      tipText.innerHTML = `<strong>[문맥 완성 포인트]</strong> "${q.word}" (${q.partOfSpeech || '어휘'}) - 뜻: ${q.meaning}`;
    }

    // 모바일에서 풀이 직후 해설창이 한눈에 보이도록 자동 부드러운 스크롤
    setTimeout(() => {
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 120);

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
    clearQuizTimer();
    clearCurrentLearningSession();
    document.getElementById('clozeActiveCard').classList.add('hidden');
    document.getElementById('clozeResultCard').classList.remove('hidden');

    const total = activeClozeQuiz.questionList.length;
    const correct = activeClozeQuiz.correctCount;
    const wrong = activeClozeQuiz.wrongList.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    document.getElementById('clozeResultCorrect').textContent = correct;
    document.getElementById('clozeResultWrong').textContent = wrong;
    document.getElementById('clozeResultAccuracy').textContent = accuracy;

    // 빈칸 문장 Day별 회독 차수 카운트 & 결과 배지 표시
    const clozeRoundBadge = document.getElementById('clozeResultRoundBadge');
    const clozeRoundText = document.getElementById('clozeResultRoundText');
    const isSpecialClozeScope = ['all', 'wrong', 'selected'].includes(activeClozeQuiz.currentScope);
    if (!activeClozeQuiz.isRetry && activeClozeQuiz.currentScope && !isSpecialClozeScope) {
      const newRound = incrementDayRoundCount(activeClozeQuiz.currentScope, 'cloze');
      if (clozeRoundBadge && clozeRoundText) {
        clozeRoundText.textContent = `${activeClozeQuiz.currentScope} 문장 빈칸 ${newRound}회독 달성! 🎉`;
        clozeRoundBadge.classList.remove('hidden');
      }
      showToast(`${activeClozeQuiz.currentScope} 문장 빈칸 ${newRound}회독 달성! 👏`);
    } else {
      if (clozeRoundBadge) clozeRoundBadge.classList.add('hidden');
    }

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
        activeClozeQuiz.isRetry = true;
        document.getElementById('clozeResultCard').classList.add('hidden');
        document.getElementById('clozeActiveCard').classList.remove('hidden');
        renderCurrentClozeQuestion();
      };
    } else {
      retryWrongBtn.classList.add('hidden');
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
    const targetWord = (targetItem && targetItem.word ? targetItem.word : '').toLowerCase();
    let selectedDistractors = [];

    // 1단계: 지텔프 빈출 혼동 어휘 사전에 사전 정의된 오답이 있는지 확인
    if (GTELP_CONFUSABLES_MAP[targetWord]) {
      selectedDistractors = [...GTELP_CONFUSABLES_MAP[targetWord]];
    }

    // 2단계: 부족한 보기는 단어장 내 단어 중 '유사도 점수'가 높은 단어로 채우기
    if (selectedDistractors.length < 3) {
      const candidates = (allWords || []).filter(w => w && w.word && w.word.toLowerCase() !== targetWord);

      // 점수 계산: 품사 일치(+10), 앞 2글자 일치(+15), 길이 비슷(+5)
      const scored = candidates.map(c => {
        let score = 0;
        const cWord = (c.word || '').toLowerCase();
        if (c.partOfSpeech === targetItem.partOfSpeech) score += 10;
        if (cWord.slice(0, 2) === targetWord.slice(0, 2)) score += 15;
        else if (cWord[0] === targetWord[0]) score += 8;
        if (Math.abs(cWord.length - targetWord.length) <= 2) score += 5;

        return { item: c, score: score };
      });

      scored.sort((a, b) => b.score - a.score);

      for (const s of scored) {
        if (selectedDistractors.length >= 3) break;
        if (!selectedDistractors.some(d => {
          const dw = typeof d === 'string' ? d : (d && d.word ? d.word : '');
          return dw.toLowerCase() === s.item.word.toLowerCase();
        })) {
          selectedDistractors.push({ word: s.item.word, def: s.item.meaning || '' });
        }
      }
    }

    // 3단계: 그래도 부족하면 아무 단어나 무작위 보충
    if (selectedDistractors.length < 3) {
      const remaining = (allWords || []).filter(w => 
        w && w.word && w.word.toLowerCase() !== targetWord && 
        !selectedDistractors.some(d => {
          const dw = typeof d === 'string' ? d : (d && d.word ? d.word : '');
          return dw.toLowerCase() === w.word.toLowerCase();
        })
      );
      const shuffledRem = shuffle(remaining);
      for (const r of shuffledRem) {
        if (selectedDistractors.length >= 3) break;
        selectedDistractors.push({ word: r.word, def: r.meaning || '' });
      }
    }

    // 정답 1개 + 오답 3개 셔플
    return shuffle([
      { word: targetItem.word, def: targetItem.meaning || '' },
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

          const targetDay = item.day || activeDayFilter || '기초단어';
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
        if (typeof syncPushToCloud === 'function' && typeof getCloudSyncKey === 'function' && getCloudSyncKey()) {
          syncPushToCloud(true);
        }
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
  geminiApiKey = localStorage.getItem('voca_gemini_api_key') || '';

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
        targetDay = customDayInput.value.trim() || '기초단어';
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
