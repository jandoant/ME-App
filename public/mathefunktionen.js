function involute(angle_deg) {
    //Berechnung der Involute des übergebenen Winkels
    return tan(angle_deg) - toRadians(angle_deg);
}

function toDegrees(angle_rad) {
    return angle_rad * 180 / Math.PI;
}

function toRadians(angle_deg) {
    return angle_deg * Math.PI / 180;
}

function cos(angle_deg) {
    return Math.cos(toRadians(angle_deg));
}

function sin(angle_deg) {
    return Math.sin(toRadians(angle_deg));
}

function tan(angle_deg) {
    return Math.tan(toRadians(angle_deg));
}

function runden(wert, anz_stellen) {
    return Math.round(wert * Math.pow(10, anz_stellen)) / (Math.pow(10, anz_stellen));
}

function arctan(value) {
    return toDegrees(Math.atan(value));
}

function arcsin(value) {
    return toDegrees(Math.asin(value));
}

function arccos(value) {
    return toDegrees(Math.acos(value));
}

function square(value) {
    return value * value;
}