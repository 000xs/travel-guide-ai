import React from 'react'
import { NotebookTabs, Activity, MessageCircleMore, Compass, MapPin, BookHeart } from 'lucide-react'
import { useRouter } from 'next/router';
import Link from 'next/link';

function LeftNav() {
    const router = useRouter();
    const currentRoute = router.asPath;
    // alert(currentRoute)
    return (
        <div className="left bg-white w-[18%] border-r-2">
            <div className="content px-4 py-4 font-body2">
                <h1 className='text-xl font-header2 px-4 font-semibold'>SerandipAI</h1>

                <div className='flex flex-col space-y-1 py-4  transition'>

                    <ul className='flex cursor-pointer flex-col space-y-2 py-4'>
                        <Link href='/app/chat' className={currentRoute === '/app/chat' || currentRoute === '/app/chat/new'|| currentRoute.startsWith('/app/chat/') ? 'inline-flex space-x-2 text-black py-2 px-4 rounded-md' : 'inline-flex space-x-2 text-gray-900 py-2 px-4 rounded-md'}>
                            <MessageCircleMore fill={currentRoute === '/app/chat' ? '#000' : 'transparent'} />
                            <p>Chat</p>
                        </Link>

                        <Link href='/app/explore' className={currentRoute === '/app/explore' ? 'inline-flex space-x-2 text-black py-2 px-4 rounded-md' : 'inline-flex space-x-2 text-gray-900 py-2 px-4 rounded-md'}>
                            <MapPin fill={currentRoute === '/app/explore' ? '#000' : 'transparent'} />
                            <p>Explore</p>
                        </Link>

                        <Link href='/app/trips' className={currentRoute === '/app/trips' ? 'inline-flex space-x-2 text-black py-2 px-4 rounded-md' : 'inline-flex space-x-2 text-gray-900 py-2 px-4 rounded-md'}>
                            <Compass fill={currentRoute === '/app/trips' ? '#000' : 'transparent'} />
                            <p>Easy Trips</p>
                        </Link>

                        <Link href='/app/activity' className={currentRoute === '/app/activity' ? 'inline-flex space-x-2 text-black py-2 px-4 rounded-md' : 'inline-flex space-x-2 text-gray-900 py-2 px-4 rounded-md'}>
                            <BookHeart fill={currentRoute === '/app/activity' ? '#000' : 'transparent'} />
                            <p>Activity</p>
                        </Link>


                    </ul>
                </div>
            </div>
        </div >
    )
}

export default LeftNav