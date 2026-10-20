/* CS 340 Midterm 2 study app: routing, rendering, progress tracking. */
(function () {
  'use strict';

  const STORE_KEY = 'cs340-mt2-progress-v1';
  const EXAM_KEY = 'cs340-mt2-exam-v1';
  const THEME_KEY = 'cs340-mt2-theme';
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  const TYPE_LABEL = { tf: 'True / false', mc: 'Multiple choice', sa: 'Short answer', code: 'Write code', draw: 'Draw UML' };
  const WRITTEN = new Set(['sa', 'code', 'draw']);
  const SCORE = { correct: 1, partial: 0.5, wrong: 0 };

  const $main = document.getElementById('main');
  const $rail = document.getElementById('rail');
  const $menuBtn = document.getElementById('menuBtn');

  const byId = {};
  BANK.allQuestions().forEach((q) => (byId[q.id] = q));

  /* ---------------- storage ---------------- */
  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable: progress lives in memory for this visit */
    }
  }

  let progress = load(STORE_KEY, { answers: {} });
  if (!progress.answers) progress.answers = {};

  function record(q, result) {
    const a = progress.answers[q.id] || { attempts: 0, correct: 0 };
    a.attempts += 1;
    if (result === 'correct') a.correct += 1;
    a.last = result;
    a.ts = Date.now();
    progress.answers[q.id] = a;
    save(STORE_KEY, progress);
    renderRail();
  }
  const statusOf = (qid) => (progress.answers[qid] ? progress.answers[qid].last : null);

  function topicStats(topic) {
    let sum = 0, answered = 0, misses = 0;
    topic.questions.forEach((q) => {
      const s = statusOf(q.id);
      if (s) {
        answered++;
        sum += SCORE[s];
        if (s !== 'correct') misses++;
      }
    });
    const total = topic.questions.length;
    return { total, answered, misses, mastery: Math.round((sum / total) * 100) };
  }
  function missedIds() {
    return Object.keys(progress.answers).filter((id) => byId[id] && progress.answers[id].last !== 'correct');
  }

  /* ---------------- helpers ---------------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const KW = 'const|let|var|function|return|if|else|for|while|do|of|in|new|class|extends|implements|interface|abstract|public|private|protected|static|readonly|async|await|try|catch|finally|throw|import|from|export|default|type|this|super|void|null|undefined|true|false|typeof|instanceof|keyof|switch|case|break|continue|get|set|constructor|enum|as|int|boolean|string|number|any|unknown';
  const TOKEN_RE = new RegExp(
    '(//[^\\n]*|/\\*[\\s\\S]*?\\*/|^\\s*#[^\\n]*)' +            // 1 comment
    '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'|`(?:\\\\.|[^`\\\\])*`)' + // 2 string
    '|\\b(\\d+(?:\\.\\d+)?)\\b' +                                // 3 number
    '|\\b(' + KW + ')\\b' +                                      // 4 keyword
    '|\\b([A-Z][A-Za-z0-9_]*)\\b',                               // 5 type-ish
    'gm'
  );
  function highlight(code) {
    let out = '', last = 0, m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(code))) {
      out += esc(code.slice(last, m.index));
      const cls = m[1] ? 'com' : m[2] ? 'str' : m[3] ? 'num' : m[4] ? 'kw' : 'type';
      out += '<span class="tok-' + cls + '">' + esc(m[0]) + '</span>';
      last = TOKEN_RE.lastIndex;
      if (m[0].length === 0) TOKEN_RE.lastIndex++;
    }
    return out + esc(code.slice(last));
  }
  const codeBlock = (code) => '<pre class="code"><code>' + highlight(code) + '</code></pre>';

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  function dotsHTML(questions, currentId) {
    return '<div class="dots" aria-hidden="true">' + questions.map((q) => {
      const s = statusOf(q.id);
      return '<span class="dot' + (s ? ' ' + s : '') + (q.id === currentId ? ' current' : '') + '"></span>';
    }).join('') + '</div>';
  }
  const legendHTML = () =>
    '<div class="legend"><span><i class="dot"></i>Not tried</span><span><i class="dot correct"></i>Right</span>' +
    '<span><i class="dot partial"></i>Partly right</span><span><i class="dot wrong"></i>Missed</span></div>';

  /* ---------------- theme ---------------- */
  function applyTheme(t) {
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }
  applyTheme(load(THEME_KEY, 'auto'));

  /* ---------------- rail ---------------- */
  function currentRoute() {
    return (location.hash || '#/').replace(/^#\/?/, '').split('/');
  }
  function renderRail() {
    const [page, id] = currentRoute();
    const misses = missedIds().length;
    let html = '<a class="brand" href="#/"><div class="brand-course">CS 340, Professor Wilkerson</div><div class="brand-title">Midterm 2 study</div></a>';
    html += '<nav class="rail-modes" aria-label="Modes">';
    html += '<a class="nav-link" href="#/"' + (page === '' ? ' aria-current="page"' : '') + '>Progress</a>';
    html += '<a class="nav-link" href="#/exam"' + (page === 'exam' ? ' aria-current="page"' : '') + '>Exam simulation</a>';
    html += '<a class="nav-link" href="#/review"' + (page === 'review' ? ' aria-current="page"' : '') + '>Review misses' +
      (misses ? '<span class="count" aria-label="' + misses + ' to review">' + misses + '</span>' : '') + '</a>';
    html += '</nav>';
    BANK.groups.forEach((g) => {
      html += '<div class="rail-group"><h2>' + esc(g.title) + '</h2>';
      BANK.topics.filter((t) => t.group === g.id).forEach((t) => {
        const st = topicStats(t);
        html += '<a class="nav-link" href="#/topic/' + t.id + '"' + (page === 'topic' && id === t.id ? ' aria-current="page"' : '') + '>' +
          '<span class="ring" style="--p:' + st.mastery + '" aria-hidden="true"></span>' + esc(t.title) +
          '<span class="pct"><span class="sr-only">mastery </span>' + st.mastery + '%</span></a>';
      });
      html += '</div>';
    });
    $rail.innerHTML = html;
  }
  $menuBtn.addEventListener('click', () => {
    const open = $rail.classList.toggle('open');
    $menuBtn.setAttribute('aria-expanded', String(open));
  });
  $rail.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      $rail.classList.remove('open');
      $menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('click', (e) => {
    if ($rail.classList.contains('open') && !$rail.contains(e.target) && e.target !== $menuBtn) {
      $rail.classList.remove('open');
      $menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------------- question component ---------------- */
  /*
   * mountQuestion(host, q, opts)
   *   opts.mode: 'practice' (instant feedback + self-grade) | 'exam' (collect only)
   *   opts.label: e.g. "Question 3 of 25"
   *   opts.order: option display order for mc (array of original indices)
   *   opts.saved: previously saved answer (exam)
   *   opts.onChange(answer): exam mode, called whenever the answer changes
   *   opts.onGraded(result): practice mode, after grading
   *   opts.onNext(): practice mode, "Next question"
   *   opts.nextLabel
   */
  function mountQuestion(host, q, opts) {
    const mode = opts.mode || 'practice';
    const topic = BANK.byId[q.topic];
    const isWritten = WRITTEN.has(q.t);
    let order = opts.order;
    if (q.t === 'mc' && !order) order = q.fixed ? q.o.map((_, i) => i) : shuffle(q.o.map((_, i) => i));
    const options = q.t === 'tf' ? ['True', 'False'] : q.t === 'mc' ? order.map((i) => q.o[i]) : [];
    const correctPos = q.t === 'tf' ? (q.a ? 0 : 1) : q.t === 'mc' ? order.indexOf(q.a) : -1;
    const saved = opts.saved || {};
    let graded = false;

    let html = '<article class="qcard" aria-labelledby="qt-' + q.id + '">';
    html += '<div class="qmeta"><span class="qtype">' + TYPE_LABEL[q.t] + '</span><span>' + esc(topic.title) + '</span>' +
      (opts.label ? '<span class="num">' + esc(opts.label) + '</span>' : '') + '</div>';
    html += '<p class="qtext" id="qt-' + q.id + '">' + fmt(q.q) + '</p>';
    if (q.c) html += codeBlock(q.c);

    if (!isWritten) {
      html += '<fieldset class="options"><legend class="sr-only">Choose one answer</legend>';
      options.forEach((text, i) => {
        html += '<label class="opt" data-i="' + i + '"><input type="radio" name="ans-' + q.id + '" value="' + i + '"' +
          (saved.choice === i ? ' checked' : '') + '><span class="bubble" aria-hidden="true">' + LETTERS[i] + '</span>' +
          '<span class="otext"><span class="sr-only">' + LETTERS[i] + '. </span>' + fmt(text) + '</span></label>';
      });
      html += '</fieldset>';
    } else if (q.t === 'draw') {
      html += '<p class="kbd-hint">Sketch it below (mouse, finger or stylus) or on paper, then compare with the model diagram.</p>' +
        '<div class="sketch-wrap"><div class="sketch-tools"><span>Sketch pad</span><button type="button" class="btn quiet small" data-act="clear">Clear</button></div>' +
        '<canvas class="sketch" aria-label="Drawing area for your UML sketch"></canvas></div>' +
        '<label class="sr-only" for="ta-' + q.id + '">Notes about your diagram</label>' +
        '<textarea class="answer" id="ta-' + q.id + '" style="min-height:70px;margin-top:10px" placeholder="Optional: list your classes, methods and arrows">' + esc(saved.text || '') + '</textarea>';
    } else {
      html += '<label class="sr-only" for="ta-' + q.id + '">Your answer</label>' +
        '<textarea class="answer' + (q.t === 'code' ? ' mono' : '') + '" id="ta-' + q.id + '" spellcheck="' + (q.t === 'code' ? 'false' : 'true') +
        '" placeholder="' + (q.t === 'code' ? 'Write your TypeScript here…' : 'Type your answer as you would on the exam…') + '">' + esc(saved.text || '') + '</textarea>';
    }

    if (mode === 'practice') {
      html += '<div class="actions">' +
        (isWritten ? '<button type="button" class="btn" data-act="reveal">Show model answer</button>'
          : '<button type="button" class="btn" data-act="check" disabled>Check answer</button>') +
        '<button type="button" class="btn quiet" data-act="skip">Skip</button>' +
        '<span class="spacer"></span><span class="kbd-hint">' + (isWritten ? '' : 'Keys: A–' + LETTERS[options.length - 1] + ' to choose, Enter to check') + '</span></div>';
    }
    html += '<div data-slot="after"></div></article>';
    host.innerHTML = html;

    const card = host.querySelector('.qcard');
    const after = card.querySelector('[data-slot="after"]');
    const checkBtn = card.querySelector('[data-act="check"]');
    const textarea = card.querySelector('textarea');

    // ----- objective -----
    function selected() {
      const r = card.querySelector('input[type=radio]:checked');
      return r ? Number(r.value) : null;
    }
    card.querySelectorAll('input[type=radio]').forEach((r) =>
      r.addEventListener('change', () => {
        if (checkBtn) checkBtn.disabled = false;
        if (opts.onChange) opts.onChange({ choice: selected() });
      })
    );
    function gradeObjective() {
      const choice = selected();
      if (choice === null || graded) return;
      graded = true;
      const ok = choice === correctPos;
      card.querySelectorAll('.opt').forEach((el) => {
        const i = Number(el.dataset.i);
        el.setAttribute('aria-disabled', 'true');
        el.querySelector('input').disabled = true;
        if (i === correctPos) el.classList.add('is-correct');
        if (i === choice && !ok) el.classList.add('is-wrong');
      });
      const result = ok ? 'correct' : 'wrong';
      record(q, result);
      after.innerHTML = '<div class="feedback' + (ok ? '' : ' wrong') + '" role="status"><div class="verdict">' +
        (ok ? 'Correct.' : 'Not quite. The answer is ' + LETTERS[correctPos] + '.') + '</div>' +
        (q.e ? '<p>' + fmt(q.e) + '</p>' : '') + '</div>' + nextRow();
      wireNext();
      if (opts.onGraded) opts.onGraded(result);
    }
    if (checkBtn) checkBtn.addEventListener('click', gradeObjective);

    // ----- written -----
    if (textarea) {
      textarea.addEventListener('input', () => opts.onChange && opts.onChange({ text: textarea.value }));
      if (q.t === 'code') {
        textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const s = textarea.selectionStart, en = textarea.selectionEnd;
            textarea.value = textarea.value.slice(0, s) + '  ' + textarea.value.slice(en);
            textarea.selectionStart = textarea.selectionEnd = s + 2;
          }
        });
      }
    }
    const canvas = card.querySelector('canvas.sketch');
    if (canvas) setupSketch(canvas, card.querySelector('[data-act="clear"]'));

    const revealBtn = card.querySelector('[data-act="reveal"]');
    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        revealBtn.disabled = true;
        after.innerHTML = modelHTML(q, true);
        wireSelfGrade(after, (result) => {
          graded = true;
          record(q, result);
          after.querySelector('.selfgrade').outerHTML =
            '<div class="feedback ' + (result === 'correct' ? '' : result) + '" role="status"><div class="verdict">' +
            (result === 'correct' ? 'Marked right.' : result === 'partial' ? 'Marked partly right.' : 'Marked as missed. It will show up in Review misses.') +
            '</div></div>' + nextRow();
          wireNext();
          if (opts.onGraded) opts.onGraded(result);
        });
        after.querySelector('.model').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    const skipBtn = card.querySelector('[data-act="skip"]');
    if (skipBtn) skipBtn.addEventListener('click', () => opts.onNext && opts.onNext());

    function nextRow() {
      return '<div class="actions"><button type="button" class="btn" data-act="next">' + esc(opts.nextLabel || 'Next question') + '</button></div>';
    }
    function wireNext() {
      const nb = after.querySelector('[data-act="next"]');
      if (!nb) return;
      if (skipBtn) skipBtn.hidden = true;
      if (checkBtn) checkBtn.hidden = true;
      nb.addEventListener('click', () => opts.onNext && opts.onNext());
      nb.focus({ preventScroll: true });
    }

    // keyboard shortcuts for objective questions in practice
    function onKey(e) {
      if (!document.body.contains(card)) return document.removeEventListener('keydown', onKey);
      if (e.target.matches('textarea, input[type=text], input[type=number], select')) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!isWritten && !graded && mode !== 'review-lock') {
        const k = e.key.toUpperCase();
        let idx = LETTERS.indexOf(k);
        if (idx === -1 && /^[1-6]$/.test(e.key)) idx = Number(e.key) - 1;
        if (q.t === 'tf' && k === 'T') idx = 0;
        if (q.t === 'tf' && k === 'F') idx = 1;
        if (idx >= 0 && idx < options.length) {
          const input = card.querySelectorAll('input[type=radio]')[idx];
          input.checked = true;
          input.dispatchEvent(new Event('change'));
          input.focus();
          e.preventDefault();
          return;
        }
      }
      if (e.key === 'Enter' && mode === 'practice') {
        if (graded) {
          const nb = after.querySelector('[data-act="next"]');
          if (nb && document.activeElement !== nb) { e.preventDefault(); nb.click(); }
        } else if (!isWritten && selected() !== null) {
          e.preventDefault();
          gradeObjective();
        }
      }
    }
    document.addEventListener('keydown', onKey);

    return {
      answer() {
        if (!isWritten) return { choice: selected() };
        return { text: textarea ? textarea.value : '' };
      },
      order,
      correctPos,
    };
  }

  function modelHTML(q, withGrade) {
    let h = '<section class="model" aria-label="Model answer">';
    h += '<h4>Check your answer against the key points</h4><ul class="keypoints">';
    q.k.forEach((k, i) => {
      h += '<li><label><input type="checkbox" data-kp="' + i + '"><span>' + fmt(k) + '</span></label></li>';
    });
    h += '</ul>';
    if (q.svg) h += '<h4>Model diagram</h4><div class="uml-wrap">' + q.svg + '</div>';
    if (q.m) h += '<h4>Model answer</h4><div class="model-text">' + fmt(q.m) + '</div>';
    if (q.mc) h += '<h4>Model solution</h4>' + codeBlock(q.mc);
    if (q.e) h += '<p>' + fmt(q.e) + '</p>';
    if (withGrade) {
      h += '<div class="selfgrade"><span class="label">How did you do?</span>' +
        '<button type="button" class="btn" data-grade="correct">Got it</button>' +
        '<button type="button" class="btn grade-partial" data-grade="partial">Partly</button>' +
        '<button type="button" class="btn grade-wrong" data-grade="wrong">Missed it</button></div>';
    }
    return h + '</section>';
  }

  function wireSelfGrade(scope, onGrade) {
    const boxes = scope.querySelectorAll('[data-kp]');
    const btns = scope.querySelectorAll('[data-grade]');
    function suggest() {
      const n = boxes.length, c = [...boxes].filter((b) => b.checked).length;
      const s = c === 0 ? null : c === n ? 'correct' : c / n >= 0.5 ? 'partial' : 'wrong';
      btns.forEach((b) => b.classList.toggle('suggested', b.dataset.grade === s));
    }
    boxes.forEach((b) => b.addEventListener('change', suggest));
    btns.forEach((b) => b.addEventListener('click', () => onGrade(b.dataset.grade)));
  }

  function setupSketch(canvas, clearBtn) {
    const ctx = canvas.getContext('2d');
    let drawing = false, lastX = 0, lastY = 0;
    function size() {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const img = canvas.width ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (img) ctx.putImageData(img, 0, 0);
    }
    requestAnimationFrame(size);
    const pos = (e) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    canvas.addEventListener('pointerdown', (e) => {
      drawing = true;
      [lastX, lastY] = pos(e);
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!drawing) return;
      const [x, y] = pos(e);
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#172033';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      [lastX, lastY] = [x, y];
    });
    const stop = () => (drawing = false);
    canvas.addEventListener('pointerup', stop);
    canvas.addEventListener('pointercancel', stop);
    clearBtn.addEventListener('click', () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    });
  }

  /* ---------------- pages ---------------- */
  function pageHome() {
    const all = BANK.allQuestions();
    const answered = all.filter((q) => statusOf(q.id)).length;
    let sum = 0;
    all.forEach((q) => { const s = statusOf(q.id); if (s) sum += SCORE[s]; });
    const mastery = Math.round((sum / all.length) * 100);
    const misses = missedIds().length;

    let h = '<div class="page">';
    h += '<h1>Midterm 2 study</h1>';
    h += '<p class="lede">' + all.length + ' questions across ' + BANK.topics.length + ' topics. Each row of bubbles is one topic; each bubble is one question. Pick a topic to practice it, or mix everything in an exam simulation.</p>';
    h += '<div class="summary"><div><b>' + mastery + '%</b><span>overall mastery</span></div>' +
      '<div><b>' + answered + '</b><span>of ' + all.length + ' tried</span></div>' +
      '<div><b>' + misses + '</b><span>to review</span></div></div>';
    h += '<div class="btn-row"><a class="btn" href="#/exam">Start an exam simulation</a>' +
      '<a class="btn ghost" href="#/review">' + (misses ? 'Review ' + misses + ' missed' : 'Review misses') + '</a></div>';

    BANK.groups.forEach((g) => {
      const topics = BANK.topics.filter((t) => t.group === g.id);
      const n = topics.reduce((s, t) => s + t.questions.length, 0);
      h += '<section class="sheet" aria-labelledby="g-' + g.id + '"><div class="sheet-head"><h2 id="g-' + g.id + '">' + esc(g.title) + '</h2><span>' + n + ' questions</span></div>';
      topics.forEach((t) => {
        const st = topicStats(t);
        h += '<a class="sheet-row" href="#/topic/' + t.id + '"><span class="name">' + esc(t.title) + '</span>' + dotsHTML(t.questions) +
          '<span class="pct" aria-label="' + st.mastery + ' percent mastery, ' + st.answered + ' of ' + st.total + ' tried">' + st.mastery + '%</span></a>';
      });
      h += '</section>';
    });
    h += legendHTML();

    const theme = load(THEME_KEY, 'auto');
    h += '<div class="footer-tools"><span class="grow">Progress is saved in this browser only.</span>' +
      '<label>Theme <select id="themeSel"><option value="auto"' + (theme === 'auto' ? ' selected' : '') + '>Match system</option>' +
      '<option value="light"' + (theme === 'light' ? ' selected' : '') + '>Light</option><option value="dark"' + (theme === 'dark' ? ' selected' : '') + '>Dark</option></select></label>' +
      '<button class="btn quiet small" id="exportBtn">Export progress</button>' +
      '<label class="btn quiet small" for="importFile">Import progress</label><input type="file" id="importFile" accept="application/json" hidden>' +
      '<button class="btn quiet small" id="resetBtn">Reset progress</button></div>';
    h += '</div>';
    $main.innerHTML = h;

    document.getElementById('themeSel').addEventListener('change', (e) => {
      save(THEME_KEY, e.target.value);
      applyTheme(e.target.value);
    });
    document.getElementById('exportBtn').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'cs340-midterm2-progress.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    document.getElementById('importFile').addEventListener('change', async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      try {
        const data = JSON.parse(await f.text());
        if (!data || typeof data.answers !== 'object') throw new Error('No answers found in that file.');
        progress = { answers: data.answers };
        save(STORE_KEY, progress);
        toast('Progress imported.');
        render();
      } catch (err) {
        toast('Import failed: ' + err.message);
      }
    });
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', () => {
      if (resetBtn.dataset.armed) {
        progress = { answers: {} };
        save(STORE_KEY, progress);
        save(EXAM_KEY, null);
        toast('Progress reset.');
        render();
      } else {
        resetBtn.dataset.armed = '1';
        resetBtn.textContent = 'Click again to erase all progress';
        resetBtn.classList.add('grade-wrong');
        setTimeout(() => {
          if (!document.body.contains(resetBtn)) return;
          delete resetBtn.dataset.armed;
          resetBtn.textContent = 'Reset progress';
          resetBtn.classList.remove('grade-wrong');
        }, 4000);
      }
    });
  }

  /* ----- topic page ----- */
  const topicState = {}; // per-topic deck + filters, kept for the session

  function buildDeck(topic, st) {
    let qs = topic.questions.filter((q) =>
      st.filter === 'all' ? true : st.filter === 'written' ? WRITTEN.has(q.t) : q.t === st.filter
    );
    qs = shuffle(qs);
    if (st.focus) {
      const notYet = qs.filter((q) => statusOf(q.id) !== 'correct');
      const done = qs.filter((q) => statusOf(q.id) === 'correct');
      qs = notYet.concat(done);
    }
    st.deck = qs.map((q) => q.id);
    st.pos = 0;
  }

  function pageTopic(id, tab) {
    const topic = BANK.byId[id];
    if (!topic) return pageMissing();
    const st = topicState[id] || (topicState[id] = { filter: 'all', focus: false });
    if (!st.deck) buildDeck(topic, st);
    const showNotes = tab === 'notes';
    const stats = topicStats(topic);
    const groupTitle = BANK.groups.find((g) => g.id === topic.group).title;

    let h = '<div class="page">';
    h += '<div class="crumbs"><a href="#/">Progress</a> / ' + esc(groupTitle) + '</div>';
    h += '<h1>' + esc(topic.title) + '</h1>';
    h += '<div class="tabs" role="tablist">' +
      '<a class="tab" role="tab" href="#/topic/' + id + '" aria-selected="' + !showNotes + '">Practice</a>' +
      '<a class="tab" role="tab" href="#/topic/' + id + '/notes" aria-selected="' + showNotes + '">Study notes</a></div>';

    if (showNotes) {
      h += '<div class="notes">' + topic.notes + '</div>';
      h += '<div class="actions"><a class="btn" href="#/topic/' + id + '">Practice this topic</a></div></div>';
      $main.innerHTML = h;
      $main.querySelectorAll('.notes pre.code').forEach((pre) => {
        pre.innerHTML = '<code>' + highlight(pre.textContent) + '</code>';
      });
      return;
    }

    const chip = (val, label) => '<button type="button" class="chip" data-filter="' + val + '" aria-pressed="' + (st.filter === val) + '">' + label + '</button>';
    h += '<div class="filters" role="group" aria-label="Question types">' + chip('all', 'All') + chip('tf', 'True / false') +
      chip('mc', 'Multiple choice') + chip('written', 'Written & code') + '<span class="sep" aria-hidden="true"></span>' +
      '<label class="toggle"><input type="checkbox" id="focusTgl"' + (st.focus ? ' checked' : '') + '> Not-yet-right first</label></div>';
    h += '<div class="topic-strip"><div class="meta">' + stats.answered + ' of ' + stats.total + ' tried, ' + stats.mastery + '% mastery</div><div id="strip"></div></div>';
    h += '<div id="qhost"></div></div>';
    $main.innerHTML = h;

    $main.querySelectorAll('[data-filter]').forEach((b) =>
      b.addEventListener('click', () => {
        st.filter = b.dataset.filter;
        buildDeck(topic, st);
        render();
      })
    );
    document.getElementById('focusTgl').addEventListener('change', (e) => {
      st.focus = e.target.checked;
      buildDeck(topic, st);
      render();
    });

    const host = document.getElementById('qhost');
    const strip = document.getElementById('strip');
    function showCurrent() {
      const qid = st.deck[st.pos];
      strip.innerHTML = dotsHTML(topic.questions, qid);
      if (!qid) {
        host.innerHTML = '<div class="empty"><h2>' + (st.deck.length ? 'You went through every question in this set' : 'No questions match this filter') + '</h2>' +
          '<p>' + (st.deck.length ? 'Shuffle to go again, or switch topics.' : 'Pick a different question type.') + '</p>' +
          (st.deck.length ? '<div class="btn-row" style="justify-content:center"><button class="btn" id="again">Shuffle and start over</button>' +
            '<a class="btn ghost" href="#/topic/' + id + '/notes">Read the study notes</a></div>' : '') + '</div>';
        const again = document.getElementById('again');
        if (again) again.addEventListener('click', () => { buildDeck(topic, st); showCurrent(); });
        return;
      }
      mountQuestion(host, byId[qid], {
        mode: 'practice',
        label: 'Question ' + (st.pos + 1) + ' of ' + st.deck.length,
        nextLabel: st.pos + 1 < st.deck.length ? 'Next question' : 'Finish set',
        onGraded: () => {
          strip.innerHTML = dotsHTML(topic.questions, qid);
          const s2 = topicStats(topic);
          $main.querySelector('.topic-strip .meta').textContent = s2.answered + ' of ' + s2.total + ' tried, ' + s2.mastery + '% mastery';
        },
        onNext: () => {
          st.pos++;
          showCurrent();
          window.scrollTo({ top: 0 });
        },
      });
    }
    showCurrent();
  }

  /* ----- review misses ----- */
  const reviewState = { group: 'all', queue: [] };
  function pageReview() {
    const ids = missedIds().filter((id) => reviewState.group === 'all' || BANK.byId[byId[id].topic].group === reviewState.group);
    reviewState.queue = shuffle(ids);
    let h = '<div class="page"><h1>Review misses</h1>';
    h += '<p class="lede">Questions you missed or only partly got. A question leaves this list once you get it right; if you miss it again it goes to the back of the line.</p>';
    const chip = (val, label) => '<button type="button" class="chip" data-g="' + val + '" aria-pressed="' + (reviewState.group === val) + '">' + esc(label) + '</button>';
    h += '<div class="filters" role="group" aria-label="Filter by area">' + chip('all', 'All areas') + BANK.groups.map((g) => chip(g.id, g.title)).join('') + '</div>';
    h += '<p class="kbd-hint" id="remain"></p><div id="qhost"></div></div>';
    $main.innerHTML = h;
    $main.querySelectorAll('[data-g]').forEach((b) =>
      b.addEventListener('click', () => {
        reviewState.group = b.dataset.g;
        render();
      })
    );
    const host = document.getElementById('qhost');
    const remain = document.getElementById('remain');
    function next() {
      reviewState.queue = reviewState.queue.filter((id) => statusOf(id) !== 'correct');
      const qid = reviewState.queue[0];
      if (!qid) {
        remain.textContent = '';
        host.innerHTML = '<div class="empty"><h2>Nothing to review</h2><p>Questions you miss in practice or in an exam simulation show up here.</p>' +
          '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/exam">Start an exam simulation</a><a class="btn ghost" href="#/">Pick a topic</a></div></div>';
        renderRail();
        return;
      }
      remain.textContent = reviewState.queue.length + ' left to get right';
      mountQuestion(host, byId[qid], {
        mode: 'practice',
        label: 'Was: ' + (statusOf(qid) === 'partial' ? 'partly right' : 'missed'),
        onGraded: (result) => {
          reviewState.queue.shift();
          if (result !== 'correct') reviewState.queue.push(qid);
          remain.textContent = reviewState.queue.filter((id) => statusOf(id) !== 'correct').length + ' left to get right';
        },
        onNext: () => {
          if (reviewState.queue[0] === qid) {
            // skipped: move to back
            reviewState.queue.push(reviewState.queue.shift());
          }
          next();
          window.scrollTo({ top: 0 });
        },
      });
    }
    next();
  }

  /* ----- exam simulation ----- */
  let exam = load(EXAM_KEY, null);
  const saveExam = () => save(EXAM_KEY, exam);

  function buildExam(count, groups, includeWritten) {
    const topics = shuffle(BANK.topics.filter((t) => groups.includes(t.group)));
    const writtenTarget = includeWritten ? Math.max(1, Math.round(count * 0.25)) : 0;
    const objTarget = count - writtenTarget;
    function pick(n, pred) {
      const pools = topics.map((t) => shuffle(t.questions.filter(pred)));
      const out = [];
      let i = 0, guard = 0;
      while (out.length < n && guard < 10000) {
        const pool = pools[i % pools.length];
        if (pool.length) out.push(pool.pop());
        i++;
        guard++;
        if (pools.every((p) => !p.length)) break;
      }
      return out;
    }
    const qs = shuffle(pick(objTarget, (q) => !WRITTEN.has(q.t)).concat(pick(writtenTarget, (q) => WRITTEN.has(q.t))));
    // keep written questions toward the end, like the real exam's essay section
    qs.sort((a, b) => (WRITTEN.has(a.t) ? 1 : 0) - (WRITTEN.has(b.t) ? 1 : 0));
    return {
      items: qs.map((q) => ({
        id: q.id,
        order: q.t === 'mc' ? (q.fixed ? q.o.map((_, i) => i) : shuffle(q.o.map((_, i) => i))) : null,
        answer: {},
        result: null,
      })),
      pos: 0,
      submitted: false,
      started: Date.now(),
    };
  }

  function pageExam() {
    if (!exam) return pageExamSetup();
    if (exam.submitted) return pageExamResults();
    return pageExamRun();
  }

  function pageExamSetup() {
    let h = '<div class="page"><h1>Exam simulation</h1>';
    h += '<p class="lede">Random questions across topics, shuffled. As on the real exam you get no feedback until you submit. True/false and multiple choice are graded automatically; you grade written answers against the key points afterward.</p>';
    h += '<form class="panel" id="examForm"><h2>Set up your exam</h2>';
    h += '<div class="field"><span class="label">Number of questions</span><div class="checks">' +
      [10, 20, 30, 50].map((n) => '<label><input type="radio" name="count" value="' + n + '"' + (n === 30 ? ' checked' : '') + '> ' + n + '</label>').join('') + '</div></div>';
    h += '<div class="field"><span class="label">Areas</span><div class="checks">' +
      BANK.groups.map((g) => '<label><input type="checkbox" name="grp" value="' + g.id + '" checked> ' + esc(g.title) + '</label>').join('') + '</div></div>';
    h += '<div class="field"><label class="toggle"><input type="checkbox" name="written" checked> Include written and code questions (about a quarter of the exam)</label></div>';
    h += '<p class="kbd-hint" id="formErr" role="alert"></p>';
    h += '<button class="btn" type="submit">Start exam</button></form></div>';
    $main.innerHTML = h;
    document.getElementById('examForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      const groups = [...f.querySelectorAll('[name=grp]:checked')].map((x) => x.value);
      if (!groups.length) {
        document.getElementById('formErr').textContent = 'Pick at least one area to include.';
        return;
      }
      exam = buildExam(Number(f.querySelector('[name=count]:checked').value), groups, f.querySelector('[name=written]').checked);
      saveExam();
      render();
    });
  }

  function isAnswered(item) {
    return item.answer && (item.answer.choice != null || (item.answer.text && item.answer.text.trim()));
  }

  function pageExamRun() {
    const item = exam.items[exam.pos];
    const q = byId[item.id];
    const answeredCount = exam.items.filter(isAnswered).length;
    let h = '<div class="page"><h1>Exam simulation</h1>';
    h += '<p class="lede">' + answeredCount + ' of ' + exam.items.length + ' answered. Jump to any question with the bubbles below.</p>';
    h += '<nav class="palette" aria-label="Questions">' + exam.items.map((it, i) =>
      '<button type="button" class="pal' + (isAnswered(it) ? ' answered' : '') + (i === exam.pos ? ' current' : '') + '" data-go="' + i +
      '" aria-label="Question ' + (i + 1) + (isAnswered(it) ? ', answered' : '') + '"' + (i === exam.pos ? ' aria-current="step"' : '') + '>' + (i + 1) + '</button>'
    ).join('') + '</nav>';
    h += '<div id="qhost"></div>';
    h += '<div class="actions"><button type="button" class="btn quiet" id="prev"' + (exam.pos === 0 ? ' disabled' : '') + '>Previous</button>' +
      '<button type="button" class="btn quiet" id="next"' + (exam.pos === exam.items.length - 1 ? ' disabled' : '') + '>Next</button>' +
      '<span class="spacer"></span><button type="button" class="btn quiet small" id="quit">Discard exam</button>' +
      '<button type="button" class="btn" id="submit">Submit exam</button></div><div id="confirm"></div></div>';
    $main.innerHTML = h;

    mountQuestion(document.getElementById('qhost'), q, {
      mode: 'exam',
      label: 'Question ' + (exam.pos + 1) + ' of ' + exam.items.length,
      order: item.order,
      saved: item.answer,
      onChange: (ans) => {
        item.answer = ans;
        saveExam();
        const btn = $main.querySelector('.pal[data-go="' + exam.pos + '"]');
        if (btn) btn.classList.toggle('answered', !!isAnswered(item));
        $main.querySelector('.lede').textContent = exam.items.filter(isAnswered).length + ' of ' + exam.items.length + ' answered. Jump to any question with the bubbles below.';
      },
    });

    const go = (i) => { exam.pos = i; saveExam(); render(); window.scrollTo({ top: 0 }); };
    $main.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.go))));
    document.getElementById('prev').addEventListener('click', () => go(exam.pos - 1));
    document.getElementById('next').addEventListener('click', () => go(exam.pos + 1));
    const quit = document.getElementById('quit');
    quit.addEventListener('click', () => {
      if (quit.dataset.armed) { exam = null; save(EXAM_KEY, null); render(); return; }
      quit.dataset.armed = '1';
      quit.textContent = 'Click again to discard';
    });
    document.getElementById('submit').addEventListener('click', () => {
      const missing = exam.items.length - exam.items.filter(isAnswered).length;
      const box = document.getElementById('confirm');
      if (missing && !box.dataset.shown) {
        box.dataset.shown = '1';
        box.innerHTML = '<div class="feedback partial" role="alert"><div class="verdict">' + missing + ' question' + (missing > 1 ? 's are' : ' is') +
          ' blank.</div><p>Blank questions count as missed. Click Submit exam again to finish anyway.</p></div>';
        return;
      }
      submitExam();
    });
  }

  function submitExam() {
    exam.items.forEach((it) => {
      const q = byId[it.id];
      if (WRITTEN.has(q.t)) {
        if (!isAnswered(it)) { it.result = 'wrong'; record(q, 'wrong'); }
        return; // graded by the student on the results page
      }
      const correctPos = q.t === 'tf' ? (q.a ? 0 : 1) : it.order.indexOf(q.a);
      it.result = it.answer.choice === correctPos ? 'correct' : 'wrong';
      record(q, it.result);
    });
    exam.submitted = true;
    exam.finished = Date.now();
    saveExam();
    render();
    window.scrollTo({ top: 0 });
  }

  function pageExamResults() {
    const items = exam.items;
    const graded = items.filter((it) => it.result);
    const pending = items.length - graded.length;
    const points = graded.reduce((s, it) => s + SCORE[it.result], 0);
    const pct = Math.round((points / items.length) * 100);
    const mins = Math.max(1, Math.round((exam.finished - exam.started) / 60000));

    // per-topic breakdown
    const per = {};
    items.forEach((it) => {
      const t = byId[it.id].topic;
      per[t] = per[t] || { n: 0, pts: 0, pending: 0 };
      per[t].n++;
      if (it.result) per[t].pts += SCORE[it.result];
      else per[t].pending++;
    });

    let h = '<div class="page"><h1>Exam results</h1>';
    h += '<div class="panel"><div class="score-big">' + pct + '%</div><div class="score-sub">' + points + ' of ' + items.length + ' points, ' + mins + ' min' +
      (pending ? '. ' + pending + ' written answer' + (pending > 1 ? 's' : '') + ' still to grade below, so this score will change.' : '.') + '</div>';
    h += '<div class="palette" style="margin-top:16px" aria-label="Results by question">' + items.map((it, i) =>
      '<button type="button" class="pal ' + (it.result || 'pending') + '" data-jump="' + i + '" aria-label="Question ' + (i + 1) + ': ' + (it.result || 'needs grading') + '">' + (i + 1) + '</button>'
    ).join('') + '</div>';
    h += '<div class="btn-row"><button class="btn" id="newExam">New exam</button><a class="btn ghost" href="#/review">Review misses</a></div></div>';

    h += '<div class="panel"><h2>By topic</h2>';
    Object.keys(per).sort((a, b) => per[a].pts / per[a].n - per[b].pts / per[b].n).forEach((tid) => {
      const p = per[tid];
      h += '<a class="sheet-row" style="padding-left:0;padding-right:0" href="#/topic/' + tid + '"><span class="name">' + esc(BANK.byId[tid].title) + '</span>' +
        '<span class="kbd-hint">' + p.pts + ' / ' + p.n + (p.pending ? ' (' + p.pending + ' to grade)' : '') + '</span><span class="pct">' + Math.round((p.pts / p.n) * 100) + '%</span></a>';
    });
    h += '</div>';

    h += '<div class="panel"><h2>Every question</h2>';
    items.forEach((it, i) => {
      const q = byId[it.id];
      const tagText = { correct: 'Right', wrong: 'Missed', partial: 'Partly right' }[it.result] || 'Grade this';
      h += '<div class="result-item" id="r-' + i + '"><div class="result-head"><b>' + (i + 1) + '.</b><span class="tag ' + (it.result || 'pending') + '">' + tagText + '</span>' +
        '<span class="kbd-hint">' + TYPE_LABEL[q.t] + ', ' + esc(BANK.byId[q.topic].title) + '</span></div>';
      h += '<p class="qtext">' + fmt(q.q) + '</p>' + (q.c ? codeBlock(q.c) : '');
      if (!WRITTEN.has(q.t)) {
        const opts = q.t === 'tf' ? ['True', 'False'] : it.order.map((k) => q.o[k]);
        const correctPos = q.t === 'tf' ? (q.a ? 0 : 1) : it.order.indexOf(q.a);
        h += '<div class="options">' + opts.map((text, k) =>
          '<div class="opt' + (k === correctPos ? ' is-correct' : '') + (k === it.answer.choice && k !== correctPos ? ' is-wrong' : '') + '" aria-disabled="true">' +
          '<span class="bubble" style="' + (k === it.answer.choice ? 'background:var(--pencil);color:var(--surface);border-color:var(--pencil)' : '') + '">' + LETTERS[k] + '</span>' +
          '<span class="otext">' + fmt(text) + (k === it.answer.choice ? ' <span class="kbd-hint">(your answer)</span>' : '') + '</span></div>'
        ).join('') + '</div>';
        if (it.answer.choice == null) h += '<p class="kbd-hint">You left this blank.</p>';
        if (q.e) h += '<div class="feedback' + (it.result === 'correct' ? '' : ' wrong') + '"><p>' + fmt(q.e) + '</p></div>';
      } else {
        h += '<h4>Your answer</h4><div class="your-answer' + (q.t === 'code' ? ' mono' : '') + '">' + (isAnswered(it) ? esc(it.answer.text) : '<i>Blank</i>') + '</div>';
        h += '<div data-model="' + i + '">' + modelHTML(q, !it.result) + '</div>';
      }
      h += '</div>';
    });
    h += '</div></div>';
    $main.innerHTML = h;

    $main.querySelectorAll('[data-jump]').forEach((b) =>
      b.addEventListener('click', () => document.getElementById('r-' + b.dataset.jump).scrollIntoView({ behavior: 'smooth', block: 'start' }))
    );
    document.getElementById('newExam').addEventListener('click', () => { exam = null; save(EXAM_KEY, null); render(); });
    $main.querySelectorAll('[data-model]').forEach((box) => {
      const i = Number(box.dataset.model);
      wireSelfGrade(box, (result) => {
        const it = exam.items[i];
        it.result = result;
        record(byId[it.id], result);
        saveExam();
        const y = window.scrollY;
        render();
        window.scrollTo({ top: y });
      });
    });
  }

  function pageMissing() {
    $main.innerHTML = '<div class="page"><div class="empty"><h2>That page doesn\'t exist</h2><p><a href="#/">Go to your progress</a></p></div></div>';
  }

  /* ---------------- router ---------------- */
  function render() {
    const [page, id, sub] = currentRoute();
    renderRail();
    if (page === '') pageHome();
    else if (page === 'topic') pageTopic(id, sub);
    else if (page === 'exam') pageExam();
    else if (page === 'review') pageReview();
    else pageMissing();
    document.title = (page === 'topic' && BANK.byId[id] ? BANK.byId[id].title + ' | ' : page === 'exam' ? 'Exam simulation | ' : page === 'review' ? 'Review misses | ' : '') + 'CS 340 Midterm 2 Study';
  }
  let lastRoute = null;
  window.addEventListener('hashchange', () => {
    const r = location.hash;
    render();
    if (lastRoute !== r) { $main.focus({ preventScroll: true }); window.scrollTo({ top: 0 }); }
    lastRoute = r;
  });
  render();
})();
