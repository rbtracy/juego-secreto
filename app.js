let numeroSecreto = 0;
//variable de alcance global
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) { //parámetros
    let elementoHTML = document.querySelector(elemento); //retorna, captura h1 de HTML
    //document, sirve para conectar elemtos de HTML y JavaScript
    //es el puente entre estos 2, trabaja con x metodos
    //h1 se atribuye a el OBJETO titulo
    //query selector retorna al objeto "elemento"

    //titulo.innerHTML = 'Juego del número secreto';
    elementoHTML.innerHTML = texto;
    return;//retorno
}

function verificarIntento() { //encapsulamiento de una accion que queremos hacer
    //let numeroDeUsuario = document.querySelector('input');
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    //getElementById,es una función que retorna el "valor" Id
    //un atributo es value
    //console.log(typeof(numeroDeUsuario)); //retorna nos dice si es number,string,boolean
    //console.log(numeroSecreto);
    //console.log(typeof(numeroSecreto));
    //console.log(numeroDeUsuario);
    //console.log(numeroDeUsuario === numeroSecreto);//se pide compare los 2 numbers y retorna true or false

    //console.log(intentos);
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'} `);
        
        document.getElementById('reiniciar').removeAttribute('disabled');
        //se habilita el botón 'nuevo juego' cuando se adivina el numero
        //utilizamos el metodo removeAttribute()del DOM para quitar 
        // el atributo 'disabled' cuando se acierta el numero
    } else {
        //El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();//se limpia cuando no acierta
    }
    return;
    //alert('Click desde el botón');
}

function limpiarCaja() { //se encarga de limpiar la caja
    document.querySelector('#valorUsuario').value = '';
    //OTRA FORMA:
    //let valorCaja = document.querySelector('#valorUsuario');
    //valorCaja.value = '';
}

function generarNumeroSecreto() { 
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {

        //Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){ 
            //includes:recorre el arreglo,verifica si existe y devuelve true o false
            return generarNumeroSecreto();
            //RECURSIVIDAD la función que genera el numsecreto se llama a sí misma
            //si el numero generado ya esta en la lista,se llama a si misma para
            //generar un nuevo número aleatorio
        } else { 
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    //variable de alcance de bloque;
    //return numeroSecreto;
}

function condicionalesIniciales() {
    //invocando a la función
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //Acciones por hacer en la función:
    //limpiar la caja
    limpiarCaja();

    //Indicar mensaje de intervalo de numeros
    //generar el número aleatorio
    //Inicializar el número intentos
    condicionalesIniciales();

    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionalesIniciales();