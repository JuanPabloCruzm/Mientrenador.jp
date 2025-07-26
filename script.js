script.js
function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  if (peso && altura) {
    const imc = (peso / (altura * altura)).toFixed(2);
    let categoria = "";

    if (imc < 18.5) categoria = "Bajo peso";
    else if (imc < 24.9) categoria = "Normal";
    else if (imc < 29.9) categoria = "Sobrepeso";
    else categoria = "Obesidad";

    document.getElementById("resultado").innerText = `Tu IMC es ${imc} (${categoria})`;
  } else {
    document.getElementById("resultado").innerText = "Por favor, completa los datos.";
  }
}
document.getElementById("resultado").innerText = `Tu IMC es ${imc}, lo que se interpreta como: ${categoria}.`;
function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const edad = parseInt(document.getElementById("edad").value);
  const sexo = document.getElementById("sexo").value;

  if (peso && altura && edad && sexo) {
    const imc = (peso / (altura * altura)).toFixed(2);
    let categoria = "";
    let recomendaciones = "";

    if (imc < 18.5) {
      categoria = "Bajo peso";
      recomendaciones = "Recomendado: dieta hipercalórica + entrenamiento de fuerza moderado.";
    } else if (imc < 24.9) {
      categoria = "Peso normal";
      recomendaciones = "Mantener con dieta balanceada y actividad física regular.";
    } else if (imc < 29.9) {
      categoria = "Sobrepeso";
      recomendaciones = "Reducir azúcar y grasas; ejercicios aeróbicos sugeridos.";
    } else {
      categoria = "Obesidad";
      recomendaciones = "Consulta profesional + caminatas diarias y reeducación alimentaria.";
    }

    const mensaje =
      `Tu IMC es ${imc} (${categoria})\n\nEdad: ${edad}, Sexo: ${sexo}\n${recomendaciones}`;

    document.getElementById("resultado").innerText = mensaje;
  } else {
    document.getElementById("resultado").innerText = "Completa todos los datos correctamente.";
  }
}
let objetivo = document.getElementById("objetivo").value;

let recomendaciones = "";

switch (objetivo) {
  case "ganar_masa":
    recomendaciones = `
      🥩 Comer más proteínas: pollo, huevos, legumbres, quinoa.
      🏋️‍♂️ Entrenamiento de fuerza 3–5 veces por semana.
      🧃 Evitar azúcar refinada y alcohol.
      💤 Dormir mínimo 7 horas.
    `;
    break;
  case "perder_grasa":
    recomendaciones = `
      🥗 Comer más vegetales, frutas, legumbres.
      🚶‍♂️ Actividad aeróbica diaria: caminar, nadar, bailar.
      ❌ Evitar frituras, bebidas azucaradas, harinas blancas.
      🧘‍♀️ Añadir yoga o meditación para regular cortisol.
    `;
    break;
  case "mejorar_resistencia":
    recomendaciones = `
      🚴‍♂️ Deportes recomendados: ciclismo, natación, fútbol, senderismo.
      🍌 Comer carbohidratos complejos: avena, arroz integral, plátano.
      💧 Hidratación constante.
      🧪 Entrenamiento HIIT 2 veces por semana.
    `;
    break;
  case "aumentar_peso":
    recomendaciones = `
      🍠 Comer más calorías de calidad: batata, arroz, frutos secos.
      🧀 Añadir snacks densos: yogur griego, queso cottage.
      🏋️‍♀️ Entrenamiento de fuerza + descanso.
      🧃 Evitar comida chatarra que solo añade grasa visceral.
    `;
    break;
}
