console.log('Willkommen bei der Zahnradberechnung');

let btn_counter = 0;
let m_n = 0;
let z1 = 0;
let z2 = 0;
let beta = 0;
let alpha_n = 20;

//DOM-Objekte mit Javascript verknüpfen
var input_m_n = document.getElementById('js-input-modul');
var input_alpha = document.getElementById('js-input-alpha');
var input_beta = document.getElementById('js-input-beta');
var input_z1 = document.getElementById('js-input-z1');
var input_z2 = document.getElementById('js-input-z2');
var btn_geometrie = document.getElementById("js-btn-calc-geometrie");

//Wenn Button geklickt wird, dann wird Berechnung gestartet und das Ergebnis angezeigt
btn_geometrie.addEventListener("click", function(event) {

    event.preventDefault;

    //Werte auslesen
    m_n = parseFloat(input_m_n.value);
    z1 = parseFloat(input_z1.value);
    z2 = parseFloat(input_z2.value);
    beta = parseFloat(input_beta.value);
    alpha_n = parseFloat(input_alpha.value);
    psi = 0.5;

    console.log("Modul: " + m_n);
    console.log("z1: " + z1);
    console.log("z2: " + z2);
    console.log("alpha: " + alpha_n);
    console.log("beta: " + beta);

    //Zahnradpaarung definieren
    let paarung = new Zahnradpaarung(z1, z2, m_n, alpha_n, beta, psi);
    //Geometrie der Zahnradpaarung berechnen
    paarung.zahnrad_geometrie_berechnen();
    console.log(paarung);

    //Button-Aussehen ändern
    btn_geometrie.innerText = "Zahnrageometrie berechnet";
    btn_geometrie.className = "col-sm-12 btn btn-success";

    btn_counter++;
    console.log(btn_counter);


});

input_m_n.addEventListener('change', function() {
    update_button();
});

input_z1.addEventListener('change', function() {
    update_button();
});

input_z2.addEventListener('change', function() {
    update_button();
});

input_alpha.addEventListener('change', function() {
    update_button();
});

input_beta.addEventListener('change', function() {
    update_button();
});






function update_button() {
    if (btn_counter > 0) {
        btn_geometrie.innerText = "Zahnradgeometrie erneut berechnen";
        btn_geometrie.className = "col-sm-12 btn btn-danger";
    }
}