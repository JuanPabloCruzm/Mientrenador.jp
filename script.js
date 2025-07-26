script.js
function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const edad = parseInt(document.getElementById("edad").value);
  const sexo = document.getElementById("sexo").value;
  const objetivo = document.getElementById("objetivo").value;

  if (peso && altura && edad && sexo && objetivo) {
    const imc = (peso / (altura * altura)).toFixed(2);
    let categoria = "";
    let recomendaciones = "";
    let fondo = "";

    // Clasificación IMC
    if (imc < 18.5) {
      categoria = "Bajo peso";
      recomendaciones = "🍗 Dieta hipercalórica + 🏋️‍♀️ fuerza moderada";
    } else if (imc < 24.9) {
      categoria = "Peso normal";
      recomendaciones = "🥗 Mantener con dieta equilibrada + 🚶‍♂️ actividad física regular";
    } else if (imc < 29.9) {
      categoria = "Sobrepeso";
      recomendaciones = "⚖️ Reducir azúcar/grasas + 🧘‍♀️ actividad aeróbica suave";
    } else {
      categoria = "Obesidad";
      recomendaciones = "📋 Consulta médica + 🧍‍♂️ caminatas diarias";
    }

    // Recomendaciones según objetivo
    switch (objetivo) {
      case "ganar_masa":
        recomendaciones += "\n\n🧬 Objetivo: Ganar masa\n🥚 Proteínas magras, 🧱 fuerza 3-5x/semana, 💤 sueño reparador.";
        fondo = "url('URL_MUSCULAR')";
        break;
      case "perder_grasa":
        recomendaciones += "\n\n🔥 Objetivo: Perder grasa\n🥦 Vegetales + 🚴‍♂️ cardio + 🧘‍♂️ reducción de cortisol.";
        fondo = "url('URL_QUEMA')";
        break;
      case "mejorar_resistencia":
        recomendaciones += "\n\n💨 Objetivo: Resistencia\n🚴 Ciclismo/natación + 🍌 carbohidratos complejos + 💧 hidratación.";
        fondo = "url('URL_MTB')";
        break;
      case "aumentar_peso":
        recomendaciones += "\n\n🍠 Objetivo: Aumentar peso\n🥜 Snacks densos + 🍚 arroz/quinoa + 🏋️ descanso estratégico.";
        fondo = "url('URL_AUMENTO')";
        break;
      default:
        recomendaciones += "\n🎯 Selecciona un objetivo válido para recomendaciones personalizadas.";
    }

    // Mostrar resultado
    document.getElementById("resultado").innerText =
      `📊 Tu IMC es ${imc} — ${categoria}\n🧍 Edad: ${edad} | ⚧ Sexo: ${sexo}\n\n🔍 Recomendaciones:\n${recomendaciones}`;

    // Estilo dinámico según objetivo
    document.body.style.backgroundImage = fondo;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  } else {
    document.getElementById("resultado").innerText =
      "⚠️ Completa todos los datos para obtener tu diagnóstico narrativo.";
  }
}
