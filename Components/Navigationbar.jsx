import React from 'react'

function Navigationbar() {
    return (
        <div className='w-[calc(100%-64px)] cursor-pointer flex fixed flex-row bg-white justify-between items-center m-8 rounded-full py-4 px-12 '>
             <div className="logo">
                <h1 className='font-header2 text-xl '>SerandibAI</h1>
             </div>
             <ul className='flex flex-row space-x-2'>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
             </ul>
        </div>
    )
}

export default Navigationbar
