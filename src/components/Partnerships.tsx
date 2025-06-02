import React from "react";
import {
  Handshake,
  Building2,
  Award,
  TrendingUp,
  Users,
  FileCheck,
} from "lucide-react";

const partners = [
  {
    name: "Checkers Custard",
    type: "Maternal Supplements",
    description:
      "Leading pharmaceutical company providing high-quality maternal supplements and vitamins.",
    image: "/images/Checkers.jpeg",
    products: [
      "Maternal Care Supplement",
      "Folic Acid Plus",
      "Pregnancy Multivitamin",
    ],
  },
  {
    name: "Golden Penny",
    type: "Maternal Nutrition",
    description:
      "Trusted producer of fortified foods specifically designed for maternal nutrition.",
    image: "/images/GOLDEN-PENNY.jpg",
    products: ["Fortified Pap", "Maternal Cereal", "Pregnancy Friendly Pasta"],
  },
  {
    name: "Peak",
    type: "Infant Nutrition",
    description:
      "Premium dairy products enriched with essential nutrients for infant development.",
    image: "/images/peak.png",
    products: ["Infant Formula", "Growing-up Milk", "Maternal Milk Powder"],
  },
  {
    name: "Nestle Nigeria",
    type: "Baby Food",
    description:
      "Global leader in infant nutrition, providing scientifically formulated baby foods.",
    image: "/images/Nestle.jpeg ",
    products: ["Cerelac", "NAN Formula", "Infant Cereals"],
  },
  {
    name: "Pregnancy Tea",
    type: "Infant Nutrition",
    description:
      "Specialized in producing easily digestible, nutrient-rich custard for infants.",
    image: "/images/Pregnancy Tea.avif",
    products: ["Baby Custard", "Infant Cereal", "Fortified Custard"],
  },
];

const partnershipBenefits = [
  {
    title: "Data Integration",
    description:
      "Direct access to verified product information and real-time updates",
    icon: FileCheck,
  },
  {
    title: "Brand Visibility",
    description: "Premium product listings and verified partner badges",
    icon: Award,
  },
  {
    title: "Market Insights",
    description: "Access to anonymized user behavior and preference data",
    icon: TrendingUp,
  },
  {
    title: "Customer Engagement",
    description: "Direct feedback channel and educational content distribution",
    icon: Users,
  },
];

const Partnerships = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">
            Partnerships
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Proposed Partners
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Working together to enhance maternal and infant nutrition in Nigeria
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      {partner.type}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {partner.name}
                    </h3>
                    <Award className="h-6 w-6 text-purple-500 ml-2" />
                  </div>
                  <p className="text-gray-600 mb-6">{partner.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Featured Products:
                    </h4>
                    <ul className="space-y-2">
                      {partner.products.map((product, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-600"
                        >
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-purple-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Partnership Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <benefit.icon className="h-8 w-8 text-purple-500 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
