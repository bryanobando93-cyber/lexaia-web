import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const LiveStats: React.FC = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const timer1 = setInterval(() => setCount1(prev => prev < 50 ? prev + 1 : prev), 50);
    const timer2 = setInterval(() => setCount2(prev => prev < 10000 ? prev + 200 : prev), 50);
    const timer3 = setInterval(() => setCount3(prev => prev < 300 ? prev + 6 : prev), 50);
    return () => { clearInterval(timer1); clearInterval(timer2); clearInterval(timer3); };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <motion.div whileHover={{ scale: 1.05 }}>
        <div className="text-5xl font-bold text-primary mb-2">{count1}+</div>
        <div className="text-slate-300">Empresas Transformadas</div>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <div className="text-5xl font-bold text-primary mb-2">{count2.toLocaleString()}+</div>
        <div className="text-slate-300">Horas Ahorradas</div>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <div className="text-5xl font-bold text-primary mb-2">{count3}%</div>
        <div className="text-slate-300">ROI Promedio</div>
      </motion.div>
    </div>
  );
};
