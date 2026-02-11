function startPurchase(plan) {
  window.selectedPlan = plan;
  window.orderId = generateOrderId();

  document.body.style.overflow = "hidden";
    const returnBtn = document.querySelector(".return-home");
  if (returnBtn) returnBtn.classList.add("hidden"); // 👈 ADD THIS

  document.getElementById("pay-loader").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("pay-loader").classList.add("hidden");
    document.getElementById("payment-methods").classList.remove("hidden");
  }, 1000);

}


function closePay() {
  const loader = document.getElementById("pay-loader");
  const methods = document.getElementById("payment-methods");
  const detail = document.getElementById("payment-detail");

  if (loader) loader.classList.add("hidden");
  if (methods) methods.classList.add("hidden");
  if (detail) detail.classList.add("hidden");

  const returnBtn = document.querySelector(".return-home");
  if (returnBtn) returnBtn.classList.remove("hidden"); // 👈 ADD THIS

  document.body.style.overflow = "";

  function backToMethods() {
  const detail = document.getElementById("payment-detail");
  const methods = document.getElementById("payment-methods");

  if (detail) detail.classList.add("hidden");
  if (methods) methods.classList.remove("hidden");
}
}

function pay(method) {
  document.getElementById("payment-methods").classList.add("hidden");

  const box = document.getElementById("payment-content");
  document.getElementById("payment-detail").classList.remove("hidden");

  /* ================= QRIS ================= */
  if (method === "qris") {
    box.innerHTML = `
      <h2>QRIS Payment</h2>

        <div class="qris-merchant">
          <div><span>Merchant</span><b>TOPUPSTORE.ID</b></div>
          <div>
            <span>NMID</span>
            <b>ID1020037250435</b>
            <button class="copy-btn" onclick="copyText('ID1020037250435', this)">📋</button>
          </div>
        </div>

        <div class="qris-layout">

         <div class="qris-qr">
  <img src="thanqris.jpeg"
       alt="QRIS Code"
       onclick="openQrZoom(this.src)"
       style="cursor: zoom-in;">

  <div class="qr-caption">
    🔍 Click QR to Zoom
  </div>
</div>


          <div class="qris-right">

            <div class="qris-prices">
              <div class="price-card">
                <b>Rp 100.000</b>
                <span>1 Lifetime Key</span>
              </div>
              <div class="price-card">
                <b>Rp 450.000</b>
                <span>5 Lifetime Keys</span>
              </div>
            </div>

            <div class="qris-steps">
              <div>1️⃣ Scan QR</div>
              <div>2️⃣ Pay</div>
              <div>3️⃣ Open Discord</div>
              <div>4️⃣ Send Proof</div>
            </div>

            ${orderInfoHTML()}

            <button class="buy-btn" onclick="goDiscord()">
              Send Proof on Discord
            </button>

          </div>
        </div>
      </div>
    `;
  }

  /* ================= PAYPAL ================= */
if (method === "paypal") {
  box.innerHTML = `
    <h2>PayPal Payment</h2>

    <div class="pay-layout">

      <!-- LEFT: PRICES -->
      <div class="pay-left">
        <div class="price-grid">
          <div class="price-box">
            <div class="price-amount">$10</div>
            <div class="price-desc">1 Lifetime Key</div>
          </div>

          <div class="price-box">
            <div class="price-amount">$40</div>
            <div class="price-desc">5 Lifetime Keys</div>
          </div>
        </div>
      </div>

      <!-- RIGHT: ORDER + ACTION -->
      <div class="pay-right">
        ${orderInfoHTML()}

        <button class="buy-btn" onclick="goDiscord()">
          Send Proof on Discord
        </button>

        <!-- PAYPAL INFO MOVED HERE -->
        <div class="paypal-section">
          <a href="https://www.paypal.me/abdulrochim1"
             target="_blank"
             class="paypal-link">
            Open PayPal
          </a>

          <p class="pay-warning">
            Send as <b>Friends & Family</b> only
          </p>
        </div>
      </div>

    </div>
  `;
}
  /* ================= CRYPTO ================= */
if (method === "ltc") {
  box.innerHTML = `
    <h2>Crypto Payment</h2>

    <div class="pay-layout">

      <!-- LEFT: PRICES -->
      <div class="pay-left">
        <div class="price-grid">
          <div class="price-box">
            <div class="price-amount">$10</div>
            <div class="price-desc">1 Lifetime Key</div>
          </div>

          <div class="price-box">
            <div class="price-amount">$40</div>
            <div class="price-desc">5 Lifetime Keys</div>
          </div>
        </div>
      </div>

      <!-- RIGHT: ORDER + ACTION -->
      <div class="pay-right">
        ${orderInfoHTML()}

        <button class="buy-btn" onclick="goDiscord()">
          Send Proof on Discord
        </button>

        <!-- WALLETS MOVED HERE -->
        <div class="wallet-section">
          <div class="wallet-card"
               onclick="copyText('0xf3b7c444442c2f789eea991e1738877ef033e7b8', this)">
            <div class="wallet-header">USDT (BEP20)</div>
            <div class="wallet-address">
              0xf3b7c444442c2f789eea991e1738877ef033e7b8
              <span class="wallet-copy-icon">📋</span>
            </div>
          </div>

          <div class="wallet-card"
               onclick="copyText('La9wph6KvUuF8VhLdgjbm3rFCRQs6tHzHc', this)">
            <div class="wallet-header">LTC</div>
            <div class="wallet-address">
              La9wph6KvUuF8VhLdgjbm3rFCRQs6tHzHc
              <span class="wallet-copy-icon">📋</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}

  /* ================= ROBUX ================= */
  if (method === "robux") {
    box.innerHTML = `
      <h2>Robux Payment</h2>

      <div class="pay-links">
        <a href="https://www.roblox.com/game-pass/1684284690/High-class" target="_blank">
          Weekly
        </a>
        <a href="https://www.roblox.com/game-pass/1481282674/Nuke-Everyone" target="_blank">
          Monthly
        </a>
        <a href="https://www.roblox.com/game-pass/1477815871/Patrick-Star" target="_blank">
          Lifetime
        </a>
      </div>

      ${orderInfoHTML()}

      <button class="buy-btn" onclick="goDiscord()">
        Send Proof on Discord
      </button>
    `;
  }

  /* ================= GIFT CARD ================= */
  if (method === "giftcard") {
    box.innerHTML = `
      <h2>PayPal Gift Card</h2>

      <div class="pay-links">
        <a href="https://www.seagm.com/en-us/paypal-gift-card-usd" target="_blank">SEAGM</a>
        <a href="https://skine.com/en-us/rewarble" target="_blank">Skine</a>
        <a href="https://rewarble.com/#resellers" target="_blank">Rewarble</a>
      </div>

      ${orderInfoHTML("giftcard")}

      <button class="buy-btn" onclick="goDiscord()">
        Send Giftcard Code on Discord
      </button>
    `;
  }
}


function orderInfoHTML(type = "payment") {
  let note = "Send <b>Order ID + payment proof</b> on Discord";

  if (type === "giftcard") {
    note = "Send <b>Order ID + Gift Card Code</b> on Discord";
  }

  return `
    <div class="order-info">
      <span>Order ID</span>
      <b>${window.orderId}</b>
      <button class="copy-btn"
              onclick="copyText('${window.orderId}', this)">📋</button>
    </div>

    <p class="order-note">${note}</p>
  `;
}


function closePaymentDetail() {
  document.getElementById("payment-detail").classList.add("hidden");
}

function goDiscord() {
  window.location.href = "https://discord.gg/thanhub";
}

function backToMethods() {
  document.getElementById("payment-detail").classList.add("hidden");
  document.getElementById("payment-methods").classList.remove("hidden");
}

function openQrZoom(src) {
  const zoom = document.getElementById("qr-zoom");
  const img = document.getElementById("qr-zoom-img");

  img.src = src;
  zoom.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeQrZoom() {
  document.getElementById("qr-zoom").classList.add("hidden");
  document.body.style.overflow = "";
}

function generateOrderId() {
  return "TH-" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;

    btn.classList.add("copied");

    setTimeout(() => {
      btn.classList.remove("copied");
    }, 1200);
  });
}

document.addEventListener("scroll", () => {
  const header = document.querySelector(".purchase-header");
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 10);
});

let lastScroll = 0;
const returnBtn = document.querySelector(".return-home");

window.addEventListener("scroll", () => {
  if (!returnBtn) return;

  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    returnBtn.style.opacity = "0";
  } else {
    returnBtn.style.opacity = "1";
  }

  lastScroll = currentScroll;
});



