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
paarung.zahnrad_geometrie_berechnen();

console.log(paarung);