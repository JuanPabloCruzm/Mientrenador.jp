import { getMealsPlan } from './recommend.js';

// Especialidades por deporte
const specialties = {
  MTB:       ["Enduro","DH","Downhill","XC"],
  Atletismo:["200m","400m","800m","4×100m","Maratón"],
  Yoga:     ["Hatha","Vinyasa","Ashtanga","Yin"],
  Crossfit: ["AMRAP","Fran","Murph","Helen"],
  Futbol:   ["Partido 5v5","Tiros a portería","Resistencia","Táctico"],
  Baloncesto:["Dribling","Tiros libres","3v3","Defensa"],
  CiclismoRuta:["Contrarreloj","Gran Fondo","Sprint","Escalada puertos"],
  Boxeo:    ["Sombra","Sparring","Saco","Cardio golpeo"],
  Pilates:  ["Matwork","Reformer","Core","Estiramiento"],
  Escalada: ["Boulder","Vía","Resistencia","Agarre"],
  Triatlon: ["Sprint","Olímpico","Half Ironman","Brick"],
  Tenis:    ["Singles","Dobles","Resistencia","Técnica"],
  Kickboxing:["Técnica","Sparring","Cardio","Fuerza"]
};

// Sesiones de gym por deporte
const gymSessions = {
  MTB:       ["Sentadillas 4×8","Peso muer­to 3×8","Core 3×15"],
  Atletismo:["Saltos pliométricos","Sprint en cuestas","Fuerza pierna"],
  Natacion:["Jalón dorsal 3×10","Press hombro 3×12","Patada de pierna"],
  Yoga:     ["Pilates matwork","Estiramiento fondo","Yoga restaurativa"],
  Crossfit: ["Clean & Jerk","Snatch","Movilidad articular"],
  Futbol:   ["Zancadas 4×10","Circuito pliométrico","Core dinámico"],
  Baloncesto:["Plyo box jumps","Trabajo de core","Saltos verticales"],
  CiclismoRuta:["Rodillo zona 3","Entreno de fuerza","Core lumbares"],
  Boxeo:    ["Sombra 5×3min","Saco 4×3min","Burpees 3×15"],
  Pilates:  ["Hundred","Teaser","Leg circles"],
  Escalada: ["Fingerboard","Suspensión 3×30s","Core antebrazo"],
  Triatlon: ["Brick run-bike","Natación técnica","Circuito fullbody"],
  Tenis:    ["Drills de velocidad","Fuerza de hombro","Core rotación"],
  Kickboxing:["Combinaciones","Circuito de golpeo","Estabilidad core"]
};

// Mensajes inspiradores
const insp = {
  MTB: "La montaña no se vence con prisas, sino con pasión.",
  Atletismo:"Cada zancada revela tu fuerza interior.",
  Natacion:"En el agua eres libre, fluye con determinación.",
  Yoga:"La paz nace de cada respiración consciente.",
  Crossfit:"El dolor de hoy es la gloria de mañana.",
  Futbol:"En equipo, cada paso escribe una victoria.",
  Baloncesto:"Eleva tu juego, trasciende tus límites.",
  CiclismoRuta:"Una pedaleada a la vez construye grandeza.",
  Boxeo:"La perseverancia define al verdadero campeón.",
  Pilates:"La fuerza nace desde tu centro.",
  Escalada:"Cada presa te acerca a tu cima personal.",
  Triatlon:"Tres disciplinas, un solo espíritu indomable.",
  Tenis:"Tu raqueta es extensión de tu voluntad.",
  Kickboxing:"Golpea con intención, defiende con corazón."
};

document.addEventListener('DOMContentLoaded', ()=>{
  const form   = document.getElementById('metricsForm');
  const planC  = document.getElementById('planContainer');
  const bfUL   = document.getElementById('breakfastPlan');
  const lnUL   = document.getElementById('lunchPlan');
  const dnUL   = document.getElementById('dinnerPlan');
  const wkUL   = document.getElementById('workoutPlan');
  const greet  = document.getElementById('greeting');
  const planG  = document.getElementById('planGreeting');

  const selSport = document.getElementById('disciplina');
  const selSpec  = document.getElementById('specialty');
  const natFields= document.getElementById('natationFields');

  // Actualiza specialty o muestra campos natación
  selSport.addEventListener('change', ()=>{
    const s = selSport.value;
    selSpec.innerHTML = `<option value="">Especialidad/Técnica</option>`;
    natFields.classList.add('hidden');

    if (s === 'Natacion') {
      natFields.classList.remove('hidden');
    } else if (specialties[s]) {
      specialties[s].forEach(opt=>{
        selSpec.innerHTML += `<option>${opt}</option>`;
      });
    }
  });

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const peso   = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const edad   = parseInt (document.getElementById('edad').value);
    const sexo   = document.getElementById('sexo').value;
    const tipo   = document.getElementById('biotipo').value;
    const sport  = selSport.value;
    const spec   = (sport==='Natacion')
                   ? `${document.getElementById('stroke').value} – ${document.getElementById('swimActivity').value}`
                   : selSpec.value;

    // Cálculo IMC
    const imc = +(peso/(altura*altura)).toFixed(1);
    const min = +(18.5*altura*altura).toFixed(1);
    const max = +(24.9*altura*altura).toFixed(1);

    // Perfil físico
    let perfil = '';
    if (tipo==='ectomorfo') perfil = "🏃 Ectomorfo: enfócate en fuerza y alta densidad calórica.";
    if (tipo==='mesomorfo') perfil = "💪 Mesomorfo: maximiza tu potencial con volumen e intensidad.";
    if (tipo==='endomorfo') perfil = "🧘 Endomorfo: prioriza cardio y control nutricional.";

    // Obtiene 7 comidas
    const mealsPlan = getMealsPlan();
    bfUL.innerHTML = mealsPlan.breakfasts.map(m=>`<li>${m.name}</li>`).join('');
    lnUL.innerHTML = mealsPlan.lunches   .map(m=>`<li>${m.name}</li>`).join('');
    dnUL.innerHTML = mealsPlan.dinners   .map(m=>`<li>${m.name}</li>`).join('');

    // Entreno
    const tech = (sport==='Natacion') ? [`${document.getElementById('stroke').value} drills`] : specialties[sport] || [];
    const gym  = gymSessions[sport] || [];
    const full = [...tech,...gym].slice(0,7);
    wkUL.innerHTML = full.map(x=>`<li>${x}</li>`).join('');

    // Saludo y plan
    planG.textContent = `¡Hola! Tu IMC es ${imc} (ideal ${min}–${max} kg).`;
    greet.textContent = perfil;

    document.getElementById('inspiration').textContent = insp[sport] || '';
    form.classList.add('hidden');
    planC.classList.remove('hidden');
  });

  // Logout
  document.getElementById('logout').onclick = ()=>{
    localStorage.clear();
    location.href='login.html';
  };
});
