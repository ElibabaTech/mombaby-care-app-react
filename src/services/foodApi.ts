import axios from 'axios';
import { ProductInfo, ProductAnalysis } from '../types/product';

const OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/v2';
const USDA_API = 'https://api.nal.usda.gov/fdc/v1';

export async function fetchProductInfo(barcode: string): Promise<ProductInfo | null> {
  try {
    // Fetch from Open Food Facts
    const response = await axios.get(`${OPEN_FOOD_FACTS_API}/product/${barcode}`);
    const product = response.data.product;

    if (!product) {
      return null;
    }

    // Analyze product safety and suitability
    const analysis = analyzeProduct(product);

    return {
      barcode,
      name: product.product_name,
      brand: product.brands,
      category: product.categories_tags?.[0] || 'Unknown',
      packageSize: product.quantity || 'Not specified',
      nutritionalInfo: {
        servingSize: product.serving_size || 'Not specified',
        calories: parseFloat(product.nutriments?.energy_100g) || 0,
        macronutrients: {
          carbohydrates: {
            name: 'Carbohydrates',
            amount: parseFloat(product.nutriments?.carbohydrates_100g) || 0,
            unit: 'g'
          },
          proteins: {
            name: 'Proteins',
            amount: parseFloat(product.nutriments?.proteins_100g) || 0,
            unit: 'g'
          },
          fats: {
            name: 'Fats',
            amount: parseFloat(product.nutriments?.fat_100g) || 0,
            unit: 'g'
          }
        },
        micronutrients: extractMicronutrients(product.nutriments),
        sugar: {
          name: 'Sugar',
          amount: parseFloat(product.nutriments?.sugars_100g) || 0,
          unit: 'g'
        },
        sodium: {
          name: 'Sodium',
          amount: parseFloat(product.nutriments?.sodium_100g) || 0,
          unit: 'mg'
        },
        fiber: {
          name: 'Fiber',
          amount: parseFloat(product.nutriments?.fiber_100g) || 0,
          unit: 'g'
        },
        allergens: product.allergens_tags || []
      },
      ingredients: {
        list: product.ingredients_text_en?.split(',') || [],
        isOrganic: product.labels_tags?.includes('organic') || false,
        isGMO: product.labels_tags?.includes('non-gmo') || false,
        isProcessed: determineProcessingLevel(product),
        additives: product.additives_tags || []
      },
      analysis
    };
  } catch (error) {
    console.error('Error fetching product info:', error);
    return null;
  }
}

function extractMicronutrients(nutriments: any): Array<{ name: string; amount: number; unit: string }> {
  const micronutrients = [];
  const micronutrientKeys = [
    'vitamin-a', 'vitamin-c', 'vitamin-d', 'vitamin-e',
    'calcium', 'iron', 'zinc', 'magnesium'
  ];

  for (const key of micronutrientKeys) {
    if (nutriments[`${key}_100g`]) {
      micronutrients.push({
        name: key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' '),
        amount: parseFloat(nutriments[`${key}_100g`]),
        unit: determineUnit(key)
      });
    }
  }

  return micronutrients;
}

function determineUnit(nutrient: string): string {
  const vitaminUnits = ['vitamin-a', 'vitamin-d'];
  const mineralUnits = ['calcium', 'iron', 'zinc', 'magnesium'];

  if (vitaminUnits.includes(nutrient)) return 'IU';
  if (mineralUnits.includes(nutrient)) return 'mg';
  return 'mg';
}

function determineProcessingLevel(product: any): boolean {
  const processedIndicators = [
    'additives_tags',
    'ingredients_from_palm_oil_tags',
    'ingredients_that_may_be_from_palm_oil_tags'
  ];

  return processedIndicators.some(indicator => 
    Array.isArray(product[indicator]) && product[indicator].length > 0
  );
}

function analyzeProduct(product: any): ProductAnalysis {
  const warnings: string[] = [];
  const recommendations: string[] = [];
  let nutritionalScore = 100;

  // Check additives
  if (product.additives_tags?.length > 0) {
    warnings.push('Contains artificial additives');
    nutritionalScore -= 10;
  }

  // Check sugar content
  const sugarContent = parseFloat(product.nutriments?.sugars_100g) || 0;
  if (sugarContent > 10) {
    warnings.push('High sugar content');
    nutritionalScore -= 15;
  }

  // Check sodium content
  const sodiumContent = parseFloat(product.nutriments?.sodium_100g) || 0;
  if (sodiumContent > 400) {
    warnings.push('High sodium content');
    nutritionalScore -= 15;
  }

  // Analyze suitability for different stages
  const suitableFor = {
    firstTrimester: true,
    secondTrimester: true,
    thirdTrimester: true,
    lactating: true,
    infants: false
  };

  // Check for common pregnancy concerns
  if (product.ingredients_text?.toLowerCase().includes('raw') ||
      product.ingredients_text?.toLowerCase().includes('unpasteurized')) {
    warnings.push('Contains raw/unpasteurized ingredients - not safe during pregnancy');
    suitableFor.firstTrimester = false;
    suitableFor.secondTrimester = false;
    suitableFor.thirdTrimester = false;
    nutritionalScore -= 50;
  }

  // Add recommendations based on analysis
  if (nutritionalScore < 70) {
    recommendations.push('Consider organic alternatives');
    recommendations.push('Look for products with fewer additives');
  }

  return {
    isSafe: nutritionalScore > 50,
    nutritionalScore,
    warnings,
    recommendations,
    suitableFor
  };
}