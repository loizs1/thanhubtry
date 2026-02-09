document.addEventListener("DOMContentLoaded", () => {

  const links = {
    btn1: "https://ads.luarmor.net/get_key?for=ThanHub_Workink-UUxSglryLPaR",
    btn2: "https://ads.luarmor.net/get_key?for=ThanHub_Lootlabs-FrqLLIeTOAdT"
  };

function startCountdown(buttonId, seconds) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  const text = btn.querySelector(".btn-text");
  const bar = btn.querySelector(".btn-progress");

  let elapsed = 0;
  const total = seconds;

  btn.disabled = true;
  btn.classList.remove("active");

  const timer = setInterval(() => {
    elapsed++;

    const progress = elapsed / total;
    bar.style.transform = `scaleX(${progress})`;

    if (progress >= 0.8) {
      bar.style.background =
        "linear-gradient(90deg, #22c55e, #16a34a)";
    }

    const remaining = total - elapsed;
    text.textContent = `Please wait... (${remaining}s)`;

    if (elapsed >= total) {
      clearInterval(timer);

      bar.style.transform = "scaleX(1)";
      bar.style.animation = "none";

      setTimeout(() => {
        btn.disabled = false;
        btn.classList.add("active");
        text.textContent = "Get Key";
      }, 400);

      // ✅ ONLY THIS PART CHANGED
      btn.onclick = () => {
        showVpnWarning(
          () => {
            btn.disabled = true;
            btn.style.pointerEvents = "none";
            text.textContent = "Redirecting...";
            window.location.href = links[buttonId];
          },
          () => {
            btn.disabled = true;
            btn.classList.remove("active");
            btn.style.pointerEvents = "auto";

            bar.style.transform = "scaleX(0)";
            bar.style.background = "";

            elapsed = 0;
            text.textContent = `Please wait... (${total}s)`;

            startCountdown(buttonId, total);
          }
        );
      };
    }
  }, 1000);
}

startCountdown("btn1", 14);
startCountdown("btn2", 14);


//live member
const usersEl = document.getElementById("users");

async function loadDiscordOnline() {
  try {
    const res = await fetch(
      "https://discord.com/api/v9/invites/thanhub?with_counts=true"
    );
    const data = await res.json();

    // REAL online members (approximate)
    usersEl.textContent = `${data.approximate_presence_count}`;
  } catch (err) {
    usersEl.textContent = "—";
  }
}

loadDiscordOnline();                // run once on load
setInterval(loadDiscordOnline, 5 * 60 * 1000); // refresh every 5 min


function showVpnWarning(onContinue, onCancel) {
  const overlay = document.createElement("div");

  overlay.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      background:rgba(2,6,23,0.9);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:99999;
      font-family:Arial,sans-serif;
      padding:16px;
      box-sizing:border-box;
    ">
      <div style="
        background:#020617;
        padding:24px;
        border-radius:18px;
        width:100%;
        max-width:420px;
        text-align:center;
        border:1px solid rgba(239,68,68,0.4);
        box-shadow:0 0 35px rgba(239,68,68,0.6);
        color:#e5e7eb;
      ">
        <h2 style="
          color:#ef4444;
          margin-bottom:10px;
          font-size:18px;
        ">
          ⚠️ Important Warning
        </h2>

        <p style="
          color:#9ca3af;
          font-size:14px;
          line-height:1.5;
        ">
          Do <b>NOT</b> use VPN or Proxy.<br>
          Using VPN/Proxy may cause you to be
          <b>blocked by Luarmor</b>.
        </p>

        <div style="
          display:flex;
          gap:12px;
          justify-content:center;
          margin-top:18px;
          flex-wrap:wrap;
        ">
          <button id="vpn-cancel" style="
            flex:1;
            min-width:120px;
            padding:12px 16px;
            border-radius:999px;
            border:1px solid rgba(148,163,184,0.35);
            background:transparent;
            color:#9ca3af;
            cursor:pointer;
            font-weight:600;
            font-size:14px;
          ">
            Cancel
          </button>

          <button id="vpn-continue" style="
            flex:1;
            min-width:120px;
            padding:12px 16px;
            border-radius:999px;
            border:none;
            font-weight:700;
            cursor:pointer;
            background:#ef4444;
            color:#fff;
            font-size:14px;
            box-shadow:0 0 18px rgba(239,68,68,0.6);
          ">
            Continue
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("vpn-continue").onclick = () => {
    overlay.remove();
    onContinue();
  };

  document.getElementById("vpn-cancel").onclick = () => {
    overlay.remove();
    if (onCancel) onCancel();
  };
}

function attachVpnPopup(buttonId, link) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener(
    "click",
    function (e) {
      if (!btn.classList.contains("active")) return;

      // 🚫 STOP existing onclick handlers
      e.preventDefault();
      e.stopImmediatePropagation();

      showVpnWarning(() => {
        btn.disabled = true;
        btn.style.pointerEvents = "none";
        btn.querySelector(".btn-text").textContent = "For security reasons, please reload the website to access again.";
        window.open(link, "_blank", "noopener,noreferrer");
      });
    },
    true // 🔑 CAPTURE PHASE (runs FIRST)
  );
}

attachVpnPopup("btn1", links.btn1);
attachVpnPopup("btn2", links.btn2);

// ===============================
// SCRIPT LOADER COPY (ADD ONLY)
// ===============================
const copyBtn = document.querySelector(".script-copy-btn");
const scriptInput = document.getElementById("scriptInput");

if (copyBtn && scriptInput) {
  copyBtn.addEventListener("click", () => {
    scriptInput.focus();
    scriptInput.select();
    scriptInput.setSelectionRange(0, scriptInput.value.length);

    document.execCommand("copy");

    copyBtn.textContent = "Copied";
    copyBtn.classList.add("copied");

    setTimeout(() => {
      copyBtn.textContent = "Copy";
      copyBtn.classList.remove("copied");
    }, 1200);
  });
}

// 🔢 silent visit counter (via worker)
if (!sessionStorage.getItem("visited")) {
  sessionStorage.setItem("visited", "1");

  setTimeout(() => {
    fetch("https://thanhubworks.simlois56.workers.dev", {
      mode: "no-cors"
    }).catch(() => {});
  }, 1500);
}

});