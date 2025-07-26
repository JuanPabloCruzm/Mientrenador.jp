script.js
function procesar() {
  const peso = parseFloat(document.getElementById("peso").value);
  const metaPeso = parseFloat(document.getElementById("metaPeso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const edad = parseInt(document.getElementById("edad").value);
  const sexo = document.getElementById("sexo").value;
  const deporte = document.getElementById("deporte").value;
  const reto = document.getElementById("reto").value;

  if (peso && metaPeso && altura && edad && sexo && deporte && reto) {
    const imc = (peso / (altura * altura)).toFixed(2);
    let tendencia = (metaPeso > peso) ? "🔼 Meta: Subir de peso" : "🔽 Meta: Bajar de peso";

    // Guardar historial en localStorage
    const progreso = {
      fecha: new Date().toLocaleDateString(),
      peso, metaPeso, imc
    };
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(progreso);
    localStorage.setItem("historial", JSON.stringify(historial));

    // Recomendaciones nutricionales
    let comida = (metaPeso > peso)
      ? "🥜 Agrega snacks densos (frutos secos, arroz, legumbres)"
      : "🥦 Prioriza vegetales, proteína magra y hidratos lentos";

    // Rutinas por deporte + reto
    let sesiones = "";
    if (deporte === "MTB" && reto === "Enduro") {
      sesiones = "🚵 Trail técnico + 🏋️ Fuerza tren inferior";
    } else if (deporte === "Atletismo" && reto === "40m") {
      sesiones = "🏃 Técnica de arranque + potencia explosiva";
    } else if (deporte === "Natación" && reto === "400m") {
      sesiones = "🏊 Sesión larga + ritmo constante + respiración";
    } else {
      sesiones = "🤸 Rutina mixta según enfoque personalizado";
    }

    // Recomendación gym
    let gimnasio = "🏋️‍♂️ Complementa con 2 sesiones de fuerza + 1 sesión de movilidad";

    document.getElementById("resultado").innerText =
      `📍 IMC: ${imc}\n${tendencia}\n🍽️ Nutrición: ${comida}\n📆 Deporte: ${deporte} — ${reto}\n🎯 Sesiones: ${sesiones}\n🏛️ Gimnasio: ${gimnasio}`;
  } else {
    document.getElementById("resultado").innerText =
      "⚠️ Completa todos los campos para generar tu plan integral.";
  }
}
