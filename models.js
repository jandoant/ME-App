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

        this.z_v = z / Math.pow(cos(beta), 3);
        this.z_n = z / (square(cos(this.beta_b)) * cos(beta));

        this.k_m = z / (9 * Math.pow(cos(beta), 3)) + 0.5;

        this.d = z * m_n / cos(beta);
        this.d_b = this.d * cos(this.alpha_t);
        this.d_a = 0; //kann nur in Paarung bestimmt werden
        this.k = 0; //kann nur in Paarung bestimmt werden
        this.d_f = 0; //kann nur in Paarung bestimmt werden
        this.d_w = 0; //kann nur in Paarung bestimmt werden
        this.d_n = this.d / (square(cos(beta)));

        this.b = psi * this.d;

        this.c_stern = 0.25; //DIN-Normverzahnung

        this.p_n = this.m_n * Math.PI;
        this.p_t = m_n * Math.PI / cos(beta);
        this.p_et = this.d_b * Math.PI / z;
        this.p_en = this.p_et * cos(this.beta_b);
        this.p_bt = this.p_t = cos(this.alpha_t);
        this.p_x = m_n * Math.PI / sin(Math.abs(beta));
        this.p_z = Math.abs(z) * m_n * sin(Math.abs(beta));

    }


    calc_kopfkreis() {
        this.d_a = this.d + 2 * this.m_n * (1 + this.x + this.k);
    }

    calc_fußkreis() {
        this.d_f = this.d - 2 * this.m_n * (1 + this.c_stern - this.x);
    }

    calc_zahnhoehe() {
        this.h_a = (this.d_a - this.d) / 2;

        let xi = this.s_n / this.d_n;
        xi = toDegrees(xi);

        this.h_a_strich = this.h_a + (1 - cos(xi)) * 0.5 * this.d_n;


    }

    calc_zahndicke() {
        this.s_n = this.m_n * (0.5 * Math.PI + 2 * this.x * tan(this.alpha_n));

        let xi = this.s_n / this.d_n;
        xi = toDegrees(xi);

        this.s_n_strich = this.d_n * sin(xi);

        this.s_t = .5 * this.p_t + 2 * this.x * this.m_n * tan(this.alpha_t);

        this.s_bt = this.d_b * ((Math.PI + 4 * this.x * tan(this.alpha_n)) / (2 * this.z) + involute(this.alpha_t));

        this.s_bn = this.s_bt * cos(this.beta_b);

    }

}

class Zahnradpaarung {

    constructor(z1, z2, m_n, alpha_n, beta, psi) {

        this.zahnrad1 = new Zahnrad(z1, m_n, alpha_n, beta, psi);
        this.zahnrad2 = new Zahnrad(z2, m_n, alpha_n, beta, psi);

        this.b_w = Math.min(this.zahnrad1.b, this.zahnrad2.b);

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

    calc_waelzkreise() {
        let d_w1 = (2 * this.a) / (this.zahnrad2.z / this.zahnrad1.z + 1);

        this.zahnrad1.d_w = d_w1;
        this.zahnrad2.d_w = 2 * this.a - d_w1;
    }

    calc_alpha_wt() {
        this.alpha_wt = arccos(cos(this.zahnrad1.alpha_t) * this.a_d / this.a);
        this.zahnrad1.alpha_wt = this.alpha_wt;
        this.zahnrad2.alpha_wt = this.alpha_wt;
    }

    calc_profil_sum() {
        this.profil_sum = (involute(this.alpha_wt) - involute(this.zahnrad1.alpha_t)) / (2 * tan(this.alpha_n)) * (this.zahnrad1.z + this.zahnrad2.z);
    }

    calc_kopfhoehenaenderungsfaktor() {
        this.k = (this.a - this.a_d) / m_n * this.profil_sum;
        this.zahnrad1.k = this.k;
        this.zahnrad2.k = this.k;
    }

    zahnrad_geometrie_berechnen() {

        this.choose_achsabstand();
        //Mit festgelegtem Achsabstand lassen sich alpha_wt und damit die Profilverschiebungssumme der Paarung berechnen
        this.calc_alpha_wt();
        this.calc_profil_sum();
        this.calc_kopfhoehenaenderungsfaktor();

        this.choose_profilverschiebung();

        //Größen berechnen, die von Paarung abhängig sind
        let zahnraeder = [this.zahnrad1, this.zahnrad2];

        for (let i = 0; i < zahnraeder.length; i++) {
            let zahnrad = zahnraeder[i];
            zahnrad.calc_kopfkreis();
            zahnrad.calc_fußkreis();
            zahnrad.calc_zahndicke();
            zahnrad.calc_zahnhoehe();

        }

        this.calc_waelzkreise();
        this.ueberdeckung_berechnen();
    }

    ueberdeckung_berechnen() {
        this.calc_profilueberdeckung();
        this.calc_sprungueberdeckung();
        this.calc_gesamtueberdeckung();
    }

    calc_profilueberdeckung() {
        //this.eps_alpha = (1/this.p_et) * (Math.sqrt(square(0.5*this.zahnrad1.d_a)-square(0.5*this.zahnrad2.d_a)));
        this.eps_alpha = (1 / this.p_et) * (Math.sqrt(square(0.5 * this.zahnrad1.d_a) - square(0.5 * this.zahnrad1.d_b)) + (this.zahnrad2.z / Math.abs(this.zahnrad2.z)) * Math.sqrt(square(0.5 * this.zahnrad2.d_a) - square(0.5 * this.zahnrad2.d_b)) - this.a * sin(this.alpha_wt));
    }
    calc_sprungueberdeckung() {
        this.eps_beta = this.b_w * sin(Math.abs(beta)) / (this.m_n * Math.PI);
    }

    calc_gesamtueberdeckung() {
        this.eps_gamma = this.eps_alpha + this.eps_beta;
    }


}