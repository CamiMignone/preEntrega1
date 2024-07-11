// Solicitar datos al usuario
let edad = parseInt(prompt("Ingrese su edad:"));
let montoPrestamo = parseInt(prompt("Ingrese el monto del prestamo:"));
let plazo = parseInt(prompt("Ingrese el plazo del préstamo en anios:"));
if (edad > 50) {
    while (plazo > 15) {
        plazo = parseInt(prompt("Las personas mayores de 50 anios no pueden elegir un plazo mayor a 15 anios. Por favor, ingrese un nuevo plazo (maximo 15):"));
    }
}
const interesAnual = 0.035;
let tipoCuota = prompt("Ingrese el tipo de cuota (fija/variable):").toLowerCase();


// Funcion principal para el simulador de prestamo personal
function simulacionPrestamo(montoPrestamo, plazo, interesAnual, edad, tipoCuota) {
    const interesMensual = interesAnual / 12;
    const numeroCuotas = plazo * 12;
    const cuotaMensual = calculoCuota(montoPrestamo, interesMensual, numeroCuotas, tipoCuota);
    const totalPrestamo = calculoValorTotal(cuotaMensual, numeroCuotas, tipoCuota);
    const interesTotal = totalPrestamo - montoPrestamo;
    return {
        totalPrestamo: totalPrestamo,
        interesMensual: (interesMensual * 100),
        interesTotal: interesTotal,
        plazo: plazo,
        tipoCuota: tipoCuota
    };
}

// Funcion para calcular el pago mensual
function calculoCuota(montoPrestamo, interesMensual, numeroCuotas, tipoCuota) {
    if (interesMensual === 0) {
        return montoPrestamo / numeroCuotas;
    }
    if (tipoCuota === 'fija') {
        return (montoPrestamo * interesMensual) / (1 - Math.pow(1 + interesMensual, -numeroCuotas));
    } else {
        // Para cuotas variables, inicializamos con un pago mensual base menor
        return (montoPrestamo * interesMensual) / (1 - Math.pow(1 + interesMensual, -numeroCuotas)) * 0.8;
    }
}

// Funcion para calcular el valor total del prestamo
function calculoValorTotal(cuotaMensual, numeroCuotas, tipoCuota) {
    if (tipoCuota === "fija") {
        return cuotaMensual * numeroCuotas;
    } else {
        let total = 0;
        for (let i = 1; i <= numeroCuotas; i++) {
            total += cuotaMensual;
            if (i % 6 === 0) {
                cuotaMensual *= 1.05; // Incremento del pago cada 6 meses
            }
        }
        return total;
    }
}


const resultado = simulacionPrestamo(montoPrestamo, plazo, interesAnual, edad, tipoCuota);
if (resultado) {
    console.log("Valor solicitado: " + montoPrestamo + "€");
    console.log("Valor Total del Préstamo: " + resultado.totalPrestamo + "€");
    console.log("Interés Mensual: " + resultado.interesMensual + "%");
    console.log("Interés Total: " + resultado.interesTotal+ "€");
    console.log("Plazo: " + resultado.plazo);
    console.log("Tipo de Cuota: " + resultado.tipoCuota);
}