import React from 'react';

const details = {
  'Luna Nueva': { t: 'Fase de Reposo', c: 'var(--red-dot)', items: ['Evita las tijeras', 'Aplica aceites', 'Limpieza profunda'] },
  'Luna Creciente': { t: 'Fase de Impulso', c: 'var(--green-dot)', items: ['Corta puntas', 'Crecimiento acelerado', 'Acepta tintes'] },
  'Luna Llena': { t: 'Fase de Brillo', c: 'var(--yellow-dot)', items: ['Corta para volumen', 'Cura daños', 'Mascarillas intensas'] },
  'Luna Menguante': { t: 'Fase de Calma', c: 'var(--blue-dot)', items: ['Mantenimiento de corte', 'Depilación duradera', 'Fortalece raíz'] }
};

export const PhaseDetail = ({ phaseName }) => {
  const info = details[phaseName] || details['Luna Creciente'];
  return (
    <div style={{ background: '#1c1c22', padding: '15px', borderRadius: '15px', marginTop: '15px' }}>
      <h4 style={{ color: info.c, margin: '0 0 10px 0' }}>{info.t}</h4>
      <ul style={{ margin: 0, paddingLeft: '18px', color: '#94a3b8', fontSize: '0.85rem' }}>
        {info.items.map((item, i) => <li key={i} style={{ marginBottom: '5px' }}>{item}</li>)}
      </ul>
    </div>
  );
};