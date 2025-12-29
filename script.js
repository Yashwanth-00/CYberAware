// sidebar toggle behavior for all pages
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar .toggle');
  if(!sidebar || !toggle) return;

  // set initial collapsed state from localStorage? optional
  const saved = localStorage.getItem('sidebar-collapsed');
  if (saved === 'true') sidebar.classList.add('closed');

  toggle.addEventListener('click', () => {
    const closing = sidebar.classList.toggle('closed');
    localStorage.setItem('sidebar-collapsed', closing ? 'true' : 'false');
    // update aria
    toggle.setAttribute('aria-expanded', !closing);
  });

  // keyboard accessible toggle (Enter/Space)
  toggle.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle.click();
    }
    
    
  });
});

// Attacks submenu toggle behavior
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const attacksMenu = document.getElementById('attacksMenu');
  const attacksSub = document.getElementById('attacksSub');

  if (!attacksMenu || !attacksSub) return;

  function openSidebarIfCollapsed() {
    if (sidebar.classList.contains('closed')) {
      sidebar.classList.remove('closed');
      // if you persist state in localStorage update it here as well
      localStorage && localStorage.setItem('sidebar-collapsed', 'false');
    }
  }

  function setExpanded(expanded) {
    attacksMenu.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    attacksSub.setAttribute('aria-hidden', expanded ? 'false' : 'true');
  }

  // click toggles submenu (and expands sidebar first if collapsed)
  attacksMenu.addEventListener('click', (e) => {
    // prevent clicks on sub-items bubbling up (if target is sub-item)
    if (e.target.closest('.sub-item')) return;
    if (sidebar.classList.contains('closed')) {
      // expand first then open submenu a tick later for better UX
      openSidebarIfCollapsed();
      setTimeout(() => setExpanded(true), 160);
    } else {
      const currently = attacksMenu.getAttribute('aria-expanded') === 'true';
      setExpanded(!currently);
    }
  });

  // keyboard accessibility
  attacksMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      attacksMenu.click();
    }
    if (e.key === 'Escape') {
      setExpanded(false);
      attacksMenu.blur();
    }
  });

  // close submenu when clicking outside (optional nice-to-have)
  document.addEventListener('click', (e) => {
    if (!attacksMenu.contains(e.target)) {
      setExpanded(false);
    }
  });
});
