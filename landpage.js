// =========================
// PILL CLICK LOGIC
// =========================

let isManualScroll = false;

document.querySelectorAll('.pill-item[data-target]').forEach(pill => {
  pill.addEventListener('click', e => {
    e.preventDefault(); // stop jump

    isManualScroll = true; // prevent observer conflict

    document.querySelectorAll('.pill-item')
      .forEach(p => p.classList.remove('active'));

    pill.classList.add('active');

    const section = document.getElementById(pill.dataset.target);

    if (section) {

      // ---- MOBILE SAFE OFFSET SCROLL FIX ----
      const spacing = 20; // visual spacing from top
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - spacing;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    // Unlock observer after scroll finishes
    setTimeout(() => {
      isManualScroll = false;
    }, 900);
  });
});


// =========================
// FAQ ACCORDION
// =========================

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;

    document.querySelectorAll('.faq-item')
      .forEach(i => i !== item && i.classList.remove('active'));

    item.classList.toggle('active');
  });
});


// =========================
// AUTO-ACTIVE PILL ON SCROLL
// =========================

const sections = ['home', 'faq', 'resellers'];

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {

      if (entry.isIntersecting && !isManualScroll) {

        document.querySelectorAll('.pill-item')
          .forEach(p => p.classList.remove('active'));

        const activePill = document.querySelector(
          `.pill-item[data-target="${entry.target.id}"]`
        );

        if (activePill) activePill.classList.add('active');
      }

    });
  },
  { threshold: 0.6 }
);

sections.forEach(id => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});


// =====================
// DISCORD LIVE COUNT
// =====================

document.addEventListener("DOMContentLoaded", () => {
  const inviteCode = "thanhub";
  const onlineEl = document.getElementById("discordTotal");

  async function loadOnlineCount() {
    try {
      const res = await fetch(
        `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`
      );

      const data = await res.json();

      if (onlineEl && data.approximate_presence_count) {
        const onlineCount = Number(data.approximate_presence_count);
        animateCount(onlineEl, onlineCount, 1400);
      }

    } catch {
      if (onlineEl) onlineEl.textContent = "—";
    }
  }

  loadOnlineCount();
  setInterval(loadOnlineCount, 30 * 1000);
});


// =====================
// COUNT ANIMATION
// =====================

function animateCount(el, target, duration = 1200) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}
