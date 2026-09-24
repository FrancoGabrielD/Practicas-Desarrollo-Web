// Programa que solicita al usuario un número del 1 al 7 y muestra el día de la semana correspondiente
let numeroDia = Number(prompt("Ingrese un numero del 1 al 7: "));

// Validar el número ingresado y mostrar el día de la semana correspondiente
if (isNaN(numeroDia) || numeroDia < 1 || numeroDia > 7) {
    alert("Por favor, ingrese un número válido del 1 al 7. press f5");
} else {
    // Si el número ingresado es válido, mostrar el día de la semana correspondiente
    switch (numeroDia) {
        case 1:
            alert("Hoy es lunes");
            break;
        case 2:
            alert("Hoy es martes");
            break;
        case 3:
            alert("Hoy es miercoles");
            break;
        case 4:
            alert("Hoy es jueves");
            break;
        case 5:
            alert("Hoy es viernes");
            break;
        case 6:
            alert("Hoy es sabado");
            break;
        case 7:
            alert("Hoy es domingo");
            break;
        default:
            alert("Numero no reconocido");
            break;
    }
}