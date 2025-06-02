import React, { useState } from 'react';
import { Camera, AlertCircle, CheckCircle, X } from 'lucide-react';
import { getProductInfo } from '../../../services/productService';

const BarcodeTest = () => {
  const [testBarcode, setTestBarcode] = useState('');
  const [productInfo, setProductInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testBarcodes = [
    { code: '737628064502', description: 'Prenatal Multivitamin' },
    { code: '681131457378', description: 'Organic Baby Rice Cereal' },
    { code: '619908123456', description: 'Emzor Maternal Care Supplement' },
    { code: '619908123457', description: 'Golden Penny Pap for Nursing Mothers' },
    { code: '619908123458', description: 'Nestle Nutrend Baby Cereal' },
    { code: '619908123459', description: 'Checkers Custard for Infants' },
    { code: '619908123460', description: 'Peak Maternal Milk Powder' },
    { code: '619908123461', description: 'SMA Gold Baby Formula' },
    { code: '619908123462', description: 'Cerelac Infant Cereal with Milk' },
    { code: '619908123463', description: "Mama's Garden Pregnancy Tea" },
    { code: '619908123464', description: 'NAN Fortified Baby Food' }
  ];

  const handleTest = (barcode: string) => {
    setError(null);
    setTestBarcode(barcode);
    const result = getProductInfo(barcode);
    
    if (result.success) {
      setProductInfo(result.data);
    } else {
      setError(result.error);
      setProductInfo(null);
    }
  };

  const handleManualInput = (e: React.FormEvent) => {
    e.preventDefault();
    handleTest(testBarcode);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Barcode Scanner Test</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Test with Sample Barcodes:</h3>
            <div className="space-y-2">
              {testBarcodes.map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleTest(item.code)}
                  className="block w-full text-left px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg"
                >
                  <span className="font-mono">{item.code}</span>
                  <span className="ml-2 text-gray-600">- {item.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Manual Barcode Input:</h3>
            <form onSubmit={handleManualInput} className="flex gap-2">
              <input
                type="text"
                value={testBarcode}
                onChange={(e) => setTestBarcode(e.target.value)}
                placeholder="Enter barcode number"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Test
              </button>
            </form>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {productInfo && (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">{productInfo.productInfo.name}</h2>
              <p className="text-gray-600">{productInfo.productInfo.brand}</p>
              {productInfo.productInfo.madeIn && (
                <p className="text-sm text-purple-600">Made in {productInfo.productInfo.madeIn}</p>
              )}
            </div>
            <div className="flex items-center">
              {productInfo.safetyAnalysis.overallSafetyScore >= 70 ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <X className="h-6 w-6 text-red-500" />
              )}
              <span className="ml-2 font-semibold">
                Safety Score: {productInfo.safetyAnalysis.overallSafetyScore}/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Product Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <dl className="space-y-2">
                  <div>
                    <dt className="text-gray-600">Category</dt>
                    <dd>{productInfo.productInfo.category}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Package Size</dt>
                    <dd>{productInfo.productInfo.packageSize}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Safety Analysis</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  {Object.entries(productInfo.safetyAnalysis.pregnancyStages).map(([stage, info]: [string, any]) => (
                    <div key={stage} className="flex items-center">
                      <span className="capitalize">{stage.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className={`ml-2 px-2 py-1 rounded text-sm ${
                        info.safe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {info.safe ? 'Safe' : 'Not Safe'}
                      </span>
                      {info.notes && (
                        <span className="ml-2 text-sm text-gray-600">{info.notes}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Nutritional Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Macronutrients</h4>
                    <dl className="space-y-1">
                      {Object.entries(productInfo.nutritionalBreakdown.macronutrients).map(([key, value]: [string, any]) => (
                        <div key={key}>
                          <dt className="text-gray-600 capitalize">{key}</dt>
                          <dd>{typeof value === 'object' ? value.total : value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  
                  {productInfo.nutritionalBreakdown.vitamins && (
                    <div>
                      <h4 className="font-medium mb-2">Vitamins</h4>
                      <dl className="space-y-1">
                        {Object.entries(productInfo.nutritionalBreakdown.vitamins).map(([key, value]) => (
                          <div key={key}>
                            <dt className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                  
                  {productInfo.nutritionalBreakdown.minerals && (
                    <div>
                      <h4 className="font-medium mb-2">Minerals</h4>
                      <dl className="space-y-1">
                        {Object.entries(productInfo.nutritionalBreakdown.minerals).map(([key, value]) => (
                          <div key={key}>
                            <dt className="text-gray-600 capitalize">{key}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {productInfo.recommendations && (
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-2">Recommendations</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-gray-600">Dosage</dt>
                      <dd>{productInfo.recommendations.dosage}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Timing</dt>
                      <dd>{productInfo.recommendations.timing}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Interactions</dt>
                      <dd>{productInfo.recommendations.interactions}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeTest;