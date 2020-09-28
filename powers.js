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
    //console.log(08570420000389851 % 10);
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
        console.log("No has ingresado nada en el campo.");
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
    
    if (digitList.match(/^([0-9]{4}[\s][0-9]{4}[\s][0-9]{4}[\s][0-9]{3,})$/)) {
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
        
    //aqui se obtiene la longitud del string que contiene los digitos
    let strlength = digitList.length;
        
    /*Convertimos la cadena string en un arreglo con la propiedad "Array.from()"*/
    let arreglo = [];
    arreglo = Array.from(digitList);
    
    //se eliminan los espacios vacios del arreglo
    /*Para eso se divide el arreglo en cuatro grupos sin tomar en cuenta los
    espacios para luego unir los cuatro grupos y formar un solo arreglo*/
    let groupArray1 = arreglo.slice(0, 4);
    let groupArray2 = arreglo.slice(5, 9);
    let groupArray3 = arreglo.slice(10, 14);
    let groupArray4 = arreglo.slice(15, 19);

    /*Union de grupo de arreglos en uno solo */
    let luhnArray = []
    //se concatenan los grupos de arreglos en uno solo
    luhnArray = groupArray1.concat(groupArray2, groupArray3, groupArray4);

    //Se invierte el orden del arreglo
    luhnArray.reverse();
    
    //Se evaluan todas las posiciones del arreglo
    let sumaPares = 0;
	for (let i = 0; i < luhnArray.length; i++) {
        let pIndicador = luhnArray[i];
        
        //Si la posicion es par, se multiplica el contenido por 2
		if ((i % 2) != 0) {
            pIndicador *= 2;

            /*Si el resultado es mayor a 9, se suman ambas cifras
            de la cantidad obtenida*/
			if (pIndicador > 9) {
				pIndicador -= 9;
			}
		}
        sumaPares += pIndicador;
    }

    //return ((sumaPares % 10) == 0);

    let totalArray = [];
    totalArray = Array.from(sumaPares);

    /*el resultado (la suma del los numero del arreglo), se 
    obtiene mediante una funcion que se manda a llamar.*/
    let nFinal = sum(totalArray);

    //console.log(nFinal);
    /*se verifica si el residuo de la división entre "10"
    del numero ubtenido termina en "0"; si es asi, es un numero de tarjeta de credito valido (output:"true"),
    de lo contrario es invalido(output:"false")*/
    console.log((nFinal % 10) == 0);
    
}

//Funcion que suma todos los elementos de un array numérico
/*El parametro es el arreglo, ya sea solo su nombre o las posiciones
especificas del index.*/
function sum(input){
             
 if (toString.call(input) !== "[object Array]")
    return false;
      
    let total =  0;
    for(let i=0;i<input.length;i++)
        {                  
        if(isNaN(input[i])){
            continue;
        }
        total += Number(input[i]);
    }
    return total;
}
