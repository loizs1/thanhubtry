// PILL CLICK LOGIC
document.querySelectorAll('.pill-item[data-target]').forEach(pill => {
  pill.addEventListener('click', e => {
    e.preventDefault(); // stop jump

    document.querySelectorAll('.pill-item')
      .forEach(p => p.classList.remove('active'));

    pill.classList.add('active');

    const section = document.getElementById(pill.dataset.target);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// FAQ ACCORDION
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;

    document.querySelectorAll('.faq-item')
      .forEach(i => i !== item && i.classList.remove('active'));

    item.classList.toggle('active');
  });
});

/* =========================
   AUTO-ACTIVE PILL ON SCROLL
========================= */

const sections = ['home', 'faq', 'resellers'];

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.pill-item')
          .forEach(p => p.classList.remove('active'));

        const activePill = document.querySelector(
          `.pill-item[data-target="${entry.target.id}"]`
        );

        if (activePill) activePill.classList.add('active');
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach(id => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});