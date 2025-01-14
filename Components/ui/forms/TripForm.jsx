import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export default function TripForm({onFormSubmit}) {
    const [tripDetails, setTripDetails] = useState({
        destination: '',
        dateRange: {
            startDate: null,
            endDate: null
        },
        budgetValue: 1,
        travelers: {
            adults: 2,
            children: 0,
            infants: 0,
            pets: 0
        },
        selectedVibes: []
    });

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTravelersModalOpen, setIsTravelersModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    // Updated date handling
    const handleDateClick = (date) => {
        if (!tripDetails.dateRange.startDate || tripDetails.dateRange.endDate) {
            setTripDetails(prev => ({
                ...prev,
                dateRange: {
                    startDate: date,
                    endDate: null
                }
            }));
        } else {
            if (date < tripDetails.dateRange.startDate) {
                setTripDetails(prev => ({
                    ...prev,
                    dateRange: {
                        startDate: date,
                        endDate: null
                    }
                }));
            } else {
                setTripDetails(prev => ({
                    ...prev,
                    dateRange: {
                        ...prev.dateRange,
                        endDate: date
                    }
                }));
            }
        }
    };

    const getBudgetLabel = (value) => {
        const labels = {
            1: "$ - Affordable options",
            2: "$$ - Reasonable, sensibly priced",
            3: "$$$ - Upscale experience",
            4: "$$$$ - Luxury experience"
        };
        return labels[value] || labels[1];
    };

    const getDaysInMonth = (date) => {
        const daysInMonth = [];
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        for (let day = 1; day <= lastDay.getDate(); day++) {
            daysInMonth.push(new Date(date.getFullYear(), date.getMonth(), day));
        }
        return daysInMonth;
    };

    const formatDate = (date) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    const isDateInRange = (date) => {
        if (!tripDetails.dateRange.startDate || !tripDetails.dateRange.endDate) return false;
        return date >= tripDetails.dateRange.startDate && date <= tripDetails.dateRange.endDate;
    };

    const handleTravelerChange = (type, value) => {
        setTripDetails(prev => ({
            ...prev,
            travelers: {
                ...prev.travelers,
                [type]: Math.max(0, value)
            }
        }));
    };

    const toggleVibe = (vibe) => {
        setTripDetails(prev => ({
            ...prev,
            selectedVibes: prev.selectedVibes.includes(vibe)
                ? prev.selectedVibes.filter(v => v !== vibe)
                : [...prev.selectedVibes, vibe]
        }));
    };

    const travelVibes = [
        "Wanderlust Escape", "Tropical Bliss", "Urban Explorer", "Mountain Retreat",
        "Cultural Immersion", "Road Trip Freedom", "Backpacking Adventure",
        "Luxury Escape", "Romantic Getaway", "History Seeker", "Nature's Embrace",
        "Foodie Expedition", "Festival Frenzy", "Coastal Drive", "Wellness Retreat",
        "Arctic Adventure"
    ];

    const handleSubmit = () => {
        // Format dates for JSON output
        const formattedTripDetails = {
            ...tripDetails,
            dateRange: {
                startDate: tripDetails.dateRange.startDate ? formatDate(tripDetails.dateRange.startDate) : null,
                endDate: tripDetails.dateRange.endDate ? formatDate(tripDetails.dateRange.endDate) : null
            }
        };
        onFormSubmit(formattedTripDetails);

        // alert(JSON.stringify(formattedTripDetails, null, 2));
    };

    return (
         
            <div>
                <h2 className="text-xl py-4 font-body2 font-semibold">Create a Trip</h2>
                <div className="flex flex-col space-y-4">
                    {/* Destination Input */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-md font-body">Destination</label>
                        <input
                            type="text"
                            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Destination"
                            value={tripDetails.destination}
                            onChange={(e) => setTripDetails(prev => ({ ...prev, destination: e.target.value }))}
                        />
                    </div>

                    {/* Date Range Picker */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-md font-body">Travel Dates</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={tripDetails.dateRange.startDate && tripDetails.dateRange.endDate
                                    ? `${formatDate(tripDetails.dateRange.startDate)} to ${formatDate(tripDetails.dateRange.endDate)}`
                                    : 'Select Date Range'}
                                readOnly
                                onClick={() => setIsCalendarOpen(true)}
                                className="p-3 border border-gray-300 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {isCalendarOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                        <div className="flex justify-between mb-4">
                                            <button
                                                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                                                className="text-xl text-gray-500"
                                            >
                                                &lt;
                                            </button>
                                            <span className="font-semibold">
                                                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                                            </span>
                                            <button
                                                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                                                className="text-xl text-gray-500"
                                            >
                                                &gt;
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2 text-center">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                                                <div key={idx} className="text-sm font-semibold text-gray-600">
                                                    {day}
                                                </div>
                                            ))}

                                            {getDaysInMonth(currentDate).map((day) => (
                                                <button
                                                    key={day.toISOString()}
                                                    onClick={() => handleDateClick(day)}
                                                    className={`p-2 rounded-md text-sm cursor-pointer
                                                        ${day.getTime() === tripDetails.dateRange.startDate?.getTime() ? 'text-black border border-spice-red' : ''}
                                                        ${day.getTime() === tripDetails.dateRange.endDate?.getTime() ? 'bg-spice-red text-white' : ''}
                                                        ${isDateInRange(day) ? 'bg-blue-100' : 'text-gray-700'}`}
                                                >
                                                    {day.getDate()}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setIsCalendarOpen(false)}
                                            className="w-full mt-4 px-4 py-2 bg-spice-red text-white rounded-md hover:bg-red-600 transition-colors"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rest of the component remains the same */}
                    {/* Travelers Selector */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-md font-body">Number of Travelers</label>
                        <input
                            type="text"
                            readOnly
                            onClick={() => setIsTravelersModalOpen(true)}
                            value={`Adults: ${tripDetails.travelers.adults}, Children: ${tripDetails.travelers.children}, Infants: ${tripDetails.travelers.infants}, Pets: ${tripDetails.travelers.pets}`}
                            className="p-3 border border-gray-300 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {isTravelersModalOpen && (
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                    <h3 className="text-xl font-semibold mb-4">Select Traveler Info</h3>

                                    {Object.entries({
                                        adults: 'Adults (Ages 13 or above)',
                                        children: 'Children (Ages 2–12)',
                                        infants: 'Infants (Under 2)',
                                        pets: 'Pets (Bringing a service animal?)'
                                    }).map(([key, label]) => (
                                        <div key={key} className="mb-4">
                                            <label className="block mb-2">{label}</label>
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => handleTravelerChange(key, tripDetails.travelers[key] - 1)}
                                                    className="p-2 rounded-full border hover:bg-gray-100"
                                                    disabled={tripDetails.travelers[key] <= 0}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span>{tripDetails.travelers[key]}</span>
                                                <button
                                                    onClick={() => handleTravelerChange(key, tripDetails.travelers[key] + 1)}
                                                    className="p-2 rounded-full border hover:bg-gray-100"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => setIsTravelersModalOpen(false)}
                                        className="w-full bg-spice-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Budget Slider */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-md font-body">Estimated Cost</label>
                        <div className="px-2">
                            <input
                                type="range"
                                min="1"
                                max="4"
                                value={tripDetails.budgetValue}
                                onChange={(e) => setTripDetails(prev => ({ ...prev, budgetValue: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
                            />
                            <div className="flex justify-between mt-3 text-sm text-gray-600">
                                <span>On a Budget</span>
                                <span>Sensible</span>
                                <span>Upscale</span>
                                <span>Luxury</span>
                            </div>
                        </div>
                    </div>

                    {/* Vibe Selector */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-md font-body">Your Vibe</label>
                        <div className="p-4 border-2 border-dashed border-red-200 rounded-lg">
                            <div className="flex flex-wrap gap-2">
                                {travelVibes.map((vibe) => (
                                    <div
                                        key={vibe}
                                        onClick={() => toggleVibe(vibe)}
                                        className={`px-2 py-1 rounded-lg text-sm cursor-pointer transition-all
                                            ${tripDetails.selectedVibes.includes(vibe)
                                                ? 'bg-spice-red text-white'
                                                : 'bg-gray-100 hover:bg-blue-100'
                                            }`}
                                    >
                                        {vibe}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full text-white bg-spice-red p-3 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create a Plan
                    </button>
                </div>
            </div>
         
    );
}