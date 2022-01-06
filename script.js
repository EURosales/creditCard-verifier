//Declaración de variables
const btnVerificar = document.getElementById("btnVerificar");
const btnReload = document.getElementById("btnRetry");
const numero = document.querySelector("#numTarjeta");
const form = document.getElementById("myForm");
const titulo = document.getElementById("titulo_informativo");
const sm_empty = document.getElementById("smE");
const sm_noMatch = document.getElementById("smN");

btnReload.addEventListener("click", function (e) {
  location.reload();
});

btnVerificar.addEventListener("click", function (e) {
  e.preventDefault();
  //esta funcion va a contener el algoritmo principal
  checkEmpty();
});

function checkEmpty() {
  if (numero.value == "") {
    //error
    console.log("No has ingresado nada en el campo.");
    sm_empty.classList.remove("hide");
  } else {
    checkPattern();
    //se oculta la pista visual de error
    sm_empty.classList.add("hide");
  }
}

function checkPattern() {
  const digitList = numero.value;

  if (digitList.match(/^([0-9]{4}[\s][0-9]{4}[\s][0-9]{4}[\s][0-9]{3,})$/)) {
    sm_noMatch.classList.add("hide");
    resultado(digitList);
    form.reset();
  } else {
    //aviso de error
    sm_noMatch.classList.remove("hide");
  }
}

function resultado(digitList) {
  let arreglo = [];
  arreglo = Array.from(digitList);
  let cola = arreglo.slice(15, 19);
  /*Union de grupo de arreglos en uno solo */
  let luhnArray = [];
  luhnArray = arreglo.filter((el) => el != " ");
  //Se invierte el orden del arreglo
  luhnArray.reverse();
  //Se evaluan todas las posiciones del arreglo
  let sumaPares = [];
  for (let i = 0; i < luhnArray.length; i++) {
    let pIndicador = luhnArray[i];
    //Si la posicion es par, se multiplica el contenido por 2
    if (i % 2 != 0) {
      pIndicador *= 2;
      /*Si el resultado es mayor a 9, se suman ambas cifras
            de la cantidad obtenida*/
      if (pIndicador > 9) {
        pIndicador -= 9;
      }
    }
    sumaPares += pIndicador;
  }

  let totalArray = [];
  totalArray = Array.from(sumaPares);
  //suma de arreglo
  let nFinal = totalArray.reduce((total, digito) => {
    return Number(total) + Number(digito);
  }, 0);

  if (nFinal % 10 == 0) {
    form.classList.add("hide");
    titulo.innerText = "La tarjeta que termina en: " + cola + " es válida.";
    titulo.classList.add("input-success");
    btnReload.classList.toggle("hide");
  } else {
    form.classList.add("hide");
    titulo.innerText =
      "El numero de tarjeta ingresado " +
      luhnArray.reverse() +
      " es inválido, Por favor revise.";
    titulo.classList.add("input-error");
    btnReload.classList.toggle("hide");
  }
}