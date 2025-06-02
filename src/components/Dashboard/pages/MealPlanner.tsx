import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Camera,
  Search,
  AlertCircle,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useMealStore } from "../../../store/mealStore";
import Quagga from "quagga";

interface ProductAnalysis {
  isSafe: boolean;
  nutritionalScore: number;
  warnings: string[];
  recommendations: string[];
}

const MealPlanner = () => {
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [mealDescription, setMealDescription] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [barcodeResult, setBarcodeResult] = useState<{
    code: string;
    format: string;
    quality: number;
    analysis?: ProductAnalysis;
  } | null>(null);
  const [scannerInitialized, setScannerInitialized] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);

  const { addMeal, getMealsByDay } = useMealStore();

  const handleAddMeal = () => {
    setShowAddMeal(true);
  };

  const stopScanner = () => {
    if (scannerInitialized) {
      try {
        Quagga.stop();
        setScannerInitialized(false);
        setScanning(false);
      } catch (error) {
        console.error("Error stopping scanner:", error);
      }
    }
  };

  const initializeScanner = () => {
    if (scannerInitialized) {
      return;
    }

    try {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#interactive"),
            constraints: {
              facingMode: "environment",
              width: { min: 1280, ideal: 1920 },
              height: { min: 720, ideal: 1080 },
              aspectRatio: { min: 1, max: 2 },
              focusMode: "continuous",
              zoom: 2.0,
            },
            area: {
              top: "25%",
              right: "25%",
              left: "25%",
              bottom: "25%",
            },
            singleChannel: false,
          },
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "code_128_reader",
              "code_39_reader",
              "upc_reader",
              "upc_e_reader",
              "codabar_reader",
            ],
            debug: {
              drawBoundingBox: true,
              showPattern: true,
              showFrequency: true,
            },
            multiple: false,
            tryHarder: true,
            refinement: true,
          },
          locate: true,
          frequency: 60, // Increased for faster detection
          numOfWorkers: 4,
          locator: {
            halfSample: true,
            patchSize: "medium",
            debug: {
              showCanvas: true,
              showPatches: true,
              showFoundPatches: true,
              showSkeleton: true,
              showLabels: true,
              showPatchLabels: true,
              showRemainingPatchLabels: true,
            },
          },
        },
        function (err) {
          if (err) {
            console.error("Scanner initialization error:", err);
            setScannerError(
              "Failed to initialize camera. Please ensure camera permissions are granted and try again."
            );
            return;
          }
          console.log("QuaggaJS initialization succeeded");
          Quagga.start();
          setScannerInitialized(true);
        }
      );

      // Handle successful scans
      Quagga.onDetected((result) => {
        if (!scanning) return;

        const code = result.codeResult.code;
        const format = result.codeResult.format;
        const quality = Math.round(result.codeResult.confidence * 100);

        console.log("Barcode detected:", {
          code,
          format,
          quality,
        });

        // Process any scan with reasonable quality
        if (quality > 45) {
          setBarcodeResult({
            code,
            format,
            quality,
          });
          handleFoodLookup(code, format);
          stopScanner();
          setShowCamera(false);
        }
      });

      // Handle processing feedback
      Quagga.onProcessed((result) => {
        if (!result) return;

        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;

        if (drawingCtx && drawingCanvas) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );

          if (result.boxes) {
            drawingCtx.strokeStyle = "#FF3B58";
            drawingCtx.lineWidth = 2;

            result.boxes
              .filter(function (box) {
                return box !== result.box;
              })
              .forEach(function (box) {
                drawingCtx.beginPath();
                drawingCtx.rect(box.x, box.y, box.width, box.height);
                drawingCtx.stroke();
              });
          }

          if (result.box) {
            drawingCtx.strokeStyle = "#00F";
            drawingCtx.lineWidth = 3;
            drawingCtx.beginPath();
            drawingCtx.rect(
              result.box.x,
              result.box.y,
              result.box.width,
              result.box.height
            );
            drawingCtx.stroke();
          }

          if (result.codeResult && result.codeResult.code) {
            const text = result.codeResult.code;
            drawingCtx.font = "bold 24px Arial";
            drawingCtx.fillStyle = "#00F";

            // Add background for better text visibility
            const metrics = drawingCtx.measureText(text);
            const padding = 5;
            drawingCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
            drawingCtx.fillRect(10, 30, metrics.width + padding * 2, 30);

            // Draw text
            drawingCtx.fillStyle = "#00F";
            drawingCtx.fillText(text, 10 + padding, 50);
          }
        }
      });
    } catch (error) {
      console.error("Error initializing scanner:", error);
      setScannerError(
        "An error occurred while setting up the scanner. Please try again."
      );
    }
  };

  const handleOpenCamera = async () => {
    setShowCamera(true);
    setScanning(true);
    setScannerError(null);
    setBarcodeResult(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          focusMode: "continuous",
        },
      });

      // Configure advanced camera settings if available
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();

      if (capabilities.zoom) {
        await track.applyConstraints({
          advanced: [{ zoom: capabilities.zoom.max }],
        });
      }

      if (capabilities.brightness) {
        await track.applyConstraints({
          advanced: [{ brightness: capabilities.brightness.max }],
        });
      }

      stream.getTracks().forEach((track) => track.stop());

      // Wait for DOM to update
      setTimeout(() => {
        initializeScanner();
      }, 100);
    } catch (error) {
      console.error("Camera access error:", error);
      setScannerError(
        "Camera access denied. Please grant camera permissions and try again."
      );
    }
  };

  const analyzeProduct = (barcode: string): ProductAnalysis => {
    // Simulated AI-powered product analysis
    const randomScore = Math.random();
    const isSafe = randomScore > 0.3;

    const warnings = [];
    const recommendations = [];

    if (randomScore < 0.3) {
      warnings.push("High levels of artificial preservatives");
      warnings.push("Contains potential allergens");
      recommendations.push("Consider organic alternatives");
    } else if (randomScore < 0.6) {
      warnings.push("Moderate sugar content");
      recommendations.push("Consume in moderation");
      recommendations.push("Best consumed earlier in the day");
    } else {
      recommendations.push("Good nutritional profile");
      recommendations.push("Rich in essential nutrients");
    }

    return {
      isSafe,
      nutritionalScore: Math.round(randomScore * 100),
      warnings,
      recommendations,
    };
  };

  const getBarcodeTypeName = (format: string): string => {
    const types: { [key: string]: string } = {
      ean_13: "EAN-13 (International Article Number)",
      ean_8: "EAN-8 (Compressed Article Number)",
      code_128: "Code 128 (ASCII Character Set)",
      code_39: "Code 39 (Alphanumeric)",
      upc_a: "UPC-A (Universal Product Code)",
      upc_e: "UPC-E (Compressed Product Code)",
      codabar: "Codabar (Library Systems)",
      i2of5: "Interleaved 2 of 5 (Warehouse/Distribution)",
    };
    return types[format.toLowerCase()] || format;
  };

  const handleFoodLookup = async (barcode: string, format: string) => {
    const analysis = analyzeProduct(barcode);

    const nutritionalInfo = {
      name: `Product ${barcode}`,
      barcodeType: getBarcodeTypeName(format),
      calories: Math.floor(Math.random() * 500),
      protein: Math.floor(Math.random() * 30),
      carbs: Math.floor(Math.random() * 50),
      fat: Math.floor(Math.random() * 20),
      safeForPregnancy: analysis.isSafe,
      warnings: analysis.warnings,
      recommendations: analysis.recommendations,
      nutritionalScore: analysis.nutritionalScore,
    };

    setBarcodeResult((prev) => ({
      ...prev!,
      analysis,
    }));

    addMeal({
      id: Math.random().toString(),
      type: "Scanned Item",
      description: `${nutritionalInfo.name} (${nutritionalInfo.barcodeType}: ${barcode})`,
      day: selectedDay,
      nutritionalInfo,
    });
  };

  const handleSubmitMeal = (e: React.FormEvent) => {
    e.preventDefault();

    const nutritionalInfo = {
      calories: Math.floor(Math.random() * 500),
      protein: Math.floor(Math.random() * 30),
      carbs: Math.floor(Math.random() * 50),
      fat: Math.floor(Math.random() * 20),
      safeForPregnancy: true,
    };

    addMeal({
      id: Math.random().toString(),
      type: mealType,
      description: mealDescription,
      day: selectedDay,
      nutritionalInfo,
    });

    setShowAddMeal(false);
    setMealDescription("");
    setMealType("Breakfast");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">Meal Planner</h1>
        <div className="flex space-x-4 w-full sm:w-auto">
          <button
            onClick={handleAddMeal}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Meal
          </button>
          <button
            onClick={handleOpenCamera}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Camera className="h-5 w-5 mr-2" />
            Scan Food
          </button>
        </div>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search meals and recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <div key={day} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-4">
              <CalendarIcon className="h-5 w-5 text-purple-500 mr-2" />
              <h3 className="font-semibold">{day}</h3>
            </div>
            <div className="space-y-3">
              {getMealsByDay(day).map((meal, index) => (
                <div key={index} className="p-2 bg-purple-50 rounded">
                  <p className="text-sm font-medium">{meal.type}</p>
                  <p className="text-xs text-gray-600">{meal.description}</p>
                  {meal.nutritionalInfo && (
                    <div className="mt-1 text-xs text-gray-500">
                      <p>Calories: {meal.nutritionalInfo.calories}</p>
                      <p>Protein: {meal.nutritionalInfo.protein}g</p>
                      {meal.nutritionalInfo.warnings?.map((warning, idx) => (
                        <p key={idx} className="text-red-500">
                          {warning}
                        </p>
                      ))}
                      {meal.nutritionalInfo.recommendations?.map((rec, idx) => (
                        <p key={idx} className="text-green-500">
                          {rec}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showAddMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Meal</h2>
            <form onSubmit={handleSubmitMeal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Day
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meal Type
                </label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={mealDescription}
                  onChange={(e) => setMealDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter meal description"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddMeal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Scan Food Barcode</h2>
              <button
                onClick={() => {
                  stopScanner();
                  setShowCamera(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {scannerError && (
              <div className="mb-4 p-4 bg-red-50 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{scannerError}</p>
              </div>
            )}

            <div
              id="interactive"
              className="viewport relative w-full h-[480px] bg-black rounded-lg overflow-hidden"
            >
              <video className="w-full h-full object-cover"></video>
              <canvas className="absolute top-0 left-0 w-full h-full"></canvas>

              {/* Scanning guide overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="h-1/4 bg-black bg-opacity-50"></div>
                <div className="h-1/2 flex">
                  <div className="w-1/6 bg-black bg-opacity-50"></div>
                  <div className="flex-1 border-2 border-purple-500 relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-purple-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-purple-500"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-purple-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-purple-500"></div>
                  </div>
                  <div className="w-1/6 bg-black bg-opacity-50"></div>
                </div>
                <div className="h-1/4 bg-black bg-opacity-50"></div>
              </div>
            </div>

            {barcodeResult && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Barcode Details:</h3>
                  <p className="text-sm text-gray-700">
                    Format: {getBarcodeTypeName(barcodeResult.format)}
                  </p>
                  <p className="text-sm text-gray-700">
                    Code: {barcodeResult.code}
                  </p>
                  <p className="text-sm text-gray-700">
                    Scan Quality: {barcodeResult.quality}%
                  </p>
                </div>

                {barcodeResult.analysis && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold">Product Analysis:</h3>
                      {barcodeResult.analysis.isSafe ? (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 ml-2" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        Nutritional Score:
                        <span
                          className={`ml-2 font-semibold ${
                            barcodeResult.analysis.nutritionalScore > 70
                              ? "text-green-600"
                              : barcodeResult.analysis.nutritionalScore > 40
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {barcodeResult.analysis.nutritionalScore}/100
                        </span>
                      </p>

                      {barcodeResult.analysis.warnings.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-red-600">
                            Warnings:
                          </p>
                          <ul className="list-disc list-inside text-sm text-red-500">
                            {barcodeResult.analysis.warnings.map(
                              (warning, idx) => (
                                <li key={idx}>{warning}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {barcodeResult.analysis.recommendations.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-green-600">
                            Recommendations:
                          </p>
                          <ul className="list-disc list-inside text-sm text-green-500">
                            {barcodeResult.analysis.recommendations.map(
                              (rec, idx) => (
                                <li key={idx}>{rec}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="mt-4 text-sm text-gray-500 text-center">
              Position the barcode within the scanning area. Hold steady for
              best results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
