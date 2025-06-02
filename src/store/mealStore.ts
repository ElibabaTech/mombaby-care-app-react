import { create } from 'zustand';

interface Meal {
  id: string;
  type: string;
  description: string;
  day: string;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface MealState {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  getMealsByDay: (day: string) => Meal[];
}

export const useMealStore = create<MealState>((set, get) => ({
  meals: [],
  addMeal: (meal) => set((state) => ({ meals: [...state.meals, meal] })),
  getMealsByDay: (day) => get().meals.filter((meal) => meal.day === day),
}));