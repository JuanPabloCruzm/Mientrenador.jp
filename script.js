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
