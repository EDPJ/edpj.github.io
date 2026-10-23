/* toast.js – einheitliche Toasts für alle Tools
   Nutzung: toast("Text");  toast("Text", "success" | "info" | "warn", 3500);
   Das CSS wird automatisch eingebunden. */
(function () {
  const css = `
  .app-toast{
    position:fixed; left:50%;
    bottom:calc(env(safe-area-inset-bottom) + 96px);
    transform:translate(-50%,16px);
    max-width:min(440px,calc(100vw - 32px));
    padding:14px 20px; border-radius:16px;
    font:700 16px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    text-align:center;
    background:#f2f4f8; color:#0b0d12;
    box-shadow:0 10px 30px rgba(0,0,0,.55);
    opacity:0; pointer-events:none; z-index:100;
    transition:opacity .25s ease, transform .25s ease;
  }
  .app-toast.show{opacity:1; transform:translate(-50%,0)}
  .app-toast.success{background:#2ee59d; color:#05281b}
  .app-toast.warn{background:#ffb020; color:#2b1b00}
  @media (prefers-reduced-motion:reduce){.app-toast{transition:none}}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  let el = null, timer = null;

  window.toast = function (msg, type = "info", ms = 3500) {
    if (!el) {
      el = document.createElement("div");
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.className = "app-toast " + type;
    el.textContent = msg;
    void el.offsetWidth; /* Animation neu starten */
    el.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove("show"), ms);
  };
})();
