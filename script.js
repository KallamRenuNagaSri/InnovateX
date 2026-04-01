function openLink(link) {
  if (!link || link === "#") return;
  window.open(link, "_blank", "noopener,noreferrer");
}

// Countdown timer
const deadline = new Date("April 5, 2026 23:59:59").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = deadline - now;
  const el = document.getElementById("countdown-timer");
  if (!el) return;
  if (distance < 0) {
    el.innerHTML = "Registration Closed";
    return;
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  el.innerHTML = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

document.addEventListener("DOMContentLoaded", () => {
  const typedEl = document.getElementById("typed-output");
  if (typedEl && typeof Typed !== "undefined") {
    new Typed("#typed-output", {
      strings: [
        "Think Open.",
        "Build the Future.",
        "Innovate Without Limits.",
      ],
      typeSpeed: 55,
      backSpeed: 42,
      backDelay: 1600,
      startDelay: 400,
      loop: true,
      smartBackspace: true,
    });
  }

  const navToggle = document.querySelector(".landing-nav__toggle");
  const drawer = document.getElementById("landing-nav-drawer");
  if (navToggle && drawer) {
    navToggle.addEventListener("click", () => {
      const open = drawer.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  const roadmapItems = document.querySelectorAll('.roadmap-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  roadmapItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(24px)';
    observer.observe(item);
  });

  document.querySelectorAll(".landing-nav__actions .btn-nav-cta").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!drawer || !navToggle || !drawer.classList.contains("is-open")) return;
      drawer.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });

  // Roadmap scroll animation
  const roadmapContents = document.querySelectorAll('.roadmap-content');
  const roadmapObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        roadmapObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  roadmapContents.forEach(el => roadmapObserver.observe(el));

  // Team section: Branch visibility + auto switching for CSI/GDG
  let current = 'csi';
  let timer = null;

  function showSection(type) {
    const csiBranch = document.querySelector('.branch--csi');
    const gdgBranch = document.querySelector('.branch--gdg');
    const csiBtn = document.querySelector('.csi-btn');
    const gdgBtn = document.querySelector('.gdg-btn');
    const descTitle = document.getElementById('desc-title');
    const descText = document.getElementById('desc-text');

    if (!csiBranch || !gdgBranch) return;

    // Remove active from all
    csiBranch.classList.remove('active');
    gdgBranch.classList.remove('active');
    csiBtn?.classList.remove('active');
    gdgBtn?.classList.remove('active');

    // Add active to selected
    if (type === 'csi') {
      csiBranch.classList.add('active');
      csiBtn?.classList.add('active');
      descTitle.textContent = 'CSI (Computer Society of India) SAHE';
      descText.textContent = 'Computer Society of India (CSI) is the national body of computer professionals in India, established in 1965. With a strong network of chapters and student branches across the country, CSI promotes technical knowledge, innovation, and professional growth among students and developers.';
    } else {
      gdgBranch.classList.add('active');
      gdgBtn?.classList.add('active');
      descTitle.textContent = 'GDG (Google Developer Group) VRSEC';
      descText.textContent = 'Google Developer Groups (GDGs) are community-driven developer groups supported by Google. They bring together developers interested in technologies like Android, Web, Cloud, and AI, providing opportunities for learning, collaboration, and hands-on experience through workshops, hackathons, and tech events.';
    }

    current = type;
  }

  function startAutoSwitch() {
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      if (current === 'csi') {
        showSection('gdg');
      } else {
        showSection('csi');
      }
    }, 20000);
  }

  const csiBtn = document.querySelector('.csi-btn');
  const gdgBtn = document.querySelector('.gdg-btn');

  if (csiBtn) {
    csiBtn.addEventListener('click', () => {
      showSection('csi');
      startAutoSwitch();
    });
  }

  if (gdgBtn) {
    gdgBtn.addEventListener('click', () => {
      showSection('gdg');
      startAutoSwitch();
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    showSection('csi');
    startAutoSwitch();
  });
});
