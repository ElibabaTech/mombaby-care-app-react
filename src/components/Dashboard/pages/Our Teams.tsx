import React from "react";
import {
  Award,
  Briefcase,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const trustees = [
  {
    name: "Chimezie Favour Inoma",
    role: "Team Lead",
    image: "/images/Chimezie-Favour.png",

    qualifications: ["Sundream International School", "SS2"],
    experience: "Nill",
    expertise: ["Nill"],
    achievements: ["Nill"],
    contact: {
      email: "chimeziefavourInoma@mombabycare.com",
      phone: "+234 (0) 801 234 5678",
    },
  },
  {
    name: "Duru Chidimma Annabel",
    role: "Assistant Team Lead",
    image: "/images/Duru Chidimma.png",
    qualifications: ["Sundream International School", "SS2"],

    experience: "Nill",
    expertise: ["Nill"],
    achievements: ["Nill"],
    contact: {
      email: "Duruchidimmaannabel@mombabycare.com",
      phone: "+234 (0) 802 345 6789",
    },
  },
  {
    name: "Okere Emmanuel Angel",
    role: "Technical Director",
    image: "/images/Okere Emmanuel.png",
    qualifications: ["Sundream International School", "SS2"],
    experience: "Nill",
    expertise: ["Nill"],
    achievements: ["Nill"],
    contact: {
      email: "Okereemmanuelangel@mombabycare.com",
      phone: "+234 (0) 803 456 7890",
    },
  },
];

const BoardOfTrustees = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Our Teams</h1>
          <p className="mt-4 text-xl text-gray-600">
            Meet the visionary leaders behind MomBaby Care
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {trustees.map((trustee, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={trustee.image}
                    alt={trustee.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-2xl font-bold">{trustee.name}</h2>
                    <p className="text-lg font-semibold text-purple-200">
                      {trustee.role}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <GraduationCap className="h-6 w-6 text-purple-600 mr-2" />
                        <h3 className="text-lg font-semibold">
                          Qualifications
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {trustee.qualifications.map((qual, idx) => (
                          <li key={idx} className="text-gray-600">
                            {qual}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center mt-6 mb-4">
                        <Briefcase className="h-6 w-6 text-purple-600 mr-2" />
                        <h3 className="text-lg font-semibold">Expertise</h3>
                      </div>
                      <ul className="space-y-2">
                        {trustee.expertise.map((exp, idx) => (
                          <li key={idx} className="text-gray-600">
                            {exp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center mb-4">
                        <Award className="h-6 w-6 text-purple-600 mr-2" />
                        <h3 className="text-lg font-semibold">Achievements</h3>
                      </div>
                      <ul className="space-y-2">
                        {trustee.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-600">
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400 mr-2" />
                          <a
                            href={`mailto:${trustee.contact.email}`}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            {trustee.contact.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-600">
                            {trustee.contact.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center mb-2">
                      <Heart className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="font-semibold">Experience:</span>
                      <span className="ml-2 text-gray-600">
                        {trustee.experience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardOfTrustees;
