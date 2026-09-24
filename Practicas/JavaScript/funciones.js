
// Solicitar al usuario que ingrese dos números y la operación a realizar
let numro1 = Number(prompt("Ingrese el primer número:"));
let numero2 = Number(prompt("Ingrese el segundo número:"));
let operacion = prompt("Ingrese la operación (+, -, *, /):");

// Funciones para operaciones matemáticas
function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        alert("No se puede dividir por 0, press f5 para recargar la página");
        return null;
    }
    return a / b;
}

// Validar los números ingresados y realizar la operación correspondiente
if (isNaN(numro1) || isNaN(numero2)) {
    alert("Por favor, ingrese números válidos, press f5 para recargar la página");
} else {
    switch (operacion) {
        case "+":
            alert("Resultado: " + sumar(numro1, numero2));
            break;
        case "-":
            alert("Resultado: " + restar(numro1, numero2));
            break;
        case "*":
            alert("Resultado: " + multiplicar(numro1, numero2));
            break;
        case "/":
            alert("Resultado: " + dividir(numro1, numero2));
            break;
        default:
            alert("Operación no válida, press f5 para recargar la página");
    }
}