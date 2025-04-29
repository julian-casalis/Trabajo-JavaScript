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
}

function descubrir() {
  this.classList.add("descubierta");
}

reparteTarjetas();


let primera = null;
let segunda = null;
let esperando = false;

function descubrir() {
  if (esperando || this.classList.contains("descubierta")) return;

  this.classList.add("descubierta");

  if (!primera) {
    primera = this;
  } else {
    segunda = this;
    esperando = true;

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
          alert("¡Ganaste! 🎉");
          reparteTarjetas();
        }, 500);
      }
    } else {
      // Son distintas: ocultarlas otra vez
      setTimeout(() => {
        primera.classList.remove("descubierta");
        segunda.classList.remove("descubierta");
        primera = null;
        segunda = null;
        esperando = false;
      }, 500);
    }
  }
} 
document.querySelectorAll(".tarjeta").forEach(function(elemento) {
  elemento.addEventListener("click", descubrir);
});