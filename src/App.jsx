import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';

export default function App() {
  const [viewDate, setViewDate] = useState(new Date(2026, 1, 1)); 
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 28));

  // LÓGICA DE ALTA PRECISIÓN (Algoritmo de ciclo lunar de 29.53 días)
  const getLunarData = (date) => {
    // Referencia: Una Luna Nueva conocida (11 Ene 2024)
    const referenceDate = new Date(2024, 0, 11);
    const diffDays = (date - referenceDate) / (1000 * 60 * 60 * 24);
    const cycle = 29.530588853;
    const age = diffDays % cycle;
    
    // Determinamos la fase según los días del ciclo (0 a 29.5)
    // 🟡 Luna Llena: Alrededor del día 14.7
    if (age > 14 && age < 16) {
      return { name: 'Luna Llena', color: '#fbbf24', action: 'Fortalecer', desc: 'Fase de máxima energía. Ideal para ganar grosor.' };
    }
    // 🔴 Luna Nueva: Alrededor del día 0 o 29
    if (age < 1 || age > 28.5) {
      return { name: 'Luna Nueva', color: '#f87171', action: 'Reposo', desc: 'Energía en la raíz. Se recomienda no cortar hoy.' };
    }
    // 🟢 Creciente: De Luna Nueva a Llena
    if (age >= 1 && age <= 14) {
      return { name: 'Luna Creciente', color: '#4ade80', action: 'Crecimiento', desc: 'Corta hoy para que tu cabello crezca más rápido.' };
    }
    // 🔵 Menguante: De Luna Llena a Nueva
    return { name: 'Luna Menguante', color: '#38bdf8', action: 'Mantenimiento', desc: 'Corta hoy para que el corte dure más tiempo.' };
  };

  const currentInfo = getLunarData(selectedDate);
  const dias = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 })
  });

  return (
    <div style={{ 
      backgroundColor: '#0a0a0c', minHeight: '100vh', width: '100%', color: 'white', 
      display: 'flex', justifyContent: 'center', fontFamily: 'system-ui, sans-serif',
      padding: '10px', boxSizing: 'border-box'
    }}>
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <select 
          value={viewDate.getMonth()} 
          onChange={(e) => setViewDate(new Date(2026, parseInt(e.target.value), 1))}
          style={{ 
            width: '100%', padding: '12px', borderRadius: '12px', background: '#1c1c22', 
            color: 'white', border: '1px solid #2d2d35', fontSize: '0.9rem', outline: 'none' 
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>{format(new Date(2026, i, 1), 'MMMM yyyy', { locale: es })}</option>
          ))}
        </select>

        <div style={{ 
          background: '#16161a', padding: '20px', borderRadius: '24px', textAlign: 'center', 
          border: '1px solid #2d2d35', boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
        }}>
           <p style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'capitalize', margin: '0 0 8px 0' }}>
             {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
           </p>
           <h2 style={{ fontSize: '1.8rem', margin: '5px 0', fontWeight: 'bold' }}>{currentInfo.name}</h2>
           <div style={{ 
             backgroundColor: currentInfo.color + '22', color: currentInfo.color, 
             border: `1px solid ${currentInfo.color}`, padding: '4px 18px', 
             borderRadius: '20px', display: 'inline-block', fontWeight: 'bold', fontSize: '0.75rem'
           }}>
             {currentInfo.action.toUpperCase()}
           </div>
           <p style={{ color: '#cbd5e1', marginTop: '12px', fontSize: '0.9rem', lineHeight: '1.4' }}>{currentInfo.desc}</p>
        </div>

        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', 
          background: '#16161a', padding: '12px', borderRadius: '20px', border: '1px solid #2d2d35' 
        }}>
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
            <div key={d} style={{ textAlign: 'center', color: '#4b5563', fontSize: '0.65rem', fontWeight: 'bold' }}>{d}</div>
          ))}
          {dias.map(dia => {
            const dInfo = getLunarData(dia);
            const isSelected = isSameDay(dia, selectedDate);
            const isCurrentMonth = dia.getMonth() === viewDate.getMonth();
            
            return (
              <div 
                key={dia.toString()} onClick={() => setSelectedDate(dia)}
                style={{ 
                  aspectRatio: '1/1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '10px', cursor: 'pointer',
                  backgroundColor: isSelected ? '#2d2d35' : 'transparent',
                  color: isCurrentMonth ? '#ffffff' : '#4b5563',
                  opacity: isCurrentMonth ? 1 : 0.3
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? 'bold' : 'normal' }}>{format(dia, 'd')}</span>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: dInfo.color, marginTop: '3px' }}></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}