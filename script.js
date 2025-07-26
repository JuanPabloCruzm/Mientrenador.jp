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

    if (imc < 18.5) {
      categoria = "Bajo peso";
      recomendaciones = "💡 Aumenta tu ingesta calórica + entrenamiento de fuerza suave.";
    } else if (imc < 24.9) {
      categoria = "Peso normal";
      recomendaciones = "✅ Mantén hábitos activos y dieta balanceada.";
    } else if (imc < 29.9) {
      categoria = "Sobrepeso";
      recomendaciones = "🔥 Reduce ultraprocesados + ejercicio cardiovascular moderado.";
    } else {
      categoria = "Obesidad";
      recomendaciones = "📋 Revisión profesional + caminatas diarias + hábitos graduales.";
    }

    switch (objetivo) {
      case "ganar_masa":
        fondo = "#3e3e3e"; recomendaciones += "\n🧬 Rutina de fuerza + proteínas magras.";
        break;
      case "perder_grasa":
        fondo = "#444"; recomendaciones += "\n🔥 Cardio + control glucémico + descanso.";
        break;
      case "mejorar_resistencia":
        fondo = "#555"; recomendaciones += "\n🚴 Ejercicio continuo + hidratación + ritmo.";
        break;
      case "aumentar_peso":
        fondo = "#666"; recomendaciones += "\n🍠 Alimentos densos + entreno + recuperación.";
        break;
    }

    document.getElementById("resultado").innerText =
      `📊 IMC: ${imc} — ${categoria}\n🎯 Recomendación: ${recomendaciones}`;
    document.body.style.backgroundColor = fondo;
  } else {
    document.getElementById("resultado").innerText =
      "⚠️ Completa todos los campos para tu diagnóstico.";
  }
}
