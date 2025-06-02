import products from '../data/products.json';

export const getProductInfo = (barcode: string) => {
  if (barcode in products) {
    return {
      success: true,
      data: products[barcode as keyof typeof products]
    };
  }
  
  return {
    success: false,
    error: "Product not found in database"
  };
};

export const isProductSafe = (barcode: string) => {
  const product = products[barcode as keyof typeof products];
  if (!product) return false;
  
  return product.safetyAnalysis.overallSafetyScore >= 70;
};

export const getPregnancySuitability = (barcode: string, trimester: 'firstTrimester' | 'secondTrimester' | 'thirdTrimester') => {
  const product = products[barcode as keyof typeof products];
  if (!product) return null;
  
  return product.safetyAnalysis.pregnancyStages[trimester];
};