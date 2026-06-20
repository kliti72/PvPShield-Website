(() => {
  // ── Solo alla prima visita ──
  if (localStorage.getItem("pcc-seen")) return;
  localStorage.setItem("pcc-seen", "1");

  // step: { msg, highlight } — highlight è l'id dell'elemento da illuminare (opzionale)
  const steps = [
    { msg: "Ciaoo! 👋 Benvenuto su PvPShield!" },
    { msg: "Io sono il piccione ufficiale di questo sito... sì, un piccione. PRWHHWWWH!" },
    { msg: "Qui puoi vedere il tuo profilo giocatore e connetterti al server.", highlight: "profile" },
    { msg: "Questa è la sezione Rank — scala la classifica e diventa il più forte!", highlight: "rank" },
    { msg: "Il BattlePass ti dà ricompense esclusive man mano che giochi.", highlight: "battlePass" },
    { msg: "Vuoi supportare il server? Passa dalla sezione Donation! 💰", highlight: "donation" },
    { msg: "I Dungeon sono la parte più epica — avventure cooperative con boss enormi.", highlight: "dungeon" },
    { msg: "Nelle Impostazioni puoi personalizzare la tua esperienza.", highlight: "setting" },
    { msg: "Tutto chiaro! Ora entra nel server e buon divertimento! 🐦 ", highlight: "profile" }
  ];

  let current = 0;
  let typing  = null;
  let highlighted = null;

  const GOLD    = "rgb(241,225,10)";
  const HL_STYLE = `outline: 3px solid ${GOLD}; outline-offset: 3px; transition: outline 0.2s;`;

  // ── Crea HTML ──
  const container = document.getElementById("piccione");
  if (!container) return;

  container.innerHTML = `
    <div id="pcc-wrap" style="
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.4s, transform 0.4s;
    ">
      <div id="pcc-bubble" style="
        background: #fff;
        color: #111;
        border: 2px solid #333;
        border-radius: 12px;
        padding: 12px 16px;
        max-width: 240px;
        font-size: 14px;
        line-height: 1.5;
        position: relative;
        box-shadow: 3px 3px 0px #222;
      ">
        <div id="pcc-progress" style="
          font-size: 10px;
          color: #888;
          margin-bottom: 6px;
        "></div>
        <span id="pcc-text"></span>
        <div style="
          position: absolute;
          bottom: -12px; right: 28px;
          width: 0; height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 12px solid #333;
        "></div>
        <div style="
          position: absolute;
          bottom: -9px; right: 30px;
          width: 0; height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid #fff;
        "></div>
      </div>

      <div style="display:flex; gap:6px; justify-content:flex-end;">
        <button id="pcc-skip" style="
          background: transparent;
          border: 1px solid #888;
          color: #ccc;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 12px;
          cursor: pointer;
        ">Salta</button>
        <button id="pcc-next" style="
          background: ${GOLD};
          border: none;
          color: #111;
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        ">Avanti →</button>
      </div>

      <img src="gif_piccione.gif" style="
        width: 90px; height: 90px;
        image-rendering: pixelated;
        transform: scaleX(-1);
      ">
    </div>
  `;

  const wrap     = document.getElementById("pcc-wrap");
  const textEl   = document.getElementById("pcc-text");
  const progress = document.getElementById("pcc-progress");
  const nextBtn  = document.getElementById("pcc-next");
  const skipBtn  = document.getElementById("pcc-skip");

  // entra con animazione
  requestAnimationFrame(() => {
    wrap.style.opacity   = "1";
    wrap.style.transform = "translateY(0)";
  });

  // ── Highlight ──
  function clearHighlight() {
    if (highlighted) {
      highlighted.style.outline      = "";
      highlighted.style.outlineOffset = "";
      highlighted.style.transition    = "";
      highlighted = null;
    }
  }

  function applyHighlight(id) {
    clearHighlight();
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.style.cssText += HL_STYLE;
    highlighted = el;
    // scroll morbido verso l'elemento se fuori viewport
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    let button = document.getElementById(id);
    button.click();
}

  // ── Typewriter ──
  function typeWrite(msg, cb) {
    clearInterval(typing);
    textEl.textContent = "";
    let i = 0;
    typing = setInterval(() => {
      textEl.textContent += msg[i++];
      if (i >= msg.length) { clearInterval(typing); cb && cb(); }
    }, 28);
  }

  function flyAway() {
    clearHighlight();
    wrap.style.transition = "transform 0.8s ease-in, opacity 0.8s";
    wrap.style.transform  = "translateX(220px)";
    wrap.style.opacity    = "0";
    setTimeout(() => wrap.remove(), 900);
  }

  function showStep(idx) {
    if (idx >= steps.length) { flyAway(); return; }

    const step = steps[idx];
    progress.textContent = `${idx + 1}/${steps.length}`;

    applyHighlight(step.highlight);

    nextBtn.disabled      = true;
    nextBtn.style.opacity = "0.5";
    nextBtn.textContent   = "Avanti →";

    typeWrite(step.msg, () => {
      nextBtn.disabled      = false;
      nextBtn.style.opacity = "1";
      if (idx === steps.length - 1) nextBtn.textContent = "Chiudi ✓";
    });
  }

  nextBtn.addEventListener("click", () => { current++; showStep(current); });
  skipBtn.addEventListener("click", flyAway);

  setTimeout(() => showStep(0), 800);
})();