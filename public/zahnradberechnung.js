console.log('Willkommen bei der Zahnradberechnung');

//DOM-Objekte mit Javascript verknüpfen
var input_m_n = document.getElementById('js-input-modul');
var input_alpha = document.getElementById('js-input-alpha');
var input_beta = document.getElementById('js-input-beta');
var input_z1 = document.getElementById('js-input-z1');
var input_z2 = document.getElementById('js-input-z2');
var input_i = document.getElementById('js-show-uebersetzung');
var input_i_soll = document.getElementById('js-input-uebersetzung-soll');
var btn_geometrie = document.getElementById("js-btn-calc-geometrie");

var input_psi = document.getElementById('js-input-psi');
var display_breite = document.getElementById('js-show-breite');


let label_z1 = document.getElementById('js-label-z1');
let label_z2 = document.getElementById('js-label-z2');

let show_abweichung_i = document.getElementById('js-show-abweichung-i');



//Globale Variablen festlegen
let btn_counter = 0;
let m_n = 0;
let z1 = 0;
let z2 = 0;
let i_soll = 0;
let beta = 0;
let alpha_n = 20;
let b_w = 0;
let psi = 0;

update_uebersetzung();
update_breite();

//Wenn Button geklickt wird, dann wird Berechnung gestartet und das Ergebnis angezeigt
btn_geometrie.addEventListener("click", function(event) {

    event.preventDefault;
    //Werte auslesen    

    psi = 0.5;

    console.log("Modul: " + m_n);
    console.log("z1: " + z1);
    console.log("z2: " + z2);
    console.log("i: " + i);
    console.log("i_soll: " + i_soll);
    console.log("alpha: " + alpha_n);
    console.log("beta: " + beta);
    console.log("psi: " + psi);
    console.log("b_w: " + b_w);

    if (z1 === 0 || z2 === 0) {
        alert("Die Zähnezahlen dürfen nicht Null sein!");
        return;
    }


    //Zahnradpaarung definieren
    let paarung = new Zahnradpaarung(z1, z2, m_n, alpha_n, beta, b_w);
    //Geometrie der Zahnradpaarung berechnen
    paarung.zahnrad_geometrie_berechnen();
    console.log(paarung);

    //Button-Aussehen ändern
    btn_geometrie.innerText = "Zahnrageometrie berechnet";
    btn_geometrie.className = "col-sm-12 btn btn-success";

    btn_counter++;


});

input_m_n.addEventListener('change', function() {
    m_n = parseFloat(input_m_n.value);
    update_button();
});

input_z1.addEventListener('change', function() {
    z1 = parseFloat(input_z1.value);
    update_label();
    update_button();
    update_uebersetzung();
    update_abweichung_i();
    update_breite();
});

input_z2.addEventListener('change', function() {
    z2 = parseFloat(input_z2.value);
    update_label();
    update_button();
    update_uebersetzung();
    update_abweichung_i();
    update_breite();
});

input_alpha.addEventListener('change', function() {
    alpha_n = parseFloat(input_alpha.value);
    update_button();
    update_uebersetzung();
});

input_beta.addEventListener('change', function() {
    beta = parseFloat(input_beta.value);
    update_button();
});

input_i_soll.addEventListener('change', function() {
    i_soll = parseFloat(input_i_soll.value);
    update_abweichung_i();
});

input_psi.addEventListener('change', function() {
    psi = parseFloat(input_psi.value);
    update_breite();
});

function update_uebersetzung() {
    i = -z2 / z1;
    if (z1 == 0) {
        i = "n.def";
    }
    input_i.value = i;
    return i;
}

function update_button() {
    if (btn_counter > 0) {
        btn_geometrie.innerText = "Zahnradgeometrie erneut berechnen";
        btn_geometrie.className = "col-sm-12 btn btn-danger";
    }
}

function update_label() {
    if (z1 > z2) {
        label_z1.innerText = "Zähnezahl Zahnrad 1 (Rad)";
        label_z2.innerText = "Zähnezahl Zahnrad 2 (Ritzel)";
    } else if (z1 < z2) {
        label_z1.innerText = "Zähnezahl Zahnrad 1 (Ritzel)";
        label_z2.innerText = "Zähnezahl Zahnrad 2 (Rad)";
    } else {
        label_z1.innerText = "Zähnezahl Zahnrad 1";
        label_z2.innerText = "Zähnezahl Zahnrad 2";
    }
}

function update_abweichung_i() {
    let abweichung = 100 * Math.abs((i_soll - i) / i_soll)
    show_abweichung_i.innerText = "Abweichung : " + abweichung + "%";
}

function update_breite() {
    b_w = Math.ceil(psi * Math.min(z1, z2) * m_n / cos(beta));

    display_breite.value = b_w;

}