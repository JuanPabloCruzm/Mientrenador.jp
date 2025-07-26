import { getMealsPlan } from './recommend.js';

const retosPorDeporte = {
  MTB:       ["Enduro","DH","XC"],
  Atletismo:["400m","4×100m Relevos","Maratón"],
  Natacion: ["Resistencia"],
  Yoga:     ["Hatha","Vinyasa","Ashtanga"],
  Crossfit: ["AMRAP 20","Fran","Murph"],
  Futbol:   ["Partido 5v5","Tiros a portería","Resistencia balón"],
  Baloncesto:["Tiros libres","Dribling","3v3"],
  CiclismoRuta:["Contrarreloj","Gran Fondo","Sprint"],
  Boxeo:    ["Sombra","Sparring","Trabajo en saco"],
  Pilates:  ["Matwork","Reformer","Pilates Avanzado"],
  Escalada: ["Boulder","Vía 20m","Circuito resistencia"],
  Triatlon: ["Sprint","Olímpico","Half Ironman"]
};

const gymSessions = {
  MTB:       ["Sentadillas","Peso muerto","Core intenso"],
  Atletismo:["Saltos pliométricos","Carreras en cuestas","Fuerza de piernas"],
  Natacion: ["Jalón espalda","Press militar","Pierna en polea"],
  Yoga:     ["Pilates mat","Estiramientos profundos","Yoga Restaurativa"],
  Crossfit: ["Levantamiento olímpico","Movilidad articular","Tabata"],
  Futbol:   ["Fuerza de piernas","Circuito con balón","Pliometría"],
  Baloncesto:["Plyo box","Trabajo de core","Saltos verticales"],
  CiclismoRuta:["Rodillo en zona","Entreno de fuerza","Core + lumbares"],
  Boxeo:    ["Saco pesado","Combinaciones","Burpees"],
  Pilates:  ["Reformer avanzado","Hundred","Teaser"],
  Escalada: ["Fingerboard","Suspensión","Core + antebrazos"],
  Triatlon: ["Brick bike-run","Circuito full-body","Nado con paletas"]
};

const inspirationMsgs = {
  MTB:       "La montaña no se conquista con prisas, sino con corazón.",
  Atletismo:"Cada zancada te acerca a descubrir tu resistencia infinita.",
  Natacion: "En cada brazada forjas tu voluntad bajo el agua.",
  Yoga:     "Equilibrio es unidad entre cuerpo, mente y respiración.",
  Crossfit: "El desafío es temporal, el orgullo es eterno.",
  Futbol:   "El fútbol es poesía en movimiento colectivo.",
  Baloncesto:"Cada dribling es un paso hacia tus sueños altos.",
  CiclismoRuta:"La ruta más larga comienza con una sola pedalada.",
  Boxeo:    "La fuerza sin control no es victoria, es caos.",
  Pilates:  "El centro del cuerpo es el centro de tu universo.",
  Escalada: "Cada presa es un peldaño hacia tu cima interior.",
  Triatlon: "Tres disciplinas, un solo espíritu indomable."
};

document.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('metricsForm');
  const planC    = document.getElementById('planContainer');
  const bfUL     = document.getElementById('breakfastPlan');
  const lnUL     = document.getElementById('lunchPlan');
  const dnUL     = document.getElementById('dinnerPlan');
  const wkUL     = document.getElementById('workoutPlan');
  const greet    = document.getElementById('greeting');
  const planG    = document.getElementById('planGreeting');
  const selDep   = document.getElementById('disciplina');
  const selEsp   = document.getElementById('especialidad');
  const selRet   = document.getElementById('reto');

  // Actualiza retos técnicos
  selDep.addEventListener('change', () => {
    const d = selDep.value;
    selRet.innerHTML = `<option value="">Especialidad técnica</option>`;
    document.getElementById('natacionInputs').classList.add('hidden');
    if (retosPorDeporte[d]) {
      retosPorDeporte[d].forEach(r => {
        selRet.innerHTML += `<option>${r}</option>`;
      });
      if (d === 'Natacion') {
        document.getElementById('natacionInputs').classList.remove('hidden');
      }
    }
  });

  // Procesa formulario
  form.addEventListener('submit', e => {
    e.preventDefault();
    const user = {
      name:       document.getElementById('name').value.trim(),
      weight:     +document.getElementById('peso').value,
      height:     +document.getElementById('altura').value,
      age:        +document.getElementById('edad').value,
      sex:        document.getElementById('sexo').value,
      sport:      selDep.value,
      specialty:  selEsp.value,
      technical:  selRet.value
    };

    planG.textContent = `¡Hola, ${user.name}! Aquí va tu plan:`;
    greet.textContent = '';

    // Comidas
    const mealsPlan = getMealsPlan();
    bfUL.innerHTML = mealsPlan.breakfasts.map((m, i) => `<li>${i+1}. ${m}</li>`).join('');
    lnUL.innerHTML = mealsPlan.lunches   .map((m, i) => `<li>${i+1}. ${m}</li>`).join('');
    dnUL.innerHTML = mealsPlan.dinners    .map((m, i) => `<li>${i+1}. ${m}</li>`).join('');

    // Entrenamiento
    const basic = retosPorDeporte[user.sport] || [];
    const gym   = gymSessions[user.sport]  || ["Sesión general de fuerza"];
    const full  = [...basic, ...gym].slice(0, 7);
    wkUL.innerHTML = full.map(x => `<li>${x}</li>`).join('');

    // Mensaje inspirador
    document.getElementById('inspiration').textContent =
      inspirationMsgs[user.sport] || "Entrena con pasión cada día.";

    form.classList.add('hidden');
    planC.classList.remove('hidden');
  });

  // Logout
  document.getElementById('logout').onclick = () => {
    localStorage.clear();
    location.href = 'login.html';
  };
});