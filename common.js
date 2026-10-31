/* ==========================================================================
   common.js – gemeinsame Bausteine für alle Seiten (edpj.github.io)

   Einbinden (als ERSTES Skript im <head>, vor dem seiteneigenen <style>):
     <script src="/common.js"></script>

   Inhalt:
     1. Design-Variablen (Farben, Schrift, Abstände, Zeiten)  -> App.theme
     2. Gemeinsames CSS (wird automatisch eingefügt)
     3. Texte und Einstellungen                               -> App.text, App.cfg
     4. Helfer und Formatierung                               -> App.esc, App.fmt ...
     5. Toasts                                                -> App.toast()
     6. localStorage                                          -> App.store, App.onNewDay
     7. Sicherheitsabfrage "Zweimal tippen"                   -> App.confirmTap
     8. Klick- und Submit-Handler                             -> App.on()
     9. Screens                                               -> App.screens(), App.go(), App.refresh()
    10. Ton, Vibration, Display-Sperre                        -> App.audio, App.vibrate, App.wake
    11. Bausteine als HTML                                    -> App.ui.*

   Grundmuster einer Seite:
     App.screens({ home: renderHome, rules: renderRules, play: renderPlay });
     App.on((a, el, i) => { switch (a) { case "start": ...; } });
     App.go("home");

   --------------------------------------------------------------------------
   REGEL FÜR ZURÜCK-BUTTONS (gilt für alle Seiten, keine eigenen Varianten)

   Es gibt genau drei Arten. Beschriftungen kommen aus App.text, nicht frei getippt.

   1. Text-Zurück oben:  App.ui.back(action, label?)
      Aussehen: Ghost-Button "⬅️ Zurück" (sieht aus wie die anderen Buttons).
      Gilt für Unterscreens (Anleitung, Punktetafel, Korrigieren).
      Führt genau EINE Ebene zurück.
      Anleitung: Aktion "closerules" (zurück dorthin, woher man kam).
      Andere Unterscreens: Aktion des Screens, aus dem man kam.
      Steht ein Ziel im Label ("Zur Punktetafel"), kommt die Beschriftung
      aus der Seite: App.ui.back("scoreboard", "Zur Punktetafel").

   2. Menü oben:  App.ui.topbar(extra, { menu: true })
      Aussehen: Ghost-Button "⬅️ Menü" (Aktion "menu", springt zum Startscreen).
      Gilt für laufende Spiele und Übungen.
      Dort steht KEIN Home-Button, das Menü ist der Rückweg.
      Auf Menü- und Startscreens steht stattdessen "🏠 Home" (Standard von topbar).
      Nie eigene Namen wie "Zur Übersicht" verwenden.

   3. Schritt zurück unten:  App.ui.stepBack(label?, opts)
      Aussehen: Ghost-Button in der unteren Leiste, immer "⬅️ " + Verb/Ziel.
      Gilt für Schritte innerhalb eines Ablaufs.
      Beispiele: "⬅️ Vorherige Übung", "⬅️ Ansagen ändern", "⬅️ Stiche korrigieren".
      Ohne Label steht dort App.text.prev ("⬅️ Vorherige").
      "⬅️ Zurück" allein steht NUR oben (Regel 1), nie in der unteren Leiste.

   Der Pfeil "⬅️" wird automatisch ergänzt, wenn er im Label fehlt.

   VORWÄRTSPFEILE: Es gibt nur Emoji. In allen Texten, die durch App.esc laufen
   (Buttons, Hinweise, Anleitungen, Karten), wird "→" automatisch zu "➡️" und
   "←" zu "⬅️".
   ========================================================================== */
(function () {
  "use strict";

  /* ======================================================================
     1. DESIGN-VARIABLEN
     Farben mit Transparenz stehen nur als RGB-Tripel (--xyz-rgb).
     Daraus entstehen --xyz und alle halbtransparenten Varianten.
     ====================================================================== */
  const THEME = {
    /* Farben (RGB-Tripel) */
    "--bg-rgb": "11,13,18",
    "--a1-rgb": "255,59,107",
    "--a2-rgb": "124,92,255",
    "--ok-rgb": "46,229,157",
    "--warn-rgb": "255,176,32",
    "--gold-rgb": "255,210,74",

    /* Farben (fertig) */
    "--bg": "rgb(var(--bg-rgb))",
    "--a1": "rgb(var(--a1-rgb))",
    "--a2": "rgb(var(--a2-rgb))",
    "--ok": "rgb(var(--ok-rgb))",
    "--warn": "rgb(var(--warn-rgb))",
    "--gold": "rgb(var(--gold-rgb))",
    "--card": "#151922",
    "--card2": "#1c2230",
    "--line": "#262d3d",
    "--text": "#f2f4f8",
    "--muted": "#8c95a8",
    "--text-soft": "#c9d0de",
    "--row-active": "#232b3d",
    "--grad": "linear-gradient(135deg,var(--a1),var(--a2))",
    "--grad-ok": "linear-gradient(135deg,#1fcf8a,#16a0c9)",
    "--grad-bad": "linear-gradient(135deg,var(--a1),#ff7a3b)",
    "--warn-bg": "rgba(var(--warn-rgb),.1)",
    "--ok-bg": "rgba(var(--ok-rgb),.1)",
    "--bad-bg": "rgba(var(--a1-rgb),.12)",
    "--glow-a1": "rgba(var(--a1-rgb),.18)",
    "--glow-a2": "rgba(var(--a2-rgb),.2)",
    "--glow-gold": "0 0 24px rgba(var(--gold-rgb),.18)",
    "--shadow-card": "0 10px 30px rgba(0,0,0,.35)",
    "--shadow-main": "0 8px 24px rgba(var(--a1-rgb),.3)",

    /* Toast */
    "--toast-bg": "var(--text)",
    "--toast-text": "var(--bg)",
    "--toast-ok-bg": "var(--ok)",
    "--toast-ok-text": "#05281b",
    "--toast-warn-bg": "var(--warn)",
    "--toast-warn-text": "#2b1b00",
    "--toast-shadow": "0 10px 30px rgba(0,0,0,.55)",
    "--toast-bottom": "30px",
    "--toast-bottom-bar": "96px",

    /* Schrift */
    "--font": '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
    "--fs-xxs": "9px",
    "--fs-xs": "11px",
    "--fs-hint": "12px",
    "--fs-small": "13px",
    "--fs-text": "14px",
    "--fs-base": "15px",
    "--fs-btn": "16px",
    "--fs-input": "16px",
    "--fs-title": "17px",
    "--fs-icon": "18px",
    "--fs-btn-big": "19px",
    "--fs-stat": "22px",
    "--fs-big": "26px",
    "--fs-logo-md": "28px",
    "--fs-logo": "34px",
    "--fs-emoji": "28px",
    "--ls-logo": "4px",
    "--ls-head": "1.5px",
    "--ls-label": "1px",
    "--lh-text": "1.55",
    "--lh-small": "1.4",

    /* Abstände */
    "--sp-3": "3px",
    "--sp-4": "4px",
    "--sp-6": "6px",
    "--sp-8": "8px",
    "--sp-10": "10px",
    "--sp-12": "12px",
    "--sp-14": "14px",
    "--sp-16": "16px",
    "--sp-18": "18px",
    "--sp-28": "28px",

    /* Layout */
    "--app-width": "480px",
    "--pad": "16px",
    "--pad-top": "18px",
    "--pad-bottom": "40px",
    "--pad-bottom-bar": "120px",
    "--pad-bottom-bar-tall": "150px",

    /* Rundungen */
    "--r-card": "20px",
    "--r-row": "16px",
    "--r-btn": "14px",
    "--r-btn-big": "16px",
    "--r-small": "12px",
    "--r-mini": "10px",
    "--r-pill": "99px",

    /* Feste Größen */
    "--size-icon": "38px",
    "--size-icon-mini": "32px",
    "--size-tile": "54px",
    "--size-avatar": "36px",
    "--size-switch-w": "54px",
    "--size-switch-h": "32px",
    "--size-knob": "24px",

    /* Zeiten */
    "--t-press": ".1s",
    "--t-fade": ".2s",
    "--t-move": ".25s",
    "--t-enter": ".3s"
  };

  /* ======================================================================
     2. GEMEINSAMES CSS
     ====================================================================== */
  const CSS = `
:root{${Object.keys(THEME).map(k => k + ":" + THEME[k]).join(";")}}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font)}
body{min-height:100vh;touch-action:manipulation;overscroll-behavior-y:contain;
  background:
    radial-gradient(600px 300px at 10% -5%,var(--glow-a1),transparent 60%),
    radial-gradient(600px 300px at 100% 0%,var(--glow-a2),transparent 60%),
    var(--bg);
  background-attachment:fixed}
#app{max-width:var(--app-width);margin:0 auto;
  padding:calc(env(safe-area-inset-top) + var(--pad-top)) var(--pad) calc(env(safe-area-inset-bottom) + var(--pad-bottom))}
#app.has-bar{--pad-bottom:var(--pad-bottom-bar)}
#app.has-bar-tall{--pad-bottom:var(--pad-bottom-bar-tall)}
button{font:inherit;color:inherit;border:0;cursor:pointer;-webkit-user-select:none;user-select:none;touch-action:manipulation}
a{color:inherit;text-decoration:none}
.row{display:flex;align-items:center;gap:var(--sp-10)}
.grow{flex:1;min-width:0}
.grow2{flex:2;min-width:0}
.muted{color:var(--muted)}
.big{font-size:var(--fs-big);font-weight:800}
.center{min-height:70vh;display:flex;flex-direction:column;justify-content:center;gap:var(--sp-18);text-align:center}
.num{font-variant-numeric:tabular-nums}

/* Kopf */
header{text-align:center;margin-bottom:var(--sp-14)}
.logo{font-size:var(--fs-logo);font-weight:900;letter-spacing:var(--ls-logo);
  background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.logo.md{font-size:var(--fs-logo-md)}
.sub{color:var(--muted);font-size:var(--fs-small);margin-top:2px}
.topbar{margin-bottom:var(--sp-14)}

/* Karten */
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r-card);padding:var(--pad);
  margin-bottom:var(--sp-14);box-shadow:var(--shadow-card)}
.card h2{margin:0 0 var(--sp-12);font-size:var(--fs-small);text-transform:uppercase;letter-spacing:var(--ls-head);
  color:var(--muted);font-weight:700}

/* Buttons */
.btn{display:inline-block;text-align:center;background:var(--grad);color:#fff;font-weight:700;
  border-radius:var(--r-btn);padding:var(--sp-14) var(--sp-18);font-size:var(--fs-btn);
  transition:transform var(--t-press),opacity var(--t-fade)}
.btn:active{transform:scale(.97)}
.btn.block{width:100%}
.btn.big{font-size:var(--fs-btn-big);padding:var(--sp-18);border-radius:var(--r-btn-big);box-shadow:var(--shadow-main)}
.btn.ghost{background:var(--card2);border:1px solid var(--line);color:var(--text)}
.btn.ok{background:var(--grad-ok)}
.btn.bad{background:var(--grad-bad)}
.btn:disabled{opacity:.4;cursor:default}
.btn small{font-weight:500;opacity:.9;font-size:var(--fs-hint)}
.btn.pulse{animation:app-pulse 1.4s ease-out infinite}
@keyframes app-pulse{0%{box-shadow:0 0 0 0 rgba(var(--ok-rgb),.55)}100%{box-shadow:0 0 0 18px rgba(var(--ok-rgb),0)}}
.link{background:none;color:var(--muted);font-size:var(--fs-small);text-decoration:underline;padding:var(--sp-8)}
.back{display:inline-flex;align-items:center;justify-content:center;gap:var(--sp-8);background:var(--card2);border:1px solid var(--line);color:var(--text);font-weight:700;font-size:var(--fs-btn);border-radius:var(--r-btn);padding:var(--sp-10) var(--sp-16);margin-bottom:var(--sp-14);min-height:44px;box-shadow:var(--shadow-card);transition:transform var(--t-press),border-color var(--t-fade)}
.back:active{transform:scale(.97);border-color:var(--a2)}
.icon{width:var(--size-icon);height:var(--size-icon);border-radius:var(--r-small);background:var(--card2);
  border:1px solid var(--line);font-size:var(--fs-icon);display:grid;place-items:center;flex:none}
.icon:active{transform:scale(.92)}

/* Eingabe */
input[type=text]{width:100%;background:var(--card2);border:1px solid var(--line);border-radius:var(--r-btn);
  color:var(--text);font-size:var(--fs-input);padding:var(--sp-14);outline:none;transition:border var(--t-fade)}
input[type=text]:focus{border-color:var(--a2)}

/* Spieler, Avatar */
.player{display:flex;align-items:center;gap:var(--sp-10);padding:var(--sp-10);background:var(--card2);
  border:1px solid var(--line);border-radius:var(--r-btn);margin-top:var(--sp-8);
  animation:app-pop var(--t-move) ease both}
.player.tap{cursor:pointer;text-align:left;width:100%}
.player.tap:active{transform:scale(.98)}
.player.cur{border-color:var(--a2)}
.avatar{width:var(--size-avatar);height:var(--size-avatar);border-radius:50%;background:var(--grad);
  display:grid;place-items:center;font-weight:800;flex:none}
.avatar.done{background:var(--grad-ok)}
.pname{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.psub{font-size:var(--fs-hint);color:var(--muted);font-weight:500;margin-top:1px}
.pts{font-weight:800;min-width:34px;text-align:center;font-variant-numeric:tabular-nums}
.pts small{display:block;font-size:var(--fs-xxs);color:var(--muted);font-weight:600;letter-spacing:var(--ls-label)}
.pts.right{min-width:44px;text-align:right;font-size:var(--fs-small);color:var(--muted)}
.empty{color:var(--muted);text-align:center;font-size:var(--fs-text);padding:var(--sp-10) 0 2px}
@keyframes app-pop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* Einstellungen */
.setting{display:flex;align-items:center;justify-content:space-between;gap:var(--sp-12);padding:var(--sp-6) 0}
.setting + .setting{border-top:1px solid var(--line);margin-top:var(--sp-8);padding-top:var(--sp-14)}
.setting b{display:block;font-size:var(--fs-base)}
.setting span{color:var(--muted);font-size:var(--fs-hint)}
.switch{width:var(--size-switch-w);height:var(--size-switch-h);border-radius:var(--r-pill);background:var(--card2);
  border:1px solid var(--line);position:relative;flex:none;transition:background var(--t-move)}
.switch::after{content:"";position:absolute;top:var(--sp-3);left:var(--sp-3);width:var(--size-knob);height:var(--size-knob);
  border-radius:50%;background:#fff;transition:transform var(--t-move)}
.switch.on{background:var(--grad);border-color:transparent}
.switch.on::after{transform:translateX(22px)}
.stepper{display:flex;align-items:center;gap:var(--sp-10);flex:none}
.stepper .val{font-size:var(--fs-stat);font-weight:800;min-width:28px;text-align:center;font-variant-numeric:tabular-nums}
.mstep{display:flex;flex-direction:column;align-items:center;gap:var(--sp-4)}
.mstep .lbl{font-size:var(--fs-xxs);letter-spacing:var(--ls-label);color:var(--muted);font-weight:700;text-transform:uppercase}
.mstep .stepper{gap:5px}
.mstep .icon{width:var(--size-icon-mini);height:var(--size-icon-mini);font-size:var(--fs-btn);border-radius:var(--r-mini)}
.mstep .val{font-size:var(--fs-icon);min-width:20px}

/* Untere Leiste */
.bottom{position:fixed;left:0;right:0;bottom:0;z-index:10;
  padding:var(--sp-14) var(--pad) calc(env(safe-area-inset-bottom) + var(--sp-14));
  background:linear-gradient(to top,var(--bg) 60%,transparent)}
.bottom .inner{max-width:var(--app-width);margin:0 auto}
.bottom .inner.col{display:flex;flex-direction:column;gap:var(--sp-10)}
.bottom .inner.cols{display:flex;gap:var(--sp-10)}

/* Hinweise */
.hint{color:var(--muted);font-size:var(--fs-hint);text-align:center;margin-top:var(--sp-10)}
.hint.warn{color:var(--warn)}
.warnbox,.okbox{border-radius:var(--r-btn);padding:var(--sp-10) var(--sp-12);font-size:var(--fs-small);
  margin-bottom:var(--sp-14);line-height:var(--lh-small)}
.warnbox{background:var(--warn-bg);border:1px solid var(--warn);color:var(--warn)}
.okbox{background:var(--ok-bg);border:1px solid var(--ok);color:var(--ok)}
.okbox.center{text-align:center;font-weight:600;font-size:var(--fs-text)}

/* Chips, Tags, Fortschritt */
.chips{display:flex;flex-wrap:wrap;gap:var(--sp-6);justify-content:center;margin-top:var(--sp-12)}
.chip{padding:var(--sp-6) var(--sp-12);border-radius:var(--r-pill);background:var(--card2);
  border:1px solid var(--line);font-size:var(--fs-small)}
.chip.first{border-color:var(--a2);color:#fff;font-weight:700}
.chip.gold{border-color:var(--gold);color:var(--gold);font-weight:700}
.tag{display:inline-block;padding:var(--sp-6) var(--sp-12);border-radius:var(--r-pill);background:var(--card2);
  border:1px solid var(--line);font-size:var(--fs-text);color:var(--warn);font-weight:600}
.tag.small{margin-top:var(--sp-8);padding:var(--sp-3) var(--sp-10);font-size:var(--fs-xs);font-weight:700}
.tag.inline{font-size:var(--fs-xs);padding:2px var(--sp-8);margin-left:var(--sp-6);vertical-align:middle}
.tag.dealer{color:#fff;border-color:var(--a2)}
.tag.start{color:var(--ok);border-color:var(--ok)}
.progress{display:flex;gap:var(--sp-6);justify-content:center}
.progress i{width:22px;height:5px;border-radius:9px;background:var(--line);transition:background var(--t-fade)}
.progress i.d{background:var(--grad)}
.progress i.now{background:var(--warn)}
.progress.small{gap:var(--sp-4);flex-wrap:wrap;margin:var(--sp-10) 0 var(--sp-4)}
.progress.small i{width:14px}

/* Ranking */
.rank{display:flex;align-items:center;gap:var(--sp-10);padding:var(--sp-12);background:var(--card2);
  border:1px solid var(--line);border-radius:var(--r-row);margin-top:var(--sp-8);text-align:left;
  animation:app-pop var(--t-enter) ease both}
.rank.r1{border-color:var(--gold);box-shadow:var(--glow-gold)}
.rank-pos{width:34px;text-align:center;font-size:var(--fs-stat);font-weight:800;flex:none}
.rank-total{font-size:var(--fs-stat);font-weight:900;min-width:44px;text-align:right;font-variant-numeric:tabular-nums}
.gain{font-size:var(--fs-hint);font-weight:800;color:var(--ok);background:var(--ok-bg);border:1px solid var(--ok);
  border-radius:var(--r-pill);padding:2px var(--sp-8);white-space:nowrap}
.gain.neg{color:var(--a1);background:var(--bad-bg);border-color:var(--a1)}

/* Regeln / Info */
.rules h3{margin:var(--sp-18) 0 var(--sp-6);font-size:var(--fs-btn)}
.rules h3:first-child{margin-top:0}
.rules p,.rules li{color:var(--text-soft);font-size:var(--fs-text);line-height:var(--lh-text);margin:0 0 var(--sp-6)}
.rules ul,.rules ol{padding-left:20px;margin:0 0 var(--sp-6)}

/* Startseite / Hub */
.section{margin-bottom:var(--sp-28)}
.section-head{display:flex;align-items:center;justify-content:space-between;margin:0 var(--sp-4) var(--sp-12)}
.section-head h2{margin:0;font-size:var(--fs-small);text-transform:uppercase;letter-spacing:var(--ls-head);
  color:var(--muted);font-weight:700}
.count{font-size:var(--fs-hint);color:var(--muted);background:var(--card2);border:1px solid var(--line);
  border-radius:var(--r-pill);padding:2px var(--sp-10);font-weight:700}
a.item,.item.soon{display:flex;align-items:center;gap:var(--sp-14);padding:var(--pad);margin-bottom:var(--sp-10);
  background:var(--card);border:1px solid var(--line);border-radius:var(--r-card);color:inherit;
  box-shadow:var(--shadow-card);transition:transform var(--t-press),border-color var(--t-fade);
  animation:app-pop var(--t-enter) ease both}
a.item:active{transform:scale(.98);border-color:var(--a2)}
.item-icon{width:var(--size-tile);height:var(--size-tile);border-radius:var(--r-btn-big);background:var(--grad);
  display:grid;place-items:center;font-size:var(--fs-emoji);flex:none}
.item .info{flex:1;min-width:0}
.item .title{font-weight:800;font-size:var(--fs-title)}
.item .text{color:var(--muted);font-size:var(--fs-small);margin-top:2px;line-height:var(--lh-small)}
.item.soon{border-style:dashed;box-shadow:none;opacity:.7}
.item.soon .item-icon{background:var(--card2);border:1px solid var(--line)}

/* Toast */
.app-toast{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom) + var(--toast-bottom));
  transform:translate(-50%,16px);max-width:min(440px,calc(100vw - 32px));padding:var(--sp-14) 20px;
  border-radius:var(--r-btn-big);font:700 var(--fs-btn)/1.35 var(--font);text-align:center;
  background:var(--toast-bg);color:var(--toast-text);box-shadow:var(--toast-shadow);
  opacity:0;pointer-events:none;z-index:100;transition:opacity var(--t-move) ease,transform var(--t-move) ease}
.app-toast.with-bar{bottom:calc(env(safe-area-inset-bottom) + var(--toast-bottom-bar))}
.app-toast.show{opacity:1;transform:translate(-50%,0)}
.app-toast.success{background:var(--toast-ok-bg);color:var(--toast-ok-text)}
.app-toast.warn{background:var(--toast-warn-bg);color:var(--toast-warn-text)}

@media (prefers-reduced-motion:reduce){
  .app-toast,.player,.rank,a.item,.back,.btn.pulse,.progress i,.switch,.switch::after{animation:none;transition:none}
}
`;
  const styleEl = document.createElement("style");
  styleEl.id = "common-css";
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* <head>-Grundlagen: Sprache und theme-color (viewport bleibt im HTML der Seite) */
  document.documentElement.lang = "de";
  if (!document.querySelector('meta[name="theme-color"]')) {
    const m = document.createElement("meta");
    m.name = "theme-color";
    m.content = "#" + THEME["--bg-rgb"].split(",").map(n => (+n).toString(16).padStart(2, "0")).join("");
    document.head.appendChild(m);
  }

  /* ======================================================================
     3. TEXTE UND EINSTELLUNGEN
     ====================================================================== */
  const CFG = {
    homeUrl: "/index.html",
    confirmMs: 4000,       /* Zeit für die Sicherheitsabfrage */
    toastMs: 3500,         /* Standarddauer eines Toasts */
    dayChangeHour: 3,      /* logischer Tageswechsel */
    dayCheckMs: 15000,     /* Prüfintervall für App.onNewDay */
    maxName: 20,           /* Zeichen pro Spielername */
    maxPlayers: 20,        /* Standard-Höchstzahl Spieler */
    minPlayers: 3          /* Standard-Mindestzahl Spieler */
  };

  const TEXT = {
    home: "🏠 Home",
    info: "📖 Info",
    rulesTitle: "INFO",
    back: "⬅️ Zurück",          /* Regel 1: Text-Zurück oben (eine Ebene zurück) */
    menu: "⬅️ Menü",            /* Regel 2: Menü oben in Spielen und Übungen */
    prev: "⬅️ Vorherige",       /* Regel 3: Standard für Schritt zurück unten */
    understood: "Verstanden",
    confirm: "Sicher? Nochmal tippen",
    storageTitle: "Speicher",
    settingsTitle: "Einstellungen",
    storageOk: "💾 Wird nur lokal auf diesem Gerät gespeichert",
    storageFail: "⚠️ Speichern nicht möglich (nur bis zum Neuladen)",
    playersTitle: "Spieler",
    add: "Hinzufügen",
    namePlaceholder: "Name eingeben…",
    msg: {
      clearAll: "Alles gelöscht",
      resetPoints: "Punkte zurückgesetzt",
      resetRecord: "Rekord zurückgesetzt",
      resetDay: "Fortschritt zurückgesetzt",
      nameExists: "Name gibt es schon",
      minPlayers: n => "Mindestens " + n + " Spieler nötig",
      maxPlayers: n => "Maximal " + n + " Spieler"
    }
  };

  /* Arten von Speicher-Buttons: Beschriftung und Toast stehen fest */
  const STORAGE_KINDS = {
    clearAll: { label: "Alles löschen", msg: TEXT.msg.clearAll },
    resetPoints: { label: "Punkte zurücksetzen", msg: TEXT.msg.resetPoints },
    resetRecord: { label: "Rekord zurücksetzen", msg: TEXT.msg.resetRecord },
    resetDay: { label: "Heutigen Fortschritt zurücksetzen", msg: TEXT.msg.resetDay }
  };

  /* ======================================================================
     4. HELFER UND FORMATIERUNG
     ====================================================================== */
  /* Pfeil-Zeichen werden zu Emoji: ← wird ⬅️, → wird ➡️ */
  const emoji = s => s.replace(/←/g, "⬅️").replace(/→/g, "➡️");

  /* Maskiert HTML und ersetzt Pfeil-Zeichen durch Emoji */
  const esc = s => emoji(String(s == null ? "" : s)).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Maskiert alles, **Text** wird fett */
  const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");

  /* Setzt "⬅️ " vor das Label, ersetzt ein vorhandenes ← (für alle Zurück-Buttons) */
  const arrow = s => "⬅️ " + String(s).trim().replace(/^(?:←|\u2B05\uFE0F?)\s*/, "");

  /* Kopie, gemischt */
  const shuffle = a => shuffleInPlace(a.slice());
  /* Verändert die Liste direkt und gibt sie zurück */
  function shuffleInPlace(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* true, wenn x eine nicht-leere Liste ist (für Datendateien) */
  const isFilled = x => Array.isArray(x) && x.length > 0;

  const fmt = {
    pad: (n, len) => String(n).padStart(len || 2, "0"),
    date: ts => new Date(ts == null ? Date.now() : ts).toLocaleDateString("de-DE"),
    /* Sekunden -> "MM:SS" */
    time: sec => {
      sec = Math.max(0, Math.round(sec));
      return fmt.pad(Math.floor(sec / 60)) + ":" + fmt.pad(sec % 60);
    },
    /* +3, 0, -2 */
    signed: v => (v > 0 ? "+" + v : String(v))
  };

  /* Tagesschlüssel "JJJJ-MM-TT", wechselt erst um dayChangeHour Uhr */
  const dayKey = hour => {
    const h = hour == null ? CFG.dayChangeHour : hour;
    const d = new Date(Date.now() - h * 3600 * 1000);
    return d.getFullYear() + "-" + fmt.pad(d.getMonth() + 1) + "-" + fmt.pad(d.getDate());
  };

  /* Prüft Spielerzahl. Zeigt bei Fehler einen Toast und gibt false zurück. */
  function checkPlayers(count, min, max) {
    min = min == null ? CFG.minPlayers : min;
    max = max == null ? CFG.maxPlayers : max;
    if (count < min) { toast(TEXT.msg.minPlayers(min)); return false; }
    if (count > max) { toast(TEXT.msg.maxPlayers(max)); return false; }
    return true;
  }

  /* ======================================================================
     5. TOASTS
     App.toast("Text");  App.toast("Text", "success" | "info" | "warn", 3500);
     Der Abstand zum Rand passt sich an: 96px mit unterer Leiste, sonst 30px.
     ====================================================================== */
  let toastEl = null, toastTimer = null;
  function toast(msg, type, ms) {
    type = type || "info";
    ms = ms || CFG.toastMs;
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.className = "app-toast " + type + (document.querySelector(".bottom") ? " with-bar" : "");
    toastEl.textContent = msg;
    void toastEl.offsetWidth; /* Animation neu starten */
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), ms);
  }

  /* ======================================================================
     6. LOCALSTORAGE
     Einfach:
       App.store.save("key", daten);   const d = App.store.load("key", {});
     Mit Store-Objekt:
       const st = App.store.create("key", {
         defaults: {...},          Rückgabe, wenn nichts oder Defektes gespeichert ist
         validate: d => true,      prüft die geladenen (decodierten) Daten
         encode: d => kompakt,     vor dem Speichern
         decode: kompakt => d,     nach dem Laden
         daily: true,              Daten gelten nur für den heutigen Tag (Wechsel 3:00 Uhr)
         onFull: e => true|false   bei vollem Speicher kürzen, true = erneut versuchen
       });
       const d = st.load();  st.save(d);  st.remove();
     Es gibt keine Versionen. Ohne daily wird das Format unverändert gespeichert.
     Es gibt keine Migration: Wer das Format ändert, nimmt einen neuen Schlüsselnamen
     (ohne Versionsnummer im Namen). Alter Fortschritt darf verschwinden.
     ====================================================================== */
  const NONE = {};
  const store = {
    ok: true,

    save(key, data, opts) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        store.ok = true;
        return true;
      } catch (e) {
        if (opts && typeof opts.onFull === "function" && opts.onFull(e)) {
          return store.save(key, data, { onFull: null });
        }
        store.ok = false;
        return false;
      }
    },

    load(key, fallback, opts) {
      if (fallback === undefined) fallback = null;
      let raw = null;
      try { raw = localStorage.getItem(key); } catch (e) { return fallback; }
      if (raw == null) return fallback;
      try {
        const d = JSON.parse(raw);
        if (opts && typeof opts.validate === "function" && !opts.validate(d)) return fallback;
        return d;
      } catch (e) { return fallback; }
    },

    remove(key) {
      try { localStorage.removeItem(key); return true; } catch (e) { return false; }
    },

    has(key) {
      try { return localStorage.getItem(key) != null; } catch (e) { return false; }
    },

    /* Testet beim Start, ob Speichern möglich ist (setzt store.ok) */
    check() {
      try {
        localStorage.setItem("__test__", "1");
        localStorage.removeItem("__test__");
        store.ok = true;
      } catch (e) { store.ok = false; }
      return store.ok;
    },

    status() { return store.ok ? TEXT.storageOk : TEXT.storageFail; },

    create(key, opts) {
      opts = opts || {};
      const clone = v => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
      const wrap = data => opts.daily ? { _day: dayKey(), data } : data;
      const unwrap = w => {
        if (w && typeof w === "object" && !Array.isArray(w) && "_v" in w && "data" in w) return { ok: false };
        if (!opts.daily) return { ok: true, data: w };
        if (!w || typeof w !== "object" || w._day !== dayKey()) return { ok: false };
        return { ok: true, data: w.data };
      };
      return {
        key,
        get ok() { return store.ok; },
        load() {
          const raw = store.load(key, NONE);
          if (raw === NONE) return clone(opts.defaults);
          const u = unwrap(raw);
          if (!u.ok) return clone(opts.defaults);
          let d = u.data;
          try {
            if (typeof opts.decode === "function") d = opts.decode(d);
            if (typeof opts.validate === "function" && !opts.validate(d)) return clone(opts.defaults);
          } catch (e) { return clone(opts.defaults); }
          return d;
        },
        save(data) {
          let p = data;
          try { if (typeof opts.encode === "function") p = opts.encode(data); }
          catch (e) { store.ok = false; return false; }
          return store.save(key, wrap(p), opts);
        },
        remove() { return store.remove(key); },
        has() { return store.has(key); }
      };
    }
  };

  /* Tageswechsel: App.onNewDay(tag => { ... }) – prüft alle 15 s und beim Zurückkehren in den Tab */
  const dayCbs = [];
  let lastDay = dayKey();
  function checkDay() {
    const d = dayKey();
    if (d !== lastDay) { lastDay = d; dayCbs.slice().forEach(f => f(d)); }
  }
  setInterval(checkDay, CFG.dayCheckMs);
  const onNewDay = fn => { dayCbs.push(fn); };

  /* ======================================================================
     7. SICHERHEITSABFRAGE "ZWEIMAL TIPPEN"
     Buttons mit data-confirm: erster Tipp ändert den Text, zweiter Tipp
     innerhalb von confirmMs führt die Aktion aus. Der Inhalt (auch <small>)
     wird danach wiederhergestellt.
     ====================================================================== */
  let armedEl = null, armedT = null, armedHtml = "";
  function disarm() {
    clearTimeout(armedT);
    if (armedEl && armedEl.isConnected) armedEl.innerHTML = armedHtml;
    armedEl = null;
  }
  function confirmTap(el) {
    if (armedEl === el) {
      clearTimeout(armedT);
      el.innerHTML = armedHtml;
      armedEl = null;
      return true;
    }
    disarm();
    armedEl = el;
    armedHtml = el.innerHTML;
    el.textContent = TEXT.confirm;
    armedT = setTimeout(disarm, CFG.confirmMs);
    return false;
  }

  /* ======================================================================
     8. KLICK- UND SUBMIT-HANDLER
     Buttons tragen data-a="aktion" (und optional data-i="index").
       App.on((aktion, element, index, event) => { ... });
     Gibt dein Handler true zurück, wird die eingebaute Aktion
     (menu, rules, closerules, player-del, store-N) übersprungen.
     ====================================================================== */
  const handlers = [];
  const on = fn => { handlers.push(fn); };

  document.addEventListener("click", e => {
    const el = e.target.closest("[data-a]");
    if (!el) { disarm(); return; }
    if (el.hasAttribute("data-confirm")) {
      if (!confirmTap(el)) return;
    } else {
      disarm();
    }
    const a = el.dataset.a, i = Number(el.dataset.i);
    let handled = false;
    handlers.forEach(fn => { if (fn(a, el, i, e) === true) handled = true; });
    if (!handled) builtin(a, el);
  });

  /* Spieler hinzufügen (Formular aus ui.playerCard) */
  document.addEventListener("submit", e => {
    if (e.target.id !== "addForm") return;
    e.preventDefault();
    const o = activePlayers;
    if (!o) return;
    const inp = document.getElementById("nameInput");
    const name = inp.value.trim();
    if (!name) return;
    const names = o.players.map(p => (typeof p === "string" ? p : p.name).toLowerCase());
    if (names.indexOf(name.toLowerCase()) > -1) return toast(TEXT.msg.nameExists);
    const max = o.max || CFG.maxPlayers;
    if (names.length >= max) return toast(TEXT.msg.maxPlayers(max));
    if (typeof o.onAdd === "function") o.onAdd(name);
    refresh();
    const again = document.getElementById("nameInput");
    if (again) again.focus();
  });

  function builtin(a, el) {
    if (a === "rules") go("rules");
    else if (a === "closerules") go(prevScreen || homeScreen);
    else if (a === "menu") go(homeScreen);
    else if (a === "player-del") {
      if (activePlayers && typeof activePlayers.onDelete === "function") {
        activePlayers.onDelete(Number(el.dataset.i));
        refresh();
      }
    } else if (a.indexOf("store-") === 0) {
      const it = storageRuns[Number(a.slice(6))];
      if (it) {
        if (typeof it.run === "function") it.run();
        if (it.msg) toast(it.msg);
        refresh();
      }
    }
  }

  /* ======================================================================
     9. SCREENS
       App.screens({ home: fn, rules: fn, play: fn }, { home: "home" });
       App.go("play");        wechselt, scrollt nach oben
       App.refresh();         zeichnet den aktuellen Screen neu (ohne Scrollen)
       App.screen             Name des aktuellen Screens
     Eingebaute Aktionen: "menu" -> Startscreen, "rules" -> Screen "rules"
     (merkt sich, woher), "closerules" -> zurück dorthin.
     ====================================================================== */
  let screenMap = {}, currentScreen = null, prevScreen = null, homeScreen = "home", keepScroll = false;
  let activePlayers = null;
  const storageRuns = [];

  function screens(map, o) {
    screenMap = map || {};
    homeScreen = (o && o.home) || "home";
    if (!currentScreen) currentScreen = homeScreen;
  }
  function draw() {
    activePlayers = null;
    storageRuns.length = 0;
    const fn = screenMap[currentScreen];
    if (typeof fn === "function") fn();
  }
  function go(name) {
    if (!screenMap[name]) return;
    if (name === "rules" && currentScreen !== "rules") prevScreen = currentScreen;
    currentScreen = name;
    draw();
  }
  function refresh() {
    keepScroll = true;
    try { draw(); } finally { keepScroll = false; }
  }

  /* Schreibt HTML nach #app. Die Höhe der unteren Leiste wird automatisch erkannt. */
  function render(html, opts) {
    opts = opts || {};
    const app = document.getElementById("app");
    disarm();
    app.className = html.indexOf('class="bottom" data-tall') > -1 ? "has-bar-tall"
      : html.indexOf('class="bottom"') > -1 ? "has-bar" : "";
    app.innerHTML = html;
    if (!keepScroll && opts.top !== false) window.scrollTo(0, 0);
    return app;
  }

  /* ======================================================================
     10. TON, VIBRATION, DISPLAY-SPERRE
     App.audio.unlock()  wird beim ersten Tipp/Tastendruck automatisch aufgerufen;
                         ein manueller Aufruf ist nicht nötig, aber harmlos
     App.audio.beep(880, 0.7, 0.5)   Frequenz Hz, Dauer s, Lautstärke; funktioniert danach
     App.vibrate(500)
     App.wake.on() / App.wake.off()  Display bleibt an, solange on
     ====================================================================== */
  let audioCtx = null;
  function getCtx() {
    if (audioCtx && audioCtx.state === "closed") audioCtx = null;
    if (!audioCtx) { try { const AC = window.AudioContext || window.webkitAudioContext; if (AC) audioCtx = new AC(); } catch (e) {} }
    return audioCtx;
  }
  /* iOS: Ton auch im Stumm-Modus */
  try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
  const audio = {
    unlock() {
      try {
        const ctx = getCtx(); if (!ctx) return;
        if (ctx.state !== "running") { const p = ctx.resume(); if (p && p.catch) p.catch(() => {}); }
        const buffer = ctx.createBuffer(1, 1, 22050); const source = ctx.createBufferSource();
        source.buffer = buffer; source.connect(ctx.destination); source.start(0);
      } catch (e) {}
    },
    beep(freq, dur, vol) {
      try {
        const ctx = getCtx(); if (!ctx) return;
        freq = freq || 880; dur = dur || 0.7; vol = vol == null ? 0.5 : Math.min(1, vol);
        if (vol <= 0) return;
        const play = () => {
          const t0 = ctx.currentTime, osc = ctx.createOscillator(), gain = ctx.createGain();
          const att = Math.min(0.05, dur / 4), rel = Math.min(0.2, dur / 2);
          osc.type = "sine"; osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.0001, t0); gain.gain.exponentialRampToValueAtTime(vol, t0 + att);
          gain.gain.setValueAtTime(vol, t0 + Math.max(att, dur - rel)); gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
          osc.connect(gain); gain.connect(ctx.destination); osc.start(t0); osc.stop(t0 + dur + 0.02);
        };
        if (ctx.state === "running") play(); else { const p = ctx.resume(); if (p && p.then) p.then(play).catch(() => {}); else play(); }
      } catch (e) {}
    }
  };
  const UNLOCK_EVENTS = ["pointerdown", "touchend", "click", "keydown"];
  function autoUnlock() { audio.unlock(); if (audioCtx && audioCtx.state === "running") UNLOCK_EVENTS.forEach(ev => document.removeEventListener(ev, autoUnlock, true)); }
  UNLOCK_EVENTS.forEach(ev => document.addEventListener(ev, autoUnlock, { capture: true, passive: true }));
  const vibrate = ms => { try { if (navigator.vibrate) navigator.vibrate(ms || 500); } catch (e) {} };

  let wakeLock = null, wakePending = false, wakeWanted = false;
  async function requestWake() {
    if (!wakeWanted || !("wakeLock" in navigator) || wakeLock || wakePending || document.hidden) return;
    wakePending = true;
    try {
      const lock = await navigator.wakeLock.request("screen");
      wakeLock = lock;
      lock.addEventListener("release", () => {
        if (wakeLock !== lock) return;   /* absichtlich freigegeben */
        wakeLock = null;                 /* vom System freigegeben -> neu anfordern */
        requestWake();
      });
    } catch (e) {}
    wakePending = false;
  }
  const wake = {
    on() { wakeWanted = true; requestWake(); },
    off() {
      wakeWanted = false;
      try { if (wakeLock) { const l = wakeLock; wakeLock = null; l.release(); } } catch (e) {}
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      checkDay(); requestWake();
      try { if (audioCtx && audioCtx.state !== "running" && audioCtx.state !== "closed") { const p = audioCtx.resume(); if (p && p.catch) p.catch(() => {}); } } catch (e) {}
    }
  });

  /* ======================================================================
     11. BAUSTEINE (liefern HTML-Strings)
     Alle Texte werden maskiert. Fett schreibst du als **Text**.
     Ausnahme: card(), bottom(), warnbox() und okbox() erwarten fertiges HTML
     (zusammengesetzt aus diesen Bausteinen).
     ====================================================================== */
  const ui = {
    /* Button. opts: action, href, kind ("ghost"|"ok"|"bad"), block, big, disabled,
       sub (Zusatztext in derselben Zeile), subLine (Zusatztext in neuer Zeile),
       i, confirm, grow, grow2, cls */
    btn(label, opts) {
      opts = opts || {};
      const cls = ["btn", opts.kind || "", opts.block ? "block" : "", opts.big ? "big" : "",
        opts.grow ? "grow" : "", opts.grow2 ? "grow2" : "", opts.cls || ""].filter(Boolean).join(" ");
      const inner = esc(label) + (opts.sub ? (opts.subLine ? "<br>" : " ") + `<small>${esc(opts.sub)}</small>` : "");
      if (opts.href) return `<a class="${cls}" href="${esc(opts.href)}">${inner}</a>`;
      return `<button class="${cls}" data-a="${esc(opts.action || "")}"` +
        (opts.i != null ? ` data-i="${esc(opts.i)}"` : "") +
        (opts.confirm ? " data-confirm" : "") +
        (opts.disabled ? " disabled" : "") + `>${inner}</button>`;
    },

    /* Kopfzeile. extra: [{label, action | href}] nach dem Home- bzw. Menü-Button.
       opts:
         { menu:true }   Regel 2: "⬅️ Menü" als erster Button, KEIN Home-Button
                         (für laufende Spiele und Übungen)
         { home:false }  ohne Home-Button
         { info:true }   "📖 Info" als letzter Button */
    topbar(extra, opts) {
      opts = opts || {};
      const list = [];
      if (opts.menu) list.push({ label: arrow(TEXT.menu), action: "menu" });
      else if (opts.home !== false) list.push({ label: TEXT.home, href: CFG.homeUrl });
      (extra || []).forEach(b => list.push(b));
      if (opts.info) list.push({ label: TEXT.info, action: "rules" });
      return `<div class="row topbar">${list.map(b =>
        ui.btn(b.label, { kind: "ghost", grow: true, href: b.href, action: b.action })).join("")}</div>`;
    },

    /* Titel mit Verlauf. size: "" (34px) oder "md" (28px) */
    header(title, sub, size) {
      return `<header><div class="logo ${size || ""}">${esc(title)}</div>` +
        (sub ? `<div class="sub">${esc(sub)}</div>` : "") + `</header>`;
    },

    /* Regel 1: Ghost-Button "⬅️ Zurück" (sieht aus wie die anderen Buttons), eine Ebene zurück.
       label ist optional, Standard "⬅️ Zurück". Der Emoji-Pfeil wird bei Bedarf ergänzt. */
    back(action, label) {
      return `<button class="back" data-a="${esc(action || "menu")}">${esc(arrow(label || TEXT.back))}</button>`;
    },

    /* Regel 3: Schritt zurück in der unteren Leiste (Ghost-Button).
       label: Verb oder Ziel ohne Pfeil, z. B. "Vorherige Übung". Ohne Label: "⬅️ Vorherige".
       opts wie bei ui.btn (action, grow, grow2, confirm, disabled ...).
       Standardaktion ist "prev". */
    stepBack(label, opts) {
      opts = Object.assign({ action: "prev", kind: "ghost" }, opts || {});
      return ui.btn(arrow(label || TEXT.prev), opts);
    },

    /* Karte mit kleiner grauer Überschrift. inner ist fertiges HTML. */
    card(title, inner, cls) {
      return `<div class="card ${cls || ""}">${title ? `<h2>${esc(title)}</h2>` : ""}${inner}</div>`;
    },

    hint(text, cls) { return `<div class="hint ${cls || ""}">${esc(text)}</div>`; },
    empty(text) { return `<div class="empty">${esc(text)}</div>`; },
    warnbox(html) { return `<div class="warnbox">${html}</div>`; },
    /* center: true -> zentriert und fett */
    okbox(html, center) { return `<div class="okbox ${center ? "center" : ""}">${html}</div>`; },
    chip(text, cls) { return `<span class="chip ${cls || ""}">${esc(text)}</span>`; },
    /* cls: "inline dealer", "inline start", "small" */
    tag(text, cls) { return `<span class="tag ${cls || ""}">${esc(text)}</span>`; },
    avatar(name, cls) {
      return `<div class="avatar ${cls || ""}">${esc(String(name).charAt(0).toUpperCase())}</div>`;
    },

    /* Warnbox, wenn eine Datendatei fehlt oder leer ist. Gibt "" zurück, wenn alles da ist. */
    missingFile(file, ok) {
      return ok ? "" : ui.warnbox(`⚠️ Die Datei <b>${esc(file)}</b> wurde nicht gefunden oder ist leer. ` +
        `Lege sie in denselben Ordner wie diese Seite.`);
    },

    /* Fortschrittspunkte.
       done: Anzahl (die ersten n sind gefüllt) ODER Liste mit true/false
       current: Index des aktuellen Punktes (orange), optional
       Ab 12 Punkten automatisch klein und umbrechend. */
    progress(total, done, current) {
      const dots = Array.from({ length: total }, (_, i) => {
        const d = Array.isArray(done) ? !!done[i] : i < done;
        return `<i class="${d ? "d" : i === current ? "now" : ""}"></i>`;
      }).join("");
      return `<div class="progress ${total > 12 ? "small" : ""}">${dots}</div>`;
    },

    /* Feste untere Leiste. inner ist fertiges HTML.
       layout: "col" (Buttons untereinander, höhere Leiste) | "cols" (nebeneinander) | leer (ein Button)
       Schritt zurück darin: ui.stepBack("Vorherige Übung") (Regel 3). */
    bottom(inner, layout) {
      return `<div class="bottom"${layout === "col" ? " data-tall" : ""}>` +
        `<div class="inner ${layout || ""}">${inner}</div></div>`;
    },

    /* Zahl ändern. o: { action | dec + inc, data:{f:"bids", r:1}, mini:true, label:"Ansage" }
       Mit action wird zusätzlich data-d="-1" bzw. "1" gesetzt. */
    stepper(value, o) {
      o = o || {};
      const extra = Object.keys(o.data || {}).map(k => ` data-${esc(k)}="${esc(o.data[k])}"`).join("");
      const btn = (act, d, sign, lbl) =>
        `<button class="icon" data-a="${esc(act)}"${o.action ? ` data-d="${d}"` : ""}${extra} aria-label="${lbl}">${sign}</button>`;
      const core = `<div class="stepper">${btn(o.action || o.dec, -1, "−", "Weniger")}` +
        `<div class="val">${esc(value)}</div>${btn(o.action || o.inc, 1, "+", "Mehr")}</div>`;
      return o.mini ? `<div class="mstep">${o.label ? `<div class="lbl">${esc(o.label)}</div>` : ""}${core}</div>` : core;
    },

    /* Einstellungsbereich.
       items: [
         { type:"switch",  title, desc, on, action, label },
         { type:"stepper", title, desc, value, dec:"aktion", inc:"aktion" }
       ] */
    settings(items, title) {
      const rows = items.map(it => {
        const head = `<div><b>${esc(it.title)}</b>${it.desc ? `<span>${esc(it.desc)}</span>` : ""}</div>`;
        if (it.type === "stepper") {
          return `<div class="setting">${head}${ui.stepper(it.value, { dec: it.dec, inc: it.inc })}</div>`;
        }
        return `<div class="setting">${head}
          <button class="switch ${it.on ? "on" : ""}" data-a="${esc(it.action)}" role="switch"
            aria-checked="${!!it.on}" aria-label="${esc(it.label || it.title)}"></button></div>`;
      }).join("");
      return ui.card(title || TEXT.settingsTitle, rows);
    },

    /* Speicherbereich: Ghost-Buttons mit Zweimal-Tippen und Statushinweis.
       items: [{ kind, run, label?, action? }]
         kind:  "clearAll" | "resetPoints" | "resetRecord" | "resetDay"
                (legt Beschriftung und Toast fest)
         run:   Funktion, die nach der Bestätigung läuft. Danach zeigt App den Toast
                und zeichnet den Screen neu.
         action: statt run eine eigene Aktion für App.on() (kommt erst nach Bestätigung an) */
    storageCard(items, title) {
      const btns = items.map(it => {
        const k = STORAGE_KINDS[it.kind] || {};
        let action = it.action;
        if (!action) {
          storageRuns.push({ run: it.run, msg: k.msg });
          action = "store-" + (storageRuns.length - 1);
        }
        return ui.btn(it.label || k.label || "", { kind: "ghost", grow: true, action, confirm: true });
      }).join("");
      return ui.card(title || TEXT.storageTitle,
        `<div class="row">${btns}</div>${ui.hint(store.status(), store.ok ? "" : "warn")}`);
    },

    /* Spielerkarte mit Eingabe, Liste, Löschen, Prüfungen.
       o: {
         players: ["Anna", ...] oder [{name, points}],
         onAdd: name => {...}, onDelete: index => {...},   (Speichern machst du dort)
         points: true       zeigt Punkte ("PKT")
         locked: true       "· gesperrt", keine Eingabe, kein Löschen
         min, max           Standard 3 und 20 (max gilt für Hinzufügen)
         empty: "Text"      Text bei leerer Liste
         hint: "Text"       kleiner Hinweis unter der Liste
       }
       Name doppelt, leer und Höchstzahl prüft common.js selbst.
       Die Mindestzahl prüfst du vor dem Start mit App.checkPlayers(n, min, max). */
    playerCard(o) {
      activePlayers = o;
      const min = o.min == null ? CFG.minPlayers : o.min;
      const n = o.players.length;
      const rows = n ? o.players.map((p, i) => {
        const name = typeof p === "string" ? p : p.name;
        const pts = o.points ? `<div class="pts">${esc((p && p.points) || 0)}<small>PKT</small></div>` : "";
        const del = o.locked ? "" :
          `<button class="icon" data-a="player-del" data-i="${i}" aria-label="Entfernen">✕</button>`;
        return `<div class="player">${ui.avatar(name)}<div class="grow pname">${esc(name)}</div>${pts}${del}</div>`;
      }).join("") : ui.empty(o.empty || `Noch keine Spieler. Füge mindestens ${min} hinzu.`);
      const form = o.locked ? "" :
        `<form class="row" id="addForm" autocomplete="off">
          <div class="grow"><input type="text" id="nameInput" placeholder="${esc(TEXT.namePlaceholder)}" maxlength="${CFG.maxName}" enterkeyhint="done"></div>
          <button class="btn" type="submit">${esc(TEXT.add)}</button></form>`;
      return ui.card(`${TEXT.playersTitle} (${n})${o.locked ? " · gesperrt" : ""}`,
        form + rows + (o.hint ? ui.hint(o.hint) : ""));
    },

    /* Ranking. rows: [{ name, total, gain?, sub? }] (Reihenfolge egal, wird sortiert)
       Gleichstand teilt sich den Platz. Platz 1 bekommt Gold.
       gain: Zahl -> grüne bzw. rote Pille. opts.hideZero: Pille bei 0 ausblenden. */
    ranking(rows, opts) {
      opts = opts || {};
      const sorted = rows.slice().sort((a, b) => b.total - a.total);
      let rank = 0, prev = null;
      return sorted.map((r, k) => {
        if (r.total !== prev) { rank = k + 1; prev = r.total; }
        const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank + ".";
        const hasGain = r.gain != null && !(opts.hideZero && r.gain === 0);
        return `<div class="rank ${rank === 1 ? "r1" : ""}" style="animation-delay:${k * 60}ms">
          <div class="rank-pos">${medal}</div>
          ${ui.avatar(r.name)}
          <div class="grow"><div class="pname">${esc(r.name)}</div>${r.sub ? `<div class="psub">${esc(r.sub)}</div>` : ""}</div>
          ${hasGain ? `<span class="gain ${r.gain < 0 ? "neg" : ""}">${esc(fmt.signed(r.gain))}</span>` : ""}
          <div class="rank-total">${esc(r.total)}</div></div>`;
      }).join("");
    },

    /* Info-/Regeln-Screen.
       o: { title (Standard "INFO"), sub:"So funktioniert …",
            sections:[{ h:"🎯 Idee", p:"Text mit **fett**", ul:["…"], ol:["…"] }] }
       "Zurück" (Regel 1) und "Verstanden" führen über "closerules" dorthin zurück,
       woher du kamst. */
    rules(o) {
      const sec = o.sections.map(s => `<h3>${esc(s.h)}</h3>` +
        (s.p ? `<p>${rich(s.p)}</p>` : "") +
        (s.ul ? `<ul>${s.ul.map(x => `<li>${rich(x)}</li>`).join("")}</ul>` : "") +
        (s.ol ? `<ol>${s.ol.map(x => `<li>${rich(x)}</li>`).join("")}</ol>` : "")).join("");
      return ui.back("closerules") +
        ui.header(o.title || TEXT.rulesTitle, o.sub, "md") +
        `<div class="card rules">${sec}</div>` +
        ui.btn(TEXT.understood, { block: true, action: "closerules" });
    },

    /* Eintrag für Startseite und Hubs. it: {titel, text, icon, url, tag} */
    item(it, i) {
      return `<a class="item" href="${esc(it.url)}" style="animation-delay:${i * 60}ms">
        <div class="item-icon">${esc(it.icon || "🎮")}</div>
        <div class="info">
          <div class="title">${esc(it.titel)}</div>
          <div class="text">${esc(it.text || "")}</div>
          ${it.tag ? `<span class="tag small">${esc(it.tag)}</span>` : ""}
        </div></a>`;
    },

    /* Abschnitt mit Zähler. Leere Liste zeigt die gestrichelte Karte. */
    section(name, items, emptyText) {
      return `<div class="section">
        <div class="section-head"><h2>${esc(name)}</h2><span class="count">${items.length}</span></div>
        ${items.length ? items.map(ui.item).join("")
          : `<div class="item soon"><div class="item-icon">🚧</div><div class="info"><div class="title">${esc(emptyText || "")}</div></div></div>`}
      </div>`;
    }
  };

  /* ======================================================================
     Öffentliche Schnittstelle
     ====================================================================== */
  window.App = {
    theme: THEME,
    cfg: CFG,
    text: TEXT,
    fmt, esc, rich, shuffle, shuffleInPlace, isFilled, dayKey, checkPlayers,
    toast, store, onNewDay,
    confirmTap, disarm, on,
    screens, go, refresh, render,
    get screen() { return currentScreen; },
    audio, vibrate, wake,
    ui
  };
})();
