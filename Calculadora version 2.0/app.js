const resultado = document.getElementById("resultado");
let reiniciar = false;


function agregarNumero(num) {
    if (reiniciar) {
        resultado.value = num;
        reiniciar = false;
        return;
    }

    if (resultado.value === "0") {
        resultado.value = num;
    } else {
        resultado.value += num;
    }
}

function agregarOperador(op) {
    if (validarOperadorInicial(op)) return;

    if (reiniciar) reiniciar = false;

    resultado.value += op;
}


function borrarTodo() {
    resultado.value = "0";
}


function borrarUltimo() {
    resultado.value = resultado.value.slice(0, -1);

    if (resultado.value.length === 0) {
        resultado.value = "0";
    }
}

function calcularPorcentaje() {
    try {
        resultado.value = (parseFloat(resultado.value) / 100).toString();
    } catch {
        mostrarError();
    }
}

function convertirSimbolos(exp) {
    return exp
        .replace(/×/g, "*")
        .replace(/÷/g, "/");
}


function validarOperadorInicial(operador) {
    if (["+", "-", "×", "÷"].includes(operador) && resultado.value === "0") {
        alert("El formato usado no es válido!");
        return true;
    }
    return false;
}


function evaluarOperacion() {
    try {
        let operacion = convertirSimbolos(resultado.value);

        if (operacion.includes("/0")) {
            throw new Error("div0");
        }

        let respuesta = eval(operacion);

        resultado.value = respuesta;
        reiniciar = true;

    } catch (error) {
        mostrarError();
    }
}


function mostrarError() {
    resultado.value = "Error";
    reiniciar = true;
}



function agregarPunto() {
    let valor = resultado.value;
    const expresion = resultado.value;
    const partes = expresion.split(/[\+\-×÷]/);
    const ultimoNumero = partes.pop();


    if (ultimoNumero.includes(".")) return;


    if (valor === "0") {
        resultado.value = "0.";
        return;
    }

    if (ultimoNumero === "") {
        resultado.value += "0.";
        return;
    }

    resultado.value += ".";
}
