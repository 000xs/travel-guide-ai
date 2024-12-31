import React from 'react'
import { NotebookTabs, Flower, MessageCircleMore,Castle,Coins,NotebookPen,BadgePlus } from 'lucide-react'
function LeftNav() {
    return (
        <div className="left bg-spice-red w-[20%] shadow-2xl drop-shadow-lg text-coconut-white">
            <div className="content px-8 py-4 font-body2">
                <h1 className='text-xl font-header2 font-semibold'>Explore Island</h1>
                <div className='flex flex-col space-y-1 py-4 font-header2'>
                    <h3 className='text-lg'>Quick Actions</h3>
                    <ul className='flex flex-col space-y-4 py-4'>

                       
                        <li className='inline-flex space-x-2'><NotebookPen color="#ffffff" /><p>Creat plan</p></li>
                        
                 
                        <li className='inline-flex space-x-2'><BadgePlus color="#ffffff" /><p>Add Experiences</p></li>
                        <li className='inline-flex space-x-2'><Coins color="#ffffff" /><p>Currency exchange</p></li>
                    </ul>
                </div>
                <div className='flex flex-col space-y-1 py-4 font-header2'>
                    <h3 className='text-lg'>Feture</h3>
                    <ul className='flex flex-col space-y-4 py-4'>

                        <li className='inline-flex space-x-2'><MessageCircleMore color="#ffffff" /><p>Chat</p></li>
                        <li className='inline-flex space-x-2'><NotebookTabs color="#ffffff" /><p>My Plans</p></li>
                        <li className='inline-flex space-x-2'><Castle color="#ffffff" /><p>Top Places</p></li>
                 
                        <li className='inline-flex space-x-2'><Flower color="#ffffff" /><p>Others Experiences</p></li>
                        <li className='inline-flex space-x-2'><Coins color="#ffffff" /><p>Currency exchange</p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeftNav