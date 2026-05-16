import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { usePizzaStore } from './usePizzaStore';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const setCurrentAct = usePizzaStore((state) => state.setCurrentAct);

  useLenis(({ scroll, limit }) => {
    const p = limit > 0 ? scroll / limit : 0;
    setProgress(p);
    
    const state = usePizzaStore.getState();
    state.setScrollProgress(p);

    let nextAct = 1;
    if (p < 0.20) nextAct = 1;
    else if (p < 0.45) nextAct = 2;
    else if (p < 0.65) nextAct = 3;
    else if (p < 0.85) nextAct = 4;
    else nextAct = 5;

    if (state.currentAct !== nextAct) {
      state.setCurrentAct(nextAct);
    }
  });

  return progress;
}
