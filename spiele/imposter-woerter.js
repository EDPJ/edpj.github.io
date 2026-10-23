/* ============================================================
   Wörter für das Imposter-Spiel (596 Einträge)
   Format: ["Wort", "Tipp für den Imposter"]
   Der Tipp ist immer genau EIN Wort und verrät das Wort nicht direkt.
   Neue Wörter einfach in der passenden Themengruppe ergänzen.
   ============================================================ */
const WORDS = [

  // ---------- Tiere ----------
  ["Elefant","Rüssel"], ["Pinguin","Antarktis"], ["Giraffe","Hals"], ["Delfin","Meer"], ["Fuchs","Rot"],
  ["Eule","Nacht"], ["Krokodil","Zähne"], ["Hamster","Rad"], ["Papagei","Bunt"], ["Schildkröte","Panzer"],
  ["Wolf","Rudel"], ["Känguru","Beutel"], ["Löwe","Mähne"], ["Tiger","Raubkatze"], ["Bär","Winterschlaf"],
  ["Hase","Ohren"], ["Igel","Stacheln"], ["Maus","Käse"], ["Katze","Schnurren"], ["Hund","Bellen"],
  ["Pferd","Galopp"], ["Kuh","Milch"], ["Schwein","Suhle"], ["Schaf","Wolle"], ["Ziege","Meckern"],
  ["Huhn","Eier"], ["Ente","Schnabel"], ["Gans","Martinstag"], ["Taube","Stadt"], ["Adler","Horst"],
  ["Falke","Jagd"], ["Spatz","Piepsen"], ["Rabe","Krächzen"], ["Pfau","Federn"], ["Storch","Baby"],
  ["Flamingo","Rosa"], ["Zebra","Streifen"], ["Nashorn","Horn"], ["Nilpferd","Fluss"], ["Gorilla","Urwald"],
  ["Schimpanse","Bananen"], ["Affe","Klettern"], ["Faultier","Langsam"], ["Koala","Eukalyptus"], ["Panda","Bambus"],
  ["Eisbär","Polarkreis"], ["Hirsch","Geweih"], ["Reh","Scheu"], ["Wildschwein","Keiler"], ["Dachs","Bau"],
  ["Eichhörnchen","Nüsse"], ["Fledermaus","Dämmerung"], ["Frosch","Quaken"], ["Schlange","Gift"], ["Echse","Schuppen"],
  ["Chamäleon","Tarnung"], ["Spinne","Netz"], ["Biene","Stachel"], ["Schmetterling","Raupe"], ["Ameise","Kolonie"],
  ["Marienkäfer","Punkte"], ["Hai","Flosse"],

  // ---------- Essen ----------
  ["Pizza","Italien"], ["Sushi","Reis"], ["Pommes","Kartoffel"], ["Lasagne","Schichten"], ["Döner","Spieß"],
  ["Schokolade","Kakao"], ["Pfannkuchen","Wenden"], ["Eis","Kugel"], ["Brezel","Knoten"], ["Burger","Brötchen"],
  ["Popcorn","Mais"], ["Nudeln","Kochen"], ["Apfel","Baum"], ["Banane","Krumm"], ["Erdbeere","Sommer"],
  ["Orange","Saft"], ["Zitrone","Sauer"], ["Traube","Wein"], ["Ananas","Tropisch"], ["Wassermelone","Kerne"],
  ["Kirsche","Stein"], ["Birne","Saftig"], ["Kartoffel","Knolle"], ["Karotte","Hase"], ["Tomate","Soße"],
  ["Gurke","Salat"], ["Paprika","Scharf"], ["Zwiebel","Tränen"], ["Knoblauch","Duft"], ["Pilz","Sammeln"],
  ["Mais","Kolben"], ["Brokkoli","Grün"], ["Brot","Scheibe"], ["Brötchen","Frühstück"], ["Croissant","Frankreich"],
  ["Käse","Löcher"], ["Butter","Streichen"], ["Ei","Schale"], ["Spiegelei","Pfanne"], ["Wurst","Grillen"],
  ["Schinken","Rosa"], ["Salami","Hartwurst"], ["Suppe","Löffel"], ["Salat","Dressing"], ["Spaghetti","Bolognese"],
  ["Currywurst","Imbiss"], ["Schnitzel","Paniert"], ["Kuchen","Geburtstag"], ["Keks","Krümel"], ["Waffel","Gitter"],
  ["Donut","Loch"], ["Müsli","Milch"], ["Honig","Imker"], ["Marmelade","Glas"], ["Joghurt","Becher"],
  ["Erdnuss","Schale"], ["Reis","Körner"],

  // ---------- Getränke & Süßes ----------
  ["Kaffee","Koffein"], ["Tee","Beutel"], ["Limonade","Sprudel"], ["Milch","Weiß"], ["Cola","Braun"],
  ["Bier","Hopfen"], ["Wein","Rebe"], ["Wasser","Durst"], ["Kakao","Heiß"], ["Smoothie","Mixer"],
  ["Lutscher","Stiel"], ["Gummibärchen","Kaubar"], ["Kaugummi","Blase"], ["Zuckerwatte","Jahrmarkt"], ["Lakritz","Schwarz"],
  ["Bonbon","Papier"], ["Sahne","Schlagen"], ["Pudding","Wackeln"], ["Marshmallow","Lagerfeuer"], ["Nutella","Haselnuss"],

  // ---------- Orte ----------
  ["Strand","Sand"], ["Flughafen","Koffer"], ["Bibliothek","Bücher"], ["Zoo","Gehege"], ["Kino","Leinwand"],
  ["Schwimmbad","Chlor"], ["Bahnhof","Gleis"], ["Freizeitpark","Achterbahn"], ["Supermarkt","Kasse"], ["Friedhof","Stille"],
  ["Museum","Ausstellung"], ["Wald","Bäume"], ["Schule","Pausenhof"], ["Krankenhaus","Station"], ["Kirche","Glocken"],
  ["Rathaus","Bürgermeister"], ["Gefängnis","Zelle"], ["Hotel","Rezeption"], ["Restaurant","Speisekarte"], ["Café","Cappuccino"],
  ["Bar","Hocker"], ["Disco","Tanzen"], ["Stadion","Fans"], ["Turnhalle","Quietschen"], ["Spielplatz","Rutsche"],
  ["Park","Bank"], ["Garten","Beet"], ["Bauernhof","Stall"], ["Küche","Herd"], ["Badezimmer","Dusche"],
  ["Keller","Dunkel"], ["Dachboden","Staub"], ["Garage","Auto"], ["Tankstelle","Benzin"], ["Autobahn","Stau"],
  ["Brücke","Überqueren"], ["Tunnel","Berg"], ["Burg","Ritter"], ["Schloss","Königin"], ["Pyramide","Pharao"],
  ["Leuchtturm","Küste"], ["Windmühle","Flügel"], ["Apotheke","Tabletten"], ["Bank","Geld"], ["Post","Briefmarke"],
  ["Metzgerei","Theke"], ["Baumarkt","Schrauben"], ["Campingplatz","Zelt"], ["Skipiste","Lift"], ["Hafen","Kran"],
  ["Marktplatz","Stand"], ["Kloster","Mönche"], ["Wohnzimmer","Sofa"], ["Büro","Schreibtisch"], ["Labor","Experiment"],
  ["Theater","Bühne"], ["Zirkus","Manege"],

  // ---------- Berufe ----------
  ["Pilot","Cockpit"], ["Bäcker","Teig"], ["Feuerwehrmann","Löschen"], ["Lehrer","Noten"], ["Arzt","Kittel"],
  ["Polizist","Streife"], ["Friseur","Haare"], ["Astronaut","Weltraum"], ["Koch","Küche"], ["Mechaniker","Werkstatt"],
  ["Zauberer","Tricks"], ["Detektiv","Spuren"], ["Tierarzt","Haustier"], ["Krankenschwester","Pflege"], ["Zahnarzt","Bohrer"],
  ["Apotheker","Rezept"], ["Richter","Urteil"], ["Anwalt","Verteidigung"], ["Bauer","Ernte"], ["Gärtner","Rasen"],
  ["Fischer","Netz"], ["Metzger","Fleisch"], ["Maler","Pinsel"], ["Tischler","Holz"], ["Elektriker","Kabel"],
  ["Klempner","Rohr"], ["Dachdecker","Ziegel"], ["Busfahrer","Linie"], ["Taxifahrer","Fahrgast"], ["Kapitän","Schiff"],
  ["Matrose","Anker"], ["Postbote","Briefe"], ["Kellner","Tablett"], ["Barkeeper","Cocktail"], ["Verkäufer","Beratung"],
  ["Kassierer","Scheine"], ["Reinigungskraft","Wischmopp"], ["Journalist","Zeitung"], ["Fotograf","Kamera"], ["Musiker","Auftritt"],
  ["Schauspieler","Rolle"], ["Clown","Nase"], ["Ingenieur","Konstruktion"], ["Programmierer","Code"], ["Architekt","Entwurf"],
  ["Forscher","Entdeckung"], ["Bibliothekar","Ausleihe"], ["Soldat","Kaserne"], ["König","Krone"], ["Pirat","Schatz"],
  ["Ritter","Rüstung"], ["Schornsteinfeger","Glück"],

  // ---------- Haushalt & Gegenstände ----------
  ["Regenschirm","Regen"], ["Taschenlampe","Licht"], ["Staubsauger","Saugen"], ["Zahnbürste","Zähne"], ["Kühlschrank","Kalt"],
  ["Schere","Schneiden"], ["Fernseher","Flimmern"], ["Rucksack","Schultern"], ["Spiegel","Reflexion"], ["Wecker","Morgens"],
  ["Kopfhörer","Ohren"], ["Kerze","Wachs"], ["Tisch","Beine"], ["Stuhl","Sitzen"], ["Bett","Schlafen"],
  ["Sofa","Kissen"], ["Schrank","Kleider"], ["Lampe","Birne"], ["Teppich","Fransen"], ["Vorhang","Fenster"],
  ["Uhr","Zeiger"], ["Bild","Rahmen"], ["Gabel","Zinken"], ["Messer","Klinge"], ["Löffel","Rühren"],
  ["Teller","Porzellan"], ["Tasse","Henkel"], ["Topf","Deckel"], ["Pfanne","Stiel"], ["Glas","Zerbrechlich"],
  ["Flasche","Korken"], ["Dose","Öffner"], ["Toaster","Scheiben"], ["Mixer","Püree"], ["Herd","Platte"],
  ["Backofen","Heißluft"], ["Mikrowelle","Piepen"], ["Waschmaschine","Trommel"], ["Bügeleisen","Falten"], ["Besen","Kehren"],
  ["Eimer","Putzen"], ["Seife","Schaum"], ["Handtuch","Trocknen"], ["Badewanne","Schaumbad"], ["Zahnpasta","Tube"],
  ["Shampoo","Kopfhaut"], ["Kamm","Frisur"], ["Schlüssel","Schloss"], ["Briefkasten","Post"], ["Klingel","Besuch"],
  ["Tür","Klinke"], ["Fenster","Scheibe"], ["Hammer","Nagel"], ["Schraubenzieher","Schraube"], ["Säge","Brett"],
  ["Zange","Greifen"], ["Leiter","Sprossen"], ["Stift","Tinte"], ["Radiergummi","Fehler"], ["Lineal","Zentimeter"],
  ["Heft","Linien"], ["Papier","Blatt"],

  // ---------- Kleidung ----------
  ["Hose","Bein"], ["Jacke","Reißverschluss"], ["Pullover","Kuschelig"], ["Socke","Paar"], ["Schuh","Schnürsenkel"],
  ["Mütze","Winter"], ["Schal","Kälte"], ["Handschuh","Finger"], ["Gürtel","Schnalle"], ["Krawatte","Anzug"],
  ["Kleid","Hochzeit"], ["Rock","Knie"], ["Hemd","Kragen"], ["Brille","Gläser"], ["Sonnenbrille","Sommer"],
  ["Armband","Handgelenk"], ["Ring","Verlobung"], ["Halskette","Anhänger"], ["Hut","Krempe"], ["Stiefel","Gummi"],
  ["Pyjama","Nachts"], ["Bikini","Zweiteiler"], ["Badehose","Plansche"], ["Schürze","Fleck"], ["Regenmantel","Pfütze"],

  // ---------- Sport & Hobbys ----------
  ["Fußball","Tor"], ["Tennis","Schläger"], ["Schwimmen","Bahnen"], ["Skifahren","Piste"], ["Boxen","Ring"],
  ["Golf","Loch"], ["Volleyball","Netz"], ["Reiten","Pferd"], ["Klettern","Wand"], ["Surfen","Welle"],
  ["Basketball","Korb"], ["Turnen","Barren"], ["Handball","Harz"], ["Hockey","Stock"], ["Eishockey","Puck"],
  ["Rugby","Ei"], ["Baseball","Schlagholz"], ["Badminton","Federball"], ["Tischtennis","Platte"], ["Billard","Kugeln"],
  ["Bowling","Kegel"], ["Darts","Pfeile"], ["Joggen","Laufschuhe"], ["Wandern","Gipfel"], ["Radfahren","Helm"],
  ["Yoga","Entspannung"], ["Tanzen","Rhythmus"], ["Angeln","Köder"], ["Segeln","Kurs"], ["Rudern","Paddel"],
  ["Tauchen","Sauerstoff"], ["Snowboard","Halfpipe"], ["Schach","Matt"], ["Puzzle","Teile"], ["Stricken","Nadeln"],
  ["Malen","Leinwand"], ["Basteln","Kleber"], ["Fotografieren","Blitz"], ["Backen","Rührteig"], ["Gärtnern","Samen"],
  ["Lesen","Seiten"], ["Zelten","Schlafsack"], ["Karate","Dojo"], ["Judo","Wurf"], ["Fechten","Degen"],
  ["Bogenschießen","Zielscheibe"], ["Leichtathletik","Hürden"],

  // ---------- Fahrzeuge ----------
  ["Fahrrad","Pedale"], ["Hubschrauber","Rotor"], ["U-Boot","Tauchen"], ["Traktor","Acker"], ["Rakete","Start"],
  ["Roller","Schieben"], ["Zug","Schienen"], ["Segelboot","Wind"], ["Bagger","Schaufel"], ["Krankenwagen","Sirene"],
  ["Skateboard","Rampe"], ["Heißluftballon","Schweben"], ["Auto","Lenkrad"], ["Bus","Haltestelle"], ["Motorrad","Helm"],
  ["Lastwagen","Fracht"], ["Straßenbahn","Oberleitung"], ["Flugzeug","Turbulenz"], ["Schiff","Kreuzfahrt"], ["Fähre","Überfahrt"],
  ["Kanu","Stromschnelle"], ["Gondel","Venedig"], ["Kutsche","Holpern"], ["Schlitten","Schnee"], ["Wohnmobil","Urlaub"],
  ["Feuerwehrauto","Leiter"], ["Müllwagen","Tonne"], ["Panzer","Kette"], ["Rollstuhl","Räder"], ["Kinderwagen","Spaziergang"],
  ["Einrad","Zirkus"], ["Quad","Gelände"],

  // ---------- Natur & Wetter ----------
  ["Vulkan","Lava"], ["Regenbogen","Farben"], ["Wasserfall","Rauschen"], ["Gewitter","Blitz"], ["Wüste","Dünen"],
  ["Höhle","Echo"], ["Insel","Palme"], ["Gletscher","Schmelzen"], ["Nebel","Sicht"], ["Sonnenuntergang","Abendrot"],
  ["Korallenriff","Fische"], ["Dschungel","Lianen"], ["Berg","Gipfel"], ["Tal","Senke"], ["Hügel","Sanft"],
  ["Fluss","Ufer"], ["See","Boot"], ["Meer","Salz"], ["Ozean","Tiefe"], ["Teich","Seerosen"],
  ["Bach","Plätschern"], ["Quelle","Ursprung"], ["Wiese","Blumen"], ["Feld","Getreide"], ["Moor","Sumpf"],
  ["Düne","Sandberg"], ["Klippe","Abgrund"], ["Sonne","Hitze"], ["Mond","Phasen"], ["Stern","Funkeln"],
  ["Komet","Schweif"], ["Planet","Umlaufbahn"], ["Regen","Tropfen"], ["Schnee","Flocken"], ["Sturm","Orkan"],
  ["Hagel","Eisklumpen"], ["Tornado","Wirbel"], ["Erdbeben","Risse"], ["Lawine","Alpen"], ["Überschwemmung","Hochwasser"],
  ["Wolke","Himmel"], ["Herbst","Laub"],

  // ---------- Pflanzen ----------
  ["Rose","Dornen"], ["Tulpe","Zwiebel"], ["Sonnenblume","Gelb"], ["Kaktus","Trocken"], ["Eiche","Eicheln"],
  ["Tanne","Nadeln"], ["Palme","Kokosnuss"], ["Gras","Mähen"], ["Kürbis","Orange"], ["Löwenzahn","Pusteblume"],

  // ---------- Körper & Gesundheit ----------
  ["Herz","Schlagen"], ["Gehirn","Denken"], ["Knochen","Skelett"], ["Muskel","Kraft"], ["Zahn","Beißen"],
  ["Auge","Sehen"], ["Ohr","Hören"], ["Nase","Riechen"], ["Mund","Zunge"], ["Hand","Greifen"],
  ["Fuß","Zehen"], ["Fieber","Thermometer"], ["Pflaster","Wunde"], ["Spritze","Impfung"], ["Gips","Bruch"],

  // ---------- Musik ----------
  ["Gitarre","Saiten"], ["Klavier","Tasten"], ["Geige","Bogen"], ["Trompete","Blasen"], ["Schlagzeug","Becken"],
  ["Flöte","Löcher"], ["Harfe","Engel"], ["Akkordeon","Balg"], ["Mundharmonika","Blues"], ["Saxophon","Jazz"],
  ["Konzert","Publikum"], ["Oper","Arie"], ["Chor","Stimmen"], ["Orchester","Dirigent"], ["Mikrofon","Singen"],
  ["Lied","Melodie"], ["Karaoke","Text"], ["DJ","Plattenteller"], ["Festival","Zeltplatz"], ["Radio","Sender"],

  // ---------- Technik ----------
  ["Handy","Display"], ["Computer","Tastatur"], ["Laptop","Akku"], ["Tablet","Wischen"], ["Drucker","Patrone"],
  ["Kamera","Linse"], ["Drohne","Propeller"], ["Roboter","Maschine"], ["Satellit","Funk"], ["Fernbedienung","Kanal"],
  ["Lautsprecher","Bass"], ["Ladekabel","Steckdose"], ["Batterie","Plus"], ["Steckdose","Strom"], ["Glühbirne","Idee"],
  ["Internet","Online"], ["Passwort","Geheim"], ["Videospiel","Controller"], ["Smartwatch","Schritte"], ["Navi","Route"],
  ["Taschenrechner","Zahlen"], ["Thermometer","Temperatur"], ["Waage","Gewicht"], ["Kompass","Norden"], ["Fernglas","Entfernung"],

  // ---------- Fantasie & Märchen ----------
  ["Drache","Feuer"], ["Einhorn","Mythos"], ["Hexe","Besen"], ["Fee","Zauberstab"], ["Zwerg","Mine"],
  ["Riese","Groß"], ["Geist","Spuk"], ["Vampir","Blut"], ["Zombie","Untot"], ["Werwolf","Vollmond"],
  ["Meerjungfrau","Flosse"], ["Prinzessin","Erbse"], ["Weihnachtsmann","Geschenke"], ["Osterhase","Eier"], ["Schneemann","Kohle"],
  ["Superheld","Umhang"], ["Alien","Ufo"], ["Yeti","Himalaya"], ["Schatzkarte","Kreuz"], ["Zaubertrank","Kessel"],

  // ---------- Schule ----------
  ["Tafel","Kreide"], ["Schulbus","Morgen"], ["Klassenarbeit","Prüfung"], ["Zeugnis","Ferien"], ["Pause","Klingel"],
  ["Hausaufgaben","Abend"], ["Schulranzen","Erstklässler"], ["Mathematik","Rechnen"], ["Geschichte","Vergangenheit"], ["Biologie","Zellen"],
  ["Klassenzimmer","Pult"], ["Schulhof","Aufsicht"], ["Direktor","Chef"], ["Abitur","Reife"], ["Uni","Hörsaal"],
  ["Federmappe","Stifte"], ["Schwamm","Nass"], ["Landkarte","Atlas"], ["Globus","Drehen"], ["Wörterbuch","Nachschlagen"],

  // ---------- Feste & Feiern ----------
  ["Weihnachten","Tannenbaum"], ["Ostern","Eiersuche"], ["Silvester","Feuerwerk"], ["Karneval","Kostüm"], ["Halloween","Kürbis"],
  ["Geburtstag","Torte"], ["Hochzeit","Braut"], ["Beerdigung","Trauer"], ["Taufe","Pfarrer"], ["Party","Musik"],
  ["Geschenk","Schleife"], ["Luftballon","Helium"], ["Konfetti","Papierschnipsel"], ["Picknick","Decke"], ["Grillen","Rost"],

  // ---------- Spielzeug & Spiele ----------
  ["Teddy","Kuscheln"], ["Puppe","Haare"], ["Lego","Steine"], ["Ball","Rollen"], ["Kreisel","Drehen"],
  ["Würfel","Augen"], ["Memory","Paare"], ["Mikado","Stäbchen"], ["Monopoly","Straßen"], ["Domino","Reihe"],
  ["Kartenspiel","Mischen"], ["Seifenblasen","Ring"], ["Trampolin","Springen"], ["Schaukel","Schwung"], ["Sandkasten","Förmchen"]
];
