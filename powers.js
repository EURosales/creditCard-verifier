//Declaración de variables
//Variable para botón de verificación
const btnVerificar = document.getElementById("btnVerificar");
//Variable para input que contiene el numero
const numero = document.querySelector("#numTarjeta");
const form = document.getElementById("myForm");
//avisos sobre problemas de validaciones
const sm_empty = document.getElementById('smE');
const sm_noMatch = document.getElementById('smN');


btnVerificar.addEventListener("click", function (e) {
  //evita que entre el valor vacio por defecto a la primera función.
  e.preventDefault();
  /*Esta función contiene la función que valida si el input esta vacio
   o no, dependiendo de eso se van ejecutando mas funciones hasta obtener el
   resultado.*/
  getNumber();
});

//esta funcion va a contener el algoritmo principal
function getNumber() {
  checkEmpty();
}

/*Función que valida que el input no este vacio, de lo contrario
se muestra un error hasta que sea rellenado.*/
/*Si el campo no esta vacio, procede a ejecutar la función que
 valida el contenido del input.*/
function checkEmpty() {
  /*Si el input resulta vacio, se muestra la pista de error para
  el usuario*/
  if (numero.value == "") {
    //aviso de error en consola
    console.log("No has ingresado nada en el campo");
    //Pista visual de error para el usuario
    sm_empty.classList.remove('hide');
  } else {
    /*Si se comprueba que el input NO esta vacio,
    se procede a revisar su contenido*/
    checkPattern();
    //se oculta la pista visual de error
    sm_empty.classList.add('hide');
  }
}

/*Función para validar el correcto orden y estructura
de ingreso de los dígitos de la tarjeta de credito*/
function checkPattern() {
  /*se le asigna el valor numerico del input a la variable "digitList",
  para luego comparar el string completo con el patron*/
  const digitList = numero.value;
  //Ejemplo de patrón: "9999[espacio]9999[espacio]9999[espacio]9999"
  /*Si la cadena de texto confuerda con el patrón estabecido debe ocultar el
  aviso de error si se esta mostrando por algún error previo.*/
  /*y tambien debe ejecutar la función que procesa el texto para llevar a cabo el algoritmo*/
  if (digitList.match(/^([0-9]{4}[\s][0-9]{4}[\s][0-9]{4}[\s][0-9]{4})$/)) {
    //console.log(digitList);
    sm_noMatch.classList.add('hide');
    //aqui se va a ejecutar la función que lleva a cabo todo el algoritmo
    //ese algoritmo debe contener el "Mostrar (de prueba por el momento)"
    /*se debe enviar el parametro ya revisado por el match() del patrón
    y asi comenzar a usarlo. en este caso "digitList" (la lista de dígitos)*/
    resultado(digitList);
    /*Se resetea el formulario que contiene los datos de ingreso del digito de
    la tarjeta para poder seguir intentando si han ocurrido errores de ingreso*/
    form.reset();
  } else {
    //aviso de error en consola
    console.log("No has ingresado todos los numeros o NO has dejando espacios en blanco.");
    /*aviso de error en forma de pista para el usuario: se muestra porque la cadena string
     del input no concuerda con el patrón establecido.*/
    sm_noMatch.classList.remove('hide');
  }
}

//Metodo que contiene el algoritmo de Luhn para validación de tarjeta
/*se recibe el parametro que contiene el string de numeros ya listos
  para comenzar a trabajar con ellos*/
function resultado(digitList) {
  /*Obtener el numero de 16 digitos de la tarjeta (19 espacios con el espacio cada 4 digitos)
  desde el input e ingresarlo a un arreglo.*/
  //console.log(digitList);
  //aqui se obtiene la longitud del string que contiene los digitos
  let strlength = digitList.length;
  /*Convertimos la cadena string en un arreglo con la propiedad "Array.from()"*/
  let arreglo = Array.from(digitList);
  //Se invierte el orden del arreglo
  arreglo.reverse();
  //se eliminan los espacios vacios del arreglo
  arreglo.flat();
  
  //console.log(arreglo);
  for (let i = 0; i < strlength; i++) {
    console.log(arreglo[i]);
  }

  //Eliminar los espacios vacios del arreglo.

  //Invertir posiciones de los digitos del arreglo.

}
