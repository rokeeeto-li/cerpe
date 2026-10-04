/* Theme: follow the system unless the visitor has picked one (same logic as the homepage). */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark';
    if (dark) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'dark');
    try { localStorage.setItem('theme', dark ? 'light' : 'dark'); } catch (e) {}
  });
  if (!window.matchMedia) return;
  var mq = matchMedia('(prefers-color-scheme: dark)');
  function sync(e) {
    var saved = null; try { saved = localStorage.getItem('theme'); } catch (x) {}
    if (saved === 'dark' || saved === 'light') return;
    if (e.matches) root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
  }
  if (mq.addEventListener) mq.addEventListener('change', sync); else if (mq.addListener) mq.addListener(sync);
})();

/* Qualitative results: switch between settings. */
(function () {
  var data = {
    carla: {
      src: './static/images/carla_quali.jpg', w: 3090, h: 2234,
      alt: 'CERPE qualitative results in CARLA',
      caption: 'CARLA encounters transition between overlapping and non-overlapping views as vehicles cross an intersection. CERPE maintains a temporally stable relative trajectory through the transition.'
    },
    mars: {
      src: './static/images/mars_quali.jpg', w: 3143, h: 2261,
      alt: 'CERPE qualitative results in the OpenMars real-world driving dataset',
      caption: 'OpenMars contains longer trajectories and extended low-overlap periods. Direct estimates correct accumulated drift when overlap resumes.'
    },
    robots: {
      src: './static/images/physical_robot_team.jpg', w: 2874, h: 2436,
      alt: 'CERPE qualitative results on indoor physical robot teams',
      caption: 'Indoor teams introduce close-range perspective changes, occlusion, and dynamic objects. Quantitative accuracy is measured on mocap-covered samples.'
    }
  };
  var img = document.getElementById('result-image');
  var cap = document.getElementById('result-caption');
  var tabs = document.querySelectorAll('[data-result]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var r = data[tab.dataset.result];
      if (!r || !img || !cap) return;
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
      });
      img.src = r.src; img.alt = r.alt; img.width = r.w; img.height = r.h;
      cap.textContent = r.caption;
    });
  });
})();

/* Deployment videos. */
(function () {
  var videos = [
    { src: 'https://www.youtube-nocookie.com/embed/f-IYKQ4XJKs?rel=0', title: 'CERPE Demo Campus 01', caption: 'CERPE Campus 01 demonstration.' },
    { src: 'https://www.youtube-nocookie.com/embed/tF44yfTIi_E?rel=0', title: 'CERPE Demo Campus 02', caption: 'CERPE Campus 02 demonstration.' },
    { src: 'https://www.youtube-nocookie.com/embed/WJws7E5LPLE?rel=0', title: 'CERPE Demo Campus 03', caption: 'CERPE Campus 03 demonstration.' },
    { src: 'https://www.youtube-nocookie.com/embed/l08B09iKrHo?rel=0', title: 'CERPE Demo Join Team', caption: 'CERPE Join Team demonstration.' }
  ];
  var frame = document.getElementById('deployment-video');
  var cap = document.getElementById('deployment-video-caption');
  var tabs = document.querySelectorAll('[data-video]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var v = videos[Number(tab.dataset.video)];
      if (!v || !frame || !cap) return;
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
      });
      frame.src = v.src; frame.title = v.title; cap.textContent = v.caption;
    });
  });
})();

/* BibTeX copy button. */
(function () {
  var btn = document.querySelector('.copy');
  var status = document.querySelector('.copy-status');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var el = document.getElementById('bibtex-code');
    if (!el || !navigator.clipboard) { if (status) status.textContent = 'Select the text to copy it.'; return; }
    navigator.clipboard.writeText(el.textContent).then(function () {
      btn.textContent = 'Copied';
      if (status) status.textContent = 'BibTeX copied to clipboard.';
      setTimeout(function () { btn.textContent = 'Copy'; if (status) status.textContent = ''; }, 1800);
    }, function () { if (status) status.textContent = 'Select the text to copy it.'; });
  });
})();

/* Click a figure to view it larger. */
(function () {
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  var big = lb.querySelector('img');
  function close() { lb.classList.remove('open'); big.removeAttribute('src'); }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.tagName === 'IMG' && t.closest('figure')) { big.src = t.currentSrc || t.src; big.alt = t.alt; lb.classList.add('open'); }
    else if (lb.classList.contains('open')) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
