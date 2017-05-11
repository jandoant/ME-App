class Zahnrad {

    constructor(z, m_n, alpha_n, beta, psi) {
        this.z = z;
        this.m_n = m_n;
        this.alpha_n = alpha_n;
        this.beta = beta;
        this.psi = psi;
        this.x = 0; //kann nur in Paarung bestimmt werden

        this.alpha_t = arctan(tan(alpha_n) / cos(beta));
        this.alpha_wt = 0; //kann nur in Paarung bestimmt werden
        this.beta_b = arcsin(sin(beta) * cos(alpha_n));

        this.z_n = z / (square(cos(this.beta_b)) * cos(beta));

        this.d = z * m_n / cos(beta);
        this.d_b = this.d * cos(this.alpha_t);
        this.d_a = 0; //kann nur in Paarung bestimmt werden
        this.k = 0; //kann nur in Paarung bestimmt werden
        this.d_f = 0; //kann nur in Paarung bestimmt werden

        this.c_stern = 0.25; //DIN-Normverzahnung
        this.d_w = 0; //kann nur in Paarung bestimmt werden

        this.p_n = this.m_n * Math.PI;
        this.p_t = m_n * Math.PI / cos(beta);
        this.p_et = this.d_b * Math.PI / z;
        this.p_en = this.p_et * cos(this.beta_b);
        this.p_bt = this.p_t = cos(this.alpha_t);
        this.p_x = m_n * Math.PI / sin(Math.abs(beta));
        this.p_z = Math.abs(z) * m_n * sin(Math.abs(beta));
    }


    get_kopfkreis() {
        this.d_a = this.d + 2 * this.m_n * (1 + this.x + this.k);
        return this.d_a;
    }

    get_fußkreis() {
        this.d_f = this.d - 2 * this.m_n * (1 + this.c_stern - this.x);
        return this.d_f;
    }

}

class Zahnradpaarung {

    constructor(z1, z2, m_n, alpha_n, beta, psi) {

        this.zahnrad1 = new Zahnrad(z1, m_n, alpha_n, beta, psi);
        this.zahnrad2 = new Zahnrad(z2, m_n, alpha_n, beta, psi);
        
        this.m_n = m_n;
        this.alpha_n = alpha_n;
        this.beta = beta;
        this.psi = psi;

        this.a_d = this.zahnrad1.z * m_n / (2 * cos(beta)) * (this.zahnrad2.z / this.zahnrad1.z + 1);
        this.a_min = -0.5 * m_n + this.a_d;
        this.a_max = 1.6 * m_n + this.a_d;

        this.p_et = this.zahnrad1.p_et;

    }

    choose_achsabstand() {
        let input = prompt(
            "Achsabstand wählen.\n\n" +
            "Null-Achsabstand: " + runden(this.a_d, 2) + " mm\n" +
            "zwischen " + runden(this.a_min, 3) + "mm" +
            " und " + runden(this.a_max, 3) + "mm"
        );

        this.a = parseFloat(input);

        //Mit festgelegtem Achsabstand lassen sich alpha_wt und damit die Profilverschiebungssumme der Paarung berechnen
        this.alpha_wt = arccos(cos(this.zahnrad1.alpha_t) * this.a_d / this.a);
        this.zahnrad1.alpha_wt = this.alpha_wt;
        this.zahnrad2.alpha_wt = this.alpha_wt;

        this.profil_sum = (involute(this.alpha_wt) - involute(this.zahnrad1.alpha_t)) / (2 * tan(this.alpha_n)) * (this.zahnrad1.z + this.zahnrad2.z);
    }


    choose_profilverschiebung() {
        let input = prompt("Bitte die Proflverschiebung des ersten Rades auswählen (ZG 16)\n\n" +
            "zn1+zn2/2 \n" + runden((this.zahnrad1.z_n + this.zahnrad2.z_n) / 2, 2) + "\n\n" +
            "x1+x2/2: \n" + runden(this.profil_sum / 2, 2) + "\n\n" +
            "zn1: \n" + runden(this.zahnrad1.z_n, 2)
        );

        this.zahnrad1.x = parseFloat(input);
        this.zahnrad2.x = this.profil_sum - this.zahnrad1.x;
    }

    get_kopfhoehenaenderungsfaktor() {
        let k = (this.a - this.a_d) / m_n * this.profil_sum;
        this.zahnrad1.k = k;
        this.zahnrad2.k = k;
    }

    get_waelzkreise() {
        let d_w1 = (2 * this.a) / (this.zahnrad2.z / this.zahnrad1.z + 1);

        this.zahnrad1.d_w = d_w1;
        this.zahnrad2.d_w = 2 * this.a - d_w1;
    }

    zahnrad_geometrie_berechnen() {

        let zahnraeder = [this.zahnrad1, this.zahnrad2];

        //Größen berechnen, die von Paarung abhängig sind
        this.get_kopfhoehenaenderungsfaktor();
        this.get_waelzkreise();

        for (let i = 0; i < zahnraeder.length; i++) {
            let zahnrad = zahnraeder[i];
            zahnrad.get_kopfkreis();
            zahnrad.get_fußkreis();
        }
    }

    ueberdeckung_berechnen() {
        this.get_profilueberdeckung();
        this.get_sprungueberdeckung();
        this.get_gesamtueberdeckung();
    }

    get_sprungueberdeckung(){

    }


}

