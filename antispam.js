(function () {
  const REDIRECT_URL = "https://loot-link.com/s?VXdTXLEm";

  const ACCESS_UNTIL_KEY = "than_hub_access_until";
  const SPAM_KEY = "than_hub_spam";
  const VERIFYING_KEY = "than_hub_verifying";
  const LOADED_KEY = "than_hub_loaded_once";

  const WINDOW = 10 * 60 * 1000; // 10 minutes

  const isDev =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.port !== "";

  if (isDev) return;

  const now = Date.now();

  /* =================================================
     ✅ USER RETURNED FROM VERIFICATION
     ================================================= */
  if (localStorage.getItem(VERIFYING_KEY) === "1") {
    localStorage.removeItem(VERIFYING_KEY);
    localStorage.removeItem(SPAM_KEY);
    localStorage.setItem(ACCESS_UNTIL_KEY, now + WINDOW);
    sessionStorage.setItem(LOADED_KEY, "true");
    scheduleAutoReload();
    return;
  }

  const accessUntil = Number(localStorage.getItem(ACCESS_UNTIL_KEY));
  const isSpam = localStorage.getItem(SPAM_KEY) === "1";
  const loadedBefore = sessionStorage.getItem(LOADED_KEY);

  /* =================================================
     🚫 USER BLOCKED BY SPAM
     ================================================= */
  if (isSpam && now < accessUntil) {
    localStorage.setItem(VERIFYING_KEY, "1");
    showPopupAndRedirect();
    return;
  }

  /* =================================================
     ✅ NORMAL / FIRST ACCESS
     ================================================= */
  sessionStorage.setItem(LOADED_KEY, "true");

  if (!accessUntil || now >= accessUntil) {
    localStorage.removeItem(SPAM_KEY);
    localStorage.setItem(ACCESS_UNTIL_KEY, now + WINDOW);
  }

  scheduleAutoReload();

  /* =================================================
     🔄 AUTO RELOAD (MOBILE FRIENDLY)
     ================================================= */
  function scheduleAutoReload() {
    const until = Number(localStorage.getItem(ACCESS_UNTIL_KEY));
    if (!until) return;

    const timeLeft = until - Date.now();
    if (timeLeft <= 0) return;

    setTimeout(() => {
      document.body.innerHTML = `
        <div class="session-overlay">
          <div class="session-box">
            <h2>Session Expired</h2>
            <p>
              For security reasons, your session has expired.<br>
              The page will reload shortly.
            </p>
            <div class="session-countdown">
              Reloading in <span id="reload-sec">3</span>s
            </div>
          </div>
        </div>
      `;

      let sec = 3;
      const el = document.getElementById("reload-sec");

      const timer = setInterval(() => {
        sec--;
        if (el) el.textContent = sec;

        if (sec <= 0) {
          clearInterval(timer);
          localStorage.setItem("than_hub_verifying", "1");
          window.location.href = REDIRECT_URL;
        }
      }, 1000);
    }, timeLeft + 500);
  }

  /* =================================================
     ⚠️ VERIFICATION POPUP + REDIRECT
     ================================================= */
  function showPopupAndRedirect() {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.innerHTML = `
        <div style="
          position:fixed;
          inset:0;
          background:rgba(2,6,23,0.9);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:9999;
          font-family:Arial,sans-serif;
          padding:16px;
        ">
          <div style="
            background:#020617;
            padding:28px;
            border-radius:18px;
            max-width:420px;
            width:100%;
            text-align:center;
            border:1px solid rgba(239,68,68,0.45);
            box-shadow:0 0 35px rgba(239,68,68,0.6);
            color:#e5e7eb;
          ">
            <h2 style="color:#ef4444;margin-bottom:10px;">
              Verification Required
            </h2>
            <p style="color:#9ca3af;font-size:14px;line-height:1.5;">
              Page reload abuse was detected.<br>
              Verification is required to continue.
            </p>
            <p style="margin-top:14px;font-size:13px;color:#9ca3af;">
              Redirecting…
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        window.location.href = REDIRECT_URL;
      }, 2000);
    });
  }

  (function relogControl() {
  const COUNT_KEY = "than_hub_relog_count";
  const TIME_KEY = "than_hub_relog_time";
  const WINDOW = 5 * 60 * 1000; // 5 minutes

  const now = Date.now();
  const lastTime = Number(localStorage.getItem(TIME_KEY) || 0);

  // Reset counter if window expired
  if (now - lastTime > WINDOW) {
    localStorage.setItem(COUNT_KEY, "0");
  }

  localStorage.setItem(TIME_KEY, now.toString());

  let count = Number(localStorage.getItem(COUNT_KEY) || 0);
  count++;
  localStorage.setItem(COUNT_KEY, count.toString());

  // 🚨 Allow first relog, block from second onward
  if (count >= 3) {
    localStorage.setItem("than_hub_spam", "1");
    localStorage.setItem("than_hub_verifying", "1");
    localStorage.setItem("than_hub_access_until", now + 10 * 60 * 1000);
    showPopupAndRedirect();
  }
})();
})();