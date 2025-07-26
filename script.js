// ────── Configura retos según disciplina ──────
function actualizarRetos() {
  const d = document.getElementById("disciplina").value;
  const reto = document.getElementById("reto");
  const natInputs = document.getElementById("natacionInputs");

  reto.innerHTML = "<option value=''>Desafío</option>";
  natInputs.classList.add("hidden");

  if (d === "MTB") {
    ["Enduro","DH","XC"].forEach(r => {
      reto.innerHTML += `<option value="${r}">${r}</option>`;
    });
  }
  else if (d === "Atletismo") {
    ["40m","Posta","Maratón"].forEach(r => {
      reto.innerHTML += `<option value="${r}">${r}</option>`;
    });
  }
  else if (d === "Natacion") {
    reto.innerHTML += `<option value="Resistencia">Resistencia</option>`;
    natInputs.classList.remove("hidden");
  }
}

// ────── Procesa formulario y genera plan ──────
function procesar() {
  // lee inputs
  const peso  = parseFloat(document.getElementById("peso").value);
  const altura= parseFloat(document.getElementById("altura").value);
  const edad  = parseInt  (document.getElementById("edad").value);
  const sexo  = document.getElementById("sexo").value;
  const d     = document.getElementById("disciplina").value;
  const r     = document.getElementById("reto").value;
  const dist  = parseFloat(document.getElementById("distanciaNat").value);
  const tiempo= document.getElementById("tiempoNat").value;

  // validación
  if (!peso || !altura || !edad || !sexo || !d || !r) {
    return showResult(
      "⚠️ Completa todos los campos para generar tu plan."
    );
  }

  // 1) IMC y rango ideal
  const imc = (peso/(altura*altura)).toFixed(2);
  const min = (18.5*altura*altura).toFixed(1);
  const max = (24.9*altura*altura).toFixed(1);

  // 2) Comida recomendada
  let food = "";
  if (imc < 18.5)      food = "Dieta hipercalórica: frutos secos, aguacate, legumbres.";
  else if (imc < 24.9) food = "Dieta equilibrada: proteínas magras, cereales integrales.";
  else if (imc < 29.9) food = "Reducir ultraprocesados y azúcares; más vegetales.";
  else                 food = "Consulta profesional; enfócate en caminatas y reeducación.";

  // 3) Recomendaciones deportivas
  let deportivo = "";
  if (d === "MTB") {
    if (r === "Enduro")
      deportivo = 
        "🚵 Enduro: 2h en sendero técnico con intervalos de subida.\n" +
        "🏋️‍♂️ Gim: sentadillas 4x8, prensa 3x10, core 3x15.";
    if (r === "DH")
      deportivo =
        "🚵 DH: bajadas técnicas + sprints breves.\n" +
        "🏋️‍♂️ Gim: pliometría 3x12 (saltos en caja), trabajo de hombros.";
    if (r === "XC")
      deportivo =
        "🚵 XC: ruta de 1.5h a cadencia constante.\n" +
        "🏋️‍♂️ Gim: zancadas 4x10, peso muerto 3x8, planchas 3x1min.";
  }
  else if (d === "Atletismo") {
    if (r === "40m")
      deportivo =
        "🏃 6x30m sprints con salida explosiva.\n" +
        "🏋️‍♂️ Gim: pliometría 3x10, sentadillas explosivas.";
    if (r === "Posta")
      deportivo =
        "🏃 4x200m relevos con cambio de testigo.\n" +
        "🏋️‍♂️ Gim: coordinación mano-pie, trabajo de agilidad.";
    if (r === "Maratón")
      deportivo =
        "🏃 Carrera continua 60–90min al 70% FCM.\n" +
        "🏋️‍♂️ Gim: fuerza de piernas 3x12, core 3x20.";
  }
  else if (d === "Natacion") {
    // calcula ritmo por 100m
    let [mm, ss] = tiempo.split(":").map(Number);
    let totalMin = mm + ss/60;
    let pace = ((totalMin/dist)*100).toFixed(2);
    deportivo =
      `🏊 Resistencia: serie de 10x100m (descanso 20s).\n` +
      `📊 Ritmo actual: ${pace} min/100m.\n` +
      `🚀 Estilos: crol para eficiencia, braza para recuperación, mariposa aeróbica.\n` +
      "🏋️‍♂️ Gim: jalón espalda 3x10, work de hombros, core.";
  }

  // 4) Resultado final
  const mensaje =
    `📊 Tu IMC: ${imc}  (ideal: ${min}–${max} kg)\n` +
    `👤 Edad: ${edad} • Sexo: ${sexo}\n\n` +
    `🍽️ Nutrición: ${food}\n\n` +
    `🏅 Disciplina: ${d} → ${r}\n${deportivo}`;

  showResult(mensaje);
}

// muestra texto justificado
function showResult(txt) {
  const out = document.getElementById("resultado");
  out.textContent = txt;
}
