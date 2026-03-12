// =========================
// PILL CLICK LOGIC
// =========================

let isManualScroll = false;
let scrollTimeout; // used to detect scroll stop

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
  });
});


// =========================
// GLOBAL SCROLL STOP DETECTOR (FIX)
// =========================

window.addEventListener('scroll', () => {
  if (!isManualScroll) return;

  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    isManualScroll = false;
  }, 120); // unlock only after scrolling fully stops
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
  {
  threshold: 0,
  rootMargin: "-100px 0px -60% 0px"
  }
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

// ===============================
// POPUP ADS CONFIG (for index.html)
// ===============================
const POPUP_URL = "https://id.cloudemulator.net/";
const MAX_GLOBAL_POPUP_CLICKS = 2;

// Reset counter on every page load so users always get 2 clicks
sessionStorage.removeItem("global_popup_click_count");

function getGlobalPopupClickCount() {
  return parseInt(sessionStorage.getItem("global_popup_click_count") || "0");
}

function incrementGlobalPopupClickCount() {
  const count = getGlobalPopupClickCount() + 1;
  sessionStorage.setItem("global_popup_click_count", count.toString());
  return count;
}

function shouldShowGlobalPopup() {
  return getGlobalPopupClickCount() < MAX_GLOBAL_POPUP_CLICKS;
}

function openPopup(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Global popup ads - Click anywhere on page
document.addEventListener("click", function(e) {
  const target = e.target;
  if (target.closest("a") || target.closest("button") || 
      target.closest(".script-copy-btn") || target.closest("#vpn-continue") || 
      target.closest("#vpn-cancel")) {
    return;
  }
  
  if (shouldShowGlobalPopup()) {
    incrementGlobalPopupClickCount();
    openPopup(POPUP_URL);
  }
}, true);

// ===============================
// BANNER ADS CONFIG
// ===============================
const SHOW_BANNER_ADS = true;
const BANNER_POSITION = "bottom";
const BANNER_TITLE = "Script + Redfinger Cloud = Perfect AFK";
const BANNER_TEXT = "Click Here to Try";
const BANNER_LINK = "";

function createBannerAd() {
  if (!SHOW_BANNER_ADS) return;
  
  const banner = document.createElement('div');
  banner.id = 'banner-ad';
  
  // Detect device type
  const isMobile = window.innerWidth < 480;
  const isTablet = window.innerWidth >= 480 && window.innerWidth < 768;
  const isDesktop = window.innerWidth >= 768;
  
  // Responsive sizes for mobile/iOS
  const maxWidth = isMobile ? 320 : (isTablet ? 360 : 400);
  const padding = isMobile ? '14px 16px' : (isTablet ? '18px 22px' : '24px 28px');
  const titleSize = isMobile ? '13px' : (isTablet ? '15px' : '18px');
  const subtitleSize = isMobile ? '10px' : (isTablet ? '11px' : '13px');
  const btnPadding = isMobile ? '10px 20px' : (isTablet ? '12px 24px' : '14px 32px');
  const btnFontSize = isMobile ? '12px' : (isTablet ? '13px' : '15px');
  const borderRadius = isMobile ? '16px' : '20px';
  const closeSize = isMobile ? '28px' : '26px';
  const badgeFontSize = isMobile ? '9px' : '10px';
  
  // MOBILE: Centered at bottom with proper positioning
  if (isMobile) {
    banner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 32px);
      max-width: ${maxWidth}px;
      z-index: 9999;
      background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
      border-radius: ${borderRadius};
      box-shadow: 0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(99,102,241,0.4);
      padding: ${padding};
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Arial, sans-serif;
      text-align: center;
      cursor: pointer;
      border: 1px solid rgba(99,102,241,0.4);
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
    `;
  } else {
    // TABLET & DESKTOP: Bottom right corner
    banner.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      max-width: ${maxWidth}px;
      z-index: 9999;
      background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
      border-radius: ${borderRadius};
      box-shadow: 0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(99,102,241,0.4);
      padding: ${padding};
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Arial, sans-serif;
      text-align: center;
      cursor: pointer;
      border: 1px solid rgba(99,102,241,0.4);
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
    `;
  }
  
  banner.innerHTML = `
    <div style="position: absolute; top: -8px; left: 50%; transform: translateX(-50%); background: linear-gradient(90deg, #6366f1, #8b5cf6); padding: 3px 12px; border-radius: 12px; font-size: ${badgeFontSize}; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">
      ⚡ Partnership
    </div>
    <div style="color: #fff; font-size: ${titleSize}; font-weight: 800; margin-top: ${isMobile ? '10px' : '15px'}; margin-bottom: 6px; line-height: 1.3;">
      ${BANNER_TITLE}
    </div>
    <div style="color: #a5b4fc; font-size: ${subtitleSize}; margin-bottom: ${isMobile ? '12px' : '18px'}; line-height: 1.4;">
      Automated farming made easy
    </div>
    <div style="background: linear-gradient(90deg, #6366f1, #8b5cf6); color: #fff; padding: ${btnPadding}; border-radius: 50px; font-weight: 700; font-size: ${btnFontSize}; display: inline-block; box-shadow: 0 4px 15px rgba(99,102,241,0.5); white-space: nowrap;">
      ${BANNER_TEXT} →
    </div>
    <div style="color: rgba(255,255,255,0.4); font-size: ${isMobile ? '9px' : '10px'}; margin-top: 10px;">
      Trusted by 10M+ Users
    </div>
  `;
  
  // iOS-friendly click handler
  banner.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (BANNER_LINK) {
      window.location.href = BANNER_LINK;
    } else {
      window.open('https://id.cloudemulator.net/', '_blank');
    }
  });
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.setAttribute('aria-label', 'Close banner');
  closeBtn.style.cssText = `
    position: absolute;
    top: -10px;
    right: -10px;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: ${closeSize};
    height: ${closeSize};
    cursor: pointer;
    font-size: ${isMobile ? '14px' : '14px'};
    font-weight: bold;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    padding: 0;
    line-height: 1;
    box-shadow: 0 2px 8px rgba(239,68,68,0.4);
  `;
  
  // iOS-friendly close handler - stores close time in sessionStorage
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    banner.remove();
    // Store timestamp when banner was closed (session only - clears on refresh)
    sessionStorage.setItem('banner_closed_time', Date.now().toString());
  });
  
  banner.appendChild(closeBtn);
  document.body.appendChild(banner);
}

// Check if banner should be shown (reappears immediately on refresh, or after 30 sec in same session)
function shouldShowBanner() {
  const closedTime = sessionStorage.getItem('banner_closed_time');
  if (!closedTime) return true; // Never closed in this session
  
  const elapsed = Date.now() - parseInt(closedTime);
  const thirtySeconds = 30 * 1000; // 30 seconds in milliseconds
  
  return elapsed >= thirtySeconds; // Show again after 30 seconds in same session
}

// Banner check interval (checks every 3 seconds if banner should reappear)
let bannerCheckInterval;

function initBannerAds() {
  if (!SHOW_BANNER_ADS) return;
  
  // Show banner immediately if should show
  function tryShowBanner() {
    const existingBanner = document.getElementById('banner-ad');
    if (!existingBanner && shouldShowBanner()) {
      createBannerAd();
    }
  }
  
  // Initial check
  tryShowBanner();
  
  // Check every 3 seconds if banner should reappear (for the 30 second reappear feature)
  bannerCheckInterval = setInterval(tryShowBanner, 3000);
}

if (SHOW_BANNER_ADS) {
  if (document.readyState === 'complete') {
    initBannerAds();
  } else {
    window.addEventListener('load', initBannerAds);
  }
}
