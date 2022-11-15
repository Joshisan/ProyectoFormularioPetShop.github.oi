export function valida (input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMissmatch",
    "paternMismatch",
    "customError",
];
    

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío.",
    },
    email: {
        valueMissing: "El campo email no puede estar vacío.",
        typeMismatch: "El correo no es válido."
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío.",
        paternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra mayúscula, una letra minúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "El campo no puede estar vacío.",
        customError: "Debes tener al menos 18 años de edad.",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es (+50670547821) 12 números.",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres.",
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 4 a 30 caracteres.",
    },
};

const validadores = {
    nacimiento: input => validarNacimiento (input),
};

function mostrarMensajeDeError (tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError [tipoDeInput][error];
        }
    });
    return mensaje
}

function validarNacimiento (input){
    const fechaCliente = new Date(input.value);

    let mensaje = "";
    
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity (mensaje);
}

function mayorDeEdad (fecha) {
    const fechaActual = new Date();

    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );

    return diferenciaFechas <= fechaActual;
}
