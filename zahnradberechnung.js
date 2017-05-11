console.log('Willkommen bei der Zahnradberechnung');

//EINGABE
//Modul in mm
const m_n = 1.25;
//Zähnezahlen
const z1 = 25;
const z2 = 77;
//Schrägungswinkel in Grad
const beta = 20;
// Normaleingriffswinkel in Grad 
const alpha_n = 20
//Breite-Durchmesserverhältnis
const psi = 0.5;

//Zahnradaarung definieren
let paarung = new Zahnradpaarung(z1, z2, m_n, alpha_n, beta, psi);

//Achsabstand festlegen
paarung.choose_achsabstand();
console.log("gewählter Achsabstand: " + paarung.a + "mm");


paarung.choose_profilverschiebung();
paarung.zahnrad_geometrie_berechnen();

console.log(paarung);


/*
//3.Profilverschiebung
//3.1 Profilverschiebungssumme
profil_sum = 










//3.2 Aufteilung der Profilverschiebung
//3.2.1 Ersatzzähnezahlen
let z1_n = ersatzzaehnezahl(z1);
let z2_n = ersatzzaehnezahl(z2);
//3.2.2 Eingabe der Profilverschiebeung des ersten Zahnrades
let x1 = prompt("Bitte die Proflverschiebung des ersten Rades auswählen (ZG 16)\n\n" +
    "zn1+zn2/2 \n" + runden((z1_n + z2_n) / 2, 2) + "\n\n" +
    "x1+x2/2: \n" + runden(profil_sum / 2, 2) + "\n\n" +
    "zn1: \n" + runden(z1_n, 2)
);
//Bei Eingabe Komma als Dezimalzeichen
x1 = x1.replace(",", ".");

//3.2.3 Berechnung der Profilverschiebeung des zweiten Zahnrades
let x2 = profil_sum - x1;
//3.3 Ausgabe der Profilverschiebung
console.log("x1+x2 " + profil_sum);
console.log("x1: " + x1);
console.log("x2: " + x2);

//4. Geometrische Größen der Zahnradstude
//4.1 Kopfhöhenänderungsfaktor
let k = (a - a_d) / m_n - profil_sum;
//4.2 Stirnmodul
let m_t = m_n / cos(beta);
//4.3 Teilungen
//4.3.1  Normalteilung
let p_n = m_n * Math.PI;
//4.3.2 Teilkreisteilung 
let p_t = m_n * Math.PI / cos(beta);
//4.3.3 Stirneingriffsteilung 
let p_et = p_t * cos(alpha_t);
//4.3.4 Normaleingriffsteilung
let p_en = p_et * cos(beta_b);
//4.3.5 Grundkreisteilung
let p_bt = p_t * cos(alpha_t);
//4.3.6 Axialteilung 
let p_x = m_n * Math.PI / sin(Math.abs(beta));

//5. Zahnrad 1
//5.1 Teilkreisdurchmesser

//5.2 Grundkreisdurchmesser
//5.3 Kopfkreisdurchmesser
//5.4 Wälzkreisdurchmesser
//5.5 Fußkreisdurchmesser


console.log(zahnrad1.get_teilkreis());
*/

