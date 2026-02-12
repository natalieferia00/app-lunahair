import { Moon } from 'lunarphase-js';

export const getLunarAdvice = (date) => {
  const illumination = Moon.lunarIllumination(date);
  const phase = Moon.lunarPhase(date);

  if (illumination >= 0.96) {
    return {
      phaseName: 'Luna Llena',
      action: 'Fortalecer',
      color: '#fbbf24', 
      desc: 'Máxima energía para ganar grosor y volumen.'
    };
  }
  
  if (illumination <= 0.04) {
    return {
      phaseName: 'Luna Nueva',
      action: 'Reposo',
      color: '#f87171', 
      desc: 'Fase de descanso. Ideal para tratamientos de cuero cabelludo.'
    };
  }

  if (phase.includes('Crescent') || phase.includes('First Quarter') || (phase.includes('Gibbous') && !phase.includes('Waning'))) {
    return {
      phaseName: 'Luna Creciente',
      action: 'Crecimiento',
      color: '#4ade80', 
      desc: 'Corta hoy para un crecimiento acelerado.'
    };
  }

  return {
    phaseName: 'Luna Menguante',
    action: 'Mantenimiento',
    color: '#38bdf8', 
    desc: 'Corta hoy para que tu corte dure más tiempo.'
  };
};