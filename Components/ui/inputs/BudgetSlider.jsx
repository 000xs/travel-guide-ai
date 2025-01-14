
import { useState } from 'react';


const BudgetSlider = ({ onBudgetChange }) => {
    const [budget, setBudget] = useState(1);
    const [estimatedCost, setEstimatedCost] = useState("$ - Affordable options");

    const getEstimatedCost = (value) => {
        switch (value) {
            case 1:
                return "$ - Affordable options";
            case 2:
                return "$$ - Reasonable, sensibly priced";
            case 3:
                return "$$$ - Upscale experience";
            case 4:
                return "$$$$ - Luxury experience";
            default:
                return "$ - Affordable options";
        }
    };

    const handleSliderChange = (event) => {
        const value = parseInt(event.target.value);
        setBudget(value);
        setEstimatedCost(getEstimatedCost(value));

       
        onBudgetChange(value);
    };
    return (



        <div className="relative px-2">
            <input
                type="range"
                min="1"
                max="4"
                value={budget}
                onChange={handleSliderChange}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
            />

            <div className="flex justify-between mt-3 text-sm text-gray-600">
                <span>On a Budget</span>
                <span>Sensible</span>
                <span>Upscale</span>
                <span>Luxury</span>
            </div>
        </div>



    );
};

export default BudgetSlider;
