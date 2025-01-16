import React from 'react';
import { MapPin, Clock, Sun, Sunrise, Sunset, Coffee, Users, DollarSign } from 'lucide-react';

const TripItineraryMap = ({ data }) => {
    if (!data) {
        return <div>Loading...</div>;
    }

    const timeSlots = ['morning', 'afternoon', 'evening'];

    const getIcon = (timeSlot) => {
        switch (timeSlot) {
            case 'morning':
                return <Sunrise className="w-4 h-4" />;
            case 'afternoon':
                return <Sun className="w-4 h-4" />;
            case 'evening':
                return <Sunset className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };

    const itinerary = data.itinerary || [];
    const totalTravelers = (data.travelers?.adults || 0) + (data.travelers?.children || 0) + (data.travelers?.infants || 0);

    return (
        <div className="w-full mx-auto">
            {/* Trip Header Card */}
            <div className="flex flex-col p-4 mb-4">
                <h1 className="text-xl sm:text-2xl font-bold mb-2">{data.tripName || 'Trip Details'}</h1>
                <div className="flex flex-col space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{formatDate(data.startDate)} - {formatDate(data.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>Matara, Sri Lanka</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>{totalTravelers} Travelers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 flex-shrink-0" />
                        <span>{data.budget}</span>
                    </div>
                </div>
            </div>

            {/* Itinerary Cards */}
            <div className="flex flex-col space-y-2">
                {itinerary.map((day, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-1/2 border-spice-red">
                        <div className="border-b pb-2 mb-3">
                            <h2 className="text-lg font-semibold">Day {day.dayNumber}</h2>
                            <p className="text-sm text-gray-600">{day.theme}</p>
                        </div>

                        <div className="space-y-3">
                            {timeSlots.map((slot) => (
                                <div key={slot} className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {getIcon(slot)}
                                        <h3 className="text-sm font-medium capitalize">{slot}</h3>
                                    </div>
                                    <div className="text-sm text-gray-600 pl-6">
                                        {Array.isArray(day[slot]) ? (
                                            day[slot].map((item, i) => (
                                                <div key={i} className="mb-1">
                                                    {item.replace(/[*\-]/g, '').trim()}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="mb-1">
                                                {day[slot] || 'No activities planned.'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {day.tips && (
                            <div className="mt-3 pt-2 border-t">
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                    <Coffee className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-medium">Tips: </span>
                                        {Array.isArray(day.tips) ? (
                                            day.tips.map((tip, i) => (
                                                <div key={i} className="mb-1">
                                                    {tip.replace('Use -', '').trim()}
                                                </div>
                                            ))
                                        ) : (
                                            <div>
                                                {day.tips.replace('Use -', '').trim()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripItineraryMap;