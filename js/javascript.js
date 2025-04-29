var grupoTarjetas = ["😎", "🍦", "🐸", "👽", "👾", "🤖", "👹"];

var totalTarjetas = grupoTarjetas.concat(grupoTarjetas);

//texto de prueba
//holaaaa


function barajaTarjetas() {
  var resultado;
  resultado = totalTarjetas.sort(function() {
    return 0.5 - Math.random();
  });
  return resultado;
}
//funcion para mostrar temporalemente las cartas y luego voltearlas
function mostrarTemporalmente() {
  const tarjetas = document.querySelectorAll(".tarjeta");
  tarjetas.forEach((tarjeta) => tarjeta.classList.add("descubierta"));

  setTimeout(() => {
    tarjetas.forEach((tarjeta) => tarjeta.classList.remove("descubierta"));
  }, 3000);
}

function reparteTarjetas() {
  var mesa = document.querySelector("#mesa");
  var tarjetasBarajadas = barajaTarjetas();
  mesa.innerHTML = "";

  tarjetasBarajadas.forEach(function(elemento) {
    var tarjeta = document.createElement("div");

    tarjeta.innerHTML =
      "<div class='tarjeta'>" +
      "<div class='tarjeta__contenido'>" +
      elemento +
      "</div>" +
      "</div>";

    mesa.appendChild(tarjeta);
  });
  mostrarTemporalmente(); 
}

function descubrir() {
  this.classList.add("descubierta");
}

reparteTarjetas();

//declaramos variables 
let turnos = 0;
let primera = null;
let segunda = null;
let esperando = false;

//Funcion para atualizar los turnos o contador cada que se reinicia
function actualizarContador() {
  document.getElementById("turnos").textContent = turnos;
}

//Funcionn de descubrir la cartas 
//Dodne si una es correcta pero otra no, boltear ambas
//Donde si las dos con correctas que queden
function descubrir() {
  if (esperando || this.classList.contains("descubierta")) return;

  this.classList.add("descubierta");

  if (!primera) {
    primera = this;
  } else {
    segunda = this;
    esperando = true;
    turnos++;              
    actualizarContador(); 

    const emoji1 = primera.querySelector(".tarjeta__contenido").textContent;
    const emoji2 = segunda.querySelector(".tarjeta__contenido").textContent;

    if (emoji1 === emoji2) {
      // Son iguales: dejarlas descubiertas
      primera = null;
      segunda = null;
      esperando = false;

      // Verificar si ganaste
      if (document.querySelectorAll(".descubierta").length === totalTarjetas.length) {
        setTimeout(() => {
         mostrarPantallaFinal();
        }, 500);
      }
    } else {
      // Son distintas, ocultarlas otra vez
      setTimeout(() => {
        primera.classList.remove("descubierta");
        segunda.classList.remove("descubierta");
        primera = null;
        segunda = null;
        esperando = false;
      }, 500);
    }
  }
  function actualizarContador() {
  document.getElementById("turnos").textContent = turnos;
}

// Funcion que muestra la pantalla de victoria con el festejo

function mostrarPantallaFinal() {
  
  // Oculta la mesa de juego
  
  document.getElementById("mesa").style.display = "none";
  document.getElementById("titulo").style.display = "none";  
  document.getElementById("contador").style.display = "none";
  // Mostrar la pantalla de victoria
  
  document.getElementById("pantallaFinal").style.display = "block";
  
  // Agregar animacion de festejo
  document.getElementById("festejo").style.animation = "festejo 1s infinite";
  generarEmojisQueCaen();
}

//Funcio donde se generan los emojis aleatoriamente y luego se muestran
function generarEmojisQueCaen() {
  const emojis = ["🎉", "🎊", "🥳", "🎈", "🎁","😎", "🍦", "🐸", "👽", "👾", "🤖", "👹"];
  const contenedor = document.getElementById("emojiFallingContainer");
  
  setInterval(() => {
    // Elegir un emoji aleatorio
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Crear un div para el emoji
    const emojiDiv = document.createElement("div");
    emojiDiv.classList.add("emoji-falling");
    emojiDiv.textContent = emoji;
    
    // Posicionar aleatoriamente en la parte superior
    emojiDiv.style.left = `${Math.random() * 100}vw`;
    
    contenedor.appendChild(emojiDiv);
  
    setTimeout(() => {
      emojiDiv.remove();
    }, 3000);
  }, 300);
}
} 
document.querySelectorAll(".tarjeta").forEach(function(elemento) {
  elemento.addEventListener("click", descubrir);
});