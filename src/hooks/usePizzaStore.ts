import { create } from 'zustand';

interface PizzaState {
  selectedToppings: string[];
  totalPrice: number;
  currentAct: number;
  scrollProgress: number;
  toggleTopping: (toppingId: string, price: number) => void;
  setCurrentAct: (act: number) => void;
  setScrollProgress: (progress: number) => void;
}

export const usePizzaStore = create<PizzaState>((set) => ({
  selectedToppings: [],
  totalPrice: 149, // BASE_PIZZA_PRICE
  currentAct: 1,
  scrollProgress: 0,
  toggleTopping: (toppingId, price) => set((state) => {
    const isSelected = state.selectedToppings.includes(toppingId);
    if (isSelected) {
      return {
        selectedToppings: state.selectedToppings.filter(id => id !== toppingId),
        totalPrice: state.totalPrice - price,
      };
    } else {
      return {
        selectedToppings: [...state.selectedToppings, toppingId],
        totalPrice: state.totalPrice + price,
      };
    }
  }),
  setCurrentAct: (act) => set({ currentAct: act }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
