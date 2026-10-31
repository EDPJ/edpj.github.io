/* ============================================================
uebungen.js – Übungen und Einstellungen für das Dehnprogramm
------------------------------------------------------------
sec = Haltedauer in Sekunden (bei sides:true pro Seite)
sides = true, wenn die Übung auf beiden Seiten gemacht wird
pose = Strichfigur (SVG-Pfade, viewBox 320 x 200)
head = Kopf [x,y], paths = Körper, back = hinteres Bein/Arm (heller),
hl = rot markierte Dehnstelle(n), wall/nofloor/note = Zusatzelemente
============================================================ */
const EINSTELLUNGEN = {
prepSec: 5, // Vorbereitungszeit vor jeder Übung
switchSec: 5 // Pause zum Seitenwechsel
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
{ id:'fussnase', name:'Fuß zur Nase ziehen (liegend)', area:'Beine (hinten) & Rücken', sec:30, sides:true,
text:'Auf dem Rücken liegen. Ein Bein anheben, mit beiden Händen den Fuß fassen und ihn sanft Richtung Nase ziehen. Das andere Bein bleibt lang am Boden. Unterer Rücken bleibt locker auf dem Boden. Wer den Fuß nicht erreicht, beugt das Knie leicht. Seitenwechsel nach der Hälfte.',
pose:{ head:[45,166], paths:["M60,172 L160,172 L270,172","M160,172 L132,104 L92,78","M84,170 L104,128 L94,82"], hl:[[146,138]] } },
{ id:'ausfall', name:'Hüftbeuger im Ausfallschritt', area:'Beine (Hüfte & Oberschenkel vorn)', sec:30, sides:true,
text:'Ein Knie am Boden (Polster!), das andere Bein vorn im rechten Winkel. Becken leicht nach vorn schieben, Oberkörper aufrecht. Dehnung vorn an der Hüfte des hinteren Beins spüren. Seitenwechsel nach der Hälfte.',
pose:{ head:[150,34], paths:["M150,50 L150,125","M150,125 L215,125 L215,178","M150,125 L105,176 L48,176","M150,60 L196,98 L200,122"], hl:[[140,128]] } },
{ id:'sitz', name:'Oberschenkelrückseite im Sitzen', area:'Beine (hinten) & Rücken', sec:30, sides:true,
text:'Ein Bein gestreckt nach vorn, das andere angewinkelt. Mit geradem Rücken aus der Hüfte nach vorn beugen und Richtung Fußspitze greifen. Nicht wippen. Seitenwechsel nach der Hälfte.',
pose:{ head:[212,114], back:["M110,172 L148,135 L172,172"], paths:["M110,172 L262,172","M110,172 Q150,132 195,120","M192,122 L252,168"], hl:[[190,168]] } },
{ id:'quad', name:'Oberschenkelvorderseite im Stand', area:'Beine (vorn)', sec:30, sides:true,
text:'Sicher stehen, Fuß zum Gesäß ziehen und mit der Hand festhalten. Knie zeigen nach unten und bleiben nah beieinander, Becken leicht nach vorn kippen. Zum Balancieren an einer Wand festhalten. Seitenwechsel nach der Hälfte.',
pose:{ head:[160,34], paths:["M160,50 L160,110 L160,145 L160,178","M160,110 L166,150 L128,122","M160,58 L138,92 L128,122","M160,58 L200,86"], hl:[[164,130]] } },
{ id:'schmetterling', name:'Schmetterling (Fußsohlen aneinander)', area:'Innenseite der Oberschenkel & Hüfte', sec:40, sides:false,
text:'Aufrecht auf den Boden setzen und die Fußsohlen aneinanderlegen. Die Knie fallen locker zur Seite. Die Füße mit den Händen umfassen und den Rücken gerade halten. Wer mehr Dehnung möchte, beugt sich langsam aus der Hüfte nach vorn. Ruhig weiteratmen.',
pose:{ head:[160,40], back:["M160,150 L228,170 L162,176","M160,70 L192,120 L168,172"], paths:["M160,56 L160,150","M160,150 L92,170 L158,176","M160,70 L128,120 L152,172"], hl:[[125,160],[195,160]] } },
{ id:'fig4', name:'Gesäßdehnung „Vierer“ (liegend)', area:'Gesäß, Beine & unterer Rücken', sec:30, sides:true,
text:'Auf dem Rücken liegen, Füße aufgestellt. Einen Knöchel auf das gegenüberliegende Knie legen, das Knie zeigt zur Seite. Das untere Bein zur Brust ziehen, bis du die Dehnung im Gesäß spürst. Seitenwechsel nach der Hälfte.',
pose:{ head:[45,166], back:["M150,172 L192,122 L232,172"], paths:["M60,172 L150,172","M150,172 L168,102 L194,122","M88,170 L192,128"], hl:[[160,160]] } },
{ id:'beuge', name:'Stehende Vorbeuge', area:'Beine (hinten) & Rücken', sec:40, sides:false,
text:'Hüftbreit stehen, Knie leicht gebeugt. Langsam Wirbel für Wirbel nach unten rollen und Kopf, Nacken und Arme hängen lassen. Mit jeder Ausatmung etwas weiter loslassen. Zum Aufrichten langsam wieder hochrollen.',
pose:{ head:[216,160], paths:["M150,178 L150,112","M150,110 Q195,100 205,138","M205,138 L204,172"], hl:[[150,150],[172,104]] } },
{ id:'langsitz', name:'Vorbeuge im Langsitz', area:'Beine (hinten) & Rücken', sec:40, sides:false,
text:'Im Sitzen beide Beine lang nach vorn strecken. Mit geradem Rücken aus der Hüfte nach vorn beugen und mit beiden Händen die Fußspitzen greifen. Nicht wippen. Wer nicht bis zu den Füßen kommt, legt die Hände auf die Schienbeine und beugt die Knie leicht.',
pose:{ head:[205,128], paths:["M110,172 L262,172","M110,172 Q150,140 188,132","M186,134 L252,170"], hl:[[190,168],[130,155]] } },
{ id:'wade', name:'Wadendehnung im Ausfallschritt', area:'Beine (Waden)', sec:30, sides:true,
text:'Großen Schritt nach vorn machen. Das vordere Knie ist gebeugt, das hintere Bein bleibt gestreckt. Die Ferse des hinteren Fußes fest auf den Boden drücken, beide Fußspitzen zeigen nach vorn. Die Hände auf den vorderen Oberschenkel legen und das Becken langsam nach vorn schieben, bis du die Dehnung in der Wade des hinteren Beins spürst. Seitenwechsel nach der Hälfte.',
pose:{ head:[168,40], paths:["M130,100 L164,56","M130,100 L58,176","M130,100 L205,130 L200,176","M164,62 L190,96 L180,120"], hl:[[88,148]] } }
];
