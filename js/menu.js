window.addEventListener("DOMContentLoaded", () => {
  // ✅ Telegram WebApp
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    // Проверка и вызов requestFullscreen с обработкой ошибки
    try {
      if (tg.requestFullscreen && typeof tg.requestFullscreen === 'function') {
        tg.requestFullscreen();
        console.log("[Menu] requestFullscreen supported and called");
      } else {
        console.warn("[Menu] requestFullscreen not supported, skipping");
      }
    } catch (error) {
      console.error("[Menu] Error with requestFullscreen:", error);
    }
    document.body.style.overflow = "hidden";
    console.log("[Menu] Telegram WebApp initialized");
  }

  // ✅ TonConnect UI
  new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://z-ten-iota.vercel.app/tonconnect-manifest.json",
    buttonRootId: "ton-connect",
  });

  // ▶️ Кнопка PLAY
  document.getElementById("playBtn").addEventListener("click", () => {
    console.log("[Menu] Redirecting to https://z2-ji4e.vercel.app/");
    window.location.href = "https://z2-ji4e.vercel.app/";
  });

  // 🧭 Навигация по меню
  const btnRewards = document.getElementById("btnRewards");
  if (btnRewards) {
    btnRewards.onclick = () => {
      console.log("[Menu] Redirecting to /rewards.html");
      window.location.href = "/rewards.html";
    };
  } else {
    console.error("[Menu] btnRewards not found");
  }

  const btnLeaderboard = document.getElementById("btnLeaderboard");
  if (btnLeaderboard) {
    btnLeaderboard.onclick = () => {
      console.log("[Menu] Redirecting to /stats.html");
      window.location.href = "/stats.html";
    };
  } else {
    console.error("[Menu] btnLeaderboard not found");
  }

  const btnWithdraw = document.getElementById("btnWithdraw");
  if (btnWithdraw) {
    btnWithdraw.onclick = () => {
      console.log("[Menu] Redirecting to /withdraw.html");
      window.location.href = "/withdraw.html";
    };
  } else {
    console.error("[Menu] btnWithdraw not found");
  }

  const btnReferral = document.getElementById("btnReferral");
  if (btnReferral) {
    btnReferral.onclick = () => {
      console.log("[Menu] Redirecting to /referral.html");
      window.location.href = "/referral.html";
    };
  } else {
    console.error("[Menu] btnReferral not found");
  }

  // 📤 Share кнопка
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({
          title: "ZmeiFi Game",
          text: "Check out ZmeiFi — awesome TON game!",
          url: location.href,
        }).catch(console.error);
      } else {
        alert("Sharing not supported on this device");
      }
    });
  }

  // 👀 Скрыть/показать блок профита
  const profitBox = document.getElementById("profitBox");
  const depositInput = document.getElementById("depositInput");
  if (profitBox && depositInput) {
    depositInput.addEventListener("focus", () => {
      profitBox.style.opacity = "0";
      profitBox.style.pointerEvents = "none";
    });
    depositInput.addEventListener("blur", () => {
      setTimeout(() => {
        profitBox.style.opacity = "1";
        profitBox.style.pointerEvents = "auto";
      }, 100);
    });
  }

  // 🧭 Guide functionality (оставлено как есть)
  const guideModal = document.getElementById('guideModal');
  const guideClose = document.getElementById('guideClose');
  const guideSlides = document.querySelectorAll('.guide-slide');
  const guideDots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function showSlide(index) {
    console.log(`[Guide] Showing slide ${index + 1} of ${guideSlides.length}`);
    guideSlides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle('active', isActive);
      const backBtn = slide.querySelector('.guide-back');
      const nextBtn = slide.querySelector('.guide-next');
      const video = slide.querySelector('video');
      const source = slide.querySelector('video source');

      if (backBtn) {
        backBtn.style.display = index === 0 ? 'none' : 'block';
        backBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
        backBtn.textContent = backBtn.dataset.text || 'Back';
      } else {
        console.warn(`[Guide] Slide ${i + 1}: Back button not found`);
      }

      if (nextBtn) {
        nextBtn.style.display = index === guideSlides.length - 1 ? 'none' : 'block';
        nextBtn.style.visibility = index === guideSlides.length - 1 ? 'hidden' : 'visible';
        nextBtn.textContent = nextBtn.dataset.text || 'Next';
      } else {
        console.warn(`[Guide] Slide ${i + 1}: Next button not found`);
      }

      if (video && source) {
        if (isActive) {
          if (!source.src) {
            source.src = source.dataset.src || `./videos/guide${i + 1}.mp4`;
            video.load();
          }
          video.play().catch(error => console.error(`[Guide] Video play error on slide ${i + 1}:`, error));
        } else {
          video.pause();
        }
      }
    });

    guideDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Open guide
  document.getElementById('btnGuide').addEventListener('click', () => {
    console.log("[Guide] Opening guide modal");
    guideModal.style.display = 'block';
    currentSlide = 0;
    showSlide(currentSlide);
  });

  // Close guide
  guideClose.addEventListener('click', () => {
    console.log("[Guide] Closing guide modal");
    guideModal.style.display = 'none';
    document.querySelectorAll('.guide-slide video').forEach(video => video.pause());
  });

  // Navigation buttons
  guideSlides.forEach((slide, i) => {
    const nextBtn = slide.querySelector('.guide-next');
    const backBtn = slide.querySelector('.guide-back');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentSlide < guideSlides.length - 1) {
          currentSlide++;
          console.log(`[Guide] Clicking Next: Moving to slide ${currentSlide + 1}`);
          showSlide(currentSlide);
        }
      });
    }
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
          currentSlide--;
          console.log(`[Guide] Clicking Back: Moving to slide ${currentSlide + 1}`);
          showSlide(currentSlide);
        }
      });
    }
  });

  // Dots
  guideDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      console.log(`[Guide] Clicking dot: Moving to slide ${index + 1}`);
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-open guide
  if (sessionStorage.getItem('openGuideOnLoad') === 'true') {
    console.log("[Guide] Auto-opening guide modal on page load");
    guideModal.style.display = 'block';
    currentSlide = 0;
    showSlide(currentSlide);
    sessionStorage.removeItem('openGuideOnLoad');
  }
});