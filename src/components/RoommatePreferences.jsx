import React from "react";
import { 
  FiClock, 
  FiSun, 
  FiMoon, 
  FiCoffee, 
  FiMusic, 
  FiSmile, 
  FiFrown,
  FiWind,
  FiUsers
} from "react-icons/fi";
import { GiBroom } from "react-icons/gi";
import { IoMdFitness } from "react-icons/io";
import { MdSmokingRooms, MdNoDrinks } from "react-icons/md";

const PreferenceItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-2">
    <div className="text-blue-500 mt-1">{icon}</div>
    <div>
      <p className="font-medium text-gray-800">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

const RoommatePreferences = ({ preferences }) => {
  // Default preferences if none provided
  const {
    cleanliness = "Moderate - clean up after yourself",
    sleepSchedule = "11pm - 7am",
    guests = "Occasional guests okay with notice",
    smoking = "Non-smoker preferred",
    drinking = "Occasional drinking okay",
    pets = "No pets",
    noiseLevel = "Moderate - daytime noise okay",
    hobbies = "Open to all hobbies",
    workSchedule = "9-5 work schedule",
    personality = "Friendly but respects privacy",
    diet = "No restrictions",
    fitness = "Casual fitness routine"
  } = preferences || {};

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FiUsers className="text-blue-500" />
        Roommate Preferences
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PreferenceItem 
          icon={<GiBroom size={18} />} 
          label="Cleanliness" 
          value={cleanliness} 
        />
        
        <PreferenceItem 
          icon={<div className="flex gap-1"><FiMoon size={16} /><FiSun size={16} /></div>} 
          label="Sleep Schedule" 
          value={sleepSchedule} 
        />
        
        <PreferenceItem 
          icon={<FiUsers size={18} />} 
          label="Guests Policy" 
          value={guests} 
        />
        
        <PreferenceItem 
          icon={<MdSmokingRooms size={18} />} 
          label="Smoking" 
          value={smoking} 
        />
        
        <PreferenceItem 
          icon={<MdNoDrinks size={18} />} 
          label="Drinking" 
          value={drinking} 
        />
        
        <PreferenceItem 
          icon={<FiWind size={18} />} 
          label="Noise Level" 
          value={noiseLevel} 
        />
        
        <PreferenceItem 
          icon={<FiMusic size={18} />} 
          label="Hobbies" 
          value={hobbies} 
        />
        
        <PreferenceItem 
          icon={<FiClock size={18} />} 
          label="Work Schedule" 
          value={workSchedule} 
        />
        
        <PreferenceItem 
          icon={<FiSmile size={18} />} 
          label="Personality" 
          value={personality} 
        />
        
        <PreferenceItem 
          icon={<FiCoffee size={18} />} 
          label="Diet" 
          value={diet} 
        />
        
        <PreferenceItem 
          icon={<IoMdFitness size={18} />} 
          label="Fitness Routine" 
          value={fitness} 
        />
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          These preferences help ensure compatible living arrangements. 
          Please be respectful of these guidelines when considering this room.
        </p>
      </div>
    </div>
  );
};

export default RoommatePreferences;