export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentDailyValue?: number;
}

export interface ProductAnalysis {
  isSafe: boolean;
  nutritionalScore: number;
  warnings: string[];
  recommendations: string[];
  suitableFor: {
    firstTrimester: boolean;
    secondTrimester: boolean;
    thirdTrimester: boolean;
    lactating: boolean;
    infants: boolean;
  };
}

export interface ProductInfo {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  packageSize: string;
  nutritionalInfo: {
    servingSize: string;
    calories: number;
    macronutrients: {
      carbohydrates: Nutrient;
      proteins: Nutrient;
      fats: Nutrient;
    };
    micronutrients: Nutrient[];
    sugar: Nutrient;
    sodium: Nutrient;
    fiber: Nutrient;
    allergens: string[];
  };
  ingredients: {
    list: string[];
    isOrganic: boolean;
    isGMO: boolean;
    isProcessed: boolean;
    additives: string[];
  };
  analysis: ProductAnalysis;
}