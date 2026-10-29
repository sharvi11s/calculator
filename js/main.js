import {
    appendToDisplay,
    clearDisplay,
    deleteLast
} from "./display.js";

import { calculate } from "./parser.js";

import { toggleAngleMode } from "./angleMode.js";

import {
    squareRoot,
    square,
    power,
    convertFractionDecimal,
    reciprocal,
    cubeRoot,
    inverseSin,
    inverseCos,
    inverseTan,
    absoluteValue,
    cube
} from "./scientific.js";

import "./keyboard.js";


window.appendToDisplay = appendToDisplay;
window.clearDisplay = clearDisplay;
window.deleteLast = deleteLast;
window.calculate = calculate;

window.squareRoot = squareRoot;
window.square = square;
window.power = power;
window.convertFractionDecimal = convertFractionDecimal;
window.reciprocal = reciprocal;
window.cubeRoot = cubeRoot;
window.inverseSin = inverseSin;
window.inverseCos = inverseCos;
window.inverseTan = inverseTan;
window.toggleAngleMode = toggleAngleMode;
window.absoluteValue = absoluteValue;
window.cube = cube;