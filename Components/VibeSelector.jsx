import { useState } from 'react';

const travelVibes = [
    "Wanderlust Escape",
    "Tropical Bliss",
    "Urban Explorer",
    "Mountain Retreat",
    "Cultural Immersion",
    "Road Trip Freedom",
    "Backpacking Adventure",
    "Luxury Escape",
    "Romantic Getaway",
    "History Seeker",
    "Nature’s Embrace",
    "Foodie Expedition",
    "Festival Frenzy",
    "Coastal Drive",
    "Wellness Retreat",
    "Arctic Adventure"
];

const VibeSelector = () => {
    const [selectedVibes, setSelectedVibes] = useState([]);

    const toggleVibe = (vibe) => {
        setSelectedVibes((prev) =>
            prev.includes(vibe)
                ? prev.filter((item) => item !== vibe)  // Deselect
                : [...prev, vibe]                        // Select
        );
    };

    return (
        <div className="p-4 bg-white border-red-200 border-dashed border-2  rounded-lg max-w-xl mx-auto my-8">
            

            <div className="flex flex-wrap  gap-2 justify-start">
                {travelVibes.map((vibe, index) => (
                    <div
                        key={index}
                        onClick={() => toggleVibe(vibe)}
                        className={`px-2 py-1 rounded-lg text-sm cursor-pointer transition-all ${selectedVibes.includes(vibe)
                                ? 'bg-spice-red text-white'
                                : 'bg-gray-100 hover:bg-blue-100'
                            }`}
                    >
                        {vibe}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VibeSelector;
