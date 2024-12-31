import React from 'react'

function Navigationbar() {
    return (
        <div className='w-full cursor-pointer flex flex-row text-white z-10 justify-between items-center px-32 py-4'>
            <div className="logo font-header2">
                <h1 className='text-2xl font-bold'>WildTrails</h1>
            </div>
            <ul className="item flex flex-row space-x-4 font-normal font-body2">
                <li className='hover:border-b-white border-b-4 border-b-transparent'>Sri Lanka</li>
                <li className='hover:border-b-white border-b-4 border-b-transparent'>Plan Adventure</li>
                <li className='hover:border-b-white border-b-4 border-b-transparent'>Other Experiences</li>
                <li className='hover:border-b-white border-b-4 border-b-transparent'>AI Guide</li>
            </ul>
        </div>
    )
}

export default Navigationbar