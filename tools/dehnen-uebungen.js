/* ============================================================
   uebungen.js – Übungen und Einstellungen für das Dehnprogramm
   ------------------------------------------------------------
   sec   = Haltedauer in Sekunden (bei sides:true pro Seite)
   sides = true, wenn die Übung auf beiden Seiten gemacht wird
   pose  = Strichfigur (SVG-Pfade, viewBox 320 x 200)
           head = Kopf [x,y], paths = Körper, back = hinteres Bein/Arm (heller),
           hl = rot markierte Dehnstelle(n), wall/nofloor/note = Zusatzelemente
   ============================================================ */

const EINSTELLUNGEN = {
  prepSec: 5,    // Vorbereitungszeit vor jeder Übung
  switchSec: 5   // Pause zum Seitenwechsel
};

const EX = [
  { id:'katze', name:'Katzenbuckel & Kuhposition', area:'Rücken', sec:40, sides:false,
    text:'Vierfüßlerstand. Beim Ausatmen den Rücken rund machen und das Kinn zur Brust nehmen. Beim Einatmen ins leichte Hohlkreuz gehen und nach vorn schauen. Langsam im Atemrhythmus wechseln.',
    pose:{ head:[250,140], paths:["M225,112 L225,176","M105,112 L105,176 L55,176","M105,112 Q165,62 225,112 L240,128"], hl:[[165,85]] } },

  { id:'kind', name:'Kindhaltung', area:'Rücken', sec:40, sides:false,
    text:'Aus dem Fersensitz die Arme weit nach vorn laufen lassen und den Oberkörper ablegen. Stirn Richtung Boden, Gesäß bleibt auf den Fersen. Tief in den unteren Rücken atmen.',
    pose:{ head:[207,166], paths:["M105,156 L165,176 L85,176","M105,156 Q150,140 187,152","M187,152 L278,176"], hl:[[140,148]] } },

  { id:'twist', name:'Liegende Rumpfdrehung', area:'Rücken', sec:30, sides:true,
    text:'Auf dem Rücken liegen, Beine angewinkelt. Beide Knie zu einer Seite sinken lassen, Schultern bleiben am Boden, Arme in T-Haltung. Blick zur Gegenseite. Nach der Hälfte der Zeit die Seite wechseln.',
    pose:{ nofloor:true, note:'Ansicht von oben', head:[52,100], paths:["M66,100 L165,100","M88,45 L88,155","M165,100 L228,148 L178,166"], hl:[[125,100]] } },

  { id:'knie', name:'Knie zur Brust (liegend)', area:'Rücken & Gesäß', sec:30, sides:true,
    text:'Auf dem Rücken liegen. Ein Knie mit beiden Händen sanft zur Brust ziehen, das andere Bein bleibt lang am Boden. Unterer Rücken bleibt locker auf dem Boden. Seitenwechsel nach der Hälfte.',
    pose:{ head:[45,166], paths:["M60,172 L160,172 L270,172","M160,172 L112,128 L162,138","M82,170 L116,134"], hl:[[150,168]] } },

  { id:'ausfall', name:'Hüftbeuger im Ausfallschritt', area:'Beine (Hüfte & Oberschenkel vorn)', sec:30, sides:true,
    text:'Ein Knie am Boden (Polster!), das andere Bein vorn im rechten Winkel. Becken leicht nach vorn schieben, Oberkörper aufrecht. Dehnung vorn an der Hüfte des hinteren Beins spüren. Seitenwechsel nach der Hälfte.',
    pose:{ head:[150,34], paths:["M150,50 L150,125","M150,125 L215,125 L215,178","M150,125 L105,176 L48,176","M150,60 L196,98 L200,122"], hl:[[140,128]] } },

  { id:'sitz', name:'Oberschenkelrückseite im Sitzen', area:'Beine (hinten) & Rücken', sec:30, sides:true,
    text:'Ein Bein gestreckt nach vorn, das andere angewinkelt. Mit geradem Rücken aus der Hüfte nach vorn beugen und Richtung Fußspitze greifen. Nicht wippen. Seitenwechsel nach der Hälfte.',
    pose:{ head:[212,114], back:["M110,172 L148,135 L172,172"], paths:["M110,172 L262,172","M110,172 Q150,132 195,120","M192,122 L252,168"], hl:[[190,168]] } },

  { id:'quad', name:'Oberschenkelvorderseite im Stand', area:'Beine (vorn)', sec:30, sides:true,
    text:'Sicher stehen, Fuß zum Gesäß ziehen und mit der Hand festhalten. Knie zeigen nach unten und bleiben nah beieinander, Becken leicht nach vorn kippen. Zum Balancieren an einer Wand festhalten. Seitenwechsel nach der Hälfte.',
    pose:{ head:[160,34], paths:["M160,50 L160,110 L160,145 L160,178","M160,110 L166,150 L128,122","M160,58 L138,92 L128,122","M160,58 L200,86"], hl:[[164,130]] } },

  { id:'wade', name:'Wadendehnung an der Wand', area:'Beine (Waden)', sec:30, sides:true,
    text:'Hände an die Wand, ein Bein weit nach hinten stellen. Ferse des hinteren Beins bleibt am Boden, Bein gestreckt. Vorderes Knie beugen, bis die Dehnung in der Wade zu spüren ist. Seitenwechsel nach der Hälfte.',
    pose:{ wall:true, head:[224,52], paths:["M90,178 L212,72","M145,130 L205,148 L205,178","M205,78 L268,76"], hl:[[110,160]] } },

  { id:'fig4', name:'Gesäßdehnung „Vierer“ (liegend)', area:'Gesäß, Beine & unterer Rücken', sec:30, sides:true,
    text:'Auf dem Rücken liegen, Füße aufgestellt. Einen Knöchel auf das gegenüberliegende Knie legen, das Knie zeigt zur Seite. Das untere Bein zur Brust ziehen, bis du die Dehnung im Gesäß spürst. Seitenwechsel nach der Hälfte.',
    pose:{ head:[45,166], back:["M150,172 L192,122 L232,172"], paths:["M60,172 L150,172","M150,172 L168,102 L194,122","M88,170 L192,128"], hl:[[160,160]] } },

  { id:'beuge', name:'Stehende Vorbeuge', area:'Beine (hinten) & Rücken', sec:40, sides:false,
    text:'Hüftbreit stehen, Knie leicht gebeugt. Langsam Wirbel für Wirbel nach unten rollen und Kopf, Nacken und Arme hängen lassen. Mit jeder Ausatmung etwas weiter loslassen. Zum Aufrichten langsam wieder hochrollen.',
    pose:{ head:[216,160], paths:["M150,178 L150,112","M150,110 Q195,100 205,138","M205,138 L204,172"], hl:[[150,150],[172,104]] } }
];
