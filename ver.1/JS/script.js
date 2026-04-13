// ===============================
// CYberAware Global UI Script
// Clean, Modular, Resume-Ready
// ===============================

(function () {

  // -------------------------------
  // Utility Functions
  // -------------------------------

  function $(selector, scope = document) {
    return scope.querySelector(selector);
  }

  function $all(selector, scope = document) {
    return scope.querySelectorAll(selector);
  }

  function onReady(fn) {
    document.addEventListener("DOMContentLoaded", fn);
  }

  // -------------------------------
  // Sidebar Controller
  // -------------------------------

  function initSidebar() {
    const sidebar = $(".sidebar");
    const toggleBtn = $(".sidebar .toggle");

    if (!sidebar || !toggleBtn) return;

    // Load saved state
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState === "true") {
      sidebar.classList.add("closed");
      toggleBtn.setAttribute("aria-expanded", "false");
    }

    toggleBtn.addEventListener("click", () => {
      const isClosed = sidebar.classList.toggle("closed");
      localStorage.setItem("sidebar-collapsed", isClosed);
      toggleBtn.setAttribute("aria-expanded", !isClosed);
    });

    // Keyboard accessibility
    toggleBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleBtn.click();
      }
    });
  }

  // -------------------------------
  // Submenu Controller
  // -------------------------------

  function initSubmenu() {
    const sidebar = $(".sidebar");
    const attacksMenu = $("#attacksMenu");
    const attacksSub = $("#attacksSub");

    if (!attacksMenu || !attacksSub) return;

    function setExpanded(state) {
      attacksMenu.setAttribute("aria-expanded", state);
      attacksSub.setAttribute("aria-hidden", !state);
    }

    attacksMenu.addEventListener("click", (e) => {
      if (e.target.closest(".sub-item")) return;

      const expanded = attacksMenu.getAttribute("aria-expanded") === "true";
      setExpanded(!expanded);
    });

    attacksMenu.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        attacksMenu.click();
      }
      if (e.key === "Escape") {
        setExpanded(false);
      }
    });

    document.addEventListener("click", (e) => {
      if (!attacksMenu.contains(e.target)) {
        setExpanded(false);
      }
    });
  }

  // -------------------------------
  // Active Link Highlighting
  // -------------------------------

  function initActiveNav() {
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = $all(".nav-item, .sub-item");

    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;

      if (href.includes(currentPath)) {
        link.classList.add("active");

        // If inside submenu, expand it
        const parentSub = link.closest(".sub-wrap");
        if (parentSub) {
          parentSub.setAttribute("aria-hidden", "false");
          const menu = $("#attacksMenu");
          if (menu) menu.setAttribute("aria-expanded", "true");
        }
      }
    });
  }

  // -------------------------------
  // Smooth Scroll Enhancement
  // -------------------------------

  function initSmoothScroll() {
    const internalLinks = $all('a[href^="#"]');

    internalLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        const target = $(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
  }

  // -------------------------------
  // Initialize Everything
  // -------------------------------

  onReady(() => {
    initSidebar();
    initSubmenu();
    initActiveNav();
    initSmoothScroll();
  });

})();