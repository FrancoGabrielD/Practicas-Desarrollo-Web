// Calculadora simple en JavaScript

// Solicitar al usuario que ingrese dos números y la operación a realizar
let numero1 = Number(prompt("Ingrese el primer número:"));
let numero2 = Number(prompt("Ingrese el segundo número:"));

// Solicitar al usuario que ingrese la operación a realizar
let operacion = prompt("Ingrese la operación (+, -, *, /):");

// Validar los números ingresados y realizar la operación correspondiente
if (isNaN(numero1) || isNaN(numero2)) {
    // Si alguno de los números ingresados no es válido, mostrar un mensaje de error
    alert("Por favor, ingrese números válidos.");
} else if (operacion === "+") {
    alert("Resultado: " + (numero1 + numero2));
} else if (operacion === "-") {
    alert("Resultado: " + (numero1 - numero2));
} else if (operacion === "*") {
    alert("Resultado: " + (numero1 * numero2));
} else if (operacion === "/") {
    if (numero2 === 0) {
        alert("No se puede dividir por 0");
    } else {
        alert("Resultado: " + (numero1 / numero2));
    }
} else {
    // Si la operación ingresada no es válida, mostrar un mensaje de error
    alert("Operación inválida");
}