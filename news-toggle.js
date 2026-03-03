(function () {
  const N = 6;

  function init() {
    const list = document.getElementById('news-list');
    if (!list) return;

    const items = Array.from(list.querySelectorAll('li'));
    if (items.length <= N) return;

    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'news-toggle';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-controls', 'news-list');
    list.insertAdjacentElement('afterend', btn);

    let expanded = false;

    function collapsedHeightPx() {
      const target = items[N - 1];
      if (!target) return 0;
      const bottom = target.offsetTop + target.offsetHeight;
      const mb = parseFloat(getComputedStyle(target).marginBottom || '0') || 0;
      return Math.ceil(bottom + mb);
    }

    function setBtnText() {
      btn.textContent = expanded ? 'See less' : 'See more';
      btn.setAttribute('aria-expanded', String(expanded));
      list.setAttribute('data-collapsed', expanded ? 'false' : 'true');
    }

    function applyMaxHeight(px) {
      list.style.maxHeight = `${px}px`;
    }

    function collapse() {
      applyMaxHeight(list.scrollHeight);
      list.offsetHeight; // force reflow
      applyMaxHeight(collapsedHeightPx());
      expanded = false;
      setBtnText();
    }

    function expand() {
      applyMaxHeight(list.scrollHeight);
      expanded = true;
      setBtnText();
    }

    function recalibrate() {
      if (expanded) applyMaxHeight(list.scrollHeight);
      else applyMaxHeight(collapsedHeightPx());
    }

    applyMaxHeight(list.scrollHeight);
    list.offsetHeight;
    collapse();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      expanded ? collapse() : expand();
    });

    window.addEventListener('resize', recalibrate);
    setTimeout(recalibrate, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();