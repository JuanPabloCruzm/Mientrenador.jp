import { getRecommendedMeals } from './recommend.js';

const workouts = {
  MTB:       ["2h trail Enduro", "10 descensos DH", "5×4km XC a ritmo"],
  Atletismo:["6×400m series", "4×100m relevos", "Tirada larga 12km"],
  Natacion:["20×50m crol", "4×200m resistencia", "15min técnica de patada"],
  Yoga:     ["30min Vinyasa", "45min Hatha", "Serie Ashtanga I"],
  Crossfit: ["AMRAP 20", "Fran 21-15-9", "Murph modificado"],
  Futbol:   ["Partido 5v5", "30min tiros a portería", "Circuito de pases"],
  Baloncesto:["20min dribling", "50 tiros libres", "Partido 3v3"],
  CiclismoRuta:["Contrarreloj 10km", "Gran Fondo 80km", "Sprint series"],
  Boxeo:    ["5×3min sombra", "3×3min saco", "5×2min cuerda"],
  Pilates:  ["Matwork 45min", "Reformer 30min", "Pilates Avanzado"],
  Escalada: ["6 boulders", "Vía 20m", "Core y antebrazos"],
  Triatlon: ["Sprint brick", "Olímpico combinado", "Half Ironman prep"]
};

document.addEventListener('DOMContentLoaded',()=>{
  const form     = document.getElementById('metricsForm');
  const planC    = document.getElementById('planContainer');
  const mealUL   = document.getElementById('mealPlan');
  const workUL   = document.getElementById('workoutPlan');
  const greet    = document.getElementById('greeting');
  const planG    = document.getElementById('planGreeting');
  const selDep   = document.getElementById('disciplina');
  const selRet   = document.getElementById('reto');
  const natDiv   = document.getElementById('natacionInputs');

  // Actualiza retos
  selDep.addEventListener('change',()=>{
    const d = selDep.value;
    const opts = {
      MTB:["Enduro","DH","XC"],
      Atletismo:["400m","4×100m Relevos","Maratón"],
      Natacion:["Resistencia"],
      Yoga:["Hatha","Vinyasa","Ashtanga"],
      Crossfit:["AMRAP 20","Fran","Murph"],
      Futbol:["Partido 5v5","Tiros a portería","Resistencia balón"],
      Baloncesto:["Tiros libres","Dribling","3v3"],
      CiclismoRuta:["Contrarreloj","Gran Fondo","Sprint final"],
      Boxeo:["Sombra","Sparring","Trabajo en saco"],
      Pilates:["Matwork","Reformer","Pilates Avanzado"],
      Escalada:["Boulder","Vía de 20m","Circuito resistencia"],
      Triatlon:["Sprint","Olímpico","Half Ironman"]
    };
    selRet.innerHTML = `<option value="">Desafío</option>`;
    natDiv.classList.add('hidden');
    if (opts[d]) {
      opts[d].forEach(r=>{
        selRet.innerHTML += `<option>${r}</option>`;
      });
      if (d==='Natacion') natDiv.classList.remove('hidden');
    }
  });

  // Procesa formulario
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const user = {
      name:    document.getElementById('name').value.trim(),
      weight:  +document.getElementById('peso').value,
      height:  +document.getElementById('altura').value,
      age:     +document.getElementById('edad').value,
      sex:     document.getElementById('sexo').value,
      activity:+document.getElementById('activity').value,
      goal:    document.getElementById('goal').value,
      sport:   selDep.value
    };

    planG.textContent = `¡Hola, ${user.name}! Aquí va tu plan:`;
    greet.textContent = '';

    // Comidas
    const meals = getRecommendedMeals(user);
    mealUL.innerHTML = meals.map(m=>
      `<li>${m.name} — ${m.calories} kcal</li>`
    ).join('');

    // Entreno
    const w = workouts[user.sport] || ["Entrenamiento libre 30 min"];
    workUL.innerHTML = w.map(x=>`<li>${x}</li>`).join('');

    form.classList.add('hidden');
    planC.classList.remove('hidden');
  });

  document.getElementById('logout').onclick = ()=>{
    localStorage.clear();
    location.href='login.html';
  };
});
