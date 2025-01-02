import { Minimize, Minus, Plus, PlusCircle } from 'lucide-react';
import { useState } from 'react';

// Parent component will receive the output as a prop
const TravelerSelector = ({ onTravelerInfoSubmit }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTravelerInfo, setSelectedTravelerInfo] = useState({
        adults: 2,
        children: 0,
        infants: 0,
        pets: 0,
    });

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSelect = (type, value) => {
        setSelectedTravelerInfo({
            ...selectedTravelerInfo,
            [type]: value,
        });
    };

    const handleSubmit = () => {
        // Output traveler info when submit is clicked
        if (onTravelerInfoSubmit) {
            onTravelerInfoSubmit(selectedTravelerInfo);
        }
        setShowModal(false);  // Close modal on submit
    };

    return (
        <div>
            {/* Input field */}
            <input
                type="text"
                onClick={toggleModal}
                value={`Adults: ${selectedTravelerInfo.adults}, Children: ${selectedTravelerInfo.children}, Infants: ${selectedTravelerInfo.infants}, Pets: ${selectedTravelerInfo.pets}`}
                readOnly
                className='p-3 border border-gray-300 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Select Traveler Info</h3>

                        {/* Options */}
                        <div className="space-y-4">
                            <div>
                                <label className="block">Adults (Ages 13 or above)</label>
                                <div className="flex items-center space-x-2">


                                    <button
                                        onClick={() => handleSelect('adults', selectedTravelerInfo.adults - 1)}
                                        className=" p-2  flex items-center justify-center rounded-full border text-2xl font-bold"
                                        disabled={selectedTravelerInfo.adults <= 0}
                                    >
                                        -
                                    </button>
                                    <span>{selectedTravelerInfo.adults}</span>
                                    <button
                                        onClick={() => handleSelect('adults', selectedTravelerInfo.adults + 1)}
                                        className=" p-2  flex items-center justify-center rounded-full border text-2xl font-bold"
                                    >
                                        <Plus />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block">Children (Ages 2–12)</label>
                                <div className="flex items-center space-x-2">


                                    <button
                                        onClick={() => handleSelect('children', selectedTravelerInfo.children - 1)}
                                        className=" p-2  flex items-center justify-center rounded-full border text-2xl font-bold"
                                        disabled={selectedTravelerInfo.children <= 0}
                                    >
                                        -
                                    </button>
                                    <span>{selectedTravelerInfo.children}</span>
                                    <button
                                        onClick={() => handleSelect('children', selectedTravelerInfo.children + 1)}
                                        className=" p-2  flex items-center justify-center rounded-full border text-2xl font-bold"
                                    >
                                        <Plus />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block">Infants (Under 2)</label>
                                <div className="flex items-center space-x-2">


                                    <button
                                        onClick={() => handleSelect('infants', selectedTravelerInfo.infants - 1)}
                                        className=" p-2  flex items-center justify-center rounded-full border text-2xl font-bold"
                                        disabled={selectedTravelerInfo.infants <= 0}
                                    >
                                        -
                                    </button>
                                    <span>{selectedTravelerInfo.infants}</span>
                                    <button
                                        onClick={() => handleSelect('infants', selectedTravelerInfo.infants + 1)}
                                        className=" p-2  flex items-center justify-center rounded-full border text-2xl font-bold"
                                    >
                                        <Plus />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block">Pets (Bringing a service animal?)</label>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleSelect('pets', selectedTravelerInfo.pets - 1)}
                                        className=" p-2  flex items-center justify-center rounded-full border text-2xl font-bold"
                                        disabled={selectedTravelerInfo.pets <= 0}
                                    >
                                        <Minus />
                                    </button>
                                    <span>{selectedTravelerInfo.pets}</span>
                                    <button
                                        onClick={() => handleSelect('pets', selectedTravelerInfo.pets + 1)}
                                        className=" p-2  flex items-center justify-center rounded-full border text-2xl font-bold"

                                    >
                                        <Plus />
                                    </button>
                                </div>
                            </div>
                        </div>

                         
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleSubmit}
                                className="bg-spice-red text-white w-full px-4 py-2 rounded-md"
                            >
                                Submit
                            </button>
                             
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravelerSelector;
