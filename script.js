// Ajusta los retos según la disciplina seleccionada
function actualizarRetos() {
  const d = document.getElementById("disciplina").value;
  const reto = document.getElementById("reto");
  const natInputs = document.getElementById("natacionInputs");
  reto.innerHTML = "<option value=''>Desafío</option>";
  natInputs.classList.add("hidden");

  const desafios = {
    MTB:       ["Enduro", "DH", "XC"],
    Atletismo:["400m", "4×100m Relevos", "Maratón"],
    Natacion: ["Resistencia"],
    Yoga:     ["Hatha", "Vinyasa", "Ashtanga"],
    Crossfit: ["AMRAP 20", "Fran", "Murph"],
    Futbol:   ["Partido 5v5", "Tiros a portería", "Resistencia con balón"],
    Baloncesto: ["Tiros libres", "Dribling", "3v3"],
    CiclismoRuta: ["Contrarreloj", "Gran Fondo", "Sprint final"],
    Boxeo:    ["Sombra", "Sparring", "Trabajo en saco"],
    Pilates:  ["Matwork", "Reformer", "Pilates Avanzado"],
    Escalada: ["Boulder", "Vía de 20m", "Circuito de resistencia"],
    Triatlon: ["Sprint", "Olímpico", "Half Ironman"]
  };

  if (desafios[d]) {
    desafios[d].forEach(r => {
      reto.innerHTML += `<option value="${r}">${r}</option>`;
    });
    if (d === "Natacion") natInputs.classList.remove("hidden");
  }
}

// Genera el plan completo
function procesar() {
  const peso   = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const edad   = parseInt  (document.getElementById("edad").value);
  const sexo   = document.getElementById("sexo").value;
  const d      = document.getElementById("disciplina").value;
  const r      = document.getElementById("reto").value;
  const dist   = parseFloat(document.getElementById("distanciaNat").value);
  const tiempo = document.getElementById("tiempoNat").value;
  const disgustosStr = document.getElementById("disgustos").value;
  const gustosStr    = document.getElementById("gustos").value;

  if (!peso || !altura || !edad || !sexo || !d || !r) {
    return showResult("⚠️ Completa todos los campos para recibir tu plan.");
  }

  // Cálculo de IMC y rango ideal
  const imc = +(peso / (altura * altura)).toFixed(2);
  const min = +(18.5 * altura * altura).toFixed(1);
  const max = +(24.9 * altura * altura).toFixed(1);

  // Mensaje base de nutrición
  let foodMsg = "";
  if (imc < 18.5)      foodMsg = "➡️ Bajo peso. Enfócate en ganancia de masa y fuerza.";
  else if (imc <= 24.9)foodMsg = "➡️ Peso ideal. Mantén estos hábitos.";
  else                 foodMsg = "➡️ Sobrepeso. Trabajaremos con déficit moderado y cardio.";

  // Plan para ajustar peso
  let pesoPlan = "";
  if (imc < 18.5) {
    pesoPlan =
      `Para llegar a ${min} kg:\n` +
      "- +500 kcal/día con snacks de alta densidad.\n" +
      "- Fuerza 3×semana.\n";
  } else if (imc > 24.9) {
    pesoPlan =
      `Para llegar a ${max} kg:\n` +
      "- -300/500 kcal/día.\n" +
      "- Cardio 4×semana (30–45 min).\n";
  } else {
    pesoPlan = "¡Excelente! Sigue con tu rutina y alimentación equilibrada.";
  }

  // Plan deportivo según deporte y desafío
  let deportivo = "";
  switch (d) {
    case "MTB":
      if (r === "Enduro")
        deportivo = "🚵 2h trail técnico + subidas intensas.\n🏋️ Sentadillas 4×8, core 4×20.";
      if (r === "DH")
        deportivo = "🚵 8 bajadas técnicas.\n🏋️ Pliometría 3×12, hombros 3×15.";
      if (r === "XC")
        deportivo = "🚵 Ruta 1.5h a cadencia constante.\n🏋️ Zancadas 4×10, peso muerto 3×8.";
      break;

    case "Atletismo":
      if (r === "400m")
        deportivo = "🏃 Calentamiento 15min + 6×200m a VO2.\n🏋️ Explosivos 3×8.";
      if (r === "4×100m Relevos")
        deportivo = "🏃 4×100m con testigo.\n🤸 Agilidad escalera 4×3.";
      if (r === "Maratón")
        deportivo = "🏃 60–90min al 70% FCM.\n🏋️ Piernas 3×12, core 3×20.";
      break;

    case "Natacion":
      const [mm, ss] = tiempo.split(":").map(Number);
      const totMin = mm + ss/60;
      const pace = ((totMin / dist) * 100).toFixed(2);
      deportivo =
        `🏊 10×100m (20s rec).\n📊 Ritmo: ${pace} min/100m.\n` +
        "🚀 Estilos: crol (eficiente), braza (recup), mariposa (aeróbico).\n" +
        "🏋️ Jalón espalda 3×10, hombros 3×12.";
      break;

    case "Yoga":
      deportivo =
        "🧘 60min Vinyasa fluido.\n🤸‍♂️ Transiciones suaves y respiración Ujjayi.\n" +
        "✨ 10min de meditación final.";
      break;

    case "Crossfit":
      deportivo =
        "🔥 WOD ‘Fran’: 21-15-9 Thruster + Pull-ups.\n💪 Movilidad 15min.";
      break;

    case "Futbol":
      deportivo =
        "⚽️ Partido 5v5 (45min).\n🏃 Sprints 10×30m con balón.\n🎯 Circuito de pases.";
      break;

    case "Baloncesto":
      deportivo =
        "🏀 5×20 tiros libres.\n⛹️ Dribling en zigzag 4×2min.\n🏃 Partido 3v3 20min.";
      break;

    case "CiclismoRuta":
      deportivo =
        "🚴 Contrarreloj 20km a máxima cadencia.\n🚵 Gran Fondo 80km al 75% FCM.\n🏁 Series de sprint: 6×200m.";
      break;

    case "Boxeo":
      deportivo =
        "🥊 5×3min sombra + 3×3min saco.\n🤜 Combos:  jab-cross 4×20.\n🏃🏼 Saltar la cuerda 5×2min.";
      break;

    case "Pilates":
      deportivo =
        "🤸 Matwork 45min: hundred, roll-up, single leg stretch.\n✴️ Reformer básico 30min.";
      break;

    case "Escalada":
      deportivo =
        "🧗 Boulder 6 problemas fac. media.\n🧗‍♂️ Vía 20m con presas pequeñas.\n🏋️ Core+antebrazos 3×15.";
      break;

    case "Triatlon":
      deportivo =
        "🚴 20km ruta + 🏊 800m + 🏃 5km transición rápida.\n🔄 Entreno brick 3×semana.";
      break;
  }

  // Procesa gustos y disgustos para comidas
  const parseList = s =>
    s.split(",").map(x=>x.trim().toLowerCase()).filter(x=>x);

  const dislikes = parseList(disgustosStr);
  const likes    = parseList(gustosStr);

  const meals = [
    {name:"Avena con plátano y nueces",  ing:["avena","plátano","nueces"]},
    {name:"Yogur con frutos rojos",       ing:["yogur","frutos rojos"]},
    {name:"Tortilla de claras y espinacas", ing:["huevo","espinaca"]},
    {name:"Ensalada de garbanzos y atún", ing:["garbanzos","atún"]},
    {name:"Pechuga de pollo con brócoli", ing:["pollo","brócoli"]},
    {name:"Salmón a la plancha",          ing:["salmón"]},
    {name:"Batido de proteína y berries", ing:["proteína","frutos del bosque"]},
    {name:"Wrap de pavo y vegetales",     ing:["pavo","vegetales"]},
    {name:"Arroz integral con lentejas",  ing:["arroz","lentejas"]},
    {name:"Smoothie verde",               ing:["espinaca","manzana","jengibre"]},
    {name:"Sopa de verduras con pollo",   ing:["verduras","pollo"]},
    {name:"Pasta integral con tomate",    ing:["pasta","tomate"]},
    {name:"Ensalada de quinoa y aguacate",ing:["quinoa","aguacate"]},
    {name:"Tostada integral con aguacate",ing:["pan integral","aguacate"]},
    {name:"Filete de ternera con ensalada",ing:["ternera","ensalada"]},
    {name:"Brochetas de pollo y piña",    ing:["pollo","piña"]},
    {name:"Huevos revueltos con champiñones",ing:["huevo","champiñones"]},
    {name:"Pan integral con queso y tomate",ing:["pan integral","queso","tomate"]},
    {name:"Smoothie de plátano y avena",  ing:["plátano","avena"]},
    {name:"Ensalada de pasta integral",   ing:["pasta","verduras"]}
  ];

  const filtered = meals.filter(m => {
    const ingr = m.ing.map(i=>i.toLowerCase());
    if (dislikes.some(d=>ingr.includes(d))) return false;
    if (likes.length && !likes.some(l=>ingr.includes(l))) return false;
    return true;
  });

  // Asegura al menos 15 platos
  const finalMeals = filtered.slice(0,15);
  if (finalMeals.length < 15) {
    const extra = meals.filter(m=>!finalMeals.includes(m)).slice(0,15-finalMeals.length);
    finalMeals.push(...extra);
  }

  const mealList = finalMeals
    .map((m,i)=>`${i+1}. ${m.name}`)
    .join("\n");

  // Monta mensaje
  const mensaje =
    `¡Hola! Aquí tu plan completo:\n\n` +
    `📊 IMC: ${imc} (ideal ${min}–${max} kg)\n` +
    `👤 Edad: ${edad} • Sexo: ${sexo}\n\n` +
    `🍽️ Nutrición: ${foodMsg}\n${pesoPlan}\n` +
    `🥇 Deporte: ${d} → ${r}\n${deportivo}\n\n` +
    `🍴 15 comidas sugeridas:\n${mealList}\n\n` +
    `¡A por todas!`;

  showResult(mensaje);
}

// Muestra el resultado justificado
function showResult(txt) {
  document.getElementById("resultado").textContent = txt;
}
