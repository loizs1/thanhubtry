// =====================
// HEADER SCROLL EFFECT
// =====================

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // =====================
  // LIVE USER COUNTER
  // =====================

  const liveUsers = document.getElementById("liveUsers");
  if (liveUsers) {
    let base = 1247;

    setInterval(() => {
      base += Math.floor(Math.random() * 3 - 1);
      liveUsers.textContent = base.toLocaleString();
    }, 4000);
  }
});