/* ============================================================
uebungen.js – Übungen und Einstellungen für das Dehnprogramm
------------------------------------------------------------
sec = Haltedauer in Sekunden (bei sides:true pro Seite)
sides = true, wenn die Übung auf beiden Seiten gemacht wird
pose = Strichfigur (SVG-Pfade, Standard-Bildausschnitt 320 x 200)
vb = Bildausschnitt [x,y,breite,höhe] im Seitenverhältnis 8:5 (zoomt auf die Figur)
head = Kopf [x,y], paths = Körper, back = hinteres Bein/Arm (heller),
hl = rot markierte Stelle(n) (Dehnung bzw. beanspruchte Muskeln),
wall/nofloor/note = Zusatzelemente
Maße der Figur: Rumpf 52, Ober- und Unterschenkel je 38, Ober- und Unterarm je 30, Kopfradius 13.
Bodenkontakt liegt bei y = 178 (Bodenlinie bei y = 184).
============================================================ */
const EINSTELLUNGEN = {
prepSec: 5, // Vorbereitungszeit vor jeder Übung
switchSec: 5 // Pause zum Seitenwechsel
};
const EX = [
{ id:'katze', name:'Katzenbuckel & Kuhposition', area:'Rücken', sec:40, sides:false,
text:'Vierfüßlerstand. Beim Ausatmen den Rücken rund machen und das Kinn zur Brust nehmen. Beim Einatmen ins leichte Hohlkreuz gehen und nach vorn schauen. Langsam im Atemrhythmus wechseln.',
pose:{ vb:[60,67,200,125], head:[218,141], paths:["M149.5,138 L149.5,178 L101.5,178","M199.5,120 L199.5,178","M149.5,138 Q174.5,93 199.5,120"], hl:[[174,112]] } },
{ id:'kind', name:'Kindhaltung', area:'Rücken', sec:40, sides:false,
text:'Aus dem Fersensitz die Arme weit nach vorn laufen lassen und den Oberkörper ablegen. Stirn Richtung Boden, Gesäß bleibt auf den Fersen. Tief in den unteren Rücken atmen.',
pose:{ vb:[60,67,200,125], head:[191,166], back:["M165,152 L225,176"], paths:["M95,178 L143,178 L111,154","M111,154 Q138,136 165,152"], hl:[[131,146]] } },
{ id:'twist', name:'Liegende Rumpfdrehung', area:'Rücken', sec:30, sides:true,
text:'Auf dem Rücken liegen, Beine angewinkelt. Beide Knie zu einer Seite sinken lassen, Schultern bleiben am Boden, Arme in T-Haltung. Blick zur Gegenseite. Nach der Hälfte der Zeit die Seite wechseln.',
pose:{ nofloor:true, note:'Ansicht von oben', vb:[5,-4,310,194], head:[101,105], back:["M179,105 L195,146 L219,126"], paths:["M127,45 L127,165","M127,105 L179,105","M179,105 L187,143 L211,120"], hl:[[167,105]] } },
{ id:'fussnase', name:'Fuß zur Nase ziehen (liegend)', area:'Beine (hinten) & Rücken', sec:30, sides:true,
text:'Auf dem Rücken liegen. Ein Bein anheben, mit beiden Händen den Fuß fassen und ihn sanft Richtung Nase ziehen. Das andere Bein bleibt lang am Boden. Unterer Rücken bleibt locker auf dem Boden. Wer den Fuß nicht erreicht, beugt das Knie leicht. Seitenwechsel nach der Hälfte.',
pose:{ vb:[54,59,213,133], head:[78,169], paths:["M103.5,177 L155.5,177 L235.5,177 L241.5,168","M155.5,177 L125.5,103 L118.5,107","M103.5,177 L134.5,125"], hl:[[148,158]] } },
{ id:'ausfall', name:'Hüftbeuger im Ausfallschritt', area:'Beine (Hüfte & Oberschenkel vorn)', sec:30, sides:true,
text:'Ein Knie am Boden (Polster!), das andere Bein vorn im rechten Winkel. Becken leicht nach vorn schieben, Oberkörper aufrecht. Dehnung vorn an der Hüfte des hinteren Beins spüren. Seitenwechsel nach der Hälfte.',
pose:{ vb:[43,46,234,146], head:[178,71], paths:["M215.5,177 L202.5,171 L206.5,134 L170.5,146","M170.5,146 L150.5,178 L104.5,178","M170.5,146 L175.5,96","M175.5,96 L198.5,108 L207.5,131"], hl:[[180,148]] } },
{ id:'sitz', name:'Oberschenkelrückseite im Sitzen', area:'Beine (hinten) & Rücken', sec:30, sides:true,
text:'Ein Bein gestreckt nach vorn, das andere angewinkelt. Mit geradem Rücken aus der Hüfte nach vorn beugen und Richtung Fußspitze greifen. Nicht wippen. Seitenwechsel nach der Hälfte.',
pose:{ vb:[60,67,200,125], head:[178,131], back:["M116.5,177 L146.5,154 L164.5,176"], paths:["M116.5,177 L196.5,177 L203.5,168","M116.5,177 L156.5,143","M156.5,143 L198.5,168"], hl:[[156,170]] } },
{ id:'quad', name:'Oberschenkelvorderseite im Stand', area:'Beine (vorn)', sec:30, sides:true,
text:'Sicher stehen, Fuß zum Gesäß ziehen und mit der Hand festhalten. Knie zeigen nach unten und bleiben nah beieinander, Becken leicht nach vorn kippen. Zum Balancieren an einer Wand festhalten. Seitenwechsel nach der Hälfte.',
pose:{ vb:[3,-4,314,196], head:[144,21], paths:["M155.5,177 L144.5,172 L144.5,96","M144.5,96 L144.5,46","M144.5,96 L156.5,132 L125.5,107","M144.5,50 L132.5,80 L125.5,104","M144.5,50 L170.5,62 L194.5,60"], hl:[[156,114]] } },
{ id:'schmetterling', name:'Schmetterling (Fußsohlen aneinander)', area:'Innenseite der Oberschenkel & Hüfte', sec:60, sides:false,
text:'Aufrecht auf den Boden setzen und die Fußsohlen aneinanderlegen. Die Knie fallen locker zur Seite. Die Füße mit den Händen umfassen und den Rücken gerade halten. Wer mehr Dehnung möchte, beugt sich langsam aus der Hüfte nach vorn. Ruhig weiteratmen.',
pose:{ vb:[60,67,200,125], head:[160,95], paths:["M160,172 L160,122","M145,122 L175,122","M154,172 L114,164 L155,178","M166,172 L206,164 L165,178","M145,122 L128,146 L150,172","M175,122 L192,146 L170,172"], hl:[[133,170],[187,170]] } },
{ id:'beuge', name:'Stehende Vorbeuge', area:'Beine (hinten) & Rücken', sec:40, sides:false,
text:'Hüftbreit stehen, Knie leicht gebeugt. Langsam Wirbel für Wirbel nach unten rollen und Kopf, Nacken und Arme hängen lassen. Mit jeder Ausatmung etwas weiter loslassen. Zum Aufrichten langsam wieder hochrollen.',
pose:{ vb:[58,65,203,127], head:[185,150], back:["M181,124 L193,172"], paths:["M146,177 L135,172 L141,134 L135,97","M135,97 Q175,90 181,124"], hl:[[132,118],[166,100]] } },
{ id:'langsitz', name:'Vorbeuge im Langsitz', area:'Beine (hinten) & Rücken', sec:40, sides:false,
text:'Im Sitzen beide Beine lang nach vorn strecken. Mit geradem Rücken aus der Hüfte nach vorn beugen und mit beiden Händen die Fußspitzen greifen. Nicht wippen. Wer nicht bis zu den Füßen kommt, legt die Hände auf die Schienbeine und beugt die Knie leicht.',
pose:{ vb:[60,67,200,125], head:[181,133], paths:["M117,177 L197,177 L203,167","M117,177 Q131,150 157,141","M157,141 L197,170"], hl:[[161,172],[129,160]] } },
{ id:'plank', name:'Plank (Unterarmstütz)', area:'Rumpf (Bauch, Rücken & Schultern)', sec:90, sides:false,
text:'Auf die Unterarme stützen, die Ellbogen stehen direkt unter den Schultern. Füße hüftbreit auf die Zehen stellen und den Körper zu einer geraden Linie von Kopf bis Ferse strecken. Bauch und Gesäß fest anspannen, nicht ins Hohlkreuz sinken und das Becken nicht hochschieben. Blick zum Boden, ruhig weiteratmen.',
pose:{ vb:[56,62,208,130], head:[231,142], paths:["M81,177 L207,148","M207,148 L207,178","M207,178 L239,178"], hl:[[155,160]] } }
];
